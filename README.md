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
| 02 | **Test** | Acht Aussagen, drei Antwortoptionen (unproblematisch / kommt auf den Kontext an / Code). Jede Auflösung nennt ihre Quelle. |
| 03 | **Codes** | Sieben Narrative als Zeichen, Drill-down zu 108 Einträgen. Davor der Hinweis, dass Antisemitismus ein Brückennarrativ ist. |
| 04 | **Mechanik** | Vier Hebel, danach drei belegte Zahlen zur Verbreitung. |
| 05 | **Fragen** | Sechs typische Einwände mit Antwort aus der Fachliteratur. |
| 06 | **Was tun** | Fünf Handlungsschritte als einrastendes Karussell. |
| 07 | **Melden** | BfV-Hinweistelefon und RIAS-Meldestelle. |

**Jede inhaltliche Aussage trägt eine Quellenangabe.** Aussagen ohne Beleg
wurden entfernt; übrig bleiben nur Bedienhinweise und Selbstauskünfte der
Seite (konstruierte Beispiele, Studienprojekt, keine Rechtsberatung).

## Gestaltung

Nach Vorbild *Rights Against the Right*, bewusst reduziert: großflächige,
kondensierte Versalien, Hell und Schwarz als Flächen, Rot als Signal.
Klare Linien statt Collage-Papier. Die Begründungen stehen ausführlich in
[`docs/designentscheidungen.md`](docs/designentscheidungen.md).

- **Farbe** — Papier `#F1F0EC`, Tinte `#0E0E0D`, Rot `#E1251B`. Fast alles
  steht auf Hell; schwarz sind nur Test und Fuß, rot als Fläche nur
  „Melden“ — Rot heißt: markieren oder handeln. Für kleine Schrift gibt es dunklere bzw. hellere Rotstufen, damit
  der Kontrast AA erreicht. Semantik (richtig / falsch / Graubereich) ist
  strikt vom Akzent getrennt.
- **Typografie** — Archivo (variabel) in 66 % Breite und Stärke 900 als
  Display, Archivo normal als Fließtext, JetBrains Mono für Codes, Labels und
  Quellen. Die Hero-Zeile und das Fuß-Motto sind so bemessen, dass sie die
  Spaltenbreite füllen (geprüft von 320 bis 2560 px).
- **Kopf** — nur die These, ein kurzer Absatz mit Quelle und ein Knopf
  („Los geht’s“), der zum ersten Abschnitt führt.
- **Ein Kopfmuster für alle Abschnitte** — Linie, rote Nummer, riesige
  Überschrift links, Unterzeile rechts unten.
- **Bewegung** — nur die Headline fährt zeilenweise ein, Abschnitte blenden
  dezent ein, die Scan-Linie läuft über die Posts. Alles respektiert
  `prefers-reduced-motion`.
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
er heißt.“* ist das `h1`. Die Kopf-Collage (`assets/img/hero.jpg`) ist
**derzeit nicht eingebunden** — damit ist auch die ungeprüfte hebräische
Schrift darin nicht mehr auf der Seite. Die Datei liegt weiter im Repo.

Eingebunden bleibt die Propaganda-Collage im Abschnitt Mechanik. Ihre
eingebrannte Schrift wird von Balken als HTML-Elementen abgedeckt. Die Balken
sind prozentual auf das Originalbild bezogen — das Bild darf deshalb
**nicht** beschnitten werden (`object-fit: cover`), sonst verrutschen sie.

> **Offen:** Die Collagen sind KI-generiert. Für die Bachelorarbeit ist das
> zu deklarieren. Falls die Kopf-Collage wieder eingebunden wird, sollten
> ihre hebräischen Schriftfetzen vorher von jemandem geprüft werden, der
> Hebräisch liest.

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
  app.js        Scan, Test, Drill-down, Karussell, Kopfleiste, Menü
  fonts/        Archivo und JetBrains Mono (variabel, WOFF2, SIL OFL 1.1)
  img/
    hero.jpg / hero-small.jpg        Collage für den Kopf (derzeit nicht eingebunden)
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
