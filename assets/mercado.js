// Os dados de mercado do relatório da Revenue Leak, todos com fonte conferida em
// conteudo/servico-pedro/2026-10-15-dor-latente-e-servico/I-dados-de-mercado-das-iscas.md (§2.1, §2.2, §2.7).
// Nada aqui é estimativa nossa: quando não há dado, a seção não aparece.
window.MERCADO = {
  // as fontes, na ordem em que o relatório as cita pela primeira vez; MERCADO.n("hbr") devolve o número [n]
  fontes: [
    ["fed", "Federal Reserve Banks, Small Business Credit Survey: 2026 Report on Employer Firms. 6,425 U.S. firms with 1 to 499 employees, fieldwork Sep–Nov 2025.", "https://www.fedsmallbusiness.org/reports/survey/2026/2026-report-on-employer-firms"],
    ["brightlocal", "BrightLocal, Local Consumer Review Survey, 2026. 1,002 U.S. adults. Review software company.", "https://www.brightlocal.com/research/local-consumer-review-survey/"],
    ["hiri", "Home Improvement Research Institute, Home Services Study 2024, as reported by Hardware Retailing, March 2025. Industry research association; the summary gives the ranking, not the percentages.", "https://hardwareretailing.com/?p=88880"],
    ["invoca", "Invoca, Home Services Lead Conversion Benchmarks Report, 2026. Calls to home service businesses that use Invoca's call software.", "https://invoca.com/reports/the-invoca-home-services-lead-conversion-benchmarks-report-2026"],
    ["hbr", "Oldroyd, McElheran and Elkington, \"The Short Life of Online Sales Leads,\" Harvard Business Review, March 2011. Audit of 2,241 U.S. companies.", "https://hbr.org/2011/03/the-short-life-of-online-sales-leads"],
    ["valve", "Valve+Meter mystery-shop study of 466 U.S. home service companies, 2018, as reported by ACHR News. Marketing agency.", "https://www.achrnews.com/blogs/17-opinions/post/140231-the-first-step-to-hvac-success-is-just-simply-showing-up"],
    ["ms", "Hart, VanEpps, Sezer and Amir, Management Science, 2026. 11.6 million marketplace interactions on Fiverr, plus experiments. Freelancers, not home services.", "https://pubsonline.informs.org/doi/10.1287/mnsc.2024.06185"],
    ["piedpiper", "Pied Piper, Lead Handling Effectiveness study of home services, April 2026. 3,211 phone, chat and form inquiries to 31 of the largest home service brands, Oct 2025–Jan 2026. Sells this measurement.", "https://www.piedpiperpsi.com/press/press-release-precision-garage-door-ranked-1-in-customer-lead-handling-effectiveness-TM-home-services-study-521.htm"],
    ["localiq", "LocaliQ, Home Services Search Advertising Benchmarks, 2025. Over 3,200 Google search campaigns, Apr 2024–Mar 2025. Ad agency.", "https://localiq.com/blog/home-services-search-advertising-benchmarks/"],
    ["searchlight", "SearchLight Digital, Google Local Services Ads cost per lead, February 2026. 888 contractors, 126,650 leads. Attribution platform.", "https://searchlightdigital.io/google-local-service-ads-cost-per-lead/"],
    // as fontes das outras cinco iscas (I §4)
    ["bls", "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025. Median hourly wage, before benefits, read from the public BLS API.", "https://www.bls.gov/oes/"],
    ["ueni", "UENI, How microbusiness owners spend their time, May 2024. 837 U.S. businesses with up to 5 employees. Sells websites to small businesses.", "https://ueni.com/en-gb/small-business-research/how-microbusiness-owners-spend-their-time/"],
    ["timeetc", "Time etc and Censuswide, The big price of small tasks, September 2023. 251 U.S. entrepreneurs. Sells virtual assistants.", "https://timeetc.com/resources/how-to-achieve-more/the-big-price-of-small-tasks-how-entrepreneurs-may-be-unwittingly-keeping-their-businesses-small"],
    ["bynder", "Bynder, AI vs. human-made content study, April 2024. 2,000 consumers in the U.K. and the U.S. Brand software company.", "https://www.bynder.com/en/press-media/ai-vs-human-made-content-study"],
    ["cicek", "Cicek, Gursoy and Lu, Journal of Hospitality Marketing & Management, 2024. Experiments with more than 1,000 U.S. adults in 8 product categories, as reported by Washington State University.", "https://news.wsu.edu/press-release/2024/07/30/using-the-term-artificial-intelligence-in-product-descriptions-reduces-purchase-intentions/"],
    ["wyzowl", "Wyzowl, Video Marketing Statistics 2026. 266 respondents, late 2025. Video production company.", "https://wyzowl.com/video-marketing-statistics/"],
    ["cochrane", "Gurol-Urganci, de Jongh, Vodopivec-Jamsek, Atun and Car, Cochrane Database of Systematic Reviews, 2013. 8 randomized trials, 6,615 participants. Health appointments, not home services.", "https://www.cochrane.org/evidence/CD007458"]
  ],
  // [bls] o que custa a hora de quem faria cada tarefa como empregado (Hand-Off)
  salarioTarefa: { calls: ["Receptionist", 18.27], followups: ["Customer service representative", 21.53], quotes: ["Secretary or administrative assistant", 22.86], invoices: ["Bookkeeping clerk", 24.36] },
  // [bls] o salário por hora de quem trabalharia para o dono, por ofício e estado (orçamento)
  salarioOficio: {
    faxina: { nome: "profissional de limpeza", EUA: 17.07, FL: 16.28, MA: 18.73, NJ: 18.26, NY: 20.17, TX: 14.26, GA: 14.31, CA: 20.51, CT: 17.39 },
    pintor: { nome: "pintor", EUA: 23.75, FL: 22.85, MA: 27.65, NJ: 28.49, NY: 28.64, TX: 21.86, GA: 23.24, CA: 28.38, CT: 28.12 },
    paisagismo: { nome: "jardineiro", EUA: 18.82, FL: 17.84, MA: 23.40, NJ: 19.88, NY: 21.56, TX: 17.66, GA: 18.25, CA: 21.90, CT: 21.99 }
  },
  // [ueni] e [timeetc]: duas perguntas diferentes, nunca multiplicar uma pela outra
  semanaDono: { ueni: [60, 22.4], timeetc: [45.5, 36] },
  // [bynder] o leitor reconhece texto de máquina, e isso pesa
  textoIa: { identificam: 50, menos: 52 },
  // [wyzowl] quem faz vídeo de marketing e já usou IA para editar
  videoIa: { ia: 63, video: 91 },
  // [cochrane] comparecimento a consulta de saúde, sem lembrete e com lembrete
  lembrete: [["No reminder", 67.8], ["Text message reminder", 78.6], ["Phone call reminder", 80.3]],
  // [invoca] quem não pede para marcar o serviço na ligação
  naoPede: 55,
  n: function (id) { for (var i = 0; i < this.fontes.length; i++) if (this.fontes[i][0] === id) return i + 1; return 0; },
  // o maior desafio operacional da pequena empresa (fed)
  fed: { pct: 57, texto: "of U.S. small businesses named reaching customers and growing sales as an operational challenge, the most named of all" },
  // os desafios operacionais dos últimos 12 meses, várias respostas (E §2, relatório do Fed, págs. 26 a 28)
  fedDesafios: [["Reaching customers and growing sales", 57], ["Hiring or keeping qualified staff", 46], ["Supply chain", 30], ["Using technology", 29], ["Complying with regulations", 25]],
  // follow-up do pedido nas maiores marcas (piedpiper, I §2.4): mede o pedido, não o orçamento, e só marca grande
  seguimento: { pct: 72, texto: "Even among the 31 largest home service brands, 72% of inquiries got no follow-up within 24 hours." },
  // licença e seguro pesam mais que o preço (hiri, I §3.11): só texto, sem porcentagem
  hiri: "Homeowners rank work quality and reputation first when choosing a pro, then being licensed and insured, and only then price.",
  // [5] quantas ligações caem numa pessoa
  ligacoes: [["All calls", 52], ["Calls over 15 seconds", 65], ["Calls over 30 seconds", 73]],
  // [6] o que o consumidor confere antes de contratar
  avaliacoes: [["Won't use a business with fewer than 20 reviews", 47], ["Only use a business with 4 stars or more", 68], ["Only count reviews from the last 3 months", 74], ["Asked to leave a review, wrote one", 83]],
  // [7] custo por pedido no anúncio de pesquisa do Google, por ofício
  porPedido: [["Cleaning", 47, "cleaning"], ["Handyman", 54, "handyman"], ["Electrical", 94, "hvac"], ["Landscaping", 118, "lawn"], ["HVAC", 128, "hvac"], ["Plumbing", 129, "hvac"], ["Painting", 138, "painting"], ["Remodeling", 166, "handyman"], ["Roofing", 228, ""]],

  // [brightlocal] quem responde a toda avaliação (I §3.4); só a folha do teste usa
  responder: 80,
  // os rótulos em português, na mesma ordem das listas acima (folha do teste, mensagens, orçamento)
  pt: {
    fedDesafios: ["Achar cliente e crescer a venda", "Contratar ou manter gente boa", "Fornecimento", "Usar tecnologia", "Cumprir a regulação"],
    ligacoes: ["Todas as ligações", "Ligações de mais de 15 segundos", "Ligações de mais de 30 segundos"],
    avaliacoes: ["Não contratam empresa com menos de 20 avaliações", "Só contratam empresa com 4 estrelas ou mais", "Só levam em conta avaliações dos últimos 3 meses", "Escreveram a avaliação quando foram convidados"],
    responder: "Preferem a empresa que responde a todas as avaliações",
    espera: ["Resposta na hora", "Uma hora depois", "Um dia depois"],
    porPedido: { Cleaning: "Limpeza", Handyman: "Reparos (handyman)", Electrical: "Elétrica", Landscaping: "Paisagismo", HVAC: "Ar-condicionado (HVAC)", Plumbing: "Encanamento", Painting: "Pintura", Remodeling: "Reforma", Roofing: "Telhado" },
    porCliente: ["Anúncio Local do Google (LSA)", "Anúncio de pesquisa do Google"]
  },

  // [searchlight] custo por cliente pagante, só HVAC, encanamento e elétrica (I §2.7)
  porCliente: [["Google Local Services Ads", 233], ["Google search ads", 472]],

  // tempo da primeira resposta: % das empresas testadas que já tinham respondido
  janela: {
    pontos: ["5 min", "1 hour", "1 day", "5 days"],
    valve: [5, 29, 45, 60], valveNunca: 40,
    hbr: [null, 37, 53, null], hbrNunca: 23,
    fonte: "Harvard Business Review (2011), 2,241 U.S. companies; Valve+Meter (2018), 466 U.S. home service companies. Both sent a test request and timed the first reply. Your own position comes from your answer.",
    links: [["Harvard Business Review", "https://hbr.org/2011/03/the-short-life-of-online-sales-leads"], ["ACHR News on Valve+Meter", "https://www.achrnews.com/blogs/17-opinions/post/140231-the-first-step-to-hvac-success-is-just-simply-showing-up"]]
  },
  // a frase de cada resposta usa o número menos lisonjeiro das duas fontes (I §2.1)
  frase: {
    "5min": { titulo: "Only about 5 in 100 home service companies tested replied this fast", x: 0 },
    "1h": { titulo: "You reply faster than about 6 in 10 of the businesses tested", x: 1 },
    "day": { titulo: "You reply faster than nearly half of the businesses tested", x: 2 },
    "later": { titulo: "About half of the businesses tested had already replied by then", x: 3 },
    "never": { titulo: "In two published tests, 23% to 40% of businesses never replied at all", x: 4 }
  },
  // o que a espera custa (Management Science, 2026)
  espera: {
    barras: [["Reply right away", 100], ["One hour later", 54], ["One day later", 10]],
    fonte: "Hart, VanEpps, Sezer and Amir, Management Science (2026): 11.6 million interactions on Fiverr. Freelancers, not home services.",
    link: "https://pubsonline.informs.org/doi/10.1287/mnsc.2024.06185",
    auto: "In the same research, the advantage of a fast reply disappeared when people believed the reply was automatic. Reply fast, and reply as yourself."
  },
  // custo por pedido e por cliente, por ofício (I §2.7). Só HVAC, encanamento e elétrica têm custo por cliente.
  custo: {
    hvac: "Contractors on Google Local Services paid about $233 per paying customer in February 2026, and about $472 per paying customer on Google search ads (SearchLight, 888 contractors).",
    cleaning: "Google search ads cost cleaning companies about $47 per lead (LocaliQ, 2025). A lead isn't a customer yet.",
    lawn: "Google search ads cost landscaping companies about $118 per lead (LocaliQ, 2025). A lead isn't a customer yet.",
    painting: "Google search ads cost painting companies about $138 per lead (LocaliQ, 2025). A lead isn't a customer yet.",
    handyman: "Google search ads cost handyman businesses about $54 per lead, and general remodelers about $166 (LocaliQ, 2025). A lead isn't a customer yet.",
    other: "Google search ads cost home service businesses about $91 per lead on average (LocaliQ, 2025). A lead isn't a customer yet."
  }
};
