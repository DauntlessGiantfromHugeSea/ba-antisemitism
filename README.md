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
| – | **Kopf** | Schlagzeile, dann ein Laufband mit 47 gestrichenen Codes und ihrer Kurzbedeutung und die Codes-Übersicht aus sechs Formen und sechs Werkzeugen mit allen Einträgen als antippbare, gestrichene Wörter. |
| 01 | **Scan** | Vier konstruierte Posts im Karussell, je mit Marker-Sweep — zusammen 19 nummerierte Codes mit Sprechblase und Gegenrede. |
| 02 | **Test** | Acht Aussagen, drei Antwortoptionen. Die dritte — *„Kommt auf den Kontext an“* — ist keine Ausrede, sondern oft die fachlich richtige Antwort. |
| 03 | **Codes** | Sieben Kacheln (sechs Erzählungen, ein Werkzeugfeld) mit rot gestrichenem Zeichen und einem Satz dazu. Eine Kachel öffnet ihre Codes als Karten, Antippen klappt Bedeutung und Quelle auf (114 Einträge). Davor der Hinweis, dass Antisemitismus ein Brückennarrativ ist. |
| 04 | **Werkzeuge** | Sechs Werkzeuge der Umwegkommunikation, jedes mit gestrichenen Beispielen samt Bedeutung, dann die vier Wirkebenen als Grafik, danach drei belegte Zahlen zur Verbreitung auf rotem Band. |
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
seinen alten Stil zurück, und die Kachel-Zeichen wurden zu Dateien.

- **Palette** als CSS-Variablen: Papier `#F3EFE7`, Fläche `#E7E1D6`,
  Schrift `#26241F`, Schrift 2 `#5C5850`, Linie `#A9A398`, dazu Signalrot
  `#E1251B` für Flächen, Striche und große Schrift und `#B5140B` für kleine
  rote Schrift auf Hell. Rote Flächen: Hauptknöpfe, Abschnittsnummern,
  Zahlenband, Melden, aktive Kachel. Dunkle Flächen: Laufband und Fuß.
  Alle Kontraste stehen im Kommentar bei den Farbvariablen in
  `assets/styles.css`. Die Urteilsfarben im Test (grün, grau, rot) bleiben,
  weil sie dort Bedeutung tragen.
- **Typografie:** Archivo (variabel) kondensiert und extrafett für
  Überschriften, normal für Fließtext, JetBrains Mono für Labels und Quellen.
- **Der Strich:** Jeder Code steht rot gestrichen und nie ohne Bedeutung.
  Laufband, Kacheln und Werkzeug-Beispiele nehmen die Kurzbedeutung aus
  `KURZ` in `codes.js`, wörtlich aus dem Erklärtext des Eintrags. Im
  Laufband ist der Strich ein schräger roter Balken wie im alten Stand, die
  Bedeutung steht klein darunter. In der Übersicht öffnet jeder gestrichene
  Eintrag seine Karte im Lexikon aufgeklappt. Offen stehen Codes nur im
  Test und in den Posts vor dem Scan.
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
  codes.js      Datenbasis: 114 Einträge mit Form (f) und Werkzeug (w),
                Formen, Werkzeuge, Kurzbedeutungen (KURZ), 7 Kacheln,
                Posts, Quiz, FAQ, Wirkebenen, Zahlen, Schritte
  app.js        Scan, Test, Drill-down, Übersicht (zählt aus codes.js),
                Kopfleiste, Menü, Laufband
  icons/        Zeichen der Kacheln, eine SVG-Datei je Kachel
  fonts/        Archivo und JetBrains Mono (variabel, WOFF2, SIL OFL 1.1)
  img/          frühere Collagen, nicht mehr eingebunden (BILDER.md)
```

### Eigene Zeichen für die Kacheln

Jede Kachel kann ein Zeichen als SVG-Datei bekommen.

- Datei: `assets/icons/<id>.svg`, wobei `<id>` die id der Kachel in
  `CATEGORIES` ist: `geld`, `welt`, `bio`, `tier`, `schuld`, `israel`,
  `zeichen`.
- Format: SVG mit `viewBox="0 0 64 64"`, Linien oder Flächen in einer
  beliebigen deckenden Farbe (zum Beispiel Schwarz), Hintergrund
  transparent. Die Datei dient als Maske, die Seite färbt das Zeichen in
  der Schriftfarbe der Kachel, auf der aktiven roten Kachel also weiß.
- Einschalten: in `codes.js` bei der Kachel `icon: "<id>.svg"` setzen.
  `icon: null` heißt Kachel ohne Zeichen, dann fragt die Seite keine Datei
  an. Im Moment hat `israel` kein Zeichen.
- Zeigt das neue Zeichen keinen Code, bei der Kachel das Feld `sign`
  löschen. Dann entfallen der rote Strich über dem Zeichen und der Satz
  darunter.

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

Alle 114 Einträge stammen aus Fachpublikationen; die Zuordnung steht an jedem
Eintrag. Die sechs Einträge vom 07.11.2026 aus dem TikTok-Bericht der
Bildungsstätte Anne Frank haben jeweils eine zweite, unabhängige Quelle.
Die Codes-Übersicht zählt 113 Einträge, weil die Parole „From the river to
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
