// As peças da calculadora em jogo (molde aprovado pelo Pedro em 16/10, Revenue Leak): uma pergunta por tela, a barra de
// progresso em trechos honestos, o campo de número com − e + ligado ao deslizante, a validação antes de avançar, as
// opções que avançam no toque e a espera que mostra os números dele. Cada página monta o resto (o palco e o portão).
window.JOGO = function (cfg) {
  // cfg: { chave (sessionStorage), total (perguntas), lingua ("en" | "pt"), ferramenta, id }
  var st = FX.le(cfg.chave) || {}, pt = cfg.lingua === "pt";
  var J = { st: st };
  J.salva = function () { FX.guarda(cfg.chave, st); };
  J.vai = function (tela) {
    FX.mostra(tela);
    var m = /^t(\d+)$/.exec(tela);
    if (m && +m[1] >= 1 && +m[1] <= cfg.total) T.event(cfg.id, cfg.ferramenta, "step", m[1]);
  };
  // "Question 3 of 7": um trecho por pergunta, o atual pela metade
  J.progresso = function () {
    document.querySelectorAll(".progresso").forEach(function (el) {
      var k = +el.getAttribute("data-passo"), h = '<div class="trilhos">';
      for (var i = 1; i <= cfg.total; i++) h += '<span class="trecho' + (i < k ? " feito" : "") + '"><i' + (i === k ? ' style="width:50%"' : "") + "></i></span>";
      el.innerHTML = h + '</div><span class="conta">' + (pt ? "Pergunta " + k + " de " : "Question " + k + " of ") + cfg.total + "</span>";
    });
  };
  // o campo de número: − e + em volta, ligado ao deslizante da mesma pergunta; data-max aponta para outro campo
  var aoMudar = function () {};
  J.numeros = function (fn) {
    aoMudar = fn || aoMudar;
    document.querySelectorAll(".numero").forEach(function (box) {
      var k = box.getAttribute("data-campo"), sem = box.getAttribute("data-semmaismenos"), dec = box.getAttribute("data-decimal");
      box.innerHTML = (sem ? "" : '<button type="button" class="menos" aria-label="' + (pt ? "Menos" : "Less") + '">−</button>') +
        '<input type="text" inputmode="' + (dec ? "decimal" : "numeric") + '" autocomplete="off" aria-label="' + (box.getAttribute("data-rotulo") || k) + '">' +
        (sem ? "" : '<button type="button" class="mais" aria-label="' + (pt ? "Mais" : "More") + '">+</button>');
      if (sem) box.style.gridTemplateColumns = "1fr";
      var inp = box.querySelector("input"), passo = +(box.getAttribute("data-passo-num") || 1);
      function max() { var m = box.getAttribute("data-max"); return m ? (isNaN(+m) ? st[m] || 0 : +m) : 99999; }
      function set(v, deOnde) {
        if (isNaN(v)) { delete st[k]; } else { st[k] = Math.max(0, Math.min(max(), dec ? Math.round(v * 10) / 10 : Math.round(v))); }
        if (deOnde !== "input" || v > max()) inp.value = st[k] == null ? "" : st[k];
        document.querySelectorAll('input[type=range][data-campo="' + k + '"]').forEach(function (r) { r.max = max(); r.value = st[k] || 0; });
        aoMudar(); J.salva();
      }
      inp.addEventListener("input", function () { set(T.num(inp.value), "input"); });
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { var b = box.closest(".tela").querySelector("[data-proximo], .mostrar"); if (b) b.click(); } });
      if (!sem) {
        box.querySelector(".menos").addEventListener("click", function () { set((st[k] || 0) - passo); });
        box.querySelector(".mais").addEventListener("click", function () { set((st[k] || 0) + passo); });
      }
      box._set = set;
      box._sync = function () { inp.value = st[k] == null ? "" : st[k]; document.querySelectorAll('input[type=range][data-campo="' + k + '"]').forEach(function (r) { r.max = max(); r.value = st[k] || 0; }); };
    });
    document.querySelectorAll("input[type=range][data-campo]").forEach(function (r) {
      var box = document.querySelector('.numero[data-campo="' + r.getAttribute("data-campo") + '"]');
      r.addEventListener("input", function () { box._set(+r.value, "range"); });
    });
  };
  J.sincroniza = function () { document.querySelectorAll(".numero").forEach(function (b) { if (b._sync) b._sync(); }); aoMudar(); };
  // a regra de cada tela: devolve o erro, ou "" para seguir
  var REGRA = {};
  J.regras = function (r) { REGRA = r; };
  J.confere = function (tela) {
    var err = REGRA[tela] ? REGRA[tela]() : "";
    var el = document.querySelector("#" + tela + " .error");
    if (el) el.textContent = err;
    if (err) { var i = document.querySelector("#" + tela + " .numero input, #" + tela + " input"); if (i) i.focus(); }
    return !err;
  };
  J.botoes = function (antes) {
    document.querySelectorAll("[data-proximo]").forEach(function (b) {
      b.addEventListener("click", function () {
        var tela = b.closest(".tela").id;
        if (!J.confere(tela)) return;
        if (antes) antes(tela);
        J.salva(); J.sincroniza();
        J.vai(b.getAttribute("data-proximo"));
      });
    });
    document.querySelectorAll("[data-volta]").forEach(function (b) { b.addEventListener("click", function () { J.sincroniza(); FX.mostra(b.getAttribute("data-volta")); }); });
  };
  // opções de toque: marcam, guardam e avançam sozinhas
  J.marca = function (box, v) { box.querySelectorAll("button").forEach(function (x) { x.classList.toggle("marcada", x.getAttribute("data-v") === v); }); };
  J.opcoes = function (box, campo, proxima, depois) {
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      st[campo] = b.getAttribute("data-v"); J.marca(box, st[campo]); J.salva();
      if (depois && depois(st[campo]) === false) return;
      setTimeout(function () { J.vai(proxima); }, FX.reduced ? 0 : 280);
    });
    if (st[campo]) J.marca(box, st[campo]);
  };
  // a espera mostra o caso dele, com os números dele, linha a linha
  J.espera = function (tela, box, linhas) {
    box.innerHTML = linhas.map(function (l) { return '<p><svg viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="10" fill="none" stroke-width="1.5"/><path d="M6 11.5 l3.5 3.5 l7 -8" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + T.esc(l) + "</span></p>"; }).join("");
    FX.mostra(tela);
    var ps = box.querySelectorAll("p");
    return linhas.reduce(function (pr, l, i) { return pr.then(function () { return FX.wait(900).then(function () { ps[i].classList.add("feito"); }); }); }, Promise.resolve()).then(function () { return FX.wait(250); });
  };
  // os itens do relatório no palco aparecem um a um
  J.vem = function (ul, itens) { ul.innerHTML = itens.map(function (x) { return '<li class="' + x[0] + '">' + T.esc(x[1]) + "</li>"; }).join(""); };
  return J;
};
