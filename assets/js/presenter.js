// Presenter console: drives the tour, owns the state, and broadcasts it to customers.
import { SLIDES, SLIDE_MAP, START, GROUPS, ctxFor, resolveNext, leadRows, leadText, leadCsv } from './tour.js';
import { Stage, esc } from './render.js';
import { PresenterLink, newCode } from './sync.js';
import { icon } from './icons.js';

const $ = (s) => document.querySelector(s);
const STORE = 'goffs-live-tour:presenter';

const fresh = () => ({ v: 1, slideId: START, history: [], answers: {}, ui: { hotspot: null, gallery: 0 }, meta: { rep: '', company: '' }, allowCustomer: true });

function load() { try { return JSON.parse(sessionStorage.getItem(STORE)); } catch (e) { return null; } }
function save() { try { sessionStorage.setItem(STORE, JSON.stringify({ code, state })); } catch (e) {} }

const saved = load();
const code = (saved && saved.code) || newCode();
let state = (saved && saved.state) || fresh();
if (!SLIDE_MAP[state.slideId]) state = fresh();

const joinUrl = new URL(`join.html?code=${code}`, location.href).href;

// ---------------------------------------------------------------------------
const stage = new Stage($('#stage'), { mode: 'presenter', onAction: (a) => act(a) });
const link = new PresenterLink(code, { onMessage: fromCustomer, onStatus: renderStatus });

function commit(mutate) {
  mutate(state);
  save();
  stage.render(state);
  renderSide();
  link.broadcast(state);
}

function go(id, { push = true } = {}) {
  if (!SLIDE_MAP[id] || id === state.slideId) return;
  commit((s) => { if (push) s.history.push(s.slideId); s.slideId = id; s.ui = { hotspot: null, gallery: 0 }; });
}
function next() {
  const slide = SLIDE_MAP[state.slideId];
  const id = resolveNext(slide, ctxFor(state));
  if (!id) { if (slide.next) toast('Pick an answer to choose the next step'); return; }
  go(id);
}
function back() {
  if (!state.history.length) return;
  commit((s) => { s.slideId = s.history.pop(); s.ui = { hotspot: null, gallery: 0 }; });
}

function fieldDef(key) {
  for (const s of SLIDES) if (s.type === 'form') for (const f of s.fields) if (f.key === key) return f;
  return null;
}

function applyAnswer(s, key, value, multi) {
  if (multi) {
    const cur = Array.isArray(s.answers[key]) ? s.answers[key] : [];
    s.answers[key] = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
  } else {
    s.answers[key] = value;
  }
}

function act(a) {
  if (a.type === 'answer') commit((s) => applyAnswer(s, a.key, a.value, a.multi));
  else if (a.type === 'field') commit((s) => { s.answers[a.key] = a.value; });
  else if (a.type === 'step') {
    const f = fieldDef(a.key) || { min: 1, max: 99 };
    commit((s) => { const cur = Number(s.answers[a.key]) || f.min || 1; s.answers[a.key] = Math.min(f.max || 99, Math.max(f.min || 1, cur + a.delta)); });
  }
  else if (a.type === 'spot') commit((s) => { s.ui.hotspot = s.ui.hotspot === a.id ? null : a.id; });
  else if (a.type === 'photo') commit((s) => { s.ui.gallery = a.index; });
}

// Customer input is accepted only for questions on the slide currently showing.
function fromCustomer(msg) {
  if (!state.allowCustomer) return;
  const slide = SLIDE_MAP[state.slideId];
  if (msg.t === 'answer') {
    let ok = false, label = '';
    if (slide.type === 'choice' && slide.key === msg.key) { const o = slide.options.find((x) => x.value === msg.value); ok = !!o; label = o && o.label; }
    if (slide.type === 'form') { const f = slide.fields.find((x) => x.key === msg.key && x.kind === 'chips'); const o = f && f.options.find(([v]) => v === msg.value); ok = !!o; label = o && o[1]; }
    if (!ok) return;
    act({ type: 'answer', key: msg.key, value: msg.value, multi: !!slide.multi });
    toast(`Customer tapped: ${label}`, 'customer');
  } else if (msg.t === 'field') {
    if (slide.type !== 'form' || !slide.fields.some((f) => f.key === msg.key && f.kind === 'text')) return;
    act({ type: 'field', key: msg.key, value: String(msg.value || '').slice(0, 200) });
  } else if (msg.t === 'step') {
    if (slide.type !== 'form' || !slide.fields.some((f) => f.key === msg.key && f.kind === 'stepper')) return;
    act({ type: 'step', key: msg.key, delta: Math.sign(Number(msg.delta) || 0) });
  }
}

// ---------------------------------------------------------------------------
// Sidebar, status and controls

function renderSide() {
  const slide = SLIDE_MAP[state.slideId];
  const ctx = ctxFor(state);
  const notes = typeof slide.notes === 'function' ? slide.notes(ctx) : slide.notes;
  $('#notes').innerHTML = notes || '<span class="muted">No talk track for this slide.</span>';
  $('#where').textContent = slide.label;
  const nid = resolveNext(slide, ctx);
  const nextBtn = $('#nextBtn');
  nextBtn.disabled = !slide.next;
  nextBtn.classList.toggle('is-waiting', !!slide.next && !nid);
  $('#upNext').textContent = !slide.next ? 'End of tour' : nid ? `Up next: ${SLIDE_MAP[nid].label}` : 'Pick an answer to continue';
  $('#backBtn').disabled = !state.history.length;
  $('#jump').value = state.slideId;

  const rows = leadRows(state);
  let g = '', html = '';
  for (const r of rows) {
    if (r.group === 'Session') continue;
    if (r.group !== g) { if (g) html += '</dl>'; g = r.group; html += `<h4>${esc(g)}</h4><dl>`; }
    html += `<div class="${r.value ? '' : 'is-empty'}"><dt>${esc(r.label)}</dt><dd>${r.value ? esc(r.value) : '—'}</dd></div>`;
  }
  $('#captured').innerHTML = html + '</dl>';
  $('#allowCustomer').checked = !!state.allowCustomer;
  $('#sessionMeta').textContent = [state.meta.company, state.meta.rep].filter(Boolean).join(' · ') || 'No customer name set';
}

function renderStatus({ peer, viewers }) {
  const el = $('#status');
  let text, cls;
  if (viewers > 0) { text = `${viewers} customer screen${viewers > 1 ? 's' : ''} connected`; cls = 'is-live'; }
  else if (peer === 'online') { text = 'Waiting for customer'; cls = 'is-ready'; }
  else if (peer === 'connecting') { text = 'Connecting…'; cls = 'is-wait'; }
  else if (peer === 'taken') { text = 'Code in use. Start a new session'; cls = 'is-bad'; }
  else { text = 'Same-browser only (network blocked)'; cls = 'is-bad'; }
  el.className = `status ${cls}`;
  $('#statusText').textContent = text;
}

let toastTimer;
function toast(msg, kind = '') {
  const t = $('#toast');
  t.innerHTML = `${kind === 'customer' ? icon('user') : icon('info')}<span>${esc(msg)}</span>`;
  t.className = `toast is-on ${kind ? 'is-' + kind : ''}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 2600);
}

function buildJump() {
  const sel = $('#jump');
  sel.innerHTML = GROUPS.map((g) => `<optgroup label="${esc(g.label)}">${SLIDES.filter((s) => s.group === g.id).map((s) => `<option value="${s.id}">${esc(s.label)}</option>`).join('')}</optgroup>`).join('');
  sel.addEventListener('change', () => go(sel.value));
}

function openCustomerWindow() {
  const w = window.open(joinUrl, 'goffs-customer-view', 'popup,width=1180,height=720');
  if (!w) toast('Your browser blocked the pop-up. Use the link in Invite instead.');
}

function copy(text, msg) {
  (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
    .then(() => toast(msg))
    .catch(() => { window.prompt('Copy this:', text); });
}

function download(name, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function fileSlug() {
  const c = (state.meta.company || 'customer').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `goffs-tour-${c || 'customer'}-${new Date().toISOString().slice(0, 10)}`;
}

// ---------------------------------------------------------------------------
// Wire up

function init() {
  document.querySelectorAll('[data-icon]').forEach((el) => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));
  $('#code').textContent = code;
  $('#inviteCode').textContent = code;
  $('#inviteLink').value = joinUrl;
  buildJump();

  $('#nextBtn').addEventListener('click', next);
  $('#backBtn').addEventListener('click', back);
  $('#openClient').addEventListener('click', openCustomerWindow);
  $('#openClient2').addEventListener('click', openCustomerWindow);
  $('#code').addEventListener('click', () => copy(code, 'Client code copied'));

  const invite = $('#inviteDlg');
  $('#inviteBtn').addEventListener('click', () => {
    const qr = $('#qr');
    qr.innerHTML = '';
    if (window.QRCode) new window.QRCode(qr, { text: joinUrl, width: 168, height: 168, colorDark: '#0E2236', colorLight: '#ffffff', correctLevel: window.QRCode.CorrectLevel.M });
    else qr.textContent = 'QR unavailable';
    invite.showModal();
  });
  $('#copyLink').addEventListener('click', () => copy(joinUrl, 'Join link copied'));

  $('#allowCustomer').addEventListener('change', (e) => commit((s) => { s.allowCustomer = e.target.checked; }));

  const start = $('#startDlg');
  $('#editSession').addEventListener('click', () => { $('#repName').value = state.meta.rep || ''; $('#company').value = state.meta.company || ''; start.showModal(); });
  $('#startForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const rep = $('#repName').value.trim().slice(0, 60), company = $('#company').value.trim().slice(0, 80);
    commit((s) => { s.meta = { rep, company }; });
    start.close();
  });
  $('#skipStart').addEventListener('click', () => start.close());
  document.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));

  $('#resetBtn').addEventListener('click', () => {
    if (!confirm('Start the tour over? This clears every answer for this customer.')) return;
    const meta = state.meta;
    commit((s) => { Object.assign(s, fresh(), { meta }); });
  });

  $('#copyLead').addEventListener('click', () => copy(leadText(state), 'Lead summary copied'));
  $('#csvLead').addEventListener('click', () => download(`${fileSlug()}.csv`, '﻿' + leadCsv(state), 'text/csv;charset=utf-8'));
  $('#mailLead').addEventListener('click', () => {
    const subject = `Live tour summary${state.meta.company ? ': ' + state.meta.company : ''}`;
    location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(leadText(state))}`;
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select, dialog')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); back(); }
    else if (/^[1-9]$/.test(e.key)) {
      const slide = SLIDE_MAP[state.slideId], n = Number(e.key) - 1;
      if (slide.type === 'choice' && slide.options[n]) act({ type: 'answer', key: slide.key, value: slide.options[n].value, multi: !!slide.multi });
      if (slide.type === 'hotspots') { const sp = (typeof slide.spots === 'function' ? slide.spots(ctxFor(state)) : slide.spots)[n]; if (sp) act({ type: 'spot', id: sp.id }); }
      if (slide.type === 'gallery' && slide.photos[n]) act({ type: 'photo', index: n });
    }
  });

  stage.render(state);
  renderSide();
  link.start(state);
  save();
  if (!saved) { start.showModal(); setTimeout(() => $('#repName').focus(), 50); }
}

init();
