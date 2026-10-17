// Desenha um par da folha de troca: o que cortar, o que escrever, e por quê.
window.Swap = {
  marca: function (s) { return T.esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>'); },
  pair: function (p, i, copiar) {
    return '<div class="pair"><p class="where">' + T.esc(p.where) + "</p>" +
      '<div class="cut"><span class="lab">Cut</span><s>' + T.esc(p.cut) + "</s></div>" +
      '<div class="write"><span class="lab">Write instead</span>' + Swap.marca(p.write) + "</div>" +
      '<p class="why">' + T.esc(p.why) + "</p>" +
      (copiar ? '<button class="copy noprint" data-i="' + i + '">Copy the new line</button>' : "") + "</div>";
  }
};
