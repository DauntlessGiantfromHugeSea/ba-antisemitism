/* =========================================================
   Interaktion
   ========================================================= */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  /* Hinweis neben jeder Quelle zu einem Code: Codes zeigen ihre Bedeutung
     erst im Zusammenhang (BfV S. 21). */
  var KONTEXT = " · Immer im Kontext zu betrachten.";
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  /* ---------------------------------------------------------
     0 — EINGANGSHINWEIS
     Nur per JS geoeffnet: Faellt JS aus, bleibt der Dialog zu
     und die Seite normal lesbar. Der Hinweis steht dann in der
     Fusszeile. Einmal pro Sitzung.
     --------------------------------------------------------- */
  (function () {
    var gate = $("#gate");
    if (!gate || typeof gate.showModal !== "function") return;

    var KEY = "zl-hinweis-gelesen";
    var seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
    if (seen) return;

    function done() {
      try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
      document.documentElement.classList.remove("gated");
    }

    document.documentElement.classList.add("gated");
    gate.addEventListener("close", done);
    /* Escape zaehlt als gelesen — einen Modal-Dialog nicht schliessbar
       zu machen waere ein Barrierefreiheitsproblem. */
    $("#gateOk").addEventListener("click", function () { gate.close(); });
    gate.showModal();
  })();

  /* ---------------------------------------------------------
     Karussell — geteilt von Posts und Handlungsschritten.
     Native scroll-snap; JS ergaenzt Skalierung nach Abstand zur
     Mitte, Maus-Ziehen, Blaettern und Positionsanzeige.
     --------------------------------------------------------- */
  function carousel(scroller, itemSel, prevSel, nextSel, posSel, onChange) {
    var cards = $$(itemSel, scroller);
    if (!cards.length) return;
    var posEl = $(posSel);
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ticking = false, active = 0, pending = 0, down = false, notified = -1;

    function update() {
      ticking = false;
      var box = scroller.getBoundingClientRect();
      var mid = box.left + box.width / 2;
      var best = 0, bestD = Infinity;
      cards.forEach(function (c, i) {
        var r = c.getBoundingClientRect();
        var d = Math.abs((r.left + r.width / 2) - mid);
        var t = Math.min(d / (box.width / 2 || 1), 1);
        if (!reduce) {
          c.style.transform = "scale(" + (1 - t * 0.12).toFixed(3) + ")";
          c.style.opacity = (1 - t * 0.45).toFixed(3);
        }
        if (d < bestD) { bestD = d; best = i; }
      });
      cards.forEach(function (c, i) { c.classList.toggle("is-active", i === best); });
      active = best;
      if (!down) pending = best;
      if (posEl) posEl.textContent = (best + 1) + " / " + cards.length;
      /* Nur bei echtem Wechsel melden, nicht bei jedem Scroll-Frame. */
      if (onChange && best !== notified) { notified = best; onChange(best, cards); }
    }

    scroller.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });

    function snapTo(i) {
      cards[i].scrollIntoView({
        behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest"
      });
    }
    function go(dir) {
      pending = Math.min(cards.length - 1, Math.max(0, pending + dir));
      snapTo(pending);
    }
    var pv = $(prevSel), nx = $(nextSel);
    if (pv) pv.addEventListener("click", function () { go(-1); });
    if (nx) nx.addEventListener("click", function () { go(1); });

    /* Maus-Ziehen. Touch und Trackpad kann der Browser selbst. */
    var startX = 0, startLeft = 0, moved = 0;
    scroller.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      if (e.target.closest("button, a")) return;
      down = true; moved = 0;
      startX = e.clientX; startLeft = scroller.scrollLeft;
      scroller.classList.add("dragging");
      scroller.setPointerCapture(e.pointerId);
    });
    scroller.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      scroller.scrollLeft = startLeft - dx;
    });
    function endDrag(e) {
      if (!down) return;
      down = false;
      scroller.classList.remove("dragging");
      try { scroller.releasePointerCapture(e.pointerId); } catch (err) {}
      var box = scroller.getBoundingClientRect();
      var mid = box.left + box.width / 2, best = 0, bestD = Infinity;
      cards.forEach(function (c, i) {
        var r = c.getBoundingClientRect();
        var d = Math.abs((r.left + r.width / 2) - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      pending = best; snapTo(best);
    }
    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointercancel", endDrag);
    scroller.addEventListener("click", function (e) {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    update();
    window.addEventListener("resize", update);
  }

  /* ---------------------------------------------------------
     1 — SCAN: vier Posts im Karussell, jeder einzeln scannbar
     --------------------------------------------------------- */
  var postsEl = $("#posts");
  var bubbleEl = $("#bubble");
  var wrapEl = postsEl.parentElement;
  var allToks = [];
  var postResets = [];

  function closeBubble() {
    bubbleEl.hidden = true;
    bubbleEl.classList.remove("open");
    allToks.forEach(function (o) { o.setAttribute("aria-expanded", "false"); });
  }

  /* Sprechblase am angeklickten Code. Liegt ausserhalb des Scrollers,
     sonst wuerde sie vom overflow abgeschnitten. */
  function openBubble(tok, part) {
    bubbleEl.innerHTML = "";
    var h = el("p", "bub-term", part.mark);
    bubbleEl.appendChild(h);
    bubbleEl.appendChild(el("p", "bub-kind", part.kind));
    bubbleEl.appendChild(el("p", "bub-note", part.note));
    if (part.src) bubbleEl.appendChild(el("span", "src", "Quelle: " + part.src + KONTEXT));

    var close = el("button", "bub-x", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Schließen");
    close.addEventListener("click", closeBubble);
    bubbleEl.appendChild(close);

    bubbleEl.hidden = false;
    bubbleEl.classList.add("open");

    var t = tok.getBoundingClientRect();
    var w = wrapEl.getBoundingClientRect();
    var bw = bubbleEl.offsetWidth;
    var left = (t.left - w.left) + t.width / 2 - bw / 2;
    left = Math.max(8, Math.min(left, w.width - bw - 8));
    bubbleEl.style.left = Math.round(left) + "px";
    bubbleEl.style.top = Math.round(t.bottom - w.top + 10) + "px";

    /* Zeiger auf den Code ausrichten */
    var tip = (t.left - w.left) + t.width / 2 - left;
    bubbleEl.style.setProperty("--tip", Math.round(Math.max(16, Math.min(tip, bw - 16))) + "px");
  }

  POSTS.forEach(function (post, pi) {
    var card = el("article", "post");

    var head = el("div", "post-head");
    head.appendChild(el("span", "post-av", String(pi + 1)));
    var who = el("div");
    who.appendChild(el("span", "post-handle", post.handle));
    who.appendChild(el("span", "post-meta", post.meta));
    head.appendChild(who);
    card.appendChild(head);

    var body = el("p", "post-body");
    var n = 0;
    post.parts.forEach(function (part) {
      if (part.txt) { body.appendChild(document.createTextNode(part.txt)); return; }
      n += 1;
      var idx = n;
      var b = el("button", "tok");
      b.type = "button";
      b.dataset.n = String(idx);
      b.setAttribute("aria-expanded", "false");
      b.disabled = true;
      b.appendChild(document.createTextNode(part.mark));
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var wasOpen = b.getAttribute("aria-expanded") === "true";
        closeBubble();
        if (wasOpen) return;
        b.setAttribute("aria-expanded", "true");
        openBubble(b, part);
      });
      allToks.push(b);
      body.appendChild(b);
    });
    card.appendChild(body);

    var bar = el("div", "post-bar");
    var btn = el("button", "btn mark", "Codes markieren");
    btn.type = "button";
    var count = el("span", "post-count", n + " versteckt");
    bar.appendChild(btn);
    bar.appendChild(count);
    card.appendChild(bar);

    /* Gegenrede — erst nach dem Scan sichtbar. */
    var reply = el("div", "post-reply");
    reply.appendChild(el("p", "post-reply-h", "Was du antworten kannst"));
    reply.appendChild(el("p", null, post.reply));
    reply.appendChild(el("span", "src", "Quelle: " + post.replySrc));
    card.appendChild(reply);

    var toks = $$(".tok", card);
    btn.addEventListener("click", function () {
      if (card.classList.contains("scanned")) {
        card.classList.remove("scanned");
        toks.forEach(function (t) { t.disabled = true; t.setAttribute("aria-expanded", "false"); });
        btn.textContent = "Codes markieren";
        btn.classList.add("mark");
        count.textContent = n + " versteckt";
        closeBubble();
        return;
      }
      card.classList.add("scanning");
      btn.disabled = true;
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(function () {
        card.classList.remove("scanning");
        card.classList.add("scanned");
        toks.forEach(function (t) { t.disabled = false; });
        btn.disabled = false;
        btn.textContent = "Zurücksetzen";
        btn.classList.remove("mark");
        count.textContent = n + " gefunden";
      }, reduce ? 10 : 1000);
    });

    /* Zuruecksetzen, wenn die Karte aus dem Fokus scrollt. */
    postResets.push(function () {
      if (!card.classList.contains("scanned")) return;
      card.classList.remove("scanned");
      toks.forEach(function (t) {
        t.disabled = true;
        t.setAttribute("aria-expanded", "false");
      });
      btn.textContent = "Codes markieren";
      btn.classList.add("mark");
      count.textContent = n + " versteckt";
    });

    card.appendChild(el("div", "scanline"));
    postsEl.appendChild(card);
  });

  postsEl.addEventListener("scroll", closeBubble, { passive: true });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeBubble();
  });

  /* Beim Blaettern klappen die anderen Karten wieder zu — sonst bleibt
     eine aufgeklappte Erklaerung hinter einem stehen. */
  carousel(postsEl, ".post", "#postPrev", "#postNext", "#postPos",
    function (activeIndex) {
      var changed = false;
      postResets.forEach(function (reset, i) {
        if (i !== activeIndex) {
          var before = POSTS_SCANNED(i);
          reset();
          if (before) changed = true;
        }
      });
      closeBubble();
    });

  function POSTS_SCANNED(i) {
    var c = $$(".post", postsEl)[i];
    return !!(c && c.classList.contains("scanned"));
  }

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
    v.appendChild(el("span", "src", "Quelle: " + item.src + KONTEXT));
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
    if (q >= .9)      msg = "Du erkennst auch die Graubereiche. Das ist der schwierige Teil.";
    else if (q >= .6) msg = "Die klaren Codes erkennst du. Schwierig wird es da, wo der Kontext entscheidet.";
    else if (q >= .3) msg = "Die meisten Codes wirken, weil sie beim ersten Lesen harmlos aussehen.";
    else              msg = "Ganz normal. Genau deshalb funktionieren Codes: Sie sind gemacht, um nicht aufzufallen.";
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
     Sechs Erzählungen und ein Werkzeugfeld. Erst antippen zeigt die Codes.
     --------------------------------------------------------- */
  var glyphsEl = $("#glyphs");
  var drillEl  = $("#drill");
  var openCat  = null;

  /* Zeichen einer Kachel aus assets/icons/<icon>. Die Datei dient als
     Maske, die Fläche dahinter hat die Schriftfarbe der Kachel. So wird
     das Zeichen auf der roten, aktiven Kachel weiß. Ohne icon bleibt die
     Kachel ohne Zeichen, und es wird keine Datei angefragt.
     Roter Strich und Satz gehören nur zu den alten Zeichen, die selbst
     einen Code zeigen. Sie heißen alt-<id>.svg. Ein neues, neutrales
     Zeichen <id>.svg steht immer ohne Strich und ohne Satz, auch wenn
     bei der Kachel noch sign eingetragen ist. */
  function isOldIcon(cat) {
    return !!(cat.icon && /^alt-/.test(cat.icon) && cat.sign);
  }
  function iconFor(cat) {
    var ico = el("span", "gl-ico" + (isOldIcon(cat) ? " is-code" : ""));
    ico.setAttribute("aria-hidden", "true");
    var img = el("span", "gl-ico-img");
    var url = "url(\"assets/icons/" + cat.icon + "\")";
    img.style.webkitMaskImage = url;
    img.style.maskImage = url;
    ico.appendChild(img);
    return ico;
  }

  /* Kachel: Knopf mit Zahl, Zeichen und Name. Das Zeichen steht rot
     gestrichen, darunter ein Satz, welchen Code es zeigt und was er
     bedeutet (Bedeutung aus KURZ). */
  CATEGORIES.forEach(function (cat) {
    var n = CODES.filter(function (x) { return x.c === cat.id; }).length;
    var tile = el("div", "glyph-tile");
    tile.dataset.cat = cat.id;
    var b = el("button", "glyph");
    b.type = "button";
    b.dataset.cat = cat.id;
    b.setAttribute("aria-pressed", "false");
    if (cat.icon) b.appendChild(iconFor(cat));
    else b.classList.add("no-ico");
    var lab = el("span", "gl-label", cat.label);
    if (cat.tool) lab.appendChild(el("small", "gl-tag", "Werkzeug, keine Erzählung"));
    b.appendChild(lab);
    b.appendChild(el("span", "gl-n", String(n)));
    b.addEventListener("click", function () { toggleCat(cat); });
    tile.appendChild(b);
    /* Der Satz erklärt ein altes Zeichen, das einen Code zeigt. Ohne
       Zeichen oder mit neuem, neutralem Zeichen entfällt er. */
    if (isOldIcon(cat) && typeof KURZ !== "undefined" && KURZ[cat.sign.code]) {
      var sign = el("p", "gl-sign");
      sign.appendChild(document.createTextNode(cat.sign.lead + " "));
      sign.appendChild(el("s", null, cat.sign.code));
      sign.appendChild(document.createTextNode(". " + KURZ[cat.sign.code]));
      tile.appendChild(sign);
    }
    glyphsEl.appendChild(tile);
  });

  function toggleCat(cat) {
    var same = openCat === cat.id;
    openCat = same ? null : cat.id;

    $$(".glyph", glyphsEl).forEach(function (g) {
      g.setAttribute("aria-pressed", String(g.dataset.cat === openCat));
    });
    $$(".glyph-tile", glyphsEl).forEach(function (t) {
      t.classList.toggle("is-on", t.dataset.cat === openCat);
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
      var b = el("button", x.lvl === "kontext" ? "card is-kontext" : "card");
      b.type = "button";
      b.dataset.t = x.t;
      b.setAttribute("aria-expanded", "false");

      var term = el("div", "term");
      /* Seit dem 21.11.2026 steht im Lexikon nichts gestrichen, weil jeder
         Eintrag seine Einordnung direkt daneben zeigt. Titel mit Emoji heißen
         „Name / Emoji“, etwa „Ratte / 🐀“, wie auf den Plakaten. */
      var name = el("span", "term-t");
      x.t.split(" / ").forEach(function (part, i) {
        if (i) name.appendChild(document.createTextNode(" / "));
        var isEmo = /\p{Extended_Pictographic}/u.test(part);
        name.appendChild(el("span", isEmo ? "emo" : null, part));
      });
      term.appendChild(name);
      term.appendChild(el("span", "plus", "+"));
      b.appendChild(term);
      /* Urteilsstufe wie im Test. Solche Einträge gelten nicht als Code
         und stehen deshalb ungestrichen, aber immer mit dieser Marke. */
      if (x.lvl === "kontext") b.appendChild(el("span", "lvl", "Kommt auf den Kontext an"));
      /* Seit dem 21.11.2026 steht jeder Code schon in der geschlossenen Karte
         mit einem Satz Einordnung: die Kurzbedeutung aus KURZ oder der erste
         Satz der Erklärung. Die ganze Erklärung klappt darunter auf. */
      var kurzSatz = (typeof KURZ !== "undefined" && KURZ[x.t]) || (x.d.match(/^.*?[.!?](?=\s|$)/) || [x.d])[0];
      b.appendChild(el("p", "kurz", kurzSatz));
      b.appendChild(el("div", "def", x.d));
      b.appendChild(el("div", "cat", "Quelle: " + x.src + KONTEXT));
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
     CODES-ÜBERSICHT im Kopf: Formen mal Werkzeuge
     Zählt die Felder f und w aus CODES. Seit dem 09.11.2026 zeigt jedes
     Feld nur die Zahl. Die Codewörter stehen nur in den aufklappbaren
     Karten im Abschnitt Codes, immer mit Bedeutung (Regel „kein Code ohne
     Bedeutung“). Einträge der Stufe
     „Kommt auf den Kontext an“ (lvl: "kontext") gelten nicht als Code
     und zählen nicht mit. Die Tabelle in index.html bleibt als Stand
     ohne JavaScript stehen und wird hier ersetzt.
     --------------------------------------------------------- */
  var matrixT = $(".matrix-t");
  if (matrixT && typeof FORMS !== "undefined" && typeof WERKZEUGE !== "undefined") {
    var mxCodes = CODES.filter(function (x) { return x.lvl !== "kontext" && x.f && x.w; });
    var cell = {};
    mxCodes.forEach(function (x) {
      var k = x.f + "|" + x.w;
      (cell[k] = cell[k] || []).push(x);
    });
    var colSum = WERKZEUGE.map(function () { return 0; });

    var mkCell = function (tag, cls, label) {
      var c = el(tag, cls);
      c.setAttribute("role", tag === "th" ? "rowheader" : "cell");
      if (tag === "th") c.setAttribute("scope", "row");
      if (label) c.setAttribute("data-label", label);
      return c;
    };

    var mkRow = function (f) {
      var tr = el("tr", f.rand ? "mx-ctx" : null);
      tr.setAttribute("role", "row");
      var th = mkCell("th");
      th.appendChild(document.createTextNode(f.label));
      th.appendChild(el("small", null, f.fach));
      tr.appendChild(th);
      var rowSum = 0;
      WERKZEUGE.forEach(function (w, wi) {
        var list = cell[f.id + "|" + w.id] || [];
        var n = list.length;
        rowSum += n; colSum[wi] += n;
        var td = mkCell("td", "mx-c" + (n ? "" : " mx-0") + (w.rand || f.rand ? " mx-rand" : ""), w.label);
        td.setAttribute("data-n", String(n));
        td.appendChild(el("span", "mx-v", String(n)));
        tr.appendChild(td);
      });
      var sum = mkCell("td", "mx-sum", "Summe");
      sum.appendChild(el("span", "mx-v", String(rowSum)));
      tr.appendChild(sum);
      return tr;
    };

    var mainBody = el("tbody");
    var footBody = el("tbody", "mx-foot");
    mainBody.setAttribute("role", "rowgroup");
    footBody.setAttribute("role", "rowgroup");
    FORMS.forEach(function (f) { (f.rand ? footBody : mainBody).appendChild(mkRow(f)); });

    var tot = el("tr", "mx-total");
    tot.setAttribute("role", "row");
    var totTh = mkCell("th", null);
    totTh.textContent = "Summe";
    tot.appendChild(totTh);
    WERKZEUGE.forEach(function (w, wi) {
      var td = mkCell("td", "mx-sum" + (w.rand ? " mx-rand" : ""), w.label);
      td.appendChild(el("span", "mx-v", String(colSum[wi])));
      tot.appendChild(td);
    });
    var all = mkCell("td", "mx-sum mx-all", "Summe");
    all.appendChild(el("span", "mx-v", String(mxCodes.length)));
    tot.appendChild(all);
    footBody.appendChild(tot);

    /* Alte Zeilen ersetzen, der Tabellenkopf bleibt. */
    $$("tbody", matrixT).forEach(function (b) { b.remove(); });
    matrixT.appendChild(mainBody);
    matrixT.appendChild(footBody);
    var mxTotal = $("#mxTotal");
    if (mxTotal) mxTotal.textContent = String(mxCodes.length);
  }

  /* ---------------------------------------------------------
     4 — MECHANIK · ZAHLEN · WAS TUN
     Jede Aussage trägt ihre Herkunft.
     --------------------------------------------------------- */
  /* Die vier Stilmittel der Propaganda-Collage (MECHANIK), direkt unter
     der Bildnotiz und vor den Werkzeugen. Jede Karte mit eigener Quelle. */
  var stilEl = $("#stil");
  if (stilEl) {
    MECHANIK.forEach(function (m) {
      var d = el("div", "mech-item stil-item");
      d.appendChild(el("h3", null, m.h));
      d.appendChild(el("p", null, m.p));
      d.appendChild(el("span", "src", "Quelle: " + m.src));
      stilEl.appendChild(d);
    });
  }

  /* Die sechs Werkzeuge der Umwegkommunikation (BfV S. 71 f.). */
  var mechEl = $("#mech");
  TOOLS.forEach(function (m) {
    var d = el("div", "mech-item");
    d.appendChild(el("span", "n", m.n));
    d.appendChild(el("h3", null, m.h));
    d.appendChild(el("p", null, m.p));
    /* Beispiele sind Einträge aus CODES. Sie stehen gestrichen und immer
       mit ihrer Kurzbedeutung aus KURZ, damit kein Code ohne Erklärung
       bleibt (so auch „109 / 110“, „271k / 271.000 / 271“ und „88“ bei
       Werkzeug 5, Stand 16.11.2026). */
    var ex = el("ul", "ex");
    (m.codes || []).forEach(function (t) {
      if (typeof KURZ === "undefined" || !KURZ[t]) return;
      var li = el("li");
      li.appendChild(el("s", "strike", t));
      li.appendChild(el("span", "ex-k", KURZ[t]));
      ex.appendChild(li);
    });
    d.appendChild(ex);
    d.appendChild(el("span", "src", "Quelle: BfV, S. 71 f."));
    mechEl.appendChild(d);
  });

  /* Die vier Wirkebenen (BfV S. 73) als Reihe mit Zeichen. */
  var levelsEl = $("#levels");
  if (levelsEl && typeof LEVELS !== "undefined") {
    LEVELS.forEach(function (l, i) {
      var li = el("li", "level");
      var top = el("div", "level-top");
      top.appendChild(el("span", "level-n", "Ebene " + (i + 1)));
      var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      s.setAttribute("viewBox", "0 0 64 64");
      s.setAttribute("fill", "none");
      s.setAttribute("stroke", "currentColor");
      s.setAttribute("stroke-width", "3");
      s.setAttribute("stroke-linecap", "square");
      s.setAttribute("stroke-linejoin", "miter");
      s.setAttribute("aria-hidden", "true");
      s.innerHTML = l.icon || "";
      top.appendChild(s);
      li.appendChild(top);
      li.appendChild(el("h4", null, l.h));
      li.appendChild(el("p", null, l.p));
      levelsEl.appendChild(li);
    });
  }

  var factsEl = $("#facts");
  FACTS.forEach(function (f) {
    var d = el("div", "fact");
    d.appendChild(el("span", /\d/.test(f.n) ? "fig" : "fig word", f.n));
    d.appendChild(el("p", null, f.p));
    d.appendChild(el("span", "src", "Quelle: " + f.src));
    factsEl.appendChild(d);
  });

  /* Was tun: fünf Schritte als Ablauf (Liste mit Linie und Pfeilen). */
  var actsEl = $("#acts");
  ACTIONS.forEach(function (a, i) {
    var d = el("li", "step");
    d.appendChild(el("span", "step-n", String(i + 1)));
    d.appendChild(el("h3", null, a.h));
    d.appendChild(el("p", null, a.p));
    d.appendChild(el("span", "src", "Quelle: " + a.src));
    actsEl.appendChild(d);
  });


  /* ---------------------------------------------------------
     Häufige Fragen — Details/Summary, kein eigenes JS nötig
     --------------------------------------------------------- */
  var faqEl = $("#faq");
  if (faqEl) {
    FAQ.forEach(function (item) {
      var d = el("details", "faq-item");
      var sum = el("summary");
      sum.appendChild(el("span", "faq-q", item.q));
      sum.appendChild(el("span", "faq-plus", "+"));
      d.appendChild(sum);
      var body = el("div", "faq-a");
      body.appendChild(el("p", null, item.a));
      body.appendChild(el("span", "src", "Quelle: " + item.src));
      d.appendChild(body);
      /* Immer nur eine Frage offen. */
      d.addEventListener("toggle", function () {
        if (!d.open) return;
        $$(".faq-item", faqEl).forEach(function (o) { if (o !== d) o.open = false; });
      });
      faqEl.appendChild(d);
    });
  }

  /* ---------------------------------------------------------
     5 — LAUFBAND
     Gestrichene Codes, jeder mit seiner Kurzbedeutung aus KURZ.
     Ohne Personennamen, ohne offen Gesagtes und ohne Kontextstufe
     (Regeln aus dem fachlichen Abgleich vom 25.10.2026). Die Liste
     steht zweimal da, damit die Schleife nahtlos läuft. Das Band ist
     für Screenreader versteckt, die Alternative steht im HTML.
     --------------------------------------------------------- */
  var tickerEl = $("#ticker");
  if (tickerEl && typeof KURZ !== "undefined") {
    var tickCodes = CODES.filter(function (x) {
      return KURZ[x.t] && x.w !== "person" && x.w !== "offen" && x.lvl !== "kontext";
    });
    tickCodes.concat(tickCodes).forEach(function (x) {
      var item = el("span", "tk");
      item.appendChild(el("span", "tk-code", x.t));
      item.appendChild(el("span", "tk-k", KURZ[x.t]));
      tickerEl.appendChild(item);
    });
    var tickerBox = tickerEl.parentElement;
    var tickBtn = $("#tickerBtn");
    var tickReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Gleichmäßiges Tempo, egal wie viele Codes im Band stehen. */
    var setSpeed = function () {
      var half = tickerEl.scrollWidth / 2;
      if (half > 0) tickerEl.style.animationDuration = Math.round(half / 60) + "s";
    };
    if (!tickReduce) {
      setSpeed();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(setSpeed);
    }
    /* Anhalten per Knopf, damit auch die Tastatur das Band stoppen kann. */
    if (tickBtn && !tickReduce) {
      tickBtn.hidden = false;
      tickBtn.addEventListener("click", function () {
        var paused = tickerBox.classList.toggle("is-paused");
        tickBtn.setAttribute("aria-pressed", String(paused));
        tickBtn.textContent = paused ? "Laufband weiter" : "Laufband anhalten";
      });
    }
  }

  /* ---------------------------------------------------------
     6 — KOPFLEISTE
     Rand beim Scrollen, Lesefortschritt, aktiver Abschnitt.
     --------------------------------------------------------- */
  var topbar = $("#topbar");
  var readBar = $("#readBar");
  var navLinks = $$(".nav a");
  var headTicking = false;

  function onScroll() {
    headTicking = false;
    var y = window.scrollY || window.pageYOffset;
    if (topbar) topbar.classList.toggle("scrolled", y > 8);
    if (readBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      readBar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0).toFixed(4) + ")";
    }
  }
  window.addEventListener("scroll", function () {
    if (!headTicking) { headTicking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window && navLinks.length) {
    var navIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + e.target.id;
          a.classList.toggle("is-current", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute("href"));
      if (sec) navIO.observe(sec);
    });
  }

  /* ---------------------------------------------------------
     7 — MENÜ auf schmalen Schirmen
     Vollbild-Ebene. Escape und Linkklick schließen.
     --------------------------------------------------------- */
  var menuBtn = $("#menuBtn");
  var nav = $("#nav");
  if (menuBtn && nav) {
    var setMenu = function (open) {
      menuBtn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("open", open);
      document.documentElement.classList.toggle("menu-open", open);
      menuBtn.querySelector(".menu-lbl").textContent = open ? "Schließen" : "Menü";
    };
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    navLinks.forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 896 && nav.classList.contains("open")) setMenu(false);
    });
  }

  /* ---------------------------------------------------------
     8 — ZAHL IM KOPF zählt hoch
     Ohne JS steht die Zahl fest im HTML.
     --------------------------------------------------------- */
  var totalEl = $("#total");
  if (totalEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var target = CODES.length, t0 = null;
    totalEl.textContent = "0";
    var tick = function (ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min((ts - t0) / 1400, 1);
      totalEl.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) window.requestAnimationFrame(tick);
    };
    var startCount = function () {
      window.setTimeout(function () { window.requestAnimationFrame(tick); }, 450);
    };
    /* Hinter dem Eingangshinweis liefe die Zahl ungesehen ab. */
    if (document.documentElement.classList.contains("gated")) {
      $("#gate").addEventListener("close", startCount, { once: true });
    } else {
      startCount();
    }
  }

  /* ---------------------------------------------------------
     10 — SCROLL-REVEAL
     --------------------------------------------------------- */
  var reveals = $$(".rv");
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach(function (n) { n.classList.add("in"); });
    /* Auch hier melden, dass app.js läuft. Sonst nimmt das Sicherheitsnetz
       im Kopf der Seite nach 2 s die Klasse js weg, und bei reduzierter
       Bewegung fällt das Menü am Handy auf die Notfall-Zeile zurück. */
    window.__rvReady = true;
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
