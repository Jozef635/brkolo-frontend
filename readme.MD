# Geolokační hra Brkolo

Tato hra vznikla pro potřeby střediskové hry Brkolo [Dvojky Brno](http://http://www.dvojkabrno.cz/).

Jedná se o jednudochou geolokační hru po širším centru Brna. Cílem je provést hráče po méně známých zákoutích města. Tuto hru si můžete zahrát buď "jak je" (adresa je <https://brkolo.nastojte.cz>, další materiály najdete na [Hranostaji](https://www.hranostaj.cz/hra4306)), nebo si stáhnout zdrojové kódy a hru upravit podle vlastních potřeb (loga, barvy, texty, souřadnice). K úpravě hry je dobré mít základní znalosti práce s příkazovou řádkou a  ideálně i s vývojem webových aplikací a programování, ale není to nutné. Níže naleznete podrobný postup pro zprovoznění a úpravy aplikace.

Pokud se rozhodnete aplikaci použít nebo upravit, budu rád, když mi dáte vědět na <adam@dvojkabrno.cz>. Stejně tak napište, pokud byste chtěli s něčím poradit.

## Jak aplikaci zprovoznit

Pro začátek se omlouvám. Některé kroky tohoto návodu jsou trochu složité. Šlo by to udělat lépe, vím, ale bouhužel času není neomezeně  občas je nutné sáhnout ke kompromisům.

Aplikaci je možné provozovat na *statickém hostingu* - to znamná, že tam nemusí běžet PHP nebo nějaký jiný skriptovací jazyk. Stačí opravdu místo, kam nahrajete HTML soubory, a hra bude fungovat, protože používá pouze HTML a Javascript. S hledáním takového prostoru, kam můžete aplikaci nahrát, vám ale nepomůžu. Obvykle takové služby nabízejí studentům zdarma univerzity v rámci Informačního systému (např. IS MU - Můj web) nebo můžete použít služby jako [Netlify](https://www.netlify.com/) nebo [GitHub Pages](https://pages.github.com/). Tam ale bude složitější konfigurace díky integraci s Gitem, kterou tady popisovat nebudu.

Původní verze je hostovaná v [Amazon Web Services](https://aws.amazon.com/). Pokud AWS znáte, můžete použít nebo si upravit mou [CloudFormation template](https://github.com/oookoook/cloud-formation-templates/tree/master/nastojte-frontend).

Abyste aplikaci mohli provozovat ve statickém hostingu, je ale třeba na vašem počítači upravit a aplikaci sestavit ("buildnout"). Tím získáte HTML a JS soubory, které pak nahrajete na hosting.

## Postup pro vytvoření vlastní verze aplikace

1. Stáhněte si nebo naklonujte Git repozitář
1. Nainstalujte [Node.js](https://nodejs.org/) - stačí verze 10
1. V adresáři, kde máte projekt, spusťte příkaz (nejlépe v příkazová řádce :)) `npm install`
1. Až operace skončí, zkuste spustit příkaz `npm run dev`
1. Po chvíli můžete do prohlížeče zkusit adat adresu `http://localhost:8080`, měla by se zobrazit původní verze aplikace. (číslo portu na konci adresy se může lišit. Konkrténí číslo portu, kde aplikace běží, je vidět v příkazovém řádku na začátku výpisu generovaného tímto příkazem).
1. Ukončete vývojový server stiskem `Ctrl+C` (budete pak muset ukončení ještě potvrdit)
1. Upravte následující soubory podle vašich představ:
   * `src/index.html` (název, autor,...)
   * `assets/title.png` (nahraďte vaším logem)
   * `assets/favicon.ico` (nahraďte vaší ikonou)
   * `src/index.js` (barvy na řádcích 25-27, vybírejte zde: <https://vuetifyjs.com/en/framework/colors>)
   * `src/App.vue` (úvodní text)
   * `src/markers.json` (souřadnice stanovišť a texty otázek - souřadnice zjistíte např. na Mapy.cz)
1. Spusťte znova `npm run dev`, aplikace by nyní už měla vypadat zhruba podle vašich předstat. Pokud nyní budete zdrojový kód upravovat, většina změn se bude rovnou promítat do aplikace otevřené v prohlížeči.
1. Až budete s výsledkem spokojení, spusťte příkaz `npm run build`. Do adresáře `dist` se vám vygenerují soubory, které můžete nahrát na hosting.