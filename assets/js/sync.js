// Keeps the presenter's and customer's screens in sync, with no server of our own.
//
//  * Across devices: WebRTC data channels via PeerJS. PeerJS's free public broker only
//    introduces the two browsers; slide data then flows browser-to-browser, falling back
//    to PeerJS's public TURN relay when a direct path isn't possible.
//  * Same browser (two windows or tabs): BroadcastChannel, which needs no network at all.
//
// The presenter is the source of truth. It sends the full tour state on every change
// (it's a few KB), and the customer just renders whatever it last received.
// In production this file is what a Socket.io / WebSocket server would replace.

const NS = 'goffs-live-tour-v1-';
const ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I/L

export const rid = (n = 10) => Array.from(crypto.getRandomValues(new Uint8Array(n)), (b) => (b % 36).toString(36)).join('');
export function newCode() {
  return Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => ALPHA[b % ALPHA.length]).join('');
}
export const normalizeCode = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
const peerId = (code) => NS + code.toLowerCase();
const PeerCtor = () => (typeof window !== 'undefined' && window.Peer) || null;
const NET_ERRORS = ['network', 'server-error', 'socket-error', 'socket-closed', 'disconnected', 'browser-incompatible', 'webrtc'];

export class PresenterLink {
  constructor(code, { onMessage, onStatus } = {}) {
    this.code = code;
    this.onMessage = onMessage;
    this.onStatus = onStatus;
    this.sid = rid(8);
    this.seq = 0;
    this.last = null;
    this.conns = new Set();
    this.viewers = new Map(); // cid -> last seen
    this.seen = [];
    this.peerState = 'connecting';
    this.retries = 0;
  }

  start(state) {
    this.last = state;
    try {
      this.bc = new BroadcastChannel(NS + this.code);
      this.bc.onmessage = (e) => this.handle(e.data, null);
    } catch (e) { /* BroadcastChannel unsupported: cross-device only */ }
    this.startPeer();
    this.timer = setInterval(() => this.tick(), 4000);
    window.addEventListener('pagehide', () => this.stop());
  }

  stop() {
    clearInterval(this.timer);
    if (this.peer) { this.peer.__dead = true; try { this.peer.destroy(); } catch (e) {} }
    try { this.bc && this.bc.close(); } catch (e) {}
  }

  startPeer() {
    const Peer = PeerCtor();
    if (!Peer) { this.setPeer('unavailable'); return; }
    this.setPeer('connecting');
    const peer = new Peer(peerId(this.code), { debug: 1 });
    this.peer = peer;
    peer.on('open', () => { this.retries = 0; this.setPeer('online'); });
    peer.on('connection', (conn) => {
      conn.on('open', () => { this.conns.add(conn); this.sendTo(conn, this.stateMsg()); this.emit(); });
      conn.on('data', (d) => this.handle(d, conn));
      const drop = () => { this.conns.delete(conn); this.emit(); };
      conn.on('close', drop);
      conn.on('error', drop);
    });
    peer.on('disconnected', () => {
      setTimeout(() => { if (!peer.__dead && !peer.destroyed && peer.disconnected) { try { peer.reconnect(); } catch (e) {} } }, 1500);
    });
    peer.on('error', (err) => {
      const t = err && err.type;
      if (peer.__dead || t === 'peer-unavailable') return;
      if (t === 'unavailable-id') {
        // Usually our own previous tab still holding the id for a few seconds after a refresh.
        if (this.retries++ < 6) this.restartPeer(2500); else this.setPeer('taken');
      } else if (NET_ERRORS.includes(t)) {
        this.setPeer('offline');
        this.restartPeer(5000);
      } else {
        console.warn('[live-tour] peer error', t, err);
      }
    });
  }

  restartPeer(ms) {
    clearTimeout(this.rt);
    this.rt = setTimeout(() => {
      if (this.peer) { this.peer.__dead = true; try { this.peer.destroy(); } catch (e) {} }
      this.conns.clear();
      this.startPeer();
    }, ms);
  }

  stateMsg() { return { t: 'state', sid: this.sid, seq: this.seq, state: this.last }; }

  broadcast(state) {
    this.last = state;
    this.seq += 1;
    this.sendAll(this.stateMsg());
  }

  sendAll(msg) {
    try { this.bc && this.bc.postMessage(msg); } catch (e) {}
    for (const c of this.conns) this.sendTo(c, msg);
  }

  sendTo(conn, msg) { try { if (conn.open) conn.send(msg); } catch (e) {} }

  tick() {
    this.sendAll({ t: 'tick', sid: this.sid, seq: this.seq });
    const now = Date.now();
    for (const [k, t] of this.viewers) if (now - t > 12000) this.viewers.delete(k);
    this.emit();
  }

  handle(msg, conn) {
    if (!msg || typeof msg !== 'object' || !msg.cid) return; // ignore other presenters' traffic
    this.viewers.set(String(msg.cid).slice(0, 40), Date.now());
    if (msg.t === 'hello') {
      const m = this.stateMsg();
      if (conn) this.sendTo(conn, m); else { try { this.bc.postMessage(m); } catch (e) {} }
    } else if (msg.t === 'answer' || msg.t === 'field' || msg.t === 'step') {
      // Customer messages arrive on both channels when they share a browser; dedupe by id.
      if (msg.mid) {
        if (this.seen.includes(msg.mid)) return;
        this.seen.push(msg.mid);
        if (this.seen.length > 300) this.seen.shift();
      }
      this.onMessage && this.onMessage(msg);
    }
    this.emit();
  }

  setPeer(s) { this.peerState = s; this.emit(); }

  emit() {
    const n = this.viewers.size;
    const k = this.peerState + ':' + n;
    if (k === this.lastEmit) return;
    this.lastEmit = k;
    this.onStatus && this.onStatus({ peer: this.peerState, viewers: n });
  }
}

export class ClientLink {
  constructor(code, { onState, onStatus, local = true } = {}) {
    this.code = code;
    this.onState = onState;
    this.onStatus = onStatus;
    this.local = local; // false = skip the same-browser channel (to test the cross-device path)
    this.cid = rid(10);
    this.sid = null;
    this.seq = -1;
    this.lastMsg = 0;
    this.started = Date.now();
  }

  start() {
    this.status('connecting');
    if (this.local) {
      try {
        this.bc = new BroadcastChannel(NS + this.code);
        this.bc.onmessage = (e) => this.handle(e.data, 'local');
        this.bc.postMessage({ t: 'hello', cid: this.cid });
      } catch (e) {}
    }
    this.startPeer();
    this.timer = setInterval(() => this.tick(), 4000);
    window.addEventListener('pagehide', () => this.stop());
  }

  stop() {
    clearInterval(this.timer);
    if (this.peer) { this.peer.__dead = true; try { this.peer.destroy(); } catch (e) {} }
    try { this.bc && this.bc.close(); } catch (e) {}
  }

  startPeer() {
    const Peer = PeerCtor();
    if (!Peer) return;
    const peer = new Peer({ debug: 1 });
    this.peer = peer;
    this.conn = null;
    this.connecting = false;
    peer.on('open', () => this.connect());
    peer.on('error', (err) => {
      const t = err && err.type;
      if (peer.__dead) return;
      if (t === 'peer-unavailable') { this.connecting = false; this.conn = null; this.scheduleConnect(4000); }
      else if (NET_ERRORS.includes(t)) this.restartPeer(5000);
      else console.warn('[live-tour] peer error', t, err);
    });
    peer.on('disconnected', () => {
      setTimeout(() => { if (!peer.__dead && !peer.destroyed && peer.disconnected) { try { peer.reconnect(); } catch (e) {} } }, 1500);
    });
  }

  restartPeer(ms) {
    clearTimeout(this.rt);
    this.rt = setTimeout(() => {
      if (this.peer) { this.peer.__dead = true; try { this.peer.destroy(); } catch (e) {} }
      this.startPeer();
    }, ms);
  }

  connect() {
    const peer = this.peer;
    if (!peer || peer.disconnected || peer.destroyed || !peer.open) return;
    if (this.connecting || (this.conn && this.conn.open)) return;
    const conn = peer.connect(peerId(this.code), { reliable: true, serialization: 'json' });
    this.conn = conn;
    this.connecting = true;
    const giveUp = setTimeout(() => {
      if (conn.open) return;
      this.connecting = false;
      try { conn.close(); } catch (e) {}
      if (this.conn === conn) this.conn = null;
      this.scheduleConnect(3000);
    }, 12000);
    conn.on('open', () => { clearTimeout(giveUp); this.connecting = false; conn.send({ t: 'hello', cid: this.cid }); });
    conn.on('data', (d) => this.handle(d, 'direct'));
    const closed = () => {
      clearTimeout(giveUp);
      this.connecting = false;
      if (this.conn === conn) { this.conn = null; this.scheduleConnect(2000); }
    };
    conn.on('close', closed);
    conn.on('error', closed);
  }

  scheduleConnect(ms) { clearTimeout(this.ct); this.ct = setTimeout(() => this.connect(), ms); }

  handle(msg, via) {
    if (!msg || typeof msg !== 'object' || (msg.t !== 'state' && msg.t !== 'tick')) return;
    this.lastMsg = Date.now();
    if (msg.sid !== this.sid) { this.sid = msg.sid; this.seq = -1; } // presenter reloaded
    if (msg.t === 'state' && msg.seq > this.seq) {
      this.seq = msg.seq;
      this.via = via;
      this.onState && this.onState(msg.state);
    } else if (msg.t === 'tick' && msg.seq > this.seq) {
      this.send({ t: 'hello' }); // we missed an update; ask for the current state
    }
    if (this.seq >= 0) this.status('live');
  }

  tick() {
    this.send({ t: 'ping' });
    if (this.seq < 0) {
      if (Date.now() - this.started > 9000) this.status('notfound');
      this.send({ t: 'hello' });
    } else if (Date.now() - this.lastMsg > 12000) {
      this.status('reconnecting');
      this.send({ t: 'hello' });
    }
    if (this.peer && !this.conn && !this.connecting) this.connect();
  }

  send(msg) {
    msg.cid = this.cid;
    if (msg.t !== 'ping' && msg.t !== 'hello' && !msg.mid) msg.mid = rid(10);
    try { this.bc && this.bc.postMessage(msg); } catch (e) {}
    try { if (this.conn && this.conn.open) this.conn.send(msg); } catch (e) {}
  }

  status(s) {
    if (s === this.lastStatus && this.via === this.lastVia) return;
    this.lastStatus = s;
    this.lastVia = this.via;
    this.onStatus && this.onStatus(s, this.via);
  }
}
