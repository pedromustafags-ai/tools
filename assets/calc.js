// As três contas, puras: a mesma função roda na calculadora, no relatório e no teste (node).
(function (root) {
  var Calc = {};

  // ---------- 04 · Revenue Leak Calculator ----------
  // Cada vazamento usa os números do dono. Dois deles pedem uma suposição, que fica escrita e ajustável no
  // relatório: o pedido que espera para o dia seguinte, e o orçamento parado sem follow-up, fecham `penalty` a
  // menos que o tratado na hora. O pedido que nunca recebeu preço entra pela própria taxa de fechamento dele.
  var FOLLOW = { never: 0, sometimes: 1 / 3, usually: 2 / 3, always: 1 };
  var FOLLOW_WORDS = { never: "never", sometimes: "sometimes", usually: "usually", always: "every time" };
  // a frase de quem descreve o hábito dele, sem julgar
  Calc.FOLLOW_FRASE = {
    never: "When a quote goes quiet, you let it go.",
    sometimes: "When a quote goes quiet, you follow up only sometimes.",
    usually: "When a quote goes quiet, you usually follow up, and a few still slip.",
    always: "You follow up on every quiet quote."
  };
  var LEAK_LABELS = {
    reply: { title: "Slow first replies", phrase: "slow first replies" },
    unquoted: { title: "Requests that never got a price", phrase: "requests that never got a price" },
    follow: { title: "Quiet quotes with no follow-up", phrase: "quotes with no follow-up" },
    quote: { title: "How the quote reads", phrase: "how the quote reads" }
  };

  Calc.leakCheck = function (i) {
    var keys = ["requests", "sameDay", "quoted", "jobs", "avgJob"];
    for (var k = 0; k < keys.length; k++) if (!(i[keys[k]] >= 0) || isNaN(i[keys[k]])) return "Fill in every number. A zero is fine.";
    if (!FOLLOW.hasOwnProperty(i.followUp)) return "Pick how often you follow up on a quiet quote.";
    if (i.requests <= 0) return "Put in how many quote requests came in last month.";
    if (i.sameDay > i.requests) return "Same-day replies can't be more than the requests that came in.";
    if (i.quoted > i.requests) return "Quotes sent can't be more than the requests that came in.";
    if (i.jobs > i.quoted) return "Booked jobs can't be more than quotes sent. A job you priced on the phone counts as a quote.";
    if (i.jobs <= 0 || i.quoted <= 0) return "With no booked jobs last month there's no rate to work from. Try the month before.";
    if (i.avgJob <= 0) return "Put in what an average job brings in.";
    return "";
  };

  Calc.leak = function (i, penalty) {
    var k = penalty == null ? 0.25 : penalty;
    var R = i.requests, S = i.sameDay, Q = i.quoted, J = i.jobs, V = i.avgJob, f = FOLLOW[i.followUp];
    var s = S / R;
    var A = s + (1 - s) * (1 - k);
    var F = f + (1 - f) * (1 - k);
    var rate = J / Q;
    var parts = [
      { key: "reply", amount: (J / A - J) * V, jobs: J / A - J, count: R - S },
      { key: "unquoted", amount: (R - Q) * rate * V, jobs: (R - Q) * rate, count: R - Q },
      { key: "follow", amount: (J / F - J) * V, jobs: J / F - J, followWord: FOLLOW_WORDS[i.followUp] }
    ];
    var total = parts.reduce(function (a, p) { return a + p.amount; }, 0);
    var revenue = J * V;
    parts.forEach(function (p) {
      p.title = LEAK_LABELS[p.key].title;
      p.share = total > 0 ? p.amount / total : 0;
    });
    var sorted = parts.slice().sort(function (a, b) { return b.amount - a.amount; });
    // processo apertado: o que sobra é o próprio orçamento
    var biggest = total < 0.05 * revenue ? "quote" : sorted[0].key;
    return {
      total: total, year: total * 12, revenue: revenue, closeRate: rate, sameDayShare: s,
      penalty: k, parts: sorted, biggest: biggest,
      biggestTitle: LEAK_LABELS[biggest].title, biggestPhrase: LEAK_LABELS[biggest].phrase
    };
  };

  // O quanto do dinheiro que os pedidos poderiam trazer ele já fecha (J §2.5, camada 1).
  Calc.leakBooked = function (i, r) {
    var fechado = i.jobs * i.avgJob;
    return fechado + r.total > 0 ? fechado / (fechado + r.total) : 0;
  };

  // O dinheiro em serviços dele (J §2.7): só aparece a partir de três quartos de um serviço.
  Calc.leakObjeto = function (i, r) {
    var k = r.total / i.avgJob;
    if (k >= 1.5) return "That's about " + Math.round(k) + " of your average jobs, every month.";
    if (k >= 0.75) return "That's about one of your average jobs, every month.";
    return "";
  };

  // A leitura de quem entende (J §2.7): uma ou duas frases, com o número dele primeiro, sem estatística.
  Calc.leakLeitura = function (i, r) {
    var p = {}; r.parts.forEach(function (x) { p[x.key] = x; });
    var c = Math.round(r.closeRate * 100);
    if (r.biggest === "reply") return p.reply.count + " of your " + i.requests + " requests waited until the next day for a first answer. That one changes this week, with one text from the truck.";
    if (r.biggest === "unquoted") return p.unquoted.count + " of your " + i.requests + " requests never got a price. At your own close rate of " + c + "%, that's about " + Math.round(p.unquoted.jobs * 10) / 10 + " jobs a month that never had the chance to say yes.";
    if (r.biggest === "follow") return Calc.FOLLOW_FRASE[i.followUp] + " A customer who goes quiet hasn't said no yet, and one text on day three puts your quote back at the top of their phone.";
    return "Your replies and follow-ups hold up well. What's left to gain is in how the quote reads: the price in writing, with what's included and what isn't.";
  };

  // Os ofícios da primeira pergunta (J §2.3) e a foto de cada um (assets/img/, Pexels, créditos em creditos.json)
  Calc.OFICIOS = {
    cleaning: "Cleaning", lawn: "Lawn & landscaping", painting: "Painting",
    handyman: "Handyman & remodeling", hvac: "HVAC, plumbing & electrical", other: "Something else"
  };

  // Por onde começar (relatório e tela de envio). Sem "fix": o vocabulário nunca diz que o dono errou.
  Calc.LEAK_COMECE = {
    reply: {
      porque: "Answer every request the same day, even when you're on a job. The customer doesn't need the price yet. They need to know you saw it before they call the next number. Save this text on your phone and send it from the truck:",
      texto: "Hi, it's [your name] from [your business]. Got your request. I'm on a job right now and I'll call you by [time] today."
    },
    unquoted: {
      porque: "Every request gets a price the same week, even a rough one. A range keeps the customer from calling around while they wait for your visit, and you still confirm the exact number when you see the job:",
      texto: "Hi [name], thanks for the details. Jobs like yours usually run $[low] to $[high]. I'll confirm the exact price when I see it. Does [day] work for a quick look?"
    },
    follow: {
      porque: "Every quote older than three days gets one text. A customer who went quiet hasn't said no yet, and a short text puts your quote back at the top of their phone:",
      texto: "Hi [name], it's [your name]. Still thinking over the quote for [the job]? Happy to walk you through the price."
    },
    quote: {
      porque: "Your replies and follow-ups hold up. What's left is how the quote reads. Send the price in writing, with what's included and what isn't. People argue less with a price they understand:",
      texto: "[The job] at [address]\nPrice: $[total]\nIncluded: [item], [item], [item]\nNot included: [item]\nGood until: [date]\nTo book: reply YES and I'll send two dates."
    }
  };
  Calc.LEAK_CURTO = {
    reply: "Slow first replies: answer every request the same day, even before you know the price. A short text from the truck is enough.",
    unquoted: "Requests that never got a price: give a range the same week and confirm the exact price on the visit.",
    follow: "Quiet quotes: one text on day three to every quote that hasn't heard back.",
    quote: "How the quote reads: put the price in writing, with what's included and what isn't."
  };

  // ---------- 01 · Hand-Off Calculator ----------
  // Metade da ligação e metade do orçamento ficam com o dono: a primeira conversa e o preço.
  var TASKS = [
    { key: "followups", label: "Following up on quotes and leads", short: "following up on quotes and leads", weight: 1 },
    { key: "invoices", label: "Invoices and chasing payments", short: "invoices and chasing payments", weight: 1 },
    { key: "posts", label: "Posting and marketing", short: "posting and marketing", weight: 1 },
    { key: "quotes", label: "Typing up and sending quotes", note: "You keep the price", short: "typing up and sending quotes", weight: 0.5 },
    { key: "calls", label: "Call-backs, scheduling and reminders", note: "You keep the first call", short: "call-backs, scheduling and reminders", weight: 0.5 }
  ];
  Calc.TASKS = TASKS;
  Calc.WEEKS = 50;

  Calc.handoffCheck = function (i) {
    var any = false;
    for (var t = 0; t < TASKS.length; t++) {
      var h = i[TASKS[t].key];
      if (isNaN(h) || h < 0) return "Put in the hours for each line. A zero is fine.";
      if (h > 80) return "Keep each line under 80 hours a week.";
      if (h > 0) any = true;
    }
    if (!any) return "Put in the hours for at least one line.";
    if (!(i.rate > 0)) return "Put in what an hour of your time brings in.";
    return "";
  };

  Calc.handoff = function (i) {
    var rows = TASKS.map(function (t) {
      var h = i[t.key] || 0;
      var off = h * t.weight;
      return { key: t.key, label: t.label, note: t.note || "", short: t.short, hours: h, handoff: off, keep: h - off, yearCost: off * i.rate * Calc.WEEKS };
    });
    var hours = rows.reduce(function (a, r) { return a + r.hours; }, 0);
    var off = rows.reduce(function (a, r) { return a + r.handoff; }, 0);
    var ranked = rows.slice().sort(function (a, b) { return b.handoff - a.handoff; }); // sort estável: empate segue a ordem de TASKS
    return {
      hours: hours, handoffHours: off, keepHours: hours - off,
      yearCost: off * i.rate * Calc.WEEKS, allYearCost: hours * i.rate * Calc.WEEKS,
      rows: rows, ranked: ranked, top: ranked[0]
    };
  };

  // Por que passar essa tarefa primeiro, os três passos, e os textos que quem assumir vai mandar (tela e relatório)
  Calc.HANDOFF_PASSOS = {
    followups: {
      why: "It's the work that needs you least: the same few texts, sent on the right day, to people who already asked you for a price.",
      steps: ["Put every open quote and every lead that didn't answer in one list, with the date and the phone number.",
        "Write the two texts you'd send: one on day three, one on day seven.",
        "Whoever takes it sends them and marks who answered. You only hear about the ones who said yes."],
      textos: [["Day 3, to a quiet quote", "Hi [name], it's [your name] from [business]. Still thinking over the quote for [the job]? Happy to answer any questions."],
        ["Day 7, the last one", "Hi [name], checking in on the quote for [the job]. Want me to hold a date for you while you decide?"]]
    },
    invoices: {
      why: "Nobody needs to be on the job to send an invoice or a reminder, and every week it waits, the money takes longer to reach your account.",
      steps: ["Invoice the day the job ends, from one template with your payment options.",
        "Write the reminder texts for day 7 and day 14 after the due date.",
        "Whoever takes it sends them and keeps the list. You only see what's still unpaid after 30 days."],
      textos: [["Day 7 after the due date", "Hi [name], a quick reminder that the invoice for [the job] was due on [date]. You can pay here: [link]. Thank you!"],
        ["Day 14 after the due date", "Hi [name], following up on the invoice for [the job], now two weeks past due. When can I expect it?"]]
    },
    posts: {
      why: "Your work makes the posts. Someone else can do the posting, as long as the photos and your words come from you.",
      steps: ["Take a before and an after photo on every job, or a 20-second video.",
        "Send a voice note saying what the job was and what you'd want a neighbor to know about it.",
        "Whoever takes it posts and answers comments. You approve the first two weeks, then spot-check."],
      textos: [["The caption they fill in from your voice note", "[Before and after] in [town]: [what the job was]. [One detail only someone in the trade would notice]. Call or text [phone]."]]
    },
    quotes: {
      why: "The price stays with you. What can go is everything around it: typing it up, sending it the same day and filing it.",
      steps: ["On site, you decide the price and the scope, and say it into a voice note or a few notes on your phone.",
        "Make one quote template with your usual lines for what's included and what isn't.",
        "Whoever takes it types it up and sends it the same day, then follows up."],
      textos: [["The message that goes with the quote", "Hi [name], here's the quote for [the job]. Everything that's included is on the list, and so is what isn't. Any questions, just text me."]]
    },
    calls: {
      why: "The first conversation with a new customer stays with you. Call-backs, confirmations and reschedules follow rules you already know by heart.",
      steps: ["Write down the questions you ask every new customer and the answers you give most.",
        "Write your scheduling rules: which days, which areas, how long each kind of job takes.",
        "Whoever takes it handles call-backs, confirmations and reschedules. A new customer's first call still comes to you."],
      textos: [["The confirmation the day before", "Hi [name], it's [helper's name] from [business]. Just confirming [day] between [time] and [time]. Reply YES to confirm, or let me know if anything changed."]]
    }
  };

  // ---------- 06 · Calculadora de preço (brasileiro) ----------
  // O mínimo cobre os custos e deixa no bolso o que o dono quer ganhar, depois de separar o imposto sobre o lucro.
  Calc.precoCheck = function (i) {
    if (!(i.horas > 0)) return "Coloque quantas horas de trabalho o serviço leva.";
    if (!(i.ganhoHora > 0)) return "Coloque quanto você quer ganhar por hora.";
    var opt = ["ajudante", "material", "deslocamento", "fixos", "servicosMes"];
    for (var k = 0; k < opt.length; k++) if (isNaN(i[opt[k]]) || i[opt[k]] < 0) return "Os valores não podem ser negativos. Zero vale.";
    if (i.fixos > 0 && !(i.servicosMes > 0)) return "Coloque quantos serviços você faz por mês, pra dividir os custos fixos.";
    if (!(i.imposto >= 0 && i.imposto < 60)) return "A reserva de imposto precisa ficar entre 0 e 60%.";
    return "";
  };

  Calc.preco = function (i) {
    var trabalho = i.horas * i.ganhoHora;
    var t = i.imposto / 100;
    var imposto = trabalho / (1 - t) - trabalho;
    var fixosPorServico = i.fixos > 0 && i.servicosMes > 0 ? i.fixos / i.servicosMes : 0;
    var custos = (i.ajudante || 0) + (i.material || 0) + (i.deslocamento || 0) + fixosPorServico;
    var exato = custos + trabalho + imposto;
    var minimo = Math.ceil(exato / 5) * 5;
    return {
      minimo: minimo, exato: exato, porHora: minimo / i.horas,
      linhas: [
        { rotulo: "O que você põe no bolso", valor: trabalho },
        { rotulo: "Reserva pro imposto", valor: imposto },
        { rotulo: "Ajudante", valor: i.ajudante || 0 },
        { rotulo: "Material e produtos", valor: i.material || 0 },
        { rotulo: "Deslocamento", valor: i.deslocamento || 0 },
        { rotulo: "Parte dos custos fixos do mês", valor: fixosPorServico }
      ]
    };
  };

  if (typeof module !== "undefined" && module.exports) module.exports = Calc;
  else root.Calc = Calc;
})(this);
