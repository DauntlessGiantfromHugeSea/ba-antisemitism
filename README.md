# ZEICHEN LESEN

> Hass sagt nicht mehr, wie er heißt.

Interaktiver Decoder für antisemitische Codes und Chiffren.
Website der Kampagne „Gegen den Strich“, Teil einer **Bachelorarbeit Mediendesign**.

**Kein Angebot einer Behörde. Keine Rechtsberatung.**

---

## Worum es geht

Antisemitismus wird heute selten offen ausgesprochen. Er wird codiert — in
Begriffe, die harmlos klingen, Zahlen, die leer wirken, und Bilder, die man
schon einmal gesehen zu haben glaubt. Codes funktionieren wie eine Hundepfeife:
Wer sie hören kann, versteht sofort; alle anderen überlesen sie.

Die Seite baut **nichts nach**. Sie **markiert** — und macht damit sichtbar, was
ein Code leistet und warum er wirkt.

Gestalterische Leitidee: *Mechanismen entlarven, nicht Codes feiern.*

## Aufbau

| # | Abschnitt | Was passiert |
|---|-----------|--------------|
| – | **Kopf** | Schlagzeile, dann ein Laufband mit 44 gestrichenen Codes und ihrer Kurzbedeutung und die Codes-Übersicht aus sechs Formen und sechs Werkzeugen, die je Feld nur die Zahl der Einträge zeigt. |
| 01 | **Scan** | Vier konstruierte Posts im Karussell, je mit Marker-Sweep — zusammen 19 nummerierte Codes mit Sprechblase und Gegenrede. |
| 02 | **Test** | Acht Aussagen, drei Antwortoptionen. Die dritte — *„Kommt auf den Kontext an“* — ist keine Ausrede, sondern oft die fachlich richtige Antwort. |
| 03 | **Codes** | Sieben Kacheln (sechs Erzählungen, ein Werkzeugfeld), jede mit einem neutralen Zeichen, das den Mechanismus zeigt und keinen Code. Eine Kachel öffnet ihre Codes als Karten, Antippen klappt Bedeutung und Quelle auf (73 Einträge). Davor der Hinweis, dass Antisemitismus ein Brückennarrativ ist. |
| 04 | **Werkzeuge** | Sechs Werkzeuge der Umwegkommunikation, jedes mit gestrichenen Beispielen samt Bedeutung, dann die vier Wirkebenen als Grafik, danach drei belegte Zahlen zur Verbreitung auf dunklem Band. |
| 05 | **Fragen** | Sechs typische Einwände mit Antwort aus der Fachliteratur. |
| 06 | **Was tun** | Fünf Handlungsschritte als Ablaufgrafik. |
| 07 | **Melden** | BfV-Hinweistelefon und RIAS-Meldestelle. |

**Jede Aussage trägt eine Quellenangabe.**

## Gestaltung

Seit dem Umbau vom 07.11.2026 (Branch `claude/neutral-infografik`) ist die
Seite neutral und infografisch. Collagen, KI-Bilder, Risskanten und
Papiertexturen sind entfernt. Die Bilddateien liegen weiter in `assets/img/`
als Nachweis, siehe `assets/img/BILDER.md`.

Im zweiten Durchgang am selben Abend kamen das Signalrot und die einzelnen
Codes zurück. Die Seite ist jetzt plakativ und infografisch. Im dritten
Durchgang am 09.11.2026 fiel die Code-Wand wieder weg, das Laufband bekam
seinen alten Stil zurück, und die Kachel-Zeichen wurden zu Dateien. Im
vierten Durchgang am selben Tag verlor die Übersicht ihre Codewörter, und
die Rot-Regel kam dazu. Im fünften Durchgang am 21.11.2026 bekam die Seite
den weichen Stil, den auch die Plakate haben: Überschriften in normaler
Schreibung und ruhigerem Gewicht, eine Kartenform, Knöpfe als Pillen,
keine dunklen Flächen mehr und ein gemeinsames System für alle Zeichen.

- **Rot-Regel (21.11.2026):** Rot steht nur als Strich über einem Code
  (Laufband, Werkzeug-Beispiele, Posts nach dem Scan, Wortmarke) und auf
  kleinen Handlungselementen wie „Test starten“ und den Melde-Pfeilen.
  Keine roten Flächen als Schmuck. Damit sind die rote aktive Kachel, der
  rote Abschnitt Melden, die roten Abschnittsnummern und die Ausnahmen vom
  09.11.2026 (rote Zahlen der Übersicht, rotes „Haltung zeigen.“) abgelöst.
- **Mehr Farbe (21.11.2026, zweiter Durchgang):** Nach dem weichen Stil
  war die Seite zu blass. Rot kommt deshalb in festen Rollen zurück. Jede
  Kopflinie trägt links einen kurzen roten Anstrich, der Lesebalken oben
  ist rot. Die Zahlen der 36 Felder in der Übersicht, die 72 in ihrer
  Überschrift, die 73 im Kopf und „Haltung zeigen.“ stehen wieder rot,
  immer ab 24 px. Eine helle Rot-Tönung `#F8E3DC` färbt die aktive Kachel,
  die offene Lexikonkarte, Überfahren, die Nummernpille und das Zahlenband.
  Die großen Zeichen stehen auf einer Scheibe in `#F1CDC2`, bei der
  aktiven Kachel wird sie rot. Die Abschnitte wechseln jetzt streng
  zwischen Papier und Fläche. Kleine Schrift bleibt nie rot, große rote
  Flächen und dunkle Bänder gibt es weiter nicht.
- **Codes im Kopf:** Der Einstiegssatz nennt zwei auf TikTok belegte Codes
  mit zweiter Quelle, die Marionette und das Geldsack-Emoji. Beide stehen
  gestrichen und mit ihrer Bedeutung aus `codes.js` direkt im Satz.
- **Palette** als CSS-Variablen: Papier `#F3EFE7`, Fläche `#E7E1D6`,
  Schrift `#26241F`, Schrift 2 `#5C5850`, Linie `#A9A398`, dazu Signalrot
  `#E1251B` für den Strich und kleine Handlungselemente, `#B5140B` nur noch
  beim Überfahren roter Knöpfe, dazu Karte `#FBF9F4` wie auf den Plakaten.
  Schwarze oder dunkle Flächen gibt es seit dem 21.11.2026 nicht mehr.
  Alle Kontraste stehen im Kommentar bei den Farbvariablen in
  `assets/styles.css`. Die Urteilsfarben im Test (grün, grau, rot) bleiben,
  weil sie dort Bedeutung tragen.
- **Typografie:** Archivo (variabel) mit Gewicht 650 bis 700 und 85 bis
  88 % Breite in normaler Schreibung für Überschriften, normal für
  Fließtext, JetBrains Mono für Labels, Nummern und Quellen. Die Größen
  stehen als Skala in `--fs-*` in `assets/styles.css`.
- **Der Strich:** Auf Kampagnenmedien steht jeder Code rot gestrichen und
  nie ohne Bedeutung. Im Lexikon steht seit dem 21.11.2026 nichts
  gestrichen, jede Karte zeigt geschlossen einen Satz Einordnung.
  Laufband und Werkzeug-Beispiele nehmen die Kurzbedeutung aus
  `KURZ` in `codes.js`, wörtlich aus dem Erklärtext des Eintrags. Im
  Laufband ist der Strich ein schräger roter Balken wie im alten Stand, die
  Bedeutung steht klein darunter. Die Übersicht zeigt keine Codewörter,
  nur Zahlen, die Codes selbst stehen in den aufklappbaren Karten unter
  03 Codes. Offen stehen Codes nur im Test und in den Posts vor dem Scan.
- **Infografiken statt Bilder:** Codes-Übersicht aus sechs Formen und sechs
  Werkzeugen, die vier Wirkebenen, der Ablauf bei „Was tun“.
- **Kein antisemitisches Bildmaterial**, keine Personen, keine jüdischen
  Symbole.

### Abgrenzung zum Rechtsextremismus

Die Sammlung enthält **nur antisemitische** Codes. Rein rechtsextreme
Erkennungszeichen ohne Antisemitismusbezug (Zahlencodes wie 88 oder 18,
„14 Words“, das Hakenkreuz, die Blitz-Emojis) sind nicht aufgenommen.
Antisemitismus ist zudem kein Randphänomen des rechten Spektrums, sondern
ein Brückennarrativ über Milieus hinweg; darauf weist die Seite
ausdrücklich hin (BfV S. 15–17).

## Technik

Statische Seite, keine Abhängigkeiten, kein Build. Die Schriften liegen
lokal im Repo — es werden keine externen Dienste (z. B. Google Fonts)
angefragt.

```
index.html
assets/
  styles.css    Design-Tokens und Layout
  codes.js      Datenbasis: 73 Einträge mit Form (f) und Werkzeug (w),
                Formen, Werkzeuge, Kurzbedeutungen (KURZ), 7 Kacheln,
                Posts, Quiz, FAQ, Wirkebenen, Zahlen, Schritte
  app.js        Scan, Test, Drill-down, Übersicht (zählt aus codes.js),
                Kopfleiste, Menü, Laufband
  icons/        Zeichen: 7 Erzählungen, 7 Werkzeuge, 4 Wirkebenen
  fonts/        Archivo und JetBrains Mono (variabel, WOFF2, SIL OFL 1.1)
  img/          frühere Collagen, nicht mehr eingebunden (BILDER.md)
```

### Zeichen (Icons)

Alle Zeichen der Seite kommen aus einem System (Stand 21.11.2026).

- Dateien in `assets/icons/`: `<id>.svg` für die Kacheln (`geld`, `welt`,
  `bio`, `tier`, `schuld`, `israel`, `zeichen`), `werkzeug-<id>.svg` für
  die Werkzeuge (`anspielung`, `person`, `ersetzung`, `bild`, `zahl`,
  `zeichen`, `offen`) und `ebene-<name>.svg` für die vier Wirkebenen.
- Format: `viewBox="0 0 64 64"`, nur Linien mit `stroke="currentColor"`,
  `stroke-width="3"`, runden Enden und Ecken, kleine gefüllte Punkte
  erlaubt, etwa 4 bis 6 Einheiten Rand. Die Datei dient als Maske
  (Klasse `.ico` und `i-<name>` in `styles.css`), die Farbe kommt aus der
  Umgebung.
- Die Motive folgen dem Briefing und der Icon-Liste im Vault. Es sind
  Entwürfe von Claude, Dustyn kann jede Datei durch eine eigene mit
  demselben Namen ersetzen.
- Die alten Zeichen `alt-<id>.svg` zeigen selbst Codes (Münze, Marionette,
  Auge, Krake, Schlussstrich, Klammern). Sie sind nicht mehr eingebunden
  und liegen nur als Nachweis im Repo.

Lokal ansehen:

```bash
python3 -m http.server 8000
```

Dann `http://localhost:8000` öffnen. Alternativ per GitHub Pages
(Settings → Pages → Branch `main`, Ordner `/`).

**Barrierefreiheit & Robustheit:** Tastaturbedienbar mit sichtbarem Fokus
und Sprunglink, `prefers-reduced-motion` wird respektiert, Inhalte bleiben
ohne JavaScript sichtbar (die Navigation bleibt dann eine Zeile statt
Vollbild-Menü), kein horizontaler Scroll von 320 bis 2560 px.

## Datenbasis

Alle 73 Einträge stammen aus Fachpublikationen; die Zuordnung steht an jedem
Eintrag. Die sechs Einträge vom 07.11.2026 aus dem TikTok-Bericht der
Bildungsstätte Anne Frank haben jeweils eine zweite, unabhängige Quelle.
Seit dem 16.11.2026 stehen im Lexikon nur noch Codes, die eine Quelle auf
Social Media belegt. Die 50 herausgenommenen Einträge liegen mit Grund in
assets/codes-archiv-2026-11-16.js, die Seite lädt diese Datei nicht.
Die Codes-Übersicht zählt 72 Einträge, weil die Parole „From the river to
the sea“ in der Stufe „Kommt auf den Kontext an“ steht und nicht als Code
gilt. Form und Werkzeug je Eintrag folgen der Zuordnung vom 07.11.2026
(Entwurf, Frage 5 zu Kofferwörtern und Akronymen noch offen).

| Kürzel | Quelle |
|--------|--------|
| BfV | Bundesamt für Verfassungsschutz: *Versteckte Botschaften – Antisemitische Codes und Chiffren.* Köln, Mai 2026 |
| AAS | Amadeu Antonio Stiftung: *deconstruct antisemitism! Antisemitische Codes und Metaphern erkennen.* Berlin 2021 |
| REG | Regishut: *Antisemitismus erkennen. Symbole, Codes und Parolen.* Berlin 2023, ISBN 978-3-00-077634-2 |
| BPB | Bundeszentrale für politische Bildung: Dossier Antisemitismus, Glossar |
| BSAF | Schnabel, D. & Berendsen, E.: *Die TikTok-Intifada.* Bildungsstätte Anne Frank 2024 |
| DA | Becker, M. J. u. a. (Hrsg.): *Decoding antisemitism.* Palgrave Macmillan 2024 |
| BfV-L | Bundesamt für Verfassungsschutz: *Lagebild Antisemitismus 2022/23.* 2024 |
| RIAS | Bundesverband RIAS: report-antisemitism.de; *Antisemitische Vorfälle in Deutschland 2025.* 2026 |
| LOR | Lorenz, A.: *Von Hashtags und Geschichte.* Publizistik 70 (1), 2025 |
| EH | Ebbrecht-Hartmann, T.: *Memefizierter Antisemitismus.* CARS Working Papers 21, 2024 |
| SG | Salhi, M. & Goldhorn, Y.: Memefication of antisemitism. In Becker, Scheiber & Jensen (Hrsg.): *Imagery of hate online.* Open Book Publishers 2025, S. 107–152 |
| BSAF-R | Bildungsstätte Anne Frank: *Das TikTok-Universum der (extremen) Rechten.* 2024 |
| BSAF-G | Bildungsstätte Anne Frank: *Zwischen Gym und Weltverschwörung.* 2026 |
| BSAF-M | Bildungsstätte Anne Frank: *Der Holocaust als Meme.* 2025 |
| CB | Chapelan, A. & Bolton, M.: Affirmation of Nazis, Hitler and the Holocaust. In *Decoding antisemitism.* 2024, S. 353–367 |
| ADL | Anti-Defamation League: *Coded Hate.* 2025 |

## Grenzen

- Die Sammlung ist **keine Checkliste** und erhebt keinen Anspruch auf
  Vollständigkeit. Neue Codes entstehen laufend, alte verschwinden.
- Codes lassen sich **nie mechanisch entschlüsseln**. Entscheidend bleiben
  Gesamtzusammenhang, mediales und soziales Umfeld, Absender und Adressat.
- Einzelne Einträge sind **rechtlich relevant** (§ 86a StGB,
  Kennzeichenverbote). Die Angaben hier ersetzen keine juristische Prüfung.

## Hilfe

- **Hinweis an den Verfassungsschutz** — [verfassungsschutz.de](https://www.verfassungsschutz.de/DE/service/buerger-und-betroffene/hinweistelefon/hinweis-geben_node.html)
- **Antisemitischen Vorfall melden** — [report-antisemitism.de](https://report-antisemitism.de) (Bundesverband RIAS)
