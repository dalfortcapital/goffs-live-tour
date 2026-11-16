// Renders a tour slide onto a fixed 1280x720 canvas that scales to fit its host.
// The presenter and the customer both use this, so both screens show the same slide.
import { SLIDE_MAP, SECTIONS, START, ctxFor, labelFor, questionFor, BRANCH_KEYS, SCOPE_KEYS, CONTACT, DIAGRAMS, PHOTOS } from './tour.js';
import { icon } from './icons.js';

const W = 1280, H = 720;

export const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const val = (x, ctx) => (typeof x === 'function' ? x(ctx) : x);

export class Stage {
  constructor(host, { mode = 'presenter', onAction = () => {} } = {}) {
    this.host = host;
    this.mode = mode;
    this.onAction = onAction;
    this.state = null;
    this.key = null;
    host.classList.add('stage-host');
    host.dataset.mode = mode;
    this.canvas = document.createElement('div');
    this.canvas.className = 'slide-canvas';
    host.appendChild(this.canvas);
    new ResizeObserver(() => this.fit()).observe(host);
    this.fit();
    this.canvas.addEventListener('click', (e) => this.onClick(e));
    this.canvas.addEventListener('input', (e) => this.onInput(e));
    // Photo fallback: if a remote photo fails, show a placeholder instead of a broken image.
    this.canvas.addEventListener('error', (e) => { const t = e.target; if (t && t.tagName === 'IMG') { const ph = t.closest('.photo'); if (ph) ph.classList.add('is-broken'); } }, true);
  }

  fit() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    const s = Math.max(0.05, Math.min(w / W, h / H));
    this.canvas.style.transform = `translate(-50%, -50%) scale(${s})`;
  }

  canAnswer() { return this.mode === 'presenter' || !!(this.state && this.state.allowCustomer); }

  onClick(e) {
    const el = e.target.closest('[data-act]');
    if (!el || !this.canvas.contains(el)) return;
    const act = el.dataset.act;
    if (this.mode !== 'presenter' && (!this.canAnswer() || (act !== 'choose' && act !== 'step'))) return;
    if (act === 'choose') this.onAction({ type: 'answer', key: el.dataset.key, value: el.dataset.value, multi: el.dataset.multi === '1' });
    else if (act === 'step') this.onAction({ type: 'step', key: el.dataset.key, delta: Number(el.dataset.delta) });
    else if (act === 'spot') this.onAction({ type: 'spot', id: el.dataset.id });
    else if (act === 'photo') this.onAction({ type: 'photo', index: Number(el.dataset.index) });
  }

  onInput(e) {
    const el = e.target.closest('[data-field]');
    if (!el || !this.canAnswer()) return;
    this.onAction({ type: 'field', key: el.dataset.field, value: el.value.slice(0, 200) });
  }

  render(state) {
    this.state = state;
    const slide = SLIDE_MAP[state.slideId] || SLIDE_MAP[START];
    const ctx = ctxFor(state);
    const key = [slide.id, JSON.stringify(state.meta || {}), this.canAnswer()].join('|');
    if (key !== this.key) {
      this.key = key;
      this.spot = undefined;
      this.gal = undefined;
      this.canvas.innerHTML = slideHtml(slide, state, ctx, this);
      this.canvas.classList.toggle('can-answer', this.canAnswer());
      this.canvas.classList.toggle('is-driver', this.mode === 'presenter');
    }
    this.patch(slide, state, ctx);
  }

  // Small updates that shouldn't re-render the slide (selections, typing, hotspot, photo).
  patch(slide, state, ctx) {
    const c = this.canvas, a = state.answers || {}, ui = state.ui || {};
    c.querySelectorAll('[data-act="choose"]').forEach((el) => {
      const cur = a[el.dataset.key];
      const on = Array.isArray(cur) ? cur.includes(el.dataset.value) : cur === el.dataset.value;
      el.classList.toggle('selected', on);
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    c.querySelectorAll('[data-field]').forEach((el) => {
      if (document.activeElement === el) return;
      const v = a[el.dataset.field] == null ? '' : String(a[el.dataset.field]);
      if (el.value !== v) el.value = v;
    });
    c.querySelectorAll('[data-out]').forEach((el) => { el.textContent = a[el.dataset.out] || el.dataset.default || ''; });

    if (slide.type === 'hotspots') {
      const id = ui.hotspot || null;
      c.querySelectorAll('.pin').forEach((p) => p.classList.toggle('is-active', p.dataset.id === id));
      if (this.spot !== id) {
        this.spot = id;
        const box = c.querySelector('[data-callout]');
        if (box) box.innerHTML = calloutHtml(val(slide.spots, ctx), id);
      }
    }
    if (slide.type === 'gallery') {
      const photos = slide.photos;
      const i = Math.min(Math.max(ui.gallery || 0, 0), photos.length - 1);
      if (this.gal !== i) {
        this.gal = i;
        const main = c.querySelector('.gal-main');
        const img = main && main.querySelector('img');
        if (img) { main.classList.remove('is-broken'); img.src = photos[i].src; }
        const cap = c.querySelector('[data-cap]');
        if (cap) cap.textContent = photos[i].caption;
        const count = c.querySelector('[data-count]');
        if (count) count.textContent = `${i + 1} / ${photos.length}`;
        c.querySelectorAll('.thumb').forEach((t) => t.classList.toggle('is-active', Number(t.dataset.index) === i));
      }
    }
  }
}

// ---------------------------------------------------------------------------

function photoHtml(src, cls = '', fallbackIcon = 'image') {
  return `<div class="photo ${cls}">${src ? `<img src="${esc(src)}" alt="" referrerpolicy="no-referrer" loading="eager">` : ''}<div class="fallback">${icon(fallbackIcon)}</div></div>`;
}

function chrome(slide) {
  const idx = SECTIONS.findIndex((s) => s.id === slide.section);
  const steps = SECTIONS.map((s, i) => `<li class="${i < idx ? 'is-done' : i === idx ? 'is-current' : ''}">${esc(s.label)}</li>`).join('');
  return `<header class="chrome"><div class="wordmark"><b>GOFF’S</b><span>Performance Solutions</span></div><ol class="steps">${steps}</ol></header>`;
}

function slideHtml(slide, state, ctx, stage) {
  const render = TYPES[slide.type] || TYPES.about;
  const body = render(slide, state, ctx, stage);
  if (slide.type === 'title') return `<div class="slide slide--title">${body}</div>`;
  return `<div class="slide slide--${slide.type}">${chrome(slide)}<div class="body">${body}</div></div>`;
}

function head(slide, ctx, i0 = 0) {
  const title = val(slide.title, ctx);
  return `${slide.eyebrow ? `<p class="eyebrow anim" style="--i:${i0}">${esc(val(slide.eyebrow, ctx))}</p>` : ''}`
    + `<h2 class="anim" style="--i:${i0 + 1}">${esc(title)}</h2>`
    + `${slide.sub ? `<p class="sub anim" style="--i:${i0 + 2}">${esc(val(slide.sub, ctx))}</p>` : ''}`;
}

const TYPES = {
  title(slide, state, ctx) {
    const m = state.meta || {};
    return `
      <div class="hero-photo">${photoHtml(PHOTOS.cwYellow.src, '', 'curtain')}</div>
      <div class="hero">
        <div class="wordmark wordmark--light anim"><b>GOFF’S</b><span>Performance Solutions</span></div>
        <div class="hero-main">
          <p class="eyebrow anim" style="--i:1">Live product tour${m.company ? ` · Prepared for ${esc(m.company)}` : ''}</p>
          <h1 class="anim" style="--i:2">Let’s find the right fit for your facility.</h1>
          <p class="lede anim" style="--i:3">A quick conversation about your space. Then we’ll show you exactly what solves it.</p>
        </div>
        <div class="hero-foot anim" style="--i:4">${m.rep ? `<span>${icon('user')} ${esc(m.rep)}</span>` : ''}<span>${icon('pin')} Pewaukee, Wisconsin</span><span>${icon('globe')} ${esc(CONTACT.web)}</span></div>
      </div>
      <div class="stripes"></div>`;
  },

  about(slide, state, ctx) {
    const stats = (slide.stats || []).map(([b, s], i) => `<div class="stat anim" style="--i:${i + 2}"><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join('');
    const fams = (slide.families || []).map((f, i) => `<div class="fam anim" style="--i:${i + 6}"><span class="fam-ic">${icon(f.icon)}</span><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join('');
    return `${head(slide, ctx)}<div class="stats">${stats}</div><div class="families">${fams}</div>`;
  },

  choice(slide, state, ctx, stage) {
    const compact = slide.multi;
    const opts = slide.options.map((o, i) => `
      <button type="button" class="opt anim" style="--i:${i + 2}" data-act="choose" data-key="${esc(slide.key)}" data-value="${esc(o.value)}"${slide.multi ? ' data-multi="1"' : ''}>
        <span class="opt-num">${i + 1}</span>
        <span class="opt-ic">${icon(o.icon)}</span>
        <span class="opt-text"><span class="opt-label">${esc(o.label)}</span>${o.sub ? `<span class="opt-sub">${esc(o.sub)}</span>` : ''}</span>
        <span class="opt-check">${icon('check')}</span>
      </button>`).join('');
    const hint = stage.mode === 'client' && stage.canAnswer() ? `<p class="tap-hint anim" style="--i:9">${icon('info')} Tap your answer</p>` : '';
    return `${head(slide, ctx)}<div class="options cols-${slide.cols || 3}${compact ? ' is-compact' : ''}">${opts}</div>${hint}`;
  },

  compare(slide, state, ctx) {
    const c = val(slide.compare, ctx);
    const list = (items) => items.map((t) => `<li>${esc(t)}</li>`).join('');
    return `${head({ ...slide, title: c.title }, ctx)}
      <div class="compare">
        <div class="cmp without anim" style="--i:3"><h3><span class="badge">${icon('x')}</span>${esc(c.without.title)}</h3><ul>${list(c.without.items)}</ul></div>
        <div class="vs anim" style="--i:4">vs</div>
        <div class="cmp with anim" style="--i:5"><h3><span class="badge">${icon('check')}</span>${esc(c.with.title)}</h3><ul>${list(c.with.items)}</ul></div>
      </div>`;
  },

  recommend(slide, state, ctx) {
    const rec = ctx.rec;
    if (!rec) return `<div class="empty">${icon('info')}<p>Answer the discovery questions first, and the recommendation will appear here.</p></div>`;
    const p = rec.product;
    const who = state.meta && state.meta.company ? `Recommended for ${esc(state.meta.company)}` : 'Our recommendation';
    const reasons = rec.reasons.map((r, i) => `<li class="anim" style="--i:${i + 4}"><span class="tick">${icon('check')}</span><span>${esc(r)}</span></li>`).join('');
    const addons = rec.addons.length ? `<div class="addons anim" style="--i:9"><span class="lbl">Also consider</span>${rec.addons.map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div>` : '';
    const note = rec.note ? `<p class="note anim" style="--i:10">${icon('info')}<span>${esc(rec.note)}</span></p>` : '';
    const specs = p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    const img = p.photo ? photoHtml(p.photo, 'rec-photo', 'image') : photoHtml(DIAGRAMS[p.branch], 'rec-photo is-diagram', 'image');
    return `
      <div class="rec">
        <div class="rec-main">
          <p class="eyebrow anim">${who}</p>
          <h2 class="rec-name anim" style="--i:1">${esc(p.name)}</h2>
          <p class="rec-tag anim" style="--i:2">${esc(p.tagline)}</p>
          <h4 class="anim" style="--i:3">Why it fits what you told us</h4>
          <ul class="reasons">${reasons}</ul>
          ${addons}${note}
        </div>
        <div class="rec-side anim" style="--i:3">${img}<dl class="specs">${specs}</dl></div>
      </div>`;
  },

  hotspots(slide, state, ctx) {
    const spots = val(slide.spots, ctx);
    const pins = spots.map((s, i) => `<button type="button" class="pin" style="left:${s.x}%;top:${s.y}%" data-act="spot" data-id="${esc(s.id)}" aria-label="${esc(s.title)}"><span>${i + 1}</span></button>`).join('');
    return `
      <div class="hs">
        <div class="hs-fig anim" style="--i:1"><img src="${esc(slide.image)}" alt=""><div class="pins">${pins}</div></div>
        <div class="hs-side">${head(slide, ctx)}<div class="callout" data-callout></div></div>
      </div>`;
  },

  gallery(slide, state, ctx) {
    const thumbs = slide.photos.map((p, i) => `<button type="button" class="thumb photo" data-act="photo" data-index="${i}" aria-label="${esc(p.caption)}"><img src="${esc(p.src)}" alt="" referrerpolicy="no-referrer"><div class="fallback">${icon('image')}</div></button>`).join('');
    return `${head(slide, ctx)}
      <div class="gal">
        <div class="gal-main photo anim" style="--i:2"><img alt="" referrerpolicy="no-referrer"><div class="fallback">${icon('image')}</div><div class="gal-cap"><span data-cap></span><span class="count" data-count></span></div></div>
        <div class="gal-thumbs anim" style="--i:3">${thumbs}</div>
      </div>`;
  },

  form(slide, state, ctx, stage) {
    const ro = stage.canAnswer() ? '' : ' readonly tabindex="-1"';
    const fields = slide.fields.map((f, i) => {
      let control = '';
      if (f.kind === 'stepper') {
        control = `<div class="stepper"><button type="button" data-act="step" data-key="${f.key}" data-delta="-1" aria-label="Fewer">−</button><output data-out="${f.key}" data-default="${f.min || 1}">${f.min || 1}</output><button type="button" data-act="step" data-key="${f.key}" data-delta="1" aria-label="More">+</button></div>`;
      } else if (f.kind === 'text') {
        control = `<input type="text" data-field="${f.key}" placeholder="${esc(f.placeholder || '')}" maxlength="200" autocomplete="off"${ro}>`;
      } else if (f.kind === 'chips') {
        control = `<div class="chips">${f.options.map(([v, l]) => `<button type="button" class="chip" data-act="choose" data-key="${f.key}" data-value="${esc(v)}">${esc(l)}</button>`).join('')}</div>`;
      }
      return `<div class="field anim${f.wide ? ' wide' : ''}" style="--i:${i + 2}"><label>${esc(f.label)}</label>${control}</div>`;
    }).join('');
    return `${head(slide, ctx)}<div class="form-grid">${fields}</div>`;
  },

  summary(slide, state, ctx) {
    const a = state.answers || {};
    const m = state.meta || {};
    const row = (k) => { const v = k === 'qty' ? (a.qty ? String(a.qty) : '') : labelFor(k, a[k]); return `<div><dt>${esc(questionFor(k))}</dt><dd>${v ? esc(v) : '<span class="tbd">To confirm</span>'}</dd></div>`; };
    const needs = [row('need'), ...(BRANCH_KEYS[a.need] || []).map(row)].join('');
    const scope = SCOPE_KEYS.map(row).join('');
    const rec = ctx.rec;
    const next = labelFor('followup', a.followup);
    return `
      <p class="eyebrow anim">Recap</p>
      <h2 class="anim" style="--i:1">Here’s what we heard${m.company ? `, ${esc(m.company)}` : ''}</h2>
      <div class="sum-grid">
        <div class="sum-card anim" style="--i:2"><h4>${icon('target')} What you need</h4><dl>${needs}</dl></div>
        <div class="sum-card is-rec anim" style="--i:3"><h4>${icon('check')} Our recommendation</h4>${rec ? `<p class="sum-product">${esc(rec.product.name)}</p><p class="sum-tag">${esc(rec.product.tagline)}</p>${rec.addons.length ? `<p class="sum-addons"><span>Also consider</span>${rec.addons.map(esc).join(' · ')}</p>` : ''}` : '<p class="sum-tag">To be confirmed</p>'}</div>
        <div class="sum-card anim" style="--i:4"><h4>${icon('layers')} Scope</h4><dl>${scope}</dl></div>
      </div>
      <div class="contact-strip anim" style="--i:5">
        <span class="next">${icon('calendar')} <b>Next step:</b> ${next ? `We’ll follow up ${esc(next.toLowerCase())}` : 'We’ll follow up with a quote'}${m.rep ? ` · ${esc(m.rep)}` : ''}</span>
        <span>${icon('phone')} ${esc(CONTACT.phone)}</span><span>${icon('mail')} ${esc(CONTACT.email)}</span><span>${icon('globe')} ${esc(CONTACT.web)}</span>
      </div>`;
  },
};

function calloutHtml(spots, id) {
  const i = spots.findIndex((s) => s.id === id);
  const nums = spots.map((s, n) => `<button type="button" class="num${s.id === id ? ' is-active' : ''}" data-act="spot" data-id="${esc(s.id)}" aria-label="${esc(s.title)}">${n + 1}</button>`).join('');
  if (i < 0) {
    const list = spots.map((s, n) => `<li><button type="button" class="spot-item" data-act="spot" data-id="${esc(s.id)}"><span class="n">${n + 1}</span>${esc(s.title)}</button></li>`).join('');
    return `<p class="callout-hint">${icon('target')} Tap a numbered point to explore</p><ul class="spot-list">${list}</ul>`;
  }
  const s = spots[i];
  return `<div class="callout-card"><span class="callout-n">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div><div class="nums">${nums}</div>`;
}
