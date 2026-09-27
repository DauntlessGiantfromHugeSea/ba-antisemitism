# Prüfung der Collage-Oberfläche

Vergleichsbasis: `7788f8f` auf `origin/main`. Der zuvor abgerufene Stand `11e2c7f` wurde vor der Bearbeitung als `vorstudie-v1` gesichert und der Tag gepusht. Der anschließend eingetroffene Textstand wurde vor den Änderungen übernommen.

## Geprüft

- Desktop mit 1280 × 900 px und Handy mit 375 × 900 px: Dokumentbreite jeweils exakt 1280 bzw. 375 px, kein horizontaler Seitenüberlauf.
- Startfenster lässt sich über seinen Button per Tastatur und über Escape schließen.
- Alle vier Posts lassen sich markieren. 7, 4, 5 und 3 Codes werden freigeschaltet; die Erklärungsblase wurde in jedem Post geöffnet. Das Karussell blättert vorwärts und zurück.
- Acht Quizfragen bis zum Ergebnis durchlaufen.
- Alle sieben Codefelder geöffnet, mit 18, 21, 15, 11, 17, 16 und 10 Einträgen. Jeweils einen Eintrag aufgeklappt.
- Alle sechs FAQ-Antworten aufgeklappt.
- Handlungskarussell durch alle fünf Schritte und wieder zurück geblättert.
- Keine Fehler in der Browserkonsole der Desktop- und Handyansicht.
- Alle fünf Bilder laden nach dem Scrollen. Auf dem Handy werden die schmalen Varianten ausgewählt.
- Fünf Bildnotizen mit Quellen, drei neue `figcaption.sr-only`, keine doppelten IDs. `schreier.jpg` bleibt als Datei erhalten und wird nicht mehr eingebunden.
- `assets/app.js` und `assets/codes.js` sind gegenüber der Vergleichsbasis unverändert. Keine neuen Animationen; die bestehenden Regeln für `prefers-reduced-motion` bleiben erhalten.
- `git diff --check` ohne Befund.

## Bildgrößen

Die bereitgestellten Hauptdateien wurden unverändert übernommen. Alle drei haben 1706 × 922 px und bleiben einzeln unter 500 KB. Die Varianten haben 900 × 486 px.

| Bild | Hauptdatei | Mobile Variante |
| --- | ---: | ---: |
| Schrei | 401.370 Byte | 62.910 Byte |
| Megafon | 448.874 Byte | 58.172 Byte |
| Fackel | 450.972 Byte | 62.424 Byte |
| Gesamt | 1.301.216 Byte | 183.506 Byte |

Alle sechs neuen Bilddateien zusammen: **1.484.722 Byte**, unter 1,5 MB. Die Nachweis-Screenshots in diesem Verzeichnis werden von der Seite nicht geladen.

## Kontraste

Nach WCAG-Formel aus den sRGB-Farbwerten berechnet; Einzelwerte stehen in `kontraste.json`. Das Textrot wurde auf `#B5140B` angepasst. `--ink-3` und `--on-dark-2` erfüllen die Vorgaben weiterhin. Kleine Quellen auf Rot sind vollständig weiß. Quellen und Buttons innerhalb des hellen Quiz verwenden die hellen Flächen zugehörigen Textfarben. Auf ausgewählten roten Codefeldern bleiben die kleinen Angaben weiß. Seitliche Karussellkarten werden für lesbare Texte nicht mehr transparent dargestellt.

| Text / Hintergrund | Verhältnis |
| --- | ---: |
| `--ink` / `--paper` | 15,40:1 |
| `--ink-2` / `--paper` | 8,88:1 |
| `--ink-3` / `--paper` | 5,53:1 |
| `--ink-3` / `--paper-2` | 4,85:1 |
| `--red-tx` / `--paper` | 5,46:1 |
| `--red-tx` / `--paper-2` | 4,78:1 |
| `--on-dark` / `--dark` | 15,40:1 |
| `--on-dark-2` / `--dark` | 7,17:1 |
| `--on-dark-2` / `--dark-3` | 5,45:1 |
| `--red-dk` / `--dark` | 5,99:1 |
| `--red-dk` / `--dark-3` | 4,56:1 |
| Weiß / `--red` | 4,69:1 |

## Offene Performanceprüfung

Ein mobiler Lighthouse-Lauf auf der lokalen Vergleichsbasis wurde mit Lighthouse 13.5.0 versucht. Chrome ließ sich aus der Ausführungsumgebung nicht starten; Lighthouse endete mit „Unable to connect to Chrome“. Deshalb liegen keine belastbaren Vorher-/Nachher-Scores vor. Die Bedingung „mobile Performance nicht schlechter als vorher“ ist noch nicht verifiziert. Vor dem Merge beide Stände unter denselben Bedingungen mit Lighthouse vergleichen.

## Screenshots

Die Ordner `before/` und `after/` enthalten Hero, Scan, Was tun und Melden jeweils bei 1280 und 375 px Breite. Die Bilder werden auch im PR-Text gegenübergestellt.
