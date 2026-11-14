/* Delad sidhuvud och sidfot */
(function () {
  const logo = (full) => `<a class="logo" href="/" aria-label="Närsida, startsida"><img src="${full ? '/assets/logo-full.png' : '/assets/logo-header.png'}" alt="Närsida, webbsidor som gör skillnad" width="${full ? 1310 : 1310}" height="${full ? 300 : 240}"></a>`;
  const LINKS = [
    ['Hem', '/', 'home'],
    ['Webbdesign', '/webbdesign/', 'webbdesign'],
    ['Kontakt', '/kontakt/', 'kontakt']
  ];
  const page = document.body.dataset.page || '';
  const links = LINKS.map(l => `<a href="${l[1]}"${l[2] === page ? ' aria-current="page"' : ''}>${l[0]}</a>`).join('');
  const C = (window.NARSIDA || {}).contact || {};

  const header = document.getElementById('site-header');
  if (header) {
    header.innerHTML = `<header class="hdr" id="hdr"><div class="wrap hdr-in">${logo()}
      <nav class="nav" aria-label="Huvudmeny">${links}</nav>
      <a class="btn btn-sm hdr-cta" href="/kontakt/">Skaffa en hemsida</a>
      <button class="burger" id="burger" aria-label="Öppna menyn" aria-expanded="false" aria-controls="mnav"><span></span><span></span></button></div></header>
      <nav class="mnav" id="mnav" aria-label="Mobilmeny">${links}<a class="btn" href="/kontakt/">Skaffa en hemsida</a></nav>`;
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    const S = (window.NARSIDA || {}).social || {};
    const so = (k, label, d) => `<a href="${S[k] || '#'}" aria-label="${label}"${S[k] ? ' target="_blank" rel="noopener"' : ''}><svg viewBox="0 0 24 24" fill="currentColor">${d}</svg></a>`;
    footer.innerHTML = `<footer class="ftr"><div class="wrap">
      <div class="ftr-main">${logo()}
        <nav class="ftr-nav" aria-label="Sidfotsmeny">${links}</nav>
        <div class="ftr-soc">
          ${so('instagram', 'Instagram', '<path d="M7.5 3h9A4.5 4.5 0 0121 7.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3zm0 1.8A2.7 2.7 0 004.8 7.5v9a2.7 2.7 0 002.7 2.7h9a2.7 2.7 0 002.7-2.7v-9a2.7 2.7 0 00-2.7-2.7h-9zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1.8a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4zm4.9-2.4a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z"/>')}
          ${so('tiktok', 'TikTok', '<path d="M16.6 3c.3 2.4 1.7 3.9 4 4.1v3a7 7 0 01-4-1.3v6.1a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 102 2.5V3h2.7z"/>')}
          ${so('youtube', 'YouTube', '<path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/>')}
        </div>
      </div>
      <div class="ftr-bot"><span>© <span id="yr"></span> Närsida. Alla rättigheter förbehållna.</span><span class="ftr-legal"><a href="/integritetspolicy/">Integritetspolicy</a><a href="/anvandarvillkor/">Användarvillkor</a><a href="/cookiepolicy/">Cookiepolicy</a></span></div></div></footer>`;
    const y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
  }

  /* Rullning och meny */
  const hdr = document.getElementById('hdr');
  const onScroll = () => hdr && hdr.classList.toggle('scrolled', window.scrollY > 16);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  const burger = document.getElementById('burger'), mnav = document.getElementById('mnav');
  function setMenu(open) {
    if (!burger) return;
    burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Stäng menyn' : 'Öppna menyn');
    mnav.classList.toggle('open', open); document.body.classList.toggle('menu-open', open);
  }
  if (burger) {
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    mnav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width:821px)').addEventListener('change', () => setMenu(false));
  }

  /* Sidövergångar */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank') return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin) return;
    if (u.pathname === location.pathname && u.search === location.search) return;
    e.preventDefault(); document.body.classList.add('leaving');
    setTimeout(() => { location.href = u.href; }, 220);
  });
  window.addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });


  /* Bakgrund som binder ihop sidan: mjuka blå sken och en stor genomskinlig N-logga som rör sig lugnt med rullningen */
  const fx = document.createElement('div'); fx.className = 'bgfx'; fx.setAttribute('aria-hidden', 'true');
  fx.innerHTML = '<i class="g1"></i><i class="g2"></i><img class="bgn" src="/assets/logo-mark.png" alt="" width="430" height="330">';
  document.body.insertBefore(fx, document.body.firstChild);
  let ft = false;
  function fxMove() {
    ft = false;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight), p = Math.min(1, scrollY / max);
    fx.style.setProperty('--p', p.toFixed(4));
  }
  fxMove();
  window.addEventListener('scroll', () => { if (!ft) { ft = true; requestAnimationFrame(fxMove); } }, { passive: true });
})();

