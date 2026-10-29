// O Stranger Check (Reel T2 do teste de 19/10, palavra STRANGER): como a ficha do Google do dono aparece para quem nunca
// o contratou. Oito itens, os mesmos que a equipe confere na olhada real (as colunas "Google:" da planilha, no Code.gs),
// uma nota de 0 a 100 e o pior item escrito como um estranho o veria. Sem moeda e sem mecânica só americana, porque o
// teste roda também na Europa. Os números de mercado ficam em mercado.js, com fonte; a nota e a ordem são leitura nossa.
window.STRANGER = (function () {
  var R = {};

  R.OFICIOS = {
    cleaning: "Cleaning", lawn: "Gardening & landscaping", painting: "Painting & decorating",
    handyman: "Handyman & renovation", hvac: "Plumbing, heating & electrical", other: "Something else"
  };

  // a pergunta que vem antes dos oito: sem ficha, não há o que conferir
  R.FICHA = {
    yes: ["Yes, and I manage it", "managed"],
    unmanaged: ["Yes, but I've never logged in to it", "unmanaged"],
    none: ["Nothing comes up for my business", "none"],
    unsure: ["I haven't checked", "unsure"]
  };

  // Os oito itens, na ordem das perguntas. col = a coluna "Google: <col>" da olhada da equipe.
  // Cada opção: [chave, rótulo, pontos (0 a 3), a frase do estranho, o item como o estranho o nota]. "?" = não sabe.
  R.ITENS = [
    { id: "reviews", col: "avaliações", nome: "Number of reviews", curto: "number of reviews",
      q: "How many Google reviews does your business have?", ajuda: "The number in brackets next to your stars. A rough count is fine.",
      o: [["20", "20 or more", 3, "", ""],
          ["6-19", "6 to 19", 2, "A few reviews. The business next door has more.", "fewer than 20 reviews"],
          ["1-5", "1 to 5", 1, "Only a handful of reviews. Could be friends and family.", "only a handful of reviews"],
          ["0", "None yet", 0, "No reviews at all. I'd rather not be the first one to try them.", "no reviews"],
          ["?", "Not sure", 1, "", ""]] },
    { id: "stars", col: "estrelas", nome: "Star rating", curto: "star rating",
      q: "What's your star rating on Google?", ajuda: "The number next to the stars when someone searches your business name.",
      o: [["4.5", "4.5 or higher", 3, "", ""],
          ["4.0", "4.0 to 4.4", 2, "Good rating. The one next to it is higher.", "a rating under 4.5"],
          ["low", "Under 4.0", 0, "Under four stars. I'll check the next one first.", "a rating under four stars"],
          ["?", "Not sure", 1, "", ""]] },
    { id: "latest", col: "última avaliação", nome: "Latest review", curto: "latest review",
      q: "When did your latest Google review come in?", ajuda: "Google shows the date on every review: \"a week ago\", \"4 months ago\".",
      o: [["month", "This month", 3, "", ""],
          ["3m", "1 to 3 months ago", 2, "The newest review is from a while back. Still busy?", "no review this month"],
          ["old", "More than 3 months ago", 0, "The newest review is months old. Are they still in business?", "no review in the last three months"],
          ["?", "Not sure", 1, "", ""]] },
    { id: "replies", col: "respostas", nome: "Replies to reviews", curto: "replies to reviews",
      q: "Do you reply to your Google reviews?", ajuda: "Your reply shows under the review, signed as the owner.",
      o: [["all", "Every one", 3, "", ""],
          ["bad", "Only the bad ones", 1, "They only answer when someone complains.", "replies only to the complaints"],
          ["good", "Only the good ones", 1, "They thank the happy customers and skip the unhappy one. That's the one I read.", "the unhappy review left without an answer"],
          ["some", "Some, when I remember", 1, "Some reviews have an answer and some don't. Would they answer me?", "reviews left without an answer"],
          ["none", "Not yet", 0, "Nobody answers the reviews. Would anyone answer me?", "reviews nobody answered"]] },
    { id: "photos", col: "fotos", nome: "Photos of real work", curto: "photos",
      q: "When did you last add a photo of a real job to your listing?", ajuda: "Photos you took of your own work. Logos and stock photos don't count.",
      o: [["month", "In the last month", 3, "", ""],
          ["year", "In the last year", 2, "A few photos, nothing recent. What does their work look like now?", "no recent photos"],
          ["old", "Over a year ago", 1, "The photos look years old. Is it even the same business?", "photos over a year old"],
          ["none", "There's only a logo, or nothing", 0, "Just a logo. I can't see a single job they've done.", "no photos of real work"],
          ["?", "Not sure", 1, "", ""]] },
    { id: "hours", col: "horário", nome: "Hours", curto: "hours",
      q: "Are the hours on your listing right, holidays included?", ajuda: "Google shows \"Open\" or \"Closed\" from these hours, in red or green.",
      o: [["all", "Right, and I set holiday hours", 3, "", ""],
          ["regular", "Right, regular hours only", 2, "It says open today, and today's a holiday. Is anyone there?", "no holiday hours"],
          ["maybe", "They might be out of date", 1, "It says open, but the hours look old. I'll call someone else.", "hours that may be out of date"],
          ["none", "No hours listed", 0, "No hours. I can't tell if anyone's working right now.", "no hours"],
          ["?", "Not sure", 1, "", ""]] },
    { id: "website", col: "site", nome: "Website", curto: "website",
      q: "Where does the website button on your listing go?",
      o: [["site", "My own site, with my number near the top", 3, "", ""],
          ["old", "My own site, but it's out of date", 1, "The website looks abandoned. Are they still around?", "an out-of-date website"],
          ["social", "A social media page", 1, "The website button opens a social media page. I wanted to see what they do and where.", "a website button that opens social media"],
          ["none", "There's no website button", 0, "No website. All I have to go on is a few reviews.", "no website"],
          ["?", "Not sure", 1, "", ""]] },
    { id: "phone", col: "telefone", nome: "Phone", curto: "phone",
      q: "A stranger taps Call on your listing during working hours. What happens?",
      o: [["pick", "Someone picks up", 3, "", ""],
          ["vm", "Voicemail with the business name, and we call back the same day", 2, "Voicemail. At least I know I've got the right business.", "a voicemail instead of a person"],
          ["miss", "It rings out, or a generic voicemail", 0, "Nobody picked up, and the voicemail doesn't say who they are. I called the next one.", "a call nobody answers"],
          ["none", "There's no number on it", 0, "No number to call. I'll call the one that has one.", "no phone number"],
          ["?", "Not sure", 1, "", ""]] }
  ];
  // a ordem em que o estranho vê cada coisa na ficha, para desempatar o "first thing"
  R.VISTA = ["reviews", "stars", "photos", "hours", "latest", "replies", "website", "phone"];

  function item(id) { for (var k = 0; k < R.ITENS.length; k++) if (R.ITENS[k].id === id) return R.ITENS[k]; return null; }
  R.item = item;
  R.semAvaliacao = function (a) { return a && a.reviews === "0"; };
  // sem avaliação, a nota e a data somem da ficha (contam zero) e não há o que responder (sai da conta)
  var AUTO = { stars: ["none", "No rating yet", 0, "No rating at all. Nobody's tried them yet.", "no star rating"],
    latest: ["none", "No reviews yet", 0, "", "no reviews"], replies: ["na", "Nothing to reply to yet", null, "", ""] };

  R.check = function (i) {
    if (!i || !R.OFICIOS[i.trade]) return "Pick the kind of work you do.";
    if (!R.FICHA[i.listing]) return "Tell us whether your business shows up on Google.";
    if (i.listing === "none") return "";
    var a = i.a || {};
    for (var k = 0; k < R.ITENS.length; k++) {
      var q = R.ITENS[k];
      if (R.semAvaliacao(a) && AUTO[q.id]) continue;
      if (!q.o.some(function (o) { return o[0] === a[q.id]; })) return "Answer: " + q.q;
    }
    return "";
  };

  R.calc = function (i) {
    if (i.listing === "none") {
      return { semFicha: true, nota: 0, itens: [], contra: [], favor: [], aplicam: 8,
        primeiro: { id: "listing", nome: "Google listing", curto: "Google listing", pts: 0, linha: "I searched the name and nothing came up. Are they still around?", frase: "no Google listing at all", duvida: false } };
    }
    var a = i.a || {}, sem = R.semAvaliacao(a);
    var itens = R.ITENS.map(function (q) {
      var o = sem && AUTO[q.id] ? AUTO[q.id] : q.o.filter(function (x) { return x[0] === a[q.id]; })[0];
      return { id: q.id, nome: q.nome, curto: q.curto, col: q.col, key: o[0], label: o[1], pts: o[2], linha: o[3], frase: o[4], duvida: o[0] === "?" };
    });
    var conta = itens.filter(function (x) { return x.pts !== null; });
    var soma = conta.reduce(function (s, x) { return s + x.pts; }, 0);
    var nota = Math.round(soma / (conta.length * 3) * 100);
    // o primeiro: o de menos pontos; empate vai para o que tem resposta (o "não sei" fica depois) e para o que se vê antes
    var ord = conta.slice().sort(function (x, y) { return x.pts - y.pts || (x.duvida - y.duvida) || R.VISTA.indexOf(x.id) - R.VISTA.indexOf(y.id); });
    return {
      semFicha: false, nota: nota, itens: itens, aplicam: conta.length, ordem: ord,
      contra: ord.filter(function (x) { return x.pts <= 1; }),
      favor: conta.filter(function (x) { return x.pts >= 2; }),
      primeiro: ord[0].pts < 3 ? ord[0] : null,
      semGestao: i.listing === "unmanaged", naoConferiu: i.listing === "unsure"
    };
  };

  // a frase do palco, pela nota
  R.faixa = function (r) {
    if (r.semFicha) return "Until a listing shows up, none of the eight checks can work in your favor.";
    var c = r.contra.length, n = r.aplicam;
    if (!c) return "What a stranger checks first works in your favor.";
    if (c <= 2) return "A stranger comparing you with the business next door finds " + (c === 1 ? "one reason" : "two reasons") + " to call them first.";
    if (c * 2 > n) return "Most of what a stranger checks first counts against you, before they ever see your work.";
    return c + " of the " + n + " things a stranger checks first count against you, before they ever see your work.";
  };

  // a linha de mercado do palco e do relatório, ligada ao primeiro item; só dado com fonte (mercado.js)
  R.mercado = function (id) {
    var E = MERCADO.estranho, BL = "BrightLocal, Local Consumer Review Survey 2026";
    return {
      listing: ["Customers are 2.7 times more likely to consider a business reputable if they find a complete Business Profile on Google, according to Google.", "Google Business Profile Help", "g-perfil"],
      reviews: [E.menosDe20 + "% of U.S. adults won't use a business with fewer than 20 reviews, and only " + E.cincoOuMenos + "% will use one with five or fewer.", BL, "brightlocal"],
      stars: [E.quatro + "% of U.S. adults will only use a business with four stars or more, and " + E.quatroEMeio + "% want 4.5 or more.", BL, "brightlocal"],
      latest: [E.tresMeses + "% of U.S. adults only care about reviews written in the last three months.", BL, "brightlocal"],
      replies: [E.todas + "% of U.S. adults are likely to use a business that replies to all of its reviews, and " + E.nunca + "% are unlikely to use one that never replies.", BL, "brightlocal"],
      photos: ["Google tells businesses to add at least three photos of the work they do, and to add photos regularly.", "Google Business Profile Help", "g-fotos"],
      hours: ["Google says businesses with complete and accurate information are more likely to show up in local search results.", "Google Business Profile Help", "g-ranking"],
      website: ["After reading good reviews, " + E.site + "% of U.S. adults go to the business's website next.", BL, "brightlocal"],
      phone: ["In U.S. home services, only about half of calls (" + MERCADO.ligacoes[0][1] + "%) reach a person.", "Invoca, calls to home service businesses, 2026", "invoca"]
    }[id];
  };

  // as fotos que um estranho quer ver, por ofício
  R.FOTOS = {
    cleaning: ["A kitchen or bathroom right after you finish", "A before-and-after of the hardest job this month", "Your team at the door, in uniform", "Your kit or your van, with your name on it"],
    lawn: ["A garden before and after", "Fresh lines on a lawn you just cut", "A bed you planted or a hedge you shaped", "Your team and your equipment on site"],
    painting: ["A room before and after", "The prep: floors covered, furniture moved", "A finished outside wall or front door", "Your team at work"],
    handyman: ["A repair before and after", "A finished fitting: a kitchen, a deck, a door", "The work area tidy at the end of the day", "You or your team at work"],
    hvac: ["A finished installation", "The work area left tidy", "Your van with your name on it", "A technician at work"],
    other: ["A job before and after", "The finished result, close up", "Your team at work", "Your van or your kit, with your name on it"]
  };

  // os textos para copiar
  R.TEXTOS = {
    pedido: "Hi [name], it's [your name] from [business]. Thanks for having us today. If you're happy with how it turned out, would you leave us a quick Google review? It takes a minute and helps people nearby find us: [review link]",
    boa: "Thanks, [name]. Glad the [job] came out the way you wanted. [One detail from the job, in a sentence.] See you next time. – [your name]",
    media: "Thanks for the honest review, [name]. You're right about [what they mentioned], and that's on us. We've [what you changed since]. If you'd like us to come back and put it right, call me on [number]. – [your name]",
    ruim: "[Name], I'm sorry the job didn't go the way you expected. I'd like to hear what happened and see what I can do. Please call me on [number] or email [email]. – [your name], owner",
    caixa: "You've reached [business]. We're on a job right now. Leave your name, your address and what you need, and we'll call you back by [time] today.",
    retorno: "Hi, it's [your name] from [business]. Sorry I missed your call, I'm on a job. What can I help you with? I'll call you back by [time].",
    site: "[Business] · [what you do] in [the area you cover]\n[Phone number]\nThree photos of real jobs\nHow to get a quote: [call, text or the form]"
  };

  // o conserto de cada item: o capítulo 04 do relatório (o primeiro) e o 05 (os outros, em uma linha)
  R.CONSERTO = {
    listing: { titulo: "Put your business on Google", etiqueta: "get your business on Google",
      porque: "A stranger can't check what isn't there. Adding a listing costs nothing, and once it's verified you control what it says.",
      curta: "Add your business at business.google.com/add, then verify it.",
      passos: [
        ["Search for yourself first", "Search your business name and town in a private browser window. If a listing shows up that you didn't make, claim it instead of making a second one."],
        ["Add it", "Go to business.google.com/add, choose \"Add your business to Google\" and follow the steps. Pick the category that says what you do, and if you go to your customers, set the area you cover instead of showing your home address."],
        ["Verify it", "Google asks you to verify the business. Until it's verified, your photos won't show on the listing."],
        ["Fill in the basics the same day", "Hours, phone, website and three photos of real jobs. Chapter 03 has the list a stranger checks."]
      ] },
    unsure: { titulo: "Look yourself up the way a stranger would", etiqueta: "look yourself up like a stranger",
      porque: "You told us you're not sure what your listing shows. A stranger sees it in a second, so that's the first thing to look at, before you change anything.",
      curta: "Search your business name in a private window and check the eight items.",
      passos: [
        ["Open a private window", "On your phone, open a private or incognito tab, so Google doesn't show you the version it saves for the owner."],
        ["Search your business name and town", "Then search what a customer would type, like the service and your town, and see where you show up next to the others."],
        ["Take a screenshot", "Take one of your listing and one of the business that shows up next to you."],
        ["Check the eight items", "Go down the list in chapter 03 with the screenshot in front of you, and answer the check again."]
      ] },
    reviews: { titulo: "Ask every customer for a review, the day the job ends", etiqueta: "ask every customer for a review",
      porque: "Reviews come from asking. Ask on the day the job ends, while the customer is still pleased, and send the link so it takes them a minute.",
      curta: "Send the review link the day each job ends.",
      texto: "pedido",
      passos: [
        ["Get your review link", "On your Business Profile, choose Read reviews, then \"Get more reviews\", and copy the link. On a computer, the same screen gives you a QR code for the van or the invoice."],
        ["Send it the same day", "Text the message below when the job's done. Change the first line so it mentions the job."],
        ["Ask everyone", "Every finished job gets the message, the happy and the quiet ones. Never offer a discount or a gift for a review: Google prohibits it."]
      ] },
    stars: { titulo: "Lift the rating with recent reviews and honest replies", etiqueta: "lift the rating with recent reviews",
      porque: "A rating moves when new reviews come in. Ask every customer, and answer the low reviews in a way the next reader trusts.",
      curta: "Ask every customer for a review, and reply to the low ones.",
      texto: "media",
      passos: [
        ["Reply to every low review this week", "The next customer reads your reply more closely than the review. Use the reply below and change it to fit what they said."],
        ["Ask every customer from now on", "The review request in chapter 05 goes out the day each job ends. Recent reviews are what move the rating."],
        ["Fix what the low reviews have in common", "If two reviews mention the same thing, fix that first and say so in your replies."]
      ] },
    latest: { titulo: "Keep reviews coming in every month", etiqueta: "get a new review this month",
      porque: "A strong rating with nothing recent reads like a business that slowed down. The fix is a habit: one request after every job.",
      curta: "Send the review request after every job, so a new review lands every month.",
      texto: "pedido",
      passos: [
        ["Send the request after every job", "Use the message below. Same day, same link, every customer."],
        ["Ask your last five customers this week", "If the job went well, a short message today is fine: they remember you."],
        ["Reply to each one as it lands", "A new review with your reply under it shows a stranger the business is busy and listening."]
      ] },
    replies: { titulo: "Reply to every review, the good and the bad", etiqueta: "reply to every review",
      porque: "A stranger reads your replies to learn how you'd treat them. Reply to every review, in a few lines, and change a detail each time so it never reads like a template.",
      curta: "Reply to every review within a day or two, a few lines each.",
      texto: "boa",
      passos: [
        ["Start with the ones nobody answered", "Go back through your reviews and reply to each one, oldest unhappy ones first."],
        ["Keep it short and personal", "Use their name, mention the job and sign with yours. Google's own advice: short, polite, and no offers or promotions in the reply."],
        ["Use these as a starting point", "One reply for a good review, one for a mixed one, one for an unhappy one. Change a detail every time."]
      ],
      extras: ["media", "ruim"] },
    photos: { titulo: "Add three photos of real jobs this week, then one after every job", etiqueta: "add photos of real jobs",
      porque: "A stranger can't see your work until they hire you, so the photos are your work for now. Google tells businesses to add at least three photos of the work they do, and to keep adding.",
      curta: "Add three photos of real jobs, then one after every job.",
      passos: [
        ["Take them on your next three jobs", "Your phone is enough. Daylight, the finished work in focus, no filters."],
        ["Follow the list for your trade", "The list below is what a stranger wants to see first."],
        ["Ask before you post", "Ask the customer before you post a photo of their home, and leave out faces, house numbers and car plates."],
        ["Then one after every job", "A photo from last week tells a stranger you're working now."]
      ] },
    hours: { titulo: "Set your hours, holidays included", etiqueta: "set your hours",
      porque: "Google shows \"Open\" or \"Closed\" from your hours. Wrong hours make a stranger guess, and guessing ends with someone else's number.",
      curta: "Set your regular hours and add holiday hours.",
      passos: [
        ["Set your regular hours", "On your Business Profile, choose Edit profile, then Hours. Use the hours you answer the phone, even if you work later on site."],
        ["Add holiday hours", "Under Special hours, add every public holiday. Google suggests confirming holiday hours even when they're the same as usual."],
        ["Check them every season", "If your hours change with the season, change them on the listing the same week."]
      ] },
    website: { titulo: "Make the website button land on a page a stranger can use", etiqueta: "fix where the website button goes",
      porque: "After reading good reviews, the website is where most people go next. The page needs to answer three things fast: what you do, where, and how to get a quote.",
      curta: "Point the website button to a page with what you do, where, your number and three job photos.",
      texto: "site",
      passos: [
        ["Pick the page", "Your own site, even a single page. If all you have is a social media page, a one-page site with the four lines below beats it."],
        ["Put the four lines on the first screen", "What you do, the area you cover, your number and how to get a quote, before anyone scrolls."],
        ["Add three photos of real jobs", "The same ones you put on your listing are fine."]
      ] },
    phone: { titulo: "Make the call reach someone, or a voicemail that says who you are", etiqueta: "make the phone reach someone",
      porque: "Google asks for a number that connects to your business. When nobody can pick up, a voicemail with your name and a call-back time keeps the stranger from calling the next number.",
      curta: "Record a voicemail with the business name and a call-back time, and text back missed calls.",
      texto: "caixa",
      passos: [
        ["Put a number you control on the listing", "The phone that's with you or with whoever answers for you, never a number that sends callers to someone other than your business."],
        ["Record the voicemail below", "Your business name first, then when you'll call back."],
        ["Text back every missed call", "From the job, in ten seconds, with the second message below."]
      ],
      extras: ["retorno"] }
  };

  // o dia 3 do follow-up e a primeira semana do plano: uma frase por item
  R.SEMANA = {
    listing: "add your business at business.google.com/add and verify it.",
    unsure: "search your business name in a private window and screenshot what comes up.",
    reviews: "send your review link to every customer the day the job ends.",
    stars: "reply to every review under four stars, and ask every new customer for a review.",
    latest: "ask your last five customers for a review, and reply to each one that lands.",
    replies: "reply to every review on your listing, oldest unhappy ones first.",
    photos: "add three photos of real jobs to your listing.",
    hours: "set your hours on the listing and add the public holidays.",
    website: "make the website button open a page with what you do, where, your number and three job photos.",
    phone: "record a voicemail with your business name and the time you'll call back."
  };

  // a chave do conserto do primeiro item (o "não sei" vira "olhe a ficha")
  R.chave = function (r) {
    if (r.semFicha) return "listing";
    if (!r.primeiro) return "photos";
    return r.primeiro.duvida ? "unsure" : r.primeiro.id;
  };

  return R;
})();
