# Närsida: att göra

## Publicering (väntar på GitHub)
- [ ] Logga in på github.com/login och skapa ett publikt repo (till exempel `narsida`)
- [ ] Ladda upp ALLA filer och mappar i denna mapp (index.html, css, js, webbdesign, kontakt, integritetspolicy, anvandarvillkor, cookiepolicy, robots.txt, sitemap.xml)
- [ ] Settings, Pages: Deploy from branch, main, / (root)
- [ ] Ange anpassad domän `närsida.se` i Pages
- [ ] HostUp DNS: 4 A records till 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 samt CNAME för www till <github-användarnamn>.github.io
- [ ] Slå på "Enforce HTTPS" när certifikatet är klart
- OBS: sidan använder sökvägar från roten (/css/...), så den ska ligga på domänen närsida.se, inte under en undersökväg.

## Innan lansering
- [ ] Exempelsidornas foton hämtas direkt från Unsplash (fri licens). Vill ni slippa det beroendet kan fotona laddas ned till assets/ senare.
- [x] Den riktiga loggan används nu (assets/logo-header.png, logo-full.png, logo-mark.png)
- [ ] Koppla formuläret: lägg adressen från en formulärtjänst i js/config.js (formEndpoint). Utan den skickas ingenting.
- [ ] Klistra in adresser till Instagram, TikTok och YouTube i js/config.js (social). Tomma ikoner i sidfoten gör ingenting.
- [ ] Företagsuppgifter i js/config.js (organisationsnummer och adress) om de ska visas. Telefon och ort är borttagna.
- [ ] Låt någon granska integritetspolicy, användarvillkor och cookiepolicy. Gula utkastrutorna och platshållarna är borttagna, men texterna är inte juridiskt granskade (bland annat 12 månaders lagring, Google Fonts och leverantörer).
- [ ] Ta bort noindex på de tre juridiska sidorna när texterna är klara
