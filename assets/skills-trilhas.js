// As trilhas do guia das skills (anúncio 03): a pergunta da tela escolhe pela dor, como o próprio guia ensina
// ("Pick by pain"), e cada resposta aponta para as categorias de skills-guia.js. A confiança vira um rótulo legível.
window.TRILHAS = {
  cortar: { rotulo: "Cut the pauses and retakes", tarefa: "cutting the pauses and retakes", cats: ["Cutting and assembly"] },
  legendas: { rotulo: "Add captions", tarefa: "captions", cats: ["Captions and transcription"] },
  audio: { rotulo: "Clean up the audio or add music", tarefa: "audio and music", cats: ["Audio and music"] },
  motion: { rotulo: "Titles and motion graphics", tarefa: "titles and motion graphics", cats: ["Motion graphics and programmatic video"] },
  cortes: { rotulo: "Turn one long video into shorts", tarefa: "turning long videos into shorts", cats: ["Repurposing and formats"] },
  app: { rotulo: "Work inside the editing app I already use", tarefa: "your editing app", cats: ["Drive your editing app (plugins and MCP)"] },
  comeco: { rotulo: "Not sure yet: show me where to start", tarefa: "getting started", cats: ["Start here", "All-in-one kits"] }
};
window.CONFIANCA = { high: ["Trust first", "forte"], medium: ["Worth a look", "meio"], low: ["Read it before it runs", "vaza"] };
// as skills de uma trilha, das mais confiáveis para as menos
window.skillsDa = function (k) {
  var t = TRILHAS[k] || TRILHAS.comeco, ordem = { high: 0, medium: 1, low: 2 };
  return SKILLS_GUIA.filter(function (s) { return t.cats.indexOf(s.category) >= 0; })
    .sort(function (a, b) { return ordem[a.confidence] - ordem[b.confidence]; });
};
