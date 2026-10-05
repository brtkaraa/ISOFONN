// ─── İSOFON köprüsü — yalnız public/motor/ kopyasına eklenir, env.js'ten ÖNCE yüklenir ───
// Groq anahtarı tarayıcıya hiç gelmez: motorun api.groq.com isteklerini sitenin kendi sunucusundaki
// /motor-api/groq/ vekiline yönlendirir; anahtarı vekil (vite.config.ts → motorGroqProxy) ekler.
(function () {
    var GROQ_ORIGIN = 'https://api.groq.com/';
    var PROXY_BASE = new URL('../motor-api/groq/', window.location.href).href;
    var nativeFetch = window.fetch.bind(window);

    function stripAuth(headers) {
        if (!headers) return headers;
        var h = new Headers(headers);
        h.delete('Authorization');
        return h;
    }

    window.fetch = function (input, init) {
        var url = typeof input === 'string' ? input : (input && input.url) || '';
        if (url.indexOf(GROQ_ORIGIN) !== 0) return nativeFetch(input, init);

        var proxied = PROXY_BASE + url.slice(GROQ_ORIGIN.length);
        var opts = Object.assign({}, init);
        opts.headers = stripAuth(opts.headers || (typeof input !== 'string' ? input.headers : undefined));
        return nativeFetch(proxied, opts);
    };
})();
