// O que todas as páginas usam: id do lead, origem do anúncio, envio do contato, registro de abertura e de uso,
// pixel da Meta e o empacotamento dos números no link do relatório.
(function () {
  var C = window.TOOLS_CONFIG || {};
  var T = (window.T = {});

  T.qs = new URLSearchParams(location.search);

  T.uid = function () {
    var a = new Uint8Array(9);
    (window.crypto || window.msCrypto).getRandomValues(a);
    var s = "";
    for (var i = 0; i < a.length; i++) s += (a[i] % 36).toString(36);
    return s + Date.now().toString(36).slice(-3);
  };

  // origem do anúncio: guardada na primeira página e levada até o envio
  var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
  T.utm = function () {
    var s = {};
    try { s = JSON.parse(sessionStorage.getItem("utm") || "{}"); } catch (e) {}
    UTM.forEach(function (k) { var v = T.qs.get(k); if (v) s[k] = v; });
    try { sessionStorage.setItem("utm", JSON.stringify(s)); } catch (e) {}
    return s;
  };
  T.utm();

  function postBody(body) {
    return fetch(C.ENDPOINT, {
      method: "POST", mode: "no-cors", keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: body
    });
  }

  // envia o lead; o id nasce aqui, então a página não depende da resposta do servidor
  T.sendLead = function (lead) {
    if (!C.ENDPOINT) return Promise.reject(new Error("no-endpoint"));
    lead.action = "lead";
    lead.utm = T.utm();
    lead.page = location.href.split("#")[0];
    lead.at = new Date().toISOString();
    lead.tz = T.fuso(); // a região na planilha: o mesmo anúncio roda na Europa e na América do Norte
    lead.locale = navigator.language || "";
    T.pixel("Lead", { content_name: lead.tool });
    return postBody(JSON.stringify(lead));
  };

  // abriu, copiou, imprimiu: chega na planilha pelo id
  T.event = function (id, tool, type, data) {
    if (!C.ENDPOINT || !id) return;
    var body = JSON.stringify({ action: "event", id: id, tool: tool, type: type, data: data || "", at: new Date().toISOString() });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(C.ENDPOINT, new Blob([body], { type: "text/plain;charset=utf-8" }))) return;
    } catch (e) {}
    postBody(body).catch(function () {});
  };

  // números do lead no link do relatório (nenhum dado de contato vai no link)
  T.enc = function (o) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };
  T.dec = function (s) {
    s = (s || "").replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    return JSON.parse(decodeURIComponent(escape(atob(s))));
  };
  T.link = function (rel, params) {
    var u = new URL(rel, location.href);
    Object.keys(params).forEach(function (k) { u.searchParams.set(k, params[k]); });
    return u.toString();
  };

  T.usd = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };
  T.num = function (v) {
    if (v === null || v === undefined) return NaN;
    var s = String(v).replace(/[^0-9.]/g, "");
    return s === "" ? NaN : parseFloat(s);
  };
  T.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  // minúscula para o meio da frase, mas a sigla fica como é ("HVAC" segue "HVAC")
  T.minuscula = function (s) {
    return String(s || "").split(" ").map(function (w) { return /^[A-Z0-9]{2,}$/.test(w) ? w : w.toLowerCase(); }).join(" ");
  };

  T.validEmail = function (s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s).trim()); };

  // de onde a pessoa preenche: o fuso do navegador (Europe/Amsterdam, America/Chicago) e o idioma dele
  T.fuso = function () {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { return ""; }
  };
  // o país do celular: um seletor ao lado do campo, já marcado pelo fuso do navegador, e a pessoa só digita o número.
  // Os países são os do anúncio (EUA, Canadá e norte da Europa) e o Brasil; o resto entra por "Other", com o código.
  var PAISES = [["US", "1", "🇺🇸"], ["CA", "1", "🇨🇦"], ["GB", "44", "🇬🇧"], ["IE", "353", "🇮🇪"], ["NL", "31", "🇳🇱"],
    ["BE", "32", "🇧🇪"], ["LU", "352", "🇱🇺"], ["FR", "33", "🇫🇷"], ["DE", "49", "🇩🇪"], ["AT", "43", "🇦🇹"], ["CH", "41", "🇨🇭"],
    ["DK", "45", "🇩🇰"], ["SE", "46", "🇸🇪"], ["NO", "47", "🇳🇴"], ["FI", "358", "🇫🇮"], ["BR", "55", "🇧🇷"]];
  var FUSO_PAIS = { "Europe/London": "GB", "Europe/Dublin": "IE", "Europe/Amsterdam": "NL", "Europe/Brussels": "BE",
    "Europe/Luxembourg": "LU", "Europe/Paris": "FR", "Europe/Berlin": "DE", "Europe/Busingen": "DE", "Europe/Vienna": "AT",
    "Europe/Zurich": "CH", "Europe/Copenhagen": "DK", "Europe/Stockholm": "SE", "Europe/Oslo": "NO", "Europe/Helsinki": "FI" };
  T.paisDoFuso = function () {
    var tz = T.fuso();
    if (FUSO_PAIS[tz]) return FUSO_PAIS[tz];
    if (/^America\/(Sao_Paulo|Bahia|Fortaleza|Recife|Belem|Maceio|Araguaina|Santarem|Manaus|Cuiaba|Campo_Grande|Porto_Velho|Boa_Vista|Rio_Branco|Eirunepe|Noronha)$/.test(tz)) return "BR";
    if (/^(Canada\/|America\/(Toronto|Montreal|Vancouver|Edmonton|Winnipeg|Regina|Halifax|St_Johns|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Yellowknife|Iqaluit|Swift_Current|Thunder_Bay)$)/.test(tz)) return "CA";
    // o resto das Américas, e o navegador sem fuso (ou com UTC, que esconde o fuso), segue no +1, como antes
    if (!tz || /^(America|US)\//.test(tz) || tz === "Pacific/Honolulu" || /^(Etc\/|UTC$|GMT$)/.test(tz)) return "US";
    return "";
  };
  T.pais = function () { var s = document.getElementById("phoneCountry"); return s ? s.value : T.paisDoFuso(); };
  function codigo(pais) { var p = PAISES.filter(function (x) { return x[0] === pais; })[0]; return p ? p[1] : ""; }

  // telefone. Com + ou 00 na frente, vale o código digitado, mesmo com outro país marcado, e nos países em que o 0 de
  // casa cai depois do código ele cai aqui também (+44 (0)7911... vira +447911...). Sem código, vale o país marcado: o
  // 0 da frente cai (06 12345678 na Holanda vira +31612345678), e no +1 são 10 dígitos, como antes. O brasileiro com
  // o 55 na frente vale com o +1 ou o +55 marcado, como antes. Com "Other" e sem código, volta vazio.
  var ZERO_CAI = ["31", "32", "33", "41", "43", "44", "46", "49", "353", "358"];
  T.phone = function (s, pais) {
    var t = String(s || "").trim(), d = t.replace(/\D/g, ""), c = codigo(pais === undefined ? T.pais() : pais);
    if (t.charAt(0) === "+" || d.slice(0, 2) === "00") {
      d = d.replace(/^00/, "");
      ZERO_CAI.forEach(function (k) { if (d.indexOf(k + "0") === 0) d = k + d.slice(k.length + 1); });
      return d.length >= 8 && d.length <= 15 ? "+" + d : "";
    }
    if (/^55\d{10,11}$/.test(d) && (c === "1" || c === "55")) return "+" + d;
    if (c === "1") { d = d.replace(/^1(?=\d{10}$)/, ""); return /^[1-9]\d{9}$/.test(d) ? "+1" + d : ""; }
    if (!c) return "";
    d = d.replace(/^0/, "");
    return d.length >= 6 && c.length + d.length <= 15 ? "+" + c + d : "";
  };
  // a frase para quem marcou "Other" e não pôs o código; "" quando vale a da página
  T.phoneErro = function (s, pais) {
    var t = String(s || "").trim(), d = t.replace(/\D/g, "");
    if (!d || t.charAt(0) === "+" || d.slice(0, 2) === "00" || codigo(pais === undefined ? T.pais() : pais)) return "";
    return /^pt/.test(document.documentElement.lang) ? "Escolha o país, ou comece pelo código do país, como +55." : "Pick your country, or start with the country code, like +44.";
  };
  function seletorDePais() {
    var pt = /^pt/.test(document.documentElement.lang), campo = document.getElementById("phone");
    if (!campo || document.getElementById("phoneCountry")) return;
    var sel = document.createElement("select"), linha = document.createElement("div");
    sel.id = "phoneCountry";
    sel.setAttribute("aria-label", pt ? "País do número" : "Country");
    sel.innerHTML = PAISES.map(function (p) { return '<option value="' + p[0] + '">' + p[2] + " +" + p[1] + "</option>"; }).join("") +
      '<option value="">' + (pt ? "Outro" : "Other") + "</option>";
    sel.value = T.paisDoFuso();
    linha.className = "tel-linha";
    campo.parentNode.insertBefore(linha, campo);
    linha.appendChild(sel);
    linha.appendChild(campo);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", seletorDePais); else seletorDePais();

  T.copy = function (btn, text, done) {
    function ok() {
      var old = btn.textContent;
      btn.classList.add("done");
      btn.textContent = btn.getAttribute("data-done") || "Copied";
      setTimeout(function () { btn.classList.remove("done"); btn.textContent = old; }, 1800);
      if (done) done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) {}
      document.body.removeChild(ta);
    }
  };

  // grupo de botões que funciona como um select
  T.choices = function (el, onChange) {
    var btns = el.querySelectorAll("button");
    btns.forEach(function (b) {
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        el.setAttribute("data-value", b.getAttribute("data-value"));
        if (onChange) onChange(b.getAttribute("data-value"));
      });
    });
  };

  // pixel da Meta, só quando o id estiver configurado
  T.pixel = function (ev, params) {
    if (window.fbq) window.fbq("track", ev, params || {});
  };
  if (C.PIXEL_ID) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", C.PIXEL_ID);
    window.fbq("track", "PageView");
  }
})();
