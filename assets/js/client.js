// Customer view: join with a client code, then follow the rep's screen.
import { Stage, esc } from './render.js';
import { ClientLink, normalizeCode } from './sync.js';
import { icon } from './icons.js';

const $ = (s) => document.querySelector(s);
let link, stage, code;

function showJoin(msg) {
  $('#joinView').hidden = false;
  $('#liveView').hidden = true;
  if (msg) $('#joinMsg').textContent = msg;
  setTimeout(() => $('#codeInput').focus(), 30);
}

function join(c) {
  code = c;
  const via = new URLSearchParams(location.search).get('via');
  history.replaceState(null, '', `?code=${code}${via ? `&via=${encodeURIComponent(via)}` : ''}`);
  $('#joinView').hidden = true;
  $('#liveView').hidden = false;
  $('#waitCode').textContent = code;
  setWaiting('connecting');
  stage = new Stage($('#stage'), {
    mode: 'client',
    onAction: (a) => {
      if (a.type === 'answer') link.send({ t: 'answer', key: a.key, value: a.value });
      else if (a.type === 'field') link.send({ t: 'field', key: a.key, value: a.value });
      else if (a.type === 'step') link.send({ t: 'step', key: a.key, delta: a.delta });
    },
  });
  const params = new URLSearchParams(location.search);
  link = new ClientLink(code, {
    local: params.get('via') !== 'direct', // ?via=direct forces the cross-device (WebRTC) path for testing
    onState: (s) => {
      $('#waiting').hidden = true;
      stage.render(s);
      const rep = s.meta && s.meta.rep;
      $('#liveWith').textContent = rep ? `Live with ${rep}` : 'Live';
    },
    onStatus: (st, via) => {
      const pill = $('#livePill');
      pill.className = `live-pill is-${st}`;
      if (st === 'live') { $('#liveVia').textContent = via === 'local' ? 'this browser' : 'direct link'; return; }
      if (stage && stage.state) { // already showing a slide: keep it up, just flag the connection
        if (st === 'reconnecting') $('#liveWith').textContent = 'Reconnecting…';
        return;
      }
      setWaiting(st);
    },
  });
  link.start();
}

function setWaiting(st) {
  $('#waiting').hidden = false;
  const t = $('#waitTitle'), p = $('#waitText');
  if (st === 'notfound') {
    t.textContent = 'Still looking for your rep…';
    p.innerHTML = `We haven’t found a live tour with code <b>${esc(code)}</b> yet. Make sure your rep has the tour open, or <a href="./join.html" id="changeCode">enter a different code</a>.`;
  } else {
    t.textContent = 'Connecting to your rep…';
    p.innerHTML = `Joining tour <b>${esc(code)}</b>. This usually takes a few seconds.`;
  }
}

function init() {
  document.querySelectorAll('[data-icon]').forEach((el) => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));
  const input = $('#codeInput');
  input.addEventListener('input', () => { const v = normalizeCode(input.value); if (input.value !== v) input.value = v; });
  $('#joinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const c = normalizeCode(input.value);
    if (c.length !== 6) { $('#joinMsg').textContent = 'The code is 6 letters and numbers, like K7M4QX.'; input.focus(); return; }
    join(c);
  });
  const c = normalizeCode(new URLSearchParams(location.search).get('code'));
  if (c.length === 6) join(c); else showJoin();
}

init();
