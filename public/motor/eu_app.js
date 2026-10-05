// ─── F8 | AB Fonları (Horizon Europe / EU Programmes) Karar Destek Sistemi — eu_app.js ───
// Yerel Ollama / Bulut Entegrasyonu & Kesin Doğruluklu AB Karar Motoru

const OLLAMA_HOST = window.ENV?.OLLAMA_HOST || 'http://localhost:11434';
const GROQ_BASE   = 'https://api.groq.com/openai/v1/chat/completions';

let availableModels = [];
let activeBackend   = 'none';
let lastEuAnalysis  = null;

// Hazır AB Senaryoları (Gerçek Çağrılarla Uyumlu)
const PRESET_EU_STORIES = {
    eu_cyber: "Türkiye'de yerleşik 4 yıllık bir derin teknoloji ve siber güvenlik KOBİ'siyiz. Yapay zeka destekli siber tehdit istihbaratı ve KOBİ'ler için otomatik olay müdahale yazılımı geliştiriyoruz. Uluslararası Avrupa ortaklı Ar-Ge ve pazar odaklı inovasyon destekleri (Eurostars / Eureka Kümeleri) arıyoruz. Bütçe ihtiyacımız yaklaşık 600.000 EUR.",
    eu_quantum: "Türkiye'de yerleşik kuantum bilişim ve fotonik donanım geliştiren bir derin teknoloji şirketiyiz. Yeni nesil QKD kuantum anahtar dağıtımı ve nötr atom platformları üzerinde çalışıyoruz (TRL 4). EuroHPC Ortak Girişimi RIA çağrılarına Avrupa'dan ortaklarla konsorsiyum kurarak başvurmak istiyoruz.",
    eu_woman: "Türkiye'de biyoteknoloji alanında yenilikçi bir sağlık girişimi kurmuş kadın girişimciyim. Şirketimin kurucu ortağı ve CEO'suyum. Avrupa Yenilik Konseyi (EIC) Kadın İnovatörler Ödülü (Women Innovators Prize) çağrısına bireysel olarak başvurmak istiyorum.",
    eu_widening: "Türkiye'de bir üniversite ve teknopark bünyesinde bölgesel inovasyon ekosistemini koordine ediyoruz. Sanayi ortaklarımız, yerel yönetim ve akademi ile 4'lü sarmal oluşturduk. Horizon Europe Genişleme (Widening) Excellence Hubs çağrısına konsorsiyum koordinatörü olarak 3.000.000 EUR bütçeyle başvurmayı hedefliyoruz."
};

const EU_STORY_PROMPT = `Sen bir AB Fonları ve Horizon Europe uzmanısın. Sana verilen proje özetini analiz edip aşağıdaki JSON formatında profil çıkar.
SADECE geçerli bir JSON döndür, başka hiçbir metin veya markdown formatı yazma.

CIKTI FORMATI:
{
  "q_country_status": "tr | eu | third | individual_woman",
  "q_company_type": "sme | large | university | rto | public | ngo | media | ncc",
  "q_partnership": "consortium_min3 | single | widening_2 | partner_only",
  "q_action_type": "all | ria | ia | csa | sme_support | erc | prize",
  "q_budget": "500000 | 2000000 | 5000000 | 10000000 | unsure",
  "themes": ["quantum", "cyber_ai", "climate_energy", "health", "agri_food", "widening", "creative", "social", "security"],
  "q_special_woman": true,
  "q_special_phd": false,
  "q_special_coordinator": false,
  "summary": "2 cümle Türkçe analiz özeti"
}`;

// Excel/LLM kaynaklı metinler innerHTML'e girmeden önce kaçışlanır
function escapeHtml(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Yalnız http(s) bağlantılarına izin ver (javascript: vb. engellenir)
function safeUrl(u) {
    return /^https?:\/\//i.test(String(u || '')) ? escapeHtml(u) : '#';
}

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
            return { type: 'ollama', models: availableModels, primaryModel: availableModels[0] || 'qwen3:4b' };
        }
    } catch (_) {}

    activeBackend = 'none';
    return { type: 'none' };
}

async function callUnifiedLLM(messages) {
    if (activeBackend === 'groq') {
        const key = window.ENV?.GROQ_API_KEY?.trim();
        const model = window.ENV?.GROQ_MODEL || 'llama-3.3-70b-versatile';
        const resp = await fetch(GROQ_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                model,
                messages,
                temperature: 0.2,
                max_tokens: 2048
            })
        });
        if (!resp.ok) {
            let msg = `Groq API Hatası (${resp.status})`;
            try {
                const errJson = await resp.json();
                if (errJson.error?.message) msg = `Groq: ${errJson.error.message}`;
            } catch (_) {}
            throw new Error(msg);
        }
        const data = await resp.json();
        return cleanLlmOutput(data.choices?.[0]?.message?.content || '');
    } else if (activeBackend === 'ollama') {
        const model = window.ENV?.MODELS?.ORCHESTRATOR || availableModels[0] || 'qwen3:4b';
        const resp = await fetch(`${OLLAMA_HOST}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model,
                messages,
                stream: false,
                options: { temperature: 0.2 }
            })
        });
        if (!resp.ok) throw new Error(`Ollama yanıt hatası: ${resp.statusText}`);
        const data = await resp.json();
        return cleanLlmOutput(data.message?.content || '');
    } else {
        throw new Error('Yapay Zeka kapalı. Lütfen env.js içine Groq API anahtarınızı girin veya terminalde "ollama serve" komutunu çalıştırın.');
    }
}

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
    const matchesList      = document.getElementById('matches-list');
    const restSection      = document.getElementById('rest-section');
    const restList         = document.getElementById('rest-list');
    const btnShowRest      = document.getElementById('btn-show-rest');
    const ineligibleList   = document.getElementById('ineligible-list');
    const summaryStats     = document.getElementById('summary-stats');
    const reportStatus     = document.getElementById('report-status');
    const exportButtons    = document.getElementById('export-buttons');
    const btnCopyReport    = document.getElementById('btn-copy-report');
    const btnPrintReport   = document.getElementById('btnPrintReport') || document.getElementById('btn-print-report');
    const chatModal        = document.getElementById('llm-chat-modal');
    const closeChat        = document.getElementById('close-chat');
    const chatTitle        = document.getElementById('chat-title');
    const chatSubtitle     = document.getElementById('chat-subtitle');
    const chatHistory      = document.getElementById('chat-history');
    const chatInput        = document.getElementById('chat-input');
    const btnSendChat      = document.getElementById('btn-send-chat');

    let currentChatCall = null;
    let euData = [];

    // 1. LLM Backend Kontrolü
    await detectLLMBackend();

    // 2. Veri Tabanını Yükle
    try {
        const res = await fetch('./data/eu_data.json?v=' + Date.now());
        euData = await res.json();
        loadingState.classList.add('hidden');
        inputContainer.classList.remove('hidden');
    } catch (e) {
        const isFile = window.location.protocol === 'file:';
        loadingState.innerHTML = isFile
            ? '<p style="color:var(--error);max-width:320px;text-align:center;line-height:1.5;"><strong>Yerel Sunucu Gerekli (CORS)</strong><br><small style="color:var(--text-muted);">Tarayıcı doğrudan dosya açılışında (file://) JSON verisini engelleyebilir.<br>Lütfen terminalden:<br><code style="background:#222;padding:2px 6px;border-radius:4px;color:#00ffcc;">python -m http.server 8000</code><br>veya <code style="background:#222;padding:2px 6px;border-radius:4px;color:#00ffcc;">npx serve web_otomasyon</code><br>ile başlatıp localhost üzerinden açın.</small></p>'
            : `<p style="color:var(--error);max-width:280px;text-align:center">AB fon veri seti yüklenemedi: ${e.message}</p>`;
        return;
    }

    // 3. Option Kartları Etkileşimi
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

    // 4. Hazır Senaryo Butonları
    document.querySelectorAll('.btn-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.preset;
            const story = PRESET_EU_STORIES[key];
            if (story) {
                document.getElementById('llm-story-input').value = story;
                btnLlmExtract.click();
            }
        });
    });

    // 5. Serbest Metin Analizi (LLM)
    if (btnLlmExtract) {
        btnLlmExtract.addEventListener('click', async () => {
            const text = document.getElementById('llm-story-input').value.trim();
            if (text.length < 20) {
                alert('Lütfen projenizi ve hedeflerinizi en az birkaç cümleyle açıklayın.');
                return;
            }

            llmBtnText.classList.add('hidden');
            llmBtnLoading.classList.remove('hidden');
            llmParsedPreview.classList.add('hidden');

            try {
                const raw = await callUnifiedLLM([
                    { role: 'system', content: EU_STORY_PROMPT },
                    { role: 'user', content: text }
                ]);

                const jsonMatch = raw.match(/\{[\s\S]*\}/);
                if (!jsonMatch) throw new Error('Geçerli bir JSON profili üretilemedi.');
                const parsed = JSON.parse(jsonMatch[0]);

                applyParsedProfile(parsed);
                llmParsedPreview.innerHTML = `<strong>AI Analiz Özeti:</strong> ${escapeHtml(parsed.summary || 'Proje parametreleri form kriterlerine aktarıldı.')}`;
                llmParsedPreview.classList.remove('hidden');

                setTimeout(runAnalysis, 400);
            } catch (e) {
                llmParsedPreview.innerHTML = `<span style="color:var(--error)">Hata: ${escapeHtml(e.message)}</span>`;
                llmParsedPreview.classList.remove('hidden');
            } finally {
                llmBtnText.classList.remove('hidden');
                llmBtnLoading.classList.add('hidden');
            }
        });
    }

    function applyParsedProfile(p) {
        ['q_country_status', 'q_company_type', 'q_partnership', 'q_action_type', 'q_budget'].forEach(name => {
            const val = p[name];
            if (!val) return;
            const group = document.getElementById(`${name}_group`);
            const hidden = profileForm.querySelector(`input[name="${name}"]`);
            // LLM yalnız formda var olan bir seçeneği seçebilir; geçersiz değer formu bozmaz
            const cards = group ? [...group.querySelectorAll('.option-card')] : [];
            if (!cards.some(c => c.dataset.value === String(val))) return;
            cards.forEach(c => c.classList.toggle('active', c.dataset.value === String(val)));
            if (hidden) hidden.value = String(val);
        });

        if (Array.isArray(p.themes)) {
            ['quantum', 'cyber_ai', 'climate_energy', 'health', 'agri_food', 'widening', 'creative', 'social', 'security'].forEach(theme => {
                const cb = profileForm.querySelector(`input[name="q_theme_${theme}"]`);
                if (cb) cb.checked = p.themes.includes(theme);
            });
        }

        const cbWoman = profileForm.querySelector('input[name="q_special_woman"]');
        if (cbWoman) cbWoman.checked = Boolean(p.q_special_woman);

        const cbPhd = profileForm.querySelector('input[name="q_special_phd"]');
        if (cbPhd) cbPhd.checked = Boolean(p.q_special_phd);

        const cbCoord = profileForm.querySelector('input[name="q_special_coordinator"]');
        if (cbCoord) cbCoord.checked = Boolean(p.q_special_coordinator);
    }

    // 6. Eşleştirme Motoru
    btnAnalyze.addEventListener('click', runAnalysis);

    function runAnalysis() {
        const formData = new FormData(profileForm);
        const profile = Object.fromEntries(formData.entries());

        const selectedThemes = [];
        profileForm.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
            if (cb.name.startsWith('q_theme_')) {
                selectedThemes.push(cb.value);
            }
        });
        profile.themes = selectedThemes;

        profile.special_woman = profileForm.querySelector('input[name="q_special_woman"]')?.checked || false;
        profile.special_phd = profileForm.querySelector('input[name="q_special_phd"]')?.checked || false;
        profile.special_coordinator = profileForm.querySelector('input[name="q_special_coordinator"]')?.checked || false;

        reportStatus.className = 'badge badge-info';
        reportStatus.textContent = 'Analiz Ediliyor...';
        emptyReport.classList.add('hidden');
        analysisReport.classList.add('hidden');

        setTimeout(() => {
            const { eligible, ineligible } = evaluateEuCalls(profile, euData);
            lastEuAnalysis = { profile, eligible, ineligible };

            renderResults(eligible, ineligible);
            reportStatus.className = 'badge badge-success';
            reportStatus.textContent = `${eligible.length} uyumlu · ${ineligible.length} uyumsuz`;
            exportButtons.classList.remove('hidden');
            analysisReport.classList.remove('hidden');
            analysisReport.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
    }

    // ── ESLEŞTİRME MOTORU: web_otomasyon/eu_engine.js (testlerle ortak) ──
    function evaluateEuCalls(profile, data) {
        return window.EuEngine.evaluateEuCalls(profile, data, { today: new Date() });
    }

    function scoreStyle(s) {
        if (s >= 80) return { fg: 'var(--success)', bg: 'var(--success-dim)', border: '3px solid var(--success)' };
        if (s >= 55) return { fg: 'var(--warning)', bg: 'var(--warning-dim)', border: '3px solid var(--warning)' };
        return { fg: 'var(--error)', bg: 'var(--error-dim)', border: '3px solid var(--error)' };
    }

    function buildDateBadge(raw) {
        if (!raw || raw === '-' || raw === 'null') return `<span class="badge badge-pending">Tarih Belirtilmedi</span>`;
        const diff = Math.ceil((new Date(raw) - new Date()) / 86400000);
        const safe = escapeHtml(raw);
        if (isNaN(diff)) return `<span class="badge badge-info">${safe}</span>`;
        if (diff < 0) return `<span class="badge badge-danger">Süresi Doldu: ${safe}</span>`;
        if (diff <= 15) return `<span class="badge badge-warning">Son ${diff} gün (${safe})</span>`;
        return `<span class="badge badge-success">Son Başvuru: ${safe}</span>`;
    }

    // 6.1. Diğer Uygun Programlar Göster/Gizle Butonu
    if (btnShowRest) {
        btnShowRest.addEventListener('click', () => {
            restList.classList.toggle('hidden');
            const isHidden = restList.classList.contains('hidden');
            const count = lastEuAnalysis?.eligible ? Math.max(0, lastEuAnalysis.eligible.length - 5) : 0;
            btnShowRest.textContent = isHidden ? `${count} diğer uygun çağrıyı göster ↓` : 'Diğer çağrıları gizle ↑';
        });
    }

    function renderResults(eligible, ineligible) {
        const top5 = eligible.slice(0, 5);
        const rest = eligible.slice(5);

        summaryStats.innerHTML = `
            <div class="summary-stat"><div class="stat-value text-success">${top5.length}</div><div class="stat-label">Ana Öneri</div></div>
            <div class="summary-stat"><div class="stat-value text-warning">${rest.length}</div><div class="stat-label">Diğer Uygun</div></div>
            <div class="summary-stat"><div class="stat-value text-error">${ineligible.filter(e => !e.expired).length}</div><div class="stat-label">Ön Elemeye Takılan</div></div>
            <div class="summary-stat"><div class="stat-value">${ineligible.filter(e => e.expired).length}</div><div class="stat-label">Süresi Geçmiş</div></div>
        `;

        matchesList.innerHTML = '';
        restList.innerHTML = '';
        ineligibleList.innerHTML = '';

        top5.forEach((e, idx) => matchesList.appendChild(buildEuCard(e, idx + 1)));

        if (rest.length > 0) {
            restSection.classList.remove('hidden');
            restList.classList.add('hidden');
            btnShowRest.textContent = `${rest.length} diğer uygun çağrıyı göster ↓`;
            rest.forEach(e => restList.appendChild(buildEuCard(e, null)));
        } else {
            restSection.classList.add('hidden');
        }

        if (ineligible.length === 0) {
            ineligibleList.innerHTML = '<p class="section-hint">Ön elemede elenen çağrı bulunamadı.</p>';
        } else {
            const initialCount = 10;
            const firstBatch = ineligible.slice(0, initialCount);
            const remaining = ineligible.slice(initialCount);
            firstBatch.forEach(e => ineligibleList.appendChild(buildEuIneligibleCard(e)));

            if (remaining.length > 0) {
                const moreWrap = document.createElement('div');
                moreWrap.style.textAlign = 'center';
                moreWrap.style.marginTop = '12px';
                const moreBtn = document.createElement('button');
                moreBtn.className = 'btn btn-secondary';
                moreBtn.style.width = '100%';
                moreBtn.textContent = `Diğer ${remaining.length} elenen çağrıyı göster (${ineligible.length} toplam) ↓`;
                moreBtn.onclick = () => {
                    remaining.forEach(e => ineligibleList.appendChild(buildEuIneligibleCard(e)));
                    moreWrap.remove();
                };
                moreWrap.appendChild(moreBtn);
                ineligibleList.appendChild(moreWrap);
            }
        }

        // Danışman Butonları
        document.querySelectorAll('.btn-chat-eu').forEach(btn => {
            btn.addEventListener('click', e => {
                const callId = e.currentTarget.dataset.callId;
                const found = euData.find(d => d['Call ID'] === callId || d['Topic ID'] === callId || d['Opportunity Name'] === callId);
                if (found) openEuChat(found);
            });
        });
    }

    const RESULT_LABEL = { match: 'Uyumlu', partial: 'Kısmi', unknown: 'Bilinmiyor', no_match: 'Uyumsuz' };

    function buildEuCard(e, rank) {
        const { fg, bg, border } = scoreStyle(e.score);
        const res = e.item;
        const code = escapeHtml(res['Topic ID'] || res['Call ID'] || 'AB Çağrısı');
        const name = escapeHtml(res['Opportunity Name'] || 'İsimsiz Çağrı');
        const fundingText = escapeHtml(res['Funding'] ? res['Funding'].split('|')[0].trim() : 'Bütçe belirtilmedi');
        const fundingRateText = escapeHtml(res['funding_rate_pct'] ? `%${res['funding_rate_pct']}` : (res['Funding Rate'] || 'Belirtilmedi'));
        const reason = escapeHtml(res.turkey_reason);

        let turkeyBadge = '';
        if (res.turkey_status === 'ELIGIBLE') {
            turkeyBadge = `<span class="badge badge-success" title="${reason}">Türkiye: Uygun</span>`;
        } else if (res.turkey_status === 'CONDITIONAL') {
            turkeyBadge = `<span class="badge badge-warning" title="${reason}">Türkiye: Kontrol Et</span>`;
        } else {
            turkeyBadge = `<span class="badge badge-danger" title="${reason}">Türkiye Başvuramaz</span>`;
        }

        const cascadeBadge = res.record_type === 'Kaskad'
            ? `<span class="badge badge-info" style="background:rgba(59,130,246,0.15);color:#3b82f6;border:1px solid #3b82f6;">Kaskad / FSTP Hibe</span>`
            : '';
        const confClass = e.confidenceLabel === 'Yüksek' ? 'badge-success' : (e.confidenceLabel === 'Orta' ? 'badge-warning' : 'badge-danger');

        const card = document.createElement('div');
        card.className = 'program-card';
        card.style.borderLeft = border;

        let html = `
            <div class="card-top">
                <div class="card-title">
                    <h4>${rank ? `<span style="color:${fg};margin-right:.35rem">#${rank}</span>` : ''}${code} — ${name}</h4>
                    <div class="card-meta">
                        ${buildDateBadge(res['Deadline'])}
                        ${turkeyBadge}
                        ${cascadeBadge}
                        <span class="badge ${confClass}" title="Bilinen soru oranı: %${Math.round(e.confidence * 100)}">Veri güveni: ${e.confidenceLabel}</span>
                        <span class="badge badge-info">Eylem: ${escapeHtml(res['Type of Action'] || 'Action Grant')}</span>
                        <span class="badge badge-success">Program: ${escapeHtml(res['Programme'] ? res['Programme'].split('[')[0].trim() : 'Horizon Europe')}</span>
                    </div>
                </div>
                <div class="score-box" style="background:${bg};color:${fg}">
                    <div class="score-num">${e.score}</div>
                    <div class="score-lbl">${escapeHtml(e.fitLabel)}</div>
                    ${e.bonus ? `<div class="score-perfect" title="Özel şart eşleşmesi: ${escapeHtml(e.bonusTags.join(', '))}">+${e.bonus} bonus</div>` : ''}
                </div>
            </div>
            <div class="score-bar"><div class="score-bar-fill" style="width:${e.score}%;background:${fg}"></div></div>`;

        html += `
        <div class="financial-box">
            <div class="financial-item">
                <span class="fin-label">Destek Oranı:</span>
                <span class="fin-val text-success"><b>${fundingRateText}</b></span>
            </div>
            <div class="financial-item">
                <span class="fin-label">Proje Hibe / Bütçe:</span>
                <span class="fin-val"><b>${fundingText}</b></span>
            </div>
            <div class="financial-item">
                <span class="fin-label">Sağlayıcı:</span>
                <span class="fin-val"><b>${escapeHtml(res['Provider'] || 'European Commission')}</b></span>
            </div>
        </div>`;

        // Soru soru renk kodlu sonuç (uyumlu / kısmi / bilinmiyor / uyumsuz) ve gerekçeler
        html += `<div class="log-label ok">Soru Bazında Değerlendirme</div><ul class="log-list ok">`;
        e.details.forEach(d => {
            html += `<li class="res-${escapeHtml(d.result)}" title="${RESULT_LABEL[d.result] || ''}"><b>${escapeHtml(d.label)}:</b> ${escapeHtml(d.note)}</li>`;
        });
        html += '</ul>';

        if (e.warnings?.length) {
            html += `<div class="log-label bad">Dikkat Edilmesi Gerekenler</div><ul class="log-list bad">`;
            e.warnings.forEach(w => html += `<li>${escapeHtml(w)}</li>`);
            html += '</ul>';
        }

        if (res['Summary']) {
            html += `<div class="log-label ok">Çağrı Amacı ve Kapsamı</div><ul class="log-list ok"><li>${escapeHtml(res['Summary'])}</li></ul>`;
        }

        if (res['Consortium Requirement']) {
            html += `<div class="log-label warn">Konsorsiyum ve Uygunluk Kriteri</div><ul class="log-list warn"><li>${escapeHtml(res['Consortium Requirement'])}</li></ul>`;
        }

        html += `<div class="card-actions">
            <button type="button" class="btn-chat-eu" data-call-id="${code}">
                <svg class="btn-chat-eu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5zM18.5 15l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z"/></svg>
                <span>AI Danışmanına Sor</span>
            </button>
            <a href="${safeUrl(res['Official Source'])}" target="_blank" rel="noopener" class="link-official">Resmi AB Portal Sayfası ↗</a>
            ${res['Call Document'] ? `<a href="${safeUrl(res['Call Document'])}" target="_blank" rel="noopener" class="link-official" style="background:var(--card-bg);border:1px solid var(--border-color);margin-left:6px;">Çağrı Dokümanı (PDF) ↗</a>` : ''}
            ${res['Application System'] ? `<a href="${safeUrl(res['Application System'])}" target="_blank" rel="noopener" class="link-official" style="background:var(--card-bg);border:1px solid var(--border-color);margin-left:6px;">Başvuru Portalı ↗</a>` : ''}
        </div>`;

        card.innerHTML = html;
        return card;
    }

    function buildEuIneligibleCard(e) {
        const res = e.item;
        const code = escapeHtml(res['Topic ID'] || res['Call ID'] || 'AB Çağrısı');
        const name = escapeHtml(res['Opportunity Name'] || 'İsimsiz Çağrı');
        const card = document.createElement('div');
        card.className = 'ineligible-card';
        card.innerHTML = `
            <div class="ineligible-header">
                <div>
                    <span class="ineligible-code">${code}</span>
                    <span class="ineligible-name">${name}</span>
                </div>
                <span class="badge ${e.expired ? 'badge-pending' : 'badge-danger'}">${e.expired ? 'Süresi Geçti' : 'Uygun Değil'}</span>
            </div>
            <div class="ineligible-reason">
                <strong>Eleme Gerekçesi:</strong> ${escapeHtml(e.reason)}
            </div>
            <div style="margin-top:6px;font-size:0.78rem;color:var(--text-muted)">
                Program: ${escapeHtml(res['Programme'] || '-')} · Eylem: ${escapeHtml(res['Type of Action'] || '-')}
            </div>
        `;
        return card;
    }

    // 7. Rapor Kopyalama ve Çıktı
    if (btnCopyReport) {
        btnCopyReport.addEventListener('click', () => {
            if (!lastEuAnalysis?.eligible?.length) return;
            const lines = ['# F8 | AB Fonları Eşleştirme Raporu\n'];
            lastEuAnalysis.eligible.forEach((e, i) => {
                lines.push(`## ${i + 1}. ${e.item['Topic ID'] || e.item['Call ID']} — ${e.item['Opportunity Name']}`);
                lines.push(`- **Uyum Skoru:** ${e.score}/100 (${e.fitLabel})${e.bonus ? ` +${e.bonus} bonus` : ''}`);
                lines.push(`- **Veri Güveni:** ${e.confidenceLabel} (%${Math.round(e.confidence * 100)})`);
                if (e.unknownFields.length) lines.push(`- **Eksik Bilgi:** ${e.unknownFields.join(', ')}`);
                lines.push(`- **Program:** ${e.item['Programme']}`);
                lines.push(`- **Türkiye Statüsü:** ${e.item.turkey_status} (${e.item.turkey_reason})`);
                lines.push(`- **Hibe Oranı:** %${e.item.funding_rate_pct || '-'}`);
                lines.push(`- **Son Başvuru:** ${e.item['Deadline'] || '-'}`);
                lines.push('');
            });
            navigator.clipboard.writeText(lines.join('\n'))
                .then(() => showToast('Rapor panoya kopyalandı!'))
                .catch(() => alert('Panoya kopyalama başarısız oldu.'));
        });
    }

    if (btnPrintReport) {
        btnPrintReport.addEventListener('click', () => window.print());
    }

    // 8. AB Danışmanı Chat Modalı
    function openEuChat(call) {
        currentChatCall = call;
        chatTitle.textContent = `${call['Topic ID'] || call['Call ID'] || 'AB Çağrısı'} — Danışman`;
        chatSubtitle.textContent = call['Opportunity Name']?.substring(0, 60) + '...';
        chatHistory.innerHTML = '';
        chatModal.classList.remove('hidden');

        addMsg('bot', `
            <strong>${escapeHtml(call['Opportunity Name'])}</strong> çağrısını inceliyorsunuz.<br><br>
            • <strong>Program:</strong> ${escapeHtml(call['Programme'] || 'Horizon Europe')}<br>
            • <strong>Eylem Türü:</strong> ${escapeHtml(call['Type of Action'] || '-')}<br>
            • <strong>Türkiye Durumu:</strong> ${escapeHtml(call.turkey_reason || 'Çağrı dokümanından kontrol edin.')}<br>
            • <strong>Destek Oranı:</strong> ${escapeHtml(call.funding_rate_pct ? `%${call.funding_rate_pct}` : (call['Funding Rate'] || 'Çağrı dokümanında belirlenir'))}<br>
            • <strong>Son Başvuru:</strong> ${escapeHtml(call['Deadline'] || 'Belirtilmedi')}<br><br>
            Aşağıdaki hazır hızlı sorulardan birini seçebilir veya serbestçe soru sorabilirsiniz.
        `);
    }

    closeChat.addEventListener('click', () => chatModal.classList.add('hidden'));
    chatModal.addEventListener('click', e => { if (e.target === chatModal) chatModal.classList.add('hidden'); });

    document.querySelectorAll('.btn-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.dataset.q;
            sendChat();
        });
    });

    async function sendChat() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addMsg('user', escapeHtml(msg));
        chatInput.value = '';

        const call = currentChatCall;
        const typingId = addTypingMsg();

        try {
            const systemPrompt = `Sen Avrupa Birliği (Horizon Europe, Eureka & Uluslararası Destekler) Hibe Baş Danışmanısın.

TÜRKİYE MEVZUAT BİLGİSİ (KESİN VE TAVİZSİZ HUKUKİ KURALLAR):
1. Ufuk Avrupa (Horizon Europe 2021-2027): Türkiye resmi ASOSİYE ÜLKEDİR (Associated Country). Türkiye'deki KOBİ'ler, üniversiteler, araştırma merkezleri ve sanayi kuruluşları genel RIA, IA, CSA, ERC, MSCA ve EuroHPC JU çağrılarında AB Üye Devletleriyle (Member State) tamamen EŞİT HAKLARLA %100 veya %70 oranında doğrudan fonlanır. ASLA "Türkiye AB üyesi olmadığı için Ufuk Avrupa'dan yararlanamaz" DEME!
2. Eurostars & Eureka Programları (TÜBİTAK 1709 / 1509 / 1719): Türkiye tam Eureka üyesidir. Türk KOBİ'lerine TÜBİTAK tarafından %75 hibe desteği doğrudan sağlanır.
3. KESİNTİSİZ HARİÇ TUTULAN VE GÜVENLİK KISITLAMALI ÇAĞRILAR:
   - Dijital Avrupa Programı (DEP) Siber Güvenlik Çağrıları (DIGITAL-ECCC): AB 2021/694 sayılı Tüzüğün 12(5) maddesi uyarınca güvenlik kısıtlaması nedeniyle YALNIZCA AB Üye Devletlerine (EU Member States) açıktır; Türkiye dahil hiçbir asosiye veya üçüncü ülke bu çağrılardan hibe alamaz!
   - Creative Europe MEDIA alt programı: Türkiye taraf değildir (yalnızca Kültür alt programına taraftır).
   - İç Güvenlik Fonu (ISF), Euratom, ESF+: Türkiye taraf değildir; Türk kuruluşlar doğrudan başvuramaz.

İNCELENEN ÇAĞRI BİLGİLERİ:
- Çağrı Adı: ${call['Opportunity Name']}
- Topic ID: ${call['Topic ID']}
- Program: ${call['Programme']}
- Sağlayıcı: ${call['Provider'] || 'European Commission'}
- Eylem Türü: ${call['Type of Action']} (Kod: ${call['action_code']})
- Bütçe: ${call['Funding']}
- Hibe Oranı: ${call['funding_rate_pct'] ? '%' + call['funding_rate_pct'] : call['Funding Rate']}
- Türkiye Uygunluğu: ${call['turkey_status']} — ${call['turkey_reason']}
- Hedef Başvuran: ${call['Target Applicants']}
- Konsorsiyum Şartı: ${call['Consortium Requirement']}
- Özel Koşullar: ${call['Special Conditions']}
- Özet: ${call['Summary']}
- Hedefler: ${call['Objective']}

Kullanıcı Sorusu: "${msg}"

DANIŞMAN KURALLARI:
- Verilen çağrı verilerine ve yukarıdaki resmi Türkiye mevzuat kurallarına sadık kalarak doğrudan, net, profesyonel ve Türkçe yanıt ver.
- Türkiye'deki kuruluşların bu çağrıdaki gerçek uygunluğunu açıkça ifade et.`;

            const reply = await callUnifiedLLM([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: msg }
            ]);

            removeTypingMsg(typingId);
            addMsg('bot', escapeHtml(reply).replace(/\n/g, '<br>'));
        } catch (e) {
            removeTypingMsg(typingId);
            addMsg('bot', `<span style="color:var(--error)">Hata: ${escapeHtml(e.message)}</span>`);
        }
    }

    btnSendChat.addEventListener('click', sendChat);
    chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendChat(); });

    function addMsg(role, html) {
        const div = document.createElement('div');
        div.className = `chat-message ${role}`;
        div.innerHTML = `<div class="bubble">${html}</div>`;
        chatHistory.appendChild(div);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function addTypingMsg() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = 'chat-message bot';
        div.id = id;
        div.innerHTML = `<div class="bubble"><div class="loading-dots"><span></span><span></span><span></span></div></div>`;
        chatHistory.appendChild(div);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return id;
    }

    function removeTypingMsg(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
});
