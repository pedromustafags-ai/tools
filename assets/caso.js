// O caso de quem fez o quiz do InLead (plano/ e plan/). O link do e-mail e o botão do fim do quiz levam ?id=<código>;
// a página pede ao Apps Script (GET action=quiz) o primeiro nome, a nota, o plano e as respostas, e monta "O seu caso"
// com os primeiros passos escolhidos pelas respostas. Sem código, a página fica como sempre foi. O Apps Script marca
// "Abriu" a cada visita; o link do aviso ao Pedro leva pedro=1 e não conta.
(function () {
  var q = new URLSearchParams(location.search);
  var id = (q.get("id") || "").replace(/[^a-z0-9]/g, "");
  var C = window.TOOLS_CONFIG || {};
  if (!id || !C.ENDPOINT) return;
  var EN = document.documentElement.lang === "en";

  // os primeiros passos: tempo devagar vem primeiro, depois quem responde, depois o que acontece com o orçamento
  var P = EN ? {
    devagar: ["Reply to every request the same day, even before the price", "Set up an after-hours auto-reply that confirms the request and says when you'll get back. The first hour matters most."],
    rapido: ["Put your reply time in writing", "You already reply fast. Agree on a maximum time for the first reply that holds on busy days too."],
    so: ["Block two fixed times a day to answer requests", "One early, one late, even on a job. Requests stop waiting for you to remember."],
    livre: ["Give requests an owner", "One person per shift answers, with the same first reply. No request falls between two people."],
    dupla: ["Agree on who answers what", "Split by channel or by time of day, so nobody assumes the other one replied."],
    equipe: ["Review the routine once a month", "Look at the requests that didn't book and adjust your first reply."],
    some: ["Follow up on every quote", "On day 2 and day 5, send a short text with one easy question. Your plan has the words."],
    desconto: ["Send every quote in 3 versions", "From basic to complete. The comparison becomes between your options, not just price."],
    semanas: ["End every quote with a booked next step", "A day and time to talk it over, agreed before you send it."],
    fecha: ["Ask for a referral right after the job", "Someone who just hired you is the most likely to refer you. Ask on the day you finish."]
  } : {
    devagar: ["Responda todo pedido no mesmo dia, mesmo antes do preço", "Deixe pronta a mensagem automática para quem chama fora do horário: ela confirma o pedido e diz a hora em que você responde. A primeira hora é a que mais pesa."],
    rapido: ["Mantenha o seu tempo de resposta por escrito", "Você já responde rápido. Combine um horário máximo para a primeira resposta, que vale também nos dias cheios."],
    so: ["Separe dois horários fixos para responder pedidos", "Um no começo e outro no fim do dia, mesmo no meio do serviço. O pedido para de esperar você lembrar."],
    livre: ["Dê um dono para os pedidos", "Uma pessoa por turno responde, com a mesma mensagem de primeira resposta. Assim nenhum pedido cai entre duas pessoas."],
    dupla: ["Combine quem responde o quê", "Divida por canal ou por horário, para ninguém achar que o outro já respondeu."],
    equipe: ["Revise a regra uma vez por mês", "Olhe os pedidos que não fecharam e ajuste a mensagem de primeira resposta."],
    some: ["Acompanhe todo orçamento por mensagem", "No segundo e no quinto dia, mande uma mensagem curta, com uma pergunta fácil de responder. O seu plano traz o texto."],
    desconto: ["Mande o orçamento em 3 versões", "Do básico ao completo. A comparação passa a ser entre as suas opções, e não só pelo preço."],
    semanas: ["Termine todo orçamento com um próximo passo marcado", "Um dia e uma hora para conversar sobre ele, combinados antes de você mandar."],
    fecha: ["Peça indicação logo depois do serviço", "Quem acabou de fechar com você é quem mais indica. Peça no dia da entrega."]
  };
  // as respostas chegam com o rótulo da opção, no idioma do quiz
  function chave(txt, mapa) {
    for (var i = 0; i < mapa.length; i++) if (String(txt || "").indexOf(mapa[i][0]) >= 0) return mapa[i][1];
    return "";
  }
  var TEMPO = [["Minut", "rapido"], ["1 hora", "rapido"], ["within", "rapido"], ["Within", "rapido"]];
  var QUEM = [["equipe", "equipe"], ["team", "equipe"], ["mais alguém", "dupla"], ["other person", "dupla"],
              ["Só eu", "so"], ["Just me", "so"], ["livre", "livre"], ["free", "livre"]];
  var ORC = [["Some", "some"], ["quiet", "some"], ["desconto", "desconto"], ["discount", "desconto"],
             ["semanas", "semanas"], ["weeks", "semanas"], ["rápido", "fecha"], ["book fast", "fecha"]];

  function equipe(t) { return !t || /Só eu|Just me/.test(t) ? t : t + (EN ? " people" : " pessoas"); }
  function el(tag, txt, cls) { var e = document.createElement(tag); if (txt) e.textContent = txt; if (cls) e.className = cls; return e; }

  window.__caso = function (c) {
    if (!c || !c.ok) return;
    var r = c.respostas || {};
    var tempo = r.tempo || r.speed, quem = r.quem || r.who, orc = r.orcamento || r.quote, mom = r.momento || r.timing;
    if (c.nome) document.getElementById("ola").textContent = EN ? c.nome + ", your plan is ready" : c.nome + ", o seu plano está pronto";
    var box = document.getElementById("seu-caso");
    if (!box) return;
    if (c.nota !== "" && c.nota != null) box.querySelector(".nota").textContent = (EN ? c.nota + " out of 100 · " : c.nota + " de 100 · ") + (c.faixa || "");
    var contou = box.querySelector(".contou");
    [[EN ? "Trade" : "Setor", [r.setor || r.trade, r.setor_outro || r.trade_other].filter(Boolean).join(": ")],
     [EN ? "Team" : "Equipe", equipe(r.tamanho || r.size)],
     [EN ? "Who answers" : "Quem responde", quem], [EN ? "First reply" : "Primeira resposta", tempo],
     [EN ? "After the quote" : "Depois do orçamento", orc], [EN ? "Timing" : "Momento", mom]].forEach(function (l) {
      if (!l[1]) return;
      var li = el("li"); li.appendChild(el("b", l[0] + ": ")); li.appendChild(document.createTextNode(l[1])); contou.appendChild(li);
    });
    var t = chave(tempo, TEMPO) || (tempo ? "devagar" : ""), w = chave(quem, QUEM), o = chave(orc, ORC);
    var passos = [];
    if (t === "devagar") passos.push(P.devagar);
    if (w) passos.push(P[w]);
    if (o) passos.push(P[o]);
    if (t === "rapido" && passos.length < 3) passos.push(P.rapido);
    var ol = box.querySelector(".passos");
    passos.slice(0, 3).forEach(function (p) {
      var li = el("li"); li.appendChild(el("b", p[0])); li.appendChild(el("span", p[1])); ol.appendChild(li);
    });
    box.hidden = false;
  };
  var s = document.createElement("script");
  s.src = C.ENDPOINT + "?action=quiz&id=" + id + "&callback=__caso" + (q.get("pedro") === "1" ? "&pedro=1" : "");
  document.body.appendChild(s);
})();
