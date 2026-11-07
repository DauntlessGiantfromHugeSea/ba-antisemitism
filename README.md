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
| 01 | **Scan** | Vier konstruierte Posts im Karussell, je mit Marker-Sweep — zusammen 19 nummerierte Codes mit Sprechblase und Gegenrede. |
| 02 | **Test** | Acht Aussagen, drei Antwortoptionen. Die dritte — *„Kommt auf den Kontext an“* — ist keine Ausrede, sondern oft die fachlich richtige Antwort. |
| 03 | **Codes** | Sieben Kacheln (sechs Erzählungen, ein Werkzeugfeld), Drill-down zu 114 Einträgen. Davor der Hinweis, dass Antisemitismus ein Brückennarrativ ist. |
| 04 | **Werkzeuge** | Sechs Werkzeuge der Umwegkommunikation, dann die vier Wirkebenen als Grafik, danach drei belegte Zahlen zur Verbreitung. |
| 05 | **Fragen** | Sechs typische Einwände mit Antwort aus der Fachliteratur. |
| 06 | **Was tun** | Fünf Handlungsschritte als Ablaufgrafik. |
| 07 | **Melden** | BfV-Hinweistelefon und RIAS-Meldestelle. |

**Jede Aussage trägt eine Quellenangabe.**

## Gestaltung

Seit dem Umbau vom 07.11.2026 (Branch `claude/neutral-infografik`) ist die
Seite neutral und infografisch. Collagen, KI-Bilder, Risskanten und
Papiertexturen sind entfernt. Die Bilddateien liegen weiter in `assets/img/`
als Nachweis, siehe `assets/img/BILDER.md`.

- **Palette A** als CSS-Variablen: Papier `#F3EFE7`, Fläche `#E7E1D6`,
  Schrift `#26241F`, Schrift 2 `#5C5850`, Akzent `#C0392B`, Linie `#A9A398`.
  Das Rot gehört dem Strich, mit dem Codes gestrichen werden. Keine roten
  und keine schwarzen Flächen. Die Urteilsfarben im Test (grün, grau, rot)
  bleiben, weil sie dort Bedeutung tragen.
- **Typografie:** Archivo (variabel) kondensiert und extrafett für
  Überschriften, normal für Fließtext, JetBrains Mono für Labels und Quellen.
- **Infografiken statt Bilder:** Im Kopf die Codes-Übersicht als Tabelle aus
  sechs Formen und sechs Werkzeugen, im Abschnitt Werkzeuge die vier
  Wirkebenen, bei „Was tun“ der Ablauf. Das Laufband zeigt die Namen der
  sechs Werkzeuge.
- **Der Strich:** Codes stehen gestrichen und erklärt. Offen stehen sie nur
  im Test und in den Posts vor dem Scan.
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
  codes.js      Datenbasis: 114 Einträge, 7 Kacheln, Posts, Quiz, FAQ,
                Werkzeuge, Wirkebenen, Zahlen, Handlungsschritte
  app.js        Scan, Test, Drill-down, Übersicht, Kopfleiste, Menü, Laufband
  fonts/        Archivo und JetBrains Mono (variabel, WOFF2, SIL OFL 1.1)
  img/          frühere Collagen, nicht mehr eingebunden (BILDER.md)
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

Alle 114 Einträge stammen aus Fachpublikationen; die Zuordnung steht an jedem
Eintrag. Die sechs Einträge vom 07.11.2026 aus dem TikTok-Bericht der
Bildungsstätte Anne Frank haben jeweils eine zweite, unabhängige Quelle.

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
