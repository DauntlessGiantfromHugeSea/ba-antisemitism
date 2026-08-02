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
   Bildrepertoire, das es tatsächlich benutzt. */
const CATEGORIES = [
  { id: "geld", label: "Geldmacht", claim: "„Sie kontrollieren das Geld.“", catSrc: "BfV Kap. 2.1 · AAS S. 10 f.",
    icon: '<circle cx="32" cy="32" r="13"/><path d="M32 14v36M24 22h13a5 5 0 0 1 0 10H27a5 5 0 0 0 0 10h13"/>' },

  { id: "welt", label: "Weltverschwörung", claim: "„Sie ziehen die Fäden.“", catSrc: "BfV Kap. 2.2 · REG S. 30–39",
    icon: '<path d="M10 12h44M22 12v10M42 12v10M32 12v8"/><path d="M32 20a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"/><path d="M32 32v10M32 42l-9 12M32 42l9 12M22 22l-6 10M42 22l6 10"/>' },

  { id: "bio", label: "Krankheit & Blut", claim: "„Sie vergiften uns.“", catSrc: "BfV Kap. 2.3 · REG S. 40–45",
    icon: '<path d="M4 32s11-15 28-15 28 15 28 15-11 15-28 15S4 32 4 32z"/><circle cx="32" cy="32" r="8"/><circle cx="32" cy="32" r="2.5" fill="currentColor"/>' },

  { id: "tier", label: "Entmenschlichung", claim: "„Sie sind keine Menschen.“", catSrc: "BfV Kap. 2.4 · bpb, Tiermetaphern",
    icon: '<path d="M32 8c9 0 15 7 15 15v6c0 3 2 4 4 5"/><path d="M32 8c-9 0-15 7-15 15v6c0-3-2 4-4 5"/><circle cx="26" cy="22" r="2.5" fill="currentColor"/><circle cx="38" cy="22" r="2.5" fill="currentColor"/><path d="M17 30c-4 6-9 10-13 12M22 33c-3 8-6 14-10 18M32 34c0 9-1 16-2 22M42 33c3 8 6 14 10 18M47 30c4 6 9 10 13 12"/>' },

  { id: "schuld", label: "Schuldabwehr", claim: "„Schluss damit.“", catSrc: "BfV Kap. 2.5 · AAS S. 30 f.",
    icon: '<path d="M12 20h40M12 30h28M12 40h34"/><path d="M6 52h52" stroke-width="7"/>' },

  { id: "israel", label: "Israelbezogen", claim: "„Der Staat ist das Böse.“", catSrc: "BfV Kap. 2.6 · REG S. 64–74",
    icon: '<path d="M32 52 8 12h48L32 52z"/>' },

  { id: "zeichen", label: "Zeichen & Zahlen", claim: "„Wer’s weiß, weiß es.“", catSrc: "BfV S. 71 f.",
    icon: '<path d="M26 10C16 18 12 25 12 32s4 14 14 22M34 10c10 8 14 15 14 22s-4 14-14 22"/><path d="M20 14c-6 6-9 12-9 18s3 12 9 18M44 14c6 6 9 12 9 18s-3 12-9 18"/>' }
];

const CODES = [
  /* ---------- GELDMACHT ---------- */
  { t: "Hochfinanz", c: "geld", src: "BfV · AAS",
    d: "Steht für eine angebliche „jüdische Weltfinanzkontrolle“ und zeichnet das Bild eines geheimen, staatenlenkenden Zirkels. Ähnelt dem NS-Terminus „internationales Finanzjudentum“." },
  { t: "Globalisten", c: "geld", src: "BfV · REG",
    d: "Chiffre für eine „kosmopolitische Elite“ ohne Bindung an Vaterland, Kultur oder Tradition, die nationale Souveränität zugunsten internationaler Organisationen untergrabe." },
  { t: "Ostküste", c: "geld", src: "BfV · AAS",
    d: "Geografischer Verweis auf den angeblich jüdisch kontrollierten Finanzstandort New York — und damit auf Jüdinnen und Juden im Allgemeinen." },
  { t: "Wall Street", c: "geld", src: "BfV · AAS",
    d: "Synonym für ein „wurzelloses“, internationales „Finanzjudentum“. Rahmt den Kapitalismus als fremde, feindselige Macht gegen die nationale Gemeinschaft." },
  { t: "Raffendes vs. schaffendes Kapital", c: "geld", src: "AAS · REG",
    d: "Künstliche Trennung: „schaffende“ (einheimische) Arbeit gegen „raffendes“ (angeblich jüdisches) Finanzkapital. Kernformel der NS-Wirtschaftspropaganda." },
  { t: "Großkapitalisten", c: "geld", src: "BfV",
    d: "Zeichnet das Feindbild eines gierigen Ausbeuters ohne Loyalität zu „Volk und Nation“ — dieselbe Trennung wie raffend/schaffend." },
  { t: "Zinsknechtschaft", c: "geld", src: "REG",
    d: "NS-Kampfbegriff. Unterstellt, ein jüdisch gedachtes Finanzwesen halte das „schaffende Volk“ durch Zinsen in Abhängigkeit." },
  { t: "Rothschild", c: "geld", src: "BfV · AAS · REG",
    d: "Bankiersfamilie des 18./19. Jh. als Chiffre für eine geheime „jüdische Elite“, die Kriege, Krisen und Katastrophen orchestriere. Titel eines NS-Propagandafilms von 1940." },
  { t: "George Soros", c: "geld", src: "BfV · AAS · REG",
    d: "Personifiziert „Hochfinanz“, „Globalisten“ und „Kosmopoliten“. Zentrale Projektionsfläche für den „Drahtzieher“ im Hintergrund." },
  { t: "Larry Fink", c: "geld", src: "BfV",
    d: "Neuerer personifizierter Code für „jüdische Finanzmacht“; ergänzt Rothschild und Soros. Zeigt, wie Vorurteile auf immer neue Akteure übertragen werden." },
  { t: "Rockefeller", c: "geld", src: "BfV · AAS",
    d: "Die Familie hat keine jüdischen Wurzeln, wird aber mit den Rothschilds gleichgesetzt. Solche Personalisierungen markieren „das Judentum“ als globale Finanzelite." },
  { t: "Warburg", c: "geld", src: "BfV",
    d: "Jüdische Bankiersfamilie; Paul Warburgs Rolle bei der Gründung der US-Notenbank dient als Aufhänger für Verschwörungsmythen." },
  { t: "BlackRock", c: "geld", src: "BfV",
    d: "Fungiert als Code, der das Narrativ einer „jüdischen Weltfinanzkontrolle“ bedient. Sachliche Kritik am Einfluss von Vermögensverwaltern ist davon zu unterscheiden — der Kontext entscheidet." },
  { t: "Goldman Sachs", c: "geld", src: "REG",
    d: "Bankname als Chiffre für eine angeblich jüdisch gesteuerte Weltwirtschaft." },
  { t: "Geldjude / Wucherer", c: "geld", src: "BfV · AAS",
    d: "Bildformel des sozialen Antisemitismus: Geldsäcke, Dollarzeichen, der dick-dünn-Kontrast zwischen Ausbeuter und Ausgebeutetem." },
  { t: "Schnorrer", c: "geld", src: "REG",
    d: "Abwertung als unproduktiv und schmarotzend — Brücke zwischen sozialem Antisemitismus und Parasiten-Metaphorik." },
  { t: "Schekel", c: "geld", src: "BfV",
    d: "Israelische Währung als Code für „jüdisches“ Geld. Markiert Profit und Besitz als jüdisch." },
  { t: "Happy Merchant", c: "geld", src: "BfV · AAS",
    d: "Karikatur-Meme mit langer krummer Nase, unförmigen Zähnen, Buckel, Bart, Kippa und reibenden Händen. Extrem hoher Verbreitungsgrad in digitalen Räumen." },

  /* ---------- WELTVERSCHWÖRUNG ---------- */
  { t: "Puppenspieler / Marionette", c: "welt", src: "BfV · AAS · REG",
    d: "Fäden, Stöcke und Hände von oben: Politische Akteure seien nur willenlose Werkzeuge eines „jüdischen Willens“. Delegitimiert jede sichtbare Politik als Fassade." },
  { t: "Strippenzieher / Drahtzieher", c: "welt", src: "AAS · REG",
    d: "„Der Jude“ ziehe im Verborgenen die Fäden und lenke so das Weltgeschehen. Verbindet alle Verschwörungsnarrative miteinander." },
  { t: "Großer Austausch / Umvolkung", c: "welt", src: "AAS · REG",
    d: "Behauptet, eine — jüdisch gedachte — globale Elite wolle die weiße Bevölkerung durch Einwanderung ersetzen. Bezugspunkt der Attentäter von Christchurch und Halle 2019." },
  { t: "Great Reset", c: "welt", src: "BfV · AAS · REG",
    d: "Ursprünglich ein WEF-Konzept für die Zeit nach der Coronapandemie, umgedeutet zum Plan einer „Elite“ zur Versklavung oder Vernichtung der Menschheit." },
  { t: "New World Order (NWO)", c: "welt", src: "BfV · AAS · REG",
    d: "Sammelbegriff für eine drohende „totalitäre Weltregierung“, hinter der „jüdische Strippenzieher“ stünden, um Nationalstaaten aufzulösen." },
  { t: "Deep State", c: "welt", src: "REG",
    d: "Behauptet einen verborgenen Machtapparat hinter der gewählten Regierung. In antisemitischen Kontexten jüdisch konnotiert." },
  { t: "Illuminati", c: "welt", src: "BfV · REG",
    d: "1776 gegründeter, 1785 verbotener Geheimorden. Sein Name dient heute als Chiffre für eine fiktive, im Verborgenen agierende „Weltregierung“." },
  { t: "Freimaurer", c: "welt", src: "BfV · REG",
    d: "Ethischer Bund, in Verschwörungserzählungen mit jüdischen Familien verknüpft zum Feindbild einer „jüdisch-freimaurerischen Weltverschwörung“." },
  { t: "Bilderberger", c: "welt", src: "BfV · REG",
    d: "Die Intransparenz der seit 1954 stattfindenden Konferenz dient als Code für eine „geheime Weltregierung“ unter „jüdischem Einfluss“." },
  { t: "tptb — the powers that be", c: "welt", src: "BfV",
    d: "„Die herrschenden Mächte“. Bewusst vage gehalten, markiert eine anonyme, meist jüdisch gedachte „Weltelite“." },
  { t: "Kalergi-Plan", c: "welt", src: "BfV · REG",
    d: "Nach Richard Coudenhove-Kalergi. Behauptet, „Eliten“ planten den Austausch der weißen Bevölkerung — oft verknüpft mit „jüdischer Steuerung“." },
  { t: "Kaufman-Plan", c: "welt", src: "BfV · REG",
    d: "Ein folgenloses Pamphlet von 1941, von der NS-Propaganda zum Beleg einer „jüdischen Vernichtungslust“ gegen die Deutschen umgedeutet." },
  { t: "Hooton-Plan", c: "welt", src: "REG",
    d: "Wie der Kaufman-Plan: ein historischer Vorschlag, umgedeutet zum Beleg eines geplanten „Völkermords an den Deutschen“." },
  { t: "Protokolle der Weisen von Zion", c: "welt", src: "REG",
    d: "Anfang des 20. Jh. verbreitete Fälschung, die einen jüdischen Plan zur Weltherrschaft behauptet. Bis heute Grundtext antisemitischer Verschwörungsideologie." },
  { t: "QAnon / WWG1WGA", c: "welt", src: "AAS · REG",
    d: "Erzählung von einer satanistischen Elite, die Kinder entführe, foltere und töte. Strukturell die Ritualmordlegende in digitaler Form." },
  { t: "Kabale", c: "welt", src: "BfV · REG",
    d: "Ursprünglich ein Begriff der jüdischen Mystik, umgedeutet zu bösartigen „Drahtziehern“ eines industriellen Kinderhandels." },
  { t: "JewSA / Jewnited States", c: "welt", src: "BfV · AAS",
    d: "Kofferwörter aus Jew und USA. Unterstellen, die Vereinigten Staaten stünden unter jüdischer Kontrolle und seien Werkzeug jüdischer Interessen." },
  { t: "Lügenpresse", c: "welt", src: "AAS · REG",
    d: "Behauptet, die Medien seien gleichgeschaltet und gesteuert. Dahinter steht oft das Narrativ einer „jüdischen Verschwörung“ — schon Treitschke behauptete das im 19. Jh." },
  { t: "Tavistock-Institut", c: "welt", src: "BfV",
    d: "Britische Forschungseinrichtung von 1947, in Verschwörungsmythen zur Zentrale globaler „Gedankenkontrolle“ erklärt." },
  { t: "Staat im Staate", c: "welt", src: "REG",
    d: "Unterstellt Jüdinnen und Juden mangelnde Loyalität und eine verborgene Parallelmacht innerhalb der Nation." },
  { t: "Reptiloiden", c: "welt", src: "REG",
    d: "Behauptung einer nicht-menschlichen Herrscherkaste. Verbindet Entmenschlichung mit dem Weltverschwörungsnarrativ." },

  /* ---------- KRANKHEIT & BLUT ---------- */
  { t: "Ritualmordlegende", c: "bio", src: "BfV · AAS · REG",
    d: "Seit 1475 (Trient) tradierter Vorwurf, Jüdinnen und Juden töteten christliche Kinder, um deren Blut zu verwenden. Löste über Jahrhunderte Verfolgungswellen aus." },
  { t: "Adrenochrom", c: "bio", src: "BfV · REG",
    d: "Fiktive Verjüngungsdroge, angeblich aus dem Blut gefolterter Kinder gewonnen. Die Ritualmordlegende in modernem Gewand." },
  { t: "Okkulte Kinderopfer", c: "bio", src: "BfV",
    d: "Chiffre für die Behauptung, „jüdische Kreise“ folterten und töteten nicht jüdische Kinder in satanischen Ritualen." },
  { t: "Brunnenvergifter", c: "bio", src: "BfV · AAS · REG",
    d: "Legende aus der Pestzeit ab 1347: Jüdische Gemeinden hätten das Trinkwasser vergiftet. Mündete in die Pestpogrome." },
  { t: "Das allsehende Auge", c: "bio", src: "BfV · REG",
    d: "Popkulturell verankertes Symbol für Geheimgesellschaften. Erzeugt das Gefühl totaler Überwachung durch eine unsichtbare Macht." },
  { t: "Satan / Teufel / kleiner Satan", c: "bio", src: "AAS · REG",
    d: "Christlich tradierte Dämonisierung. Im Mittelalter galt ein Teufelspakt als Grundlage für Ritualmord- und Brunnenvergiftungsmythen." },
  { t: "Gottesmörder / Jesusmörder", c: "bio", src: "REG",
    d: "Vorwurf christlicher Kirchenväter, „die Juden“ trügen die Schuld am Tod Jesu. Diente jahrhundertelang zur Rechtfertigung von Verfolgung." },
  { t: "Big Pharma", c: "bio", src: "BfV",
    d: "Steht für eine „jüdisch“ kontrollierte Pharmaindustrie, die die Menschheit vergifte oder unfruchtbar mache statt sie zu heilen." },
  { t: "Plandemie", c: "bio", src: "BfV · REG",
    d: "Unterstellt, Pandemien seien geplante biologische Angriffe einer geheimen „Elite“ zur Erlangung totaler Kontrolle." },
  { t: "Giftspritze", c: "bio", src: "AAS",
    d: "Bezeichnung für Impfungen als Mittel zur Dezimierung der Menschheit. Antisemitische Impferzählungen reichen bis ins 19. Jahrhundert zurück." },
  { t: "Schulmedizin", c: "bio", src: "BfV",
    d: "Diffamierung evidenzbasierter Medizin als „jüdisch“; ihr gegenübergestellt wird eine „natürliche“ oder „germanische“ Heilkunde." },
  { t: "Pest / Geschwür / Krebs", c: "bio", src: "BfV · AAS · REG",
    d: "Krankheitsmetaphern markieren jüdisches Leben als tödliche Gefahr im „Volkskörper“ und legen „Hygienemaßnahmen“ oder operative Entfernung nahe." },
  { t: "Virus / Bazillus / #Covid1948", c: "bio", src: "AAS",
    d: "Israel als Virus dargestellt, unter Bezug auf das Gründungsjahr 1948. 2020 und 2021 tausendfach als Hashtag verbreitet." },
  { t: "Dajjal", c: "bio", src: "BfV",
    d: "Islamische Endzeitfigur, vergleichbar dem Antichristen. Die Gleichsetzung des jüdischen Messias mit dem Dajjal deutet den jüdischen Glauben zum „absolut Bösen“ um." },
  { t: "Moloch", c: "bio", src: "REG",
    d: "Antike Gottheit, der Kinderopfer zugeschrieben wurden. Dient in Verschwörungserzählungen als Chiffre für einen jüdisch gedachten „Blutkult“." },

  /* ---------- ENTMENSCHLICHUNG ---------- */
  { t: "Krake", c: "tier", src: "BfV · AAS · BPB",
    d: "Einer der verbreitetsten Codes der Bildpropaganda: Tentakel umschlingen den Globus. Auch ohne jeden Judenbezug gilt das Motiv als strukturell antisemitisch." },
  { t: "Schlange", c: "tier", src: "AAS · BPB",
    d: "Steht für Hinterlist, Täuschung und Gefahr. „Der Jude“ nehme die Völker in den Würgegriff und vergifte die Menschheit. Verbreitet in Karikaturen im Iran und in der arabischen Welt." },
  { t: "Spinne", c: "tier", src: "BfV · REG",
    d: "Netz und lüsterner Blick verbinden das Motiv der Kontrolle mit einer unterstellten sexuellen Bedrohlichkeit." },
  { t: "Ratte", c: "tier", src: "BfV · BPB",
    d: "Kernmetapher der NS-Propaganda: Jüdinnen und Juden als Krankheitsüberträger und ekelerregende Schädlinge." },
  { t: "Schwein / Judensau", c: "tier", src: "AAS · BPB · REG",
    d: "Nutzt die religiösen Speisegesetze zur Verhöhnung. Die älteste „Judensau“ am Brandenburger Dom stammt aus dem 13. Jahrhundert." },
  { t: "Söhne von Affen und Schweinen", c: "tier", src: "BfV · REG",
    d: "Aus Koranversen hergeleitete Diffamierung als gottverfluchte, minderwertige Wesen. Wird von Islamist:innen zur Rechtfertigung von Gewalt herangezogen." },
  { t: "Hund", c: "tier", src: "BPB",
    d: "Abwertung als minderwertig, mit langer Tradition besonders im arabischen Raum; verwendet bei den Pogromen in Palästina der 1920er- und 1930er-Jahre." },
  { t: "Heuschrecken", c: "tier", src: "BfV",
    d: "Gefräßige Schwärme, die über ein Land herfielen, seine Ressourcen vertilgten und es verwüstet zurückließen." },
  { t: "Parasiten / Flöhe / Ungeziefer", c: "tier", src: "BfV · REG",
    d: "„Schmarotzer ohne eigene Schöpfungskraft“, die vom „Wirtsvolk“ lebten. Markiert jüdisches Leben als biologische Gefahr." },
  { t: "Gharqad-Baum", c: "tier", src: "BfV",
    d: "Aus einer Endzeit-Überlieferung: der „Baum der Juden“, der sie am Ende der Zeiten schütze. Wer davor platziert wird, gilt als Schutzschild „jüdischer Interessen“." },
  { t: "Ahasver / Der ewige Jude", c: "tier", src: "REG",
    d: "Legendenfigur des ruhelos umherwandernden Juden. Markiert jüdisches Leben als heimatlos, fremd und verflucht. Titel eines NS-Propagandafilms von 1940." },

  /* ---------- SCHULDABWEHR ---------- */
  { t: "Schuldkult", c: "schuld", src: "BfV · AAS · REG",
    d: "Geschichtsrevisionistischer Kampfbegriff. Diffamiert das Gedenken an die NS-Verbrechen als aufgezwungen und übertrieben, um Verantwortung abzustreifen." },
  { t: "Schlussstrich", c: "schuld", src: "AAS · REG",
    d: "Forderung, die Auseinandersetzung mit der NS-Vergangenheit zu beenden. Zentrale Form des Post-Shoah-Antisemitismus." },
  { t: "Auschwitzkeule", c: "schuld", src: "AAS · REG",
    d: "Nach Martin Walser 1998. Unterstellt, die Erinnerung an den Holocaust werde als Einschüchterungsmittel und Moralkeule eingesetzt." },
  { t: "Holocaust-Religion", c: "schuld", src: "BfV · REG",
    d: "Rahmt die Erinnerungskultur als dogmatischen, faktenfreien Glauben und stellt damit den Holocaust selbst infrage." },
  { t: "Umerziehung", c: "schuld", src: "BfV · REG",
    d: "Kampfbegriff mit Gehirnwäsche-Assoziation: Die Deutschen würden bis heute manipuliert, um ihr „natürliches“ Nationalbewusstsein zu zerstören." },
  { t: "Psychologischer Völkermord", c: "schuld", src: "BfV",
    d: "Erklärt das Erinnern zum eigentlichen Verbrechen — an „den Deutschen“. Klassische Täter-Opfer-Umkehr." },
  { t: "Morgenthau-Plan", c: "schuld", src: "BfV · REG",
    d: "Nie verabschiedeter Entwurf von 1944 zur Deindustrialisierung Deutschlands, umgedeutet zum „jüdischen Racheplan“." },
  { t: "Muh 6 Gorillion", c: "schuld", src: "BfV",
    d: "Auf Imageboards verbreitete Verhöhnung der rund sechs Millionen Ermordeten. Die bewusste Falschschreibung soll die Opferzahl lächerlich machen." },
  { t: "271k", c: "schuld", src: "BfV",
    d: "Behauptet, in den Konzentrations- und Vernichtungslagern seien „nur“ 271.000 Menschen gestorben. Holocaustleugnung in Zahlenform." },
  { t: "6-Millionen-Lüge / Auschwitzlüge", c: "schuld", src: "REG",
    d: "Offene Leugnung des Holocaust. In Deutschland als Volksverhetzung strafbar." },
  { t: "Judenstern „Ungeimpft“", c: "schuld", src: "BfV · AAS · REG",
    d: "Der gelbe Zwangsstern der NS-Zeit, getragen mit der Aufschrift „Ungeimpft“. Botschaft: „Wir sind die neuen Juden“ — Täter-Opfer-Umkehr und Holocaustrelativierung." },
  { t: "Impfholocaust", c: "schuld", src: "BfV",
    d: "Setzt staatliche Impfpolitik mit dem Holocaust gleich. Verharmlost die NS-Verbrechen und dämonisiert demokratische Institutionen zugleich." },
  { t: "Babycaust", c: "schuld", src: "AAS · REG",
    d: "Von radikalen Abtreibungsgegner:innen verwendet. Setzt Schwangerschaftsabbrüche mit dem Holocaust gleich und diffamiert Ärzt:innen als Massenmörder:innen." },
  { t: "Tier-KZ / Holocaust auf dem Teller", c: "schuld", src: "AAS · REG",
    d: "Tierrechtsvergleiche mit der Shoah. Verkennt die Systematik und Singularität der NS-Verbrechen und relativiert sie." },
  { t: "Bombenholocaust", c: "schuld", src: "REG",
    d: "Setzt die alliierten Luftangriffe mit dem Holocaust gleich, um die deutsche Tätergesellschaft als Opfer zu inszenieren." },
  { t: "Holocaust-Industrie", c: "schuld", src: "REG",
    d: "Unterstellt Jüdinnen und Juden, aus der Erinnerung an den Holocaust materiellen Profit zu schlagen." },
  { t: "Wahrheit macht frei", c: "schuld", src: "REG",
    d: "Verballhornung der Auschwitzer Torinschrift. Verhöhnt die Ermordeten und wird häufig in verschwörungsideologischen Kontexten verwendet." },

  /* ---------- ISRAELBEZOGEN ---------- */
  { t: "Zionisten / ZiOS", c: "israel", src: "BfV · AAS · REG",
    d: "Herabwürdigender Ersatzbegriff für „die Israelis“ oder „die Juden“. Der Zionismus selbst ist eine legitime politische Bewegung — der Code kippt ihn ins Feindbild." },
  { t: "ZOG / ZORG / JOG", c: "israel", src: "BfV · AAS · REG",
    d: "„Zionist“ bzw. „Jewish Occupied Government“: Westliche Regierungen seien Marionetten einer zionistischen bzw. jüdischen Besatzung." },
  { t: "USrael", c: "israel", src: "BfV · AAS · REG",
    d: "Kofferwort aus USA und Israel. Unterstellt, die US-Politik werde zum Vorteil „des Juden“ und Israels gesteuert." },
  { t: "IsraHell", c: "israel", src: "BfV",
    d: "Kofferwort aus Israel und Hell. Dämonisiert den Staat als Ort des „absolut Bösen“." },
  { t: "Rotes Dreieck", c: "israel", src: "BfV · REG",
    d: "Seit Ende 2023 in HAMAS-Propaganda als Zielmarkierung verwendet. 2024 vom BMI als Kennzeichen in die Verbotsverfügung aufgenommen — die Verwendung kann strafbar sein.", flag: "kennzeichenverbot" },
  { t: "Kindermörder Israel", c: "israel", src: "BfV · AAS · REG",
    d: "Aktualisiert die Ritualmordlegende: Israel vergieße das Blut palästinensischer Kinder mit Absicht. Aus dieser Vorstellung können Vernichtungswünsche folgen." },
  { t: "Apartheidstaat / Unrechtsstaat", c: "israel", src: "AAS · REG",
    d: "Spricht Israel Rechtsstaatlichkeit und demokratischen Charakter grundsätzlich ab. Der Begriff selbst ist nicht antisemitisch — entscheidend ist der Kontext." },
  { t: "Zionazis", c: "israel", src: "REG",
    d: "Gleichsetzung israelischer Politik mit dem Nationalsozialismus. Verharmlost die NS-Verbrechen und kehrt Täter und Opfer um." },
  { t: "Krebsgeschwür (auf Israel bezogen)", c: "israel", src: "REG",
    d: "Von islamistischen Regimen und Gruppen zur Dämonisierung Israels genutzt: Der Staat müsse „entfernt“ werden." },
  { t: "From the river to the sea", c: "israel", src: "REG",
    d: "Parole, die je nach Kontext als Forderung nach Auflösung des Staates Israel verstanden wird. Von deutschen Gerichten teils als strafbar bewertet — Kontext entscheidet." },
  { t: "Chaibar, Chaibar, ya Yahud", c: "israel", src: "REG",
    d: "Bezieht sich auf Mohammeds Feldzug gegen die jüdische Oasenstadt Chaibar im 7. Jh. Erinnert an die Unterwerfung „der Juden“ und dient als Vernichtungsdrohung." },
  { t: "Udrub, Udrub Tal Abib", c: "israel", src: "REG",
    d: "„Bombardiert, bombardiert Tel Aviv“. Liedzeile von 2012, auf Versammlungen als Parole verwendet. Muss als Gewaltaufruf verstanden werden." },
  { t: "Birruh biddam, nafdik ya Aqsa", c: "israel", src: "REG",
    d: "„Mit Geist und Blut opfern wir uns für dich, oh Aqsa“. Appelliert an den Märtyrerkult und glorifiziert den gewaltsamen Kampf gegen Israel." },
  { t: "Hinter Steinen und Bäumen", c: "israel", src: "REG",
    d: "Anspielung auf einen Hadith, nach dem Steine und Bäume am Jüngsten Tag versteckte Juden verraten. Teil der HAMAS-Charta; religiöse Legitimation von Gewalt." },
  { t: "Free Palestine from German guilt", c: "israel", src: "REG",
    d: "Verbindet propalästinensischen Protest mit der Forderung nach einem Schlussstrich unter die deutsche Erinnerungskultur." },
  { t: "Stop doing what Hitler did to you", c: "israel", src: "REG",
    d: "Täter-Opfer-Umkehr in Parolenform: Unterstellt Jüdinnen und Juden, aus der Shoah nichts gelernt zu haben und sie zu wiederholen." },

  /* ---------- ZEICHEN & ZAHLEN ---------- */
  { t: "(((Echo)))", c: "zeichen", src: "BfV",
    d: "Dreifache Klammern markieren Personen, Firmen, Organisationen oder Gruppen als „jüdisch“, ohne es auszusprechen. Im Netz weit verbreitet." },
  { t: "JDN LGN", c: "zeichen", src: "BfV · REG",
    d: "Entvokalisierung von „Juden lügen“. Nutzt die Fähigkeit des Gehirns, unvollständige Wörter zu ergänzen — und umgeht damit Filter und Strafverfolgung." },
  { t: "Juice / 🧃", c: "zeichen", src: "BfV",
    d: "Phonetische Nähe zu „Jews“. Als Saftkarton-Emoji verschleiert der Code antisemitische Inhalte und umgeht automatische Moderation." },
  { t: "109 / 110", c: "zeichen", src: "BfV",
    d: "Behauptet, Jüdinnen und Juden seien aus 109 Ländern vertrieben worden. Die 110 ist eine offene Aufforderung, das aktuelle Wohnland folgen zu lassen." },
  { t: "6MWE", c: "zeichen", src: "BfV",
    d: "„6 Million Wasn't Enough“. Verhöhnt die Opfer des Holocaust und fordert offen einen erneuten Genozid." },
  { t: "GTKRWN", c: "zeichen", src: "BfV",
    d: "Akronym mit offener Aufstachelung zur Vernichtung jüdischen Lebens. Extremfall der Dehumanisierung." },
  { t: "Hakennase", c: "zeichen", src: "AAS · BPB · REG",
    d: "Zentrales Merkmal fast jeder antisemitischen Darstellung — von Münzen des 17. Jh. bis zu Stürmer-Karikaturen und heutigen Memes. Macht zugeschriebene Minderwertigkeit körperlich sichtbar." },
  { t: "Schläfenlocken & Hut", c: "zeichen", src: "BfV · REG",
    d: "Das Erscheinungsbild ultraorthodoxer Juden wird stellvertretend für alle Jüdinnen und Juden gesetzt und markiert sie kollektiv als fremdartig." },
  { t: "Davidstern als Feindmarkierung", c: "zeichen", src: "BfV · REG",
    d: "Auf Hüten, Stirnen, Flaggen oder Logos angebracht, markiert der Stern den angeblich „wahren Urheber“ hinter einem politischen Geschehen." },
  { t: "Die Juden sind unser Unglück", c: "zeichen", src: "REG",
    d: "Formel von Heinrich von Treitschke (1879), später Kopfzeile des NS-Hetzblatts „Der Stürmer“. Bis heute in Abwandlungen im Umlauf." }
];

/* Der annotierte Beispiel-Post.
   Konstruiert aus Einzelcodes der Quellen — kein realer Beitrag. */
/* Vier konstruierte Beiträge im Social-Media-Format.
   KEIN reales Material: jeder Beitrag ist aus Einzelcodes der Quellen
   zusammengesetzt, die Profilnamen sind erfunden. Es geht um Analyse,
   nicht um Vorführung. */
const POSTS = [
  {
    handle: "@wach_und_frei_2026",
    meta: "Konstruiert · Muster: Verschwörungserzählung",
    reply: "Die Vorstellung jüdischer Medienmacht ist über 150 Jahre alt \u2014 und ebenso lange falsch. In Deutschland gibt es keine Zensur, Meldungen sind über mehrere unabhängige Quellen überprüfbar, Fehler werden benannt. Widersprüchliche Informationen entstehen durch Interessen im Konflikt, nicht durch eine Verschwörung. Die Behauptung immunisiert sich selbst: Jeder Gegenbeleg gilt als gefälscht.",
    replySrc: "Amadeu Antonio Stiftung, nichts-gegen-juden.de: „Die Juden kontrollieren doch die Medien!“",
    parts: [
      { txt: "Wacht endlich auf! Die " },
      { mark: "Hochfinanz", kind: "Begriffsersetzung",
        note: "Ersetzt das belastete Wort. Steht für eine angebliche „jüdische Weltfinanzkontrolle“ und ähnelt dem NS-Terminus „internationales Finanzjudentum“.",
        src: "BfV S. 27 \u00b7 AAS S. 11" },
      { txt: " an der " },
      { mark: "Ostküste", kind: "Begriffsersetzung",
        note: "Verweist auf den angeblich jüdisch kontrollierten Finanzplatz New York \u2014 und damit auf Jüdinnen und Juden insgesamt.",
        src: "BfV S. 31 \u00b7 AAS S. 11" },
      { txt: " und " },
      { mark: "(((ihre Freunde)))", kind: "Optisches Zeichen",
        note: "Die dreifachen Klammern („Echo“) markieren eine Gruppe als jüdisch. Der Satz selbst sagt nichts \u2014 die Klammern erledigen die Zuschreibung.",
        src: "BfV S. 32" },
      { txt: " haben den " },
      { mark: "Great Reset", kind: "Verschwörungsnarrativ",
        note: "Ursprünglich ein WEF-Konzept für die Zeit nach der Pandemie, umgedeutet zum Plan einer „Elite“ zur Versklavung der Menschheit.",
        src: "BfV S. 39 \u00b7 AAS S. 8" },
      { txt: " längst beschlossen. " },
      { mark: "Soros", kind: "Personalisierung",
        note: "Ein Einzelname steht für die ganze Gruppe. Soros personifiziert „Hochfinanz“ und „Globalisten“ und ersetzt ältere Chiffren wie Rothschild.",
        src: "BfV S. 51 \u00b7 AAS S. 24" },
      { txt: " " },
      { mark: "zieht die Fäden", kind: "Puppenspieler-Motiv",
        note: "Das Marionettenbild unterstellt, sichtbare Politik sei nur Fassade und alle Akteure seien Werkzeuge eines „jüdischen Willens“.",
        src: "BfV S. 37 \u00b7 AAS S. 8" },
      { txt: ", und die " },
      { mark: "Lügenpresse", kind: "Verschwörungsnarrativ",
        note: "Behauptet gesteuerte, gleichgeschaltete Medien. Dahinter steht das Narrativ einer „jüdischen“ Kontrolle der Öffentlichkeit \u2014 schon Treitschke behauptete das 1879.",
        src: "AAS S. 36 f." },
      { txt: " schweigt." }
    ]
  },
  {
    handle: "@echte.geschichte.de",
    meta: "Konstruiert · Muster: Schuldabwehr",
    reply: "„Man darf ja nichts sagen“ ist seit jeher ein Satz der radikalen Rechten \u2014 er inszeniert die sprechende Person als Opfer eines Redeverbots, das es nicht gibt. Erinnerung ist kein Kult, sondern Voraussetzung dafür, dass so etwas nicht wieder passiert. Wer einen Schlussstrich fordert, will nicht diskutieren, sondern aufhören.",
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
      { txt: ". Wer das sagt, wird fertiggemacht \u2014 " },
      { mark: "wir sind die neuen Juden", kind: "Täter-Opfer-Umkehr",
        note: "Beansprucht den Verfolgungsstatus der Shoah-Opfer für die eigene Lage. Verharmlost den Holocaust und entwertet das Gedenken.",
        src: "AAS S. 34 f. \u00b7 REG S. 38" },
      { txt: "." }
    ]
  },
  {
    handle: "@nahost.klartext",
    meta: "Konstruiert · Muster: israelbezogen",
    reply: "Kritik an israelischer Regierungspolitik ist legitim und findet ständig statt \u2014 auch in Israel selbst. Antisemitisch wird sie dort, wo sie den Staat pauschal wegen seiner bloßen Existenz angreift, wo alte Feindbilder wie der Kindermord auf ihn übertragen werden oder wo „die Juden“ als homogene Masse in Haftung genommen werden. Der Unterschied liegt nicht im Thema, sondern in der Form.",
    replySrc: "Amadeu Antonio Stiftung, nichts-gegen-juden.de: „Man darf ja nichts sagen …“ \u00b7 BfV S. 65",
    parts: [
      { txt: "Der " },
      { mark: "Apartheidstaat", kind: "Dämonisierung",
        note: "Spricht Israel Rechtsstaatlichkeit und demokratischen Charakter grundsätzlich ab. Der Begriff allein ist nicht antisemitisch \u2014 hier entscheidet, was drumherum steht.",
        src: "AAS S. 16 f. \u00b7 REG S. 70" },
      { txt: " zeigt sein wahres Gesicht. " },
      { mark: "Kindermörder", kind: "Ritualmordlegende",
        note: "Aktualisiert die mittelalterliche Ritualmordlegende: Israel vergieße das Blut von Kindern mit Absicht. Aus dieser Vorstellung können Vernichtungswünsche folgen.",
        src: "BfV S. 67 \u00b7 AAS S. 18 f." },
      { txt: " Und die " },
      { mark: "Zionisten", kind: "Begriffsersetzung",
        note: "Herabwürdigender Ersatzbegriff für „die Israelis“ oder „die Juden“. Der Zionismus selbst ist eine legitime politische Bewegung \u2014 der Code kippt ihn ins Feindbild.",
        src: "BfV S. 65 \u00b7 AAS S. 14 f." },
      { txt: " in Washington decken alles. " },
      { mark: "USrael", kind: "Kofferwort",
        note: "Unterstellt, die US-Politik werde zum Vorteil „des Juden“ und Israels gesteuert. Schliesst an den Mythos der „jüdischen Weltverschwörung“ an.",
        src: "BfV S. 69 \u00b7 AAS S. 12" },
      { txt: " " },
      { mark: "\ud83d\udd3a", kind: "Zielmarkierung",
        note: "Das rote Dreieck stammt aus HAMAS-Propaganda und diente dort als Zielmarkierung. Seit 2024 vom BMI als Organisationskennzeichen erfasst \u2014 die Verwendung kann strafbar sein.",
        src: "BfV S. 68" }
    ]
  },
  {
    handle: "@memes.ohne.filter",
    meta: "Konstruiert · Muster: Zahlen- und Zeichencodes",
    reply: "Auf Zahlencodes muss man nicht inhaltlich antworten \u2014 es gibt nichts zu widerlegen. Sinnvoller ist: benennen, was es ist, nicht weiterverbreiten, melden. Genau darauf zielen solche Codes: Wer widerspricht, verschafft ihnen Reichweite; wer sie ignoriert, lässt sie normal werden. Screenshot und Meldung sind die Antwort.",
    replySrc: "BfV S. 19 (Reichweite als Zweck) \u00b7 Bundesverband RIAS",
    parts: [
      { txt: "Kleine Erinnerung: " },
      { mark: "109", kind: "Zahlencode",
        note: "„Aus 109 Ländern vertrieben“. Die mitgedachte 110 macht daraus eine Drohung. Zahlen erzeugen keine Bilder im Kopf und wirken sachlich \u2014 das macht sie wirksam.",
        src: "BfV S. 55" },
      { txt: " Länder können sich nicht irren. Die Wahrheit über " },
      { mark: "\ud83e\uddc3", kind: "Filterumgehung",
        note: "„Juice“ klingt wie „Jews“. Der Saftkarton umgeht automatische Moderationsfilter und markiert die Gruppe zugleich als andersartig.",
        src: "BfV S. 55" },
      { txt: " will keiner hören. " },
      { mark: "JDN LGN", kind: "Entvokalisierung",
        note: "Das Gehirn ergänzt „Juden lügen“ selbstständig. Die Auslassung ist keine Abschwächung, sondern Tarnung \u2014 sie umgeht Filter und erschwert die Strafverfolgung.",
        src: "BfV S. 48" },
      { txt: " Wer es kapiert, kapiert es." }
    ]
  }
];

/* Wie Propaganda arbeitet — vier Mechanismen.
   Kurz gehalten: das ist der Einstieg, nicht die Theorie. */
/* Häufige Fragen. Kurz gehalten, jede Antwort belegt. */
const FAQ = [
  { q: "Darf man Israel denn nicht kritisieren?",
    a: "Doch, und es passiert ständig — auch in Israel selbst. Antisemitisch wird Kritik dort, wo sie den Staat pauschal wegen seiner bloßen Existenz angreift, wo alte Feindbilder auf ihn übertragen werden oder wo „die Juden“ als homogene Masse in Haftung genommen werden. Der Satz „man darf ja nichts sagen“ ist seit jeher ein Satz der radikalen Rechten: Er macht die sprechende Person zum Opfer eines Redeverbots, das es nicht gibt.",
    src: "Amadeu Antonio Stiftung, nichts-gegen-juden.de" },

  { q: "Ich habe jüdische Freunde — dann bin ich doch kein Antisemit.",
    a: "Persönliche Beziehungen sagen nichts darüber aus, ob jemand antisemitische Überzeugungen teilt. Antisemitismus wirkt als Ideologie überindividuell. Die Soziologin Julia Bernstein beschreibt den Satz als Abwehrstrategie: Wer die eigene Aussage als problematisch erkennt, ruft vorbeugend jüdische Freunde auf, um das gesellschaftlich Unsagbare sagbar zu machen.",
    src: "Julia Bernstein, zit. n. nichts-gegen-juden.de" },

  { q: "Ist Antisemitismus nicht vor allem ein Problem von rechts?",
    a: "Nein. Er gilt als Brückennarrativ: Er verbindet Milieus, die sonst wenig teilen — rechtsextreme, verschwörungsideologische, islamistische, christlich-fundamentalistische und linke — und schlägt eine Brücke zwischen Rand und Mitte. Sekundärer Antisemitismus ist unabhängig davon verbreitet, ob sich jemand links oder rechts verortet.",
    src: "BfV S. 15–17 · Leipziger Autoritarismus-Studie 2024" },

  { q: "Wird da nicht viel hineininterpretiert?",
    a: "Das ist eine berechtigte Frage — und genau deshalb entscheidet nie ein einzelnes Wort. Maßgeblich sind Gesamtzusammenhang, mediales und soziales Umfeld, Absender, Adressat und das vorausgesetzte Wissen. Ein starkes Indiz ist die Häufung: Codes treten fast nie allein auf.",
    src: "BfV, „Codes erkennen und einordnen“, S. 21" },

  { q: "Warum reicht es nicht, einfach Fakten zu nennen?",
    a: "Weil Verschwörungserzählungen sich gegen Fakten immunisieren: Jeder Gegenbeleg gilt als gefälscht. Die Haltung entzieht sich rationalen Argumenten. Wirksamer ist, das Muster zu benennen, statt die Behauptung im Detail zu widerlegen.",
    src: "Amadeu Antonio Stiftung, S. 38 · nichts-gegen-juden.de" },

  { q: "Woran erkenne ich einen Code, der in keiner Liste steht?",
    a: "An der Machart. Es sind immer dieselben sechs Werkzeuge: vage Anspielung, Personalisierung (ein Name steht für die Gruppe), Begriffsersetzung, abwertendes Bild, Zahlencode und optisches Zeichen. Wer die kennt, braucht keine vollständige Liste — die gibt es ohnehin nicht, weil laufend neue Codes entstehen.",
    src: "BfV, „Werkzeugkasten der Umwegkommunikation“, S. 71 f." }
];

/* Wie Propaganda arbeitet — vier Mechanismen. */
const MECHANIK = [
  { h: "Verzerrung",
    p: "Eine komplizierte Lage wird auf eine einzige Ursache heruntergebrochen. Das fühlt sich wie Durchblick an, ist aber das Gegenteil.",
    src: "BfV, „Erklärungsfunktion“, S. 27 u. 51" },
  { h: "Emotion",
    p: "Codes zielen am Verstand vorbei. Sie lösen Angst, Wut oder Ekel aus — und manchmal das gute Gefühl, mehr zu wissen als andere.",
    src: "BfV, „Was Codes mit den Rezipierenden machen“, S. 73" },
  { h: "Wiederholung",
    p: "Je öfter du etwas siehst, desto normaler wirkt es. Reichweite ist kein Nebeneffekt, sondern der Zweck.",
    src: "BfV, „Erhöhung der Reichweite“, S. 19" },
  { h: "Feindbild",
    p: "Eine Gruppe wird als Ursache markiert. Das schweißt die eigene Gruppe zusammen und senkt die Hemmschwelle für Angriffe.",
    src: "BfV S. 29 · AAS S. 6" }
];

/* Zahlen, die die Relevanz belegen — jede mit Herkunft. */
const FACTS = [
  { n: "15,6 %",
    p: "der Bevölkerung übertragen ihre Ablehnung israelischer Politik auf „die Juden“ — machen also Einzelne kollektiv verantwortlich.",
    src: "Leipziger Autoritarismus-Studie 2024, zit. n. BfV S. 16" },
  { n: "22,7 %",
    p: "stimmen zu, Israels Politik sei so schlimm wie die der Nazis im Zweiten Weltkrieg. Diese Gleichsetzung dient der Schuldabwehr.",
    src: "Leipziger Autoritarismus-Studie 2024, zit. n. BfV S. 16" },
  { n: "Links wie rechts",
    p: "Sekundärer Antisemitismus ist weit verbreitet — unabhängig davon, wo sich jemand politisch verortet. Das ist kein Randproblem.",
    src: "Decker/Kiess/Brähler 2024, zit. n. BfV S. 16" }
];

/* Was man konkret tun kann. Handlungswissen, keine Appelle. */
const ACTIONS = [
  { h: "Nicht weiterleiten",
    p: "Auch nicht, um dich darüber aufzuregen. Jeder Repost ist Reichweite — und Reichweite ist genau das Ziel. Screenshot statt Teilen.",
    src: "BfV, „Erhöhung der Reichweite“, S. 19" },
  { h: "Belegen",
    p: "Screenshot mit Datum, Profilname und dem, was drumherum steht. Ohne Beleg und ohne Kontext kann später niemand etwas damit anfangen.",
    src: "Bundesverband RIAS, report-antisemitism.de" },
  { h: "Kontext prüfen",
    p: "Ein einzelnes Wort beweist nichts. Entscheidend sind Umfeld, Absender, Adressat und ob sich Codes häufen. Codes treten selten allein auf.",
    src: "BfV, „Codes erkennen und einordnen“, S. 21" },
  { h: "Widersprechen, nicht diskutieren",
    p: "Kurz benennen, was du siehst — nicht in eine Debatte einsteigen. Gegen Verschwörungserzählungen helfen reine Fakten nachweislich nicht.",
    src: "Amadeu Antonio Stiftung, S. 38" },
  { h: "Hilfe holen",
    p: "Du musst das nicht allein regeln. Lehrkraft, Vertrauensperson, Meldestelle. Wer betroffen ist, hat Anspruch auf Beratung.",
    src: "RIAS · BfV-Hinweistelefon" }
];

const QUIZ = [
  {
    q: "Die Hochfinanz an der Ostküste zieht mal wieder die Fäden.",
    ctx: "Kommentar unter einem Zeitungsartikel zur Inflation",
    a: "code",
    why: "Drei Codes in einem Satz: „Hochfinanz“ und „Ostküste“ ersetzen das belastete Wort, „die Fäden ziehen“ ruft das Puppenspieler-Motiv auf. Genau diese Häufung ist laut BfV ein starkes Indiz — antisemitische Codes treten selten isoliert auf.",
    src: "BfV, Kap. 2.1 · AAS S. 10 f."
  },
  {
    q: "Die Entscheidung der israelischen Regierung halte ich für falsch.",
    ctx: "Wortmeldung in einer Podiumsdiskussion",
    a: "ok",
    why: "Kritik an einer konkreten Regierungsentscheidung. Kein Kollektivbezug, keine Übertragung auf Jüdinnen und Juden, kein Rückgriff auf antisemitische Bildwelten. Sachliche Kritik an israelischer Politik ist kein Antisemitismus — das betonen alle herangezogenen Quellen ausdrücklich.",
    src: "IHRA-Arbeitsdefinition · REG S. 8 f."
  },
  {
    q: "Interessant, wem die (((Medienhäuser))) so gehören.",
    ctx: "Antwort in einem Diskussionsforum",
    a: "code",
    why: "Die dreifachen Klammern („Echo“) markieren die Gruppe als jüdisch. Der Satz selbst behauptet nichts Justiziables — die Zuschreibung liegt vollständig in der Typografie. Ein Musterbeispiel für Umwegkommunikation.",
    src: "BfV, Exkurs „(((echoing)))“, S. 32"
  },
  {
    q: "109",
    ctx: "Kommentar unter dem Beitrag einer jüdischen Gemeinde",
    a: "code",
    why: "Behauptet, Jüdinnen und Juden seien aus exakt 109 Ländern vertrieben worden. Die implizite 110 macht daraus eine Drohung: Das aktuelle Wohnland soll das nächste werden.",
    src: "BfV, S. 55"
  },
  {
    q: "NIE WIEDER … FÜR WEN?",
    ctx: "Aufschrift auf einem Demonstrationsplakat",
    a: "grau",
    why: "Das BfV führt genau dieses Motiv als Graubereich. Antisemitisch gelesen wendet es den Holocaust instrumentell gegen Israel und greift die Erinnerungskultur als Heuchelei an. Nicht antisemitisch gelesen klagt es Opferhierarchien in der Menschenrechtsdebatte an. Entscheidend sind Umfeld, Absender und was sonst im Bild ist.",
    src: "BfV, Kap. 2.5, Fallbeispiel 2, S. 60 f."
  },
  {
    q: "JDN LGN",
    ctx: "Aufdruck auf einem T-Shirt bei einer Demonstration",
    a: "code",
    why: "Entvokalisierung: Das Gehirn ergänzt „Juden lügen“ selbstständig. Die Auslassung ist keine Abschwächung, sondern Tarnung — sie umgeht Moderationsfilter und erschwert die Strafverfolgung, während die Botschaft für Eingeweihte vollständig ankommt.",
    src: "BfV, Exkurs „Grafische Abwandlungen“, S. 48"
  },
  {
    q: "Wir sind die neuen Juden.",
    ctx: "Redebeitrag auf einer Protestkundgebung",
    a: "code",
    why: "Täter-Opfer-Umkehr. Beansprucht den Verfolgungsstatus der Shoah-Opfer für die eigene Lage und relativiert damit den Holocaust. Erschien in der Coronazeit als „Judenstern“ mit der Aufschrift „Ungeimpft“.",
    src: "AAS S. 34 f. · REG S. 38"
  },
  {
    q: "BlackRock hat enormen Einfluss auf die Finanzmärkte.",
    ctx: "Satz aus einer Wirtschaftssendung",
    a: "grau",
    why: "Als Tatsachenaussage unproblematisch. Zum Code wird der Name erst in einer Erzählung von geheimer Steuerung — neben „Globalisten“ oder „Hochfinanz“. Kapitalismuskritik wird dort antisemitisch, wo sie das System auf eine Gruppe zurückführt.",
    src: "BfV Kap. 2.1 · AAS S. 10 f."
  }
];

const TOOLS = [
  { n: "Werkzeug 1", h: "Vage Anspielung",
    p: "Andeutungen, die sich erst über Kontext und geteiltes Wissen erschließen. Wörtlich genommen ergeben sie oft keinen Sinn — sie erzeugen aber eine Atmosphäre des Verdachts.",
    ex: "„Masken fallen lassen“" },
  { n: "Werkzeug 2", h: "Personalisierung",
    p: "Einzelne Namen stehen stellvertretend für die ganze Gruppe und lenken den Blick auf eine vermeintliche „jüdische Macht“. Ständig kommen neue Namen hinzu.",
    ex: "Rothschild · Soros · Fink" },
  { n: "Werkzeug 3", h: "Begriffsersetzung",
    p: "Belastete Wörter werden durch scheinbar neutrale ersetzt. Die Aussage wirkt oberflächlich harmlos — und Widerspruch lässt sich als Überinterpretation zurückweisen.",
    ex: "„Globalisten“ · „Zionisten“" },
  { n: "Werkzeug 4", h: "Abwertendes Bild",
    p: "Tier- und Krankheitsmetaphern wirken entmenschlichend und erzeugen ein Gefühl existenzieller Bedrohung. Sie legen nahe, dass „Beseitigung“ notwendig sei.",
    ex: "Krake · Parasit · Krebs" },
  { n: "Werkzeug 5", h: "Zahlencode",
    p: "Zahlen erzeugen zunächst keine Bilder im Kopf. Genau diese vermeintliche Sachlichkeit macht sie effektiv: nach außen bedeutungslos, nach innen Erkennungszeichen.",
    ex: "109/110 · 271k · 88" },
  { n: "Werkzeug 6", h: "Optisches Zeichen",
    p: "Überzeichnete Körpermerkmale oder grafische Abwandlungen tarnen und markieren zugleich. Sie erlauben Gleichgesinnten, sich untereinander zu erkennen.",
    ex: "(((...))) · JDN LGN" }
];

const LEVELS = [
  { h: "Emotional", p: "Zieht am Verstand vorbei und löst im Unterbewusstsein eine instinktive Reaktion aus: Angst, Wut, Ekel — oder das gute Gefühl, ein „Wissender“ zu sein." },
  { h: "Kognitiv", p: "Setzt Deutungsrahmen. Konstruiert Feindbilder, reduziert Komplexität auf gut und böse und untergräbt das Vertrauen in Institutionen." },
  { h: "Moralisch", p: "Höhlt demokratische Werte schleichend aus. Entmenschlichung senkt die Hemmschwelle für Beleidigungen und Angriffe und normalisiert Antisemitismus." },
  { h: "Handlung", p: "Fordert dazu auf, die passive Rolle zu verlassen: Solidarisierung, Parteinahme — im Extremfall Mobilisierung zu unmittelbarer Gewalt." }
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
];
