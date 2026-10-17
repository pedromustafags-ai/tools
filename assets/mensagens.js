// As três mensagens do anúncio 05. O inglês é o que o dono manda; o português é só pra ele entender o que manda.
// {E} = nome da empresa, {S} = o serviço depois de "about", {Y} = o serviço depois de "your". Colchetes ficam para ele trocar na hora de mandar.
window.MENSAGENS = [
  {
    atalho: "orc1",
    titulo: "1. Quando o cliente pede orçamento",
    quando: "No mesmo dia do pedido, por SMS. Se ele ligou e você não atendeu, mande essa mensagem antes de ligar de volta.",
    en: "Hi [customer name], this is [your name] from {E}. Thanks for reaching out about {S}. I can stop by on [day] between [time] and [time] to take a look and give you a price, or you can text me a few photos and I'll send you a price range today. What works better for you?",
    pt: "Oi, [nome do cliente], aqui é [seu nome], da {E}. Obrigado por entrar em contato sobre o serviço. Posso passar aí [dia] entre [hora] e [hora] pra ver e te dar o preço, ou você me manda umas fotos e eu te passo uma faixa de preço hoje. O que fica melhor pra você?",
    porque: "Ela chega no mesmo dia, dá duas opções e termina com uma pergunta, que é o que faz o cliente responder. O americano que pede orçamento e não ouve nada liga pro próximo da lista."
  },
  {
    atalho: "orc2",
    titulo: "2. Na véspera do serviço",
    quando: "Um dia antes, de preferência no fim da tarde, por SMS.",
    en: "Hi [customer name], it's [your name] from {E}. Just confirming your {Y} tomorrow, [date], arriving between [time] and [time]. Reply YES to confirm, or let me know if anything changed. See you tomorrow!",
    pt: "Oi, [nome do cliente], aqui é [seu nome], da {E}. Só confirmando o serviço amanhã, [data], chegando entre [hora] e [hora]. Responde YES pra confirmar, ou me avisa se mudou alguma coisa. Até amanhã!",
    porque: "O americano gosta de confirmação por escrito. Ela evita o cliente que esquece do horário, e mostra que a sua empresa é organizada antes de você chegar."
  },
  {
    atalho: "orc3",
    titulo: "3. Depois do serviço, pedindo avaliação",
    quando: "No mesmo dia, depois que você sair da casa, por SMS. Com o link de avaliação do seu Perfil da Empresa no Google.",
    en: "Hi [customer name], thanks for having us today. If you're happy with how it turned out, would you leave us a quick Google review? It helps other families nearby find us: [review link]. And if anything wasn't right, text me first and I'll come back and fix it.",
    pt: "Oi, [nome do cliente], obrigado por receber a gente hoje. Se você gostou de como ficou, deixa uma avaliação rápida no Google? Ajuda outras famílias aqui perto a acharem a gente: [link]. E se alguma coisa não ficou boa, me manda mensagem primeiro que eu volto e arrumo.",
    porque: "É assim que o americano indica: escrevendo uma avaliação. Pedir no mesmo dia, com o link na mão, é o que faz ele escrever. E a última frase traz a reclamação pra você antes de ela virar uma estrela no Google."
  }
];

// O bônus do telefone (pesquisa H §4.3): o americano liga, deixa recado e, se ninguém volta, liga pro próximo.
window.BONUS_TELEFONE = [
  {
    titulo: "O recado da sua caixa postal",
    quando: "Grave uma vez, no celular que o cliente liga. Leia devagar, como quem fala com um vizinho.",
    en: "Hi, you've reached {E}. We're on a job right now. Leave your name, your address and what you need, and we'll call you back by [5 p.m.] today. You can also text this number.",
    pt: "Oi, você ligou pra {E}. A gente está num serviço agora. Deixa o seu nome, o endereço e o que precisa, que a gente retorna até [as 5 da tarde] hoje. Você também pode mandar mensagem pra este número."
  },
  {
    titulo: "O SMS pra ligação que você perdeu",
    quando: "Em até 10 minutos depois da ligação perdida, antes de ligar de volta. Por escrito, você responde com calma, no seu tempo.",
    en: "Hi, this is [your name] from {E}. Sorry I missed your call, I'm on a job. What can I help you with? I'll call you back by [time], or just reply here if texting is easier.",
    pt: "Oi, aqui é [seu nome], da {E}. Desculpa não ter atendido, estou num serviço. Em que posso ajudar? Te ligo de volta até [hora], ou responde aqui se for mais fácil por mensagem."
  }
];
