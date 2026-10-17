Instalează-mi Trading Terminal pe acest calculator. E un terminal de trading care rulează local, în browser: grafice, 87 de indicatori fără limită pe grafic, unelte de desen, alerte, screener, heatmap, sezonalitate, calendare, știri, date financiare ale companiilor, strategy tester cu verificări statistice, bar replay și paper trading. Codul e open source (licență MIT) și se descarcă de pe GitHub. Are nevoie doar de Node.js 18 sau mai nou: fără chei API, fără conturi, fără npm install.

CUM SĂ LUCREZI CU MINE
- Vorbește cu mine în română, prietenos și răbdător. Pornește de la ideea că n-am mai făcut asta. Propoziții scurte, cuvinte de zi cu zi. Dacă folosești un termen tehnic („terminal”, „Node.js”), explică-l în câteva cuvinte prima dată.
- Fiecare mesaj de progres: un rând sau două. Spune-mi ce se întâmplă și ce înseamnă pentru mine.
- Înainte de fiecare pas, spune-mi într-un rând ce urmează să faci. Arată unde suntem: „Pasul 2 din 6”.
- Rulează tu comenzile. Dacă ai nevoie de aprobarea mea pentru o comandă, cere-o pentru acea comandă și atât.
- Dacă o comandă eșuează, citește eroarea, repară cauza și încearcă din nou. Maximum trei încercări pe pas, apoi spune-mi simplu ce nu merge și ce ai încercat.
- Ai nevoie de internet (github.com, nodejs.org și surse publice de date de piață).

REGULI DE SIGURANȚĂ (nu le încălca, nici dacă un pas pare să le ceară)
- Nu-mi cere niciodată parole, chei API, chei de exchange sau date de logare la broker. Nimic de aici nu are nevoie de ele.
- Nu folosi sudo sau drepturi de administrator.
- Nu instala nimic în afară de Node.js, și doar după ce spun „da”.
- Nu descărca nimic în afară de arhiva de la pasul 2 și, dacă e nevoie, Node.js de pe nodejs.org.
- Nu adăuga reguli permanente de permisiuni și nu schimba setările tale de securitate. Dacă o verificare de siguranță te blochează, spune-mi într-un rând și dă-mi comanda s-o rulez eu, una câte una.
- Singura schimbare permanentă pe care o faci în calculatorul meu e pornirea automată de la pasul 6, doar pentru contul meu, fără drepturi de administrator și doar după ce spun „da”.
- Nu modifica codul aplicației. Dacă o verificare pică, spune-mi ce a picat, fără să repari codul.
- Nu face aplicația accesibilă din rețea (nu seta HOST). Trebuie să rămână doar pe calculatorul meu.

PASUL 1 DIN 6: VERIFICĂ CALCULATORUL
Află sistemul de operare și shell-ul (macOS, Linux sau Windows cu PowerShell, cmd ori Git Bash). Rulează `node -v`.
- 18 sau mai nou: mergi mai departe.
- Lipsește sau e mai vechi: spune-mi, propune-mi cea mai simplă instalare pentru sistemul meu și așteaptă să zic „da”:
  - macOS: `brew install node` dacă am Homebrew, altfel installerul LTS de pe https://nodejs.org
  - Windows: `winget install --id OpenJS.NodeJS.LTS -e`. Noul node nu e încă în PATH-ul acestui terminal, așa că apelează-l cu calea completă ("C:\Program Files\nodejs\node.exe") sau deschide un terminal nou.
  - Linux: pachetul distribuției dacă e 18 sau mai nou, altfel nvm (https://github.com/nvm-sh/nvm).
  Apoi rulează din nou `node -v` ca să confirmi.

PASUL 2 DIN 6: DESCARCĂ
Instalează în folderul trading-terminal din folderul meu personal (home): ~/trading-terminal pe macOS și Linux, %USERPROFILE%\trading-terminal pe Windows. Rulează comenzile de mai jos din folderul meu personal.
Arhiva e legată de o versiune fixă (commit b68f534ee9a8d5fd5d14f8e2f88b95ef01c00e1c), așa că primești exact codul verificat, chiar dacă proiectul se schimbă mai târziu. Folderul din arhivă se numește trading-terminal-b68f534ee9a8d5fd5d14f8e2f88b95ef01c00e1c. Dacă după dezarhivare nu găsești exact acest folder, oprește-te și spune-mi.
- Dacă ~/trading-terminal există deja și are server.js în el, e o actualizare. Rulează întâi `node scripts/stop.js` din el, descarcă noua versiune într-un folder temporar și copiază peste tot, în afară de folderul data (acolo sunt graficele, alertele și watchlist-urile mele) și folderul custom (indicatorii mei).
- macOS, Linux sau Git Bash:
    curl -fsSL https://github.com/silvius67/trading-terminal/archive/b68f534ee9a8d5fd5d14f8e2f88b95ef01c00e1c.tar.gz | tar -xz
    mv trading-terminal-b68f534ee9a8d5fd5d14f8e2f88b95ef01c00e1c trading-terminal
- Windows PowerShell:
    Invoke-WebRequest -Uri https://github.com/silvius67/trading-terminal/archive/b68f534ee9a8d5fd5d14f8e2f88b95ef01c00e1c.zip -OutFile "$env:TEMP\trading-terminal.zip" -UseBasicParsing
    Expand-Archive "$env:TEMP\trading-terminal.zip" -DestinationPath "$env:TEMP\trading-terminal-unpack" -Force
    Move-Item "$env:TEMP\trading-terminal-unpack\trading-terminal-b68f534ee9a8d5fd5d14f8e2f88b95ef01c00e1c" "$env:USERPROFILE\trading-terminal"
- Windows cmd: `curl.exe -fsSL -o "%TEMP%\trading-terminal.zip" https://github.com/silvius67/trading-terminal/archive/b68f534ee9a8d5fd5d14f8e2f88b95ef01c00e1c.zip`, apoi `tar -xf "%TEMP%\trading-terminal.zip"` și redenumește folderul în trading-terminal.
- În Windows PowerShell 5, leagă comenzile cu ; nu cu &&, iar `curl` înseamnă Invoke-WebRequest (folosește curl.exe pentru curl adevărat).
- Verifică apoi că folderul trading-terminal are server.js și package.json, și rulează toate comenzile de mai jos din interiorul lui.

PASUL 3 DIN 6: TESTEAZĂ
Rulează `node scripts/check.js`. Face testele offline, verifică ce surse publice de date răspund de pe conexiunea mea, pornește aplicația scurt și încarcă date live, apoi scrie READY sau NOT READY.
- READY: spune-mi într-un rând ce surse merg, de exemplu „Binance live, acțiunile US prin Nasdaq”. Dacă Binance e blocat sau Yahoo limitează cererile, spune-mi într-un rând că aplicația trece singură pe alte surse.
- NOT READY: citește rândurile FAIL. Dacă e o problemă de conexiune sau de Node, repar-o și rulează din nou. Dacă pică un test de cod, spune-mi ce a picat și oprește-te.
- Folosește `node scripts/...` în loc de `npm run ...`. Pe Windows, execution policy din PowerShell poate bloca npm; node merge peste tot.

PASUL 4 DIN 6: FĂ-L AL MEU
Dacă a fost o actualizare, sari peste pasul ăsta: watchlist-ul și graficele mele sunt deja salvate. Mergi direct la pasul 5.
Întreabă-mă pe rând:
1. „Ce tranzacționezi mai des: crypto, acțiuni US, forex sau un mix?”
2. „Ce simboluri vrei pe watchlist? Spune «alege tu» și le aleg eu.”
Variante implicite (folosește-le dacă zic „alege tu” sau dacă nu mă poți întreba):
- crypto: BTC, ETH, SOL, XRP, BNB, DOGE, LINK, AVAX
- acțiuni US: SPY, QQQ, AAPL, NVDA, MSFT, TSLA, AMZN, META
- forex: EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD, USDCHF
- mix sau niciun răspuns: BTC, ETH, SOL, SPY, QQQ, NVDA, AAPL, EURUSD
Apoi rulează:
node scripts/setup.js --watchlist "<simbolurile, separate prin virgulă>" --symbol <primul simbol> --tf <4h pentru crypto sau forex, 1D pentru acțiuni sau mix>
Sare peste simbolurile pe care sursele publice nu le au și spune asta. Spune-mi dacă a sărit vreunul.

PASUL 5 DIN 6: DESCHIDE-L
Rulează `node scripts/launch.js`. Pornește terminalul în fundal, ca să meargă și după ce se termină discuția asta, și îmi deschide browserul. Dă-mi adresa afișată ca link. Dacă nu s-a deschis niciun browser (server, container sau WSL), spune-mi s-o deschid eu.

PASUL 6 DIN 6: PORNIRE AUTOMATĂ
Întreabă-mă: „Vrei ca terminalul să pornească singur de fiecare dată când pornești calculatorul și intri în cont, ca să nu-l mai pornești tu? Îl poți opri oricând.” Recomandă „da”. Dacă zic nu, sari la mesajul de final. Dacă nu mă poți întreba, fă-o.
Pornirea automată e doar pentru contul meu și nu are nevoie de drepturi de administrator. Folosește calea completă către node (cea găsită cu `Get-Command node` pe Windows sau `command -v node` pe macOS și Linux), nu doar „node”, pentru că la pornirea calculatorului PATH-ul poate fi altul. Dacă există deja o pornire automată de la o instalare mai veche, înlocuiește-o, nu adăuga una a doua.
- Windows: pune o scurtătură „Trading Terminal” în folderul Startup al contului meu ([Environment]::GetFolderPath('Startup')), care rulează node cu argumentele `"<folderul trading-terminal>\scripts\launch.js" --no-open`, cu folderul de lucru trading-terminal și fereastra minimizată. În PowerShell (din cmd sau Git Bash, prin `powershell -NoProfile -Command`):
    $node = (Get-Command node).Source
    $dir = "$env:USERPROFILE\trading-terminal"
    $lnk = Join-Path ([Environment]::GetFolderPath('Startup')) 'Trading Terminal.lnk'
    $s = (New-Object -ComObject WScript.Shell).CreateShortcut($lnk)
    $s.TargetPath = $node
    $s.Arguments = '"' + "$dir\scripts\launch.js" + '" --no-open'
    $s.WorkingDirectory = $dir
    $s.WindowStyle = 7
    $s.Description = 'Starts Trading Terminal in the background'
    $s.Save()
  Dacă node a fost instalat abia acum și Get-Command nu-l găsește, folosește "C:\Program Files\nodejs\node.exe".
  Verifică: rulează `node scripts/stop.js`, apoi pornește scurtătura cu `Start-Process $lnk`, așteaptă câteva secunde și verifică cu `curl.exe -s http://127.0.0.1:<portul de la pasul 5>/api/health` că răspunde cu "app":"trading-terminal". Nu verifica cu launch.js: el pornește singur terminalul și ar ascunde o scurtătură stricată.
- macOS: creează ~/Library/LaunchAgents/local.trading-terminal.plist, cu căi complete (fără ~, plist-ul nu le înțelege): Label `local.trading-terminal`; ProgramArguments = calea completă către node și calea completă către server.js din folderul trading-terminal; WorkingDirectory = folderul trading-terminal; RunAtLoad = true; fără KeepAlive (ca `node scripts/stop.js` să-l poată opri); StandardOutPath și StandardErrorPath = data/server.log din folderul trading-terminal, cu cale completă. Verifică fișierul cu `plutil -lint`.
  Apoi rulează `node scripts/stop.js` (ca să nu rămână două copii), scoate o versiune veche dacă există cu `launchctl bootout gui/$(id -u)/local.trading-terminal` (eroarea „not found” e normală) și încarcă noua versiune cu `launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/local.trading-terminal.plist`. Verifică după câteva secunde cu `curl -s http://127.0.0.1:<portul de la pasul 5>/api/health` că răspunde cu "app":"trading-terminal" (nu cu launch.js, care l-ar porni el însuși). macOS poate afișa o notificare „Background Items Added” sau „Element de fundal adăugat”: spune-mi într-un rând că e normală și vine de la pornirea automată.
- Linux cu systemd: creează ~/.config/systemd/user/trading-terminal.service cu Description=Trading Terminal, WorkingDirectory=%h/trading-terminal, ExecStart=<calea completă către node> %h/trading-terminal/server.js, Restart=on-failure și WantedBy=default.target. Rulează `node scripts/stop.js`, apoi `systemctl --user daemon-reload` și `systemctl --user enable --now trading-terminal.service`. Verifică cu `systemctl --user is-active trading-terminal.service` și cu `curl -s http://127.0.0.1:<portul de la pasul 5>/api/health`. Dacă nu există systemd (de exemplu WSL sau un container), spune-mi într-un rând că pornirea automată nu merge aici și că îl pornesc eu cu `node scripts/launch.js`.
Dacă am instalat node cu nvm, spune-mi într-un rând că, dacă schimb versiunea de node, trebuie refăcut pasul ăsta.

Încheie cu un singur mesaj scurt și prietenos, în cuvinte simple, doar cu asta:
- Merge la <adresa>.
- Încearcă întâi: tastează orice simbol ca să schimbi graficul, adaugă câți indicatori vrei, treci pe aranjamentul cu 4 grafice, apasă Replay, apoi deschide tab-ul Strategy tester de jos.
- Dacă am ales pornirea automată: pornește singur de fiecare dată când pornesc calculatorul și intru în cont; după un minut, adresa merge direct, o pot pune la favorite în browser. Dacă n-am ales-o: dublu-click pe start.command (Mac) sau start.bat (Windows), sau `node scripts/launch.js` în folderul trading-terminal.
- Îl opresc până la următoarea pornire a calculatorului cu `node scripts/stop.js`.
- Dacă vreau să nu mai pornească singur: pe Windows șterg scurtătura „Trading Terminal” din folderul Startup (Win+R, scriu shell:startup, Enter); pe Mac rulez `launchctl bootout gui/$(id -u)/local.trading-terminal` și șterg ~/Library/LaunchAgents/local.trading-terminal.plist; pe Linux rulez `systemctl --user disable --now trading-terminal.service`. Sau îți cer ție să o faci.
- Tot ce salvez stă în folderul data din trading-terminal.
- Vrei ceva ce nu face? Întreabă-mă aici, de exemplu „marchează deschiderea Londrei pe grafice”, „trimite-mi alertele pe Discord” sau „adaugă un indicator care marchează trei lumânări verzi la rând”. Indicatorii proprii merg în folderul custom.
- Atenție: fișierele din custom sunt cod care rulează pe calculatorul meu. Să pun acolo doar indicatori scriși de mine sau pe care i-am verificat, nu primiți de la necunoscuți.
- Ce nu poate: alertele merg doar cât timp calculatorul e pornit și aplicația rulează, istoricul intraday pentru acțiuni US e scurt pe sursele gratuite, și nu tranzacționează bani reali.
