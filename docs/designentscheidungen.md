# Designentscheidungen — Redesign „Zeichen lesen“

Dokumentation der gestalterischen Überarbeitung vom 26.09.2026. Für jede
Änderung steht, **was** entschieden wurde, **warum**, welche **Alternative
verworfen** wurde und was das für Barrierefreiheit und Technik bedeutet.

Die Überarbeitung lief in drei Runden:

| Runde | Auftrag | Ergebnis |
|---|---|---|
| 1 | „moderner gestalten, wie bei rightsagainsttheright.com“ | Typografie und Farbflächen statt Collage (Pull Request #1) |
| 2 | „noch reduzierter und intuitiver“ | weniger Elemente, weniger Bewegung, klare Bedienhinweise |
| 3 | „unbelegte Sachen entfernen“ | jede inhaltliche Aussage trägt eine Quelle oder ist gestrichen |

Die Abschnitte 3 bis 5 beschreiben den **Endstand** nach allen drei Runden.

---

## 0. Vorgehen und Grenzen

**Referenz nicht abgeglichen.** Die Seite rightsagainsttheright.com war in der
Arbeitsumgebung nicht abrufbar (Netzwerksperre). Die Entscheidungen stützen
sich auf die bekannten Merkmale der Kampagne *Rights Against the Right*
(Laut gegen Nazis / Jung von Matt) und auf allgemeine Gestaltungsprinzipien,
nicht auf einen direkten Vergleich. Der Abgleich steht noch aus (Abschnitt 7).

**Merkmale, an denen sich das Redesign orientiert:**

- Typografie trägt die Botschaft, nicht das Bild.
- Wenige Farben, großflächig eingesetzt.
- Codes werden sichtbar gemacht und zugleich entwertet (markiert, gestrichen).
- Klare, reduzierte Struktur statt dekorativer Ebenen.

**Prüfverfahren:** Jede Änderung wurde im Browser (Chromium) gerendert und
gemessen: Überlauf bei 320 bis 2560 px Breite, Konsolenfehler, alle
Interaktionen, Verhalten ohne JavaScript und mit reduzierter Bewegung.
Kontrastwerte sind nach WCAG 2.1 berechnet.

---

## 1. Ausgangslage

Die vorherige Fassung folgte einer **Collage- bzw. Zine-Ästhetik**: helle
„Betonwand“ mit Korn-Overlay, gerissene Papierkanten, gedrehte Blätter mit
Klebestreifen, Kritzel-Marken, ein Fries aus Narrativ-Zeichen, ein
handgezeichneter Ring um die Code-Zahl. Jeder Abschnitt hatte ein eigenes
Layout.

**Probleme, die beim Review auffielen:**

| Problem | Beleg |
|---|---|
| Die Anmutung war handgemacht-nostalgisch, nicht zeitgemäß. | Anlass des Auftrags |
| Viele Ornamente konkurrierten mit dem Prinzip *Markieren*. | Kritzel, Fries, Ring, Klebeband, Korn |
| Gerissene Kanten schnitten wiederholt Inhalte an. | Commit-Historie: „Risskante schnitt Inhalt ab“, „Gekritzel-Marken werden nicht mehr angeschnitten“ |
| „Sieben Erzählungen“ ab ca. 1280 px rechts abgeschnitten. | Messung: Wort 631 px breit, Kasten 544 px |
| Display-Schrift Arial Black ist eine Systemschrift. | Auf vielen Android- und Linux-Geräten nicht installiert, dort erscheint eine Ersatzschrift |
| Rote 11-px-Labels auf der Wandfarbe: **3,76 : 1**. | Unter WCAG-AA (4,5 : 1) |
| `.sr-only` wurde im HTML benutzt, aber nie definiert. | Bildbeschreibung nicht korrekt versteckt |
| Uneinheitliche Abschnittsköpfe | Jede Sektion anders aufgebaut |
| Einige Fließtexte enthielten Aussagen ohne Quelle. | z. B. „Codes sind kein Zufall … immer dieselben“, Quiz-Ergebnistexte |

---

## 2. Leitidee

> **Eine These, dann die Belege. Nichts, was davon ablenkt.**

Das Grundprinzip der Seite bleibt: **Mechanismen entlarven, nicht Codes
feiern. Nichts wird nachgebaut, alles wird markiert.**

Die Gestaltung übernehmen **Typografie und wenige Farbflächen**. Rot ist das
einzige Signal und bedeutet immer: *hier wird markiert oder gehandelt*.

---

## 3. Entscheidungen im Einzelnen

### 3.1 Schrift: Archivo (variabel) statt Arial Black

**Entscheidung:** Headlines in Archivo mit 66 % Breite und Stärke 900
(kondensiert, extrafett). Fließtext in derselben Schrift mit normaler Breite.
Codes, Labels und Quellen in JetBrains Mono.

**Begründung:**

- **Kondensierte, extrafette Groteske** erlaubt sehr große Schriftgrade bei
  vielen Zeichen pro Zeile. Nur so passt „WIE ER HEISST.“ auch auf dem Handy
  als eine Zeile über die volle Breite. Die Schriftform ist aus Protest- und
  Kampagnenplakaten vertraut.
- **Variable Schrift:** Eine Datei (90 KB) deckt über Breiten- und
  Gewichtsachse Headlines *und* Fließtext ab. Die Seite bleibt typografisch
  geschlossen und schlank.
- **Plattformunabhängig:** Die Schrift wird mitgeliefert und sieht überall
  gleich aus.
- **Monospace für Chiffren und Quellen** stammt aus der alten Konzeption: Codes
  und Belege bilden eine eigene, „technische“ Ebene.

**Verworfen:**

- **Google Fonts.** Beim Laden würde die IP-Adresse jeder besuchenden Person
  an Google übertragen. Für eine Seite, die zum Melden von Vorfällen
  ermutigt, soll keine Datenweitergabe an Dritte stattfinden.
- **Anton oder Bebas Neue.** Nur ein Schnitt, nicht für Fließtext geeignet.
  Man bräuchte eine zweite Schriftfamilie.
- **Arial Black beibehalten.** Nicht überall installiert und zu breit für
  randfüllende Zeilen.

**Technik:** `assets/fonts/` enthält die WOFF2-Dateien (ca. 130 KB) und die
Lizenztexte (SIL Open Font License 1.1). Die Display-Schrift wird per
`preload` früh geladen, `font-display: swap` verhindert unsichtbaren Text.

### 3.2 Schriftgrößen werden berechnet, nicht geschätzt

**Entscheidung:** Hero-Zeile, Abschnittsüberschriften und Fuß-Motto skalieren
mit der Fensterbreite. Sie sind so bemessen, dass die **längste Zeile die
Spalte gerade füllt**.

**Begründung:** Randfüllende Schrift wirkt nur, wenn sie nie überläuft. Die
Breite der längsten Zeile wurde in `em` gemessen („WIE ER HEISST.“ ≈ 5,5 em,
„ERZÄHLUNGEN.“ ≈ 6 em), daraus ergibt sich die Formel. Im zweispaltigen
Abschnittskopf ist das zum Beispiel `calc(15.3vw − 4.5rem)`.

**Geprüft:** 320, 375, 390, 768, 1024, 1280, 1440, 1920 und 2560 px, ohne
Überlauf. Damit ist auch „Sieben Erzählungen“ behoben.

**Nebenentscheidung:** Die Zeilenhöhe der Abschnittsüberschriften liegt bei
0,92 statt 0,86, weil sonst die Umlautpunkte an die Zeile darüber stießen.

### 3.3 Farbe: wenig Fläche, klare Bedeutung

**Entscheidung:** Drei Farben:

| Rolle | Wert | vorher |
|---|---|---|
| Papier | `#F1F0EC` | Wand `#E8E6E1` |
| Tinte | `#0E0E0D` | `#141312` |
| Rot | `#E1251B` | unverändert |

| Fläche | Abschnitte | Warum |
|---|---|---|
| hell | Kopf, Scan, Codes, Mechanik, Zahlen, Fragen, Was tun | ruhiger Lesegrund |
| schwarz | Test, Fuß | Test als interaktiver Moment der Konzentration; Fuß als Abschluss |
| rot | nur Melden | Rot als Fläche heißt: **jetzt handeln** |

**Begründung:**

- **Eine Bedeutung pro Farbe** ist intuitiv. Rot markiert Codes, Nummern
  und Streichungen, und nur ein einziger Abschnitt ist ganz rot: der
  Handlungsaufruf.
- **Runde 2:** Zuvor waren auch „Zahlen“ rot und „Fragen“ schwarz. Die vielen
  Wechsel wirkten unruhig und verwässerten die Signalwirkung. Deshalb stehen
  beide jetzt auf Hell, die Zahlen selbst in Rot.
- **Helleres Papier:** Die alte Wandfarbe war auf die Beton-Anmutung
  ausgelegt. Das neue Papier ist sauberer und verbessert die Kontraste.

**Rotstufen für Kontrast:** Ein Rotton allein reicht nicht für alle
Schriftgrößen.

| Einsatz | Farbe | Kontrast | WCAG |
|---|---|---|---|
| Große Schrift und Flächen auf Papier | `#E1251B` | 4,11 : 1 | AA für große Schrift (≥ 3 : 1) |
| Kleine Schrift auf Papier | `#C4180E` | 5,29 : 1 | AA |
| Kleine Schrift auf Schwarz | `#FF5145` | 5,99 : 1 | AA |
| Weiße Schrift auf Rot | Weiß auf `#E1251B` | 4,69 : 1 | AA |
| Aktive Narrativ-Kachel | Weiß auf `#B3170E` | 6,90 : 1 | AA |

**Semantik bleibt getrennt:** Richtig (Grün `#17703F`, 6,13 : 1), falsch
(`#C21A10`, 6,09 : 1), Graubereich (Grau). Die Bewertung steht nie nur in
Farbe, sondern immer auch als Text („Richtig“ / „Nicht ganz“).

### 3.4 Collage-Ebene entfernt

**Entscheidung:** Entfernt wurden gerissene Kanten, Klebestreifen, gedrehte
Blätter, Kritzel-Ebene, Fries, handgezeichneter Ring und Korn-Overlay. In
Runde 2 fiel auch die **Kopf-Collage** weg. Eingebunden bleiben nur die
Propaganda-Collage (Mechanik) und die Illustration im Abschnitt „Was tun“.

**Begründung:**

- **Reduktion.** Die Ornamente erzählten „handgemacht“, das Ziel ist
  „präzise und klar“.
- **Ein Markierungsprinzip statt vieler.** Wenn Kritzel, Ring und Klebeband
  ebenfalls „markieren“, verliert die Markierung der Codes an Gewicht. Jetzt
  gibt es nur noch rote Fläche und roten Strich.
- **Robustheit.** Gerissene Kanten per `clip-path` schnitten laut
  Commit-Historie mehrfach Inhalte ab. Gerade Kanten können das nicht.
- **Kopf-Collage (Runde 2):** Sie wiederholte das Wort „Antisemitismus“
  direkt unter der Schlagzeile und schob den Einstieg um eine Bildschirmhöhe
  nach unten. Außerdem enthielt sie ungeprüfte hebräische Schriftfetzen, bei
  diesem Thema ein vermeidbares Risiko. Die Datei liegt weiter im Repo.
- **Performance.** Das Korn-Overlay lag als fixierte Ebene über der ganzen
  Seite.

**Bewusst beibehalten:** die **durchgestrichene Wortmarke**. Streichen ist
Markieren und damit Konzept, kein Ornament.

**Balken über der Propaganda-Collage:** Sie decken die eingebrannte Schrift
ab und sind jetzt gerade statt gerissen. Dadurch lesen sie sich wie
Schwärzungs- oder Markierbalken, was inhaltlich passt.

### 3.5 Kopfbereich: nur die These und ein Weg

**Entscheidung:** Der Kopf besteht aus drei Elementen:

1. Das `h1` *„Hass sagt nicht mehr, wie er heißt.“* über die volle Breite,
   die letzte Zeile rot.
2. Ein kurzer Absatz mit drei markierten Beispiel-Codes **und Quellenangabe**.
3. Ein einziger Knopf: **„Los geht’s ↓“** führt zum ersten Abschnitt.

**Begründung:**

- **Die These gehört nach oben.** Vorher lautete das `h1` „Antisemitismus“
  und benannte nur das Thema. Screenreader und Suchmaschinen erhalten jetzt
  die Kernaussage.
- **Ein Weg statt drei (Runde 2):** Vorher gab es „Test starten“, „Codes
  ansehen“ und einen dritten Knopf in der Kopfleiste. Sie führten an
  verschiedene Stellen und überspringen den Scan, der die Grundlage für den
  Test legt. Ein Knopf in Leserichtung ist eindeutiger. Wer springen will,
  hat die Navigation.
- **Entfernt (Runde 2):** Metazeile, Zahlenblock mit Hochzählen, Laufband.
  Die Zahl 108 steht jetzt ohne Animation im Satz. Die Einordnung als
  Studienprojekt übernehmen Eingangshinweis und Fuß.

### 3.6 Ein Kopfmuster für alle Abschnitte

**Entscheidung:** Jeder Abschnitt beginnt gleich: durchgehende Linie, rote
Nummer mit Titel, große Überschrift links, kurze Unterzeile rechts unten.

**Begründung:**

- **Orientierung:** Ein festes Muster zeigt auf der langen Seite, wo man ist
  („04 von 07“).
- **Variation kommt aus Inhalt und wenigen Flächen**, nicht aus wechselnden
  Layouts.
- **Unterzeilen sind Bedienhinweise (Runde 2 und 3):** Sie sagen, was man tun
  kann, und behaupten nichts ohne Beleg. Zum Beispiel: „Tippe auf ‚Codes
  markieren‘, dann auf einen roten Begriff.“

**Verworfen:** Den bisherigen „Rhythmusbruch“ (jede Sektion anders)
beizubehalten. Er erzeugte Überlappungen und war die Ursache der
abgeschnittenen Überschrift.

### 3.7 Laufband: eingeführt, dann wieder entfernt

**Runde 1:** Ein großes Laufband zeigte alle 108 Codes, jeweils rot
durchgestrichen, um die Menge fühlbar zu machen.

**Runde 2 — entfernt. Begründung:**

- Es war die größte Dauerbewegung der Seite und widersprach dem Ziel
  „reduzierter“.
- Es zeigte Codes **ohne Erklärung**. Trotz Streichung bestand das Risiko,
  dass es als Reproduktion statt als Entwertung gelesen wird.
- Die Menge ist schon durch die Zahl 108 im Kopf und durch das Lexikon
  (Abschnitt 03) vermittelt.

### 3.8 Navigation

**Entscheidung:**

- Die Kopfleiste bleibt beim Scrollen sichtbar.
- Der aktuelle Abschnitt ist in der Navigation unterstrichen.
- Auf schmalen Schirmen öffnet ein Menü-Knopf eine Vollbild-Ebene mit großen
  Einträgen und Nummern.
- Ein Sprunglink „Zum Inhalt springen“ ist für Tastaturnutzende
  hinzugekommen.
- **Entfernt in Runde 2:** der Lesefortschrittsbalken (doppelte Information
  neben dem markierten Abschnitt) und der Knopf „Test starten“ in der
  Kopfleiste (siehe 3.5).

**Begründung:** Bei sieben Abschnitten braucht es jederzeit einen Weg zurück
und nach vorn. Die alte Navigation brach auf dem Handy in mehrere Zeilen um.

**Robustheit:** Ohne JavaScript bleibt die Navigation eine horizontal
scrollbare Zeile.

**Technisches Detail:** Auf schmalen Schirmen verzichtet die Kopfleiste auf
den Unschärfe-Effekt. Er macht den Header zum Bezugsrahmen für
`position: fixed`, sodass das Vollbild-Menü im 60 px hohen Header
eingesperrt war. Das fiel im Test auf und ist behoben.

### 3.9 Bewegung: nur, wo sie etwas erklärt

**Endstand:**

| Bewegung | Funktion |
|---|---|
| Headline fährt zeilenweise ein | Die These baut sich auf, die einzige ausdrückliche Animation |
| Abschnitte blenden dezent ein (14 px, 0,6 s) | führt den Blick |
| Scan-Linie über den Posts | Kernmetapher „scannen“ |
| Karussell nimmt Nachbarkarten zurück | zeigt, dass es mehr gibt und blätterbar ist |

**Entfernt in Runde 2:** Hochzählen der Zahl, Laufband, Wisch-Füllung der
Buttons (sie füllen sich jetzt sofort), Pfeil-Verschieben beim Überfahren.
Die Nachbarkarten im Karussell werden nur noch um 5 % statt 12 % verkleinert.

**Begründung:** Bewegung, die nichts erklärt, lenkt ab, gerade bei diesem
Thema. Alle Bewegungen entfallen bei `prefers-reduced-motion`. Die Headline
wartet, bis der Eingangshinweis geschlossen ist.

### 3.10 Komponenten

| Komponente | Endstand | Begründung |
|---|---|---|
| **Posts (Scan)** | dunkle Karten, große kondensierte Schrift, Bedienhinweis in der Unterzeile | Klare Kante, mehr Text pro Zeile. Die Marker gleichen ihren Innenabstand mit einem Minusrand aus, dadurch gibt es vor dem Scan keine doppelten Leerräume. |
| **Quiz** | weiße Karte auf Schwarz, Antworten als volle Zeilen | Große Klickflächen, die Antwort liest sich wie eine Aussage. Die Ergebnistexte melden nur das Ergebnis zurück (Runde 3). |
| **Narrativ-Kacheln** | Zahl oben, Zeichen Mitte, Name unten; sieben Spalten erst ab 1280 px | Lesereihenfolge „wie viele, welches Bild, welches Narrativ“. Weiche Trennstellen in „Welt·verschwörung“ und „Ent·menschlichung“ verhindern Überlauf. |
| **Brückennarrativ-Hinweis** | zweispaltig, große Überschrift „Nicht nur rechts.“ | Inhaltlich zentral und belegt (BfV S. 15–17), daher mit Gewicht gesetzt. |
| **Mechanik** | vier große Einträge mit Nummer und Quelle | Die vier Hebel sind die Transferleistung der Seite. |
| **Zahlen** | helle Fläche, große rote Zahlen, Quelle unter jeder Zahl | Evidenz sichtbar, ohne eine zweite Signalfläche neben „Melden“. „Links wie rechts“ ist kleiner gesetzt, damit das Wort auf Höhe der Zahlen bleibt. |
| **Fragen** | helle Fläche, große Aufklappzeilen, runder Plus-Knopf | Der runde Knopf ist eine gelernte Geste für „aufklappen“. |
| **Was tun** | Karten mit Rahmen, aktive Karte schwarz | Im Karussell ist sofort sichtbar, welcher Schritt dran ist. |
| **Melden** | einzige rote Fläche, zwei große Linkzeilen (BfV / RIAS) mit ↗ | Der wichtigste Handlungsaufruf bekommt die stärkste Fläche. Der Pfeil ↗ zeigt: externe Seite. |
| **Eingangshinweis** | roter Kasten, dunkler unscharfer Hintergrund | Gleicher Inhalt, zeitgemäße Anmutung. |
| **Fuß** | schwarz, Motto randfüllend, drei Textspalten | Klarer Abschluss, rechtliche Hinweise gruppiert. |

### 3.11 Barrierefreiheit

- **Kontraste:** Alle kleinen Schriften erreichen mindestens AA (Tabelle in
  3.3). Fließtext liegt bei 16,94 : 1, gedämpfter Text bei 9,77 : 1,
  Quellenzeilen bei 6,08 : 1.
- **Bewusste Ausnahme:** Der *noch nicht gescannte* Posttext ist gedämpft
  (3,60 : 1 auf Schwarz). Er ist groß und fett gesetzt (20–28 px) und erfüllt
  damit AA für große Schrift (≥ 3 : 1). Die Dämpfung ist Teil der Aussage
  („noch nicht entschlüsselt“). Nach dem Scan liegt er bei 16,94 : 1.
- **Fokus:** sichtbarer Rahmen in Rot, auf roter Fläche in Weiß, auf Schwarz
  in hellem Rot.
- **Neu:** Sprunglink, definierte `.sr-only`-Klasse, `aria-current` in der
  Navigation, `aria-expanded` am Menü-Knopf. Escape schließt Menü und
  Sprechblase.

### 3.12 Technik und Veröffentlichung

- Weiterhin **ohne Abhängigkeiten und ohne Build**.
- **Keine externen Anfragen:** Die Schriften liegen im Repo.
- **Alle Pfade sind relativ:** Die Seite läuft auch unter einem Unterpfad wie
  `/ba-antisemitism/` (GitHub Pages).
- `.nojekyll` sorgt dafür, dass GitHub Pages die Dateien unverändert
  ausliefert. Veröffentlichung aus `main`, Ordner `/ (root)`.

---

## 4. Belege: Umgang mit unbelegten Aussagen (Runde 3)

**Regel:** Jede inhaltliche Aussage auf der Seite trägt eine Quelle. Was sich
nicht belegen lässt, wird gestrichen. Erlaubt ohne Quelle sind nur
**Bedienhinweise** („Antippen zum Aufklappen“) und **Selbstauskünfte der
Seite** (konstruierte Beispiele, Studienprojekt, keine Rechtsberatung).

**Geprüft:** Die Datenbasis (`assets/codes.js`) ist vollständig belegt. Alle
108 Codes, 7 Narrative, 19 Post-Marker, 4 Gegenreden, 8 Quizfragen, 6 FAQ,
4 Hebel, 3 Zahlen und 5 Handlungsschritte tragen eine Quellenangabe.
**Quellen wurden weder verändert noch hinzugefügt.** Unbelegt waren nur
Fließtexte im HTML und im JavaScript:

| Stelle | vorher | nachher |
|---|---|---|
| Kopf | Beispiele ohne Quelle | Quelle angehängt: BfV („Globalisten“, „109“, „(((…)))“) · REG, alle drei stehen im Lexikon |
| Kopf | „… und alle Eingeweihten wissen Bescheid“ | gestrichen |
| Test | „ist keine Ausrede, sondern oft die fachlich richtige“ | „Jede Auflösung nennt ihre Quelle.“ |
| Codes | „Jedes Narrativ hat sein eigenes Bildrepertoire“ (Runde 1 eingefügt) | nur Bedienhinweis |
| Mechanik | „Codes sind kein Zufall … immer dieselben. Wer die kennt, erkennt auch Codes, die in keiner Liste stehen.“ | „Vier Hebel, mit denen Codes wirken — jeder einzeln belegt.“ |
| Fragen | „Die Einwände, die fast immer kommen“ (Runde 1 eingefügt) | „Einwände und was die Fachliteratur dazu sagt.“ |
| Was tun | „Fünf Dinge, die wirklich etwas ändern — und eines, das du besser lässt“ | „Fünf Schritte, jeder mit Quelle.“ Zudem gab es nur fünf Karten, nicht sechs. |
| Melden | „… kann man melden — anonym und ohne Anzeige“ | „Zwei Stellen, an die du … melden kannst.“ Die Bedingungen erklären die verlinkten Stellen selbst. |
| Fuß | „Codes lassen sich nie mechanisch entschlüsseln: Es entscheidet immer der Kontext.“ | an die belegte Aussage gebunden: „… entscheiden Umfeld, Absender und Adressat (BfV, S. 21)“ |
| Quiz-Ergebnis | z. B. „Das ist der Normalfall — und der Grund, warum Codes funktionieren.“ | nur Rückmeldung zum Ergebnis, z. B. „Fast alles richtig eingeordnet.“ |

---

## 5. Was gleich geblieben ist

- **Alle belegten Inhalte und ihre Quellen**, unverändert.
- **Die Interaktionslogik:** Scan mit Sprechblase und Gegenrede, Quiz mit
  Graubereich-Antwort, Drill-down, Karussells.
- **Der Eingangshinweis** zum Studienprojekt und die Abgrenzungen im Fuß.
- **Kein antisemitisches Bildmaterial.** Die Seite markiert nur.

---

## 6. Zusammenfassung

| Bereich | vorher | Endstand |
|---|---|---|
| Anmutung | Collage, Zine, handgemacht | typografisch, reduziert, präzise |
| Hauptmittel | Bild und Ornament | Schrift und wenige Flächen |
| Schrift | Arial Black (System) | Archivo variabel, selbst gehostet |
| Rot | Akzent überall | Markieren; als Fläche nur „Melden“ |
| Kopf | Collage, drei Wege | These, Beleg, ein Knopf |
| Bewegung | viele kleine Effekte | Headline, dezentes Einblenden, Scan-Linie |
| Layout | jede Sektion anders | ein Kopfmuster, Unterzeile als Bedienhinweis |
| Belege | einzelne Aussagen ohne Quelle | jede inhaltliche Aussage belegt |
| Barrierefreiheit | Lücken (Kontrast, `.sr-only`) | AA für kleine Schrift, Sprunglink |
| Fehler | Überschrift abgeschnitten | 320–2560 px ohne Überlauf |

---

## 7. Offene Punkte

1. **Abgleich mit der Referenz:** rightsagainsttheright.com konnte nicht
   geöffnet werden. Schrift, Farbwerte und Aufbau des Originals sind nicht
   verifiziert.
2. **Nutzertest fehlt:** Zu prüfen wären vor allem, ob der Einstieg über
   „Los geht’s“ verstanden wird und ob der Scan ohne weitere Anleitung
   funktioniert.
3. **KI-generierte Bilder:** Die Collagen sind in der Arbeit zu deklarieren.
   Falls die Kopf-Collage wieder eingebunden wird, müssen ihre hebräischen
   Schriftfetzen vorher geprüft werden.
4. **Ungenutzte Daten:** `TOOLS`, `LEVELS` und `SOURCES` in `assets/codes.js`
   werden nicht angezeigt. `TOOLS` enthält noch „88“, obwohl rein
   rechtsextreme Codes laut Konzept entfernt wurden.
5. **README-Einleitung:** Der konzeptionelle Einleitungstext der README (z. B.
   der Hundepfeifen-Vergleich) ist Projektbeschreibung und trägt keine
   Quellen. Er erscheint nicht auf der Seite.
