// O capítulo prático de venda dos relatórios (Pedro, 16/10: "o /vender e /copy possuem informações e conhecimentos que
// podem servir"), dito como conhecimento nosso, sem nome de autor. Vem da skill vender: a equação de valor (02), as
// respostas às objeções e o acordo do próximo passo (06 e 08) e o fim que o cliente lembra (pico e fim, jornada).
// O que o cliente lê fica sempre em inglês; a explicação segue a língua do relatório.
window.PLAYBOOK = {
  // o resultado nas palavras do cliente, contra o nome técnico, por ofício
  exemplo: {
    hvac: ["Upstairs cool again before the weekend", "Condenser replacement"],
    cleaning: ["A spotless kitchen before your guests arrive", "Deep clean, 3 hours"],
    lawn: ["Front yard ready for the open house", "Mow, edge and blow"],
    painting: ["Living room finished before the holidays", "Interior paint, 2 coats"],
    handyman: ["The deck safe to use this weekend", "Replace 6 deck boards"],
    other: ["The problem gone by Friday", "Service call"]
  },
  textos: {
    visita: "Hi [name], it's [your name]. I can come by today at 4 or tomorrow at 8 to take a look. Which works better?",
    caro: "That's a fair thing to ask about. Can I show you what's in that number?",
    casa: "Of course. What do you think they'll ask? I'll put the answer in writing so you have it in front of you.",
    pensar: "Makes sense. What's the main thing you're weighing? Worst case, you have a written price to compare. Best case, we start Tuesday.",
    barato: "Happy to look at it with you. Let's check both include the same things: [parts warranty, cleanup, permits]. Which of those matters most to you?",
    combinado: "I'll text you Thursday at 6 to see where you landed. Does that work?",
    avaliacao: "Thanks again, [name]. If you're happy with how it turned out, a quick review would mean a lot to a small business like mine: [link]"
  },
  en: {
    num: "What books the job", titulo: "What books the job, message by message",
    lead: "Most of what decides a job happens in a handful of moments: the first reply, the visit, the price, and what happens when the customer goes quiet. This chapter is the practical side of the report, written so you can use it this week.",
    pesaT: "What a homeowner weighs when reading your quote",
    pesa: "Every homeowner holding your quote weighs four things, whether they'd put it this way or not. Two make your quote worth more to them, and two make it worth less. Price gets judged against all four, which is why the lowest number doesn't automatically win.",
    vale: "What your quote is worth to the customer",
    termos: ["The result they want", "How sure they are you'll deliver it", "How long until it's done", "How much hassle it is for them"],
    pe: "Anything that raises the top or lowers the bottom makes the same price easier to accept.",
    cab: ["What they weigh", "What moves it on your quote"],
    linhas: [
      ["The result they want", "Name it in their words at the top of the quote. “{R}” reads better than “{X}.”"],
      ["How sure they are", "A photo of a job like theirs, your license and insurance printed on the quote, and two or three recent reviews. Homeowners rank licensed and insured above price.{hiri}"],
      ["How long until it's done", "A start date and how long the work takes. “We can start Tuesday and finish Thursday” is something they can plan around."],
      ["How much hassle", "Say what you take off their plate: parts, permits, cleanup, haul-away. Every task they don't have to handle is worth money to them."]
    ],
    visitaT: "Book the visit inside the first reply",
    visita: "An open question like “when works for you?” hands the customer a small chore, and chores wait. Two concrete times, the first one today or tomorrow, turn the reply into a quick yes.",
    dizT: "When the customer says…",
    objecoes: [
      ["That's more than I expected.", "", "Price shock usually passes in a minute. Treat it as a reaction, keep the price where it is, and walk them through what's in it. Dropping the number on the spot teaches every customer that pushing works.", "caro"],
      ["I need to talk it over at home.", "", "Asking up front who else decides tends to plant this one. Invite the other person to the visit instead, and if it still comes up after the quote, help them have that conversation.", "casa"],
      ["Let me think about it.", "", "There's usually one concern they haven't said out loud. Ask for it plainly, then lay out the best case and the worst case.", "pensar"],
      ["I got a cheaper quote.", "", "Leave the other company's name out of it and never criticize them. Compare what each number includes, and ask which part matters most.", "barato"]
    ],
    combinadoT: "Leave every visit with the next step agreed",
    combinado: "A follow-up works best when it keeps a promise. Before you leave the driveway, agree on when they'll hear from you. On that day you're doing what you said you'd do, and the customer is expecting the message.",
    fimT: "Finish the job so they remember it",
    fim: "People remember a service by its most intense moment and by how it ended, and the ending is yours to design: a walk-through of the finished work, a before-and-after photo they can keep, and the review request the same day. 83% of people asked to leave a review wrote one, and 74% only count reviews from the last three months, so a steady flow matters more than a big pile.{brightlocal}"
  },
  pt: {
    num: "O que fecha o serviço", titulo: "O que fecha o serviço, mensagem por mensagem",
    lead: "Quase tudo o que decide um serviço acontece em poucos momentos: a primeira resposta, a visita, o preço e o que você faz quando o cliente some. Este capítulo é o lado prático da folha, com o texto em inglês pronto para usar esta semana.",
    pesaT: "O que o americano pesa quando lê o seu orçamento",
    pesa: "Todo cliente com o seu orçamento na mão pesa quatro coisas, mesmo sem dizer assim. Duas fazem o orçamento valer mais para ele, e duas fazem valer menos. O preço é julgado contra as quatro, e por isso o número mais baixo nem sempre leva.",
    vale: "O que o seu orçamento vale para o cliente",
    termos: ["O resultado que ele quer", "A certeza de que você entrega", "Quanto tempo até ficar pronto", "O trabalho que dá para ele"],
    pe: "Tudo o que sobe a linha de cima ou desce a de baixo deixa o mesmo preço mais fácil de aceitar.",
    cab: ["O que ele pesa", "O que mexe nisso no seu orçamento"],
    linhas: [
      ["O resultado que ele quer", "Escreva no topo do orçamento, nas palavras dele. “{R}” funciona melhor que “{X}”."],
      ["A certeza de que você entrega", "Uma foto de um serviço parecido, o licensed and insured impresso no orçamento e duas ou três avaliações recentes. O americano põe licensed and insured acima do preço.{hiri}"],
      ["Quanto tempo até ficar pronto", "A data de início e quanto tempo o serviço leva. “We can start Tuesday and finish Thursday” é algo que ele consegue planejar."],
      ["O trabalho que dá para ele", "Diga o que sai das mãos dele: material, produtos, a limpeza no fim, a retirada do entulho. Cada tarefa que ele não precisa resolver vale dinheiro para ele."]
    ],
    visitaT: "Marque a visita dentro da primeira resposta",
    visita: "Uma pergunta aberta como “when works for you?” dá ao cliente uma tarefa, e tarefa espera. Dois horários concretos, o primeiro hoje ou amanhã, viram um sim rápido.",
    dizT: "Quando o cliente diz…",
    objecoes: [
      ["That's more than I expected.", "Ficou mais caro do que eu esperava.", "O susto com o preço passa em um minuto. Trate como reação, mantenha o preço e mostre o que está dentro dele. Baixar o número na hora ensina todo cliente que pressionar funciona.", "caro"],
      ["I need to talk it over at home.", "Preciso conversar em casa.", "Perguntar logo de cara quem mais decide costuma plantar essa frase. Convide a outra pessoa para a visita, e se ela aparecer depois do orçamento, ajude o cliente a ter essa conversa.", "casa"],
      ["Let me think about it.", "Vou pensar.", "Quase sempre existe uma preocupação que ele ainda não disse. Pergunte qual é, sem rodeio, e mostre o melhor e o pior caso.", "pensar"],
      ["I got a cheaper quote.", "Recebi um orçamento mais barato.", "Não cite a outra empresa e nunca fale mal dela. Compare o que cada preço inclui e pergunte o que pesa mais para ele.", "barato"]
    ],
    combinadoT: "Saia de toda visita com o próximo passo combinado",
    combinado: "O follow-up funciona melhor quando cumpre uma promessa. Antes de ir embora, combine quando ele vai ter notícia sua. No dia, você está fazendo o que disse que faria, e o cliente está esperando a mensagem.",
    fimT: "Termine o serviço de um jeito que ele lembre",
    fim: "A gente lembra de um serviço pelo momento mais intenso e pelo fim, e o fim é você quem desenha: uma volta pelo serviço pronto, uma foto de antes e depois para ele guardar e o pedido de avaliação no mesmo dia. 83% de quem é convidado a avaliar escreve a avaliação, e 74% só levam em conta as dos últimos três meses, então pedir sempre vale mais que juntar muitas de uma vez.{brightlocal}"
  },

  // o capítulo inteiro, com a fonte numerada pelo rx do relatório
  capitulo: function (rx, lingua, trade, num) {
    var P = PLAYBOOK, L = P[lingua], e = P.exemplo[trade] || P.exemplo.other;
    function fonte(t) { return t.replace("{hiri}", rx.cite("hiri")).replace("{brightlocal}", rx.cite("brightlocal")); }
    function obj(o) {
      return '<div class="obj"><span class="diz">“' + o[0] + "”</span>" + (o[1] ? '<span class="traduz">' + o[1] + "</span>" : "") + "<p>" + o[2] + "</p>" + rx.script(P.textos[o[3]], o[3]) + "</div>";
    }
    var t = L.termos;
    return rx.capNum(num, L.num) + "<h2>" + L.titulo + "</h2>" + '<p class="lead">' + L.lead + "</p>" +
      "<h3>" + L.pesaT + "</h3><p>" + L.pesa + "</p>" +
      '<div class="fracao"><p class="val">' + L.vale + "</p>" +
      '<div class="linha cima"><span class="termo">' + t[0] + '</span><span class="x">×</span><span class="termo">' + t[1] + "</span></div><hr>" +
      '<div class="linha baixo"><span class="termo">' + t[2] + '</span><span class="x">×</span><span class="termo">' + t[3] + "</span></div>" +
      '<p class="pe">' + L.pe + "</p></div>" +
      '<table class="t"><thead><tr><th>' + L.cab[0] + "</th><th>" + L.cab[1] + "</th></tr></thead><tbody>" +
      L.linhas.map(function (l) { return "<tr><td><b>" + l[0] + "</b></td><td>" + fonte(l[1].replace("{R}", e[0]).replace("{X}", e[1])) + "</td></tr>"; }).join("") + "</tbody></table>" +
      "<h3>" + L.visitaT + "</h3><p>" + L.visita + "</p>" + rx.script(P.textos.visita, "visita") +
      "<h3>" + L.dizT + "</h3>" + '<div class="objecoes">' + L.objecoes.map(obj).join("") + "</div>" +
      "<h3>" + L.combinadoT + "</h3><p>" + L.combinado + "</p>" + rx.script(P.textos.combinado, "combinado") +
      "<h3>" + L.fimT + "</h3><p>" + fonte(L.fim) + "</p>" + rx.script(P.textos.avaliacao, "avaliacao");
  }
};
