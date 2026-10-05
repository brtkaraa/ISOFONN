// ─── F8 | TÜBİTAK Eşleştirme ve Karar Motoru (engine.js) ───
// Analiz.md ve Referans Motor (v5) Standartlarına Tam Uyumlu

class MatchmakingEngine {
    constructor() {
        this.formSchema = [];
        this.matrix = [];
        this.dict = [];
        this.rules = [];
        this.ready = false;

        this.officialLinks = {
            '1501': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1501-tubitak-sanayi-ar-ge-projeleri-destekleme-programi',
            '1503': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1503-proje-pazarlari-destekleme-programi',
            '1505': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1505-universite-sanayi-isbirligi-destek-programi',
            '1507': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1507-tubitak-kobi-ar-ge-baslangic-destek-programi',
            '1509': 'https://tubitak.gov.tr/tr/destekler/sanayi/uluslararasi-ortakli-destek-programlari/1509-tubitak-uluslararasi-sanayi-ar-ge-projeleri-destekleme-programi',
            '1511': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1511-tubitak-oncelikli-alanlar-arastirma-teknoloji-gelistirme-ve-yenilik-p-d-pteknoloji-odakli-sanayi-hamlesi-programi',
            '1513': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1513-teknoloji-transfer-ofisleri-destekleme-programi',
            '1514': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1514-girisim-sermayesi-destekleme-programi-tech-investr',
            '1515': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1515-oncul-ar-ge-laboratuvarlari-destekleme-programi',
            '1601': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1601-yenilik-girisimcilik-alanlarinda-kapasite-artirilmasina-yonelik-dp',
            '1602': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1602-tubitak-patent-destek-programi',
            '1612': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1612-bigg-1asama-uygulayici-kurulus-cagrisi',
            '1613': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1613-teknoloji-transferi-profesyoneli-cagrisi',
            '1701': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1701-ar-ge-proje-degerlendirme-ve-izleme-cagrisi',
            '1702': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1702-patent-tabanli-teknoloji-transferi-destekleme-cagrisi',
            '1707': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1707-siparise-dayali-ar-ge-projeleri-icin-kobi-destekleme-cagrisi',
            '1709': 'https://tubitak.gov.tr/tr/destekler/sanayi/uluslararasi-ortakli-destek-programlari/1709-eureka-eurostars',
            '1711': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1711-yapay-zeka-ekosistem-cagrisi',
            '1719': 'https://tubitak.gov.tr/tr/destekler/sanayi/uluslararasi-ortakli-destek-programlari/1719-eureka-network-cagrilari',
            '1812': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1812-yatirim-tabanli-girisimcilik-destek-programi-bigg-yatirim',
            '1831': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1831-yesil-inovasyon-teknoloji-mentorluk-cagrisi',
            '1832': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1832-sanayide-yesil-donusum-cagrisi',
            '1833': 'https://tubitak.gov.tr/tr/destekler/sanayi/ulusal-destek-programlari/1833-sayem-yesil-donusum-cagrisi',
            'Eureka-Seyahat': 'https://tubitak.gov.tr/tr/destekler/sanayi/uluslararasi-ortakli-destek-programlari/eureka-seyahat-destegi',
            'Eurostars-Koord': 'https://tubitak.gov.tr/tr/destekler/sanayi/uluslararasi-ortakli-destek-programlari/eurostars-koordinatorluk-destegi-programi',
            'Ufuk-Avrupa': 'https://tubitak.gov.tr/tr/destekler/sanayi/uluslararasi-ortakli-destek-programlari/ufuk-avrupa-programi'
        };
    }

    async init(customData = null) {
        if (customData) {
            this.formSchema = customData.formSchema || [];
            this.matrix = customData.matrix || [];
            this.dict = customData.dict || [];
            this.rules = customData.rules || [];
            this.ready = true;
            return;
        }
        try {
            const [formRes, matrixRes, dictRes, rulesRes] = await Promise.all([
                fetch('./data/form_semasi.json'),
                fetch('./data/eslestirme_matrisi.json'),
                fetch('./data/kod_sozlugu.json'),
                fetch('./data/puanlama_kurallari.json')
            ]);

            this.formSchema = await formRes.json();
            this.matrix = await matrixRes.json();
            this.dict = await dictRes.json();
            this.rules = await rulesRes.json();

            this.ready = true;
        } catch (error) {
            console.error("Veri yüklenirken hata oluştu:", error);
            throw error;
        }
    }

    getSchema() { return this.formSchema; }

    parseOptions(optionsStr) {
        if (!optionsStr || optionsStr === "-") return [];
        return optionsStr.split('/').map(opt => {
            const parts = opt.split('=');
            return parts.length === 2
                ? { value: parts[0].trim(), label: parts[1].trim() }
                : { value: opt.trim(), label: opt.trim() };
        });
    }

    _num(v) { return typeof v === 'number' && !isNaN(v) ? v : null; }
    _lst(v) { return String(v || '').split(';').map(x => x.trim().split(' ')[0]).filter(Boolean); }
    _isKobi(scale) { return ['Mikro', 'Küçük', 'Orta'].includes(scale); }
    _isBuyuk(scale) { return ['Büyük', 'Büyük ölçekli'].includes(scale); }

    /**
     * PHASE 1: Hard Eligibility Check — Kesin kriterlere göre eleme ("Başvurabilir mi?")
     * Döner: { passed: bool, reason: string|null }
     */
    checkHardEligibility(profile, program) {
        const code = program.KOD;
        if (code === 'Ufuk-Avrupa') {
            return { passed: false, reason: 'Ufuk Avrupa başvuruları doğrudan AB Funding & Tenders portalından yürütülür.' };
        }

        // 1. Başvuran Kuruluş Niteliği (F01)
        if (profile.F01 && !profile.unsure_company && program.BASVURAN_TIPI_KOD) {
            const allowed = this._lst(program.BASVURAN_TIPI_KOD);
            const userType = String(profile.F01).toUpperCase();
            const matches = allowed.some(t => {
                if (t === 'TUMU' || t === 'YOK' || t === 'BILINMIYOR') return true;
                if (t === userType) return true;
                if (userType === 'ODA_BIRLIK' && (t === 'ODA_BIRLIK_VAKIF' || t.startsWith('ODA'))) return true;
                if (userType === 'TTO_TGB' && t.includes('TTO')) return true;
                return false;
            });

            if (!matches) {
                const entityName = program.BASVURAN_TIPI_UYGUN || 'farklı kuruluş türleri';
                return {
                    passed: false,
                    reason: `Bu çağrı yalnızca [${entityName}] başvurularına açıktır. Profilinizdeki kuruluş niteliği (${profile.F01}) bu program için uygun değildir.`
                };
            }
        }

        // 2. Kuruluş Ölçeği Uygunluğu (F02)
        const ol = program.OLCEK_UYGUNLUGU;
        const isKobi = this._isKobi(profile.F02);
        const isBuyuk = this._isBuyuk(profile.F02);

        if (profile.F01 === 'SERMAYE_SIRKETI') {
            if (ol === 'KOBI_ZORUNLU' && isBuyuk) {
                if (!(code === '1707' && profile.F60 === 'MUSTERI') && !profile.dynamic_kobi_partner) {
                    return { passed: false, reason: 'Bu program KOBİ odağındadır (R97). Büyük ölçekli firmalar (KOBİ konsorsiyum ortağı olmaksızın) tek başına başvuramaz.' };
                }
            }
            if (ol === 'ORTA_VE_BUYUK_YURUTUCU' && (profile.F02 === 'Mikro' || profile.F02 === 'Küçük')) {
                return { passed: false, reason: 'Yürütücü kuruluşun Orta veya Büyük ölçekli sanayi kuruluşu olması zorunludur (R96).' };
            }
            if (code === '1515' && !isBuyuk && !profile.unsure_company) {
                return { passed: false, reason: '1515 Öncül Ar-Ge Laboratuvarları programı yalnızca büyük ölçekli ve yüksek Ar-Ge harcaması olan sanayi kuruluşlarına açıktır.' };
            }
        }

        // Destek oranı ölçek kontrolü (oran UYGULANMAZ ise elenir)
        const oran = isKobi ? program.DESTEK_ORANI_KOBI_PCT : program.DESTEK_ORANI_BUYUK_PCT;
        if (typeof oran === 'string' && oran.startsWith('UYGULANMAZ') && profile.F01 === 'SERMAYE_SIRKETI' && code !== '1707') {
            return { passed: false, reason: `Kuruluş ölçeğiniz (${profile.F02}) için bu programda destek oranı bulunmamaktadır (UYGULANMAZ).` };
        }

        // 3. Proje Türü / Kapsam Uygunluğu (PROJE_TURU_KOD)
        let pt = new Set(Array.isArray(profile.F10) ? profile.F10 : []);
        if (profile.themes) {
            if (profile.themes.arge) pt.add('ARGE_URUN_SUREC');
            if (profile.themes.yz) pt.add('YAPAY_ZEKA');
            if (profile.themes.yesil) { pt.add('YESIL_DONUSUM'); pt.add('YESIL_MENTORLUK'); }
            if (profile.themes.patent) { pt.add('PATENT_TEKNOLOJI_TRANSFERI'); pt.add('PATENT_BASVURUSU'); }
            if (profile.themes.uluslararasi) { pt.add('ULUSLARARASI_ORTAKLI_ARGE'); pt.add('SEYAHAT_DESTEGI'); pt.add('KOORDINATORLUK_DESTEGI'); }
            if (profile.themes.sanayiarge) { pt.add('ARGE_URUN_SUREC'); pt.add('SIPARISE_DAYALI'); }
            if (profile.themes.ticarilestirme) { pt.add('GIRISIMCILIK_YATIRIM'); pt.add('TICARILESTIRME'); }
            if (profile.themes.unisanayi) { pt.add('ARGE_URUN_SUREC'); pt.add('YAPAY_ZEKA'); }
        }
        if (profile.F34 && !profile.F34.includes('Hiçbiri')) pt.add('YESIL_DONUSUM');
        if (['AKILLI_URETIM', 'AKILLI_TARIM_GIDA_HAYVANCILIK', 'FINANS_TEKNOLOJILERI', 'IKLIM_SURDURULEBILIRLIK', 'AKILLI_EGITIM'].includes(profile.F38)) pt.add('YAPAY_ZEKA');
        if (profile.F41 && profile.F41 !== 'YOK') {
            if (profile.F41 === 'TR_BASVURU') pt.add('PATENT_BASVURUSU');
            if (profile.F41 === 'LISANS_ALINACAK') pt.add('PATENT_TEKNOLOJI_TRANSFERI');
        }
        if (profile.F60 === 'TEDARIKCI' || profile.F60 === 'MUSTERI') pt.add('SIPARISE_DAYALI');
        if (profile.hasPatent) pt.add('PATENT_BASVURUSU');

        if (pt.size > 0 && program.PROJE_TURU_KOD) {
            const progTypes = new Set(this._lst(program.PROJE_TURU_KOD));
            const hasOverlap = Array.from(pt).some(t => progTypes.has(t));
            if (!hasOverlap) {
                return {
                    passed: false,
                    reason: `Proje türü/faaliyeti programın odak alanıyla (${program.PROJE_TURU_UYGUN || program.PROJE_TURU_KOD}) örtüşmemektedir.`
                };
            }
        }

        // 4. Bütçe Sınırları ve Ölçek Tavanları
        if (profile.F14 && !profile.unsure_budget) {
            const budget = parseInt(profile.F14);
            if (program.BUTCE_KURALI === 'VAR') {
                if (this._num(program.MIN_TOPLAM_PROJE_BUTCESI_TL) && budget < program.MIN_TOPLAM_PROJE_BUTCESI_TL) {
                    return {
                        passed: false,
                        reason: `Öngörülen bütçeniz (${budget.toLocaleString('tr-TR')} TL), programın asgari proje bütçesi olan ${program.MIN_TOPLAM_PROJE_BUTCESI_TL.toLocaleString('tr-TR')} TL sınırının altındadır.`
                    };
                }
                if (this._num(program.MAX_TOPLAM_PROJE_BUTCESI_TL) && budget > program.MAX_TOPLAM_PROJE_BUTCESI_TL) {
                    return {
                        passed: false,
                        reason: `Öngörülen bütçeniz (${budget.toLocaleString('tr-TR')} TL), programın azami proje bütçesi tavanını (${program.MAX_TOPLAM_PROJE_BUTCESI_TL.toLocaleString('tr-TR')} TL) aşmaktadır.`
                    };
                }
            }
            if (program.BUTCE_KURALI === 'OLCEGE_GORE') {
                const colMap = {
                    'Mikro': 'MAX_BUTCE_MIKRO_KUCUK_TL',
                    'Küçük': 'MAX_BUTCE_MIKRO_KUCUK_TL',
                    'Orta': 'MAX_BUTCE_ORTA_TL',
                    'Büyük': 'MAX_BUTCE_BUYUK_TL',
                    'Büyük ölçekli': 'MAX_BUTCE_BUYUK_TL'
                };
                const capCol = colMap[profile.F02];
                if (capCol && this._num(program[capCol]) && budget > program[capCol]) {
                    return {
                        passed: false,
                        reason: `Öngörülen bütçeniz (${budget.toLocaleString('tr-TR')} TL), işletme ölçeğinize tanınan azami bütçe sınırını (${program[capCol].toLocaleString('tr-TR')} TL) aşmaktadır.`
                    };
                }
            }
        }

        // 5. TRL / Olgunluk Seviyesi Sınırları
        if (profile.F11 && !profile.unsure_trl) {
            const trl = parseInt(profile.F11);
            if (program.THS_KURAL_TIPI === 'HARD') {
                if (this._num(program.THS_BASLANGIC_MIN) && trl < program.THS_BASLANGIC_MIN) {
                    return {
                        passed: false,
                        reason: `Bu çağrı için başlangıç TRL olgunluk düzeyi en az ${program.THS_BASLANGIC_MIN} olmalıdır (Mevcut seviyeniz: TRL ${trl}).`
                    };
                }
                if (this._num(program.THS_BASLANGIC_MAX) && trl > program.THS_BASLANGIC_MAX) {
                    return {
                        passed: false,
                        reason: `Bu çağrı için başlangıç TRL olgunluk düzeyi en fazla ${program.THS_BASLANGIC_MAX} olmalıdır (Mevcut seviyeniz: TRL ${trl}).`
                    };
                }
            }
            if ((code === '1832' || code === '1833') && trl >= 8) {
                return {
                    passed: false,
                    reason: `TRL 8 ve üzeri ticarileşme aşamasındaki projeler 1832/1833 Ar-Ge kapsamı dışındadır (R02).`
                };
            }
        }

        // 6. Ortaklık ve Konsorsiyum Zorunlulukları
        const ort = Array.isArray(profile.F16) ? profile.F16 : [profile.F16];
        const isSingle = ort.includes('TEK') || ort.includes('Tek başıma');
        const hasUniv = ort.includes('UNIV') || ort.includes('Üniversite-araştırma kurumu ortağı var') || profile.F01 === 'UNIVERSITE_ARASTIRMA';
        const hasForeign = ort.includes('YABANCI') || ort.includes('Yabancı (uluslararası) ortak var');

        if (program.ORTAKLI_BASVURU_ZORUNLU === 'EVET' && isSingle) {
            return { passed: false, reason: 'Bu program zorunlu konsorsiyum (ortaklık) gerektirmektedir. Tek başınıza başvuramazsınız.' };
        }
        if (program.UNIVERSITE_ARASTIRMA_ORTAK_GEREKLI === 'EVET' && !hasUniv && !profile.unsure_partnership) {
            return { passed: false, reason: 'Bu program üniversite veya kamu araştırma kuruluşu ortaklığını zorunlu kılmaktadır (R80).' };
        }
        if (program.ULUSLARARASI_ORTAK_GEREKLI === 'EVET' && !hasForeign && code !== 'Eurostars-Koord' && !profile.unsure_partnership) {
            return { passed: false, reason: 'Bu program uluslararası/yabancı konsorsiyum ortağı zorunlu kılmaktadır.' };
        }
        if (program.UNIVERSITE_KURUM_TURLERI_UYGUN === 'YASAK' && hasUniv) {
            return { passed: false, reason: 'Bu programda üniversite veya kamu kurumları konsorsiyum ortağı olamaz (R82).' };
        }

        // 7. Sektörel Kısıtlar (Savunma Sanayii vb.)
        const sectors = Array.isArray(profile.F06) ? profile.F06 : [];
        const isDefense = sectors.includes('SAVUNMA_SANAYI') || profile.isDefense;
        if (isDefense) {
            if (program.SEKTOR_HARIC && String(program.SEKTOR_HARIC).includes('SAVUNMA_SANAYI') && !String(program.SEKTOR_HARIC).startsWith('OLASI')) {
                return { passed: false, reason: 'Savunma sanayii projeleri bu sivil Ar-Ge programının kapsamı dışındadır (SSB veya TÜBİTAK 1007 programlarına yönlendirilir).' };
            }
            if (code === '1511') {
                return { passed: false, reason: 'Savunma sanayii projeleri Teknoloji Odaklı Sanayi Hamlesi (1511) sivil çağrılarının dışındadır; SSB veya SAVTAG programlarına başvurulmalıdır.' };
            }
        }

        // 8. Özel Mevzuat Şartları
        if (program.YESIL_GOSTERGE_ZORUNLU === 'EVET' && (!profile.F34 || profile.F34.includes('Hiçbiri')) && !profile.themes?.yesil && (!profile.F10 || !profile.F10.includes('YESIL_DONUSUM'))) {
            return { passed: false, reason: 'Bu program için Yeşil Dönüşüm Göstergesi veya azaltım taahhüdü zorunludur (R30).' };
        }
        if (code === '1812' && profile.F01 === 'SERMAYE_SIRKETI') {
            return { passed: false, reason: 'BİGG (1812) programı şirketleşmemiş bireysel girişimcilere yöneliktir (R67). Şirket ortaklığı olanlar veya tüzel şirketler başvuramaz.' };
        }
        if (code === '1602' && !profile.hasPatent && (!profile.F41 || profile.F41 === 'YOK') && !profile.themes?.patent && (!profile.F10 || !profile.F10.includes('PATENT_BASVURUSU'))) {
            return { passed: false, reason: 'Patent Destek Programı (1602) yalnızca tescil/başvuru numarası alınmış patent başvuruları içindir (R50).' };
        }
        if (code === '1702' && (!profile.hasPatent && (!profile.F41 || profile.F41 === 'YOK') && !profile.themes?.patent && (!profile.F10 || !profile.F10.includes('PATENT_TEKNOLOJI_TRANSFERI')))) {
            return { passed: false, reason: 'Patent Tabanlı Teknoloji Transferi (1702) çağrısı üniversite/TTO patentlerinin sanayiye lisanslanması veya devri içindir.' };
        }
        if (this._num(program.ARGE_HARCAMA_MIN_TL) && (profile.F49 || 0) < program.ARGE_HARCAMA_MIN_TL && !profile.unsure_budget) {
            if (code === '1515') {
                return { passed: false, reason: '1515 için son 3 yıldan birinde en az 15 M TL Ar-Ge harcaması şartı aranmaktadır (R70).' };
            }
        }

        return { passed: true, reason: null };
    }

    /**
     * Finansal ve Bütçe Detaylarını Hesaplama
     */
    calculateFinancials(profile, program) {
        const isKobi = this._isKobi(profile.F02) || profile.F01 === 'GIRISIMCI_BIREYSEL';
        const isBuyuk = this._isBuyuk(profile.F02);

        let rate = null;
        let rateType = '';

        if (isKobi) {
            if (typeof program.DESTEK_ORANI_KOBI_PCT === 'number') {
                rate = program.DESTEK_ORANI_KOBI_PCT;
                rateType = `%${rate} (KOBİ Hibe)`;
            } else if (typeof program.DESTEK_ORANI_KOBI_PCT === 'string' && !isNaN(parseInt(program.DESTEK_ORANI_KOBI_PCT))) {
                rate = parseInt(program.DESTEK_ORANI_KOBI_PCT);
                rateType = `%${rate} (KOBİ Hibe)`;
            } else {
                rateType = program.DESTEK_ORANI_KOBI_PCT || 'Değişken';
            }
        } else if (isBuyuk) {
            if (typeof program.DESTEK_ORANI_BUYUK_PCT === 'number') {
                rate = program.DESTEK_ORANI_BUYUK_PCT;
                rateType = `%${rate} (Büyük İşletme)`;
            } else if (typeof program.DESTEK_ORANI_BUYUK_PCT === 'string' && !isNaN(parseInt(program.DESTEK_ORANI_BUYUK_PCT))) {
                rate = parseInt(program.DESTEK_ORANI_BUYUK_PCT);
                rateType = `%${rate} (Büyük İşletme)`;
            } else {
                rateType = program.DESTEK_ORANI_BUYUK_PCT || 'Değişken';
            }
        } else {
            rate = program.DESTEK_ORANI_MAX_PCT || null;
            rateType = rate ? `%${rate}` : 'Değişken';
        }

        let maxProjectBudget = program.MAX_TOPLAM_PROJE_BUTCESI_TL || null;
        let maxSupportLimit = program.MAX_TUBITAK_DESTEK_TUTARI_TL || null;

        if (program.BUTCE_KURALI === 'OLCEGE_GORE') {
            if (profile.F02 === 'Mikro' || profile.F02 === 'Küçük') {
                maxProjectBudget = program.MAX_BUTCE_MIKRO_KUCUK_TL || maxProjectBudget;
            } else if (profile.F02 === 'Orta') {
                maxProjectBudget = program.MAX_BUTCE_ORTA_TL || maxProjectBudget;
            } else if (isBuyuk) {
                maxProjectBudget = program.MAX_BUTCE_BUYUK_TL || maxProjectBudget;
            }
        }

        let limitLabel = 'Limitsiz';
        if (maxProjectBudget && maxSupportLimit) {
            limitLabel = `Proje Tavanı: ${maxProjectBudget.toLocaleString('tr-TR')} TL (Hibe: ${maxSupportLimit.toLocaleString('tr-TR')} TL)`;
        } else if (maxProjectBudget) {
            limitLabel = `Maks. Bütçe: ${maxProjectBudget.toLocaleString('tr-TR')} TL`;
        } else if (maxSupportLimit) {
            limitLabel = `Hibe Tavanı: ${maxSupportLimit.toLocaleString('tr-TR')} TL`;
        }

        let estimatedGrant = null;
        let estimatedEquity = null;
        let userBudget = profile.F14 ? parseInt(profile.F14) : null;

        if (userBudget && rate && !profile.unsure_budget) {
            let calcGrant = Math.round((userBudget * rate) / 100);
            if (maxSupportLimit && calcGrant > maxSupportLimit) {
                calcGrant = maxSupportLimit;
            }
            estimatedGrant = calcGrant;
            estimatedEquity = Math.max(0, userBudget - estimatedGrant);
        }

        return {
            rate,
            rateType,
            maxProjectBudget,
            maxSupportLimit,
            limitLabel,
            estimatedGrant,
            estimatedEquity,
            userBudget
        };
    }

    /**
     * PHASE 2: Sıfır Çelişki (Zero-Contradiction) Uygunluk Skoru (0–100 arası)
     */
    calcFitScore(profile, program) {
        let matchLogs = [];
        let penaltyLogs = [];
        let warnings = [];

        // 1. TEMEL UYGUNLUK PUANLARI (0-75 Puan Taban)
        // A) Kuruluş Ölçeği Uyumu (Maks 25 Puan)
        let scaleScore = 25;
        if (profile.F02 && program.OLCEK_UYGUNLUGU && !profile.unsure_company) {
            if (program.OLCEK_UYGUNLUGU === 'ORTA_VE_BUYUK_YURUTUCU' && (profile.F02 === 'Mikro' || profile.F02 === 'Küçük')) {
                scaleScore = 5;
                penaltyLogs.push({ text: 'Bu program genellikle daha büyük yapıları yürütücü olarak tercih eder.', val: 20 });
            } else {
                matchLogs.push({ text: `Kuruluş ölçeğiniz (${profile.F02}) program kriterleriyle tam uyumlu.`, val: 0 });
            }
        }

        // B) TRL / Olgunluk Uyumu (Maks 20 Puan)
        let trlScore = 20;
        if (profile.F11 && !profile.unsure_trl) {
            const trl = parseInt(profile.F11);
            if (trl >= 3 && trl <= 7) {
                matchLogs.push({ text: `Proje olgunluk seviyeniz (TRL ${trl}) Ar-Ge fonlaması için ideal aralıkta.`, val: 0 });
            } else if (trl < 3) {
                trlScore = 10;
                penaltyLogs.push({ text: `Proje olgunluk seviyeniz (TRL ${trl}) düşük. Çağrı daha ileri aşama bekleyebilir.`, val: 10 });
            }
        } else if (profile.unsure_trl) {
            trlScore = 15;
            warnings.push('Proje aşaması belirtilmedi. Kesin sonuç için aşama bilgisi girilmeli.');
        }

        // C) Bütçe Uyumu (Maks 15 Puan)
        let budgetScore = 15;
        if (profile.F14 && !profile.unsure_budget) {
            const budget = parseInt(profile.F14);
            const fin = this.calculateFinancials(profile, program);
            if (fin.maxProjectBudget && budget > fin.maxProjectBudget) {
                budgetScore = 0;
                penaltyLogs.push({ text: `Öngörülen bütçeniz bu programın bütçe sınırını aşıyor.`, val: 15 });
            } else {
                matchLogs.push({ text: `Öngörülen bütçeniz programın limitleri dahilindedir.`, val: 0 });
            }
        } else if (profile.unsure_budget) {
            budgetScore = 10;
            warnings.push('Bütçe bilgisi belirtilmedi. Kesin değerlendirme için bütçe aralığı seçilmeli.');
        }

        // D) Ortaklık Uyumu (Maks 15 Puan)
        let partnerScore = 15;
        const ort = Array.isArray(profile.F16) ? profile.F16 : [profile.F16];
        const hasUniv = ort.includes('UNIV') || ort.includes('Üniversite-araştırma kurumu ortağı var');
        const hasForeign = ort.includes('YABANCI') || ort.includes('Yabancı (uluslararası) ortak var');

        if (program.UNIVERSITE_ORTAKLIGI_DESTEKLENIYOR === 'EVET' && hasUniv) {
            matchLogs.push({ text: 'Üniversite ortaklığınız bu program için stratejik avantaj sağlıyor.', val: 5 });
        }
        if (program.ULUSLARARASI_ORTAK_GEREKLI === 'EVET' && hasForeign) {
            matchLogs.push({ text: 'Uluslararası konsorsiyum ortaklığınız çağrı gereksinimini karşılıyor.', val: 5 });
        }

        let baseScore = scaleScore + trlScore + budgetScore + partnerScore;

        // 2. TEMATİK VE TEŞVİK BONUSLARI (Maks 25 Puan)
        let bonusScore = 0;
        const themes = profile.themes || {};
        const progTurKod = (program.PROJE_TURU_KOD || '').toUpperCase();

        if (themes.yz && progTurKod.includes('YAPAY_ZEKA')) {
            bonusScore += 8;
            matchLogs.push({ text: 'Yapay Zeka / Dijital tema: Programın öncelikli odağıyla örtüşüyor.', val: 8 });
        }
        if (themes.yesil && progTurKod.includes('YESIL_DONUSUM')) {
            bonusScore += 8;
            matchLogs.push({ text: 'Yeşil Dönüşüm teması: Programın kapsam alanıyla doğrudan örtüşüyor.', val: 8 });
        }
        if (themes.arge && progTurKod.includes('ARGE_URUN_SUREC')) {
            bonusScore += 6;
            matchLogs.push({ text: 'Ar-Ge / Yeni Ürün teması uyumlu.', val: 6 });
        }
        if (themes.uluslararasi && program.ULUSLARARASI_ORTAK_GEREKLI === 'EVET') {
            bonusScore += 8;
            matchLogs.push({ text: 'Uluslararası ortaklık hedefleriniz bu programın beklentisiyle örtüşüyor.', val: 8 });
        }
        if (themes.patent && (program.PATENT_ETKI_KODU !== 'YOK_RESMI' && program.PATENT_ETKI_KODU !== 'UYGULANMAZ')) {
            bonusScore += 5;
            matchLogs.push({ text: 'Patent odağı programda değerlendirilmektedir.', val: 5 });
        }

        // Sosyal ve Kurumsal Teşvikler
        let socialBonus = 0;
        if (profile.prev_tubitak === 'var_basarili') {
            socialBonus += 3;
            matchLogs.push({ text: 'Başarılı TÜBİTAK geçmişi: Değerlendirmede kurumsal güvenilirlik artışı.', val: 3 });
        } else if (profile.prev_tubitak === 'var_reddedildi' && program.REDDEDILEN_ONERI_KURALI === 'DEGISIKLIKSIZ_TEKRAR_YASAK') {
            penaltyLogs.push({ text: 'Önceki reddedilen öneri: Aynı öneri değişiklik yapılmadan tekrar sunulamaz.', val: 10 });
        }

        if (profile.isGencFirma && parseInt(program.GENC_FIRMA_PUAN) > 0) {
            const gp = parseInt(program.GENC_FIRMA_PUAN);
            socialBonus += gp;
            matchLogs.push({ text: `Genç firma avantajı (3 yaş altı): +${gp} puan.`, val: gp });
        }
        if (profile.hasPatent && program.IP5_ORAN_ARTISI_PCT > 0) {
            socialBonus += 4;
            matchLogs.push({ text: 'Aktif patent varlığı: Bu programda değerlendirme avantajı sağlar.', val: 4 });
        }
        if (profile.hasIhracat && program.IHRACAT_ETKI_KODU === 'NITEL_DEGERLENDIRME') {
            socialBonus += 2;
            matchLogs.push({ text: 'İhracat yetkinliği nitel değerlendirmede olumlu etki yapabilir.', val: 2 });
        }
        if ((profile.F27 >= 50 || profile.q_bonus_woman) && parseInt(program.KADIN_PUAN) > 0) {
            const kp = parseInt(program.KADIN_PUAN);
            socialBonus += kp;
            matchLogs.push({ text: `Kadın girişimci/yönetici: +${kp} puan avantajı.`, val: kp });
        }
        if ((profile.F09 === 'Evet' || profile.q_bonus_earthquake) && parseInt(program.DEPREM_PUAN) > 0) {
            const dp = parseInt(program.DEPREM_PUAN);
            socialBonus += dp;
            matchLogs.push({ text: `Deprem bölgesi teşviki: +${dp} puan avantajı.`, val: dp });
        }
        if (profile.F15 && (program.ONCELIKLI_BASLIK_BONUS_PUAN > 0)) {
            const bp = parseInt(program.ONCELIKLI_BASLIK_BONUS_PUAN);
            socialBonus += bp;
            matchLogs.push({ text: `Öncelikli teknoloji alanı bonusu: +${bp} puan.`, val: bp });
        }

        bonusScore = Math.min(25, bonusScore + socialBonus);
        let rawScore = baseScore + bonusScore;

        // 3. ÇAĞRI VE TAKVİM DURUMU
        let isClosedOrExpired = false;
        const callStatus = (program.GUNCEL_DURUM_23_09_2026 || '').toUpperCase();
        if (callStatus === 'KAPALI' || callStatus === 'CAGRI BEKLENIYOR') {
            isClosedOrExpired = true;
            penaltyLogs.push({ text: `Program profilinize uygun ANCAK şu anda çağrısı kapalı. Gelecek çağrı dönemini beklemelisiniz.`, val: 25 });
        }

        const deadlineRaw = program.SON_BASVURU_23_09_2026;
        if (deadlineRaw && deadlineRaw !== '-' && deadlineRaw !== 'Belirtilmedi') {
            const parts = deadlineRaw.split('-');
            if (parts.length === 3) {
                const deadline = new Date(parts[0], parts[1] - 1, parts[2]);
                const today = new Date();
                const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                if (diffDays < 0) {
                    isClosedOrExpired = true;
                    penaltyLogs.push({ text: `Bu çağrının son başvuru tarihi (${deadlineRaw}) geçmiş. Gelecek dönemi hedefleyebilirsiniz.`, val: 25 });
                } else if (diffDays <= 15) {
                    warnings.push(`Son başvuruya yalnızca ${diffDays} gün kaldı! Hızlı hareket edilmeli.`);
                }
            }
        }

        // 4. KATI TAVAN VE ÇELİŞKİ ÖNLEME KURALI (ZERO-CONTRADICTION CEILING)
        let maxCeiling = 100;
        const penaltyCount = penaltyLogs.length;

        if (isClosedOrExpired) {
            maxCeiling = Math.min(maxCeiling, 60);
        }

        if (penaltyCount === 0) {
            maxCeiling = Math.min(maxCeiling, 100);
        } else if (penaltyCount === 1) {
            maxCeiling = Math.min(maxCeiling, 79);
        } else if (penaltyCount === 2) {
            maxCeiling = Math.min(maxCeiling, 64);
        } else {
            maxCeiling = Math.min(maxCeiling, 49);
        }

        const finalScore = Math.max(0, Math.min(maxCeiling, rawScore));
        const missingScore = 100 - finalScore;

        // 5. EKSİKLİK VE GELİŞİM ANALİZİ (GAP ANALYSIS)
        let gapLogs = [];
        if (missingScore > 0) {
            penaltyLogs.forEach(p => {
                gapLogs.push({ text: `${p.text}`, val: p.val, type: 'penalty' });
            });

            if (program.UNIVERSITE_ORTAKLIGI_DESTEKLENIYOR === 'EVET' && !hasUniv) {
                gapLogs.push({ text: 'Üniversite / Araştırma kurumu ortağı dahil edilirse (+%5 potansiyel)', val: 5, type: 'opportunity' });
            }
            if (program.IP5_ORAN_ARTISI_PCT > 0 && !profile.hasPatent) {
                gapLogs.push({ text: 'Tescilli patent veya faydalı model varlığı eklenirse (+%4 potansiyel)', val: 4, type: 'opportunity' });
            }
            if (program.ONCELIKLI_BASLIK_BONUS_PUAN > 0 && !profile.F15) {
                const bp = parseInt(program.ONCELIKLI_BASLIK_BONUS_PUAN);
                gapLogs.push({ text: `Öncelikli teknoloji alanı kapsamına girilirse (+%${bp} potansiyel)`, val: bp, type: 'opportunity' });
            }
            if (program.IHRACAT_ETKI_KODU === 'NITEL_DEGERLENDIRME' && !profile.hasIhracat) {
                gapLogs.push({ text: 'İhracat yetkinliği belgelenirse (+%2 potansiyel)', val: 2, type: 'opportunity' });
            }
            if (progTurKod.includes('YESIL_DONUSUM') && !themes.yesil) {
                gapLogs.push({ text: 'Yeşil Dönüşüm / Sürdürülebilirlik odağı eklenirse (+%8 potansiyel)', val: 8, type: 'opportunity' });
            }
            if (progTurKod.includes('YAPAY_ZEKA') && !themes.yz) {
                gapLogs.push({ text: 'Yapay Zeka / Dijitalleşme bileşeni eklenirse (+%8 potansiyel)', val: 8, type: 'opportunity' });
            }
            if (profile.unsure_trl) {
                gapLogs.push({ text: 'Proje TRL seviyesi belirtilip netleştirilirse (+%5 puan)', val: 5, type: 'opportunity' });
            }
            if (profile.unsure_budget) {
                gapLogs.push({ text: 'Proje bütçesi belirtilip netleştirilirse (+%5 puan)', val: 5, type: 'opportunity' });
            }

            gapLogs = gapLogs.slice(0, 4);
        }

        return {
            score: finalScore,
            missingScore,
            matchLogs,
            penaltyLogs,
            gapLogs,
            warnings
        };
    }

    /**
     * ANA ANALİZ METODU — İki fazlı karar boru hattı
     */
    analyze(profile) {
        if (!this.ready) throw new Error("Motor henüz hazır değil.");

        let eligible = [];
        let ineligible = [];

        for (let program of this.matrix) {
            const eligibilityResult = this.checkHardEligibility(profile, program);
            const fin = this.calculateFinancials(profile, program);

            const deadlineRaw = program.SON_BASVURU_23_09_2026 || 'Belirtilmedi';
            const callStatus = program.GUNCEL_DURUM_23_09_2026 || 'Bilinmiyor';
            const officialUrl = this.officialLinks[program.KOD] || 'https://www.tubitak.gov.tr/tr/destekler';

            const base = {
                code: program.KOD,
                name: program.AD,
                budgetLimit: fin.limitLabel,
                supportRate: fin.rateType,
                estimatedGrant: fin.estimatedGrant,
                estimatedEquity: fin.estimatedEquity,
                userBudget: fin.userBudget,
                deadlineRaw,
                callStatus,
                officialUrl,
                specialCondition: program.OZEL_KOSUL_NOTU || 'Bu program için özel bir istisna notu bulunmamaktadır.'
            };

            if (!eligibilityResult.passed) {
                ineligible.push({ ...base, eliminationReason: eligibilityResult.reason });
            } else {
                const fitResult = this.calcFitScore(profile, program);
                eligible.push({
                    ...base,
                    matchScore: fitResult.score,
                    missingScore: fitResult.missingScore,
                    matchLogs: fitResult.matchLogs,
                    penaltyLogs: fitResult.penaltyLogs,
                    gapLogs: fitResult.gapLogs,
                    warnings: fitResult.warnings
                });
            }
        }

        // Uygun olanları puana göre sırala
        eligible.sort((a, b) => b.matchScore - a.matchScore);
        const top5 = eligible.slice(0, 5);
        const rest = eligible.slice(5);

        return { top5, rest, ineligible };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MatchmakingEngine };
}
if (typeof window !== 'undefined') {
    window.engine = new MatchmakingEngine();
}
