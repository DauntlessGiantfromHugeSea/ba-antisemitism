/* =========================================================
   Datenbasis
   Zusammengeführt aus:
   [BfV]  Bundesamt für Verfassungsschutz: „Versteckte Botschaften –
          Antisemitische Codes und Chiffren", Köln, Mai 2026
   [AAS]  Amadeu Antonio Stiftung: „deconstruct antisemitism!
          Antisemitische Codes und Metaphern erkennen", Berlin 2021
   [REG]  Regishut: „Antisemitismus erkennen. Symbole, Codes und
          Parolen", Berlin 2023 (ISBN 978-3-00-077634-2)
   [BPB]  bpb, Dossier Antisemitismus: Glossar / Tiermetaphern
   ========================================================= */

/* Jedes Narrativ bekommt ein Zeichen — abgeleitet aus dem
   Bildrepertoire, das es tatsächlich benutzt.
   Seit dem 07.11.2026 (abends) stehen die Zeichen wieder auf den Kacheln,
   rot gestrichen und mit einem Satz dazu. sign sagt, welchen Code das
   Zeichen zeigt (laut BA – Briefing Kategorie-Icons), die Bedeutung kommt
   aus KURZ. Die Münze ist laut Briefing selbst kein Code, steht aber nah
   am Code „Schekel“.
   Seit dem 09.11.2026 liegen die Zeichen als Dateien in assets/icons/
   (viewBox 0 0 64 64, Linien in Schwarz, app.js färbt sie per Maske ein).
   icon nennt die Datei, icon: null heißt Kachel ohne Zeichen. Das Dreieck
   der Kachel „Israelbezogen“ ist ausgeblendet (Entscheidung 09.11.2026).
   Die alten Zeichen zeigen selbst Codes und heißen alt-<id>.svg. Nur sie
   stehen rot gestrichen und mit dem Satz aus sign. Dustyns eigene
   Zeichen heißen <id>.svg (ids: geld, welt, bio, tier, schuld, israel,
   zeichen) und stehen immer ohne Strich und Satz. Zum Einschalten
   icon auf "<id>.svg" setzen. Zeichen für die Werkzeuge heißen später
   werkzeug-<id>.svg, damit sie nicht mit der Kachel „zeichen“ kollidieren. */
const CATEGORIES = [
  { id: "geld", label: "Geldmacht", claim: "„Sie kontrollieren das Geld.“", catSrc: "BfV Kap. 2.1 · AAS S. 10 f.",
    sign: { lead: "Das Zeichen zeigt eine Münze mit Währungszeichen, nah am Code", code: "Schekel" },
    icon: "alt-geld.svg" },

  { id: "welt", label: "Welt\u00ADverschwörung", claim: "„Sie ziehen die Fäden.“", catSrc: "BfV Kap. 2.2 · REG S. 30–39",
    sign: { lead: "Das Zeichen zeigt den Code", code: "Puppenspieler / Marionette" },
    icon: "alt-welt.svg" },

  { id: "bio", label: "Krankheit & Blut", claim: "„Sie vergiften uns.“", catSrc: "BfV Kap. 2.3 · REG S. 40–45",
    sign: { lead: "Das Zeichen zeigt den Code", code: "Das allsehende Auge" },
    icon: "alt-bio.svg" },

  { id: "tier", label: "Ent\u00ADmenschlichung", claim: "„Sie sind keine Menschen.“", catSrc: "BfV Kap. 2.4 · bpb, Tiermetaphern",
    sign: { lead: "Das Zeichen zeigt den Code", code: "Krake" },
    icon: "alt-tier.svg" },

  { id: "schuld", label: "Schuldabwehr", claim: "„Schluss damit.“", catSrc: "BfV Kap. 2.5 · AAS S. 30 f.",
    sign: { lead: "Das Zeichen zeigt den Code", code: "Schlussstrich" },
    icon: "alt-schuld.svg" },

  { id: "israel", label: "Israelbezogen", claim: "„Der Staat ist das Böse.“", catSrc: "BfV Kap. 2.6 · REG S. 64–74",
    sign: { lead: "Das Zeichen zeigt den Code", code: "Rotes Dreieck" },
    icon: null },

  { id: "zeichen", label: "Zeichen & Zahlen", tool: true, claim: "„Wer’s weiß, weiß es.“", catSrc: "BfV S. 71 f.",
    sign: { lead: "Das Zeichen zeigt den Code", code: "(((Echo)))" },
    icon: "alt-zeichen.svg" }
];

/* Formen und Werkzeuge für die Codes-Übersicht im Kopf.
   Jeder Eintrag in CODES trägt seit dem 07.11.2026 zwei Felder:
   f  Hauptform nach Pfahl-Traughber (2007, S. 6–10) mit dem Label für Jugendliche
   w  Hauptwerkzeug nach BfV (2026, S. 71 f.)
   Grundlage ist die Zuordnung vom 07.11.2026 (Entwurf) mit Dustyns
   Entscheidungen 1 bis 4 vom selben Tag, für die sechs neuen Einträge der
   Vorschlag aus der Zwei-Quellen-Notiz. f: "kontext" steht für die reinen
   Markierer, die nur „jüdisch“ sagen (Entscheidung 4). w: "offen" steht für
   Einträge, die offen sagen, was sie meinen (Entscheidung 3).
   Einträge mit lvl: "kontext" gelten nicht als Code und zählen in der
   Übersicht nicht mit, auch wenn sie f und w haben. app.js zählt alles
   aus diesen Feldern, die Zahlen in index.html sind nur der Stand für
   Besuche ohne JavaScript. */
const FORMS = [
  { id: "glaube",        label: "Glaube",              fach: "religiös" },
  { id: "geld",          label: "Geld",                fach: "sozial" },
  { id: "verschwoerung", label: "Verschwörung",        fach: "politisch" },
  { id: "koerper",       label: "Körper und Herkunft", fach: "rassistisch" },
  { id: "schuld",        label: "Schuldabwehr",        fach: "sekundär" },
  { id: "israel",        label: "Israel",              fach: "israelbezogen" },
  { id: "kontext",       label: "je nach Kontext",     fach: "keine feste Form", rand: true }
];

const WERKZEUGE = [
  { id: "anspielung", n: "01",   label: "Vage Anspielung" },
  { id: "person",     n: "02",   label: "Personalisierung" },
  { id: "ersetzung",  n: "03",   label: "Begriffsersetzung" },
  { id: "bild",       n: "04",   label: "Abwertendes Bild" },
  { id: "zahl",       n: "05",   label: "Zahlencode" },
  { id: "zeichen",    n: "06",   label: "Optisches Zeichen" },
  { id: "offen",      n: "ohne", label: "offen gesagt", rand: true }
];

/* Umbau am 16.11.2026 (Dustyn: „mehr die codes rein, die auf social media
   sind“). Grundlage sind die Antwort von Mike Samuel Delberg (E-Mail vom
   15.11.2026) und die Prüfung in „BA – Codes auf Social Media nach Delberg
   (2026-11-16)“ im Vault. Im Lexikon bleibt nur, was eine Quelle auf Social
   Media belegt, also in Posts, Kommentaren, Memes, Emojis, Hashtags, Profilen
   oder Chats. 48 Einträge ohne diesen Beleg und die zwei lebenden Personen
   stehen unverändert und mit Grund in codes-archiv-2026-11-16.js. Neu sind
   neun Einträge mit schriftlicher Quelle, einzelne alte Einträge haben ihr
   Emoji und den Social-Media-Beleg dazubekommen (jeweils kommentiert).
   Kürzel neu: SG = Salhi & Goldhorn 2025, ADL = ADL 2025, BSAF-R = BSAF
   2024a, BSAF-G = BSAF 2026a, BSAF-M = BSAF 2025, CB = Chapelan & Bolton
   2024, RIAS wie bisher. BSAF meint weiter nur den TikTok-Bericht von 2024. */
const CODES = [
  /* ---------- GELDMACHT ---------- */
  { t: "Hochfinanz", c: "geld", f: "geld", w: "ersetzung", src: "BfV · AAS",
    d: "Steht für eine angebliche „jüdische Weltfinanzkontrolle“ und zeichnet das Bild eines geheimen, staatenlenkenden Zirkels. Ähnelt dem NS-Terminus „internationales Finanzjudentum“." },
  { t: "Globalisten", c: "geld", f: "verschwoerung", w: "ersetzung", src: "BfV · REG",
    d: "Chiffre für eine „kosmopolitische Elite“ ohne Bindung an Vaterland, Kultur oder Tradition, die nationale Souveränität zugunsten internationaler Organisationen untergrabe." },
  { t: "Ostküste", c: "geld", f: "geld", w: "ersetzung", src: "BfV · AAS",
    d: "Geografischer Verweis auf den angeblich jüdisch kontrollierten Finanzstandort New York, und damit auf Jüdinnen und Juden im Allgemeinen." },
  { t: "Wall Street", c: "geld", f: "geld", w: "ersetzung", src: "BfV · AAS",
    d: "Synonym für ein „wurzelloses“, internationales „Finanzjudentum“. Rahmt den Kapitalismus als fremde, feindselige Macht gegen die nationale Gemeinschaft." },
  { t: "Rothschild", c: "geld", f: "verschwoerung", w: "person", src: "BfV · AAS · REG",
    d: "Bankiersfamilie des 18./19. Jh. als Chiffre für eine geheime „jüdische Elite“, die Kriege, Krisen und Katastrophen orchestriere. Titel eines NS-Propagandafilms von 1940." },
  { t: "Rockefeller", c: "geld", f: "geld", w: "person", src: "BfV · AAS",
    d: "Die Familie hat keine jüdischen Wurzeln, wird aber mit den Rothschilds gleichgesetzt. Solche Personalisierungen markieren „das Judentum“ als globale Finanzelite." },
  { t: "BlackRock", c: "geld", f: "geld", w: "person", src: "BfV",
    d: "Fungiert als Code, der das Narrativ einer „jüdischen Weltfinanzkontrolle“ bedient. Sachliche Kritik am Einfluss von Vermögensverwaltern ist davon zu unterscheiden, der Kontext entscheidet." },
  { t: "Geldjude / Wucherer", c: "geld", f: "geld", w: "zeichen", src: "BfV · AAS",
    d: "Bildformel des sozialen Antisemitismus: Geldsäcke, Dollarzeichen, der dick-dünn-Kontrast zwischen Ausbeuter und Ausgebeutetem." },
  /* Schekel: 16.11.2026 Beleg auf TikTok ergänzt (Salhi & Goldhorn, 2025, S. 124). */
  { t: "Schekel", c: "geld", f: "geld", w: "ersetzung", src: "BfV · SG",
    d: "Israelische Währung als Code für „jüdisches“ Geld. Markiert Profit und Besitz als jüdisch." },
  { t: "Happy Merchant", c: "geld", f: "geld", w: "zeichen", src: "BfV · AAS",
    d: "Karikatur-Meme mit langer krummer Nase, unförmigen Zähnen, Buckel, Bart, Kippa und reibenden Händen. Extrem hoher Verbreitungsgrad in digitalen Räumen." },
  /* Neu 07.11.2026: auf TikTok belegt, mit zweiter Quelle bestätigt
     (Schnabel & Berendsen, 2024, S. 26; Bundesverband RIAS, 2026, S. 28; Lorenz, 2025, S. 273–274). */
  { t: "Geldsack- und Geldbündel-Emojis", c: "geld", f: "geld", w: "zeichen", src: "BSAF · RIAS · LOR",
    d: "Geldsäcke oder Geldbündel in Kommentaren zu Jüdinnen und Juden oder Israel spielen auf die alte Lüge an, Juden seien besonders gierig und reich." },

  /* ---------- WELTVERSCHWÖRUNG ---------- */
  { t: "Puppenspieler / Marionette", c: "welt", f: "verschwoerung", w: "anspielung", src: "BfV · AAS · REG",
    d: "Fäden, Stöcke und Hände von oben: Politische Akteure seien nur willenlose Werkzeuge eines „jüdischen Willens“. Delegitimiert jede sichtbare Politik als Fassade." },
  { t: "Strippenzieher / Drahtzieher", c: "welt", f: "verschwoerung", w: "anspielung", src: "AAS · REG",
    d: "„Der Jude“ ziehe im Verborgenen die Fäden und lenke so das Weltgeschehen. Verbindet alle Verschwörungsnarrative miteinander." },
  { t: "Großer Austausch / Umvolkung", c: "welt", f: "verschwoerung", w: "anspielung", src: "AAS · REG",
    d: "Behauptet, eine, jüdisch gedachte, globale Elite wolle die weiße Bevölkerung durch Einwanderung ersetzen. Bezugspunkt der Attentäter von Christchurch und Halle 2019." },
  { t: "Great Reset", c: "welt", f: "verschwoerung", w: "anspielung", src: "BfV · AAS · REG",
    d: "Ursprünglich ein WEF-Konzept für die Zeit nach der Coronapandemie, umgedeutet zum Plan einer „Elite“ zur Versklavung oder Vernichtung der Menschheit." },
  { t: "New World Order (NWO)", c: "welt", f: "verschwoerung", w: "anspielung", src: "BfV · AAS · REG",
    d: "Sammelbegriff für eine drohende „totalitäre Weltregierung“, hinter der „jüdische Strippenzieher“ stünden, um Nationalstaaten aufzulösen." },
  { t: "Illuminati", c: "welt", f: "verschwoerung", w: "person", src: "BfV · REG",
    d: "1776 gegründeter, 1785 verbotener Geheimorden. Sein Name dient heute als Chiffre für eine fiktive, im Verborgenen agierende „Weltregierung“." },
  { t: "Protokolle der Weisen von Zion", c: "welt", f: "verschwoerung", w: "anspielung", src: "REG",
    d: "Anfang des 20. Jh. verbreitete Fälschung, die einen jüdischen Plan zur Weltherrschaft behauptet. Bis heute Grundtext antisemitischer Verschwörungsideologie." },
  { t: "QAnon / WWG1WGA", c: "welt", f: "verschwoerung", w: "anspielung", src: "AAS · REG",
    d: "Erzählung von einer satanistischen Elite, die Kinder entführe, foltere und töte. Strukturell die Ritualmordlegende in digitaler Form." },
  { t: "Kabale", c: "welt", f: "verschwoerung", w: "ersetzung", src: "BfV · REG",
    d: "Ursprünglich ein Begriff der jüdischen Mystik, umgedeutet zu bösartigen „Drahtziehern“ eines industriellen Kinderhandels." },
  /* Neu 07.11.2026: auf TikTok belegt, mit zweiter Quelle bestätigt
     (Schnabel & Berendsen, 2024, S. 11, 14, 15, 29; BfV S. 12; AAS S. 36–37; Becker, 2024a, S. 160–162). */
  { t: "„Israel kontrolliert die Medien“", c: "welt", f: "verschwoerung", w: "anspielung", src: "BSAF · BfV · AAS · DA",
    d: "Behauptet, Israel oder „die Zionisten“ steuerten heimlich Medien, Wirtschaft und Regierungen der Welt. Dahinter steckt der alte Mythos einer geheimen jüdischen Macht, nur mit Israel als neuem Namen." },
  /* (Schnabel & Berendsen, 2024, S. 18, 26; BfV, 2024, S. 52, 59; Chapelan, 2024, S. 181) */
  { t: "„Inside-Job“ / „falsche Flagge“", c: "welt", f: "verschwoerung", w: "anspielung", src: "BSAF · BfV-L · DA",
    d: "Behauptet, Israel habe den Angriff vom 7. Oktober selbst inszeniert. So werden die Opfer zu Tätern gemacht, und eine angeblich jüdische Macht soll hinter allem stecken." },
  /* Neu 16.11.2026: auf TikTok und in Memes belegt (Salhi & Goldhorn, 2025,
     S. 121, 124; Jensen, 2025, S. 26; Becker et al., 2024, S. 185), von Delberg
     als „goy“ und „guter goy“ genannt (E-Mail vom 15.11.2026). */
  { t: "„Goy“ / „guter Goy“", c: "welt", f: "verschwoerung", w: "anspielung", src: "SG · DA",
    d: "„Goy“ ist das jiddische Wort für Nichtjuden. Im Netz wird es abwertend benutzt: Ein „guter Goy“ sei, wer sich von Juden lenken und täuschen lässt. Dahinter steckt die Erzählung einer heimlichen jüdischen Macht." },

  /* ---------- KRANKHEIT & BLUT ---------- */
  { t: "Ritualmordlegende", c: "bio", f: "glaube", w: "offen", src: "BfV · AAS · REG",
    d: "Seit 1475 (Trient) tradierter Vorwurf, Jüdinnen und Juden töteten christliche Kinder, um deren Blut zu verwenden. Löste über Jahrhunderte Verfolgungswellen aus." },
  { t: "Adrenochrom", c: "bio", f: "verschwoerung", w: "anspielung", src: "BfV · REG",
    d: "Fiktive Verjüngungsdroge, angeblich aus dem Blut gefolterter Kinder gewonnen. Die Ritualmordlegende in modernem Gewand." },
  { t: "Okkulte Kinderopfer", c: "bio", f: "glaube", w: "anspielung", src: "BfV",
    d: "Chiffre für die Behauptung, „jüdische Kreise“ folterten und töteten nicht jüdische Kinder in satanischen Ritualen." },
  { t: "Das allsehende Auge", c: "bio", f: "verschwoerung", w: "zeichen", src: "BfV · REG",
    d: "Popkulturell verankertes Symbol für Geheimgesellschaften. Erzeugt das Gefühl totaler Überwachung durch eine unsichtbare Macht." },
  /* 16.11.2026: Teufels-Emoji und Belege aus Kommentaren ergänzt
     (Bundesverband RIAS, 2026, S. 28; Lorenz, 2025, S. 274, Tab. 1). */
  { t: "Satan / Teufel / kleiner Satan / 😈", c: "bio", f: "glaube", w: "bild", src: "AAS · REG · RIAS · LOR",
    d: "Christlich tradierte Dämonisierung. Im Mittelalter galt ein Teufelspakt als Grundlage für Ritualmord- und Brunnenvergiftungsmythen. Heute steht das Teufels-Emoji in Kommentaren, etwa neben einem Davidstern, und setzt Jüdinnen und Juden mit dem Teufel gleich." },
  /* Pest bis Virus: 16.11.2026 Belege aus TikTok und Kommentaren ergänzt
     (Salhi & Goldhorn, 2025, S. 124; Lorenz, 2025, S. 273; Becker et al., 2024, S. 78). */
  { t: "Pest / Geschwür / Krebs", c: "bio", f: "koerper", w: "bild", src: "BfV · AAS · REG · SG · LOR",
    d: "Krankheitsmetaphern markieren jüdisches Leben als tödliche Gefahr im „Volkskörper“ und legen „Hygienemaßnahmen“ oder operative Entfernung nahe." },
  { t: "Virus / Bazillus / #Covid1948", c: "bio", f: "israel", w: "bild", src: "AAS · DA",
    d: "Israel als Virus dargestellt, unter Bezug auf das Gründungsjahr 1948. 2020 und 2021 tausendfach als Hashtag verbreitet." },

  /* ---------- ENTMENSCHLICHUNG ---------- */
  { t: "Krake", c: "tier", f: "verschwoerung", w: "bild", src: "BfV · AAS · BPB",
    d: "Einer der verbreitetsten Codes der Bildpropaganda: Tentakel umschlingen den Globus. Auch ohne jeden Judenbezug gilt das Motiv als strukturell antisemitisch." },
  /* Schlange: 16.11.2026 Schlangen-Emoji ergänzt (Becker et al., 2024, S. 101;
     Salhi & Goldhorn, 2025, S. 125). */
  { t: "Schlange / 🐍", c: "tier", f: "verschwoerung", w: "bild", src: "AAS · BPB · DA · SG",
    d: "Steht für Hinterlist, Täuschung und Gefahr. „Der Jude“ nehme die Völker in den Würgegriff und vergifte die Menschheit. Verbreitet in Karikaturen im Iran und in der arabischen Welt. In Kommentaren steht heute auch das Schlangen-Emoji für Juden." },
  /* Spinne: 16.11.2026 Beleg als Meme ergänzt (BSAF, 2026a, S. 46). */
  { t: "Spinne", c: "tier", f: "verschwoerung", w: "bild", src: "BfV · REG · BSAF-G",
    d: "Netz und lüsterner Blick verbinden das Motiv der Kontrolle mit einer unterstellten sexuellen Bedrohlichkeit." },
  /* Ratte: 16.11.2026 Ratten-Emoji ergänzt (Bundesverband RIAS, 2026, S. 28–29). */
  { t: "Ratte / 🐀", c: "tier", f: "koerper", w: "bild", src: "BfV · BPB · RIAS",
    d: "Kernmetapher der NS-Propaganda: Jüdinnen und Juden als Krankheitsüberträger und ekelerregende Schädlinge. Als Emoji steht die Ratte heute in Kommentaren und Drohnachrichten, etwa neben der Israelfahne." },
  /* Schwein: 16.11.2026 Schweine-Emoji ergänzt (Bundesverband RIAS, 2026, S. 28). */
  { t: "Schwein / Judensau / 🐷", c: "tier", f: "glaube", w: "bild", src: "AAS · BPB · REG · RIAS",
    d: "Nutzt die religiösen Speisegesetze zur Verhöhnung. Die älteste „Judensau“ am Brandenburger Dom stammt aus dem 13. Jahrhundert. Heute werden auch Schweine-Emojis verwendet, um antisemitische Aussagen zu transportieren." },
  /* Hund: 16.11.2026 Beleg aus Kommentaren ergänzt (Becker et al., 2024, S. 76). */
  { t: "Hund", c: "tier", f: "koerper", w: "bild", src: "BPB · DA",
    d: "Abwertung als minderwertig, mit langer Tradition besonders im arabischen Raum; verwendet bei den Pogromen in Palästina der 1920er- und 1930er-Jahre." },
  /* Parasiten: 16.11.2026 Belege aus TikTok und Kommentaren ergänzt (BSAF, 2024a, S. 34; Becker et al., 2024, S. 77). */
  { t: "Parasiten / Flöhe / Ungeziefer", c: "tier", f: "koerper", w: "bild", src: "BfV · REG · BSAF-R · DA",
    d: "„Schmarotzer ohne eigene Schöpfungskraft“, die vom „Wirtsvolk“ lebten. Markiert jüdisches Leben als biologische Gefahr." },
  /* Neu 16.11.2026: auf TikTok belegt (Salhi & Goldhorn, 2025, S. 125), von
     Delberg als Emoji und Meme-Motiv genannt (E-Mail vom 15.11.2026). Die
     Bedeutung als Ungeziefer nach BfV S. 55. */
  { t: "Kakerlake / 🪳", c: "tier", f: "koerper", w: "bild", src: "SG · BfV",
    d: "Steht in Kommentaren statt des Wortes Juden. Wie Ratten und Ungeziefer setzt die Kakerlake Menschen mit Schädlingen gleich und spricht ihnen das Menschsein ab." },
  /* Neu 16.11.2026: Emoji-Code auf TikTok (BSAF, 2024a, S. 33). */
  { t: "Vampir / 🧛", c: "tier", f: "koerper", w: "bild", src: "BSAF-R",
    d: "Ruft das antisemitische Bild vom „Blutsauger“ auf, der von anderen lebt." },
  { t: "Gharqad-Baum", c: "tier", f: "glaube", w: "anspielung", src: "BfV",
    d: "Aus einer Endzeit-Überlieferung: der „Baum der Juden“, der sie am Ende der Zeiten schütze. Wer davor platziert wird, gilt als Schutzschild „jüdischer Interessen“." },

  /* ---------- SCHULDABWEHR ---------- */
  /* Schuldkult und Schlussstrich: 16.11.2026 Belege aus Social Media ergänzt
     (BSAF, 2025, S. 6; Ebbrecht-Hartmann, 2024, S. 16). */
  { t: "Schuldkult", c: "schuld", f: "schuld", w: "anspielung", src: "BfV · AAS · REG · BSAF-M",
    d: "Geschichtsrevisionistischer Kampfbegriff. Diffamiert das Gedenken an die NS-Verbrechen als aufgezwungen und übertrieben, um Verantwortung abzustreifen." },
  { t: "Schlussstrich", c: "schuld", f: "schuld", w: "anspielung", src: "AAS · REG · EH",
    d: "Forderung, die Auseinandersetzung mit der NS-Vergangenheit zu beenden. Zentrale Form des Post-Shoah-Antisemitismus." },
  { t: "Holocaust-Religion", c: "schuld", f: "schuld", w: "anspielung", src: "BfV · REG",
    d: "Rahmt die Erinnerungskultur als dogmatischen, faktenfreien Glauben und stellt damit den Holocaust selbst infrage." },
  { t: "Umerziehung", c: "schuld", f: "schuld", w: "anspielung", src: "BfV · REG",
    d: "Kampfbegriff mit Gehirnwäsche-Assoziation: Die Deutschen würden bis heute manipuliert, um ihr „natürliches“ Nationalbewusstsein zu zerstören." },
  { t: "Psychologischer Völkermord", c: "schuld", f: "schuld", w: "anspielung", src: "BfV",
    d: "Erklärt das Erinnern zum eigentlichen Verbrechen, an „den Deutschen“. Klassische Täter-Opfer-Umkehr." },
  /* Muh 6 Gorillion: 16.11.2026 Beleg auf TikTok ergänzt (Salhi & Goldhorn, 2025, S. 136). */
  { t: "Muh 6 Gorillion", c: "schuld", f: "schuld", w: "zahl", src: "BfV · SG",
    d: "Auf Imageboards verbreitete Verhöhnung der rund sechs Millionen Ermordeten. Die bewusste Falschschreibung soll die Opferzahl lächerlich machen." },
  /* 271k: 16.11.2026 Schreibweisen und Belege ergänzt (Salhi & Goldhorn, 2025,
     S. 135–137; BSAF, 2025, S. 10–11; ADL, 2025). Von Delberg als 271,
     271000 und 271k genannt (E-Mail vom 15.11.2026). */
  { t: "271k / 271.000 / 271", c: "schuld", f: "schuld", w: "zahl", src: "BfV · SG · BSAF-M · ADL",
    d: "Behauptet, in den Konzentrations- und Vernichtungslagern seien „nur“ 271.000 Menschen gestorben. Holocaustleugnung in Zahlenform. Auf TikTok steht die Zahl oft ohne Erklärung unter Beiträgen jüdischer Creator:innen." },
  /* 16.11.2026: „Holohoax“ als Schreibweise aus Telegram und TikTok ergänzt
     (Topor, 2025, S. 35; Salhi & Goldhorn, 2025, S. 136). */
  { t: "Holohoax / 6-Millionen-Lüge / Auschwitzlüge", c: "schuld", f: "schuld", w: "offen", src: "REG · SG",
    d: "Offene Leugnung des Holocaust. In Deutschland als Volksverhetzung strafbar." },
  /* Neu 07.11.2026: auf TikTok belegt, mit zweiter Quelle bestätigt
     (Schnabel & Berendsen, 2024, S. 19; Bundesverband RIAS, 2026, S. 25; Becker, 2024b, S. 375–377). */
  { t: "„Auschwitz = Gaza“", c: "schuld", f: "schuld", w: "offen", src: "BSAF · RIAS · DA",
    d: "Setzt Israel mit dem NS-Regime und Gaza mit dem Vernichtungslager gleich. Damit wird der Holocaust verharmlost, und Jüdinnen und Juden werden von Opfern zu Tätern gemacht." },

  /* ---------- ISRAELBEZOGEN ---------- */
  /* Zionisten bis Rotes Dreieck: 16.11.2026 Belege aus Social Media ergänzt
     (BSAF, 2026a, S. 20, 25; BSAF, 2024a, S. 34; Becker et al., 2024, S. 50, 54;
     Bundesverband RIAS, 2026, S. 29, 37). ZOG nennt auch Delberg (E-Mail vom 15.11.2026). */
  { t: "Zionisten / ZiOS", c: "israel", f: "israel", w: "ersetzung", src: "BfV · AAS · REG · BSAF-G",
    d: "Herabwürdigender Ersatzbegriff für „die Israelis“ oder „die Juden“. Der Zionismus selbst ist eine legitime politische Bewegung, der Code kippt ihn ins Feindbild. Im Netz auch kurz „Zios“." },
  { t: "ZOG / ZORG / JOG", c: "israel", f: "verschwoerung", w: "ersetzung", src: "BfV · AAS · REG · BSAF-R",
    d: "„Zionist“ bzw. „Jewish Occupied Government“: Westliche Regierungen seien Marionetten einer zionistischen bzw. jüdischen Besatzung." },
  { t: "IsraHell", c: "israel", f: "israel", w: "bild", src: "BfV · BSAF-G · DA",
    d: "Kofferwort aus Israel und Hell. Dämonisiert den Staat als Ort des „absolut Bösen“." },
  { t: "Rotes Dreieck", c: "israel", f: "israel", w: "zeichen", src: "BfV · REG · RIAS · EH",
    d: "Seit Ende 2023 in HAMAS-Propaganda als Zielmarkierung verwendet. 2024 vom BMI als Kennzeichen in die Verbotsverfügung aufgenommen, die Verwendung kann strafbar sein. Als Emoji 🔻 steht es auch in Drohnachrichten an Jüdinnen und Juden.", flag: "kennzeichenverbot" },
  { t: "Kindermörder Israel", c: "israel", f: "israel", w: "anspielung", src: "BfV · AAS · REG",
    d: "Aktualisiert die Ritualmordlegende: Israel vergieße das Blut palästinensischer Kinder mit Absicht. Aus dieser Vorstellung können Vernichtungswünsche folgen." },
  /* Neu 07.11.2026: auf TikTok belegt, mit zweiter Quelle bestätigt
     (Schnabel & Berendsen, 2024, S. 18; Placzynta, 2024a, S. 64–65; Chapelan, 2024, S. 181). */
  { t: "Organraub-Vorwurf", c: "israel", f: "israel", w: "anspielung", src: "BSAF · DA",
    d: "Behauptet, Israel habe es auf die Organe palästinensischer Kinder abgesehen. Das ist die extremste Form der alten Ritualmordlegende, nach der Juden Kindern etwas antun, um ihren Körper zu benutzen." },
  { t: "Apartheidstaat / Unrechtsstaat", c: "israel", f: "israel", w: "anspielung", src: "AAS · REG",
    d: "Spricht Israel Rechtsstaatlichkeit und demokratischen Charakter grundsätzlich ab. Der Begriff selbst ist nicht antisemitisch, entscheidend ist der Kontext." },
  /* Zionazis und Krebsgeschwür: 16.11.2026 Belege aus Social Media ergänzt
     (BSAF, 2026a, S. 25; Becker, 2024b, S. 376; Becker et al., 2024, S. 194, 474). */
  { t: "Zionazis", c: "israel", f: "israel", w: "ersetzung", src: "REG · BSAF · DA",
    d: "Gleichsetzung israelischer Politik mit dem Nationalsozialismus. Verharmlost die NS-Verbrechen und kehrt Täter und Opfer um." },
  { t: "Krebsgeschwür (auf Israel bezogen)", c: "israel", f: "israel", w: "bild", src: "REG · DA",
    d: "Von islamistischen Regimen und Gruppen zur Dämonisierung Israels genutzt: Der Staat müsse „entfernt“ werden." },
  /* Überarbeitet 07.11.2026: Stufe „kommt auf den Kontext an“, der Widerspruch
     der Quellen steht offen im Text (Schnabel & Berendsen, 2024, S. 15, 28;
     Vincent et al., 2024, S. 450–451; BfV, 2024, S. 71, Fn. 126, S. 84;
     Bundesverband RIAS, 2026, S. 20–21; Regishut, 2023). */
  { t: "From the river to the sea", c: "israel", f: "israel", w: "anspielung", lvl: "kontext", src: "BSAF · BfV-L · RIAS · DA · REG",
    d: "Viele Fachstellen lesen diese Parole als Absage an Israels Existenz, und deutsche Gerichte haben sie teils als strafbar bewertet. Ob es dabei auf den Zusammenhang ankommt, sehen die Quellen verschieden, denn BfV und RIAS ordnen sie nach dem Umfeld ein, etwa auf einer Demo, während Forschende um Vincent schreiben, ihre Bedeutung hänge nicht vom Kontext ab." },
  /* Stop doing …: 16.11.2026 fast wortgleich in Kommentaren belegt (Becker, 2024b, S. 375). */
  { t: "Stop doing what Hitler did to you", c: "israel", f: "israel", w: "offen", src: "REG · DA",
    d: "Täter-Opfer-Umkehr in Parolenform: Unterstellt Jüdinnen und Juden, aus der Shoah nichts gelernt zu haben und sie zu wiederholen." },

  /* ---------- ZEICHEN & ZAHLEN ---------- */
  { t: "(((Echo)))", c: "zeichen", f: "kontext", w: "zeichen", src: "BfV",
    d: "Dreifache Klammern markieren Personen, Firmen, Organisationen oder Gruppen als „jüdisch“, ohne es auszusprechen. Im Netz weit verbreitet." },
  /* Juice, 109 und 6MWE: 16.11.2026 Belege aus TikTok und Kommentaren ergänzt
     (Bundesverband RIAS, 2026, S. 28; Salhi & Goldhorn, 2025, S. 122–126, 135–136;
     ADL, 2025; Becker et al., 2024, S. 361). 🧃 und 6MWE nennt auch Delberg
     (E-Mail vom 15.11.2026). */
  { t: "Saftpäckchen / Juice / 🧃", c: "zeichen", f: "kontext", w: "ersetzung", src: "BfV · RIAS · SG · ADL",
    d: "Phonetische Nähe zu „Jews“. Als Saftkarton-Emoji verschleiert der Code antisemitische Inhalte und umgeht automatische Moderation." },
  { t: "109 / 110", c: "zeichen", f: "koerper", w: "zahl", src: "BfV · SG",
    d: "Behauptet, Jüdinnen und Juden seien aus 109 Ländern vertrieben worden. Die 110 ist eine offene Aufforderung, das aktuelle Wohnland folgen zu lassen." },
  { t: "6MWE", c: "zeichen", f: "koerper", w: "zahl", src: "BfV · DA · SG",
    d: "„6 Million Wasn't Enough“. Verhöhnt die Opfer des Holocaust und fordert offen einen erneuten Genozid." },
  /* Neu 16.11.2026: von Delberg genannt (E-Mail vom 15.11.2026). Bedeutung nach
     Chapelan & Bolton (2024, S. 353–354), dort mit 88 als Zahlencode; online
     belegt bei Topor (2025, S. 44) und BSAF (2024a, S. 34). */
  { t: "88", c: "zeichen", f: "koerper", w: "zahl", src: "CB · BSAF-R",
    d: "Steht für „Heil Hitler“, weil H der achte Buchstabe des Alphabets ist. Wer Hitler unter Beiträgen zu Jüdinnen und Juden feiert, rechtfertigt damit den Völkermord an ihnen." },
  /* Neu 16.11.2026: auf TikTok belegt (Salhi & Goldhorn, 2025, S. 130–132;
     ADL, 2025), von Delberg als „der Maler“ genannt (E-Mail vom 15.11.2026). */
  { t: "„der Maler“ / „Austrian Painter“", c: "zeichen", f: "koerper", w: "ersetzung", src: "SG · ADL · CB",
    d: "Deckname für Adolf Hitler, nach seiner frühen Tätigkeit als Maler. Er umgeht Filter, die den Namen erkennen würden, und wird auch als Emojis geschrieben, mit Österreich-Flagge und Malerpalette." },
  /* Neu 16.11.2026: Emoji-Code auf TikTok (BSAF, 2024a, S. 33; Lorenz, 2025,
     S. 274, Tab. 1), von Delberg als erhobene Hand und Personen-Emojis genannt
     (E-Mail vom 15.11.2026). */
  { t: "Person mit erhobener Hand / 🙋", c: "zeichen", f: "koerper", w: "zeichen", src: "BSAF-R · LOR · CB",
    d: "Die Person, die den rechten Arm hebt, steht in Kommentaren für den Hitlergruß. Unter Beiträgen zu Jüdinnen und Juden feiert sie den Nationalsozialismus und damit den Holocaust." },
  /* Neu 16.11.2026: auf TikTok belegt (Salhi & Goldhorn, 2025, S. 136, 141),
     von Delberg als Emoji und Meme-Motiv genannt (E-Mail vom 15.11.2026). */
  { t: "Seife / 🧼", c: "zeichen", f: "koerper", w: "zeichen", src: "SG",
    d: "Verhöhnt die Ermordeten des Holocaust. Das Emoji spielt auf die Behauptung an, aus den Leichen sei Seife gemacht worden, und macht die Opfer zum Witz." },
  /* Neu 16.11.2026: auf TikTok belegt (Salhi & Goldhorn, 2025, S. 136, 141),
     von Delberg genannt (E-Mail vom 15.11.2026). Nur im Zusammenhang ein Code,
     das BfV liest das Feuer-Emoji in anderen Posts als bloßes Warnzeichen (S. 26). */
  { t: "Feuer / 🔥", c: "zeichen", f: "koerper", w: "zeichen", src: "SG",
    d: "Unter Beiträgen zu Jüdinnen und Juden steht das Feuer für die Lager des Holocaust und ihre Öfen. Für sich allein ist das Emoji harmlos, erst der Zusammenhang macht es zum Code." },
  /* Neu 16.11.2026: Bundesverband RIAS (2026, S. 29) belegt die Israelfahne
     neben Ratte, Sarg und rotem Dreieck in einer Drohnachricht, das BfV-Lagebild
     (2024, S. A34) ein KI-Bild aus Israelfahne und Schweinen. Dass die Fahne als
     Emoji für Juden steht, schreiben Salhi & Goldhorn (2025, S. 122). Von Delberg
     als Flagge plus Emoji genannt (E-Mail vom 15.11.2026). Den Kothaufen neben
     dem Saftpäckchen belegt RIAS (S. 28), neben der Fahne nur Schnabel & Berendsen
     (2024, S. 13) ohne zweite Quelle, deshalb steht er hier nicht im Titel. */
  { t: "Israelfahne neben Ratte oder Schwein", c: "zeichen", f: "kontext", w: "zeichen", src: "RIAS · BfV-L · SG",
    d: "Die Fahne steht in solchen Kommentaren für Jüdinnen und Juden, das Tier daneben wertet sie ab. Die Fahne allein ist kein Code, erst die Kombination macht sie dazu." },
  /* Hakennase: 16.11.2026 Nasen- und Pinocchio-Emoji ergänzt (Salhi & Goldhorn,
     2025, S. 122, 124–126; Lorenz, 2025, S. 274). */
  { t: "Hakennase / 👃 / 🤥", c: "zeichen", f: "koerper", w: "zeichen", src: "AAS · BPB · REG · SG · LOR",
    d: "Zentrales Merkmal fast jeder antisemitischen Darstellung, von Münzen des 17. Jh. bis zu Stürmer-Karikaturen und heutigen Memes. Macht zugeschriebene Minderwertigkeit körperlich sichtbar. In Kommentaren stehen dafür Nasen- und Pinocchio-Emojis, die auch das Bild vom lügenden Juden aufrufen." },
  /* Neu 07.11.2026: auf TikTok belegt, mit zweiter Quelle bestätigt
     (Schnabel & Berendsen, 2024, S. 14; Ebbrecht-Hartmann, 2024, S. 10). */
  { t: "Filter mit verlängerter Nase", c: "zeichen", f: "koerper", w: "zeichen", src: "BSAF · EH",
    d: "Ein TikTok-Filter verzerrt das Gesicht und verlängert die Nase, dazu läuft das Lied „If I Were a Rich Man“ aus dem Musical „Anatevka“. Zusammen ruft das die alten Bilder von der jüdischen Nase und vom angeblichen jüdischen Reichtum auf." },
  /* Davidstern: 16.11.2026 Belege aus Social Media ergänzt (BSAF, 2026a, S. 19, 22). */
  { t: "Davidstern als Feindmarkierung", c: "zeichen", f: "kontext", w: "zeichen", src: "BfV · REG · BSAF-G",
    d: "Auf Hüten, Stirnen, Flaggen oder Logos angebracht, markiert der Stern den angeblich „wahren Urheber“ hinter einem politischen Geschehen." }
];

/* Kurzbedeutungen für Laufband, Kacheln und Werkzeuge
   (07.11.2026, abends). Jede Kurzbedeutung ist wörtlich aus dem Feld d
   des Eintrags genommen, höchstens gekürzt, mit großem Anfangsbuchstaben
   und Punkt am Ende. Es gibt keine neue Aussage und keinen neuen Code.
   Regel aus dem fachlichen Abgleich vom 25.10.2026: kein Code ohne
   Erklärung. Ins Laufband kommen nur Einträge mit Kurzbedeutung, ohne
   Personennamen (w: "person"), ohne offen Gesagtes (w: "offen") und
   ohne die Kontextstufe.
   16.11.2026: Kurzbedeutungen der herausgenommenen Einträge liegen in
   codes-archiv-2026-11-16.js, die neuen Einträge haben eine Kurzbedeutung
   nach derselben Regel, umbenannte Einträge ihren neuen Schlüssel. */
const KURZ = {
  "Hochfinanz": "Steht für eine angebliche „jüdische Weltfinanzkontrolle“.",
  "Globalisten": "Chiffre für eine „kosmopolitische Elite“ ohne Bindung an Vaterland, Kultur oder Tradition.",
  "Ostküste": "Verweis auf den angeblich jüdisch kontrollierten Finanzstandort New York.",
  "Wall Street": "Synonym für ein „wurzelloses“, internationales „Finanzjudentum“.",
  "Rothschild": "Bankiersfamilie des 18./19. Jh. als Chiffre für eine geheime „jüdische Elite“, die Kriege, Krisen und Katastrophen orchestriere.",
  "Rockefeller": "Solche Personalisierungen markieren „das Judentum“ als globale Finanzelite.",
  "Schekel": "Israelische Währung als Code für „jüdisches“ Geld.",
  "Geldsack- und Geldbündel-Emojis": "Spielen auf die alte Lüge an, Juden seien besonders gierig und reich.",
  "Puppenspieler / Marionette": "Politische Akteure seien nur willenlose Werkzeuge eines „jüdischen Willens“.",
  "Strippenzieher / Drahtzieher": "„Der Jude“ ziehe im Verborgenen die Fäden und lenke so das Weltgeschehen.",
  "Great Reset": "Umgedeutet zum Plan einer „Elite“ zur Versklavung oder Vernichtung der Menschheit.",
  "New World Order (NWO)": "Sammelbegriff für eine drohende „totalitäre Weltregierung“, hinter der „jüdische Strippenzieher“ stünden.",
  "„Israel kontrolliert die Medien“": "Behauptet, Israel oder „die Zionisten“ steuerten heimlich Medien, Wirtschaft und Regierungen der Welt.",
  "„Inside-Job“ / „falsche Flagge“": "Behauptet, Israel habe den Angriff vom 7. Oktober selbst inszeniert.",
  "„Goy“ / „guter Goy“": "Ein „guter Goy“ sei, wer sich von Juden lenken und täuschen lässt.",
  "Adrenochrom": "Die Ritualmordlegende in modernem Gewand.",
  "Das allsehende Auge": "Erzeugt das Gefühl totaler Überwachung durch eine unsichtbare Macht.",
  "Pest / Geschwür / Krebs": "Krankheitsmetaphern markieren jüdisches Leben als tödliche Gefahr im „Volkskörper“.",
  "Virus / Bazillus / #Covid1948": "Israel als Virus dargestellt, unter Bezug auf das Gründungsjahr 1948.",
  "Krake": "Einer der verbreitetsten Codes der Bildpropaganda: Tentakel umschlingen den Globus.",
  "Ratte / 🐀": "Jüdinnen und Juden als Krankheitsüberträger und ekelerregende Schädlinge.",
  "Parasiten / Flöhe / Ungeziefer": "Markiert jüdisches Leben als biologische Gefahr.",
  "Kakerlake / 🪳": "Steht in Kommentaren statt des Wortes Juden.",
  "Vampir / 🧛": "Ruft das antisemitische Bild vom „Blutsauger“ auf, der von anderen lebt.",
  "Schuldkult": "Diffamiert das Gedenken an die NS-Verbrechen als aufgezwungen und übertrieben.",
  "Schlussstrich": "Forderung, die Auseinandersetzung mit der NS-Vergangenheit zu beenden.",
  "Holocaust-Religion": "Rahmt die Erinnerungskultur als dogmatischen, faktenfreien Glauben.",
  "Psychologischer Völkermord": "Erklärt das Erinnern zum eigentlichen Verbrechen, an „den Deutschen“.",
  "Muh 6 Gorillion": "Verhöhnung der rund sechs Millionen Ermordeten.",
  "271k / 271.000 / 271": "Behauptet, in den Konzentrations- und Vernichtungslagern seien „nur“ 271.000 Menschen gestorben.",
  "ZOG / ZORG / JOG": "Westliche Regierungen seien Marionetten einer zionistischen bzw. jüdischen Besatzung.",
  "IsraHell": "Dämonisiert den Staat als Ort des „absolut Bösen“.",
  "Rotes Dreieck": "Seit Ende 2023 in HAMAS-Propaganda als Zielmarkierung verwendet.",
  "Kindermörder Israel": "Aktualisiert die Ritualmordlegende: Israel vergieße das Blut palästinensischer Kinder mit Absicht.",
  "Organraub-Vorwurf": "Behauptet, Israel habe es auf die Organe palästinensischer Kinder abgesehen.",
  "Zionazis": "Gleichsetzung israelischer Politik mit dem Nationalsozialismus.",
  "(((Echo)))": "Dreifache Klammern markieren Personen, Firmen, Organisationen oder Gruppen als „jüdisch“, ohne es auszusprechen.",
  "Saftpäckchen / Juice / 🧃": "Phonetische Nähe zu „Jews“.",
  "109 / 110": "Behauptet, Jüdinnen und Juden seien aus 109 Ländern vertrieben worden. Die 110 ist eine offene Aufforderung, das aktuelle Wohnland folgen zu lassen.",
  "88": "Steht für „Heil Hitler“, weil H der achte Buchstabe des Alphabets ist.",
  "„der Maler“ / „Austrian Painter“": "Deckname für Adolf Hitler, nach seiner frühen Tätigkeit als Maler.",
  "Person mit erhobener Hand / 🙋": "Die Person, die den rechten Arm hebt, steht in Kommentaren für den Hitlergruß.",
  "Seife / 🧼": "Verhöhnt die Ermordeten des Holocaust.",
  "Feuer / 🔥": "Unter Beiträgen zu Jüdinnen und Juden steht das Feuer für die Lager des Holocaust und ihre Öfen.",
  "Israelfahne neben Ratte oder Schwein": "Die Fahne steht in solchen Kommentaren für Jüdinnen und Juden, das Tier daneben wertet sie ab.",
  "Hakennase / 👃 / 🤥": "Macht zugeschriebene Minderwertigkeit körperlich sichtbar."
};

/* Der annotierte Beispiel-Post.
   Konstruiert aus Einzelcodes der Quellen — kein realer Beitrag. */
/* Vier konstruierte Beiträge im Social-Media-Format.
   KEIN reales Material: jeder Beitrag ist aus Einzelcodes der Quellen
   zusammengesetzt, die Profilnamen sind erfunden. Es geht um Analyse,
   nicht um Vorführung. */
const POSTS = [
  {
    handle: "@wach_und_frei_2026",
    meta: "Ausgedacht · Muster: Verschwörungserzählung",
    reply: "Die Idee, dass Juden die Medien kontrollieren, ist über 150 Jahre alt. Und genauso lange falsch. In Deutschland gibt es keine Zensur. Meldungen kann man über mehrere unabhängige Quellen prüfen, Fehler werden benannt. Die Behauptung schützt sich selbst: Jeder Gegenbeweis gilt als gefälscht.",
    replySrc: "Amadeu Antonio Stiftung, nichts-gegen-juden.de: „Die Juden kontrollieren doch die Medien!“",
    parts: [
      { txt: "Wacht endlich auf! Die " },
      { mark: "Hochfinanz", kind: "Begriffsersetzung",
        note: "Ersetzt das belastete Wort. Steht für eine angebliche „jüdische Weltfinanzkontrolle“ und ähnelt dem NS-Terminus „internationales Finanzjudentum“.",
        src: "BfV S. 27 \u00b7 AAS S. 11" },
      { txt: " an der " },
      { mark: "Ostküste", kind: "Begriffsersetzung",
        note: "Verweist auf den angeblich jüdisch kontrollierten Finanzplatz New York, und damit auf Jüdinnen und Juden insgesamt.",
        src: "BfV S. 31 \u00b7 AAS S. 11" },
      { txt: " und " },
      { mark: "(((ihre Freunde)))", kind: "Optisches Zeichen",
        note: "Die dreifachen Klammern („Echo“) markieren eine Gruppe als jüdisch. Der Satz selbst sagt nichts, die Klammern erledigen die Zuschreibung.",
        src: "BfV S. 32" },
      { txt: " haben den " },
      { mark: "Great Reset", kind: "Verschwörungsnarrativ",
        note: "Ursprünglich ein WEF-Konzept für die Zeit nach der Pandemie, umgedeutet zum Plan einer „Elite“ zur Versklavung der Menschheit.",
        src: "BfV S. 39 \u00b7 AAS S. 8" },
      { txt: " längst beschlossen. " },
      /* 16.11.2026: Soros (lebende Person) durch Rothschild und „Lügenpresse“
         (nicht auf Social Media belegt) durch die gekauften Medien ersetzt. */
      { mark: "Rothschild", kind: "Personalisierung",
        note: "Ein Familienname steht für die ganze Gruppe. Rothschild dient als Chiffre für eine angebliche jüdische Elite, die Finanzen und Weltpolitik lenke.",
        src: "BfV S. 34 f. \u00b7 AAS S. 24" },
      { txt: " " },
      { mark: "zieht die Fäden", kind: "Puppenspieler-Motiv",
        note: "Das Marionettenbild unterstellt, sichtbare Politik sei nur Fassade und alle Akteure seien Werkzeuge eines „jüdischen Willens“.",
        src: "BfV S. 37 \u00b7 AAS S. 8" },
      { txt: ", und die " },
      { mark: "gekauften Medien", kind: "Verschwörungsnarrativ",
        note: "Unterstellt, eine geheime jüdische Macht steuere Politik und Medien. Auf TikTok heißt es dann, Israel oder „die Zionisten“ lenkten die Medien.",
        src: "BfV S. 12 · Schnabel & Berendsen 2024, S. 11" },
      { txt: " schweigen." }
    ]
  },
  {
    handle: "@echte.geschichte.de",
    meta: "Ausgedacht · Muster: Schuldabwehr",
    reply: "„Man darf ja nichts sagen“ ist ein alter Satz der radikalen Rechten. Wer ihn sagt, macht sich selbst zum Opfer eines Redeverbots, das es nicht gibt. Erinnern ist kein Kult. Es sorgt dafür, dass so etwas nicht wieder passiert. Wer einen Schlussstrich will, will nicht reden, sondern aufhören.",
    replySrc: "Amadeu Antonio Stiftung, nichts-gegen-juden.de: „Man darf ja nichts sagen …“ \u00b7 AAS S. 31",
    parts: [
      { txt: "Schluss mit dem " },
      { mark: "Schuldkult", kind: "Kampfbegriff",
        note: "Geschichtsrevisionistischer Kampfbegriff. Diffamiert das Gedenken an die NS-Verbrechen als aufgezwungen und übertrieben, um Verantwortung abzustreifen.",
        src: "BfV S. 59 \u00b7 AAS S. 31" },
      { txt: ". Diese " },
      { mark: "Umerziehung", kind: "Kampfbegriff",
        note: "Weckt Assoziationen zu Gehirnwäsche: Die Deutschen würden bis heute manipuliert, um ihr „natürliches“ Nationalbewusstsein zu zerstören.",
        src: "BfV S. 59" },
      { txt: " war von Anfang an ein " },
      { mark: "Plan der Siegermächte", kind: "Verschwörungsnarrativ",
        note: "Bedient klassische Mythen über eine („jüdisch“ gelenkte) Fremdherrschaft: Die Entnazifizierung sei strategisch geplante Beherrschung gewesen.",
        src: "BfV S. 59" },
      /* 16.11.2026: „wir sind die neuen Juden“ (vor allem Corona-Demos, nicht auf
         Social Media belegt) durch „psychologischer Völkermord“ ersetzt, der im
         selben Telegram-Post steht (BfV S. 58 f.). */
      { txt: ". Wer das sagt, wird fertiggemacht. Das ist ein " },
      { mark: "psychologischer Völkermord", kind: "Täter-Opfer-Umkehr",
        note: "Erklärt das Erinnern zum eigentlichen Verbrechen, an „den Deutschen“. Klassische Täter-Opfer-Umkehr.",
        src: "BfV S. 59" },
      { txt: "." }
    ]
  },
  {
    handle: "@nahost.klartext",
    meta: "Ausgedacht · Muster: israelbezogen",
    reply: "Israels Regierung zu kritisieren ist okay und passiert ständig, auch in Israel selbst. Antisemitisch wird es, wenn man den Staat angreift, nur weil es ihn gibt, alte Feindbilder wie den Kindermord auf ihn überträgt oder „die Juden“ insgesamt verantwortlich macht. Nicht das Thema ist das Problem, sondern wie man darüber redet.",
    replySrc: "Amadeu Antonio Stiftung, nichts-gegen-juden.de: „Man darf ja nichts sagen …“ \u00b7 BfV S. 65",
    parts: [
      { txt: "Der " },
      { mark: "Apartheidstaat", kind: "Dämonisierung",
        note: "Spricht Israel Rechtsstaatlichkeit und demokratischen Charakter grundsätzlich ab. Der Begriff allein ist nicht antisemitisch, hier entscheidet, was drumherum steht.",
        src: "AAS S. 16 f. \u00b7 REG S. 70" },
      { txt: " zeigt sein wahres Gesicht. " },
      { mark: "Kindermörder", kind: "Ritualmordlegende",
        note: "Aktualisiert die mittelalterliche Ritualmordlegende: Israel vergieße das Blut von Kindern mit Absicht. Aus dieser Vorstellung können Vernichtungswünsche folgen.",
        src: "BfV S. 67 \u00b7 AAS S. 18 f." },
      { txt: " Und die " },
      { mark: "Zionisten", kind: "Begriffsersetzung",
        note: "Herabwürdigender Ersatzbegriff für „die Israelis“ oder „die Juden“. Der Zionismus selbst ist eine legitime politische Bewegung, der Code kippt ihn ins Feindbild.",
        src: "BfV S. 65 \u00b7 AAS S. 14 f." },
      { txt: " in Washington decken alles. " },
      /* 16.11.2026: „USrael“ (nicht auf Social Media belegt) durch „IsraHell“ ersetzt. */
      { mark: "IsraHell", kind: "Kofferwort",
        note: "Kofferwort aus Israel und Hell. Dämonisiert den Staat als Ort des „absolut Bösen“ und ist auf Social Media gängiger Slang.",
        src: "BfV S. 69 \u00b7 BSAF 2026a, S. 25" },
      { txt: " " },
      { mark: "\ud83d\udd3a", kind: "Zielmarkierung",
        note: "Das rote Dreieck stammt aus HAMAS-Propaganda und diente dort als Zielmarkierung. Seit 2024 vom BMI als Organisationskennzeichen erfasst, die Verwendung kann strafbar sein.",
        src: "BfV S. 68" }
    ]
  },
  {
    handle: "@memes.ohne.filter",
    meta: "Ausgedacht · Muster: Zahlen- und Zeichencodes",
    reply: "Auf Zahlencodes musst du nicht inhaltlich antworten. Da gibt es nichts zu widerlegen. Benenn, was es ist, teil es nicht weiter und melde es. Wer diskutiert, gibt dem Code Reichweite. Wer ihn ignoriert, lässt ihn normal werden. Screenshot und Meldung sind die Antwort.",
    replySrc: "BfV S. 19 (Reichweite als Zweck) \u00b7 Bundesverband RIAS",
    parts: [
      { txt: "Kleine Erinnerung: " },
      { mark: "109", kind: "Zahlencode",
        note: "„Aus 109 Ländern vertrieben“. Die mitgedachte 110 macht daraus eine Drohung. Zahlen erzeugen keine Bilder im Kopf und wirken sachlich, das macht sie wirksam.",
        src: "BfV S. 55" },
      { txt: " Länder können sich nicht irren. Die Wahrheit über " },
      { mark: "\ud83e\uddc3", kind: "Filterumgehung",
        note: "„Juice“ klingt wie „Jews“. Der Saftkarton umgeht automatische Moderationsfilter und markiert die Gruppe zugleich als andersartig.",
        src: "BfV S. 55" },
      /* 16.11.2026: „JDN LGN“ (T-Shirt auf einer Demo, BfV S. 48) durch „271k“ ersetzt. */
      { txt: " will keiner hören. Und es waren nur " },
      { mark: "271k", kind: "Zahlencode",
        note: "Behauptet, in den Lagern seien „nur“ 271.000 Menschen gestorben. Das ist Holocaustleugnung in Zahlenform, auf TikTok oft ohne jede Erklärung.",
        src: "BfV S. 62 · Salhi & Goldhorn 2025, S. 135" },
      { txt: ". Wer es kapiert, kapiert es." }
    ]
  }
];

/* Häufige Fragen. Kurz gehalten, jede Antwort belegt. */
const FAQ = [
  { q: "Darf man Israel denn nicht kritisieren?",
    a: "Doch. Das passiert ständig, auch in Israel selbst. Antisemitisch wird es, wenn man den Staat angreift, nur weil es ihn gibt, alte Feindbilder auf ihn überträgt oder „die Juden“ insgesamt verantwortlich macht. Und „man darf ja nichts sagen“ ist ein alter Satz der radikalen Rechten. Wer ihn sagt, macht sich zum Opfer eines Redeverbots, das es nicht gibt.",
    src: "Amadeu Antonio Stiftung, nichts-gegen-juden.de" },

  { q: "Ich habe jüdische Freunde, dann bin ich doch kein Antisemit.",
    a: "Freundschaften sagen nichts darüber, was jemand denkt. Antisemitismus ist eine Ideologie und hängt nicht an einzelnen Menschen. Die Soziologin Julia Bernstein nennt den Satz eine Abwehrstrategie: Wer merkt, dass die eigene Aussage problematisch ist, schiebt vorher die jüdischen Freunde vor. So soll das Unsagbare sagbar werden.",
    src: "Julia Bernstein, zit. n. nichts-gegen-juden.de" },

  { q: "Ist Antisemitismus nicht vor allem ein Problem von rechts?",
    a: "Nein. Antisemitismus verbindet Gruppen, die sonst wenig teilen: Rechtsextreme, Verschwörungsgläubige, Islamisten, christliche Fundamentalisten und Linke. Er reicht vom Rand bis in die Mitte. Antisemitismus, der die Erinnerung an den Holocaust abwehrt, gibt es links wie rechts.",
    src: "BfV S. 15–17 · Leipziger Autoritarismus-Studie 2024" },

  { q: "Wird da nicht viel hineininterpretiert?",
    a: "Berechtigte Frage. Deshalb entscheidet nie ein einzelnes Wort. Es kommt darauf an, wo etwas steht, wer es sagt, an wen und was vorausgesetzt wird. Ein starkes Zeichen ist, wenn mehrere Codes zusammenkommen. Allein kommen sie fast nie.",
    src: "BfV, „Codes erkennen und einordnen“, S. 21" },

  { q: "Warum reicht es nicht, einfach Fakten zu nennen?",
    a: "Weil Verschwörungserzählungen sich gegen Fakten abschotten: Jeder Gegenbeweis gilt als gefälscht. Mit Argumenten allein kommst du da nicht weiter.",
    src: "Amadeu Antonio Stiftung, nichts-gegen-juden.de" },

  { q: "Woran erkenne ich einen Code, der in keiner Liste steht?",
    a: "An der Machart. Es sind immer dieselben sechs Werkzeuge: vage Anspielung, ein Name für die ganze Gruppe, harmlos klingende Ersatzwörter, abwertende Bilder, Zahlencodes und optische Zeichen. Wer die kennt, braucht keine vollständige Liste. Die gibt es sowieso nicht, weil ständig neue Codes entstehen.",
    src: "BfV, „Werkzeugkasten der Umwegkommunikation“, S. 71 f." }
];

/* Wie Propaganda arbeitet — vier Mechanismen. */
const MECHANIK = [
  { h: "Verzerrung",
    p: "Eine komplizierte Lage wird auf eine einzige Ursache runtergebrochen. Fühlt sich wie Durchblick an, ist aber das Gegenteil.",
    src: "BfV, „Erklärungsfunktion“, S. 27 u. 51" },
  { h: "Emotion",
    p: "Zielt am Verstand vorbei. Löst Angst, Wut oder Ekel aus. Manchmal auch das gute Gefühl, mehr zu wissen als andere.",
    src: "BfV, „Was Codes mit den Rezipierenden machen“, S. 73" },
  { h: "Wiederholung",
    p: "Je öfter du etwas siehst, desto normaler wirkt es. Reichweite ist kein Nebeneffekt, sondern der Zweck.",
    src: "BfV, „Erhöhung der Reichweite“, S. 19" },
  { h: "Feindbild",
    p: "Eine Gruppe wird als schuldig markiert. Das schweißt die eigene Gruppe zusammen und senkt die Hemmschwelle für Angriffe.",
    src: "BfV S. 29 · AAS S. 6" }
];

/* Zahlen, die die Relevanz belegen — jede mit Herkunft. */
const FACTS = [
  { n: "15,6 %",
    p: "der Menschen in Deutschland übertragen ihre Ablehnung von Israels Politik auf „die Juden“.",
    src: "Leipziger Autoritarismus-Studie 2024, zit. n. BfV S. 16" },
  { n: "22,7 %",
    p: "stimmen zu, Israels Politik in Palästina sei so schlimm wie die der Nazis im Zweiten Weltkrieg. Der Vergleich dreht Täter und Opfer um und soll von deutscher Schuld ablenken.",
    src: "Leipziger Autoritarismus-Studie 2024, zit. n. BfV S. 16" },
  { n: "Links wie rechts",
    p: "Antisemitismus, der die Erinnerung an den Holocaust abwehrt, gibt es überall. Egal, ob sich jemand links oder rechts sieht. Das ist kein Randproblem.",
    src: "Decker/Kiess/Brähler 2024, zit. n. BfV S. 16" }
];

/* Was man konkret tun kann. Handlungswissen, keine Appelle. */
const ACTIONS = [
  { h: "Nicht weiterleiten",
    p: "Auch nicht, um dich aufzuregen. Jeder Repost bringt Reichweite, und genau darum geht es. Screenshot statt Teilen.",
    src: "BfV, „Erhöhung der Reichweite“, S. 19" },
  { h: "Belegen",
    p: "Screenshot mit Datum, Profilname und dem, was drumherum steht. Ohne Kontext kann später niemand etwas damit anfangen.",
    src: "Bundesverband RIAS, report-antisemitism.de" },
  { h: "Kontext prüfen",
    p: "Ein einzelnes Wort beweist nichts. Schau, wo es steht, wer es schreibt, an wen und ob mehrere Codes zusammenkommen.",
    src: "BfV, „Codes erkennen und einordnen“, S. 21" },
  { h: "Widersprechen, nicht diskutieren",
    p: "Sag kurz, was du siehst. Lass dich nicht in eine Diskussion ziehen. Reine Fakten helfen gegen Verschwörungserzählungen nicht.",
    src: "Amadeu Antonio Stiftung, nichts-gegen-juden.de" },
  { h: "Hilfe holen",
    p: "Du musst das nicht allein regeln. Sprich mit einer Lehrkraft, einer Vertrauensperson oder einer Meldestelle. Wenn du selbst betroffen bist, kannst du dir Beratung holen.",
    src: "RIAS · BfV-Hinweistelefon" }
];

const QUIZ = [
  {
    q: "Die Hochfinanz an der Ostküste zieht mal wieder die Fäden.",
    ctx: "Kommentar unter einem Zeitungsartikel zur Inflation",
    a: "code",
    why: "Drei Codes in einem Satz. „Hochfinanz“ und „Ostküste“ stehen verschlüsselt für „die Juden“, „die Fäden ziehen“ ruft das Bild vom Puppenspieler auf. Laut BfV ist genau diese Häufung ein starkes Zeichen. Codes kommen selten allein.",
    src: "BfV, Kap. 2.1 · AAS S. 10 f."
  },
  {
    q: "Die Entscheidung der israelischen Regierung halte ich für falsch.",
    ctx: "Wortmeldung in einer Podiumsdiskussion",
    a: "ok",
    why: "Kritik an einer konkreten Entscheidung. Es geht nicht um „die Juden“, und es werden keine antisemitischen Bilder benutzt. Sachliche Kritik an israelischer Politik ist kein Antisemitismus.",
    src: "IHRA-Arbeitsdefinition · REG S. 8 f."
  },
  {
    q: "Interessant, wem die (((Medienhäuser))) so gehören.",
    ctx: "Antwort in einem Diskussionsforum",
    a: "code",
    why: "Die drei Klammern markieren eine Gruppe als jüdisch. Der Satz selbst behauptet nichts, wofür man belangt werden könnte. Die ganze Botschaft steckt in der Schrift. So funktioniert Kommunikation über Umwege.",
    src: "BfV, Exkurs „(((echoing)))“, S. 32"
  },
  {
    q: "109",
    ctx: "Kommentar unter dem Beitrag einer jüdischen Gemeinde",
    a: "code",
    why: "Die Zahl behauptet, Jüdinnen und Juden seien aus genau 109 Ländern vertrieben worden. Mitgemeint ist die 110: Das Land, in dem sie jetzt leben, soll das nächste sein. Das ist eine Drohung.",
    src: "BfV, S. 55"
  },
  {
    q: "NIE WIEDER … FÜR WEN?",
    ctx: "Aufschrift auf einem Demonstrationsplakat",
    a: "grau",
    why: "Das BfV nennt genau dieses Motiv einen Graubereich. Antisemitisch gelesen benutzt es den Holocaust gegen Israel und stellt Erinnerung als Heuchelei hin. Anders gelesen kritisiert es, dass manche Opfer mehr zählen als andere. Es kommt darauf an, wo es steht, wer es zeigt und was sonst noch zu sehen ist.",
    src: "BfV, Kap. 2.5, Fallbeispiel 2, S. 60 f."
  },
  {
    /* 16.11.2026: „JDN LGN“ (T-Shirt auf einer Demo) und „Wir sind die neuen
       Juden.“ (Kundgebung) durch zwei auf Social Media belegte Codes ersetzt. */
    q: "271k",
    ctx: "Kommentar unter dem TikTok-Video einer jüdischen Creatorin",
    a: "code",
    why: "Die Zahl behauptet, im Holocaust seien „nur“ 271.000 Menschen gestorben. Das ist Holocaustleugnung in Zahlenform. Auf TikTok steht sie oft ohne jede Erklärung unter Beiträgen jüdischer Creator:innen, wer Bescheid weiß, versteht sie trotzdem.",
    src: "Salhi & Goldhorn 2025, S. 135–137 · BfV S. 62"
  },
  {
    q: "Guter Goy. Macht genau, was man ihm sagt.",
    ctx: "Kommentar unter dem Post eines Politikers, der sich gegen Antisemitismus ausspricht",
    a: "code",
    why: "„Goy“ ist das jiddische Wort für Nichtjuden. Im Netz wird es abwertend benutzt: Ein „guter Goy“ sei, wer sich von Juden lenken und täuschen lässt. Dahinter steckt die Erzählung einer heimlichen jüdischen Macht.",
    src: "Jensen 2025, S. 26 · Salhi & Goldhorn 2025, S. 124"
  },
  {
    q: "BlackRock hat enormen Einfluss auf die Finanzmärkte.",
    ctx: "Satz aus einer Wirtschaftssendung",
    a: "grau",
    why: "Als Tatsache kein Problem. Zum Code wird der Name erst, wenn er in einer Geschichte über geheime Steuerung steht, neben Wörtern wie „Globalisten“ oder „Hochfinanz“. Kapitalismuskritik wird antisemitisch, wenn sie alles auf eine Gruppe schiebt.",
    src: "BfV Kap. 2.1 · AAS S. 10 f."
  }
];

const TOOLS = [
  { n: "Werkzeug 1", h: "Vage Anspielung",
    p: "Andeutungen, die man nur mit Vorwissen versteht. Wörtlich ergeben sie oft keinen Sinn. Aber sie machen Stimmung und säen Verdacht.",
    codes: ["Psychologischer Völkermord", "Schuldkult"] },
  { n: "Werkzeug 2", h: "Personalisierung",
    p: "Ein Name steht für die ganze Gruppe. So wirkt es, als gäbe es eine „jüdische Macht“. Ständig kommen neue Namen dazu.",
    codes: ["Rothschild", "Rockefeller"] },
  /* 16.11.2026: Beispiele auf Social-Media-Codes umgestellt (Soros, Fink
     und JDN LGN sind im Archiv). */
  { n: "Werkzeug 3", h: "Begriffsersetzung",
    p: "Ein belastetes Wort wird durch ein harmlos klingendes ersetzt. Der Satz wirkt unauffällig. Wer widerspricht, bekommt zu hören, er interpretiere zu viel hinein.",
    codes: ["Globalisten", "Saftpäckchen / Juice / 🧃"] },
  { n: "Werkzeug 4", h: "Abwertendes Bild",
    p: "Tier- und Krankheitsbilder sprechen Menschen das Menschsein ab und machen Angst. Sie legen nahe, man müsse sie „beseitigen“.",
    codes: ["Krake", "Ratte / 🐀", "Kakerlake / 🪳"] },
  { n: "Werkzeug 5", h: "Zahlencode",
    p: "Zahlen lösen erst mal keine Bilder im Kopf aus. Genau das macht sie wirksam: Für Außenstehende bedeuten sie nichts, für Eingeweihte sind sie ein Erkennungszeichen.",
    codes: ["109 / 110", "271k / 271.000 / 271", "88"] },
  { n: "Werkzeug 6", h: "Optisches Zeichen",
    p: "Verzerrte Körpermerkmale, veränderte Schrift oder Emojis. Sie tarnen die Botschaft und markieren zugleich. Gleichgesinnte erkennen sich daran.",
    codes: ["(((Echo)))", "Geldsack- und Geldbündel-Emojis", "Seife / 🧼"] }
];

/* Die vier Wirkebenen (BfV S. 73). Seit dem Umbau vom 07.11.2026 als
   Grafik im Abschnitt Werkzeuge. Gedankenstriche durch Satzzeichen ersetzt,
   Inhalt unverändert. Die Zeichen zeigen den Vorgang, kein Motiv aus den
   Codes-Listen (Grundsatz aus dem Briefing für die Icons). */
const LEVELS = [
  { h: "Emotional", p: "Zieht am Verstand vorbei und löst im Unterbewusstsein eine instinktive Reaktion aus: Angst, Wut, Ekel oder das gute Gefühl, ein „Wissender“ zu sein.",
    icon: '<path d="M6 34h12l6-14 8 28 7-20 5 6h14"/>' },
  { h: "Kognitiv", p: "Setzt Deutungsrahmen. Konstruiert Feindbilder, reduziert Komplexität auf gut und böse und untergräbt das Vertrauen in Institutionen.",
    icon: '<path d="M10 14h44v36H10z"/><path d="M32 14v36"/>' },
  { h: "Moralisch", p: "Höhlt demokratische Werte schleichend aus. Entmenschlichung senkt die Hemmschwelle für Beleidigungen und Angriffe und normalisiert Antisemitismus.",
    icon: '<path d="M8 16h16v14h16v14h16"/>' },
  { h: "Handlung", p: "Fordert dazu auf, die passive Rolle zu verlassen: Solidarisierung, Parteinahme, im Extremfall Mobilisierung zu unmittelbarer Gewalt.",
    icon: '<path d="M10 20v34h34"/><path d="M26 38 52 12M34 12h18v18"/>' }
];

const SOURCES = [
  { k: "BfV", t: "Versteckte Botschaften – Antisemitische Codes und Chiffren",
    d: "Bundesamt für Verfassungsschutz, Köln, Mai 2026. 80 Seiten, Fallbeispiele aus der Fachpraxis, Systematik der „Umwegkommunikation“." },
  { k: "AAS", t: "deconstruct antisemitism! Antisemitische Codes und Metaphern erkennen",
    d: "Amadeu Antonio Stiftung, Berlin 2021. Publikation der Bildungs- und Aktionswochen gegen Antisemitismus." },
  { k: "REG", t: "Antisemitismus erkennen. Symbole, Codes und Parolen",
    d: "Regishut, Berlin 2023. Nach politischen Spektren gegliedert, mit umfangreichem Register und Angaben zur Strafbarkeit." },
  { k: "BPB", t: "Dossier Antisemitismus – Glossar",
    d: "Bundeszentrale für politische Bildung. Herkunft und heutige Verwendung einzelner Metaphern, u. a. Tiermetaphern." },
  { k: "LAS", t: "Leipziger Autoritarismus-Studie 2024",
    d: "Decker/Kiess/Brähler, zitiert nach BfV." },
  { k: "NGJ", t: "nichts-gegen-juden.de",
    d: "Amadeu Antonio Stiftung." },
  { k: "RIAS", t: "report-antisemitism.de · Antisemitische Vorfälle in Deutschland 2025",
    d: "Bundesverband RIAS. Jahresbericht 2025, erschienen 2026." },
  { k: "BSAF", t: "Die TikTok-Intifada. Der 7. Oktober & die Folgen im Netz",
    d: "Schnabel, D. & Berendsen, E., Bildungsstätte Anne Frank, 2024. Codes daraus nur mit zweiter, unabhängiger Quelle." },
  { k: "DA", t: "Decoding antisemitism. A guide to identifying antisemitism online",
    d: "Becker, M. J., Troschke, H., Bolton, M. & Chapelan, A. (Hrsg.), Palgrave Macmillan, 2024. Kapitel von Becker, Chapelan, Placzynta und Vincent et al." },
  { k: "BfV-L", t: "Lagebild Antisemitismus 2022/23",
    d: "Bundesamt für Verfassungsschutz, 2024." },
  { k: "LOR", t: "Von Hashtags und Geschichte",
    d: "Lorenz, A., Publizistik 70 (1), 2025, S. 261–287." },
  { k: "EH", t: "Memefizierter Antisemitismus",
    d: "Ebbrecht-Hartmann, T., CARS Working Papers Nr. 21, 2024." },
  /* Neu 16.11.2026 mit dem Umbau auf Social-Media-Codes. */
  { k: "SG", t: "Memefication of antisemitism. Antisemitic content on TikTok",
    d: "Salhi, M. & Goldhorn, Y., in Becker, M. J., Scheiber, M. & Jensen, U. (Hrsg.), Imagery of hate online, Open Book Publishers, 2025, S. 107–152." },
  { k: "BSAF-R", t: "Das TikTok-Universum der (extremen) Rechten",
    d: "Bildungsstätte Anne Frank, Report #RechteJugend, 2024." },
  { k: "BSAF-G", t: "Zwischen Gym und Weltverschwörung",
    d: "Bildungsstätte Anne Frank, IV. Digital-Report, 2026." },
  { k: "BSAF-M", t: "Der Holocaust als Meme",
    d: "Bildungsstätte Anne Frank, Report #revisionismus40, 2025." },
  { k: "CB", t: "Affirmation of Nazis, Hitler and the Holocaust",
    d: "Chapelan, A. & Bolton, M., in Decoding antisemitism, Palgrave Macmillan, 2024, S. 353–367." },
  { k: "ADL", t: "Coded Hate: Extremists weaponize seemingly innocuous content to promote bigotry",
    d: "Anti-Defamation League, Center on Extremism, 07.08.2025, aktualisiert 2026." },
];
