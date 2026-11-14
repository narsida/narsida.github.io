/* Enkelt kontaktformulär. Skickar JSON till adressen i config.js. Utan adress skickas inget, och det sägs öppet. */
(function () {
  const CFG = () => window.NARSIDA || {};
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  const MARKUP = `<form class="cf" novalidate>
    <div class="cf-row">
      <label class="cf-f" data-f="company"><span>Företagsnamn <b>*</b></span><input class="cf-in" name="company" autocomplete="organization" placeholder="Till exempel Norrs Bygg"><em class="cf-err">Ange företagets namn.</em></label>
      <label class="cf-f" data-f="name"><span>Ditt namn <b>*</b></span><input class="cf-in" name="name" autocomplete="name" placeholder="Till exempel Anna Svensson"><em class="cf-err">Ange ditt namn.</em></label>
    </div>
    <div class="cf-row">
      <label class="cf-f" data-f="email"><span>Epostadress <b>*</b></span><input class="cf-in" name="email" type="email" autocomplete="email" placeholder="namn@foretag.se"><em class="cf-err">Ange en giltig epostadress, till exempel namn@foretag.se.</em></label>
      <label class="cf-f" data-f="phone"><span>Telefonnummer</span><input class="cf-in" name="phone" type="tel" autocomplete="tel" placeholder="Valfritt"><em class="cf-err">Telefonnumret verkar inte stämma.</em></label>
    </div>
    <label class="cf-f" data-f="msg"><span>Meddelande <b>*</b></span><textarea class="cf-in cf-area" name="msg" placeholder="Berätta kort om ditt företag och vad du behöver."></textarea><em class="cf-err">Skriv några rader om vad du behöver.</em></label>
    <div class="hp" aria-hidden="true"><label>Lämna detta fält tomt<input name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="cf-consent" data-f="consent"><label><input type="checkbox" name="consent"><span>Jag godkänner att Närsida behandlar mina uppgifter för att kunna kontakta mig angående min förfrågan. Läs mer i <a href="/integritetspolicy/">integritetspolicyn</a>.</span></label><em class="cf-err">Du måste godkänna för att kunna skicka förfrågan.</em></div>
    <button class="btn cf-btn" type="submit">Skicka förfrågan ${ARROW}</button>
    <div class="fstatus" role="status" aria-live="polite"></div>
  </form>`;

  const rules = {
    company: v => v.trim().length > 1,
    name: v => v.trim().length > 1,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    phone: v => !v.trim() || /^[0-9+\s()]{6,20}$/.test(v.trim()),
    msg: v => v.trim().length > 9,
    consent: v => v === true
  };
  const val = (form, n) => n === 'consent' ? form.elements.consent.checked : form.elements[n].value;
  function check(form, n, show) {
    const wrap = form.querySelector(`[data-f=${n}]`), ok = rules[n](val(form, n));
    wrap.classList.toggle('bad', show && !ok);
    return ok;
  }

  function render(root) {
    root.innerHTML = MARKUP;
    const form = root.querySelector('form'), status = form.querySelector('.fstatus');
    const typ = new URLSearchParams(location.search).get('typ');
    if (typ) form.elements.msg.value = 'Jag är intresserad av en hemsida liknande exemplet "' + typ + '". ';

    Object.keys(rules).forEach(n => {
      form.querySelectorAll(`[name=${n}]`).forEach(el => {
        el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') check(form, n, true); });
        el.addEventListener('input', () => { if (form.querySelector(`[data-f=${n}]`).classList.contains('bad')) check(form, n, true); });
        el.addEventListener('change', () => check(form, n, true));
      });
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      status.className = 'fstatus';
      let first = null;
      Object.keys(rules).forEach(n => { if (!check(form, n, true) && !first) first = n; });
      if (first) {
        const el = form.elements[first]; el.focus({ preventScroll: true });
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        status.textContent = 'Kontrollera de markerade fälten och försök igen.'; status.className = 'fstatus show bad';
        return;
      }
      if (form.elements.website.value) return;           // robotskydd: dolt fält ifyllt
      const data = {
        foretagsnamn: val(form, 'company'), kontaktperson: val(form, 'name'), epost: val(form, 'email'), telefon: val(form, 'phone'),
        meddelande: val(form, 'msg'), samtycke: 'Ja', sida: location.href
      };
      const cfg = CFG();
      if (!cfg.formEndpoint) {
        const mail = cfg.fallbackEmail || (cfg.contact || {}).email;
        status.className = 'fstatus show warn';
        status.innerHTML = 'Formuläret är inte kopplat till en mottagare ännu, så ingenting har skickats. ' +
          (mail ? `Du kan i stället <a href="mailto:${mail}?subject=${encodeURIComponent('Förfrågan från ' + data.foretagsnamn)}&body=${encodeURIComponent(Object.entries(data).map(([k, v]) => k + ': ' + v).join('\n'))}">skicka förfrågan via epost</a>.` : 'Kontakta oss via epost tills detta är på plats.');
        return;
      }
      const btn = form.querySelector('button[type=submit]'); btn.disabled = true; btn.firstChild.textContent = 'Skickar... ';
      try {
        const res = await fetch(cfg.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error('http ' + res.status);
        root.innerHTML = `<div class="cf-ok" role="status"><h2>Tack för din förfrågan.</h2><p>Vi har tagit emot ditt meddelande och återkommer så snart vi kan.</p><a class="btn btn-ghost" href="/">Till startsidan</a></div>`;
        root.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (err) {
        btn.disabled = false; btn.firstChild.textContent = 'Skicka förfrågan ';
        status.className = 'fstatus show bad';
        status.textContent = 'Något gick fel och din förfrågan skickades inte. Försök igen om en stund eller kontakta oss direkt.';
      }
    });
  }
  document.querySelectorAll('[data-contact-form]').forEach(render);
})();
