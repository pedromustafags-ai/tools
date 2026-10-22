// O teste de três minutos (anúncios 07 e 08): como o negócio atende quem chega pelo Google e pelo telefone.
// Quatro pontos, uma nota de 0 a 100 e a folha do ponto que mais pesa. Uma pergunta por tela, no máximo 6 opções,
// e nenhuma opção diz que o dono errou. Pontos: G = ser achado no Google, T = atender o telefone,
// R = responder por escrito, C = passar confiança.
(function (root) {
  var PONTOS = {
    T: { nome: "Atender o telefone", curto: "Telefone", onde: "O seu maior ganho está no telefone. O americano liga, deixa recado e, se ninguém volta logo, liga para o próximo da lista." },
    R: { nome: "Responder por escrito", curto: "Mensagem", onde: "O seu maior ganho está na resposta por escrito. Quem pede preço por mensagem compara as respostas, e quem responde primeiro e por escrito sai na frente." },
    G: { nome: "Ser achado no Google", curto: "Google", onde: "O seu maior ganho está no Google. O americano procura o serviço, compara estrelas, fotos e horário, e liga para quem aparece inteiro." },
    C: { nome: "Passar confiança", curto: "Confiança", onde: "O seu maior ganho está na confiança. O americano confere site, e-mail e seguro antes de deixar alguém entrar em casa." }
  };
  var ORDEM = ["T", "R", "G", "C"]; // desempate: o que perde o cliente mais rápido vem antes
  var TRECHOS = ["G", "T", "R", "C"]; // a ordem das perguntas, para a barra de progresso em quatro trechos

  var PERGUNTAS = [
    { id: "perfil", p: "G", q: "Quando alguém procura o seu serviço no Google, a sua empresa aparece com perfil próprio, com endereço, horário e fotos?",
      o: [["Aparece, com tudo preenchido", 3], ["Aparece, mas faltam coisas", 2], ["Acho que não aparece", 0], ["Não sei dizer", 0]] },
    { id: "avaliacoes", p: "G", q: "Quantas avaliações a sua empresa tem no Google?",
      o: [["20 ou mais", 3], ["De 6 a 19", 2], ["De 1 a 5", 1], ["Estou começando a juntar", 0]] },
    { id: "lingua", p: "G", q: "Em que língua está a maior parte dessas avaliações?", se: function (r) { return r.avaliacoes === undefined || r.avaliacoes > 0; },
      o: [["Quase todas em inglês", 3], ["Metade em inglês, metade em português", 2], ["Quase todas em português", 1]] },
    { id: "pede", p: "G", q: "Depois que o serviço termina, você pede avaliação ao cliente?",
      o: [["Sempre, mandando o link", 3], ["Às vezes, falando na hora", 1], ["Ainda não peço", 0]] },
    { id: "ligacao", p: "T", q: "Um cliente liga enquanto você está no meio de um serviço. O que acontece com a ligação?",
      o: [["Alguém atende na hora", 3], ["Eu retorno em até uma hora", 2], ["Retorno no fim do dia", 1], ["Às vezes eu nem vejo que ligaram", 0]] },
    { id: "caixa", p: "T", q: "Como está a caixa postal do celular que o cliente liga?",
      o: [["Em inglês, com o nome da empresa", 3], ["Em inglês, a mensagem padrão", 1], ["Em português", 0], ["Não sei como está", 0]] },
    { id: "resposta", p: "R", q: "Quem pede orçamento por mensagem recebe resposta em quanto tempo?",
      o: [["Em minutos", 3], ["Em algumas horas", 2], ["No dia seguinte", 1], ["Depende muito do dia", 0]] },
    { id: "orcamento", p: "R", q: "Como o preço chega no cliente?",
      o: [["Por escrito, em inglês, com o que está incluso", 3], ["Por escrito, só com o valor", 1], ["Por mensagem ou falando, sem papel", 0]] },
    { id: "vespera", p: "R", q: "Na véspera do serviço, você confirma o horário com o cliente?",
      o: [["Sempre, por mensagem", 3], ["Às vezes", 1], ["Só quando ele pergunta", 0]] },
    { id: "site", p: "C", q: "A sua empresa tem site com telefone e e-mail?",
      o: [["Tem, com os dois", 3], ["Tem, mas falta telefone ou e-mail", 2], ["Só tenho Instagram ou Facebook", 1], ["O site ainda vai sair", 0]] },
    { id: "seguro", p: "C", q: "\"Licensed and insured\" aparece onde o cliente vê: no site, no Google e no orçamento?",
      o: [["Aparece, e eu passo o número da apólice", 3], ["Aparece, sem o número", 2], ["Só falo se ele perguntar", 1], ["Estou vendo isso agora", 0]] }
  ];

  // A linha de mercado de cada resposta (I §3), com a fonte. Só onde há dado conferido; o resto fica sem linha.
  var BRIGHT = "BrightLocal, pesquisa com 1.002 adultos dos EUA, 2026";
  var INVOCA = "Invoca, ligações a empresas de serviço de casa, 2026";
  var TESTES = "Harvard Business Review (2011), 2.241 empresas dos EUA; Valve+Meter (2018), 466 empresas de serviço de casa";
  var MERCADO = {
    avaliacoes: function (v) {
      if (v === 3) return ["Você passa no corte de quase metade dos americanos: 47% não contratam empresa com menos de 20 avaliações.", BRIGHT];
      if (v === 2) return ["Quase metade dos americanos (47%) descarta empresa com menos de 20 avaliações. Você está perto do corte.", BRIGHT];
      return ["Só 9% dos americanos aceitam contratar empresa com cinco avaliações ou menos, e 47% descartam quem tem menos de 20.", BRIGHT];
    },
    pede: function (v) {
      if (v === 3) return ["83% dos americanos que recebem o pedido de avaliação escrevem a avaliação.", BRIGHT];
      return ["No último ano, 78% dos americanos foram convidados a avaliar alguma empresa, e 83% de quem foi convidado escreveu.", BRIGHT];
    },
    ligacao: function (v) {
      if (v === 3) return ["No serviço de casa, só cerca de metade das ligações (52%) cai numa pessoa. Você está na metade que atende.", INVOCA];
      return ["No serviço de casa, só cerca de metade das ligações cai numa pessoa (52%). Quem atende fica com o cliente.", INVOCA];
    },
    resposta: function (v) {
      if (v === 3) return ["Você responde mais rápido que cerca de 6 em cada 10 empresas testadas: só 29% a 37% respondem em até uma hora.", TESTES];
      if (v === 2) return ["Você responde mais rápido que quase metade das empresas testadas.", TESTES];
      if (v === 1) return ["Cerca de metade das empresas testadas já tinha respondido antes de você.", TESTES];
      return ["Nos testes publicados, de 23% a 40% das empresas nunca responderam o pedido.", TESTES];
    },
    seguro: function () { return ["Para o americano, ser licensed and insured pesa mais que o preço na hora de escolher quem contratar.", "HIRI, Home Services Study, 2024"]; }
  };
  function mercado(id, v) { return MERCADO[id] ? MERCADO[id](v) : null; }

  function nota(resp) {
    var soma = {}, max = {};
    PERGUNTAS.forEach(function (q) {
      if (q.se && !q.se(resp)) return;
      var v = resp[q.id];
      if (v === undefined) return;
      soma[q.p] = (soma[q.p] || 0) + v;
      max[q.p] = (max[q.p] || 0) + 3;
    });
    var areas = {};
    ORDEM.forEach(function (p) { areas[p] = max[p] ? Math.round(soma[p] / max[p] * 100) : 0; });
    var geral = Math.round(ORDEM.reduce(function (a, p) { return a + areas[p]; }, 0) / ORDEM.length);
    var ponto = ORDEM.slice().sort(function (a, b) { return areas[a] - areas[b] || ORDEM.indexOf(a) - ORDEM.indexOf(b); })[0];
    return { geral: geral, areas: areas, ponto: ponto };
  }

  var Teste = { PONTOS: PONTOS, ORDEM: ORDEM, TRECHOS: TRECHOS, PERGUNTAS: PERGUNTAS, nota: nota, mercado: mercado };
  if (typeof module !== "undefined" && module.exports) module.exports = Teste;
  else root.Teste = Teste;
})(this);
