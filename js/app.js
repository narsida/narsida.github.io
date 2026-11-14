/* Närsida: interaktion (galleri, förhandsvisning, 3D, "Föreställ dig ditt företag här") */
(function () {
  const P = window.Previews;
  const fine = window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* Scroll reveal */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  const reveal = root => (root || document).querySelectorAll('.reveal:not(.in)').forEach((el, i) => { if (io) { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); } else el.classList.add('in'); });

  /* Lätt 3D lutning vid hover */
  function tilt(el, target) {
    if (!fine) return;
    const t = target || el;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      t.style.setProperty('--tx', (x * 7).toFixed(2)); t.style.setProperty('--ty', (-y * 7).toFixed(2));
    });
    el.addEventListener('pointerleave', () => { t.style.setProperty('--tx', 0); t.style.setProperty('--ty', 0); });
  }

  /* Hero: rullande rad med exempel */
  document.querySelectorAll('[data-ribbon]').forEach(r => {
    const one = r.dataset.ids.split(',').map(id => `<div class="rb">${P.frame(id)}</div>`).join('');
    r.innerHTML = one + one;
    P.fit(r);
  });
  /* Modal för förhandsvisning */
  let modal = null, current = null, list = [], lastFocus = null;
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('dialog'); modal.className = 'pmodal'; modal.setAttribute('aria-label', 'Förhandsvisning av hemsida');
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
    modal.addEventListener('close', () => { document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); });
    modal.addEventListener('keydown', e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
    return modal;
  }
  function fillModal() {
    const c = P.get(current);
    modal.innerHTML = `<div class="pm-top"><div><span class="tag">Designkoncept</span><h3 style="margin-top:12px">${P.esc(c.type)}</h3><p>${P.esc(c.desc)}</p>
      <div class="pm-feats">${c.feats.map(f => `<span class="tag">${P.esc(f)}</span>`).join('')}</div></div>
      <div class="pm-actions"><button class="icon-btn" data-prev aria-label="Föregående exempel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>
      <button class="icon-btn" data-next aria-label="Nästa exempel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
      <button class="icon-btn" data-close aria-label="Stäng förhandsvisning"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div></div>
      ${P.frame(c, { scroll: true })}
      <div class="pm-foot"><small>Exemplet är ett designkoncept för ett fiktivt företag.</small><a class="btn" href="/kontakt/?typ=${encodeURIComponent(c.type)}">Skaffa en liknande hemsida ${ARROW}</a></div>`;
    modal.querySelector('[data-close]').onclick = () => modal.close();
    modal.querySelector('[data-prev]').onclick = () => step(-1);
    modal.querySelector('[data-next]').onclick = () => step(1);
    P.fit(modal);
  }
  function step(d) { const i = list.indexOf(current); current = list[(i + d + list.length) % list.length]; fillModal(); }
  function openModal(id, ids) {
    ensureModal(); list = ids; current = id; lastFocus = document.activeElement; fillModal();
    document.body.style.overflow = 'hidden'; modal.showModal();
    requestAnimationFrame(() => P.fit(modal));
  }

  /* Galleri */
  document.querySelectorAll('[data-showcase]').forEach(grid => {
    const ids = grid.dataset.ids ? grid.dataset.ids.split(',') : P.list.map(c => c.id);
    const items = ids.map(P.get);
    grid.innerHTML = items.map(c => `<button class="pcard reveal" data-id="${c.id}" data-cat="${c.cat}" aria-label="Förhandsgranska exempel: ${P.esc(c.type)}">
      <div class="pcard-in">${P.frame(c)}<div class="pover"><span>Förhandsgranska</span></div></div>
      <div class="pmeta"><span class="pcat">${P.esc((P.cats.find(x => x[0] === c.cat) || [0, ""])[1])}</span><h3>${P.esc(c.type)}</h3><p>${P.esc(c.desc)}</p><span class="pgo">Förhandsgranska ${ARROW}</span></div></button>`).join('');
    P.fit(grid);
    grid.querySelectorAll('.pcard').forEach(card => {
      tilt(card, card.querySelector('.pcard-in'));
      card.addEventListener('click', () => {
        const visible = [...grid.querySelectorAll('.pcard:not(.hide)')].map(x => x.dataset.id);
        openModal(card.dataset.id, visible);
      });
    });
    reveal(grid);

    const bar = document.querySelector('[data-filters]');
    if (bar) {
      const count = document.querySelector('[data-count]');
      bar.innerHTML = P.cats.map((c, i) => `<button class="chip" data-cat="${c[0]}" aria-pressed="${i === 0}">${c[1]}</button>`).join('');
      /* "Alla": sex exempel åt gången, blandade över kategorierna. Knappen byter ut dem mot sex andra. */
      const PER = 6;
      const cards = [...grid.querySelectorAll('.pcard')];
      const byCat = {}; cards.forEach(card => { (byCat[card.dataset.cat] = byCat[card.dataset.cat] || []).push(card); });
      const lists = Object.values(byCat), mixed = [];
      for (let i = 0; lists.some(l => i < l.length); i++) lists.forEach(l => { if (l[i]) mixed.push(l[i]); });
      const pages = Math.ceil(mixed.length / PER);
      let page = 0, curCat = 'alla';
      const more = document.createElement('div'); more.className = 'center-cta';
      more.innerHTML = `<button type="button" class="btn btn-ghost" data-more><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 11-2.6-5.9M20 4v5h-5"/></svg>Visa andra exempel</button>`;
      grid.after(more);
      const apply = (cat, slide) => {
        curCat = cat;
        let n = 0;
        const shown = new Set(mixed.slice(page * PER, page * PER + PER));
        cards.forEach(card => {
          const show = cat === 'alla' ? shown.has(card) : card.dataset.cat === cat;
          card.classList.toggle('hide', !show); card.classList.remove('show', 'slide-in', 'slide-out'); card.style.animationDelay = '';
          if (show) { n++; void card.offsetWidth; card.classList.add(slide ? 'slide-in' : 'show'); card.classList.add('in'); if (slide) card.style.animationDelay = ((n - 1) * 70) + 'ms'; }
        });
        more.hidden = cat !== 'alla';
        P.fit(grid);
        if (count) count.textContent = cat === 'alla' ? 'Visar ' + n + ' av ' + cards.length + ' exempel (grupp ' + (page + 1) + ' av ' + pages + ')' : (n === 1 ? 'Visar 1 exempel' : 'Visar ' + n + ' exempel');
      };
      let busy = false;
      more.querySelector('[data-more]').addEventListener('click', () => {
        if (busy) return; busy = true;
        const vis = [...grid.querySelectorAll('.pcard:not(.hide)')];
        vis.forEach((card, i) => { card.classList.remove('show', 'slide-in'); card.style.animationDelay = (i * 40) + 'ms'; card.classList.add('slide-out'); });
        setTimeout(() => { page = (page + 1) % pages; apply('alla', true); busy = false; }, 420 + vis.length * 40);
      });      bar.addEventListener('click', e => {
        const b = e.target.closest('.chip'); if (!b) return;
        bar.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b));
        apply(b.dataset.cat);
      });      apply('alla');
    }
  });

  /* Karusell med exempel */
  document.querySelectorAll('[data-carousel]').forEach(car => {
    const ids = car.dataset.ids.split(',');
    const items = ids.map(P.get);
    car.innerHTML = `<button class="car-btn prev" aria-label="Föregående exempel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>
      <div class="car-view"><div class="car-track">${items.map(c => `<div class="slide"><button class="pcard" data-id="${c.id}" aria-label="Förhandsgranska exempel: ${P.esc(c.type)}"><div class="pcard-in">${P.frame(c)}<div class="pover"><span>Förhandsgranska</span></div></div></button></div>`).join('')}</div></div>
      <button class="car-btn next" aria-label="Nästa exempel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
      <div class="car-dots" role="group" aria-label="Välj exempel"></div>`;
    const track = car.querySelector('.car-track'), slides = [...track.children], dots = car.querySelector('.car-dots');
    let i = 0, timer = null;
    const per = () => (window.innerWidth <= 700 ? 1 : window.innerWidth <= 1000 ? 2 : 3);
    const max = () => Math.max(0, slides.length - per());
    function render() {
      const n = per(), gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      i = Math.min(i, max());
      const w = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(${-i * (w + gap)}px)`;
      slides.forEach((s, k) => {
        const p = k - i;
        s.className = 'slide' + (p === 0 && n > 1 ? ' l' : '') + (p === n - 1 && n > 1 ? ' r' : '') + (n === 3 && p === 1 ? ' m' : '');
        s.setAttribute('aria-hidden', p < 0 || p >= n);
        s.querySelector('button').tabIndex = p < 0 || p >= n ? -1 : 0;
      });
      dots.innerHTML = Array.from({ length: max() + 1 }, (_, k) => `<button aria-label="Visa grupp ${k + 1}" aria-current="${k === i}"></button>`).join('');
    }
    function go(n) { i = n > max() ? 0 : n < 0 ? max() : n; render(); }
    car.querySelector('.prev').onclick = () => { go(i - 1); stop(); };
    car.querySelector('.next').onclick = () => { go(i + 1); stop(); };
    dots.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { go([...dots.children].indexOf(b)); stop(); } });
    slides.forEach(s => s.querySelector('.pcard').addEventListener('click', () => openModal(s.querySelector('.pcard').dataset.id, ids)));
    function stop() { clearInterval(timer); timer = null; }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      car.addEventListener('mouseenter', stop);
      timer = setInterval(() => go(i + 1), 5000);
    }
    window.addEventListener('resize', render);
    render(); P.fit(car);
    requestAnimationFrame(render);
  });

  /* Föreställ dig ditt företag här */
  document.querySelectorAll('[data-imagine]').forEach(root => {
    const INDUSTRIES = [['Bygg', 'bygg', 'Norrs Bygg'], ['Frisör', 'frisor', 'Salong Stina'], ['Klädbutik', 'klader', 'Garderoben'], ['Yoga', 'yoga', 'Yoga i Staden'], ['Elektriker', 'el', 'Elfix'], ['Fotograf', 'foto', 'Foto Maja'], ['Cykel', 'cykel', 'Cykelverkstan'], ['Trädgård', 'tradgard', 'Gröna Händer'], ['Café', 'cafe', 'Kaffehörnan'], ['Blommor', 'blommor', 'Blomsterlådan'], ['Bilverkstad', 'bil', 'Centrala Bilservice'], ['Restaurang', 'pizzeria', 'Dinas Pizzeria']];
    const DICE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 8.5h.01M15.500 8.500h.01M12 12h.01M8.500 15.500h.01M15.500 15.500h.01"/></svg>';
    let id = INDUSTRIES[0][1], name = '';
    root.innerHTML = `<div class="reveal"><p class="eyebrow">Se din egen hemsida</p><h2>Föreställ dig <em>ditt företag här.</em></h2>
      <p class="lead">Välj bransch och skriv ditt företagsnamn, så ser du direkt hur din hemsida kan se ut.</p>
      <p class="flabel im-l">Bransch</p>
      <div class="chips" role="group" aria-label="Välj bransch">${INDUSTRIES.map((x, i) => `<button class="chip" data-id="${x[1]}" aria-pressed="${i === 0}">${x[0]}</button>`).join('')}</div>
      <div class="field"><label for="im-name">Ditt företagsnamn</label><input class="input" id="im-name" maxlength="26" placeholder="Till exempel ${INDUSTRIES[0][2]}" autocomplete="off"></div>
      <div class="im-actions"><a class="btn" data-cta href="/kontakt/">Skaffa en hemsida som denna ${ARROW}</a><button type="button" class="btn btn-ghost" data-rand>${DICE}Överraska mig</button></div></div>
      <div class="imagine-stage reveal"><div class="tilt"><div data-out></div><span class="im-badge" data-badge></span></div>
      <div class="imagine-note"><span data-label></span><span>Ett designkoncept. Din riktiga hemsida skräddarsys efter dig.</span></div></div>`;
    const out = root.querySelector('[data-out]'), label = root.querySelector('[data-label]'), cta = root.querySelector('[data-cta]'), inp = root.querySelector('#im-name'), badge = root.querySelector('[data-badge]');
    const draw = () => {
      const c = P.get(id), ind = INDUSTRIES.find(x => x[1] === id);
      out.classList.remove('swap'); void out.offsetWidth; out.classList.add('swap');
      out.innerHTML = P.frame(c, { brand: name.trim() || null });
      P.fit(out); label.textContent = c.type;
      badge.textContent = name.trim() || (ind ? ind[2] : c.brand);
      inp.placeholder = 'Till exempel ' + (ind ? ind[2] : c.brand);
      cta.href = '/kontakt/?typ=' + encodeURIComponent(c.type);
    };
    const pick = nid => { id = nid; root.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x.dataset.id === nid)); draw(); };
    root.querySelector('.chips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) pick(b.dataset.id); });
    root.querySelector('[data-rand]').addEventListener('click', () => { let n; do { n = INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)][1]; } while (n === id); pick(n); });
    inp.addEventListener('input', e => { name = e.target.value; draw(); });
    tilt(root.querySelector('.imagine-stage'), root.querySelector('.tilt'));
    draw(); reveal(root);
  });
  reveal();

  /* Våra lösningar: flikar på dator, dragspel på mobil */
  document.querySelectorAll('[data-tabs]').forEach(box => {
    const tabs = [...box.querySelectorAll('.tab')];
    function open(t) {
      tabs.forEach(x => { const on = x === t; x.classList.toggle('is-on', on); x.querySelector('.tab-btn').setAttribute('aria-expanded', on); });
    }
    tabs.forEach(t => {
      const b = t.querySelector('.tab-btn');
      b.addEventListener('click', () => open(t));
      b.addEventListener('mouseenter', () => { if (window.matchMedia('(min-width:901px) and (pointer:fine)').matches) open(t); });
    });
  });

  /* Våra lösningar: löpande band med tjänsterna. Texten under byter till ordet i mitten. */
  document.querySelectorAll('[data-band]').forEach(box => {
    const track = box.querySelector('.band-track'), view = box.querySelector('.band-view'), out = box.querySelector('[data-bd]');
    const set = [...track.children];
    const sep = () => { const i = document.createElement('img'); i.src = '/assets/logo-mark.png'; i.alt = ''; i.className = 'bsep'; i.setAttribute('aria-hidden', 'true'); return i; };
    const all = [];
    for (let k = 0; k < 2; k++) set.forEach(w => { const c = k ? w.cloneNode(true) : w; if (k) track.appendChild(c); all.push(c); });
    all.forEach(w => w.after(sep()));
    let cur = null;
    function tick() {
      const vr = view.getBoundingClientRect(), mid = vr.left + vr.width / 2;
      let best = null, bd = 1e9;
      all.forEach(w => { const r = w.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = w; } });
      if (best !== cur) {
        all.forEach(w => w.classList.toggle('on', w === best)); cur = best;
        out.classList.add('swap');
        setTimeout(() => { out.textContent = best.dataset.d; out.classList.remove('swap'); }, 140);
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  /* Våra lösningar: stor mening där varje markerat ord förklaras under */
  document.querySelectorAll('[data-sent]').forEach(box => {
    const words = [...box.querySelectorAll('.sw')], out = box.querySelector('.sent-out'), tt = box.querySelector('[data-st]'), dd = box.querySelector('[data-sd]');
    function pick(w) {
      if (w.classList.contains('on')) return;
      words.forEach(x => x.classList.toggle('on', x === w));
      out.classList.add('swap');
      setTimeout(() => { tt.textContent = w.dataset.t; dd.textContent = w.dataset.d; out.classList.remove('swap'); }, 150);
    }
    words.forEach(w => { w.addEventListener('click', () => pick(w)); w.addEventListener('focus', () => pick(w)); w.addEventListener('mouseenter', () => { if (matchMedia('(pointer:fine)').matches) pick(w); }); });
  });

  /* Kontaktsidan: formuläret lutar sig svagt efter muspekaren */
  document.querySelectorAll('[data-tilt3d]').forEach(el => tilt(el, el.querySelector('.kt-t3')));

  /* 3D scen: föremålen glider i olika djup efter muspekaren */
  document.querySelectorAll('[data-stage3d]').forEach(st => {
    if (!fine) return;
    window.addEventListener('pointermove', e => {
      st.style.setProperty('--mx', ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
      st.style.setProperty('--my', ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
    }, { passive: true });
  });
})();



