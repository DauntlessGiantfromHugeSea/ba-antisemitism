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
| 01 | **Scan** | Ein konstruierter Beispieltext wird per Marker-Sweep analysiert. Elf Codes werden nummeriert markiert, jeder mit eigener Analyse. |
| 02 | **Test** | Acht Aussagen, drei Antwortoptionen. Die dritte — *„Kommt auf den Kontext an“* — ist keine Ausrede, sondern bei diesem Thema oft die fachlich richtige Antwort. |
| 03 | **Codes** | Sieben Narrative, je ein Zeichen. Antippen öffnet die zugehörigen Codes mit Erklärung und Quellenangabe. |
| 04 | **Melden** | Weiterleitung an BfV-Hinweistelefon und RIAS-Meldestelle. |

## Gestaltung

- **Farbe** — Schwarz, Weiß, Textmarker-Gelb `#F2FF00`. Ein einziger Akzent,
  weil Markieren das ganze Prinzip ist. Semantik (richtig / falsch /
  Graubereich) ist strikt davon getrennt.
- **Typografie** — Arial Black als Display, Mono für Codes und Labels.
  Chiffren gehören in Monospace.
- **Bewusst einheitliche Bildwelt.** Kein Light-Mode: Eine Kampagne wechselt
  nicht das Gesicht.
- **Kein antisemitisches Bildmaterial.** Ausschließlich Markierung und
  Annotation.

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
  codes.js      Datenbasis: 111 Codes, 7 Narrative, Quiz, Beispieltext
  app.js        Scan, Test, Drill-down, Ticker, Scroll-Reveal
  img/
    hero.jpg        Collage, 1672 × 941
    hero-small.jpg  Variante für schmale Schirme
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

Alle 111 Einträge stammen aus Fachpublikationen; die Zuordnung steht an jedem
Eintrag.

| Kürzel | Quelle |
|--------|--------|
| BfV | Bundesamt für Verfassungsschutz: *Versteckte Botschaften – Antisemitische Codes und Chiffren.* Köln, Mai 2026 |
| AAS | Amadeu Antonio Stiftung: *deconstruct antisemitism! Antisemitische Codes und Metaphern erkennen.* Berlin 2021 |
| REG | Regishut: *Antisemitismus erkennen. Symbole, Codes und Parolen.* Berlin 2023, ISBN 978-3-00-077634-2 |
| BPB | Bundeszentrale für politische Bildung: Dossier Antisemitismus, Glossar |
| BIGE | Bayerische Informationsstelle gegen Extremismus: Zeichen und Symbole des Rechtsextremismus |

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
