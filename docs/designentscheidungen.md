# Designentscheidungen: „Zeichen lesen“

Stand: 27.09.2026, Commit `16db149` und dieses Dokument.
Für jede Entscheidung steht, **was** entschieden wurde, **warum**, welche
**Alternative verworfen** wurde und was das für Barrierefreiheit und Technik
bedeutet.

**Wer hat was entschieden?** Das Dokument trennt zwei Arten von Entscheidungen:

- **Gestalterische Umsetzung** (Abschnitt 3): Schrift, Farbe, Layout,
  Navigation, Bewegung. Die Begründungen stammen aus der Umsetzung selbst.
- **Inhaltliche Vorgaben** (Abschnitte 4 und 5): aus einer weiteren
  Arbeitssitzung (Patch `8c90c3c`) und aus der Textliste vom 27.09.2026.
  Hier steht nur die Begründung, die in Patch oder Vorgabe **selbst
  genannt** ist. Wo keine genannt ist, steht das ausdrücklich da. Es wird
  keine Begründung nachträglich ergänzt.

---

## 0. Verlauf

| Schritt | Commit | Inhalt | Status |
|---|---|---|---|
| Ausgangsstand | `376a8f4` | Collage- und Zine-Ästhetik | ersetzt |
| Redesign | `83c339b` | Typografie und Farbflächen statt Collage-Papier | **online** (in `main` über #1) |
| Reduzierte Fassung | `7275eb9` | Kopf-Collage, Laufband und Bewegung entfernt, unbelegte Aussagen gestrichen | **verworfen**, durch den Patch ersetzt (siehe unten) |
| Patch aus weiterer Sitzung | `f3cd8f9` | Bildnotizen, sechs Werkzeuge, sechs Erzählungen | **online** (in `main` über #2) |
| Textrunde | `16db149` | Texte für Jugendliche, Vorstudie benannt, KI-Bilder deklariert, vierte Bildnotiz, vier Stilmittel | auf Branch, noch nicht in `main` |

Die reduzierte Fassung (`7275eb9`) wurde nicht weitergeführt: Auf Wunsch
wurde stattdessen der Stand aus einer weiteren Sitzung übernommen, der auf dem
Redesign aufbaut. Ihre Änderungen und die erste Fassung dieses Dokuments
bleiben in der Versionsgeschichte erhalten.

---

## 1. Vorgehen und Grenzen

**Referenz nicht abgeglichen.** Die Seite rightsagainsttheright.com war in der
Arbeitsumgebung nicht abrufbar (Netzwerksperre). Das Redesign stützt sich auf
die bekannten Merkmale der Kampagne *Rights Against the Right* (Laut gegen
Nazis / Jung von Matt) und auf allgemeine Gestaltungsprinzipien, nicht auf
einen direkten Vergleich.

**Prüfverfahren:** Jede Änderung wurde im Browser (Chromium) gerendert und
gemessen:

- Überlauf bei Breiten von 320 bis 2560 px
- Konsolenfehler
- alle Interaktionen
- Verhalten ohne JavaScript und mit reduzierter Bewegung

Kontrastwerte sind nach WCAG 2.1 berechnet.

**Seitenzahlen nicht geprüft.** Die Quellenangaben (Kapitel, Seiten) stammen
aus der Datenbasis und aus den Vorgaben. Mit den Publikationen selbst wurden
sie in der Arbeitsumgebung nicht abgeglichen.

---

## 2. Ausgangslage vor dem Redesign

Die erste Fassung folgte einer **Collage- bzw. Zine-Ästhetik**:

- helle „Betonwand“ mit Korn-Overlay
- gerissene Papierkanten
- gedrehte Blätter mit Klebestreifen
- Kritzel-Marken
- ein Fries aus Narrativ-Zeichen
- ein handgezeichneter Ring um die Code-Zahl
- ein eigenes Layout für jeden Abschnitt

| Problem | Beleg |
|---|---|
| Anmutung handgemacht-nostalgisch, nicht zeitgemäß | Anlass des Auftrags („moderner gestalten“) |
| Viele Ornamente konkurrierten mit dem Prinzip *Markieren* | Kritzel, Fries, Ring, Klebeband, Korn |
| Gerissene Kanten schnitten wiederholt Inhalte an | Commit-Historie: „Risskante schnitt Inhalt ab“, „Gekritzel-Marken werden nicht mehr angeschnitten“ |
| „Sieben Erzählungen“ ab ca. 1280 px rechts abgeschnitten | Messung: Wort 631 px breit, Kasten 544 px |
| Display-Schrift Arial Black ist eine Systemschrift | auf vielen Android- und Linux-Geräten nicht installiert |
| Rote 11-px-Labels auf der Wandfarbe: **3,76 : 1** | unter WCAG-AA (4,5 : 1) |
| `.sr-only` benutzt, aber nie definiert | Bildbeschreibung nicht korrekt versteckt |

---

## 3. Gestalterische Umsetzung (Redesign)

### 3.1 Leitidee

> **Vom Plakat an der Wand zur Kampagnenfläche.**

Das Grundprinzip der Seite bleibt: **Mechanismen entlarven, nicht Codes
feiern. Nichts wird nachgebaut, alles wird markiert.** Die Gestaltung
übernehmen Typografie und Farbflächen. Rot ist das einzige Signal.

### 3.2 Schrift: Archivo (variabel) statt Arial Black

**Entscheidung:** Headlines in Archivo mit 66 % Breite und Stärke 900
(kondensiert, extrafett). Fließtext in derselben Schrift mit normaler Breite.
Codes, Labels und Quellen in JetBrains Mono.

**Begründung:**

- **Kondensierte, extrafette Groteske** erlaubt sehr große Schriftgrade bei
  vielen Zeichen pro Zeile. Nur so passt „WIE ER HEISST.“ auch auf dem Handy
  als eine Zeile über die volle Breite. Die Form ist aus Protest- und
  Kampagnenplakaten vertraut.
- **Variable Schrift:** Eine Datei (90 KB) deckt über Breiten- und
  Gewichtsachse Headlines *und* Fließtext ab.
- **Plattformunabhängig:** Die Schrift wird mitgeliefert und sieht überall
  gleich aus.
- **Monospace für Chiffren und Quellen** stammt aus der ersten Fassung: Codes
  und Belege bilden eine eigene, „technische“ Ebene.

**Verworfen:**

- **Google Fonts.** Beim Laden würde die IP-Adresse jeder besuchenden Person
  an Google übertragen. Eine Seite, die zum Melden ermutigt, soll keine Daten
  an Dritte weitergeben.
- **Anton oder Bebas Neue.** Nur ein Schnitt, nicht für Fließtext geeignet.
- **Arial Black beibehalten.** Nicht überall installiert und zu breit für
  randfüllende Zeilen.

**Technik:** `assets/fonts/` enthält die WOFF2-Dateien (ca. 130 KB) und die
Lizenztexte (SIL Open Font License 1.1). Die Display-Schrift wird per
`preload` früh geladen, `font-display: swap` verhindert unsichtbaren Text.

### 3.3 Schriftgrößen werden berechnet, nicht geschätzt

**Entscheidung:** Hero-Zeile, Abschnittsüberschriften und Fuß-Motto skalieren
mit der Fensterbreite. Sie sind so bemessen, dass die **längste Zeile die
Spalte gerade füllt**.

**Begründung:** Randfüllende Schrift wirkt nur, wenn sie nie überläuft. Die
Breite der längsten Zeile wurde in `em` gemessen („WIE ER HEISST.“ ≈ 5,5 em,
„ERZÄHLUNGEN.“ ≈ 6 em), daraus ergibt sich die Formel. Im zweispaltigen
Abschnittskopf ist das zum Beispiel `calc(15.3vw − 4.5rem)`.

**Geprüft:** 320, 375, 390, 768, 1024, 1280, 1440, 1920 und 2560 px, jeweils
ohne Überlauf. Damit ist auch „Sieben Erzählungen“ behoben (heute
„Sechs Erzählungen“, siehe 4.2).

**Nebenentscheidung:** Die Zeilenhöhe der Abschnittsüberschriften liegt bei
0,92 statt 0,86, weil sonst die Umlautpunkte an die Zeile darüber stießen.

### 3.4 Farbe: Flächen statt Akzente

**Entscheidung:** Drei Farben:

| Rolle | Wert | vorher |
|---|---|---|
| Papier | `#F1F0EC` | Wand `#E8E6E1` |
| Tinte | `#0E0E0D` | `#141312` |
| Rot | `#E1251B` | unverändert |

Die Abschnitte wechseln als **ganze Flächen**:

| Fläche | Abschnitte | Warum |
|---|---|---|
| hell | Kopf, Scan, Codes, Werkzeuge, Was tun | Lese- und Erkundungsbereiche |
| schwarz | Test, Fragen, Fuß | Konzentration: prüfen, Einwände, Abschluss |
| rot | Zahlenband, Melden | dort, wo **Evidenz** und **Handlung** stehen |

**Begründung:**

- **Orientierung:** Der Farbwechsel gliedert die lange Seite in Kapitel,
  ohne dass jeder Abschnitt ein eigenes Layout braucht (siehe 3.7).
- **Rot als Signal:** Als Markierung steht Rot bei Codes, Streichungen und
  Nummern. Als Fläche steht es nur zweimal, bei den Zahlen zur Verbreitung
  und beim Melden.
- **Helleres Papier:** Die alte Wandfarbe war auf die Beton-Anmutung
  ausgelegt. Das neue Papier ist sauberer und verbessert die Kontraste.

**Rotstufen für Kontrast:** Ein Rotton allein reicht nicht für alle
Schriftgrößen.

| Einsatz | Farbe | Kontrast | WCAG |
|---|---|---|---|
| große Schrift und Flächen auf Papier | `#E1251B` | 4,11 : 1 | AA für große Schrift (≥ 3 : 1) |
| kleine Schrift auf Papier | `#C4180E` | 5,29 : 1 | AA |
| kleine Schrift auf Schwarz | `#FF5145` | 5,99 : 1 | AA |
| weiße Schrift auf Rot | Weiß auf `#E1251B` | 4,69 : 1 | AA |
| aktive Narrativ-Kachel | Weiß auf `#B3170E` | 6,90 : 1 | AA |

**Semantik bleibt getrennt:** Richtig (Grün `#17703F`, 6,13 : 1), falsch
(`#C21A10`, 6,09 : 1), Graubereich (Grau). Die Bewertung steht nie nur in
Farbe, sondern immer auch als Text („Richtig“ / „Nicht ganz“).

### 3.5 Collage-Ebene entfernt, Collagen behalten

**Entscheidung:** Entfernt wurden gerissene Kanten, Klebestreifen, gedrehte
Blätter, Kritzel-Ebene, Fries, handgezeichneter Ring und Korn-Overlay.
**Die drei Bilder bleiben:**

- Kopf-Collage und Propaganda-Collage als gerade geschnittene Vollbild-Bänder
- die Illustration bei „Was tun“

**Begründung:**

- **Ein Markierungsprinzip statt vieler.** Wenn Kritzel, Ring und Klebeband
  ebenfalls „markieren“, verliert die Markierung der Codes an Gewicht. Jetzt
  gibt es nur noch rote Fläche und roten Strich.
- **Robustheit.** Gerissene Kanten per `clip-path` schnitten laut
  Commit-Historie mehrfach Inhalte ab. Gerade Kanten können das nicht.
- **Performance.** Das Korn-Overlay lag als fixierte Ebene über der ganzen
  Seite.

**Bewusst beibehalten:** die **durchgestrichene Wortmarke**. Streichen ist
Markieren und damit Konzept, kein Ornament.

**Balken über den Collagen:** Sie decken die eingebrannte Schrift ab und sind
gerade statt gerissen. Dadurch lesen sie sich wie Schwärzungs- oder
Markierbalken. Die Balken sind prozentual auf das Originalbild bezogen, das
Bild darf deshalb nicht beschnitten werden.

### 3.6 Kopfbereich: die These zuerst

**Entscheidung:** Das `h1` ist der Claim *„Hass sagt nicht mehr, wie er
heißt.“* über die volle Breite, die letzte Zeile in Rot. Darunter stehen der
Absatz mit den markierten Beispiel-Codes, die Zahl 108 und zwei Einstiege
(„Test starten“, „Codes ansehen“). Danach folgt die Kopf-Collage als
Vollbild-Band.

**Begründung:**

- **Die stärkste Aussage gehört nach oben.** In der ersten Fassung lautete
  das `h1` „Antisemitismus“ und benannte damit nur das Thema, nicht die
  These. Screenreader und Suchmaschinen erhalten jetzt die Kernaussage.
- **Die letzte Zeile in Rot** markiert die Pointe.
- **Das Bild als eigenes Band**, weil Text über der unruhigen Collage
  schlecht lesbar wäre.

### 3.7 Ein Kopfmuster für alle Abschnitte

**Entscheidung:** Jeder Abschnitt beginnt gleich:

- durchgehende Linie
- rote Nummer mit Titel
- große Überschrift links
- Unterzeile rechts unten

**Begründung:** Die Seite ist lang, und ein festes Muster zeigt, wo man ist
(„04 von 07“). Die Variation kommt aus den Farbflächen (3.4), nicht aus
wechselnden Layouts.

**Verworfen:** Den bisherigen „Rhythmusbruch“ (jeder Abschnitt anders)
beizubehalten. Er erzeugte Überlappungen und war die Ursache der
abgeschnittenen Überschrift.

### 3.8 Laufband

**Entscheidung:** Unter dem Kopf läuft ein großes Band mit allen 108 Code-
Begriffen. Jeder Begriff ist rot durchgestrichen.

**Begründung:**

- Es macht die **Menge** der Codes fühlbar.
- **Streichen statt Zeigen:** Die Codes erscheinen nie „neutral“, sondern
  immer schon entwertet.
- Es wiederholt das Streich-Motiv der Wortmarke.

**Barrierefreiheit:** Das Band ist für Screenreader ausgeblendet
(`aria-hidden`), weil die Codes erläutert im Abschnitt 03 stehen. Bei
Mauskontakt hält es an, bei reduzierter Bewegung steht es still.

**Abgewogenes Risiko:** Großgesetzte Codes ohne Erklärung könnten als
Reproduktion statt als Entwertung gelesen werden. Die reduzierte Fassung
(`7275eb9`) hatte das Band deshalb entfernt. Im aktuellen Stand ist es wieder
enthalten. Ein Nutzertest sollte das klären (Abschnitt 8).

### 3.9 Navigation

**Entscheidung:**

- Die Kopfleiste bleibt beim Scrollen sichtbar.
- Ein roter Balken zeigt den Lesefortschritt.
- Der aktuelle Abschnitt ist in der Navigation unterstrichen.
- Ein Knopf „Test starten“ sitzt in der Kopfleiste.
- Auf schmalen Schirmen öffnet ein Menü-Knopf eine Vollbild-Ebene.
- Neu ist ein Sprunglink „Zum Inhalt springen“.

**Begründung:** Bei sieben Abschnitten braucht es jederzeit einen Weg zurück
und nach vorn. Die alte Navigation brach auf dem Handy in mehrere Zeilen um.

**Robustheit:** Ohne JavaScript bleibt die Navigation eine horizontal
scrollbare Zeile.

**Technisches Detail:** Auf schmalen Schirmen verzichtet die Kopfleiste auf
den Unschärfe-Effekt. Er macht den Header zum Bezugsrahmen für
`position: fixed`, sodass die Vollbild-Ebene sonst im 60 px hohen Header
eingesperrt war. Das fiel im Test auf und ist behoben.

### 3.10 Bewegung

| Bewegung | Funktion |
|---|---|
| Headline fährt zeilenweise ein | Die These baut sich auf. |
| Zahl 108 zählt hoch | Die Menge wird als Wachstum erlebt. |
| Laufband | siehe 3.8 |
| Abschnitte blenden beim Scrollen ein | führt den Blick |
| Buttons füllen sich per Wisch | zeigt, was anklickbar ist |
| Scan-Linie über den Posts | Kernmetapher „scannen“, aus der ersten Fassung |

**Regeln:**

- Alles entfällt bei `prefers-reduced-motion`.
- Headline und Zahl warten, bis das Startfenster geschlossen ist. Vorher
  liefen sie ungesehen hinter dem Dialog ab.
- Ohne JavaScript steht die Zahl fest im HTML.

### 3.11 Komponenten

| Komponente | Umsetzung | Begründung |
|---|---|---|
| **Posts (Scan)** | dunkle Karten, große kondensierte Schrift | Klare Kante, mehr Text pro Zeile. Die Marker gleichen ihren Innenabstand mit einem Minusrand aus, dadurch gibt es vor dem Scan keine doppelten Leerräume. |
| **Test** | weiße Karte auf Schwarz, Antworten als volle Zeilen | Große Klickflächen, die Antwort liest sich wie eine Aussage. |
| **Narrativ-Kacheln** | Zahl oben, Zeichen Mitte, Name unten; sieben Spalten erst ab 1280 px | Lesereihenfolge „wie viele, welches Bild, welches Narrativ“. Weiche Trennstellen in „Welt·verschwörung“ und „Ent·menschlichung“ verhindern Überlauf. |
| **Brückennarrativ-Hinweis** | zweispaltig, große Überschrift „Nicht nur rechts.“ | Inhaltlich zentral und belegt (BfV S. 15–17). |
| **Zahlenband** | rote Fläche, Zahlen bis ca. 8 rem | Evidenz als eigener Moment. „Links wie rechts“ ist kleiner gesetzt, damit das Wort auf Höhe der Zahlen bleibt. |
| **Fragen** | große Aufklappzeilen auf Schwarz, runder Plus-Knopf | Der runde Knopf ist eine gelernte Geste für „aufklappen“. |
| **Was tun** | Karten mit Rahmen, aktive Karte schwarz | Im Karussell ist sofort sichtbar, welcher Schritt dran ist. |
| **Melden** | rote Fläche, zwei große Linkzeilen (BfV / RIAS) mit ↗ | Der Handlungsaufruf bekommt die stärkste Fläche. Der Pfeil ↗ zeigt: externe Seite. |
| **Vier Stilmittel im Bild** (27.09.) | kleinere Fassung der Werkzeug-Karten, vier Spalten ab 62 rem, zwei ab 40 rem, eine am Handy | Nach Vorgabe (5.2). Die Karten nutzen die vorhandenen Stile der Werkzeug-Karten, damit keine neue Formensprache entsteht. Die Zwischenstufe mit zwei Spalten verhindert zu schmale Karten auf Tablets. |
| **Bildnotizen** | Mono-Label „Im Bild markiert“, rote Randlinie, Quelle | aus dem Patch (4.1); die dritte Notiz bei „Was tun“ nach Vorgabe (5.2) |

### 3.12 Barrierefreiheit

- **Kontraste:** Alle kleinen Schriften erreichen mindestens AA (Tabelle in
  3.4). Fließtext liegt bei 16,94 : 1, gedämpfter Text bei 9,77 : 1,
  Quellenzeilen bei 6,08 : 1.
- **Bewusste Ausnahme:** Der *noch nicht gescannte* Posttext ist gedämpft
  (3,60 : 1 auf Schwarz). Er ist groß und fett gesetzt (20–28 px) und erfüllt
  damit AA für große Schrift (≥ 3 : 1). Nach dem Scan liegt er bei
  16,94 : 1.
- **Fokus:** sichtbarer Rahmen in Rot, auf roter Fläche in Weiß, auf Schwarz
  in hellem Rot.
- **Neu:** Sprunglink, definierte `.sr-only`-Klasse, `aria-current` in der
  Navigation, `aria-expanded` am Menü-Knopf. Escape schließt Menü und
  Sprechblase.

### 3.13 Technik und Veröffentlichung

- Ohne Abhängigkeiten und ohne Build.
- Keine externen Anfragen, die Schriften liegen im Repo.
- Alle Pfade relativ, die Seite läuft unter `/ba-antisemitism/` (GitHub
  Pages).
- `.nojekyll` sorgt dafür, dass GitHub Pages die Dateien unverändert
  ausliefert. Veröffentlichung aus `main`, Ordner `/ (root)`.

---

## 4. Inhaltliche Entscheidungen aus der weiteren Sitzung (Patch `8c90c3c`)

Die Begründungen in dieser Tabelle sind **wörtlich oder sinngemäß der
Commit-Nachricht des Patches entnommen**. Wo die Nachricht keinen Grund
nennt, steht „nicht angegeben“.

| Entscheidung | Begründung laut Patch |
|---|---|
| **Bildnotizen unter beiden Collagen**: Ein Hinweis benennt das gezeigte Stilmittel, mit Quelle (BfV Kap. 2.2, S. 71 f.) | Im Code-Kommentar: „Die Bilder zeigen Stilmittel. Der Text darunter benennt sie.“ |
| **Sechs Werkzeuge statt vier Hebel**: Der Abschnitt zeigt die sechs Werkzeuge der Umwegkommunikation (BfV S. 71 f.) | „statt der vier selbst gebauten Hebel“, also die Systematik der Quelle statt einer eigenen Einteilung |
| **„Sechs Erzählungen“**, das Feld „Zeichen & Zahlen“ ist als Werkzeug gekennzeichnet („Werkzeug, keine Erzählung“) | In der Unterzeile: Zahlen und Zeichen sind Werkzeuge, mit denen alle sechs Erzählungen verschlüsselt werden. Quelle: BfV Kap. 2, S. 71 f. |
| **Hinweis über dem Lexikon**: keine Vollständigkeit, keine Checkliste | Quelle: BfV S. 7, AAS S. 6; weitere Begründung nicht angegeben |
| **Fußzeile beschreibt die Bilder zutreffend** | „Fußzeile beschreibt die Bilder zutreffend“, weitere Begründung nicht angegeben. Laut Diff ersetzt der Patch den Satz „Diese Seite zeigt bewusst kein antisemitisches Bildmaterial“ durch eine Beschreibung der Collagen. |
| **Beispiel „88“ entfernt** | „rechtsextrem und nicht antisemitisch“ (vgl. Abschnitt „Abgrenzung zum Rechtsextremismus“ in der README) |

---

## 5. Textrunde vom 27.09.2026 (Vorgaben)

### 5.1 Regeln der Vorgabe

- Nichts erfinden: keine neuen Quellen, Zahlen oder Aussagen. Nur ändern, was
  in der Liste steht.
- Bilder, Layout, Farben, Schriften, IDs und Klassen bleiben.
- Keine Gedankenstriche im sichtbaren Text, deutsche Anführungszeichen „…“.
- Quellenangaben bleiben unverändert, außer wo die Liste es anders vorgibt.

**Begründung laut Vorgabe** (Commit-Nachricht): „Texte für Jugendliche,
Vorstudie benannt, KI-Bilder deklariert, Bilder markiert, unbelegte Aussagen
entfernt.“ Eine weitere Begründung ist nicht angegeben.

### 5.2 Änderungen

| Bereich | Änderung | Begründung laut Vorgabe |
|---|---|---|
| Alle Texte | kürzere Sätze, Du-Ansprache, Alltagssprache (z. B. „ausgedacht“ statt „konstruiert“) | „Texte für Jugendliche“ |
| Titel, Beschreibung, Startfenster, Hero, Fuß | Die Seite ist als **Vorstudie** zur Kampagne „Gegen den Strich“ benannt statt als „Kampagnenprototyp“ | „Vorstudie benannt“ |
| Fuß | „Die Collagen sind KI-generiert und zeigen kein Originalmaterial.“ | „KI-Bilder deklariert“ |
| Was tun | dritte Bildnotiz „Im Bild markiert“ zur Illustration, Quelle BfV S. 73 | „Bilder markiert“; damit hat jedes der drei Bilder eine Notiz |
| Werkzeuge | Reihe „Vier Stilmittel im Bild“ (die vier Mechanismen aus der Datenbasis, jede Karte mit Quelle); Bildnotiz ergänzt, Quelle ergänzt um BfV S. 19, 27, 29, 73 | laut ergänztem Bildtext: „Rechts im Bild stehen vier Stilmittel der Propaganda. Sie sind direkt darunter erklärt.“ |
| Test | neue Quellenzeile BfV, „Codes erkennen und einordnen“, S. 21 unter der Unterzeile | nicht angegeben; die Zeile steht direkt unter „‚Kommt auf den Kontext an‘ … Oft ist das die richtige Antwort.“ |
| Navigation, Abschnitt 04 | „Mechanik“ heißt jetzt „Werkzeuge“ | nicht angegeben; der Abschnitt zeigt seit dem Patch die sechs Werkzeuge |
| Fuß, Quellen | ergänzt um Leipziger Autoritarismus-Studie 2024, nichts-gegen-juden.de, report-antisemitism.de | nicht angegeben; alle drei werden in Quellenzeilen der Seite bereits zitiert |
| Zwei Quellenangaben | FAQ 5 und „Widersprechen, nicht diskutieren“ jetzt „Amadeu Antonio Stiftung, nichts-gegen-juden.de“ | nicht angegeben |

### 5.3 Umsetzungsentscheidungen innerhalb der Vorgabe

Diese Punkte waren in der Vorgabe nicht ausdrücklich geregelt. Sie wurden so
gelöst, dass die Prüfvorgaben erfüllt sind, ohne Inhalte umzuschreiben:

- **Gedankenstriche an Stellen, die die Liste nicht nennt:** Damit die Prüfung
  „null Treffer“ aufgeht, wurde dort nur der Strich durch ein Komma ersetzt:
  - der Post-Satz „Wer das sagt, wird fertiggemacht, wir sind die neuen Juden“
  - die FAQ-Frage „Ich habe jüdische Freunde, dann bin ich doch kein Antisemit.“
  - der Code-Titel „tptb, the powers that be“
  - die Bildbeschreibung für Screenreader und das `aria-label` der Wortmarke
- **Kürzel für neue Quellen-Einträge** (`LAS`, `NGJ`, `RIAS`): vom Datenformat
  verlangt. Die Beschreibungen enthalten nur die Angaben aus der Vorgabe.
- **Apostroph in „6 Million Wasn't Enough“** belassen. Das ist ein
  Apostroph im englischen Original, kein Anführungszeichen.

### 5.4 Prüfung

- In Chromium bei 1440 px und 375 px geprüft: keine Konsolenfehler, kein
  horizontales Scrollen, kein Text läuft über.
- Durchgegangen:
  - alle vier Posts markiert, jede Sprechblase geöffnet
  - Test bis zum Ergebnis
  - alle sieben Codes-Felder mit allen Karten aufgeklappt
  - alle Fragen aufgeklappt
- **0** Gedankenstriche im sichtbaren Text.
- Alle drei Bilder haben eine Notiz „Im Bild markiert“.
- Quellen: Geändert haben sich nur die zwei vorgegebenen, die übrigen 162
  sind unverändert.

---

## 6. Belege: Stand und Umgang

**Datenbasis:** Alle 108 Codes, 7 Felder, 19 Post-Marker, 4 Gegenreden,
8 Quizfragen, 6 FAQ, 4 Stilmittel, 6 Werkzeuge, 3 Zahlen und
5 Handlungsschritte tragen eine Quellenangabe.

**Fließtexte ohne eigene Quellenzeile:** Einige Sätze enthalten Aussagen, zu
denen im selben Block keine Quellenzeile steht. Beispiele:

- Kopf: „wer Bescheid weiß, versteht es sofort“
- Melden: „auch wenn sie nicht strafbar sind“
- Fuß: „Codes lassen sich nie mechanisch entschlüsseln“

Sie sind so in der Vorgabe vom 27.09. festgelegt. Die
reduzierte Fassung (`7275eb9`) hatte solche Sätze gestrichen. Diese Linie
wurde mit der Übernahme des Patches nicht weitergeführt.

---

## 7. Was gleich geblieben ist

- Die Interaktionslogik: Scan mit Sprechblase und Gegenrede, Test mit
  Graubereich-Antwort, Drill-down, Karussells.
- Das Startfenster zum Studienprojekt und die Abgrenzungen im Fuß.
- Die durchgestrichene Wortmarke.
- Die Abgrenzung zum Rechtsextremismus: nur antisemitische Codes.

---

## 8. Offene Punkte

1. **Abgleich mit der Referenz:** rightsagainsttheright.com konnte nicht
   geöffnet werden.
2. **Nutzertest fehlt:** Zu prüfen wäre vor allem, ob das Laufband mit
   gestrichenen Codes als Entwertung oder als Reproduktion gelesen wird, und
   ob die Texte für die Zielgruppe verständlich sind.
3. **Seitenzahlen der Quellen** mit den Publikationen abgleichen.
4. **Hebräische Schriftfetzen** in der Kopf-Collage sollte jemand prüfen, der
   Hebräisch liest.
5. **Neues Bild** (Figur mit aufgerissenem Mund vor Strahlen und Gebäuden):
   liegt noch nicht als Datei vor. Einbauort und Bildnotiz sind offen.
6. **Ungenutzte Daten:** `LEVELS` und `SOURCES` in `assets/codes.js` werden
   nicht angezeigt.
