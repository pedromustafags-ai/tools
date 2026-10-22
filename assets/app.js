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
  // telefone: 10 dígitos vira +1; 55 na frente vira Brasil; 1 + 10 dígitos vira +1
  T.phone = function (s) {
    var d = String(s || "").replace(/\D/g, "");
    if (d.length === 10) return "+1" + d;
    if (d.length === 11 && d[0] === "1") return "+" + d;
    if ((d.length === 12 || d.length === 13) && d.slice(0, 2) === "55") return "+" + d;
    if (d.length >= 11 && d.length <= 15) return "+" + d;
    return "";
  };

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
