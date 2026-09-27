# ZEICHEN LESEN

> Hass sagt nicht mehr, wie er heißt.

Interaktiver Decoder für antisemitische Codes und Chiffren.
Gestalterischer Kampagnenprototyp im Rahmen einer **Bachelorarbeit Mediendesign**.

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
| 01 | **Scan** | Vier konstruierte Posts im Karussell, je mit Marker-Sweep — zusammen 19 nummerierte Codes mit Sprechblase und Gegenrede. |
| 02 | **Test** | Acht Aussagen, drei Antwortoptionen. Die dritte — *„Kommt auf den Kontext an“* — ist keine Ausrede, sondern oft die fachlich richtige Antwort. |
| 03 | **Codes** | Sieben Narrative als Zeichen, Drill-down zu 108 Einträgen. Davor der Hinweis, dass Antisemitismus ein Brückennarrativ ist. |
| 04 | **Mechanik** | Vier Hebel, danach ein rotes Band mit drei belegten Zahlen zur Verbreitung. |
| 05 | **Fragen** | Sechs typische Einwände mit Antwort aus der Fachliteratur. |
| 06 | **Was tun** | Fünf Handlungsschritte als einrastendes Karussell. |
| 07 | **Melden** | BfV-Hinweistelefon und RIAS-Meldestelle. |

**Jede Aussage trägt eine Quellenangabe.**

## Gestaltung

Nach Vorbild *Rights Against the Right*: großflächige, kondensierte
Versalien, harte Farbflächen, Rot als Signal. Klare Linien statt
Collage-Papier — die Collagen stehen nur noch als Vollbild-Bänder.

Alle Designentscheidungen mit Begründung, verworfenen Alternativen und
Kontrastwerten: [`docs/designentscheidungen.md`](docs/designentscheidungen.md).

- **Farbe** — Papier `#F1F0EC`, Tinte `#0E0E0D`, Rot `#E1251B`. Die Abschnitte
  wechseln als ganze Flächen: hell, schwarz (Test, Fragen, Fuß), rot (Zahlen,
  Melden). Für kleine Schrift gibt es dunklere bzw. hellere Rotstufen, damit
  der Kontrast AA erreicht. Semantik (richtig / falsch / Graubereich) ist
  strikt vom Akzent getrennt.
- **Typografie** — Archivo (variabel) in 66 % Breite und Stärke 900 als
  Display, Archivo normal als Fließtext, JetBrains Mono für Codes, Labels und
  Quellen. Die Hero-Zeile und das Fuß-Motto sind so bemessen, dass sie die
  Spaltenbreite füllen (geprüft von 320 bis 2560 px).
- **Ein Kopfmuster für alle Abschnitte** — Linie, rote Nummer, riesige
  Überschrift links, Unterzeile rechts unten.
- **Bewegung** — Headline fährt zeilenweise ein, Zahl zählt hoch, Laufband
  mit rot durchgestrichenen Codes, Buttons mit Wisch-Füllung, Lesefortschritt
  im Kopf. Alles respektiert `prefers-reduced-motion`.
- **Wortmarke durchgestrichen** — Codes werden gestrichen. Bewusst **kein**
  Dreieck-mit-Auge als Ornament: das ist in diesem Lexikon ein
  antisemitischer Code.
- **Kein antisemitisches Bildmaterial.** Ausschließlich Markierung und
  Annotation.

### Abgrenzung zum Rechtsextremismus

Die Sammlung enthält **nur antisemitische** Codes. Rein rechtsextreme
Erkennungszeichen ohne Antisemitismusbezug (Zahlencodes wie 88 oder 18,
„14 Words“, das Hakenkreuz) wurden bewusst entfernt — sonst verwischt der
Gegenstand. Antisemitismus ist zudem kein Randphänomen des rechten Spektrums,
sondern ein Brückennarrativ über Milieus hinweg; darauf weist die Seite
ausdrücklich hin (BfV S. 15–17).

## Hero-Bild

Der Kopf ist rein typografisch: Die Schlagzeile *„Hass sagt nicht mehr, wie
er heißt.“* ist das `h1`. Darunter steht die Collage (`assets/img/hero.jpg`)
als Vollbild-Band. Ihre eingebrannte Schrift wird von einem schwarzen Balken
und einem hellen Streifen als HTML-Elemente abgedeckt — „Antisemitismus“ und
die Unterzeile sind damit echter Text.

Die Balken sind prozentual auf das Originalbild bezogen — das Bild darf
deshalb **nicht** beschnitten werden (`object-fit: cover`), sonst verrutschen
sie. Unter 1024 px entfällt der Streifen, der Balken wird verlängert und die
Unterzeile steht lesbar unter dem Bild. Dasselbe Prinzip gilt für die
Propaganda-Collage im Abschnitt Mechanik.

> **Offen:** Das Bild ist KI-generiert. Für die Bachelorarbeit ist das zu
> deklarieren. Außerdem enthält die Collage hebräische Schriftfetzen — die
> sollten von jemandem geprüft werden, der Hebräisch liest. Bildgeneratoren
> setzen hebräische Zeichen häufig zu sinnlosen Folgen zusammen, und auf
> einer Seite über Antisemitismus wäre das ein vermeidbarer Angriffspunkt.

## Technik

Statische Seite, keine Abhängigkeiten, kein Build. Die Schriften liegen
lokal im Repo — es werden keine externen Dienste (z. B. Google Fonts)
angefragt.

```
index.html
assets/
  styles.css    Design-Tokens und Layout
  codes.js      Datenbasis: 108 Codes, 7 Narrative, Posts, Quiz, FAQ,
                Mechanik, Zahlen, Handlungsschritte
  app.js        Scan, Test, Drill-down, Karussell, Kopfleiste, Menü, Laufband
  fonts/        Archivo und JetBrains Mono (variabel, WOFF2, SIL OFL 1.1)
  img/
    hero.jpg / hero-small.jpg        Collage für den Kopf
    propaganda.jpg / -small.jpg      Collage für „Mechanik“
    schreier.jpg                     Illustration für „Was tun“
```

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

Alle 108 Einträge stammen aus Fachpublikationen; die Zuordnung steht an jedem
Eintrag.

| Kürzel | Quelle |
|--------|--------|
| BfV | Bundesamt für Verfassungsschutz: *Versteckte Botschaften – Antisemitische Codes und Chiffren.* Köln, Mai 2026 |
| AAS | Amadeu Antonio Stiftung: *deconstruct antisemitism! Antisemitische Codes und Metaphern erkennen.* Berlin 2021 |
| REG | Regishut: *Antisemitismus erkennen. Symbole, Codes und Parolen.* Berlin 2023, ISBN 978-3-00-077634-2 |
| BPB | Bundeszentrale für politische Bildung: Dossier Antisemitismus, Glossar |

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
