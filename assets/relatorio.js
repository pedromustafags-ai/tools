// As peças do relatório executivo, no molde que o Pedro aprovou em 16/10 (Revenue Leak): fonte e quadro numerados na
// ordem em que aparecem, capítulo, quadro "o que isso quer dizer", barras que crescem na tela, texto para copiar, o
// cabeçalho das páginas impressas e os dois gráficos que mais de uma isca usa (a janela de resposta e a curva da
// jornada). Inglês para o dono americano, português para o brasileiro. Os dados ficam em mercado.js.
(function () {
  var TXT = {
    en: { ex: "Exhibit", leve: "What this means", copiar: "Copy the text", verdade: "Moment of truth", melhor: "Better", pior: "Worse",
      voce: "you", nunca: "Never", pontos: ["5 min", "1 hour", "1 day", "5 days"],
      serie1: "Home service companies, 2018", serie2: "U.S. companies, all industries, 2011",
      janela: "Share of tested businesses that had replied after 5 minutes, 1 hour, 1 day and 5 days, and the share that never replied" },
    pt: { ex: "Quadro", leve: "O que isso quer dizer", copiar: "Copiar em inglês", verdade: "Momento da verdade", melhor: "Melhor", pior: "Pior",
      voce: "você", nunca: "Nunca", pontos: ["5 min", "1 hora", "1 dia", "5 dias"],
      serie1: "Empresas de serviço de casa, 2018", serie2: "Empresas dos EUA, todos os setores, 2011",
      janela: "Fatia das empresas testadas que já tinham respondido depois de 5 minutos, 1 hora, 1 dia e 5 dias, e a fatia que nunca respondeu" }
  };

  window.RX = function (lingua) {
    var L = TXT[lingua] || TXT.en, citadas = [], quadros = [], textos = {};
    var rx = { L: L, textos: textos, citadas: citadas };

    // a fonte ganha número na primeira vez que o texto a cita; redesenhar mantém o número
    rx.cite = function () {
      return Array.prototype.map.call(arguments, function (k) {
        var i = citadas.indexOf(k); if (i < 0) { citadas.push(k); i = citadas.length - 1; }
        return '<sup class="ref"><a href="#fonte-' + (i + 1) + '">' + (i + 1) + "</a></sup>";
      }).join("");
    };
    rx.fontes = function () {
      return citadas.map(function (k, i) {
        var f = MERCADO.fontes[MERCADO.n(k) - 1];
        return '<li id="fonte-' + (i + 1) + '">' + T.esc(f[1]) + ' <a href="' + f[2] + '" target="_blank" rel="noopener">' + f[2] + "</a></li>";
      }).join("");
    };
    rx.ex = function (chave, titulo, corpo, fonte, estilo) {
      var i = quadros.indexOf(chave); if (i < 0) { quadros.push(chave); i = quadros.length - 1; }
      return '<div class="ex"' + (estilo ? ' style="' + estilo + '"' : "") + '><p class="ex-rot">' + L.ex + " " + (i + 1) + '</p><p class="ex-tit">' + titulo + "</p>" + corpo + (fonte ? '<p class="ex-fonte">' + fonte + "</p>" : "") + "</div>";
    };
    rx.leve = function (rot, html) { return '<div class="leve"><span class="rot">' + (rot || L.leve) + "</span>" + html + "</div>"; };
    rx.capNum = function (k, t) { return '<p class="cap-num">' + k + " · " + t + "</p>"; };
    // o texto fica guardado pela chave, e o botão copia o que está guardado
    rx.script = function (texto, chave, rotulo) {
      textos[chave] = texto;
      return '<div class="script">' + T.esc(texto) + '</div><button class="copy noprint" type="button" data-copia="' + chave + '">' + (rotulo || L.copiar) + "</button>";
    };
    rx.copiaveis = function (aoCopiar) {
      document.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest("[data-copia]"); if (!b) return;
        var k = b.getAttribute("data-copia");
        T.copy(b, textos[k], function () { if (aoCopiar) aoCopiar(k); });
      });
    };
    // barras horizontais com a largura em data-w: crescem quando entram na tela, e todas no impresso
    rx.barras = function (itens, max) {
      max = max || Math.max.apply(null, itens.map(function (i) { return i.valor; })) || 1;
      return itens.map(function (i) {
        return '<div class="fx-bar ' + (i.classe || "") + '"><div class="fx-bar-top"><span>' + i.rotulo + "</span><b>" + (i.texto || "") + '</b></div><div class="fx-track"><div class="fx-fill" data-w="' + Math.max(1.5, i.valor / max * 100) + '"></div></div>' + (i.det ? '<p class="det">' + i.det + "</p>" : "") + "</div>";
      }).join("");
    };
    rx.cresce = function (el) { (el || document).querySelectorAll(".fx-fill, .funil .barra").forEach(function (f) { if (f.getAttribute("data-w")) f.style.width = f.getAttribute("data-w") + "%"; }); };
    // cada capítulo visto vira um evento; os gráficos dele crescem
    rx.observa = function (aoVer) {
      var vistas = {};
      var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var s = e.target.getAttribute("data-secao");
          if (!vistas[s]) { vistas[s] = 1; if (aoVer) aoVer(s); }
          rx.cresce(e.target);
        });
      }, { threshold: 0.12 }) : null;
      document.querySelectorAll("[data-secao]").forEach(function (s) { if (io) io.observe(s); else rx.cresce(s); });
      window.addEventListener("beforeprint", function () { rx.cresce(document); });
      return vistas;
    };
    // o cabeçalho das páginas impressas (a capa fica sem)
    rx.cabecalho = function (texto) {
      var st = document.createElement("style");
      st.textContent = "@page { @top-left { content: " + JSON.stringify(texto) + '; font: 600 8pt "Inter", sans-serif; color: #6B6B64; } } @page :first { @top-left { content: none; } }';
      document.head.appendChild(st);
    };

    // a janela de resposta: quanto das empresas testadas já tinha respondido, com a faixa "você"
    rx.janela = function (xv) {
      var M = MERCADO.janela, W = 320, H = 196, Lf = 34, Rr = 36, Tp = 18, B = 34, cols = 5;
      function px(i) { return Lf + i * (W - Lf - Rr) / (cols - 1); }
      function py(v) { return Tp + (100 - v) / 100 * (H - Tp - B); }
      var g = "";
      [0, 25, 50, 75, 100].forEach(function (v) { g += '<line x1="' + Lf + '" x2="' + (W - Rr) + '" y1="' + py(v) + '" y2="' + py(v) + '" stroke="var(--line)" stroke-width="1"/><text x="' + (Lf - 6) + '" y="' + (py(v) + 4) + '" text-anchor="end" font-size="10" fill="var(--ink-3)">' + v + "%</text>"; });
      if (xv != null) g += '<rect x="' + (px(xv) - 16) + '" y="' + Tp + '" width="32" height="' + (H - Tp - B) + '" fill="var(--confianca-suave)"/><text x="' + px(xv) + '" y="' + (Tp + 10) + '" text-anchor="middle" font-size="10" font-weight="700" fill="var(--confianca)">' + L.voce + "</text>";
      L.pontos.concat([L.nunca]).forEach(function (t, i) { g += '<text x="' + px(i) + '" y="' + (H - B + 16) + '" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">' + t + "</text>"; });
      function linha(serie, cor, tr, acima) {
        var pts = serie.map(function (v, i) { return v == null ? null : [px(i), py(v), v]; }).filter(Boolean);
        var dd = pts.map(function (p, i) { return (i ? "L" : "M") + p[0] + " " + p[1]; }).join(" ");
        return '<path d="' + dd + '" fill="none" stroke="' + cor + '" stroke-width="2.5"' + (tr ? ' stroke-dasharray="5 4"' : "") + "/>" +
          pts.map(function (p) { var cima = acima || p[2] < 12; return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" fill="' + cor + '"/><text x="' + (acima ? p[0] - 6 : p[0] + 6) + '" y="' + (cima ? p[1] - 8 : p[1] + 14) + '" text-anchor="' + (acima ? "end" : "start") + '" font-size="10" font-weight="700" fill="' + cor + '">' + p[2] + "%</text>"; }).join("");
      }
      g += linha(M.valve, "var(--ink)", false, false) + linha(M.hbr, "var(--confianca)", true, true);
      g += '<text x="' + (px(4) - 9) + '" y="' + (py(M.valveNunca) + 4) + '" text-anchor="end" font-size="10" font-weight="700" fill="var(--ink)">' + M.valveNunca + '%</text><rect x="' + (px(4) - 7) + '" y="' + py(M.valveNunca) + '" width="6" height="' + (H - B - py(M.valveNunca)) + '" fill="var(--ink)"/>';
      g += '<rect x="' + (px(4) + 1) + '" y="' + py(M.hbrNunca) + '" width="6" height="' + (H - B - py(M.hbrNunca)) + '" fill="var(--confianca)"/><text x="' + (px(4) + 9) + '" y="' + (py(M.hbrNunca) + 4) + '" font-size="10" font-weight="700" fill="var(--confianca)">' + M.hbrNunca + "%</text>";
      return '<div class="svg-box" style="max-width:460px"><svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + L.janela + '">' + g + "</svg></div>" +
        '<p class="legenda"><span style="display:inline-block;width:18px;border-top:2.5px solid var(--ink);vertical-align:middle;margin-right:5px"></span>' + L.serie1 + ' &nbsp; <span style="display:inline-block;width:18px;border-top:2.5px dashed var(--confianca);vertical-align:middle;margin-right:5px"></span>' + L.serie2 + "</p>";
    };

    // a curva da jornada: E = [{nome, nivel (-2 a 2), verdade, marca (rótulo vermelho ou "")}]
    rx.curva = function (E, legenda, aria) {
      var W = 400, H = 214, Lf = 34, Rr = 30;
      function x(i) { return Lf + i * (W - Lf - Rr) / (E.length - 1); }
      function y(v) { return 40 + (2 - v) / 4 * 118; }
      var pts = E.map(function (e, i) { return [x(i), y(e.nivel)]; });
      var d = "M" + pts[0][0] + " " + pts[0][1];
      for (var i = 0; i < pts.length - 1; i++) {
        var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
        d += " C" + (p1[0] + (p2[0] - p0[0]) / 6) + " " + (p1[1] + (p2[1] - p0[1]) / 6) + " " + (p2[0] - (p3[0] - p1[0]) / 6) + " " + (p2[1] - (p3[1] - p1[1]) / 6) + " " + p2[0] + " " + p2[1];
      }
      var g = '<line x1="' + Lf + '" x2="' + (W - Rr) + '" y1="' + y(0) + '" y2="' + y(0) + '" stroke="var(--line)" stroke-dasharray="4 4"/>' +
        '<text x="2" y="' + (y(2) + 4) + '" font-size="10.5" fill="var(--ink-3)">' + L.melhor + '</text><text x="2" y="' + (y(-2) + 4) + '" font-size="10.5" fill="var(--ink-3)">' + L.pior + "</text>";
      E.forEach(function (e, i) {
        if (e.verdade) g += '<line x1="' + x(i) + '" x2="' + x(i) + '" y1="18" y2="' + (y(e.nivel) - 7) + '" stroke="var(--confianca)" stroke-dasharray="2 3"/><text x="' + x(i) + '" y="13" text-anchor="middle" font-size="11" font-weight="700" fill="var(--confianca)">' + L.verdade + "</text>";
      });
      g += '<path d="' + d + '" fill="none" stroke="var(--ink)" stroke-width="2.5"/>';
      E.forEach(function (e, i) {
        g += '<circle cx="' + x(i) + '" cy="' + y(e.nivel) + '" r="' + (e.marca ? 6 : 4) + '" fill="' + (e.marca ? "var(--perda)" : "var(--ink)") + '" stroke="#fff" stroke-width="1.5"/>';
        if (typeof e.marca === "string" && e.marca) g += '<text x="' + x(i) + '" y="' + (y(e.nivel) + (e.nivel < 0 ? 20 : -12)) + '" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--perda)">' + e.marca + "</text>";
        g += '<text x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink-2)">' + e.curto + "</text>";
      });
      return '<div class="svg-box" style="max-width:540px"><svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + aria + '">' + g + "</svg></div>" +
        '<p class="legenda">' + legenda + "</p>";
    };
    // o diagrama de alinhamento: uma linha por passo, com o cliente, a empresa e a pesquisa lado a lado
    rx.etapas = function (E, cab) {
      return '<div class="jornada"><div class="etapa cab"><span>' + cab[0] + "</span><span>" + cab[1] + "</span><span>" + cab[2] + "</span><span>" + cab[3] + "</span></div>" +
        E.map(function (e, i) {
          return '<div class="etapa"><div><span class="n">' + cab[4] + " " + (i + 1) + "</span><h4>" + e.nome + '</h4><span class="sente">' + e.sente + "</span>" + (e.verdade ? '<span class="marca">' + L.verdade + "</span>" : "") + "</div>" +
            '<div><span class="rotm">' + cab[1] + "</span>" + e.cliente + '<span class="pensa">“' + e.pensa + "”</span></div>" +
            '<div><span class="rotm">' + cab[2] + "</span>" + e.voce + "</div>" +
            '<div><span class="rotm">' + cab[3] + "</span>" + e.pesquisa + "</div></div>";
        }).join("") + "</div>";
    };
    return rx;
  };
})();
