// As animações das iscas: o número que sobe, a revelação em sequência, o medidor de posição e as barras.
// Quem pede menos movimento no sistema vê tudo no lugar final, sem animação.
(function () {
  var FX = (window.FX = {});
  FX.reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  FX.wait = function (ms) { return new Promise(function (r) { setTimeout(r, FX.reduced ? 0 : ms); }); };
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  // o número sobe de `de` até `para`, formatado por `fmt`
  FX.countUp = function (el, para, opts) {
    opts = opts || {};
    var de = opts.de || 0, dur = opts.dur || 1400, fmt = opts.fmt || function (v) { return Math.round(v); };
    if (FX.reduced) { el.textContent = fmt(para); return Promise.resolve(); }
    return new Promise(function (res) {
      var t0 = null;
      function frame(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / dur);
        el.textContent = fmt(de + (para - de) * ease(k));
        if (k < 1) requestAnimationFrame(frame); else res();
      }
      requestAnimationFrame(frame);
    });
  };

  // os filhos entram um depois do outro (a classe .in faz a transição no CSS)
  FX.stagger = function (nodes, passo) {
    nodes = Array.prototype.slice.call(nodes);
    return nodes.reduce(function (p, n, i) {
      return p.then(function () { n.classList.add("in"); return FX.wait(i ? passo || 140 : 0); });
    }, Promise.resolve());
  };

  // medidor em meia-lua: `pct` de 0 a 100, com o ponteiro que anda até a posição
  FX.gauge = function (box, pct, opts) {
    opts = opts || {};
    var r = 80, cx = 100, cy = 96, faixas = opts.faixas || [33, 66];
    function pt(p, rr) { var a = Math.PI * (1 - p / 100); return [cx + rr * Math.cos(a), cy - rr * Math.sin(a)]; }
    function arco(p0, p1, cor) {
      var a = pt(p0, r), b = pt(p1, r);
      return '<path d="M' + a[0] + " " + a[1] + " A" + r + " " + r + " 0 0 1 " + b[0] + " " + b[1] + '" stroke="' + cor + '" stroke-width="16" fill="none" stroke-linecap="butt"/>';
    }
    box.innerHTML = '<svg viewBox="0 0 200 118" role="img" aria-label="' + (opts.label || "") + '">' +
      arco(0, faixas[0] - 1, "var(--g-low)") + arco(faixas[0] + 1, faixas[1] - 1, "var(--g-mid)") + arco(faixas[1] + 1, 100, "var(--g-high)") +
      '<g class="needle"><line x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy - r + 6) + '" stroke="var(--fg)" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="7" fill="var(--fg)"/></g></svg>';
    var g = box.querySelector(".needle");
    var alvo = -90 + 180 * Math.max(0, Math.min(100, pct)) / 100;
    g.style.transformOrigin = cx + "px " + cy + "px";
    g.style.transform = "rotate(-90deg)";
    if (FX.reduced) { g.style.transform = "rotate(" + alvo + "deg)"; return Promise.resolve(); }
    return new Promise(function (res) {
      requestAnimationFrame(function () {
        g.style.transition = "transform 1.3s cubic-bezier(.2,.8,.2,1)";
        g.style.transform = "rotate(" + alvo + "deg)";
        setTimeout(res, 1300);
      });
    });
  };

  // barras horizontais que crescem até o valor; itens: [{rotulo, valor, texto, classe}]
  FX.bars = function (box, itens, opts) {
    opts = opts || {};
    var max = opts.max || Math.max.apply(null, itens.map(function (i) { return i.valor; })) || 1;
    box.innerHTML = itens.map(function (i) {
      return '<div class="fx-bar ' + (i.classe || "") + '"><div class="fx-bar-top"><span>' + i.rotulo + "</span><b>" + (i.texto || "") + "</b></div>" +
        '<div class="fx-track"><div class="fx-fill" data-w="' + Math.max(2, i.valor / max * 100) + '"></div></div></div>';
    }).join("");
    var fills = box.querySelectorAll(".fx-fill");
    return FX.wait(60).then(function () {
      fills.forEach(function (f) { f.style.width = f.getAttribute("data-w") + "%"; });
    });
  };

  // pulso do botão (J §4.3): dois ciclos, só com o botão inteiro na tela e 3 s sem toque; uma vez por botão
  FX.pulso = function (btn) {
    if (FX.reduced || !btn || btn._pulso) return;
    btn._pulso = true;
    var visivel = false, usado = false, t = null;
    function agendar() {
      clearTimeout(t);
      if (!visivel || usado || btn.offsetParent === null) return;
      t = setTimeout(function () { usado = true; btn.classList.add("pulsa"); }, 3000);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visivel = es[0].intersectionRatio >= 0.9; agendar(); }, { threshold: [0, 0.9] }).observe(btn);
    }
    ["pointerdown", "keydown", "input", "scroll", "focusin"].forEach(function (ev) {
      window.addEventListener(ev, function () { btn.classList.remove("pulsa"); agendar(); }, { passive: true, capture: true });
    });
    btn.addEventListener("animationend", function () { btn.classList.remove("pulsa"); });
  };

  // telas de uma pergunta: mostra uma, esconde as outras, e devolve o foco ao título da nova
  FX.mostra = function (id) {
    document.querySelectorAll(".tela").forEach(function (t) { t.classList.toggle("ativa", t.id === id); });
    var t = document.getElementById(id);
    window.scrollTo(0, 0);
    var h = t && t.querySelector("h1, h2, .pergunta");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    return t;
  };

  // guarda as respostas na sessão: recarregar a página não perde nada
  FX.guarda = function (chave, obj) { try { sessionStorage.setItem(chave, JSON.stringify(obj)); } catch (e) {} };
  FX.le = function (chave) { try { return JSON.parse(sessionStorage.getItem(chave) || "null"); } catch (e) { return null; } };
})();
