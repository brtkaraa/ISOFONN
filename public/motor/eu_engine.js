// ─── F8 | AB Fonları Eşleştirme Motoru — eu_engine.js ───
// Tarayıcıda (window.EuEngine) ve Node testlerinde (require) AYNI kod çalışır.
// Motor ham Excel verisini görmez; yalnız generate_eu_data.py'nin ürettiği kanonik profili (item.facets) okur.
//
// Her soru için 4 sonuç:  match (tam puan) · partial (yarım puan, bilinen) · unknown (yarım puan, bilinmeyen) · no_match (0)
// Eleyiciler: kapalı/süresi geçmiş çağrı, ülke (kesin "no"), kuruluş türü (kesin uyumsuz), zorunlu özel şart,
//             tek başına başvuru ↔ zorunlu konsorsiyum (güven ≥ 0.8). "Bilinmiyor" hiçbir zaman eletmez.

(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.EuEngine = api;
})(typeof self !== 'undefined' ? self : this, function () {

    const WEIGHTS = {
        location: 25,
        applicant_types: 20,
        consortium: 15,
        action_type: 10,
        themes: 20,
        budget: 10,
    };
    const BONUS_PER_SPECIAL = 5;
    const MIN_CONFIDENCE = 0.5;
    const HARD_CONSORTIUM_CONFIDENCE = 0.8;

    const FACET_LABELS = {
        location: 'Ülke uygunluğu',
        applicant_types: 'Kuruluş türü',
        consortium: 'Konsorsiyum',
        action_type: 'Eylem türü',
        themes: 'Tema',
        budget: 'Bütçe',
    };

    // Soru 6 seçenekleri → [alt, üst] EUR aralığı
    const BUDGET_RANGES = {
        '500000': [0, 500000],
        '2000000': [500000, 2000000],
        '5000000': [2000000, 5000000],
        '10000000': [5000000, Infinity],
    };

    // Sektör / rol niteliğindeki seçenekler hukuken bu tüzel kişi türlerine karşılık gelir
    const TYPE_EQUIVALENTS = {
        media: ['media', 'sme', 'large'],
        ncc: ['ncc', 'public', 'rto'],
    };

    // Soru 3: kullanıcı modeli → çağrı modeli → sonuç
    const CONSORTIUM_COMPAT = {
        consortium_min3: { consortium_min3: 'match', consortium_min2: 'match', optional: 'match', widening_2: 'partial', single: 'no_match' },
        single:          { single: 'match', optional: 'match', consortium_min3: 'no_match', consortium_min2: 'no_match', widening_2: 'no_match' },
        widening_2:      { widening_2: 'match', consortium_min2: 'match', optional: 'match', consortium_min3: 'partial', single: 'no_match' },
        partner_only:    { consortium_min3: 'match', consortium_min2: 'match', widening_2: 'match', optional: 'match', single: 'no_match' },
    };

    const SPECIAL_FROM_PROFILE = {
        special_woman: 'women_founder',
        special_phd: 'erc_consolidator',
        special_coordinator: 'coordinator',
    };

    const fmtEur = n => Number(n).toLocaleString('tr-TR') + ' EUR';

    function isKnown(f) {
        return f && (f.confidence || 0) >= MIN_CONFIDENCE;
    }

    function toISODate(d) {
        if (!d) d = new Date();
        if (typeof d === 'string') return d.slice(0, 10);
        const p = n => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    }

    // ── Soru 1 ──
    function evalLocation(item, profile) {
        const status = profile.q_country_status || 'tr';
        const group = status === 'individual_woman' ? 'tr' : status; // Bireysel kadın girişimci Türkiye'de yerleşik kabul edilir
        const f = item.facets.location[group];
        if (!f || f.status === 'unknown' || !isKnown(f)) return { result: 'unknown', note: f?.evidence || 'Ülke uygunluğu bilinmiyor.' };
        return { result: f.status === 'yes' ? 'match' : 'no_match', note: f.evidence };
    }

    // ── Soru 2 ──
    function evalApplicantTypes(item, profile) {
        const f = item.facets.applicant_types;
        const type = profile.q_company_type || 'sme';
        if (!f || !Array.isArray(f.value) || !f.value.length || !isKnown(f)) {
            return { result: 'unknown', note: f?.evidence || 'Hedef kuruluş türü bilinmiyor.' };
        }
        if (f.value.includes(type)) return { result: 'match', note: f.evidence };
        const eq = (TYPE_EQUIVALENTS[type] || []).find(t => f.value.includes(t));
        if (eq) return { result: 'match', note: `Kuruluşunuz hukuken '${eq}' türünde başvurabilir. ${f.evidence}` };
        if ((f.secondary || []).includes(type)) {
            return { result: 'partial', note: `Kuruluş türünüz ev sahibi olabilir ama tipik başvuran değil. ${f.evidence}` };
        }
        return { result: 'no_match', note: `Çağrının hedef kitlesi: ${f.value.join(', ')}. ${f.evidence}` };
    }

    // ── Soru 3 ──
    function evalConsortium(item, profile) {
        const f = item.facets.consortium;
        const user = profile.q_partnership || 'consortium_min3';
        if (!f || !f.value || !isKnown(f)) return { result: 'unknown', note: f?.evidence || 'Konsorsiyum kuralı bilinmiyor.' };
        const result = (CONSORTIUM_COMPAT[user] || {})[f.value] || 'unknown';
        let note = f.evidence;
        if (user === 'partner_only' && result === 'match' && item.partner_search_open) {
            note += ' Portalda bu konu için ortak arama açık.';
        }
        return { result, note, hard: user === 'single' && result === 'no_match' && f.confidence >= HARD_CONSORTIUM_CONFIDENCE };
    }

    // ── Soru 4 ──
    function evalActionType(item, profile) {
        const user = profile.q_action_type || 'all';
        if (user === 'all') return null;
        const f = item.facets.action_type;
        const call = f && f.value;
        if (!call) return { result: 'unknown', note: 'Eylem türü bilinmiyor.' };
        if (call === user) return { result: 'match', note: `Eylem türü: ${call.toUpperCase()}` };
        if ((user === 'ria' && call === 'ia') || (user === 'ia' && call === 'ria')) {
            return { result: 'partial', note: 'RIA ↔ IA: olgunluk seviyesi (TRL) komşu, birebir değil.' };
        }
        return { result: 'no_match', note: `Çağrının eylem türü: ${call.toUpperCase()}` };
    }

    // ── Soru 5 ──
    function evalThemes(item, profile) {
        const userThemes = profile.themes || [];
        if (!userThemes.length) return null;
        const f = item.facets.themes;
        if (f && f.agnostic) return { result: 'match', note: f.evidence };
        if (!f || !f.value || !f.value.length || !isKnown(f)) return { result: 'unknown', note: f?.evidence || 'Tema bilinmiyor.' };
        const overlap = userThemes.filter(t => f.value.includes(t));
        if (overlap.length) return { result: 'match', note: `Ortak tema: ${overlap.join(', ')}` };
        return { result: 'no_match', note: `Çağrının temaları: ${f.value.join(', ')}` };
    }

    // ── Soru 6 ── (proje başı tutar bir TAVANDIR)
    function evalBudget(item, profile) {
        const raw = profile.q_budget;
        if (!raw || raw === 'unsure') return null;
        const range = BUDGET_RANGES[raw] || (Number.isFinite(+raw) ? [+raw, +raw] : null);
        if (!range) return null;
        const [lo, hi] = range;
        const f = item.facets.budget;
        if (!f || !f.max || !isKnown(f)) return { result: 'unknown', note: f?.evidence || 'Proje başı bütçe bilinmiyor.' };
        const est = f.estimated ? ' (tahmini)' : '';
        if (f.max < lo * 0.75) {
            return { result: 'no_match', note: `Proje başı tavan ${fmtEur(f.max)}${est}, ihtiyacınızın altında.` };
        }
        if (f.min && hi !== Infinity && f.min > hi * 1.25) {
            return { result: 'no_match', note: `Proje başı asgari tutar ${fmtEur(f.min)}, ihtiyacınızın üstünde.` };
        }
        if (hi !== Infinity && f.max > hi * 4) {
            return { result: 'partial', note: `Proje başı ${fmtEur(f.max)}${est}: çağrı çok daha büyük ölçekli projeler bekliyor.` };
        }
        return { result: 'match', note: `Proje başı tavan ${fmtEur(f.max)}${est} ihtiyacınızı karşılıyor.` };
    }

    // ── Soru 7: zorunlu şartlar ──
    function unmetRequirement(item, profile) {
        const reqs = (item.facets.special && item.facets.special.requirements) || [];
        const isWoman = profile.special_woman || profile.q_country_status === 'individual_woman';
        const type = profile.q_company_type || 'sme';
        for (const r of reqs) {
            if (r.id === 'women_founder' && !isWoman) return r;
            if (r.id === 'researcher_pi' && !profile.special_phd && type !== 'university' && type !== 'rto') return r;
        }
        return null;
    }

    function confidenceLabel(c) {
        if (c >= 0.8) return 'Yüksek';
        if (c >= 0.5) return 'Orta';
        return 'Düşük';
    }

    function fitLabel(s) {
        if (s >= 80) return 'Yüksek uyum';
        if (s >= 60) return 'İyi uyum';
        if (s >= 40) return 'Orta uyum';
        return 'Düşük uyum';
    }

    function evaluateCall(item, profile, today) {
        const eliminate = (reason, extra = {}) => ({ eliminated: true, reason, ...extra });

        // A) Durum ve son başvuru tarihi
        const status = String(item.Status || '').toUpperCase();
        if (status === 'CLOSED') return eliminate('Bu çağrı dönemi resmi olarak kapanmıştır.', { expired: true });
        if (/^\d{4}-\d{2}-\d{2}$/.test(item.Deadline || '') && item.Deadline < today) {
            return eliminate(`Son başvuru tarihi geçti (${item.Deadline}).`, { expired: true });
        }

        const details = [];
        const warnings = [];
        const run = (facet, outcome) => { if (outcome) details.push({ facet, label: FACET_LABELS[facet], ...outcome }); return outcome; };

        // B) Eleyici sorular
        const loc = run('location', evalLocation(item, profile));
        if (loc.result === 'no_match') return eliminate(loc.note);

        const types = run('applicant_types', evalApplicantTypes(item, profile));
        if (types.result === 'no_match') return eliminate(types.note);

        const req = unmetRequirement(item, profile);
        if (req) return eliminate(`${req.label}: ${req.evidence}`);

        const cons = run('consortium', evalConsortium(item, profile));
        if (cons.hard) return eliminate(`Tek başınıza başvuramazsınız. ${cons.note}`);

        // C) Ağırlıklı puanlama
        run('action_type', evalActionType(item, profile));
        run('themes', evalThemes(item, profile));
        run('budget', evalBudget(item, profile));

        let earned = 0, possible = 0, known = 0;
        for (const d of details) {
            const w = WEIGHTS[d.facet];
            possible += w;
            if (d.result === 'match') { earned += w; known++; }
            else if (d.result === 'partial') { earned += w / 2; known++; }
            else if (d.result === 'unknown') { earned += w / 2; }
            else known++;
        }
        const score = possible ? Math.round(100 * earned / possible) : 0;

        // D) Bonus (özel şartlar) — skordan ayrı tutulur, sıralamada eklenir
        const callTags = (item.facets.special && item.facets.special.tags) || [];
        const bonusTags = Object.entries(SPECIAL_FROM_PROFILE)
            .filter(([key, tag]) => profile[key] && callTags.includes(tag))
            .map(([, tag]) => tag);
        const bonus = BONUS_PER_SPECIAL * bonusTags.length;

        // E) Uyarılar
        if (profile.q_country_status === 'individual_woman' && item.facets.action_type.value !== 'prize') {
            warnings.push('Bu çağrı tüzel kişilik gerektirir; şirketiniz üzerinden başvurmalısınız.');
        }
        if (profile.special_coordinator && item.facets.consortium.value === 'single') {
            warnings.push('Tek başvuranlı çağrı: koordinatörlük söz konusu değil.');
        }
        const unknownFields = details.filter(d => d.result === 'unknown').map(d => d.label);
        if (unknownFields.length) {
            warnings.push(`${unknownFields.length} bilgi eksik: ${unknownFields.join(', ')}. Çağrı dokümanından kontrol edin.`);
        }

        const confidence = details.length ? known / details.length : 0;
        return {
            eliminated: false,
            score,
            bonus,
            bonusTags,
            total: Math.min(100, score + bonus),
            fitLabel: fitLabel(score),
            confidence: Math.round(confidence * 100) / 100,
            confidenceLabel: confidenceLabel(confidence),
            unknownFields,
            details,
            warnings,
        };
    }

    function evaluateEuCalls(profile, data, opts = {}) {
        const today = toISODate(opts.today);
        const eligible = [];
        const ineligible = [];

        data.forEach(item => {
            const r = evaluateCall(item, profile, today);
            if (r.eliminated) {
                ineligible.push({ item, reason: r.reason, expired: Boolean(r.expired) });
                return;
            }
            // Eski arayüz alanları (rapor/kopyalama uyumluluğu)
            r.matchLogs = r.details.filter(d => d.result === 'match').map(d => `${d.label}: ${d.note}`);
            r.penaltyLogs = r.details.filter(d => d.result === 'no_match' || d.result === 'partial').map(d => `${d.label}: ${d.note}`);
            eligible.push({ item, ...r });
        });

        const deadlineKey = e => (/^\d{4}-\d{2}-\d{2}$/.test(e.item.Deadline || '') ? e.item.Deadline : '9999-12-31');
        eligible.sort((a, b) =>
            (b.score + b.bonus) - (a.score + a.bonus) ||
            b.confidence - a.confidence ||
            deadlineKey(a).localeCompare(deadlineKey(b)));
        return { eligible, ineligible };
    }

    return { WEIGHTS, BUDGET_RANGES, FACET_LABELS, evaluateCall, evaluateEuCalls, fitLabel, confidenceLabel, toISODate };
});
