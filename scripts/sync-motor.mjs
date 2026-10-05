// ─── Akıllı eşleştirme motorunu siteye kopyalar ───
// Kaynak: Hackhaton/web_otomasyon (değiştirilmez)  →  Hedef: public/motor (git'e girmez, her dev/build'de yeniden üretilir)
//
// Kopyaya eklenenler:
//   • isofon-theme.css  — motor arayüzünü İSOFON renklerine uyarlar
//   • isofon-bridge.js  — Groq isteklerini sunucu vekiline yönlendirir (anahtar tarayıcıya gelmez)
//   • "İSOFON'a dön" bağlantısı (navbar)
//   • env.js            — gerçek env.js DEĞİL, anahtarsız env.example.js kopyalanır
//
// Kaynak yolu MOTOR_SOURCE ortam değişkeniyle değiştirilebilir.

import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = resolve(ROOT, process.env.MOTOR_SOURCE || '../../Hackhaton/web_otomasyon');
const TARGET = join(ROOT, 'public', 'motor');
const OVERLAY = join(ROOT, 'motor-overlay');

const SKIP = new Set(['env.js', 'env.example.js', '.DS_Store']);
const PAGES = ['index.html', 'eu.html'];

// Sitenin logosundaki kırmızı "İ" (motorun kendi favicon'u yok → /favicon.ico 404 veriyordu)
const FAVICON = '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%227%22 fill=%22%23ed1c24%22/%3E%3Ctext x=%2216%22 y=%2224%22 font-family=%22Arial%22 font-weight=%22800%22 font-size=%2220%22 fill=%22white%22 text-anchor=%22middle%22%3E%C4%B0%3C/text%3E%3C/svg%3E">';
const BACK_LINK = '<a class="isofon-back" href="../" title="İSOFON ana sayfasına dön"><span>←</span><span><b>İSO<i>FON</i></b>\'a dön</span></a>';

function inject(html, page, pattern, replacement, what) {
    if (!pattern.test(html)) {
        throw new Error(`[sync-motor] ${page}: ${what} için yer bulunamadı (${pattern}). Motorun HTML yapısı değişmiş olabilir.`);
    }
    return html.replace(pattern, replacement);
}

if (!existsSync(SOURCE)) {
    if (existsSync(TARGET)) {
        console.warn(`[sync-motor] Kaynak bulunamadı (${SOURCE}); mevcut public/motor kopyası kullanılacak.`);
    } else {
        console.warn(`[sync-motor] UYARI: Kaynak bulunamadı (${SOURCE}). Akıllı eşleştirme motoru siteye eklenmedi.`);
    }
    process.exit(0);
}

rmSync(TARGET, { recursive: true, force: true });
cpSync(SOURCE, TARGET, { recursive: true, filter: (src) => !SKIP.has(basename(src)) });

// Anahtarsız yapılandırma: Groq anahtarı yalnız sunucuda (vite.config.ts) okunur
const envTemplate = readFileSync(join(SOURCE, 'env.example.js'), 'utf8');
writeFileSync(
    join(TARGET, 'env.js'),
    '// İSOFON: Bu dosya scripts/sync-motor.mjs tarafından env.example.js\'ten üretildi; anahtar içermez.\n' + envTemplate,
);

for (const file of ['isofon-theme.css', 'isofon-bridge.js']) {
    cpSync(join(OVERLAY, file), join(TARGET, file));
}

for (const page of PAGES) {
    const path = join(TARGET, page);
    let html = readFileSync(path, 'utf8');
    html = inject(html, page, /<\/head>/, `    <link rel="stylesheet" href="isofon-theme.css">\n    ${FAVICON}\n</head>`, 'tema');
    html = inject(html, page, /(\s*)<script src="env\.js/, '$1<script src="isofon-bridge.js"></script>$1<script src="env.js', 'köprü');
    html = inject(html, page, /<div class="navbar-right">/, `<div class="navbar-right">\n            ${BACK_LINK}`, 'geri dönüş bağlantısı');
    html = html.replace(/<title>([^<]*)<\/title>/, '<title>$1 · İSOFON</title>');
    writeFileSync(path, html);
}

console.log(`[sync-motor] Motor kopyalandı: ${SOURCE} → public/motor`);
