/* Närsida: designkoncept (miniatyrhemsidor). Återanvändbar komponent: Previews.frame(id, {brand}) */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const em = s => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
  const S = inner => `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;

  /* ---------- Illustrationer ---------- */
  const ART = {
    pizza: S(`<defs><radialGradient id="gpz" cx=".4" cy=".35"><stop offset="0" stop-color="#eaa84f"/><stop offset="1" stop-color="#b3651c"/></radialGradient></defs>
      <rect width="400" height="400" fill="#1b1410"/><rect x="0" y="0" width="400" height="400" fill="#241a13" opacity=".6"/>
      <circle cx="215" cy="200" r="176" fill="#2d2016"/><circle cx="215" cy="200" r="156" fill="url(#gpz)"/><circle cx="215" cy="200" r="132" fill="#c23b22"/>
      <g fill="#f7e9c1" opacity=".95"><circle cx="175" cy="165" r="27"/><circle cx="250" cy="150" r="22"/><circle cx="265" cy="228" r="28"/><circle cx="185" cy="248" r="24"/><circle cx="220" cy="200" r="16"/></g>
      <g fill="#7a1320"><circle cx="145" cy="210" r="14"/><circle cx="230" cy="262" r="13"/><circle cx="285" cy="180" r="12"/><circle cx="205" cy="125" r="12"/></g>
      <g fill="#2f8f3a"><path d="M165 195c18-14 34-6 38 8-18 10-34 6-38-8z"/><path d="M255 195c16-16 34-8 36 8-16 12-32 8-36-8z"/><path d="M215 150c14-18 32-10 34 4-16 12-30 10-34-4z"/></g>`),
    bistro: S(`<rect width="400" height="400" fill="#17130f"/><circle cx="200" cy="205" r="150" fill="#221c16"/><circle cx="200" cy="205" r="124" fill="#2c241c" stroke="#c9a46a" stroke-width="1.5"/><circle cx="200" cy="205" r="82" fill="#1c1712"/>
      <path d="M150 215c10-40 50-60 100-30-10 34-50 56-100 30z" fill="#b5703a"/><path d="M165 195c20-24 56-22 76-4" stroke="#c9a46a" stroke-width="3" fill="none"/>
      <circle cx="232" cy="182" r="6" fill="#6b8f4e"/><circle cx="215" cy="176" r="5" fill="#6b8f4e"/><circle cx="198" cy="180" r="4" fill="#9db86a"/>
      <g stroke="#c9a46a" stroke-width="2.5" stroke-linecap="round"><path d="M34 90v220M24 90v50M44 90v50M34 140v10"/><path d="M366 90v220M366 90c-18 10-18 70 0 80"/></g>`),
    cafe: S(`<rect width="400" height="400" fill="#e8d8c3"/><ellipse cx="200" cy="300" rx="150" ry="32" fill="#cfb89a"/><ellipse cx="200" cy="292" rx="132" ry="26" fill="#f6ede0"/>
      <path d="M118 188h164c0 70-30 104-82 104s-82-34-82-104z" fill="#fbf6ee"/><ellipse cx="200" cy="188" rx="82" ry="14" fill="#5a3a26"/><ellipse cx="200" cy="186" rx="70" ry="9" fill="#7a5238"/>
      <path d="M282 205c34-4 40 40 0 48" stroke="#fbf6ee" stroke-width="12" fill="none" stroke-linecap="round"/>
      <g stroke="#a98b6d" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"><path d="M170 150c-14-18 14-30 0-48"/><path d="M205 150c-14-18 14-30 0-48"/><path d="M240 150c-14-18 14-30 0-48"/></g>
      <path d="M40 330c16-26 50-30 70-10-6 22-52 34-70 10z" fill="#d99a4e"/><path d="M52 328c14-14 34-14 46-2" stroke="#b97a34" stroke-width="3" fill="none"/>`),
    bygg: S(`<rect width="400" height="400" fill="#171c25"/><rect y="300" width="400" height="100" fill="#232b38"/><g stroke="#2e384a" stroke-width="2"><path d="M300 0v180M330 0v180M300 40h30M300 80h30M300 120h30M300 160h30"/></g><path d="M300 0h110" stroke="#f5b301" stroke-width="6"/>
      <rect x="60" y="282" width="210" height="44" rx="22" fill="#2a2a2e"/><circle cx="88" cy="304" r="12" fill="#4a4a50"/><circle cx="242" cy="304" r="12" fill="#4a4a50"/><circle cx="165" cy="304" r="10" fill="#4a4a50"/>
      <rect x="86" y="222" width="164" height="64" rx="8" fill="#f5b301"/><path d="M104 222v-48h66l28 48z" fill="#f5b301"/><path d="M114 218v-38h48l20 38z" fill="#a9d6e8" opacity=".9"/>
      <path d="M228 240L306 150l30 20-76 96z" fill="#e0a000"/><path d="M306 150l58 64" stroke="#e0a000" stroke-width="18" stroke-linecap="round"/><path d="M350 204l32 16-10 38-36-12z" fill="#c78a00"/>`),
    el: S(`<rect width="400" height="400" fill="#e9eefb"/><circle cx="200" cy="190" r="140" fill="#d5defa"/><circle cx="200" cy="190" r="98" fill="#fff"/>
      <path d="M222 92l-70 114h46l-20 100 76-124h-48z" fill="#2f5bff"/><g stroke="#2f5bff" stroke-width="4" stroke-linecap="round" opacity=".5"><path d="M70 92l22 12M330 92l-22 12M56 190h28M344 190h-28"/></g>
      <rect x="150" y="320" width="100" height="26" rx="6" fill="#1c2a5c"/><rect x="170" y="346" width="60" height="16" rx="4" fill="#1c2a5c"/>`),
    shopbag: S(`<rect width="400" height="400" fill="#efe6d8"/><g><rect x="60" y="150" width="130" height="180" rx="8" fill="#c9a98a"/><path d="M95 150c0-40 60-40 60 0" stroke="#a98466" stroke-width="7" fill="none"/>
      <rect x="170" y="110" width="130" height="220" rx="8" fill="#8e9f86"/><path d="M205 110c0-44 60-44 60 0" stroke="#6f8068" stroke-width="7" fill="none"/>
      <rect x="260" y="180" width="100" height="150" rx="8" fill="#d99a85"/><path d="M285 180c0-34 50-34 50 0" stroke="#b97763" stroke-width="7" fill="none"/></g><ellipse cx="200" cy="336" rx="170" ry="14" fill="#000" opacity=".1"/>`),
    flowers: S(`<rect width="400" height="400" fill="#f3e5e2"/><g stroke="#5f8a4e" stroke-width="5" fill="none" stroke-linecap="round"><path d="M200 380V210M150 380c0-80 20-130 40-170M250 380c0-80-20-130-40-170M110 380c10-80 40-120 70-150M290 380c-10-80-40-120-70-150"/></g>
      <g><g fill="#e07a8f"><circle cx="200" cy="170" r="30"/><circle cx="170" cy="190" r="26"/><circle cx="230" cy="190" r="26"/><circle cx="200" cy="205" r="26"/></g><circle cx="200" cy="187" r="14" fill="#f4c95d"/>
      <g fill="#fff"><circle cx="130" cy="210" r="22"/><circle cx="105" cy="232" r="19"/><circle cx="155" cy="234" r="19"/></g><circle cx="130" cy="226" r="10" fill="#f4c95d"/>
      <g fill="#b78be0"><circle cx="275" cy="215" r="22"/><circle cx="300" cy="238" r="19"/><circle cx="250" cy="238" r="19"/></g><circle cx="275" cy="231" r="10" fill="#f4c95d"/></g><path d="M130 300h140l-14 80H144z" fill="#d7c0a4"/>`),
    sneaker: S(`<rect width="400" height="400" fill="none"/><path d="M40 270c-6-14 8-24 30-26 24-4 44-30 70-48l40 10c18 10 52 8 90 28 30 14 70 22 66 50-2 10-14 14-28 14H64c-14 0-24-6-24-28z" fill="#ff5a1f"/>
      <path d="M140 196l40 10c18 12 40 12 62 20-30 6-64 4-96-6-12-4-12-18-6-24z" fill="#fff" opacity=".9"/><path d="M40 286c0-8 8-12 20-12h300c14 0 26 4 26 12v8c0 8-10 12-24 12H64c-14 0-24-4-24-12z" fill="#f4f1ec"/><path d="M52 296h296" stroke="#ff5a1f" stroke-width="4"/>
      <g stroke="#fff" stroke-width="3.5" stroke-linecap="round"><path d="M190 214l-14 14M208 220l-14 14M226 226l-14 14"/></g><path d="M150 188c12-10 28-14 42-8" stroke="#0b0b0d" stroke-width="6" fill="none" stroke-linecap="round" opacity=".5"/>`),
    gym: S(`<rect width="400" height="400" fill="#0f1210"/><circle cx="260" cy="200" r="170" fill="#161c16"/><g transform="rotate(-18 200 200)"><rect x="40" y="190" width="320" height="20" rx="8" fill="#9aa39a"/>
      <rect x="70" y="130" width="34" height="140" rx="8" fill="#c6f432"/><rect x="108" y="146" width="24" height="108" rx="6" fill="#aedc22"/><rect x="296" y="130" width="34" height="140" rx="8" fill="#c6f432"/><rect x="268" y="146" width="24" height="108" rx="6" fill="#aedc22"/></g>
      <g stroke="#c6f432" stroke-width="3" opacity=".25" fill="none"><circle cx="260" cy="200" r="120"/><circle cx="260" cy="200" r="150"/></g>`),
    barber: S(`<rect width="400" height="400" fill="#13100d"/><rect x="150" y="70" width="100" height="260" rx="14" fill="#f4eee4"/><g fill="#b3261e"><path d="M150 110l100-40v40l-100 40z"/><path d="M150 190l100-40v40l-100 40z"/><path d="M150 270l100-40v40l-100 40z"/></g><g fill="#1c3f8f"><path d="M150 150l100-40v10l-100 40z"/><path d="M150 230l100-40v10l-100 40z"/><path d="M150 310l100-40v10l-100 40z"/></g>
      <rect x="140" y="52" width="120" height="26" rx="10" fill="#c9a46a"/><rect x="140" y="322" width="120" height="26" rx="10" fill="#c9a46a"/>
      <g stroke="#c9a46a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"><circle cx="70" cy="300" r="16"/><circle cx="106" cy="300" r="16"/><path d="M82 288l60-90M94 288L34 198"/><path d="M330 120l-40 60M330 120l40 60M300 190l50 100"/></g>`),
    spa: S(`<rect width="400" height="400" fill="#dfe7dc"/><ellipse cx="200" cy="320" rx="150" ry="26" fill="#c9d4c4"/><g><ellipse cx="200" cy="300" rx="90" ry="22" fill="#8da58a"/><ellipse cx="200" cy="268" rx="68" ry="18" fill="#a6bba3"/><ellipse cx="200" cy="242" rx="46" ry="14" fill="#c0d0bd"/></g>
      <g fill="#6f8f6a"><path d="M200 220c-44-4-64-44-60-90 44 6 66 40 60 90z"/><path d="M200 220c44-4 64-44 60-90-44 6-66 40-60 90z" fill="#86a781"/><path d="M200 220c-10-40 0-80 0-110 14 30 22 70 0 110z" fill="#9dbb98"/></g>
      <g fill="#fff"><path d="M90 110l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" opacity=".9"/><path d="M320 90l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" opacity=".8"/></g>`),
    bil: S(`<rect width="400" height="400" fill="#1a1d22"/><circle cx="200" cy="200" r="150" fill="#252a31"/><circle cx="200" cy="200" r="110" fill="#14171b" stroke="#d6382f" stroke-width="6"/><circle cx="200" cy="200" r="30" fill="#8d96a3"/>
      <g stroke="#8d96a3" stroke-width="14" stroke-linecap="round"><path d="M200 170v-50M200 230v50M170 200h-50M230 200h50M179 179l-35-35M221 221l35 35M221 179l35-35M179 221l-35 35"/></g>
      <g transform="rotate(35 300 300)"><rect x="290" y="250" width="24" height="140" rx="10" fill="#d6382f"/><circle cx="302" cy="250" r="30" fill="#d6382f"/><circle cx="302" cy="244" r="12" fill="#1a1d22"/></g>`)
  };

  /* ---------- Foton (Unsplash, fri licens) ---------- */
  const ID = {
    pizza: '1513104890138-7c749659a591', pizza2: '1565299624946-b28f40a0ae38', pasta: '1621996346565-e3dbc646d9a9', rest: '1517248135467-4c7edcad34c4',
    latte: '1495474472287-4d71bcdd2085', cafe: '1554118811-1e0d58224f24', croissant: '1555507036-ab1f4038808a',
    fine: '1414235077428-338989a2e8c0', wine: '1510812431401-41d2bd2722f3', steak: '1600891964092-4316c288032e',
    site: '1504307651254-35680f356dfd', plan: '1503387762-592deb58ef4e', elec: '1621905251189-08b45d6a269e', tool: '1558618666-fcd25c85cd64',
    store: '1441986300917-64674bd600d8', decor: '1513519245088-0e12902e5a38', yflow: '1490750967868-88aa4486c946', bouq: '1487530811176-3780de880c2d',
    shoe: '1542291026-7eec264c27ff', run: '1552674605-db6ffd4facb5', gym: '1534438327276-14e5300c3a48', barbell: '1517836357463-d25dfeac3438',
    padel: '1554068865-24cecd4e34b8', workout: '1571019613454-1cb2f99b2d8b', barber: '1585747860715-2ba37e788b70',
    spa: '1560750588-73207b1ef5b8', massage: '1519823551278-64ac92734fb1', facial: '1570172619644-dfd03ed5d881', hair: '1522337360788-8b13dee7a37e',
    engine: '1486262715619-67b85e0b08d3', car: '1503376780353-7e6692767b70',
    oven: '1763647836753-e06fe1f8707b', siteb: '1772442198624-4fc4d7281e89', bp: '1762146828422-50a8bd416d3c', sneak: '1595950653106-6c9ebd614d3a',
    chairs: '1773904215697-e6c21fc27ac2', espresso: '1545418314-7ce0b9b53901', cafe2: '1770739538932-433941c1267e',
    hg1: '1754391880122-5b66aa410160', vases: '1740760540616-a3dd85e51352', vase2: '1703250152396-5efe43684cb3', antik: '1767618478470-62b44d220a74',
    rose: '1523693916903-027d144a2b7d', mixglass: '1572454591674-2739f30d8c40', gerb: '1589100534833-475e31a17b4e', carn: '1497276236755-0f85ba99a126',
    bint: '1783447036642-90a65ff85a0f', chef: '1502364271109-0a9a75a2a9df', gyma: '1517130038641-a774d04afb3c', dumb: '1518310383802-640c2de311b2', spa2: '1540555700478-4be289fbecef',
    su1: '1579584425555-c3ce17fd4351', su2: '1563612116625-3012372fccce', su3: '1787462160120-9d018028c245', su4: '1696449241254-11cf7f18ce32', su5: '1779635593399-726a96741c4c',
    ba1: '1509440159596-0249088772ff', ba2: '1612539466296-4ecf1db303e3', ba3: '1568254183919-78a4f43a2877', ba4: '1711672284661-bd70e38f31b2', ba5: '1566698629409-787a68fc5724',
    ma1: '1717281234297-3def5ae3eee1', ma2: '1652829069834-2c05031199c5', ma3: '1688372199140-cade7ae820fe', ma4: '1742900280861-32bed068938b',
    vv1: '1676210134188-4c05dd172f89', vv2: '1749532125405-70950966b0e5', vv3: '1542013936693-884638332954', vv4: '1761758674188-2b8e4c89c5e2', vv5: '1676210134190-3f2c0d5cf58d',
    bo1: '1774070231417-4bf4d2025878', bo2: '1457369804613-52c61a468e7d', bo3: '1513185041617-8ab03f83d6c5', bo4: '1485322551133-3a4c27a9d925', bo5: '1618365908648-e71bd5716cba', bo6: '1778585914908-c968c0a7dacd',
    kl1: '1441984904996-e0b6ba687e04', kl2: '1583316174775-bd6dc0e9f298', kl3: '1532453288672-3a27e9be9efd', kl4: '1573879500655-98f2012dd1db', kl5: '1603400521630-9f2de124b33b', kl6: '1525562723836-dca67a71d5f1',
    cy1: '1605271864611-58dd08d10547', cy2: '1561453518-fc7b32ab8e8e', cy3: '1601067095185-b8b73ad7db10', cy4: '1684334376716-779c2cf01e04', cy5: '1648951825096-0cbf586aa11a',
    yo1: '1761971975973-cbb3e59263de', yo2: '1599901860904-17e6ed7083a0', yo3: '1506126613408-eca07ce68773', yo4: '1552196563-55cd4e45efb3', yo5: '1761971975724-31001b4de0bf',
    na1: '1604654894610-df63bc536371', na2: '1632345031435-8727f6897d53', na3: '1619607146034-5a05296c8f9a', na4: '1610992015762-45dca7fa3a85', na5: '1775500835259-d3b3f6d6e2f2',
    fr1: '1781450090585-1a511b7066d9', fr2: '1580618672591-eb180b1a973f', fr3: '1634449571010-02389ed0f9b0', fr4: '1595475884562-073c30d45670', fr5: '1774660810725-fb04e002003d',
    fo1: '1519741497674-611481863552', fo2: '1622277430358-f4d134452e2e', fo3: '1769540209420-f137f98194e8', fo4: '1519741196428-6a2175fa2557', fo5: '1629756048377-09540f52caa1',
    tr1: '1597201278257-3687be27d954', tr2: '1700689807667-82630348b301', tr3: '1695616827909-6f147f22d40f', tr4: '1668120089662-42642838cfef', tr5: '1621272156568-7306716648df'
  };
  const U = k => 'https://images.unsplash.com/photo-' + ID[k] + '?auto=format&fit=crop&w=1000&q=70';
  const ph = (k, cls, inner, art) => `<div class="ph ${cls || ''}">${art || ''}${k ? `<img src="${U(k)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ''}${inner || ''}</div>`;

  const IC = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', pin: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="M5 12l4 4 10-10"/>', star: '<path d="M12 3l2.600 5.400 5.900.9-4.300 4.100 1 5.800L12 16.400 6.800 19.200l1-5.800L3.500 9.300l5.900-.9z"/>',
    bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>', leaf: '<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14zM5 19l7-7"/>',
    cart: '<circle cx="9" cy="20" r="1.500"/><circle cx="17" cy="20" r="1.500"/><path d="M3 4h3l2.500 11h9.500L20 8H7"/>', heart: '<path d="M12 20s-7-4.500-7-10a4 4 0 017-2.500A4 4 0 0119 10c0 5.500-7 10-7 10z"/>',
    shield: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>', wrench: '<path d="M14 6a4 4 0 005 5l-9 9a2 2 0 01-3-3l9-9a4 4 0 01-2-2z"/>',
    home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>', phone: '<path d="M6 3h4l2 5-2 1a11 11 0 005 5l1-2 5 2v4a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z"/>',
    truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="1.500"/><circle cx="17" cy="18" r="1.500"/>', flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-3 2-4 2-7 2 1 3 2 3-3z"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>', cup: '<path d="M5 8h12v5a5 5 0 01-5 5h-2a5 5 0 01-5-5zM17 9h2a2 2 0 010 4h-2"/>'
  };
  const ico = k => `<div class="mk-ico"><svg viewBox="0 0 24 24">${IC[k] || IC.star}</svg></div>`;
  const tick = '<svg viewBox="0 0 24 24"><path d="M5 12l4 4 10-10"/></svg>';

  /* ---------- Koncept ---------- */
  const T = (bg, tx, mut, ac, onac, panel, hf, bf, rad, rad3) => ({ bg, tx, mut, ac, onac, panel, hf, bf, rad, rad3 });
  const FR = "'Fraunces',serif", DM = "'DM Serif Display',serif", CG = "'Cormorant Garamond',serif", PF = "'Playfair Display',serif",
        BC = "'Barlow Condensed',sans-serif", AR = "'Archivo',sans-serif", SG = "'Space Grotesk',sans-serif", IN = "'Inter',sans-serif", MA = "'Manrope',sans-serif";
  const DAYS = (a, b, c) => [['Måndag till fredag', a], ['Lördag', b], ['Söndag', c]];

  const LIST = [
    { id: 'pizzeria', cat: 'restauranger', type: 'Restaurang eller pizzeria', brand: 'Bella Napoli', domain: 'bellanapoli.se', variant: 'full', art: 'pizza', hero: 'pizza',
      theme: T('#14100d', '#f7efe3', '#c4b4a0', '#e5a43f', '#1b1208', '#1b1410', FR, IN, '8px', '14px'),
      bar: 'Beställ hem och få pizzan på 30 minuter', links: ['Meny', 'Om oss', 'Öppettider', 'Kontakt'], btn: 'Beställ online', eye: 'Stenugnsbakad pizza',
      h1: 'Pizza som *smakar Italien*', p: 'Handslagen deg, färska råvaror och en het ugn. Beställ hem eller boka bord hos oss.', c1: 'Se menyn', c2: 'Boka bord',
      secs: ['feat', 'menu', 'gal', 'info', 'cta'],
      featHead: ['Därför älskar gästerna oss', 'Enkelt att äta gott, hemma eller hos oss.'], feat: [['flame', 'Bakad i stenugn', 'Varje pizza bakas färsk i vår vedeldade ugn.'], ['truck', 'Hemleverans', 'Beställ online och få maten hem till dörren.'], ['cal', 'Boka bord', 'Boka enkelt till middag, födelsedag eller firande.']],
      menuHead: ['Vår meny', 'Ett urval av favoriterna.'], menuPh: 'pizza2', menu: [['Margherita', 'Tomat, mozzarella, basilika', '129 kr'], ['Capricciosa', 'Skinka, champinjoner, kronärtskocka', '149 kr'], ['Diavola', 'Salami, chili, mozzarella', '155 kr'], ['Quattro Formaggi', 'Fyra sorters ost', '159 kr'], ['Pasta al forno', 'Ugnsbakad pasta med köttfärssås', '139 kr']],
      gal: [['oven', 'Nygräddat'], ['pasta', 'Hemlagad pasta'], ['rest', 'Vår restaurang']], hours: DAYS('11:00 till 22:00', '12:00 till 23:00', '12:00 till 21:00'), addr: ['Storgatan 12', '123 45 Staden'], ctaH: 'Hungrig? Beställ din pizza redan nu.', ctaB: 'Beställ online',
      desc: 'Aptitlig design med fokus på meny, beställning och öppettider.', feats: ['Onlinemeny', 'Beställning', 'Öppettider'] },

    { id: 'bygg', cat: 'byggforetag', type: 'Byggföretag', brand: 'Norrbygg', domain: 'norrbygg.se', variant: 'full', art: 'bygg', hero: 'site',
      theme: T('#10151d', '#f2f4f7', '#a3adbb', '#f5b301', '#161006', '#171c25', BC, IN, '4px', '8px'),
      bar: 'Kostnadsfri offert, hör av dig idag', links: ['Tjänster', 'Projekt', 'Om oss', 'Kontakt'], btn: 'Begär offert', eye: 'Bygg och renovering',
      h1: 'Vi bygger *för att hålla*', p: 'Nybyggnation, renovering och tillbyggnad med tydlig plan och raka besked från start till färdigt.', c1: 'Våra projekt', c2: 'Begär offert',
      secs: ['svc', 'about', 'gal', 'cta'],
      svcHead: ['Våra tjänster', 'Allt från ritning till färdigt hus.'], svc: [['Nybyggnation', 'Villor, garage och komplementbyggnader', 'Nytt'], ['Renovering', 'Kök, badrum, fasad och tak', 'Befintligt'], ['Tillbyggnad', 'Mer yta för hela familjen', 'Utökat'], ['Byggledning', 'Vi samordnar hela projektet åt dig', 'Trygghet']],
      aboutHead: ['Ett byggföretag att lita på', 'Vi planerar noga, håller överenskommelser och lämnar efter oss ett arbete vi kan vara stolta över.'], aboutPh: 'bp', about: ['Tydlig tidsplan och offert', 'Egna, erfarna hantverkare', 'Städat och ordnat på bygget'],
      gal: [['siteb', 'Pågående bygge'], ['plan', 'Planering'], ['tool', 'Hantverk']], ctaH: 'Planerar du ett bygge? Vi tar fram en offert.', ctaB: 'Begär offert',
      desc: 'Stark och förtroendeingivande design med tydliga tjänster och offertknapp.', feats: ['Projektgalleri', 'Offertformulär', 'Tjänster'] },

    { id: 'sport', cat: 'sport', type: 'Sportbutik', brand: 'Fartzon', domain: 'fartzon.se', variant: 'bold', art: 'sneaker', hero: 'shoe', word: 'RUN',
      theme: T('#f6f3ee', '#111111', '#5a5750', '#e11d2e', '#ffffff', '#e11d2e', AR, IN, '999px', '0'),
      bar: 'Fri frakt över 799 kr och 30 dagars returrätt', links: ['Herr', 'Dam', 'Barn', 'Rea'], btn: 'Kundvagn (0)', eye: 'Ny säsong',
      h1: 'Rätt utrustning för *varje pass*', p: 'Löpning, träning och lagsport. Hitta skor och kläder som håller hela säsongen.', c1: 'Handla nu', c2: 'Hitta butik',
      secs: ['feat', 'prods', 'cta'],
      featHead: ['Handla tryggt', 'Allt du behöver inför nästa pass.'], feat: [['truck', 'Snabb leverans', 'Beställ i dag och få varan inom några dagar.'], ['shield', 'Enkel retur', 'Fri retur i 30 dagar om storleken inte passar.'], ['heart', 'Medlemsförmåner', 'Bli medlem gratis och få erbjudanden först.']],
      prodsHead: ['Populära produkter', 'Ett urval från veckans sortiment.'], prods: [['run', 'Löparskor Sprint', 'Herr', '1 199 kr', 'Nyhet'], ['sneak', 'Träningsskor Flex', 'Dam', '999 kr', ''], ['workout', 'Träningslinne Active', 'Dam', '349 kr', 'Rea'], ['barbell', 'Träningshandskar Grip', 'Unisex', '249 kr', '']],
      ctaH: 'Bli medlem och få 10 procent på första köpet.', ctaB: 'Bli medlem',
      desc: 'Energisk design för webbshoppar med stora produktbilder och tydliga kategorier.', feats: ['Webbshop', 'Kategorier', 'Kampanjer'] },

    { id: 'barber', cat: 'skonhet', type: 'Barbershop', brand: "Gentleman's Cut", domain: 'gentlemanscut.se', variant: 'splitr', art: 'barber', hero: 'barber',
      theme: T('#100e0b', '#f3ece0', '#b3a893', '#c9a46a', '#17110a', '#13100d', CG, IN, '2px', '2px'),
      bar: 'Boka din tid online, det tar en minut', links: ['Tjänster', 'Priser', 'Om oss', 'Kontakt'], btn: 'Boka tid', eye: 'Klassisk barberare',
      h1: 'Skärpt stil. *Rak service.*', p: 'Klippning, skägg och rakning av erfarna barberare. Boka din tid online på någon minut.', c1: 'Boka tid', c2: 'Våra tjänster',
      secs: ['svc', 'about', 'info', 'cta'],
      svcHead: ['Tjänster och priser', 'Tydliga priser, ingen överraskning.'], svc: [['Herrklippning', 'Klippning med maskin och sax, tvätt och styling', '350 kr'], ['Skäggtrim', 'Form, kontur och skäggolja', '250 kr'], ['Klassisk rakning', 'Varm handduk och rakkniv', '300 kr'], ['Klippning och skägg', 'Det kompletta paketet', '550 kr']],
      aboutHead: ['Hantverk i en lugn miljö', 'Vi tar oss tid för varje kund. Slå dig ner, ta en kaffe och låt oss ta hand om resten.'], aboutPh: 'chairs', about: ['Erfarna barberare', 'Boka online dygnet runt', 'Produkter av hög kvalitet'],
      hours: DAYS('09:00 till 19:00', '09:00 till 16:00', 'Stängt'), addr: ['Drottninggatan 8', '123 45 Staden'], ctaH: 'Redo för en ny look? Boka din tid.', ctaB: 'Boka tid',
      desc: 'Lyxig, mörk design med fokus på bokning, tjänster och stil.', feats: ['Tidsbokning', 'Tjänster', 'Priser'] },

    { id: 'cafe', cat: 'restauranger', type: 'Café', brand: 'Kaffeverket', domain: 'kaffeverket.se', variant: 'splitr', art: 'cafe', hero: 'latte',
      theme: T('#f6efe4', '#2a1d14', '#7a6654', '#a8552b', '#ffffff', '#e8d8c3', DM, MA, '999px', '24px'),
      bar: 'Nytt på menyn: kardemummabulle med vaniljkräm', links: ['Meny', 'Bageri', 'Om oss', 'Hitta hit'], btn: 'Besök oss', eye: 'Café och bageri',
      h1: 'Ett lugnt hörn av *staden*', p: 'Nyrostat kaffe, bröd från egen ugn och tid att sitta kvar en stund.', c1: 'Se menyn', c2: 'Öppettider',
      secs: ['feat', 'menu', 'gal', 'info'],
      featHead: ['Det lilla extra', 'Allt görs med omsorg, varje dag.'], feat: [['cup', 'Nyrostat kaffe', 'Bönor från små odlare, rostade i veckan.'], ['leaf', 'Närbakat bröd', 'Vi bakar surdegsbröd och bullar varje morgon.'], ['heart', 'Plats att stanna', 'En varm lokal där du kan jobba, mötas eller vila.']],
      menuHead: ['Kaffe och bakverk', 'Våra mest älskade.'], menuPh: 'croissant', menu: [['Latte', 'Dubbel espresso och ångad mjölk', '48 kr'], ['Filterkaffe', 'Dagens bryggning, påtår ingår', '38 kr'], ['Kardemummabulle', 'Bakad på morgonen', '36 kr'], ['Croissant', 'Smördeg och smör', '42 kr'], ['Avokadotoast', 'Surdegsbröd, avokado och ägg', '89 kr']],
      gal: [['cafe', 'Vår lokal'], ['espresso', 'Kaffe'], ['cafe2', 'Sittplatser']], hours: DAYS('07:30 till 17:00', '09:00 till 16:00', '09:00 till 16:00'), addr: ['Kyrkogatan 3', '123 45 Staden'],
      desc: 'Varm och inbjudande design som speglar caféets atmosfär.', feats: ['Meny', 'Öppettider', 'Atmosfär'] },

    { id: 'butik', cat: 'butiker', type: 'Lokal butik', brand: 'Hemma och Co', domain: 'hemmaco.se', variant: 'split', art: 'shopbag', hero: 'decor',
      theme: T('#fbf8f3', '#231f1a', '#7b746a', '#2f5d50', '#ffffff', '#efe6d8', MA, MA, '6px', '12px'),
      bar: 'Välkommen in, vi har öppet till 18:00 idag', links: ['Nyheter', 'Hem', 'Present', 'Kontakt'], btn: 'Besök butiken', eye: 'Handplockat',
      h1: 'Utvalda saker för *ditt hem*', p: 'Handplockat från små tillverkare. Välkommen in i butiken eller handla online.', c1: 'Handla online', c2: 'Besök butiken',
      secs: ['prods', 'about', 'info'],
      prodsHead: ['Nyheter i butiken', 'Ett urval av det senaste.'], prods: [['hg1', 'Färgglad keramik', 'Hem', '249 kr', 'Nyhet'], ['vases', 'Vaser i vitt', 'Dekoration', '399 kr', ''], ['vase2', 'Vas i svart', 'Dekoration', '299 kr', ''], ['antik', 'Antika föremål', 'Unika fynd', 'Från 199 kr', 'Rea']],
      aboutHead: ['En butik med omsorg om detaljerna', 'Vi väljer varje produkt själva och bryr oss om hur det är gjort och av vem.'], aboutPh: 'store', about: ['Små tillverkare och svenska märken', 'Present insvept utan extra kostnad', 'Personlig service i butiken'],
      hours: DAYS('10:00 till 18:00', '10:00 till 15:00', 'Stängt'), addr: ['Hantverkargatan 5', '123 45 Staden'],
      desc: 'Ren butiksdesign som lyfter produkter, information och kontaktuppgifter.', feats: ['Produkter', 'Kategorier', 'Kontakt'] },

    { id: 'bistro', cat: 'restauranger', type: 'Restaurang', brand: 'Maison Nord', domain: 'maisonnord.se', variant: 'center', art: 'bistro', hero: 'fine',
      theme: T('#130f0c', '#f1e8da', '#b5a893', '#c9a46a', '#17110a', '#17130f', CG, MA, '0', '0'),
      bar: 'Bokningar för helgen öppnar varje måndag', links: ['Meny', 'Vinlista', 'Om oss', 'Kontakt'], btn: 'Boka bord', eye: 'Bistro och vinbar',
      h1: 'Middag med *känsla för detaljer*', p: 'Säsongens råvaror, noggrant tillagade. Boka ett bord för en kväll att minnas.', c1: 'Boka bord', c2: 'Se menyn',
      secs: ['menu', 'gal', 'info', 'cta'],
      menuHead: ['Kvällens meny', 'Förrätt, varmrätt och dessert.'], menuPh: 'steak', menu: [['Toast Skagen', 'Handskalade räkor, rödlök och dill', '165 kr'], ['Oxfilé', 'Potatisgratäng, rödvinssås och haricots verts', '329 kr'], ['Dagens fisk', 'Säsongens grönsaker och smörsås', '295 kr'], ['Crème brûlée', 'Vanilj och färska bär', '110 kr']],
      gal: [['chef', 'Från köket'], ['wine', 'Vinlistan'], ['bint', 'Salongen']], hours: DAYS('Stängt', '17:00 till 23:00', '17:00 till 21:00'), addr: ['Hamngatan 4', '123 45 Staden'], ctaH: 'Boka ditt bord för en kväll att minnas.', ctaB: 'Boka bord',
      desc: 'Elegant design för restauranger med fokus på upplevelse och bordsbokning.', feats: ['Bordsbokning', 'Meny', 'Vinlista'] },

    { id: 'el', cat: 'byggforetag', type: 'Elektriker', brand: 'Ljusgruppen El', domain: 'ljusgruppen.se', variant: 'splitr', art: 'el', hero: 'elec',
      theme: T('#ffffff', '#101a33', '#5b6685', '#2f5bff', '#ffffff', '#e9eefb', SG, IN, '10px', '18px'),
      bar: 'Akut elfel? Ring oss, vi har jour dygnet runt', links: ['Tjänster', 'Laddboxar', 'Om oss', 'Kontakt'], btn: 'Boka besök', eye: 'Auktoriserad elinstallatör',
      h1: 'Trygg el för *hem och företag*', p: 'Installation, felsökning och laddboxar utförda av erfarna elektriker.', c1: 'Boka besök', c2: 'Våra tjänster',
      secs: ['feat', 'svc', 'cta'],
      featHead: ['Därför väljer kunder oss', 'Säkert, snabbt och med tydliga besked.'], feat: [['shield', 'Auktoriserade', 'Allt arbete utförs enligt gällande regler.'], ['clock', 'Snabb hjälp', 'Vi kommer när det passar dig, även akut.'], ['bolt', 'Framtidssäkert', 'Laddboxar, solceller och smarta lösningar.']],
      svcHead: ['Våra tjänster', 'Hjälp med allt som har med el att göra.'], svc: [['Elinstallation', 'Nytt och befintligt, hem och företag', 'Offert'], ['Laddbox för elbil', 'Installation hemma eller på jobbet', 'Offert'], ['Felsökning', 'Snabb hjälp vid strömavbrott och fel', 'Akut'], ['Belysning', 'Inomhus och utomhus', 'Offert']],
      ctaH: 'Behöver du en elektriker? Boka ett besök.', ctaB: 'Boka besök',
      desc: 'Ljus och tydlig design som ger trygghet och gör det enkelt att boka.', feats: ['Tjänster', 'Bokning', 'Akut hjälp'] },

    { id: 'blommor', cat: 'butiker', type: 'Blomsterbutik', brand: 'Blomsterverkstan', domain: 'blomsterverkstan.se', variant: 'center', art: 'flowers', hero: 'bouq',
      theme: T('#fbf1ee', '#3a2530', '#85696f', '#c9506c', '#ffffff', '#f3e5e2', PF, MA, '999px', '20px'),
      bar: 'Beställ före 14:00 så kör vi ut samma dag', links: ['Buketter', 'Bröllop', 'Prenumeration', 'Kontakt'], btn: 'Beställ bukett', eye: 'Blommor med omsorg',
      h1: 'Blommor med *personlighet*', p: 'Handbundna buketter och arrangemang för både vardag och högtid.', c1: 'Se buketter', c2: 'Bröllop',
      secs: ['prods', 'feat', 'cta'],
      prodsHead: ['Buketter just nu', 'Plockade och bundna i morse.'], prods: [['rose', 'Rosa rosbukett', 'Rosor', '395 kr', 'Populär'], ['mixglass', 'Bukett i glasvas', 'Blandade blommor', '349 kr', ''], ['gerb', 'Gerbera och rosor', 'Röda toner', '495 kr', ''], ['carn', 'Nejlikor i vas', 'Rosa nejlikor', '299 kr', 'Nyhet']],
      featHead: ['Blommor för alla tillfällen', 'Vi hjälper dig hitta rätt.'], feat: [['heart', 'Bröllop och fest', 'Brudbukett och dekoration efter dina önskemål.'], ['truck', 'Utkörning', 'Vi levererar lokalt direkt till dörren.'], ['cal', 'Prenumeration', 'Färska blommor hem varje vecka eller varannan.']],
      ctaH: 'Skicka en blomsterhälsning idag.', ctaB: 'Beställ bukett',
      desc: 'Romantisk och lätt design med fokus på bilder och beställning.', feats: ['Beställning', 'Bröllop', 'Prenumeration'] },

    { id: 'gym', cat: 'sport', type: 'Gym och padel', brand: 'Pulse', domain: 'pulseclub.se', variant: 'full', art: 'gym', hero: 'gym',
      theme: T('#0b0d0b', '#f2f5ee', '#a3ab9d', '#c6f432', '#10140a', '#0f1210', SG, SG, '6px', '10px'),
      bar: 'Provträna gratis under din första vecka', links: ['Träna', 'Padel', 'Medlemskap', 'Kontakt'], btn: 'Bli medlem', eye: 'Gym och padel',
      h1: 'Träning som *passar ditt liv*', p: 'Gym, gruppträning och padelbanor under samma tak.', c1: 'Provträna', c2: 'Boka padel',
      secs: ['feat', 'gal', 'svc', 'cta'],
      featHead: ['Allt på ett ställe', 'Träna som du vill, när du vill.'], feat: [['clock', 'Öppet länge', 'Träna när det passar, tidigt eller sent.'], ['heart', 'Gruppträning', 'Pass för alla nivåer med erfarna instruktörer.'], ['star', 'Padelbanor', 'Boka bana online och spela med vänner.']],
      gal: [['gyma', 'Gymmet'], ['padel', 'Padelhallen'], ['dumb', 'Gruppträning']],
      svcHead: ['Medlemskap', 'Välj det som passar dig.'], svc: [['Gym', 'Fri tillgång till gymmet dygnet runt', 'Månad'], ['Gym och gruppträning', 'Allt i gymmet plus alla gruppass', 'Månad'], ['Padel', 'Boka bana online till medlemspris', 'Per timme']],
      ctaH: 'Redo att börja? Provträna gratis.', ctaB: 'Boka provpass',
      desc: 'Kraftfull design som driver besökaren mot medlemskap och bokning.', feats: ['Medlemskap', 'Bokning', 'Schema'] },

    { id: 'salong', cat: 'skonhet', type: 'Salong och hudvård', brand: 'Studio Linn', domain: 'studiolinn.se', variant: 'center', art: 'spa', hero: 'spa',
      theme: T('#f1f4ee', '#25301f', '#71806a', '#5e7f58', '#ffffff', '#dfe7dc', DM, MA, '999px', '20px'),
      bar: 'Nya kunder får 15 procent på första behandlingen', links: ['Behandlingar', 'Produkter', 'Om oss', 'Boka'], btn: 'Boka tid', eye: 'Skönhet och hudvård',
      h1: 'Tid för *dig själv*', p: 'Hudvård, naglar och hårvård i en lugn och avslappnad miljö.', c1: 'Boka tid', c2: 'Behandlingar',
      secs: ['svc', 'gal', 'about', 'cta'],
      svcHead: ['Behandlingar', 'Skräddarsydda efter dina behov.'], svc: [['Ansiktsbehandling', 'Rengöring, peeling och återfuktande mask', '60 min'], ['Massage', 'Avslappnande helkroppsmassage', '60 min'], ['Naglar', 'Manikyr med gellack', '45 min'], ['Hår', 'Klippning, färg och styling', '90 min']],
      gal: [['facial', 'Hudvård'], ['massage', 'Massage'], ['hair', 'Hår']],
      aboutHead: ['En lugn plats för dig', 'Hos oss får du tid att varva ner. Vi lyssnar på dig och väljer behandlingen utifrån dina behov.'], aboutPh: 'spa2', about: ['Naturliga produkter', 'Erfarna terapeuter', 'Lugn och ombonad miljö'], ctaH: 'Unna dig en stund för dig själv.', ctaB: 'Boka tid',
      desc: 'Lugn och mjuk design för salonger med fokus på behandlingar och bokning.', feats: ['Behandlingar', 'Bokning', 'Produkter'] },

    { id: 'bil', cat: 'ovriga', type: 'Bilverkstad', brand: 'Mälar Bilservice', domain: 'malarbilservice.se', variant: 'split', art: 'bil', hero: 'engine',
      theme: T('#14171b', '#f0f2f5', '#9ba3ae', '#e0443a', '#ffffff', '#1a1d22', BC, IN, '4px', '10px'),
      bar: 'Boka däckbyte online och slipp vänta', links: ['Service', 'Däck', 'Om oss', 'Kontakt'], btn: 'Boka service', eye: 'Verkstad för alla märken',
      h1: 'Din bil i *trygga händer*', p: 'Service, reparation och däckbyte på alla märken. Boka tid direkt på nätet.', c1: 'Boka service', c2: 'Våra tjänster',
      secs: ['feat', 'svc', 'info', 'cta'],
      featHead: ['Varför välja oss', 'Vi tar hand om din bil som om den vore vår egen.'], feat: [['wrench', 'Alla märken', 'Vi servar och lagar bilar av alla märken.'], ['shield', 'Garanti på arbetet', 'Du får tydlig dokumentation efter varje besök.'], ['clock', 'Snabb tid', 'Boka online och få en tid som passar dig.']],
      svcHead: ['Våra tjänster', 'Från service till besiktning.'], svc: [['Service', 'Oljebyte, filter och kontroll', 'Boka'], ['Däckbyte', 'Byte och förvaring av hjul', 'Boka'], ['Bromsar', 'Kontroll och byte vid behov', 'Boka'], ['Förbesiktning', 'Vi går igenom bilen inför besiktning', 'Boka']],
      hours: DAYS('07:30 till 17:00', 'Stängt', 'Stängt'), addr: ['Verkstadsvägen 7', '123 45 Staden'], ctaH: 'Dags för service? Boka en tid direkt.', ctaB: 'Boka service',
      desc: 'Tydlig och robust design som gör det lätt att boka service.', feats: ['Tidsbokning', 'Tjänster', 'Kontakt'] },

    { id: 'sushi', cat: 'restauranger', type: 'Sushirestaurang', brand: 'Nami Sushi', domain: 'namisushi.se', variant: 'full', hero: 'su1',
      theme: T('#0e0e10', '#f4efe9', '#b2aaa1', '#d6403a', '#ffffff', '#17171a', CG, IN, '4px', '8px'),
      bar: 'Beställ hämtmat och ät hemma, klart på 20 minuter', links: ['Meny', 'Hämta själv', 'Boka bord', 'Kontakt'], btn: 'Boka bord', eye: 'Färsk sushi dagligen',
      h1: 'Sushi som görs *för hand*', p: 'Färsk fisk, perfekt ris och noga knutna rullar. Ät hos oss eller hämta med dig hem.', c1: 'Se menyn', c2: 'Boka bord',
      secs: ['feat', 'menu', 'gal', 'info', 'cta'],
      featHead: ['Det vi är stolta över', 'Enkelt, rent och alltid färskt.'], feat: [['leaf', 'Färska råvaror', 'Fisken kommer in varje morgon och används samma dag.'], ['flame', 'Handgjort', 'Varje bit rullas och formas för hand i vårt kök.'], ['truck', 'Hämta eller ät här', 'Beställ i förväg och hämta, eller slå dig ner hos oss.']],
      menuHead: ['Vår meny', 'Ett urval av favoriterna.'], menuPh: 'su2', menu: [['Laxrulle', 'Lax, avokado och gurka', '119 kr'], ['Nigiri mix', 'Åtta bitar med olika fisk', '179 kr'], ['Maki mix', 'Tolv bitar med grönsaker och fisk', '159 kr'], ['Edamame', 'Havssalt och citron', '55 kr']],
      gal: [['su3', 'Från köket'], ['su4', 'Sushibaren'], ['su5', 'Kvällens bord']], hours: DAYS('11:00 till 21:00', '12:00 till 22:00', '12:00 till 20:00'), addr: ['Hamnplan 6', '123 45 Staden'], ctaH: 'Sugen på sushi? Boka ett bord eller hämta med dig.', ctaB: 'Boka bord',
      desc: 'Ren och elegant design som lyfter maten, menyn och bordsbokningen.', feats: ['Meny', 'Bordsbokning', 'Hämtmat'] },

    { id: 'bageri', cat: 'restauranger', type: 'Bageri', brand: 'Rågen Bageri', domain: 'ragenbageri.se', variant: 'splitr', hero: 'ba1',
      theme: T('#faf6ee', '#2a2418', '#7a7058', '#6b7f3a', '#ffffff', '#ece5d1', FR, IN, '10px', '16px'),
      bar: 'Nybakat varje morgon från klockan 07:00', links: ['Bröd', 'Konditori', 'Beställ tårta', 'Kontakt'], btn: 'Beställ tårta', eye: 'Hantverksbageri',
      h1: 'Bröd som får ta *sin tid*', p: 'Långjäst surdeg, riktigt smör och mjöl från svenska kvarnar. Allt bakas i vårt eget bageri.', c1: 'Se sortimentet', c2: 'Beställ tårta',
      secs: ['feat', 'menu', 'gal', 'info'],
      featHead: ['Därför smakar det bättre', 'Tid och bra råvaror gör skillnaden.'], feat: [['leaf', 'Långjäst surdeg', 'Våra bröd jäser i över tjugo timmar för djup smak.'], ['heart', 'Bakat för hand', 'Vi formar och bakar varje morgon i vårt eget bageri.'], ['cal', 'Beställ i förväg', 'Beställ tårtor och bröd till fest och födelsedag.']],
      menuHead: ['Dagens bakning', 'Det som finns i hyllan idag.'], menuPh: 'ba2', menu: [['Surdegsbröd', 'Mörk skorpa och mjuk krum', '58 kr'], ['Rågbröd', 'Fullkorn och sirap', '49 kr'], ['Kanelbulle', 'Bakad på morgonen', '32 kr'], ['Tårta efter beställning', 'Från sex bitar', 'Från 390 kr']],
      gal: [['ba3', 'Hyllan'], ['ba4', 'Konditoriet'], ['ba5', 'Korgen']], hours: DAYS('07:00 till 17:00', '08:00 till 15:00', '08:00 till 14:00'), addr: ['Bagargatan 2', '123 45 Staden'],
      desc: 'Varm och naturlig design för bagerier med fokus på sortiment och beställning.', feats: ['Sortiment', 'Tårtbeställning', 'Öppettider'] },

    { id: 'maleri', cat: 'byggforetag', type: 'Måleri', brand: 'Rollan Måleri', domain: 'rollanmaleri.se', variant: 'split', hero: 'ma1',
      theme: T('#ffffff', '#14212b', '#5d6c78', '#ef6c35', '#ffffff', '#fdeee6', AR, IN, '6px', '12px'),
      bar: 'Boka kostnadsfritt hembesök och få ett pris', links: ['Tjänster', 'Före och efter', 'Om oss', 'Kontakt'], btn: 'Få en offert', eye: 'Måleri för hem och företag',
      h1: 'Rena linjer och *jämna ytor*', p: 'Invändig och utvändig målning, tapetsering och spackling. Vi lämnar det prydligt efter oss.', c1: 'Få en offert', c2: 'Våra tjänster',
      secs: ['feat', 'svc', 'gal', 'cta'],
      featHead: ['Därför väljer kunder oss', 'Ett jobb som ser bra ut länge.'], feat: [['check', 'Noggrant förarbete', 'Vi spacklar, slipar och maskerar innan första strykningen.'], ['shield', 'Tydligt pris', 'Du får en offert där allt som ingår står med.'], ['clock', 'Håller tiden', 'Vi planerar noga och håller det vi lovar.']],
      svcHead: ['Våra tjänster', 'Från ett rum till hela huset.'], svc: [['Invändig målning', 'Väggar, tak och lister', 'Offert'], ['Fasadmålning', 'Skydd och färg för huset', 'Offert'], ['Tapetsering', 'Alla typer av tapeter', 'Offert'], ['Spackling', 'Släta och hela ytor', 'Offert']],
      gal: [['ma2', 'Väggmålning'], ['ma3', 'Färgval'], ['ma4', 'På plats']], ctaH: 'Dags att måla om? Få en offert.', ctaB: 'Få en offert',
      desc: 'Ren och tydlig design som visar arbete, tjänster och gör det lätt att få en offert.', feats: ['Tjänster', 'Offertformulär', 'Bildgalleri'] },

    { id: 'vvs', cat: 'byggforetag', type: 'VVS och rörmokare', brand: 'Rörmästarna', domain: 'rormastarna.se', variant: 'full', hero: 'vv1',
      theme: T('#0b1a2b', '#eef4fb', '#9db1c7', '#37b6ff', '#06121f', '#10253b', SG, IN, '8px', '14px'),
      bar: 'Akut läcka? Ring oss, vi åker direkt', links: ['Tjänster', 'Badrum', 'Om oss', 'Kontakt'], btn: 'Boka rörmokare', eye: 'VVS dygnet runt',
      h1: 'Rören funkar *när du behöver dem*', p: 'Läckor, värme, vatten och badrumsrenovering. Snabb hjälp av erfarna rörmokare.', c1: 'Boka besök', c2: 'Våra tjänster',
      secs: ['feat', 'svc', 'gal', 'about', 'info', 'cta'],
      featHead: ['Trygg hjälp hela vägen', 'Vi löser det, och förklarar vad vi gör.'], feat: [['clock', 'Jour dygnet runt', 'Vi finns tillgängliga när det brådskar.'], ['shield', 'Behöriga rörmokare', 'Allt arbete utförs enligt branschens regler.'], ['wrench', 'Reparation och nytt', 'Från små läckor till hela badrum.']],
      svcHead: ['Våra tjänster', 'Allt som har med vatten och värme att göra.'], svc: [['Akuta läckor', 'Snabb hjälp vid vattenskada', 'Akut'], ['Badrumsrenovering', 'Från rivning till färdigt badrum', 'Offert'], ['Varmvattenberedare', 'Byte och service', 'Offert'], ['Värme och radiatorer', 'Installation och felsökning', 'Offert']],
      gal: [['vv3', 'Kranar och blandare'], ['vv4', 'Tryck och värme'], ['vv5', 'Varmvatten']],
      aboutHead: ['Rörmokare som tar ansvar', 'Vi städar efter oss, lämnar tydliga besked och står för vårt arbete.'], aboutPh: 'vv2', about: ['Behöriga och försäkrade', 'Fast pris när det går', 'Snabb återkoppling'],
      hours: DAYS('07:00 till 17:00', 'Jour', 'Jour'), addr: ['Verkstadsgatan 11', '123 45 Staden'], ctaH: 'Har det börjat läcka? Ring oss direkt.', ctaB: 'Boka rörmokare',
      desc: 'Stark och trygg design som gör det enkelt att få akut hjälp eller boka besök.', feats: ['Akut hjälp', 'Tjänster', 'Bokning'] },

    { id: 'bokhandel', cat: 'butiker', type: 'Bokhandel', brand: 'Bokhörnan', domain: 'bokhornan.se', variant: 'center', hero: 'bo1',
      theme: T('#f3ece1', '#2b1d16', '#7d6a5a', '#7a2e2a', '#ffffff', '#e5d8c4', PF, MA, '4px', '8px'),
      bar: 'Fri frakt på böcker över 249 kr', links: ['Nyheter', 'Barn', 'Presentkort', 'Kontakt'], btn: 'Besök butiken', eye: 'Oberoende bokhandel',
      h1: 'Böcker att *försvinna in i*', p: 'Handplockade titlar och personliga tips från oss som läser. Välkommen in eller handla online.', c1: 'Se nyheterna', c2: 'Besök butiken',
      secs: ['prods', 'about', 'info'],
      prodsHead: ['Boktips just nu', 'Utvalt av oss i butiken.'], prods: [['bo2', 'Veckans roman', 'Skönlitteratur', 'Från 149 kr', 'Nyhet'], ['bo3', 'Klassiker i ny utgåva', 'Klassiker', 'Från 99 kr', ''], ['bo4', 'Berättelser för hela familjen', 'Barn och unga', 'Från 129 kr', ''], ['bo5', 'Fackböcker och guider', 'Fakta', 'Från 199 kr', 'Tips']],
      aboutHead: ['En bokhandel med personlighet', 'Vi läser det vi säljer och hjälper dig hitta nästa bok att ttappa bort dig i.'], aboutPh: 'bo6', about: ['Personliga boktips', 'Beställ hem vilken bok som helst', 'Presentkort och inslagning'],
      hours: DAYS('10:00 till 18:00', '10:00 till 15:00', 'Stängt'), addr: ['Bokgatan 9', '123 45 Staden'],
      desc: 'Lugn och varm design för bokhandlare med fokus på tips, sortiment och butik.', feats: ['Webbshop', 'Boktips', 'Butiksinfo'] },

    { id: 'klader', cat: 'butiker', type: 'Klädbutik', brand: 'Nordisk Garderob', domain: 'nordiskgarderob.se', variant: 'split', hero: 'kl1',
      theme: T('#f7f5f2', '#1b1b1b', '#77716a', '#1b1b1b', '#ffffff', '#e9e4dc', CG, IN, '0', '0'),
      bar: 'Fri frakt och 30 dagars returrätt', links: ['Dam', 'Herr', 'Nyheter', 'Rea'], btn: 'Kundvagn (0)', eye: 'Ny kollektion',
      h1: 'Kläder som *håller länge*', p: 'Enkla plagg i bra material. Hitta basgarderoben som fungerar hela året.', c1: 'Handla nu', c2: 'Besök butiken',
      secs: ['prods', 'about', 'cta'],
      prodsHead: ['Nytt i butiken', 'Plagg vi är extra nöjda med.'], prods: [['kl2', 'Blommig klänning', 'Dam', '899 kr', 'Nyhet'], ['kl3', 'Skjorta i bomull', 'Herr', '699 kr', ''], ['kl4', 'Topp i lin', 'Dam', '449 kr', 'Rea'], ['kl5', 'Basplagg i natur', 'Unisex', '799 kr', '']],
      aboutHead: ['Mindre men bättre', 'Vi väljer få plagg i hållbara material, så att du slipper köpa om.'], aboutPh: 'kl6', about: ['Naturliga material', 'Passform som fungerar', 'Enkel retur'], ctaH: 'Bli medlem och få 10 procent på första köpet.', ctaB: 'Bli medlem',
      desc: 'Stilren och luftig design med stora bilder för modebutiker.', feats: ['Webbshop', 'Kollektioner', 'Kampanjer'] },

    { id: 'cykel', cat: 'sport', type: 'Cykelbutik', brand: 'Trampa Cykel', domain: 'trampacykel.se', variant: 'bold', hero: 'cy1', word: 'RIDE',
      theme: T('#0f1a17', '#f1f6f3', '#9fb5ac', '#ffd23f', '#161200', '#15241f', AR, IN, '999px', '14px'),
      bar: 'Fri lånecykel vid verkstadsbesök', links: ['Cyklar', 'Verkstad', 'Tillbehör', 'Kontakt'], btn: 'Boka verkstad', eye: 'Cykelbutik och verkstad',
      h1: 'Rätt cykel för *din väg*', p: 'Stadscyklar, elcyklar och terräng. Vår verkstad ser till att du alltid rullar säkert.', c1: 'Se cyklarna', c2: 'Boka verkstad',
      secs: ['feat', 'prods', 'cta'],
      featHead: ['Mer än en cykelbutik', 'Vi hjälper dig hela vägen.'], feat: [['wrench', 'Egen verkstad', 'Service och reparation av alla märken.'], ['heart', 'Provcykla', 'Prova innan du bestämmer dig, utan krångel.'], ['shield', 'Trygg garanti', 'Du får tydlig garanti och enkel support.']],
      prodsHead: ['Cyklar just nu', 'Ett urval från butiken.'], prods: [['cy2', 'Stadscykel Klassiker', 'Stad', '6 990 kr', 'Nyhet'], ['cy3', 'Retrocykel Sven', 'Stad', '5 490 kr', ''], ['cy4', 'Terrängcykel Trail', 'Terräng', '11 900 kr', ''], ['cy5', 'Cyklar i butiken', 'Flera modeller', 'Från 4 990 kr', 'Fråga oss']],
      ctaH: 'Dags för service? Boka din tid i verkstaden.', ctaB: 'Boka verkstad',
      desc: 'Energisk design för cykelbutiker med produkter, verkstad och bokning.', feats: ['Produkter', 'Verkstadsbokning', 'Kampanjer'] },

    { id: 'yoga', cat: 'sport', type: 'Yogastudio', brand: 'Stilla Yoga', domain: 'stillayoga.se', variant: 'center', hero: 'yo1',
      theme: T('#f4efe8', '#2a2622', '#7b7168', '#b7795c', '#ffffff', '#e6ddd0', CG, MA, '999px', '24px'),
      bar: 'Första passet är gratis för nya medlemmar', links: ['Schema', 'Pass', 'Priser', 'Kontakt'], btn: 'Boka pass', eye: 'Yoga och andning',
      h1: 'Ta dig tid att *landa*', p: 'Lugna pass för både nybörjare och vana. Boka ditt pass online och kom som du är.', c1: 'Se schemat', c2: 'Boka pass',
      secs: ['feat', 'gal', 'about', 'svc', 'cta'],
      featHead: ['Det här får du', 'Rörelse, andning och lugn.'], feat: [['heart', 'Alla nivåer', 'Pass anpassade för både nybörjare och erfarna.'], ['clock', 'Flexibla tider', 'Morgon, lunch och kväll alla veckodagar.'], ['leaf', 'Liten grupp', 'Vi håller grupperna små så att alla blir sedda.']],
      gal: [['yo2', 'Vinyasa'], ['yo3', 'Meditation'], ['yo4', 'Stretch och rörlighet']],
      aboutHead: ['En plats att varva ner', 'Ljust, lugnt och varmt. Rummet är byggt för att du ska kunna släppa taget.'], aboutPh: 'yo5', about: ['Erfarna lärare', 'Mattor och material finns', 'Lugn och ljus lokal'],
      svcHead: ['Priser', 'Välj det som passar dig.'], svc: [['Dropin', 'Ett pass när det passar', 'Per pass'], ['Klippkort', 'Tio pass att använda när du vill', 'Tio pass'], ['Månadskort', 'Obegränsat antal pass', 'Per månad']],
      ctaH: 'Redo att komma igång? Boka ditt första pass.', ctaB: 'Boka pass',
      desc: 'Lugn och mjuk design för studior med fokus på schema, pass och bokning.', feats: ['Schema', 'Bokning', 'Priser'] },

    { id: 'nagel', cat: 'skonhet', type: 'Nagelstudio', brand: 'Nagelbaren', domain: 'nagelbaren.se', variant: 'splitr', hero: 'na1',
      theme: T('#1a1013', '#fbeff2', '#c4a5ae', '#f08fb0', '#2a0f18', '#24151a', PF, MA, '999px', '20px'),
      bar: 'Boka din tid online, ofta samma vecka', links: ['Behandlingar', 'Priser', 'Galleri', 'Boka'], btn: 'Boka tid', eye: 'Naglar med omsorg',
      h1: 'Naglar som *sitter länge*', p: 'Manikyr, gellack och naildesign i en ombonad studio. Boka din tid direkt på nätet.', c1: 'Boka tid', c2: 'Se priser',
      secs: ['svc', 'gal', 'about', 'cta'],
      svcHead: ['Behandlingar och priser', 'Tydliga priser, inga överraskningar.'], svc: [['Manikyr', 'Form, kutikula och vård', '350 kr'], ['Gellack', 'Hållbar färg i flera veckor', '450 kr'], ['Nagelförlängning', 'Naturligt och hållbart resultat', '650 kr'], ['Påfyllning', 'Underhåll av dina naglar', '500 kr']],
      gal: [['na2', 'Behandling'], ['na3', 'Lackhyllan'], ['na4', 'Resultat']],
      aboutHead: ['Tid för dig och dina naglar', 'Vi tar oss tid, lyssnar på dina önskemål och använder produkter som är snälla mot naglarna.'], aboutPh: 'na5', about: ['Rena och sterila verktyg', 'Skonsamma produkter', 'Boka online dygnet runt'], ctaH: 'Unna dig nya naglar. Boka din tid.', ctaB: 'Boka tid',
      desc: 'Mjuk och stilren design för nagelstudior med bokning, priser och galleri.', feats: ['Bokning', 'Priser', 'Galleri'] },

    { id: 'frisor', cat: 'skonhet', type: 'Frisörsalong', brand: 'Klippet Frisör', domain: 'klippetfrisor.se', variant: 'full', hero: 'fr1',
      theme: T('#f3f1ed', '#1c1a18', '#76716b', '#c1553a', '#ffffff', '#e4dfd6', DM, IN, '0', '2px'),
      bar: 'Boka din klippning online, tider finns redan i veckan', links: ['Tjänster', 'Priser', 'Om oss', 'Kontakt'], btn: 'Boka tid', eye: 'Frisör för alla',
      h1: 'Hår som *du trivs med*', p: 'Klippning, färg och styling av frisörer som lyssnar. Boka din tid direkt på nätet.', c1: 'Boka tid', c2: 'Våra tjänster',
      secs: ['svc', 'gal', 'about', 'info', 'cta'],
      svcHead: ['Tjänster och priser', 'Kom som du är, gå härifrån nöjd.'], svc: [['Klippning dam', 'Tvätt, klippning och styling', 'Från 690 kr'], ['Klippning herr', 'Klippning och styling', 'Från 450 kr'], ['Färgning', 'Helfärg, slingor och toning', 'Från 1 190 kr'], ['Håruppsättning', 'Till fest och bröllop', 'Från 850 kr']],
      gal: [['fr2', 'Styling'], ['fr3', 'Klippning'], ['fr4', 'Verktygen']],
      aboutHead: ['Frisörer som lyssnar', 'Vi tar oss tid att förstå vad du vill, och berättar ärligt vad som passar ditt hår.'], aboutPh: 'fr5', about: ['Erfarna frisörer', 'Professionella produkter', 'Boka online dygnet runt'],
      hours: DAYS('09:00 till 18:00', '09:00 till 15:00', 'Stängt'), addr: ['Salongsgatan 4', '123 45 Staden'], ctaH: 'Dags för ny frisyr? Boka din tid.', ctaB: 'Boka tid',
      desc: 'Elegant design för frisörer med tjänster, priser och enkel bokning.', feats: ['Bokning', 'Priser', 'Galleri'] },

    { id: 'foto', cat: 'ovriga', type: 'Fotograf', brand: 'Ljuspunkt Foto', domain: 'ljuspunkt.se', variant: 'full', hero: 'fo1',
      theme: T('#101010', '#f3f3f3', '#a1a1a1', '#ffffff', '#101010', '#181818', CG, IN, '0', '0'),
      bar: 'Boka din fotografering, få lediga tider direkt', links: ['Bröllop', 'Porträtt', 'Priser', 'Kontakt'], btn: 'Boka fotografering', eye: 'Bröllop och porträtt',
      h1: 'Ögonblick som *blir kvar*', p: 'Bröllop, porträtt och familj. Jag fångar det som känns äkta, så att du minns det precis som det var.', c1: 'Se bilderna', c2: 'Boka fotografering',
      secs: ['gal', 'svc', 'about', 'cta'],
      gal: [['fo2', 'Bröllop'], ['fo3', 'Kärlek'], ['fo4', 'Detaljer']],
      svcHead: ['Paket och priser', 'Tydligt innehåll, tydligt pris.'], svc: [['Porträtt', 'En timme och tjugo redigerade bilder', 'Från 1 800 kr'], ['Familj', 'Två timmar på plats du väljer', 'Från 2 900 kr'], ['Bröllop', 'Hela dagen, från förberedelser till fest', 'Från 14 900 kr']],
      aboutHead: ['Jag fotograferar det äkta', 'Jag är mer intresserad av ögonblicken mellan det planerade än av stela poser.'], aboutPh: 'fo5', about: ['Leverans av redigerade bilder', 'Personlig kontakt hela vägen', 'Resor ingår i närområdet'], ctaH: 'Har du en dag du vill minnas? Hör av dig.', ctaB: 'Boka fotografering',
      desc: 'Elegant och bildstark design för fotografer med galleri, paket och bokning.', feats: ['Bildgalleri', 'Paket', 'Bokning'] },

    { id: 'tradgard', cat: 'ovriga', type: 'Trädgårdsföretag', brand: 'Grönare Trädgård', domain: 'gronaretradgard.se', variant: 'split', hero: 'tr1',
      theme: T('#f4f6ef', '#1f2a1a', '#66745c', '#3f7a3b', '#ffffff', '#e3ead8', FR, MA, '12px', '20px'),
      bar: 'Boka tid för trädgårdsrådgivning, helt utan förpliktelser', links: ['Tjänster', 'Projekt', 'Om oss', 'Kontakt'], btn: 'Få en offert', eye: 'Trädgård och utemiljö',
      h1: 'En trädgård att *trivas i*', p: 'Design, anläggning och skötsel av trädgårdar. Vi gör uteplatsen till en förlängning av ditt hem.', c1: 'Få en offert', c2: 'Våra projekt',
      secs: ['feat', 'gal', 'about', 'cta'],
      featHead: ['Det vi gör', 'Från skiss till grönskande trädgård.'], feat: [['leaf', 'Trädgårdsdesign', 'Vi ritar en trädgård som passar din tomt och dina behov.'], ['wrench', 'Anläggning', 'Gångar, rabatter, gräsmattor och uteplatser.'], ['cal', 'Skötsel', 'Löpande skötsel året runt, så att den förblir fin.']],
      gal: [['tr2', 'Stenlagd gång'], ['tr3', 'Blomsterrabatt'], ['tr4', 'Gräsmatta']],
      aboutHead: ['Hantverk och växtkunskap', 'Vi älskar växter och bygger trädgårdar som blir vackrare för varje år.'], aboutPh: 'tr5', about: ['Erfarna trädgårdsmästare', 'Växter anpassade efter klimatet', 'Tydlig offert och tidsplan'], ctaH: 'Drömmer du om en ny trädgård? Få en offert.', ctaB: 'Få en offert',
      desc: 'Fräsch och naturnära design för trädgårdsföretag med projekt och offertknapp.', feats: ['Projektgalleri', 'Tjänster', 'Offertformulär'] }
  ];

  /* ---------- Variation: varje exempel får egen meny, hero, sektioner och sidfot ---------- */
  const STEPS = {
    el: ['Så går det till', 'Enkelt från första samtalet.', [['phone', 'Du hör av dig', 'Berätta vad du behöver hjälp med.'], ['cal', 'Vi bokar ett besök', 'Vi kommer när det passar dig.'], ['bolt', 'Jobbet blir klart', 'Du får tydlig dokumentation efteråt.']]],
    bil: ['Så fungerar det', 'Tre steg till en bil som funkar.', [['cal', 'Boka tid online', 'Välj en tid som passar dig.'], ['wrench', 'Vi lagar och servar', 'Vi ringer innan något extra görs.'], ['check', 'Hämta din bil', 'Du får dokumentation på allt arbete.']]],
    maleri: ['Så jobbar vi', 'Tydligt från start till mål.', [['home', 'Hembesök', 'Vi tittar på ytorna och pratar färg.'], ['check', 'Offert', 'Pris och tidsplan är klara från start.'], ['star', 'Målning och städning', 'Du får ett färdigt och prydligt resultat.']]],
    vvs: ['Så hjälper vi dig', 'Snabbt när det brådskar.', [['phone', 'Ring oss', 'Berätta vad som hänt, så prioriterar vi rätt.'], ['truck', 'Vi åker direkt', 'Rörmokaren kommer med rätt material.'], ['shield', 'Allt blir tryggt', 'Du får tydlig information om vad som gjorts.']]]
  };
  const OVR = {
    pizzeria: { hdr: 'bar', foot: 'cols' },
    bygg: { hdr: 'bar', variant: 'card', svcStyle: 'cards', foot: 'cols' },
    sport: { hdr: 'bar', foot: 'big' },
    barber: { hdr: 'center', foot: 'center' },
    cafe: { hdr: 'minimal', variant: 'collage', collage: ['espresso', 'cafe2'], menuStyle: 'grid', secs: ['feat', 'menu', 'info'], foot: 'center', ctr: true },
    butik: { hdr: 'stack', foot: 'cols' },
    bistro: { hdr: 'overlay', foot: 'big' },
    el: { hdr: 'stack', variant: 'type', secs: ['feat', 'steps', 'svc', 'cta'], foot: 'cols' },
    blommor: { hdr: 'center', variant: 'arch', foot: 'center', ctr: true },
    gym: { hdr: 'overlay', bandWords: ['Styrka', 'Kondition', 'Padel', 'Gruppträning'], secs: ['band', 'feat', 'gal', 'svc', 'cta'], foot: 'big' },
    salong: { hdr: 'overlay', foot: 'center', ctr: true },
    bil: { hdr: 'minimal', secs: ['feat', 'steps', 'svc', 'info', 'cta'], foot: 'cols' },
    sushi: { hdr: 'minimal', foot: 'big' },
    bageri: { hdr: 'center', bandWords: ['Surdeg', 'Rågbröd', 'Kanelbullar', 'Tårtor'], secs: ['band', 'feat', 'menu', 'gal', 'info'], foot: 'cols' },
    maleri: { hdr: 'center', variant: 'collage', collage: ['ma3', 'ma4'], secs: ['feat', 'svc', 'steps', 'cta'], foot: 'cols' },
    vvs: { hdr: 'minimal', variant: 'card', secs: ['feat', 'steps', 'svc', 'gal', 'about', 'info', 'cta'], foot: 'big' },
    bokhandel: { hdr: 'stack', variant: 'type', foot: 'center' },
    klader: { hdr: 'center', foot: 'cols' },
    cykel: { hdr: 'stack', foot: 'cols' },
    yoga: { hdr: 'stack', foot: 'center', ctr: true },
    nagel: { hdr: 'center', variant: 'collage', collage: ['na2', 'na3'], secs: ['svc', 'about', 'cta'], foot: 'center', ctr: true },
    frisor: { hdr: 'overlay', variant: 'card', foot: 'big' },
    foto: { hdr: 'minimal', foot: 'big' },
    tradgard: { hdr: 'bar', variant: 'arch', foot: 'cols' }
  };
  LIST.forEach(c => {
    Object.assign(c, OVR[c.id] || {});
    if (STEPS[c.id]) { c.stepsHead = STEPS[c.id].slice(0, 2); c.steps = STEPS[c.id][2]; }
  });
  const CATS = [['alla', 'Alla'], ['restauranger', 'Restauranger'], ['byggforetag', 'Byggföretag'], ['butiker', 'Butiker'], ['sport', 'Sport'], ['skonhet', 'Skönhet'], ['ovriga', 'Övriga företag']];
  const get = id => LIST.find(c => c.id === id);

  /* ---------- Rendering ---------- */
  function vars(t) {
    return `--bg:${t.bg};--tx:${t.tx};--mut:${t.mut};--ac:${t.ac};--onac:${t.onac};--panel:${t.panel};--hf:${t.hf};--bf:${t.bf};--rad:${t.rad};--rad3:${t.rad3}`;
  }
  const copy = c => `<div class="mk-copy"><p class="mk-eye">${esc(c.eye)}</p><h3>${em(c.h1)}</h3><p class="mk-p">${esc(c.p)}</p><div class="mk-cta"><span class="mk-btn">${esc(c.c1)}</span><span class="mk-btn ghost">${esc(c.c2)}</span></div></div>`;
  const heroPh = c => ph(c.hero, '', '', ART[c.art]);
  const head = (h, center) => h ? `<h2 class="mk-h2">${esc(h[0])}</h2><p class="mk-sub">${esc(h[1])}</p>` : '';

  function hero(c) {
    const v = c.variant;
    if (v === 'full') return `<div class="mk-hero mk-full">${heroPh(c)}${copy(c)}</div>`;
    if (v === 'center') return `<div class="mk-hero mk-center">${heroPh(c)}${copy(c)}</div>`;
    if (v === 'bold') return `<div class="mk-hero mk-bold"><div class="mk-word">${esc(c.word)}</div>${copy(c)}${heroPh(c)}</div>`;
    if (v === 'card') return `<div class="mk-hero mk-cardh">${heroPh(c)}<div class="mk-cardbox">${copy(c)}</div></div>`;
    if (v === 'type') return `<div class="mk-hero mk-type"><div class="mk-tcopy"><p class="mk-eye">${esc(c.eye)}</p><h3>${em(c.h1)}</h3></div><div class="mk-trow"><div><p class="mk-p">${esc(c.p)}</p><div class="mk-cta"><span class="mk-btn">${esc(c.c1)}</span><span class="mk-btn ghost">${esc(c.c2)}</span></div></div>${heroPh(c)}</div></div>`;
    if (v === 'collage') return `<div class="mk-hero mk-coll">${copy(c)}<div class="mk-cgrid">${ph(c.hero, 'big', '', ART[c.art])}${c.collage.map(k => ph(k, '', '')).join('')}</div></div>`;
    if (v === 'arch') return `<div class="mk-hero mk-arch">${copy(c)}<div class="mk-archp">${heroPh(c)}</div></div>`;
    return `<div class="mk-hero mk-split${v === 'splitr' ? ' rev' : ''}">${copy(c)}${heroPh(c)}</div>`;
  }
  const SEC = {
    steps: c => `<section class="mk-sec alt">${head(c.stepsHead)}<div class="mk-steps">${c.steps.map(f => `<div class="mk-step"><div class="mk-sico">${ico(f[0])}</div><h4>${esc(f[1])}</h4><p>${esc(f[2])}</p></div>`).join('')}</div></section>`,
    band: c => `<div class="mk-bandw"><div>${c.bandWords.concat(c.bandWords).map(w => `<b>${esc(w)}</b><i></i>`).join('')}</div></div>`,
    feat: c => `<section class="mk-sec">${head(c.featHead)}<div class="mk-grid3">${c.feat.map(f => `<div class="mk-card">${ico(f[0])}<h4>${esc(f[1])}</h4><p>${esc(f[2])}</p></div>`).join('')}</div></section>`,
    menu: c => c.menuStyle === 'grid' ? `<section class="mk-sec alt">${head(c.menuHead)}<div class="mk-mgrid">${c.menu.map(m => `<div class="mk-mcard"><em>${esc(m[2])}</em><b>${esc(m[0])}</b><span>${esc(m[1])}</span></div>`).join('')}</div></section>` : `<section class="mk-sec alt"><div class="mk-menu">${ph(c.menuPh, '', '', ART[c.art])}<div>${head(c.menuHead)}${c.menu.map(m => `<div class="mk-mi"><div><b>${esc(m[0])}</b><span>${esc(m[1])}</span></div><em>${esc(m[2])}</em></div>`).join('')}</div></div></section>`,
    svc: c => c.svcStyle === 'cards' ? `<section class="mk-sec alt">${head(c.svcHead)}<div class="mk-svcg">${c.svc.map(x => `<div class="mk-svcc"><em>${esc(x[2])}</em><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div></section>` : `<section class="mk-sec alt"><div class="mk-svc"><div>${head(c.svcHead)}<span class="mk-btn">${esc(c.btn)}</span></div><div>${c.svc.map(s => `<div class="mk-row"><div><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div><em>${esc(s[2])}</em></div>`).join('')}</div></div></section>`,
    gal: c => `<section class="mk-sec"><div class="mk-gal">${c.gal.map(g => ph(g[0], '', `<span>${esc(g[1])}</span>`)).join('')}</div></section>`,
    prods: c => `<section class="mk-sec">${head(c.prodsHead)}<div class="mk-prods">${c.prods.map(p => `<div class="mk-prod">${ph(p[0], '', p[4] ? `<span class="mk-tag">${esc(p[4])}</span>` : '')}<b>${esc(p[1])}</b><span>${esc(p[2])}</span><em>${esc(p[3])}</em><u>Lägg i kundvagn</u></div>`).join('')}</div></section>`,
    about: c => `<section class="mk-sec"><div class="mk-about">${ph(c.aboutPh, '', '')}<div><h2 class="mk-h2">${esc(c.aboutHead[0])}</h2><p class="mk-sub" style="margin-bottom:0">${esc(c.aboutHead[1])}</p><div class="mk-list">${c.about.map(a => `<div><i>${tick}</i>${esc(a)}</div>`).join('')}</div></div></div></section>`,
    info: c => c.hours ? `<section class="mk-sec"><div class="mk-info"><div class="mk-hours"><h4>Öppettider</h4>${c.hours.map(h => `<div>${esc(h[0])}<span>${esc(h[1])}</span></div>`).join('')}</div><div class="mk-map"><div class="mk-pin"></div><div class="mk-addr"><div><b>${esc(c.addr[0])}</b><span>${esc(c.addr[1])}</span></div><span class="mk-btn sm">Vägbeskrivning</span></div></div></div></section>` : '',
    cta: c => `<div class="mk-ctab"><h2>${esc(c.ctaH || 'Välkommen att höra av dig.')}</h2><span class="mk-btn">${esc(c.ctaB || c.btn)}</span></div>`
  };

  const spanL = l => `<span>${esc(l)}</span>`;
  const burger = '<span class="mk-burger"><i></i><i></i><i></i></span>';
  function cols(c, name) {
    return `<div class="mk-fg"><div><div class="mk-logo"><i></i>${name}</div><p>${esc(c.type)}. Välkommen att höra av dig.</p></div>
      <div><h5>Meny</h5><ul>${c.links.slice(0, 4).map(l => `<li>${esc(l)}</li>`).join('')}</ul></div>
      <div><h5>Kontakt</h5><ul><li>${c.addr ? esc(c.addr[0]) : 'Besöksadress'}</li><li>08 123 45 67</li><li>info@${esc(c.domain)}</li></ul></div>
      <div><h5>Följ oss</h5><ul><li>Instagram</li><li>Facebook</li></ul></div></div>`;
  }
  function footer(c, name) {
    const copyr = `<div class="mk-copyr"><span>© 2026 ${name}</span><span>Integritetspolicy</span></div>`;
    if (c.foot === 'center') return `<div class="mk-foot ctrf"><div class="mk-logo"><i></i>${name}</div><ul class="mk-fl">${c.links.map(l => `<li>${esc(l)}</li>`).join('')}</ul><p>${c.addr ? esc(c.addr[0]) + ', ' + esc(c.addr[1]) : esc(c.type)} &nbsp;·&nbsp; 08 123 45 67</p>${copyr}</div>`;
    if (c.foot === 'big') return `<div class="mk-foot bigf">${cols(c, name)}<div class="mk-bigname">${name}</div>${copyr}</div>`;
    return `<div class="mk-foot">${cols(c, name)}${copyr}</div>`;
  }

  function nav(c, name) {
    const L = c.links, btn = `<span class="mk-btn sm">${esc(c.btn)}</span>`, logo = `<div class="mk-logo"><i></i>${name}</div>`;
    const bar = c.bar ? `<div class="mk-bar">${esc(c.bar)}</div>` : '';
    if (c.hdr === 'center') return `<div class="mk-top ctr"><div class="mk-links">${L.slice(0, 2).map(spanL).join('')}</div>${logo}<div class="mk-links r">${L.slice(2).map(spanL).join('')}</div></div>`;
    if (c.hdr === 'stack') return `<div class="mk-stk">${c.bar ? `<div class="mk-note">${esc(c.bar)}</div>` : ''}<div class="mk-stk-logo">${logo}</div><div class="mk-stk-links">${L.map(spanL).join('')}</div></div>`;
    if (c.hdr === 'minimal') return `<div class="mk-top min">${logo}<div class="mk-min-r">${btn}${burger}</div></div>`;
    return `${bar}<div class="mk-top"><div class="mk-logo"><i></i>${name}</div><div class="mk-links">${L.map(spanL).join('')}</div>${btn}</div>`;
  }

  function mock(c, brand, short) {
    const name = esc(brand || c.brand);
    let top;
    if (c.hdr === 'overlay') top = `<div class="mk-ov"><div class="mk-top ovl"><div class="mk-logo"><i></i>${name}</div><div class="mk-links">${c.links.map(spanL).join('')}</div><span class="mk-btn sm">${esc(c.btn)}</span></div>${hero(c)}</div>`;
    else top = nav(c, name) + hero(c);
    return `<div class="mock${short ? ' short' : ''}${c.ctr ? ' ctr' : ''}" style="${vars(c.theme)}">${top}${c.secs.map(k => SEC[k](c)).join('')}${footer(c, name)}</div>`;
  }
  function frame(id, opts) {
    opts = opts || {};
    const c = typeof id === 'string' ? get(id) : id;
    const url = opts.brand ? opts.brand.toLowerCase().replace(/[^a-z0-9åäö]+/gi, '') + '.se' : c.domain;
    return `<div class="bframe"><div class="bbar"><i></i><i></i><i></i><span class="burl">${esc(url || c.domain)}</span></div><div class="bview${opts.scroll ? ' scroll' : ''}"><div class="msizer">${mock(c, opts.brand, !opts.scroll)}</div></div></div>`;
  }

  /* Skala alla .bview till bredden */
  const ro = 'ResizeObserver' in window ? new ResizeObserver(es => es.forEach(e => scale(e.target))) : null;
  function scale(v) {
    const m = v.querySelector('.mock'); if (!m) return;
    const s = v.clientWidth / 1000, h = m.offsetHeight;
    m.style.setProperty('--s', s);
    m.style.setProperty('--sh', Math.max(0, h - 640));
    const z = v.querySelector('.msizer'); if (z && v.classList.contains('scroll')) z.style.height = (h * s) + 'px';
  }
  function fit(root) {
    (root || document).querySelectorAll('.bview').forEach(v => { scale(v); if (ro) ro.observe(v); });
  }
  document.addEventListener('mouseover', e => {
    const card = e.target.closest && e.target.closest('.pcard');
    if (!card) return;
    const v = card.querySelector('.bview'), m = v && v.querySelector('.mock');
    if (m && !m.classList.contains('full')) { m.classList.add('full'); scale(v); }
  });
  document.addEventListener('mouseout', e => {
    const card = e.target.closest && e.target.closest('.pcard');
    if (!card || card.contains(e.relatedTarget)) return;
    const m = card.querySelector('.mock');
    if (m) setTimeout(() => { if (!card.matches(':hover')) m.classList.remove('full'); }, 900);
  });

  window.Previews = { list: LIST, cats: CATS, get, mock, frame, fit, esc };
})();



