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
| 01 | **Scan** | Konstruierter Beispieltext, Marker-Sweep, elf nummerierte Codes mit Einzelanalyse. |
| 02 | **Test** | Acht Aussagen, drei Antwortoptionen. Die dritte — *„Kommt auf den Kontext an“* — ist keine Ausrede, sondern oft die fachlich richtige Antwort. |
| 03 | **Codes** | Sieben Narrative als Zeichen, Drill-down zu 108 Einträgen. Davor der Hinweis, dass Antisemitismus ein Brückennarrativ ist. |
| 04 | **Mechanik** | Vier Hebel, dazu drei belegte Zahlen zur Verbreitung. |
| 05 | **Was tun** | Fünf Handlungsschritte als einrastendes Karussell. |
| 06 | **Melden** | BfV-Hinweistelefon und RIAS-Meldestelle. |

**Jede Aussage trägt eine Quellenangabe.**

## Gestaltung

Bildwelt nach Vorbild *Rights Against the Right*: helle Betonwand, dicke
schwarze Versalien, Rot als Marker, gerissene Papierkanten, viel Luft.

- **Farbe** — Wand `#E8E6E1`, Tinte `#141312`, Rot `#E1251B`. Ein Akzent, weil
  Markieren das Prinzip ist. Semantik (richtig / falsch / Graubereich) ist
  strikt davon getrennt.
- **Typografie** — Arial Black als Display, Mono für Codes und Labels.
  Chiffren gehören in Monospace. Sektionsnummern als Konturziffern.
- **Kein gleichförmiges Raster.** Jeder Abschnitt hat ab 62 rem eine eigene
  Anlage — Überlappungen, Ausbrüche, wechselnde Spaltenbreiten.
- **Gekritzel-Ebene** — handgezeichnete Marken über die Seite verteilt.
  Bewusst **kein** Dreieck-mit-Auge: das ist in diesem Lexikon ein
  antisemitischer Code, kein Ornament.
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

Die Collage liegt als Bild vor (`assets/img/hero.jpg`). Die Schrift darin
ist **nicht** Teil des Bildes: Ein gerissener Banner und ein Papierstreifen
liegen als HTML-Elemente darüber und decken die eingebrannte Schrift ab.
Titel und Unterzeile sind damit echter, markier- und durchsuchbarer Text.

Die Overlays sind prozentual auf das Originalbild bezogen — das Bild darf
deshalb **nicht** beschnitten werden (`object-fit: cover`), sonst verrutschen
sie. Unter 1024 px wird die Unterzeile aus dem Streifen ausgeblendet und
darunter in lesbarer Größe ausgegeben; unter 640 px wird das Bild über die
Viewportbreite hinaus vergrößert, damit die Schlagzeile Wirkung behält.

> **Offen:** Das Bild ist KI-generiert. Für die Bachelorarbeit ist das zu
> deklarieren. Außerdem enthält die Collage hebräische Schriftfetzen — die
> sollten von jemandem geprüft werden, der Hebräisch liest. Bildgeneratoren
> setzen hebräische Zeichen häufig zu sinnlosen Folgen zusammen, und auf
> einer Seite über Antisemitismus wäre das ein vermeidbarer Angriffspunkt.

## Technik

Statische Seite, keine Abhängigkeiten, kein Build.

```
index.html
assets/
  styles.css    Design-Tokens und Layout
  codes.js      Datenbasis: 108 Codes, 7 Narrative, Quiz, Beispieltext
  app.js        Scan, Test, Drill-down, Karussell, Fries, Gekritzel
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

**Barrierefreiheit & Robustheit:** Tastaturbedienbar mit sichtbarem Fokus,
`prefers-reduced-motion` wird respektiert, Inhalte bleiben ohne JavaScript
sichtbar, kein horizontaler Scroll bis 375 px.

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
