// ─── F8 | TÜBİTAK Fon Karar Destek Sistemi — app.js ───
// Yerel Ollama (Öncelikli) & Çoklu AI Model Orkestrasyonu

const OLLAMA_HOST = window.ENV?.OLLAMA_HOST || 'http://localhost:11434';
const GROQ_BASE   = 'https://api.groq.com/openai/v1/chat/completions';

let availableModels = [];
let activeBackend   = 'none'; // 'ollama' | 'groq' | 'none'
let lastAnalysis    = null;   // Dışa aktarma (PDF/Kopyala) için son analiz sonucu

// ── GÖMÜLÜ PROGRAM ÖZETLERİ ──
const PROGRAM_OZETI = `
TÜBİTAK Sanayi Destek Programları Özeti (2026):

1501 - Sanayi Ar-Ge Projeleri: YALNIZCA KOBİ (Sermaye şirketi). Yeni ürün/süreç Ar-Ge. Max 24 ay. Max 20M TL destek. %60-75 hibe. Çağrı Açık (son başvuru 2026-10-26). Dikkat: Şahıs şirketi, adi ortaklık, vakıf, dernek başvuramaz. Reddedilen öneri değişikliksiz tekrar sunulamaz.

1503 - Proje Pazarları: Oda/Birlik/Vakıf veya Üniversite başvurur. Bireysel şirket doğrudan başvuramaz. Sürekli açık.

1505 - Üniversite-Sanayi İşbirliği: Üniversiteler yürütücü. Şirket ortak olabilir. TRL düşük projeler için uygun.

1507 - KOBİ Ar-Ge Başlangıç: YALNIZCA KOBİ. Küçük ölçek için ideal. Bütçe sınırı daha düşük. İlk 5 proje şartı. Hibe.

1509 - Uluslararası Sanayi Ar-Ge: Yabancı ortak zorunlu. KOBİ veya büyük şirket başvurabilir. Uluslararası fon programları (Eureka, Eurostars vb.) ile birlikte.

1511 - TÜBİTAK Öncelikli Alanlar: Büyük bütçe ve stratejik sektörler. Yapay Zeka, Yeşil Dönüşüm, Sağlık öncelikli.

1512 / 1812 - Girişimcilik (BİGG): Bireysel girişimci / yeni mezun / startup. TRL 1-5 fikir aşaması. Yatırım tabanlı hibe ve mentorluk.

1513 - Teknoloji Transfer Ofisleri (TTO): Yalnızca üniversite TTO veya Teknopark yönetici şirketleri.

1514 - Girişim Sermayesi (Tech-InvesTR): Fonların fonu modeli. Girişim sermayesi fonlarına katkı.

1601 - Yenilik Girişimcilik Kapasitesi: Kapasite artırıcı çağrılar, mentorluk arayüzleri.

1602 - Patent Destek Programı: Başvuru numarası alınmış patent/faydalı modeller için vekil ve tescil desteği.

1702 - Patent Tabanlı Teknoloji Transferi: Üniversite/TTO'daki patentin sanayiye lisanslanması. En az 10 yıl koruma süresi şartı.

1707 - Siparişe Dayalı Ar-Ge: Müşteri kuruluş (KOBİ veya Büyük) + Tedarikçi KOBİ ortaklığı zorunlu.

1709 - Eureka Eurostars: KOBİ ağırlıklı uluslararası Ar-Ge konsorsiyumları.

1711 - Yapay Zeka Ekosistem Çağrısı: En az 1 KOBİ, 1 Büyük ve 1 Üniversite/Araştırma ortaklığı şart.

1831 - Yeşil İnovasyon Teknoloji Mentorluk: KOBİ'lerin yeşil dönüşüm danışmanlığı alması için hizmet çeki desteği.

1832 - Sanayide Yeşil Dönüşüm: TRL 3-7 arası enerji verimliliği ve karbon azaltımı. Max 3 ortak. TRL 8+ hariç.

1833 - SAYEM Yeşil Dönüşüm: Platform yürütücüsü Orta veya Büyük ölçekli sanayi kuruluşu olmalı. En az 3 ortak + üniversite. TRL 5-7.
`;

const STORY_SYSTEM_PROMPT = `Sen bir TÜBİTAK uzmanısın. Sana verilen sirket hikayesini analiz edip asagidaki JSON formatinda bir profil cikar.
SADECE verilen metin ve TÜBİTAK program ozeti bilgilerini kullan. Asla internet aramasi yapma.

CIKTI FORMATI (Yalnizca gecerli JSON objesi dondur, baska metin yazma):
{
  "q_company_type": "kobi_kucuk | kobi_orta | buyuk | akademi | girisimci | oda_birlik",
  "q_trl": "2 | 5 | 6 | 8 | unsure",
  "q_budget": "500000 | 2000000 | 7000000 | 15000000 | unsure",
  "q_partnership": "tek | sirket | akademi | yabanci | unsure",
  "q_prev_tubitak": "yok | var_basarili | var_devam | var_reddedildi",
  "q_theme_arge": 0, "q_theme_yz": 0, "q_theme_yesil": 0, "q_theme_sanayiarge": 0,
  "q_theme_patent": 0, "q_theme_uluslararasi": 0, "q_theme_unisanayi": 0, "q_theme_ticarilestirme": 0,
  "q_bonus_woman": false, "q_bonus_earthquake": false, "q_bonus_priority": false,
  "q_bonus_patent": false, "q_bonus_ihracat": false, "q_bonus_genc": false,
  "summary": "2-3 cumle Turkce ozet"
}
TRL: 2=fikir (TRL 1-3), 5=prototip (TRL 4-5), 6=calisir prototip (TRL 6-7), 8=ticarilestirme (TRL 8-9). Butce: 500000=<500K, 2000000=500K-3M, 7000000=3-10M, 15000000=10M+.`;

// ── HAZIR ÖRNEK SENARYOLAR ──
const PRESET_STORIES = {
    kobi_yz: "4 yıllık bir yazılım KOBİ'siyiz (Mikro ölçek). İmalat sanayisinde enerji tüketimini yapay zeka ve görüntü işleme ile optimize eden bir platform geliştiriyoruz. Çalışan saha prototipimiz (TRL 5) hazır. Bütçe ihtiyacımız yaklaşık 2.500.000 TL. Bir üniversiteden danışman araştırmacı dahil etmeyi planlıyoruz. Kadın kurucu ortağımız bulunuyor.",
    buyuk_yesil: "20 yıllık büyük ölçekli bir imalat sanayi kuruluşuyuz (400+ çalışan). Fabrikamızda baca gazı emisyonunu ve atık ısısını %35 azaltacak yeşil dönüşüm teknolojisi geliştiriyoruz. Laboratuvar prototipimiz (TRL 5) hazır, hedefimiz saha demonstrasyonu. Proje bütçemiz yaklaşık 35.000.000 TL. Sürece bir KOBİ tedarikçi ortağımızı da dahil ediyoruz.",
    girisimci_bigg: "Henüz şirketleşmemiş yeni mezun bir mühendisim. Sağlık sektöründe biyomedikal sinyalleri işleyen taşınabilir bir teşhis cihazı üzerine kavram geliştirme ve simülasyon (TRL 2-3) seviyesindeyiz. Şirketleşmek, patent almak ve prototip üretmek için 900.000 TL çekirdek hibe desteğine ve mentorluğa ihtiyacımız var."
};

// ── LLM YARDIMCI METOTLARI ──
function cleanLlmOutput(raw) {
    if (!raw) return '';
    return raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

async function detectLLMBackend() {
    const groqKey = window.ENV?.GROQ_API_KEY?.trim();
    if (groqKey && groqKey.length > 10 && !groqKey.includes('BURAYA')) {
        activeBackend = 'groq';
        let model = window.ENV?.GROQ_MODEL || 'qwen/qwen3.8-27b';

        try {
            const resp = await fetch('https://api.groq.com/openai/v1/models', {
                headers: { 'Authorization': `Bearer ${groqKey}` }
            });
            if (resp.ok) {
                const data = await resp.json();
                const available = (data.data || []).map(m => m.id);
                const candidates = [
                    window.ENV?.GROQ_MODEL,
                    'qwen/qwen3.8-27b',
                    'openai/gpt-oss-120b',
                    'llama-3.3-70b-versatile',
                    'llama-3.1-8b-instant'
                ].filter(Boolean);

                const matched = candidates.find(c => available.includes(c));
                if (matched) {
                    model = matched;
                } else {
                    const fallbackChat = available.find(m => !m.includes('whisper') && !m.includes('guard'));
                    if (fallbackChat) model = fallbackChat;
                }
                window.ENV.GROQ_MODEL = model;
                return { type: 'groq', primaryModel: model };
            } else if (resp.status === 401) {
                return { type: 'error', error: 'Geçersiz Groq API Anahtarı' };
            }
        } catch (_) {}

        return { type: 'groq', primaryModel: model };
    }

    try {
        const resp = await fetch(`${OLLAMA_HOST}/api/tags`, { method: 'GET' });
        if (resp.ok) {
            const data = await resp.json();
            availableModels = (data.models || []).map(m => m.name);
            activeBackend = 'ollama';
            return {
                type: 'ollama',
                models: availableModels,
                primaryModel: pickModel('ORCHESTRATOR')
            };
        }
    } catch (_) {}

    activeBackend = 'none';
    return { type: 'none' };
}

function pickModel(role) {
    const configured = window.ENV?.MODELS?.[role];
    if (configured && availableModels.some(m => m === configured || m.startsWith(configured))) {
        return configured;
    }
    if (availableModels.includes('qwen3:4b')) return 'qwen3:4b';
    if (availableModels.includes('qwen2.5:3b-instruct')) return 'qwen2.5:3b-instruct';
    if (availableModels.includes('llama3.2:1b')) return 'llama3.2:1b';
    return availableModels[0] || 'qwen3:4b';
}

async function callOllamaChat(model, messages, temperature = 0.2) {
    const resp = await fetch(`${OLLAMA_HOST}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: model,
            messages: messages,
            stream: false,
            options: { temperature }
        })
    });
    if (!resp.ok) throw new Error(`Ollama yanıt hatası (${resp.status}): ${resp.statusText}`);
    const data = await resp.json();
    return cleanLlmOutput(data.message?.content || '');
}

async function callGroqChat(messages, model = null) {
    const key = window.ENV?.GROQ_API_KEY?.trim();
    if (!key) throw new Error('Groq API anahtarı bulunamadı. Lütfen env.js dosyasını kontrol edin.');
    const selectedModel = model || window.ENV?.GROQ_MODEL || 'llama-3.3-70b-versatile';
    const resp = await fetch(GROQ_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
            model: selectedModel,
            messages: messages,
            temperature: 0.2,
            max_tokens: 2048
        })
    });
    if (!resp.ok) {
        let msg = `Groq API Hatası (${resp.status})`;
        try {
            const e = await resp.json();
            msg = e.error?.message ? `Groq: ${e.error.message}` : msg;
        } catch (_) {}
        throw new Error(msg);
    }
    const data = await resp.json();
    return cleanLlmOutput(data.choices?.[0]?.message?.content || '');
}

async function callUnifiedLLM(messages, role = 'ORCHESTRATOR') {
    if (activeBackend === 'groq') {
        return await callGroqChat(messages);
    } else if (activeBackend === 'ollama') {
        const model = pickModel(role);
        return await callOllamaChat(model, messages);
    } else {
        throw new Error('Yapay Zeka kapalı. Lütfen env.js içine Groq API anahtarınızı girin veya terminalde "ollama serve" komutunu çalıştırın.');
    }
}

// ── BİLDİRİM TOAST YARDIMCISI ──
function showToast(text) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.remove('hidden');
    toast.classList.add('visible');
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2500);
}

// ── ANA SAYFA DÖNGÜSÜ ──
document.addEventListener('DOMContentLoaded', async () => {
    const loadingState     = document.getElementById('loading-state');
    const inputContainer   = document.getElementById('input-container');
    const profileForm      = document.getElementById('profile-form');
    const btnAnalyze       = document.getElementById('btn-analyze');
    const btnLlmExtract    = document.getElementById('btn-llm-extract');
    const llmBtnText       = document.getElementById('llm-btn-text');
    const llmBtnLoading    = document.getElementById('llm-btn-loading');
    const llmParsedPreview = document.getElementById('llm-parsed-preview');
    const emptyReport      = document.getElementById('empty-report');
    const analysisReport   = document.getElementById('analysis-report');
    const summaryStats     = document.getElementById('summary-stats');
    const matchesList      = document.getElementById('matches-list');
    const ineligibleList   = document.getElementById('ineligible-list');
    const restSection      = document.getElementById('rest-section');
    const restList         = document.getElementById('rest-list');
    const btnShowRest      = document.getElementById('btn-show-rest');
    const reportStatus     = document.getElementById('report-status');
    const exportButtons    = document.getElementById('export-buttons');
    const btnCopyReport    = document.getElementById('btn-copy-report');
    const btnPrintReport   = document.getElementById('btn-print-report');
    const chatModal        = document.getElementById('llm-chat-modal');
    const closeChat        = document.getElementById('close-chat');
    const chatTitle        = document.getElementById('chat-title');
    const chatSubtitle     = document.getElementById('chat-subtitle');
    const chatHistory      = document.getElementById('chat-history');
    const chatInput        = document.getElementById('chat-input');
    const btnSendChat      = document.getElementById('btn-send-chat');

    let currentChatProgram = null;

    // 1. LLM Durum Tespiti
    await detectLLMBackend();

    // 2. Kural Motoru Yükleme
    try {
        await window.engine.init();
        loadingState.classList.add('hidden');
        inputContainer.classList.remove('hidden');
    } catch (e) {
        const isFile = window.location.protocol === 'file:';
        loadingState.innerHTML = isFile
            ? '<p style="color:var(--error);max-width:320px;text-align:center;line-height:1.5;"><strong>Yerel Sunucu Gerekli (CORS)</strong><br><small style="color:var(--text-muted);">Tarayıcı doğrudan dosya açılışında (file://) JSON verisini engelleyebilir.<br>Lütfen terminalden:<br><code style="background:#222;padding:2px 6px;border-radius:4px;color:#00ffcc;">python -m http.server 8000</code><br>veya <code style="background:#222;padding:2px 6px;border-radius:4px;color:#00ffcc;">npx serve web_otomasyon</code><br>ile başlatıp localhost üzerinden açın.</small></p>'
            : '<p style="color:var(--error);max-width:280px;text-align:center">Veritabanı yüklenemedi.<br>JSON veri dosyalarını kontrol edin.</p>';
        return;
    }

    // 3. Option Cards Etkileşimi
    document.querySelectorAll('.option-grid[data-name]').forEach(group => {
        const name = group.dataset.name;
        const hidden = profileForm.querySelector(`input[name="${name}"]`);
        group.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                group.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                if (hidden) hidden.value = card.dataset.value;
            });
        });
    });

    // 4. Dinamik Soru: Büyük Şirket KOBİ Ortağı
    const dynamicQKobi = document.getElementById('dynamic-q-kobi');
    document.getElementById('q_company_type_group').addEventListener('click', e => {
        const card = e.target.closest('.option-card');
        if (card) dynamicQKobi.classList.toggle('hidden', card.dataset.value !== 'buyuk');
    });

    // 5. Hazır Senaryo Butonları
    document.querySelectorAll('.btn-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.preset;
            const text = PRESET_STORIES[key];
            if (text) {
                const textarea = document.getElementById('llm-story-input');
                textarea.value = text;
                textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // 6. Serbest Metin Analizi (Ollama Destekli NLP)
    btnLlmExtract.addEventListener('click', async () => {
        const text = document.getElementById('llm-story-input').value.trim();
        if (text.length < 20) {
            alert('Lütfen projenizi ve işletmenizi en az birkaç cümleyle açıklayın.');
            return;
        }

        llmBtnText.classList.add('hidden');
        llmBtnLoading.classList.remove('hidden');
        llmParsedPreview.classList.add('hidden');

        try {
            const raw = await callUnifiedLLM([
                { role: 'system', content: STORY_SYSTEM_PROMPT },
                { role: 'user', content: text }
            ], 'ORCHESTRATOR');

            const jsonMatch = raw.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('Yapay zeka geçerli bir JSON profili üretemedi. Tekrar deneyiniz.');
            const parsed = JSON.parse(jsonMatch[0]);

            applyParsedProfile(parsed);
            llmParsedPreview.innerHTML = `<strong>✨ AI Analiz Özeti:</strong> ${parsed.summary || 'Metin başarıyla çözümlendi ve form kriterlerine aktarıldı.'}`;
            llmParsedPreview.classList.remove('hidden');

            setTimeout(runAnalysis, 400);
        } catch (e) {
            llmParsedPreview.innerHTML = `<span style="color:var(--error)">⚠️ Hata: ${e.message}</span>`;
            llmParsedPreview.classList.remove('hidden');
        } finally {
            llmBtnText.classList.remove('hidden');
            llmBtnLoading.classList.add('hidden');
        }
    });

    function applyParsedProfile(p) {
        ['q_company_type','q_trl','q_budget','q_partnership','q_prev_tubitak'].forEach(name => {
            const val = String(p[name] || '');
            if (!val) return;
            const group = document.getElementById(`${name}_group`);
            const hidden = profileForm.querySelector(`input[name="${name}"]`);
            if (group) {
                group.querySelectorAll('.option-card').forEach(c => c.classList.toggle('active', c.dataset.value === val));
            }
            if (hidden) hidden.value = val;
        });
        if (p.q_company_type === 'buyuk') dynamicQKobi.classList.remove('hidden');
        ['q_theme_arge','q_theme_yz','q_theme_yesil','q_theme_sanayiarge','q_theme_patent','q_theme_uluslararasi','q_theme_unisanayi','q_theme_ticarilestirme',
         'q_bonus_woman','q_bonus_earthquake','q_bonus_priority','q_bonus_patent','q_bonus_ihracat','q_bonus_genc'].forEach(name => {
            const cb = profileForm.querySelector(`input[name="${name}"]`);
            if (cb) cb.checked = !!p[name];
        });
    }

    function mapProfile(formData) {
        const p = {};
        const cType = formData.get('q_company_type');
        if (cType === 'unsure')          { p.unsure_company = true; }
        else if (cType === 'kobi_kucuk') { p.F01 = 'SERMAYE_SIRKETI'; p.F02 = 'Küçük'; }
        else if (cType === 'kobi_orta')  { p.F01 = 'SERMAYE_SIRKETI'; p.F02 = 'Orta'; }
        else if (cType === 'buyuk')      { p.F01 = 'SERMAYE_SIRKETI'; p.F02 = 'Büyük ölçekli'; p.dynamic_kobi_partner = formData.get('q_dynamic_kobi') === 'evet'; }
        else if (cType === 'akademi')    { p.F01 = 'UNIVERSITE_ARASTIRMA'; }
        else if (cType === 'girisimci')  { p.F01 = 'GIRISIMCI_BIREYSEL'; }
        else if (cType === 'oda_birlik') { p.F01 = 'ODA_BIRLIK'; }

        const trl = formData.get('q_trl');
        if (trl === 'unsure') p.unsure_trl = true; else p.F11 = trl;
        const budget = formData.get('q_budget');
        if (budget === 'unsure') p.unsure_budget = true; else p.F14 = budget;
        const partner = formData.get('q_partnership');
        if (partner === 'unsure')        p.unsure_partnership = true;
        else if (partner === 'tek')      p.F16 = 'Tek başıma';
        else if (partner === 'sirket')   p.F16 = 'Yerli şirket ortağı var';
        else if (partner === 'akademi')  p.F16 = 'Üniversite-araştırma kurumu ortağı var';
        else if (partner === 'yabanci')  p.F16 = 'Yabancı (uluslararası) ortak var';

        p.prev_tubitak = formData.get('q_prev_tubitak') || 'yok';
        p.themes = {
            arge: !!formData.get('q_theme_arge'), yz: !!formData.get('q_theme_yz'),
            yesil: !!formData.get('q_theme_yesil'), sanayiarge: !!formData.get('q_theme_sanayiarge'),
            patent: !!formData.get('q_theme_patent'), uluslararasi: !!formData.get('q_theme_uluslararasi'),
            unisanayi: !!formData.get('q_theme_unisanayi'), ticarilestirme: !!formData.get('q_theme_ticarilestirme'),
        };
        if (formData.get('q_bonus_woman') === 'yes')      p.F27 = 50;
        if (formData.get('q_bonus_earthquake') === 'yes') p.F09 = 'Evet';
        if (formData.get('q_bonus_priority') === 'yes')   p.F15 = 'Öncelikli';
        if (formData.get('q_bonus_patent') === 'yes')     p.hasPatent = true;
        if (formData.get('q_bonus_ihracat') === 'yes')    p.hasIhracat = true;
        if (formData.get('q_bonus_genc') === 'yes')       p.isGencFirma = true;
        return p;
    }

    // 7. Karar Motorunu Çalıştırma
    function runAnalysis() {
        const profile = mapProfile(new FormData(profileForm));
        reportStatus.className = 'badge badge-info';
        reportStatus.textContent = 'Hesaplanıyor...';
        emptyReport.classList.add('hidden');
        analysisReport.classList.add('hidden');

        setTimeout(() => {
            const { top5, rest, ineligible } = window.engine.analyze(profile);
            lastAnalysis = { profile, top5, rest, ineligible };

            renderReport(top5, rest, ineligible);
            reportStatus.className = 'badge badge-success';
            reportStatus.textContent = `${top5.length + rest.length} uyumlu · ${ineligible.length} uyumsuz`;
            exportButtons.classList.remove('hidden');
            analysisReport.classList.remove('hidden');
            analysisReport.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    // 8. Rapor Görünümü
    function renderReport(top5, rest, ineligible) {
        matchesList.innerHTML = '';
        ineligibleList.innerHTML = '';
        restList.innerHTML = '';
        summaryStats.innerHTML = `
            <div class="summary-stat"><div class="stat-value text-success">${top5.length}</div><div class="stat-label">Ana Öneri</div></div>
            <div class="summary-stat"><div class="stat-value text-warning">${rest.length}</div><div class="stat-label">Diğer Uygun</div></div>
            <div class="summary-stat"><div class="stat-value text-error">${ineligible.length}</div><div class="stat-label">Uygun Değil</div></div>
        `;
        top5.forEach((r, i) => matchesList.appendChild(buildCard(r, i + 1)));
        if (rest.length > 0) {
            restSection.classList.remove('hidden');
            btnShowRest.textContent = `${rest.length} diğer uygun programı göster ↓`;
            rest.forEach(r => restList.appendChild(buildCard(r, null)));
        } else {
            restSection.classList.add('hidden');
        }
        if (ineligible.length === 0) {
            ineligibleList.innerHTML = '<p class="section-hint">Uyumsuz program bulunamadı.</p>';
        } else {
            ineligible.forEach(r => ineligibleList.appendChild(buildIneligibleCard(r)));
        }

        // Danışman Butonları
        document.querySelectorAll('.btn-chat').forEach(btn => {
            btn.addEventListener('click', e => {
                const b = e.currentTarget;
                openChat({
                    code: b.dataset.code,
                    name: b.dataset.name,
                    budgetLimit: b.dataset.budget,
                    supportRate: b.dataset.support,
                    specialCondition: decodeURIComponent(b.dataset.condition)
                });
            });
        });
    }

    function scoreStyle(s) {
        if (s >= 80) return { fg: 'var(--success)', bg: 'var(--success-dim)', border: '3px solid var(--success)' };
        if (s >= 55) return { fg: 'var(--warning)', bg: 'var(--warning-dim)', border: '3px solid var(--warning)' };
        return { fg: 'var(--error)', bg: 'var(--error-dim)', border: '3px solid var(--error)' };
    }

    function buildCard(res, rank) {
        const { fg, bg, border } = scoreStyle(res.matchScore);
        const card = document.createElement('div');
        card.className = 'program-card';
        card.style.borderLeft = border;
        let html = `
            <div class="card-top">
                <div class="card-title">
                    <h4>${rank ? `<span style="color:${fg};margin-right:.35rem">#${rank}</span>` : ''}${res.code} — ${res.name}</h4>
                    <div class="card-meta">
                        ${buildDateBadge(res.deadlineRaw)}
                        <span class="badge badge-info">${res.budgetLimit}</span>
                        <span class="badge badge-success">Destek: ${res.supportRate}</span>
                    </div>
                </div>
                <div class="score-box" style="background:${bg};color:${fg}">
                    <div class="score-num">%${res.matchScore}</div>
                    <div class="score-lbl">Uyum</div>
                    ${res.missingScore > 0 ? `<div class="score-missing">-%${res.missingScore} Eksik</div>` : `<div class="score-perfect">Tam Uyum</div>`}
                </div>
            </div>
            <div class="score-bar"><div class="score-bar-fill" style="width:${res.matchScore}%;background:${fg}"></div></div>`;

        if (res.estimatedGrant && res.estimatedEquity !== null) {
            html += `
            <div class="financial-box">
                <div class="financial-item">
                    <span class="fin-label">💰 Tahmini Hibe:</span>
                    <span class="fin-val text-success"><b>${res.estimatedGrant.toLocaleString('tr-TR')} TL</b></span>
                </div>
                <div class="financial-item">
                    <span class="fin-label">🏢 Tahmini Özkaynak:</span>
                    <span class="fin-val"><b>${res.estimatedEquity.toLocaleString('tr-TR')} TL</b></span>
                </div>
                <div class="financial-item">
                    <span class="fin-label">🎯 Destek Oranı:</span>
                    <span class="fin-val"><b>${res.supportRate}</b></span>
                </div>
            </div>`;
        }

        if (res.matchLogs.length)   { html += `<div class="log-label ok">✓ Eşleşen Şartlar ve Güçlü Yönler</div><ul class="log-list ok">`; res.matchLogs.forEach(l => html += `<li>${l.text}${l.val > 0 ? ` <b>(+%${l.val})</b>` : ''}</li>`); html += '</ul>'; }
        if (res.penaltyLogs.length) { html += `<div class="log-label bad">⚠ Kesilen Puanlar ve Kısıtlar</div><ul class="log-list bad">`; res.penaltyLogs.forEach(l => html += `<li>${l.text}${l.val > 0 ? ` <b>(-%${l.val})</b>` : ''}</li>`); html += '</ul>'; }
        if (res.gapLogs?.length && res.missingScore > 0) {
            html += `<div class="log-label gap">🎯 %100 İçin Eksik Kalanlar & Tavsiyeler (-%${res.missingScore})</div><ul class="log-list gap">`;
            res.gapLogs.forEach(g => html += `<li>${g.text}</li>`);
            html += '</ul>';
        }
        if (res.warnings?.length)   { html += `<div class="log-label warn">📌 Önemli Notlar ve Başvuru Takvimi</div><ul class="log-list warn">`; res.warnings.forEach(w => html += `<li>${w}</li>`); html += '</ul>'; }
        html += `<div class="card-actions">
            <button class="btn-chat" data-code="${res.code}" data-name="${res.name}" data-budget="${res.budgetLimit}" data-support="${res.supportRate}" data-condition="${encodeURIComponent(res.specialCondition)}">
                🤖 AI Danışmanına Sor
            </button>
            <a href="${res.officialUrl}" target="_blank" class="link-official">Resmi Başvuru Sayfası ↗</a>
        </div>`;
        card.innerHTML = html;
        return card;
    }

    function buildIneligibleCard(res) {
        const card = document.createElement('div');
        card.className = 'program-card ineligible';
        card.innerHTML = `
            <div class="card-top">
                <div class="card-title">
                    <h4>${res.code} — ${res.name}</h4>
                    <div class="card-meta">
                        <span class="badge badge-info">${res.budgetLimit}</span>
                        <span class="badge badge-secondary">Destek: ${res.supportRate}</span>
                    </div>
                </div>
                <span class="badge badge-danger">Başvurulamaz</span>
            </div>
            <div class="log-label bad">❌ Ön Eleme Gerekçesi</div>
            <ul class="log-list bad"><li><b>${res.eliminationReason}</b></li></ul>
            <div class="card-actions" style="margin-top:.75rem">
                <a href="${res.officialUrl}" target="_blank" class="link-official">Resmi Sayfa ↗</a>
            </div>`;
        return card;
    }

    function buildDateBadge(raw) {
        if (!raw || raw === 'Belirtilmedi' || raw === '-' || raw === 'null') return `<span class="badge badge-pending">Tarih Belirtilmedi</span>`;
        const parts = String(raw).split('-');
        if (parts.length !== 3) return `<span class="badge badge-info">${raw}</span>`;
        const diff = Math.ceil((new Date(parts[0], parts[1]-1, parts[2]) - new Date()) / 86400000);
        if (diff < 0)   return `<span class="badge badge-danger">Süresi Doldu: ${raw}</span>`;
        if (diff <= 15) return `<span class="badge badge-warning">Son ${diff} gün (${raw})</span>`;
        return `<span class="badge badge-success">Açık Çağrı: ${raw}</span>`;
    }

    // 9. Çoklu Model / Ajan Orkestrasyonlu Danışman
    async function openChat(prog) {
        currentChatProgram = prog;
        chatTitle.textContent = `${prog.code} — Çoklu AI Program Danışmanı`;
        chatSubtitle.textContent = `Mevzuat & Finans Uzmanları + Baş Danışman Sentezi (${pickModel('ORCHESTRATOR')})`;
        chatHistory.innerHTML = '';
        chatModal.classList.remove('hidden');

        addMsg('bot', `
            <strong>${prog.code} — ${prog.name}</strong> çağrısını inceliyorsunuz.<br><br>
            • <strong>Destek Limiti:</strong> ${prog.budgetLimit} | <strong>Destek Oranı:</strong> ${prog.supportRate}<br>
            • <strong>Özel Koşul Notu:</strong> ${prog.specialCondition}<br><br>
            Aşağıdaki hazır hızlı sorulardan birini seçebilir veya aklınıza takılan soruları serbestçe yazabilirsiniz.
        `);
    }

    closeChat.addEventListener('click', () => chatModal.classList.add('hidden'));
    chatModal.addEventListener('click', e => { if (e.target === chatModal) chatModal.classList.add('hidden'); });

    // Hızlı Çip Soruları
    document.querySelectorAll('.btn-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.dataset.q;
            sendChat();
        });
    });

    async function sendChat() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addMsg('user', msg);
        chatInput.value = '';

        const prog = currentChatProgram;
        const progressId = addOrchestrationProgress();

        try {
            const orchestration = await orchestrateMultiAgentConsultant(prog, msg, updateOrchestrationStep);
            removeOrchestrationProgress(progressId);

            let botHtml = `
                <div class="synthesized-answer">
                    ${orchestration.orchestratorReply.replace(/\n/g, '<br>')}
                </div>
                <details class="expert-breakdown">
                    <summary>🔍 Uzman Notlarını Göster (Mevzuat & Finans)</summary>
                    <div class="expert-cards">
                        <div class="expert-subcard">
                            <div class="expert-subhead">🏛️ Mevzuat & Şartlar Uzmanı:</div>
                            <div class="expert-subtext">${orchestration.legalReply.replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="expert-subcard">
                            <div class="expert-subhead">💰 Finans & Bütçe Uzmanı:</div>
                            <div class="expert-subtext">${orchestration.financeReply.replace(/\n/g, '<br>')}</div>
                        </div>
                    </div>
                </details>
            `;
            addMsg('bot', botHtml);
        } catch (e) {
            removeOrchestrationProgress(progressId);
            addMsg('bot', `<span style="color:var(--error)">⚠️ Danışman Yanıt Hatası: ${e.message}</span>`);
        }
    }

    // Çoklu Ajan Dağıtım & Sentez Motoru
    async function orchestrateMultiAgentConsultant(prog, question, stepCallback) {
        const legalModel   = pickModel('LEGAL_AGENT');
        const financeModel = pickModel('FINANCE_AGENT');
        const orchModel    = pickModel('ORCHESTRATOR');

        stepCallback('legal');

        // Ajan 1: Mevzuat & Şartlar Uzmanı
        const legalPrompt = `Sen TÜBİTAK Mevzuat & Uygunluk Uzmanısın.
Program: ${prog.code} - ${prog.name}
Özel Koşullar: ${prog.specialCondition}
Genel Veriler: ${PROGRAM_OZETI}

Kullanıcı Sorusu: "${question}"

GÖREV: Yalnızca kuruluş niteliği, TRL seviyesi, konsorsiyum / ortaklık zorunluluğu ve başvuru takvimi açısından 2-3 maddelik kısa bir mevzuat değerlendirmesi yaz.`;

        // Ajan 2: Finans, Bütçe & Destek Oranı Uzmanı
        const financePrompt = `Sen TÜBİTAK Bütçe & Mali Destek Denetçisisin.
Program: ${prog.code} - ${prog.name}
Destek Tavanı: ${prog.budgetLimit} | Oranı: ${prog.supportRate}
Özel Not: ${prog.specialCondition}
Genel Veriler: ${PROGRAM_OZETI}

Kullanıcı Sorusu: "${question}"

GÖREV: Yalnızca hibe desteği oranı, maksimum bütçe, mali uygunluk ve varsa harcama avantajları açısından 2-3 maddelik kısa bir finansal değerlendirme yaz.`;

        // İki uzmanı paralel çağır
        const [legalReply, financeReply] = await Promise.all([
            callUnifiedLLM([{ role: 'user', content: legalPrompt }], 'LEGAL_AGENT'),
            callUnifiedLLM([{ role: 'user', content: financePrompt }], 'FINANCE_AGENT')
        ]);

        stepCallback('synth');

        // Ajan 3: Baş Danışman Orkestratörü (Sentez)
        const orchPrompt = `Sen TÜBİTAK Baş Danışmanısın. İki alt uzmanın analizlerini inceleyip kullanıcıya hitaben net, kurumsal ve yönlendirici nihai uzman tavsiyesi sun.

Program: ${prog.code} - ${prog.name}
Kullanıcı Sorusu: "${question}"

Mevzuat Uzmanı Raporu:
${legalReply}

Finans Uzmanı Raporu:
${financeReply}

KURALLAR:
- Kullanıcıya doğrudan ve net bir dille yanıt ver.
- Mevzuat ve finans uzmanlarının tespitlerini sentezle.
- Varsa dikkat edilmesi gereken riskleri ve tavsiyeleri belirt.
- Başvuru kabul garantisi verme.`;

        const orchestratorReply = await callUnifiedLLM([{ role: 'user', content: orchPrompt }], 'ORCHESTRATOR');

        return {
            legalModel,
            financeModel,
            orchModel,
            legalReply,
            financeReply,
            orchestratorReply
        };
    }

    btnSendChat.addEventListener('click', sendChat);
    chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendChat(); });
    btnAnalyze.addEventListener('click', runAnalysis);
    btnShowRest.addEventListener('click', () => {
        restList.classList.toggle('hidden');
        btnShowRest.textContent = restList.classList.contains('hidden') ? `${document.querySelectorAll('#rest-list .program-card').length} diğer uygun programı göster ↓` : 'Gizle ↑';
    });

    // 10. Rapor Dışa Aktarma: Kopyalama ve Yazdırma (PDF)
    btnCopyReport.addEventListener('click', () => {
        if (!lastAnalysis) return;
        const md = generateMarkdownSummary(lastAnalysis);
        navigator.clipboard.writeText(md).then(() => {
            showToast('📋 Özet rapor başarıyla panoya kopyalandı!');
        }).catch(() => {
            showToast('Panoya kopyalama başarısız oldu.');
        });
    });

    btnPrintReport.addEventListener('click', () => {
        window.print();
    });

    function generateMarkdownSummary(data) {
        const { top5, rest, ineligible } = data;
        let lines = [];
        lines.push('# F8 TÜBİTAK Fon Uyumluluk ve Karar Destek Raporu');
        lines.push(`Oluşturulma Tarihi: ${new Date().toLocaleDateString('tr-TR')}\n`);
        lines.push('## Özet İstatistikler');
        lines.push(`- **Öne Çıkan Uygun Programlar:** ${top5.length} adet`);
        lines.push(`- **Diğer Uygun Programlar:** ${rest.length} adet`);
        lines.push(`- **Ön Elemeye Takılanlar:** ${ineligible.length} adet\n`);

        lines.push('## En Uygun Programlar (İlk 5)');
        top5.forEach((p, idx) => {
            lines.push(`### ${idx + 1}. [${p.code}] ${p.name} — Uyum Skoru: %${p.matchScore}`);
            lines.push(`- **Destek Oranı:** ${p.supportRate} | **Bütçe Sınırı:** ${p.budgetLimit} | **Son Başvuru:** ${p.deadlineRaw}`);
            if (p.estimatedGrant) {
                lines.push(`- **Finansal Analiz:** Tahmini Hibe: ${p.estimatedGrant.toLocaleString('tr-TR')} TL | Tahmini Özkaynak: ${p.estimatedEquity.toLocaleString('tr-TR')} TL`);
            }
            if (p.matchLogs?.length) {
                lines.push(`- **Güçlü Yönler:** ${p.matchLogs.map(m => m.text).join('; ')}`);
            }
            if (p.penaltyLogs?.length) {
                lines.push(`- **Kesilen Puanlar:** ${p.penaltyLogs.map(m => m.text).join('; ')}`);
            }
            if (p.gapLogs?.length) {
                lines.push(`- **%100 İçin Eylem Tavsiyesi:** ${p.gapLogs.map(m => m.text).join('; ')}`);
            }
            lines.push(`- **Resmi Bilgi:** ${p.officialUrl}\n`);
        });

        if (ineligible.length > 0) {
            lines.push('## Başvuru Koşulunu Karşılamayan Bazı Programlar');
            ineligible.slice(0, 5).forEach(p => {
                lines.push(`- **${p.code} ${p.name}:** ${p.eliminationReason}`);
            });
            lines.push('');
        }

        lines.push('---\n*Bu rapor F8 Deterministik Karar Motoru ve Yerel Ollama AI Analizi ile üretilmiştir.*');
        return lines.join('\n');
    }

    function addMsg(role, html) {
        const div = document.createElement('div');
        div.className = `chat-message ${role}`;
        div.innerHTML = `<div class="bubble">${html}</div>`;
        chatHistory.appendChild(div);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function addOrchestrationProgress() {
        const id = 'orch-' + Date.now();
        const div = document.createElement('div');
        div.className = 'chat-message bot';
        div.id = id;
        div.innerHTML = `
            <div class="bubble">
                <div class="orch-box">
                    <div class="orch-title">Çoklu AI Orkestrasyonu Çalışıyor...</div>
                    <div class="orch-steps">
                        <div class="orch-step active" id="${id}-step-legal">
                            <span class="orch-dot"></span> 🏛️ Mevzuat & Şartlar İnceleniyor...
                        </div>
                        <div class="orch-step" id="${id}-step-finance">
                            <span class="orch-dot"></span> 💰 Finans & Bütçe Değerlendiriliyor...
                        </div>
                        <div class="orch-step" id="${id}-step-synth">
                            <span class="orch-dot"></span> 🎯 Baş Danışman Sentezliyor...
                        </div>
                    </div>
                </div>
            </div>`;
        chatHistory.appendChild(div);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return id;
    }

    function updateOrchestrationStep(step) {
        const legal = document.querySelector('.orch-step[id$="-step-legal"]');
        const fin   = document.querySelector('.orch-step[id$="-step-finance"]');
        const synth = document.querySelector('.orch-step[id$="-step-synth"]');
        if (step === 'legal') {
            if (legal) legal.classList.add('active');
            if (fin) fin.classList.add('active');
        } else if (step === 'synth') {
            if (legal) { legal.classList.remove('active'); legal.classList.add('done'); }
            if (fin) { fin.classList.remove('active'); fin.classList.add('done'); }
            if (synth) synth.classList.add('active');
        }
    }

    function removeOrchestrationProgress(id) {
        document.getElementById(id)?.remove();
    }
});
