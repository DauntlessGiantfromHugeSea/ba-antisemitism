/* =========================================================
   Interaktion
   ========================================================= */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  /* ---------------------------------------------------------
     1 — SCAN
     --------------------------------------------------------- */
  var passageEl = $("#passage");
  var annotEl   = $("#annot");
  var scanBtn   = $("#scanBtn");
  var frameEl   = $("#scanFrame");
  var markIndex = 0;

  PASSAGE.forEach(function (part) {
    if (part.txt) {
      passageEl.appendChild(document.createTextNode(part.txt));
      return;
    }
    markIndex += 1;
    var i = markIndex;
    var b = el("button", "tok");
    b.type = "button";
    b.setAttribute("aria-expanded", "false");
    b.dataset.n = String(i);
    b.disabled = true;
    b.appendChild(document.createTextNode(part.mark));
    b.addEventListener("click", function () {
      $$(".tok", passageEl).forEach(function (o) { o.setAttribute("aria-expanded", "false"); });
      b.setAttribute("aria-expanded", "true");
      showAnnot(i, part);
    });
    passageEl.appendChild(b);
  });

  function showAnnot(i, part) {
    annotEl.innerHTML = "";
    var h = el("h3");
    h.appendChild(el("span", "idx", String(i)));
    h.appendChild(document.createTextNode(part.mark));
    annotEl.appendChild(h);
    annotEl.appendChild(el("p", null, part.note));
    annotEl.appendChild(el("span", "kind", part.kind));
    if (part.src) annotEl.appendChild(el("span", "src", "Quelle: " + part.src));
  }

  function resetAnnot() {
    annotEl.innerHTML = "";
    annotEl.appendChild(el("p", "ph",
      "↑ Markierten Code antippen — Analyse erscheint hier"));
  }

  scanBtn.addEventListener("click", function () {
    if (frameEl.classList.contains("scanned")) {
      frameEl.classList.remove("scanned");
      $$(".tok", passageEl).forEach(function (t) {
        t.disabled = true;
        t.setAttribute("aria-expanded", "false");
      });
      scanBtn.textContent = "Codes markieren";
      scanBtn.classList.add("mark");
      $("#scanCount").textContent = "Nicht analysiert";
      annotEl.innerHTML = "";
      annotEl.appendChild(el("p", "ph", "Scan zurückgesetzt."));
      return;
    }
    frameEl.classList.add("scanning");
    scanBtn.disabled = true;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(function () {
      frameEl.classList.remove("scanning");
      frameEl.classList.add("scanned");
      $$(".tok", passageEl).forEach(function (t) { t.disabled = false; });
      scanBtn.disabled = false;
      scanBtn.textContent = "Zurücksetzen";
      scanBtn.classList.remove("mark");
      resetAnnot();
      $("#scanCount").textContent = markIndex + " Codes gefunden";
    }, reduce ? 10 : 1200);
  });

  resetAnnot();

  /* ---------------------------------------------------------
     2 — TEST
     --------------------------------------------------------- */
  var OPTS = [
    { id: "ok",   key: "A", label: "Unproblematisch" },
    { id: "grau", key: "B", label: "Kommt auf den Kontext an" },
    { id: "code", key: "C", label: "Antisemitischer Code" }
  ];

  var qi = 0, score = 0, answered = false;
  var qPrompt  = $("#qPrompt");
  var qCtx     = $("#qCtx");
  var qChoices = $("#qChoices");
  var qVerdict = $("#qVerdict");
  var qFoot    = $("#qFoot");
  var qPos     = $("#qPos");
  var qScore   = $("#qScore");
  var qBar     = $("#qBar");

  function renderQuestion() {
    answered = false;
    var item = QUIZ[qi];
    qPrompt.textContent = item.q;
    qCtx.textContent = item.ctx;
    qVerdict.innerHTML = "";
    qFoot.innerHTML = "";
    qPos.textContent = (qi + 1) + " / " + QUIZ.length;
    qScore.textContent = score + " richtig";
    qBar.style.width = (qi / QUIZ.length * 100) + "%";

    qChoices.innerHTML = "";
    OPTS.forEach(function (o) {
      var b = el("button", "choice");
      b.type = "button";
      b.appendChild(el("span", "key", o.key));
      b.appendChild(el("span", null, o.label));
      b.addEventListener("click", function () { answer(o.id); });
      qChoices.appendChild(b);
    });
  }

  function answer(picked) {
    if (answered) return;
    answered = true;
    var item = QUIZ[qi];
    var right = picked === item.a;
    if (right) score += 1;

    OPTS.forEach(function (o, idx) {
      var b = qChoices.children[idx];
      b.disabled = true;
      if (o.id === item.a) b.classList.add("is-correct");
      else if (o.id === picked) b.classList.add("is-wrong");
      else b.classList.add("dim");
    });

    var tone = item.a === "grau" ? "grey" : (right ? "ok" : "no");
    var v = el("div", "verdict " + tone);
    var head = right ? "Richtig" : "Nicht ganz";
    v.appendChild(el("p", "head", head));
    v.appendChild(el("p", null, item.why));
    v.appendChild(el("span", "src", "Quelle: " + item.src));
    qVerdict.appendChild(v);

    qScore.textContent = score + " richtig";
    qBar.style.width = ((qi + 1) / QUIZ.length * 100) + "%";

    var next = el("button", "btn mark",
      qi + 1 < QUIZ.length ? "Weiter" : "Ergebnis");
    next.type = "button";
    next.addEventListener("click", function () {
      qi += 1;
      if (qi < QUIZ.length) renderQuestion();
      else renderResult();
    });
    qFoot.appendChild(next);
    next.focus();
  }

  function renderResult() {
    qPos.textContent = "Abgeschlossen";
    qChoices.innerHTML = "";
    qVerdict.innerHTML = "";
    qFoot.innerHTML = "";
    qCtx.textContent = "";
    qPrompt.textContent = "";
    qPrompt.style.display = "none";

    var wrap = el("div", "result");
    var big = el("div", "big");
    big.appendChild(document.createTextNode(String(score)));
    var of = el("span", "of");
    of.textContent = " / " + QUIZ.length;
    big.appendChild(of);
    wrap.appendChild(big);

    var q = score / QUIZ.length;
    var msg;
    if (q >= .9)      msg = "Du erkennst auch die Graubereiche. Genau die sind der schwierige Teil.";
    else if (q >= .6) msg = "Die eindeutigen Codes sitzen. Schwierig wird es dort, wo der Kontext entscheidet.";
    else if (q >= .3) msg = "Die meisten Codes wirken genau deshalb, weil sie beim ersten Lesen harmlos aussehen.";
    else              msg = "Das ist der Normalfall — und der Grund, warum Codes funktionieren. Sie sind gebaut, um nicht aufzufallen.";
    var p = el("p", null, msg);
    p.style.marginTop = "1.25rem";
    wrap.appendChild(p);

    var again = el("button", "btn", "Test wiederholen");
    again.type = "button";
    again.style.marginTop = "1.5rem";
    again.addEventListener("click", function () {
      qi = 0; score = 0;
      qPrompt.style.display = "";
      qVerdict.innerHTML = "";
      renderQuestion();
      $("#test").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    wrap.appendChild(again);

    qVerdict.appendChild(wrap);
    qBar.style.width = "100%";
  }

  renderQuestion();

  /* ---------------------------------------------------------
     3 — CODES: Glyphen-Raster mit Drill-down
     Sieben Zeichen. Erst antippen zeigt die Codes.
     --------------------------------------------------------- */
  var glyphsEl = $("#glyphs");
  var drillEl  = $("#drill");
  var openCat  = null;

  function svgFor(cat) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 64 64");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "3");
    s.setAttribute("stroke-linecap", "square");
    s.setAttribute("stroke-linejoin", "miter");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = cat.icon;
    return s;
  }

  CATEGORIES.forEach(function (cat) {
    var n = CODES.filter(function (x) { return x.c === cat.id; }).length;
    var b = el("button", "glyph");
    b.type = "button";
    b.dataset.cat = cat.id;
    b.setAttribute("aria-pressed", "false");
    b.appendChild(svgFor(cat));
    b.appendChild(el("span", "gl-label", cat.label));
    b.appendChild(el("span", "gl-n", String(n)));
    b.addEventListener("click", function () { toggleCat(cat); });
    glyphsEl.appendChild(b);
  });

  function toggleCat(cat) {
    var same = openCat === cat.id;
    openCat = same ? null : cat.id;

    $$(".glyph", glyphsEl).forEach(function (g) {
      g.setAttribute("aria-pressed", String(g.dataset.cat === openCat));
    });

    drillEl.innerHTML = "";
    if (!openCat) return;

    var head = el("div", "drill-head");
    var left = el("div");
    left.appendChild(el("p", "drill-claim", cat.claim));
    if (cat.catSrc) left.appendChild(el("span", "src", "Quelle: " + cat.catSrc));
    head.appendChild(left);
    var close = el("button", "btn", "Schließen");
    close.type = "button";
    close.addEventListener("click", function () { toggleCat(cat); });
    head.appendChild(close);
    drillEl.appendChild(head);

    var list = el("div", "lex");
    CODES.filter(function (x) { return x.c === cat.id; }).forEach(function (x) {
      var b = el("button", "card");
      b.type = "button";
      b.setAttribute("aria-expanded", "false");

      var term = el("div", "term");
      term.appendChild(el("span", null, x.t));
      term.appendChild(el("span", "plus", "+"));
      b.appendChild(term);
      b.appendChild(el("div", "def", x.d));
      b.appendChild(el("div", "cat", "Quelle: " + x.src));
      if (x.flag) b.appendChild(el("span", "flag", x.flag));

      b.addEventListener("click", function () {
        var open = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", String(!open));
      });
      list.appendChild(b);
    });
    drillEl.appendChild(list);
  }

  $("#total").textContent = String(CODES.length);

  /* ---------------------------------------------------------
     4 — MECHANIK · ZAHLEN · WAS TUN
     Jede Aussage trägt ihre Herkunft.
     --------------------------------------------------------- */
  var mechEl = $("#mech");
  MECHANIK.forEach(function (m, i) {
    var d = el("div", "mech-item");
    d.appendChild(el("span", "n", String(i + 1).padStart(2, "0")));
    d.appendChild(el("h3", null, m.h));
    d.appendChild(el("p", null, m.p));
    d.appendChild(el("span", "src", "Quelle: " + m.src));
    mechEl.appendChild(d);
  });

  var factsEl = $("#facts");
  FACTS.forEach(function (f) {
    var d = el("div", "fact");
    d.appendChild(el("span", "fig", f.n));
    d.appendChild(el("p", null, f.p));
    d.appendChild(el("span", "src", "Quelle: " + f.src));
    factsEl.appendChild(d);
  });

  var actsEl = $("#acts");
  ACTIONS.forEach(function (a, i) {
    var d = el("div", "act");
    d.appendChild(el("span", "n", String(i + 1)));
    d.appendChild(el("h3", null, a.h));
    d.appendChild(el("p", null, a.p));
    d.appendChild(el("span", "src", "Quelle: " + a.src));
    actsEl.appendChild(d);
  });

  /* -- Karussell: Skalierung nach Abstand zur Mitte, Ziehen, Blättern -- */
  (function () {
    var cards = $$(".act", actsEl);
    if (!cards.length) return;
    var posEl = $("#actPos");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* pending wird sofort beim Klick gesetzt, active erst beim Scrollen.
       Sonst rechnen zwei schnelle Klicks beide vom selben Stand aus. */
    var ticking = false, active = 0, pending = 0;

    function update() {
      ticking = false;
      var box = actsEl.getBoundingClientRect();
      var mid = box.left + box.width / 2;
      var best = 0, bestD = Infinity;
      cards.forEach(function (c, i) {
        var r = c.getBoundingClientRect();
        var d = Math.abs((r.left + r.width / 2) - mid);
        var t = Math.min(d / (box.width / 2 || 1), 1);
        if (!reduce) {
          c.style.transform = "scale(" + (1 - t * 0.14).toFixed(3) + ")";
          c.style.opacity = (1 - t * 0.5).toFixed(3);
        }
        if (d < bestD) { bestD = d; best = i; }
      });
      cards.forEach(function (c, i) { c.classList.toggle("is-active", i === best); });
      active = best;
      if (!down) pending = best;
      posEl.textContent = (best + 1) + " / " + cards.length;
    }

    actsEl.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });

    function go(dir) {
      pending = Math.min(cards.length - 1, Math.max(0, pending + dir));
      cards[pending].scrollIntoView({
        behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest"
      });
    }
    $("#actPrev").addEventListener("click", function () { go(-1); });
    $("#actNext").addEventListener("click", function () { go(1); });

    /* Ziehen mit der Maus — Touch und Trackpad kann der Browser selbst. */
    var down = false, startX = 0, startLeft = 0, moved = 0;
    actsEl.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      down = true; moved = 0;
      startX = e.clientX; startLeft = actsEl.scrollLeft;
      actsEl.classList.add("dragging");
      actsEl.setPointerCapture(e.pointerId);
    });
    actsEl.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      actsEl.scrollLeft = startLeft - dx;
    });
    function endDrag(e) {
      if (!down) return;
      down = false;
      actsEl.classList.remove("dragging");
      try { actsEl.releasePointerCapture(e.pointerId); } catch (err) {}
      /* Einrasten wieder aktivieren und zur nächsten Karte springen. */
      var box = actsEl.getBoundingClientRect();
      var mid = box.left + box.width / 2, best = 0, bestD = Infinity;
      cards.forEach(function (c, i) {
        var r = c.getBoundingClientRect();
        var d = Math.abs((r.left + r.width / 2) - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      cards[best].scrollIntoView({
        behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest"
      });
    }
    actsEl.addEventListener("pointerup", endDrag);
    actsEl.addEventListener("pointercancel", endDrag);
    actsEl.addEventListener("click", function (e) {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    update();
    window.addEventListener("resize", update);
  })();

  /* ---------------------------------------------------------
     5 — TICKER
     Die Codes, die gerade im Umlauf sind.
     Liste wird verdoppelt, damit die Schleife nahtlos läuft.
     --------------------------------------------------------- */
  var tickerEl = $("#ticker");
  var ticker = CODES.map(function (x) { return x.t; });
  ticker.concat(ticker).forEach(function (t) {
    tickerEl.appendChild(el("span", null, t));
  });

  /* ---------------------------------------------------------
     6 — FRIES
     Die sieben Narrativ-Zeichen als Stempelband. Füllt die
     Bandbreite, damit auf breiten Schirmen keine Lücke bleibt.
     --------------------------------------------------------- */
  $$(".frieze").forEach(function (band) {
    for (var i = 0; i < 28; i++) {
      band.appendChild(svgFor(CATEGORIES[i % CATEGORIES.length]));
    }
  });

  /* ---------------------------------------------------------
     7 — RING UM DIE ZAHL
     Zeichnet sich, sobald er ins Bild kommt.
     --------------------------------------------------------- */
  var circled = $(".circled");
  if (circled) {
    if (!("IntersectionObserver" in window)) {
      circled.classList.add("drawn");
    } else {
      var ringIO = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("drawn"); ringIO.unobserve(e.target); }
        });
      }, { threshold: .6 });
      ringIO.observe(circled);
    }
  }

  /* ---------------------------------------------------------
     8 — GEKRITZEL-EBENE
     Handgezeichnete Marken über die ganze Seite, wie mit Edding
     aufs Plakat. Bewusst KEIN Dreieck-mit-Auge: das ist in diesem
     Lexikon ein antisemitischer Code, kein Ornament.
     --------------------------------------------------------- */
  var MARKS = {
    x:      '<path d="M6 8c14 16 30 32 46 44M52 7C38 22 22 38 8 52"/>',
    zigzag: '<path d="M2 34c8-14 14 8 22-6s14 10 22-4 14 8 22-6"/>',
    ring:   '<path d="M9 30C7 15 24 6 49 7c24 1 43 9 44 22 1 13-17 22-43 22C25 51 11 44 9 29c0-5 1-10 5-15"/>',
    arrow:  '<path d="M4 46C16 22 40 8 74 6"/><path d="M60 3l16 4M76 7l-9 13"/>',
    spark:  '<path d="M30 2v20M30 38v20M2 30h20M38 30h20M11 11l13 13M36 36l13 13M49 11L36 24M24 36 11 49"/>',
    tick:   '<path d="M4 30c10 10 18 16 24 20 10-18 24-34 42-46"/>'
  };
  var VIEWBOX = { x: "0 0 60 60", zigzag: "0 0 70 40", ring: "0 0 100 60",
                  arrow: "0 0 80 52", spark: "0 0 60 60", tick: "0 0 72 54" };

  /* Feste Positionen statt Zufall — reproduzierbar und kontrolliert. */
  var SCATTER = {
    scan:     [["x", 88, 4, 14, 34], ["zigzag", 4, 62, 12, -8]],
    test:     [["spark", 92, 12, 11, 0], ["tick", 3, 78, 13, -12]],
    codes:    [["zigzag", 90, 70, 13, 9], ["x", 5, 8, 10, -18]],
    mechanik: [["arrow", 88, 82, 14, 22], ["x", 6, 90, 9, 12]],
    tun:      [["spark", 4, 8, 10, 0], ["zigzag", 93, 40, 12, -14]],
    melden:   [["x", 92, 74, 11, 26]]
  };

  Object.keys(SCATTER).forEach(function (id) {
    var sec = document.getElementById(id);
    if (!sec) return;
    SCATTER[id].forEach(function (cfg) {
      var kind = cfg[0];
      var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      s.setAttribute("viewBox", VIEWBOX[kind]);
      s.setAttribute("fill", "none");
      s.setAttribute("stroke", "currentColor");
      s.setAttribute("stroke-width", "4");
      s.setAttribute("stroke-linecap", "round");
      s.setAttribute("aria-hidden", "true");
      s.setAttribute("class", "scrawl");
      s.innerHTML = MARKS[kind];
      s.style.left = cfg[1] + "%";
      s.style.top = cfg[2] + "%";
      s.style.width = cfg[3] + "rem";
      s.style.transform = "rotate(" + cfg[4] + "deg)";
      sec.insertBefore(s, sec.firstChild);
    });
  });

  /* ---------------------------------------------------------
     9 — SCROLL-REVEAL
     --------------------------------------------------------- */
  var reveals = $$(".rv");
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach(function (n) { n.classList.add("in"); });
  } else {
    window.__rvReady = true;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.06 });
    reveals.forEach(function (n) { io.observe(n); });
  }
})();
