// A folha de cada ponto do teste de três minutos. Os passos em português; o que o cliente lê, em inglês.
// {E} = nome da empresa. Colchetes ficam para o dono trocar.
window.FOLHAS = {
  T: {
    abre: "O americano que liga e não é atendido deixa recado e espera pouco. Se ninguém volta, ele liga pra próxima empresa da lista. Esses três passos fazem a ligação perdida virar conversa, mesmo com você no meio do serviço.",
    passos: [
      { t: "Grave a caixa postal em inglês, com o nome da empresa", d: "É a primeira coisa que ele ouve de você. Leia devagar, como quem fala com um vizinho:", en: "Hi, you've reached {E}. We're on a job right now. Leave your name, your address and what you need, and we'll call you back by [5 p.m.] today. You can also text this number." },
      { t: "Toda ligação perdida recebe um SMS em até 10 minutos", d: "Antes de ligar de volta, mande a mensagem. Ela segura o cliente enquanto você termina o serviço:", en: "Hi, this is [your name] from {E}. Sorry I missed your call, I'm on a job. What can I help you with? I'll call you back by [time]." },
      { t: "Separe dois horários fixos pra retornar ligações", d: "Por exemplo, ao meio-dia e às cinco da tarde. Diga esse horário na caixa postal e cumpra. No iPhone, em Ajustes › Telefone › Responder com Mensagem, dá pra deixar o SMS acima pronto pra quando você recusar uma ligação." }
    ],
    semana: "grava a caixa postal em inglês, com o nome da empresa e o horário em que você retorna."
  },
  R: {
    abre: "Quem pede orçamento por mensagem costuma pedir pra mais de uma empresa e comparar as respostas. Sai na frente quem responde primeiro e por escrito, e quem confirma antes de chegar.",
    passos: [
      { t: "Responda todo pedido no mesmo dia, mesmo sem o preço", d: "O cliente precisa saber que você viu. Duas opções e uma pergunta no fim fazem ele responder:", en: "Hi [customer name], this is [your name] from {E}. Thanks for reaching out. I can stop by on [day] between [time] and [time] to take a look and give you a price, or you can text me a few photos and I'll send you a price range today. What works better for you?" },
      { t: "Mande o preço por escrito, em inglês, com o que está incluso", d: "Preço só por mensagem faz o cliente comparar valor. Com o que está incluso e o que não está, ele compara serviço. O modelo pronto está aqui:", link: "../../orcamento/", linkTexto: "Calculadora de preço e modelo de orçamento" },
      { t: "Confirme o horário na véspera, por SMS", d: "O americano gosta de confirmação por escrito, e ela evita o cliente que esquece:", en: "Hi [customer name], it's [your name] from {E}. Just confirming tomorrow, [date], arriving between [time] and [time]. Reply YES to confirm, or let me know if anything changed." }
    ],
    semana: "responde todo pedido de orçamento no mesmo dia, mesmo antes de saber o preço."
  },
  G: {
    abre: "Quando o americano procura \"house cleaning near me\", aparecem as empresas no mapa do Google. Ele compara avaliação, foto e horário antes de ligar, e as avaliações em inglês são a indicação dele.",
    passos: [
      { t: "Complete o Perfil da Empresa no Google", d: "Em business.google.com, confira a categoria, a área atendida, o horário, o telefone americano e o site. Ponha 10 fotos de serviço pronto, antes e depois. E escreva a descrição em inglês:", en: "{E} is a [service] company serving [cities]. We [what you do and how: same crew every visit, price in writing before we start]. Licensed and insured. Call or text [phone], [days and hours]." },
      { t: "Peça avaliação depois de todo serviço, com o link", d: "No mesmo dia, por SMS. O link de avaliação fica no seu Perfil da Empresa, no botão de pedir avaliações:", en: "Hi [customer name], thanks for having us today. If you're happy with how it turned out, would you leave us a quick Google review? It helps other families nearby find us: [review link]. And if anything wasn't right, text me first and I'll come back and take care of it." },
      { t: "Responda toda avaliação, em inglês", d: "Quem vai contratar lê a resposta do dono. Pra avaliação boa:", en: "Thank you, [name]! It was a pleasure taking care of your [service]. See you next time.", d2: "E pra avaliação ruim, sem discutir em público:", en2: "Thank you for telling us, [name]. I'm sorry about [what happened]. I'll call you today to make it right." }
    ],
    semana: "pede avaliação no Google, com o link, pra todo cliente que você atender."
  },
  C: {
    abre: "O americano confere a empresa antes de deixar alguém entrar em casa. Ele procura site, telefone, e-mail e seguro, e desconfia de quem não tem.",
    passos: [
      { t: "Tenha um site de uma página", d: "Não precisa ser grande. Precisa ter o nome da empresa, o serviço, as cidades atendidas, o telefone, o e-mail, fotos de serviço feito e a frase do seguro. A primeira linha diz algo que o cliente consegue conferir:", en: "[Service] in [cities]. We answer calls and texts until [8 p.m.], and you get the price in writing before we start." },
      { t: "Escreva \"Licensed and insured\" onde ele vê", d: "No site, no Perfil do Google e no rodapé do orçamento. Se ele pedir, mande o certificado do seguro. Só escreva \"Licensed\" se você tem licença:", en: "Licensed and insured. Certificate of insurance available on request." },
      { t: "Use um e-mail com o nome da empresa", d: "Um e-mail como contact@suaempresa.com passa mais confiança que um endereço pessoal. Dá pra criar junto com o domínio do site." }
    ],
    semana: "coloca \"Licensed and insured\" no seu Perfil do Google e no rodapé do orçamento."
  }
};
