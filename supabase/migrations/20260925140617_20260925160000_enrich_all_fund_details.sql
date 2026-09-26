-- Comprehensive update of technical_scope, eligibility, required_docs for ALL funds with rich Excel-sourced detail.

-- 1501
UPDATE funds SET
  technical_scope = 'Ulusal sanayi Ar-Ge ve yenilik projeleri. Ürün, süreç veya hizmet geliştirmeye yönelik projeler desteklenir. TRL 1-9 arası tüm teknoloji olgunluk seviyeleri kapsar. Proje sonunda ticarileşme potansiyeli olan çıktılar, yeni bilgi/teknoloji üretimi, patent başvurusu ve ürün/süreç iyileştirmesi beklenir. Ar-Ge niteliği taşıyan faaliyetler: deneysel/teorik araştırma, prototip üretimi, test ve doğrulama, pilot üretim hattı kurulumu.',
  eligibility = ARRAY[
    'Türkiye''de yerleşik KOBİ ölçeğinde sermaye şirketi (10-250 çalışan, 10M-125M TL ciro)',
    'Kuruluş bazlı ön kayıt ve e-imza ile başvuru',
    'Proje ekibinde ilgili alan lisans mezunu en az 1 personel',
    'En az 1 üniversite/araştırma kuruluşu ile işbirliği (işbirliği protokolü)',
    'Projenin Ar-Ge niteliği taşıması ve yenilikçi olması',
    'Ticarileşme potansiyeli olan çıktı hedefleri'
  ],
  required_docs = ARRAY[
    'AGY101 Proje Öneri Bilgileri Formu (PRODİS üzerinden)',
    'AGY110 Proje ve Ekonomik Yarar Analizi İçeriği',
    'AGY300 Ar-Ge Yardım İstek Formu',
    'AGY320 Dönem Raporu (6''şar aylık dönemler halinde)',
    'AGY330 Mali Rapor (dönemsel)',
    'AGY350 YMM Raporu (her dönem için)',
    'AGY360 Proje Sonuç Raporu (proje bitiminde)',
    'İşbirliği protokolü (üniversite/araştırma kuruluşu ile)',
    'Kuruluş bazlı ön kayıt onay belgesi'
  ]
WHERE code = '1501';

-- 1503
UPDATE funds SET
  technical_scope = 'Üniversite, araştırma ve özel sektör temsilcileri arasında proje pazarı ve işbirliği ortamı oluşturulması. Etkinlik kapsamında akademik araştırma sonuçlarının sanayi ihtiyaçlarıyla eşleştirilmesi, ortak proje fikirlerinin geliştirilmesi ve işbirliklerinin başlatılması hedeflenir. Proje pazarı etkinlikleri; tanıtım, B2B görüşmeleri, panel ve sunum bölümlerinden oluşur.',
  eligibility = ARRAY[
    'Sanayi veya ticaret odası, birlik ya da ihracatçı birliği tarafından başvuru',
    'Etkinlikte en az bir üniversite katılımının sağlanması',
    'Kurumların Ar-Ge düşünce veya proje önerilerinin etkinliğe sunulması',
    'Etkinlik programının TÜBİTAK uygulama esaslarına uygun olması'
  ],
  required_docs = ARRAY[
    'AGY104-01 Proje Pazarı Başvuru Formu',
    'Etkinlik programı ve gündemi',
    'Davetli konuşmacı ve katılımcı listesi',
    'Etkinlik bütçesi ve ödeme belgeleri',
    'Etkinlik sonucu proje eşleşme raporu',
    'Katılımcı geri bildirim formları'
  ]
WHERE code = '1503';

-- 1505
UPDATE funds SET
  technical_scope = 'Üniversite ve araştırma kuruluşlarındaki bilgi ve teknolojinin ürün, süreç veya hizmete dönüştürülmesi. Müşteri kuruluşun (sanayici) ihtiyaç duyduğu Ar-Ge faaliyetinin üniversite/araştırma hastanesi tarafından yürütülmesi esasına dayanır. Proje kapsamında: yeni ürün geliştirme, mevcut ürün iyileştirme, süreç optimizasyonu, test/analiz hizmetleri, prototip üretimi ve teknoloji transferi faaliyetleri desteklenir.',
  eligibility = ARRAY[
    'Müşteri kuruluş: Türkiye''de yerleşik sermaye şirketi (KOBİ veya büyük ölçekli)',
    'Yürütücü kuruluş: Üniversite, vakıf üniversitesi veya eğitim-araştırma hastanesi',
    'Müşteri ve yürütücü arasında resmi işbirliği sözleşmesi imzalanması',
    'Projenin Ar-Ge niteliği taşıması ve ticarileşme potansiyeli olması',
    'Müşteri kuruluşun projeye nakdi katkı sağlaması (KOBİ %25, büyük %40)'
  ],
  required_docs = ARRAY[
    'PRODİS Proje Öneri Bilgileri Formu (AGY305)',
    'Müşteri-Yürütücü İşbirliği Sözleşmesi',
    'AGY315 Teknik Rapor (proje planı ve metodoloji)',
    'AGY505 YMM Raporu (dönemsel)',
    'Proje Sonuçları Uygulama Planı (ticarileşme planı)',
    'Müşteri kuruluş kurumsal belgeleri (imza sirküleri, vergi levhası)',
    'Yürütücü kuruluş onay yazısı (üniversite rektörlük/dekanlık)'
  ]
WHERE code = '1505';

-- 1507
UPDATE funds SET
  technical_scope = 'KOBİ''lerin rekabetçiliğini artıran yeni ürün, mevcut ürün geliştirme ve teknoloji Ar-Ge projeleri. TRL 3-7 arası projeler için uygundur. Desteklenen faaliyetler: yeni ürün tasarımı, prototip geliştirme, test ve doğrulama, süreç iyileştirme, yazılım geliştirme, malzeme araştırması, pilot üretim. KOBİ''lerin ilk Ar-Ge projesi deneyimini oluşturması hedeflenir.',
  eligibility = ARRAY[
    'KOBİ statüsünde olması (10-250 çalışan, 10M-125M TL ciro)',
    'Türkiye''de faaliyet gösteren sermaye şirketi olması',
    'Ar-Ge birimi kurması veya oluşturması',
    'En az 1 üniversite/araştırma kuruluşu ile işbirliği',
    'Proje TRL 3-7 aralığında olması',
    'İlk kez Ar-Ge projesi yürüten KOBİ''ler öncelikli',
    'Proje ekibinde en az 1 lisans mezunu personel'
  ],
  required_docs = ARRAY[
    'AGY101 Proje Öneri Bilgileri Formu (PRODİS üzerinden)',
    'AGY301 Ar-Ge Yardım İstek Formu',
    'Teknik doküman ve tasarım raporu',
    'AGY310 Mali Rapor (dönemsel)',
    'AGY320 YMM Raporu (dönemsel)',
    'AGY351 Proje Sonuç Raporu',
    'AGY360 Proje Sonuç Uygulama Planı (ticarileşme)',
    'Kuruluş bazlı ön kayıt belgesi',
    'KOBİ statü belgesi (KOBİ portalından)'
  ]
WHERE code = '1507';

-- 1509
UPDATE funds SET
  technical_scope = 'Uluslararası ortaklarla yürütülen Ar-Ge ve yenilik projelerinde teknik yeterlilik ve pazar erişimi desteği. Türk firmalarının uluslararası işbirlikleriyle teknoloji geliştirme kapasitesini artırması, ihracat potansiyeli oluşturması ve global pazarlara erişimi hedeflenir. EUREKA, Eurostars ve diğer uluslararası programlarla entegre projeler desteklenir.',
  eligibility = ARRAY[
    'Türkiye''de yerleşik sermaye şirketi',
    'Uluslararası Ar-Ge ve yenilik projesi (uluslararası ortak ile)',
    'Proje ekibinde ilgili alan lisans mezunu personel',
    'Uluslararası ortak/partner ile resmi işbirliği anlaşması',
    'Projenin TRL 3-9 aralığında olması',
    'Uluslararası pazar potansiyeli olan çıktı hedefi'
  ],
  required_docs = ARRAY[
    '1509 kılavuzu (AGY103-02) kapsamında proje öneri formu',
    'Uluslararası ortaklık anlaşması / MoU',
    'Teknik proje planı ve metodoloji',
    'Bütçe planı (TL ve döviz cinsinden)',
    'Proje ekibi özgeçmişleri',
    'Uluslararası ortak kurumsal belgeleri',
    'AGY300 Ar-Ge Yardım İstek Formu',
    'Dönem raporları (AGY320, AGY330, AGY350)'
  ]
WHERE code = '1509';

-- 1511
UPDATE funds SET
  technical_scope = 'Orta-yüksek teknoloji seviyeli, katma değeri yüksek ürün ve teknolojilerin geliştirilmesi. Teknoloji Odaklı Sanayi Hamlesi kapsamında öncelikli alanlarda (yapay zekâ, biyoteknoloji, ileri imalat, enerji, savunma, elektronik) projeler desteklenir. Bağımsız değerlendirme süreci ile projelerin teknik ve ekonomik fizibilitesi incelenir. TRL 1-9 arası, süre azami 36 ay.',
  eligibility = ARRAY[
    'Türkiye''de yerleşik sermaye şirketi (KOBİ veya büyük ölçekli)',
    'Öncelikli ürün veya teknoloji alanında proje olması',
    'Bağımsız değerlendirme sürecini geçirme',
    'Ekonomik fizibilite raporu sunma',
    'Proje ekibinde doktora/lisans uzman personel',
    'Yeterli Ar-Ge altyapısı ve kapasite'
  ],
  required_docs = ARRAY[
    'AGY111 Proje Öneri Formu (PRODİS üzerinden)',
    'Bağımsız Değerlendirme Raporu',
    'Ekonomik Fizibilite Raporu',
    'Teknik proje dosyası (detaylı metodoloji)',
    'Personel özgeçmişleri ve uzmanlık alanları',
    'Yetkilendirme belgesi (imza sirküleri)',
    'Kuruluş bazlı ön kayıt onay belgesi',
    'Dönem raporları (AGY320, AGY330, AGY350)',
    'Proje Sonuç Raporu (AGY360)'
  ]
WHERE code = '1511';

-- 1512
UPDATE funds SET
  technical_scope = 'Teknoloji tabanlı fikirlerin kavramsal aşamadan pazara kadar desteklenmesi. BiGG programının 1. aşaması: uygulayıcı kuruluşlar (TGB, TTO, teknopark) aracılığıyla girişimci adaylarının fikirlerini prototipe dönüştürmesi. TRL 1-5 aralığı. Desteklenen faaliyetler: fikir doğrulama, prototip geliştirme, pazar araştırması, iş modeli oluşturma, mentörlük.',
  eligibility = ARRAY[
    'Teknogirişim sertifikasına sahip olması veya başvurabilecek durumda olması',
    'Son 5 yıl içinde kurulmuş teknoloji tabanlı şirket',
    'Teknoloji tabanlı iş modeli (TTM) sunabilme',
    'En az 1 Ar-Ge personeli istihdam etme veya etme taahhüdü',
    'Proje TRL 1-5 aralığında olması',
    'Uygulayıcı kuruluş ile ortak başvuru'
  ],
  required_docs = ARRAY[
    'Teknogirişim sertifikası (veya başvuru belgesi)',
    'Ticaret sicil gazetesi (kuruluş belgesi)',
    'Proje teknik dokümanı (fikir ve prototip planı)',
    'Ar-Ge personeli özgeçmişleri',
    'Bütçe planlaması (girişimci ödeneği + uygulayıcı bedeli)',
    'Uygulayıcı kuruluş işbirliği protokolü',
    'İş modeli kanvası / değer önerisi'
  ]
WHERE code = '1512';

-- 1513
UPDATE funds SET
  technical_scope = 'Üniversite kaynaklı bilgi ve teknolojilerin sanayiye aktarılması ve ticarileştirilmesi. TTO''ların kurumsal kapasitelerinin artırılması (personel, ofis altyapısı, süreç yönetimi) ve hedef odaklı büyüme projeleri (patent başvuru, lisanslama, girişim oluşturma, spin-off). İki destek bileşeni: Kurumsal Kapasite (yıllık 1.250.000 TL, %80) ve Hedef Odaklı Büyüme (yıllık 1.750.000 TL, %40-%80).',
  eligibility = ARRAY[
    'Yükseköğretim kurumu bünyesinde TTO birimi',
    'YÖK onaylı TTO veya teknoloji geliştirme bölgesi (TGB) yöneticiliği',
    'TTO odaklı iş planı ve performans göstergeleri sunabilme',
    'TTO''da en az 3 personel istihdam etme',
    'Yıllık performans hedefleri (patent, lisans, girişim sayısı)'
  ],
  required_docs = ARRAY[
    'Proje öneri formu (PRODİS üzerinden)',
    'Bütçe formu (xlsx formatında)',
    'Performans göstergeleri tablosu (yıllık hedefler)',
    'TTO iş planı (3 yıllık stratejik plan)',
    'YÖK onay belgesi / TGB yöneticiliği belgesi',
    'TTO organizasyon şeması ve personel listesi',
    'Önceki dönem performans raporu (varsa)'
  ]
WHERE code = '1513';

-- 1514
UPDATE funds SET
  technical_scope = 'Teknoloji tabanlı şirketlerin ürün ve teknolojilerini ticarileştirmeleri için girişim sermayesi fon desteği. Tech-InvesTR programı kapsamında erken aşama teknoloji girişimlerine fon aracılığıyla yatırım yapılması desteklenir. Fon yöneticisi (TTO, TGB veya yetkili kuruluş) tarafından yönetilen fonlara TÜBİTAK %50 hibe + %10 genel gider desteği sağlar.',
  eligibility = ARRAY[
    'TTO, TGB veya yetkili kuruluş tarafından yönetilen fona yatırım yapılması',
    'Erken aşama teknoloji girişimlerine yatırım hedeflenmesi',
    'Başvuru ortakları (fon yöneticisi + yatırımcılar) arasında uygunluk şartları',
    'Fon yatırım stratejisi ve teknik due diligence kapasitesi',
    'En az 5 teknoloji girişimine yatırım yapma taahhüdü'
  ],
  required_docs = ARRAY[
    'Ortak başvuru formu (fon yöneticisi + ortaklar)',
    'Fon yatırım stratejisi ve portföy planı',
    'Teknoloji girişimi değerlendirme dosyası',
    'Fon yönetim sözleşmesi',
    'Yatırımcı ortakların kurumsal belgeleri',
    'Due diligence ve değerleme metodolojisi',
    'Hedef girişimlerin teknoloji analizi'
  ]
WHERE code = '1514';

-- 1515
UPDATE funds SET
  technical_scope = 'Öncül kuruluşların Ar-Ge laboratuvarlarının giderlerini destekleyerek seçilmiş alanlarda (yapay zekâ, kuantum, biyoteknoloji, ileri malzeme, enerji) yüksek teknoloji geliştirme kapasitesi oluşturma. Laboratuvar personeli, sarf malzemeleri, danışmanlık ve eğitim giderleri desteklenir. 5 yıl süre ile yıllık 25M TL destek.',
  eligibility = ARRAY[
    'Türkiye''de yerleşik sermaye şirketi',
    'Son 3 yılda en az 15 milyon TL Ar-Ge harcaması yapılmış olması',
    'Personelin en az %50''si Türk uyruklu',
    'Toplam personelin en az üçte biri doktora sahibi',
    'Seçilmiş teknoloji alanında laboratuvar altyapısı',
    'Ar-Ge laboratuvarı kurma/Genişletme planı'
  ],
  required_docs = ARRAY[
    'Niyet beyanı (ön başvuru)',
    'Başvuru formu (detaylı laboratuvar planı)',
    'Ar-Ge laboratuvarı teknik planı ve ekipman listesi',
    'Personel ve bütçe tablosu (5 yıllık)',
    'Son 3 yıl Ar-Ge harcamaları raporu',
    'Personel özgeçmişleri ve diploma belgeleri',
    'Türk uyruklu personel oranı belgesi'
  ]
WHERE code = '1515';

-- 1601
UPDATE funds SET
  technical_scope = 'Girişimcilik, üniversite-sanayi işbirliği ve özel sektör Ar-Ge kapasitesinin geliştirilmesi. Desteklenen faaliyetler: girişimcilik eğitim programları, mentörlük ağları, hızlandırma programları, üniversite-sanayi eşleştirme etkinlikleri, Ar-Ge kapasite analizi ve roadmap geliştirme, inovasyon yönetim sistemi kurulması.',
  eligibility = ARRAY[
    'Türkiye''de yerleşik şirket, üniversite, kamu araştırma merkezi veya vakıf',
    'Yenilik ve girişimcilik alanında kapasite artırma amacı',
    'Çağrıya göre ortaklık ve uygulama planı',
    'Proje çıktılarının sürdürülebilirliği ve yaygın etkisi',
    'En az 2 kuruluş işbirliği (çağrıya göre)'
  ],
  required_docs = ARRAY[
    'Çağrıya özel proje başvuru formu',
    'Uygulama esasları ve metodoloji',
    'Bütçe ve kapasite geliştirme planı',
    'Ortak kuruluşlar arası işbirliği protokolü',
    'Kapasite artırım roadmap''i (3 yıllık)',
    'Etki değerlendirme ve izleme planı',
    'Personel özgeçmişleri'
  ]
WHERE code = '1601';

-- 1602
UPDATE funds SET
  technical_scope = 'Ülke kaynaklı ulusal ve uluslararası patent başvuru sayısını artırmaya yönelik destek. TÜRKPATENT''e ulusal patent başvurusu, WIPO/PCT üzerinden uluslararası patent başvurusu ve ulusal fazlara girişgiderleri desteklenir. Patent inceleme, arama, vekillik ve çeviri giderleri kapsamdadır.',
  eligibility = ARRAY[
    'T.C. vatandaşı veya Türkiye''de yerleşik şirket, üniversite ya da kamu kurumu',
    'TÜRKPATENT veya WIPO''ya başvuru yapılmış olması',
    'Başvuru numarasının alınmış olması',
    'Patent konusunun teknoloji/yenilik içermesi',
    'Daha önce aynı patent için destek alınmamış olması'
  ],
  required_docs = ARRAY[
    'PD-100 Patent Başvuru Desteği Formu',
    'PD-100 Ulusal Patent Tescil Ödülü Formu (tescil sonrası)',
    'PD-120 Patent Tescil Vekili Formu (vekil aracılığıyla)',
    'PD-200 PCT Başvuru Desteği Formu (uluslararası)',
    'Patent başvuru numarası ve resmi belge',
    'Patent özeti ve teknik açıklama',
    'Vekillik sözleşmesi (varsa)',
    'Maliyet belgeleri (fatura, dekont)'
  ]
WHERE code = '1602';

-- 1612
UPDATE funds SET
  technical_scope = 'Teknoloji tabanlı fikirlerin kavramsal aşamadan pazara kadar desteklenmesi. BiGG 1. Aşama: Uygulayıcı kuruluşlar (TGB, TTO, teknopark) aracılığıyla girişimci adaylarının fikir geliştirme, prototip oluşturma, pazar doğrulama ve iş modeli oluşturma faaliyetleri. 36 ay süre ile hibrit destek (nakdi ödenek + hizmet).',
  eligibility = ARRAY[
    'Ortak başvuruda en fazla 4 kuruluş (uygulayıcı kuruluş + girişimciler)',
    'Kurum başına 1 başvuru',
    'Ortaklık ve işbirliği planı (uygulayıcı kuruluş-girişimci arası)',
    'Girişimci adayı: teknoloji tabanlı fikir sahibi',
    'Uygulayıcı kuruluş: TGB, TTO veya teknopark yöneticisi',
    '2026-2028 dönemine ait hedef tablosu sunabilme'
  ],
  required_docs = ARRAY[
    '2026-2028 hedef tablosu (performans göstergeleri)',
    'Program ekip özgeçmişleri (uygulayıcı + girişimci)',
    'İşbirliği sözleşmesi/protokolü (uygulayıcı-girişimci)',
    'Niyet mektubu (girişimci adayı tarafından)',
    'Teknoloji fikri dokümanı ve prototip planı',
    'Pazar araştırması ve iş modeli kanvası',
    'Bütçe planlaması (36 aylık)'
  ]
WHERE code = '1612';

-- 1613
UPDATE funds SET
  technical_scope = 'TTO''larda yeni teknoloji transfer profesyoneli istihdamı ve mevcut profesyonellerin devamı. Destek: personel maaşı (%95 TÜBİTAK) + genel giderler (%5) + performans hedeflerine göre ek destek. 24 ay süre ile 6 dönemlik takvim. TTP''nin görevleri: patent/lisans yönetimi, girişim oluşturma, üniversite-sanayi işbirliği, proje yazma.',
  eligibility = ARRAY[
    'Üniversite TTO birimi (YÖK onaylı)',
    'TTO mevzuatına uygun sermaye şirketi veya TGB yöneticisi',
    'Teknoloji transfer profesyoneli istihdam planı (24 ay)',
    'Performans hedefleri: patent başvuru, lisans, girişim, proje sayısı',
    'TTP''nin ilgili alanda en az lisans derecesine sahip olması'
  ],
  required_docs = ARRAY[
    'Çevrimiçi çağrı duyurusu üzerinden başvuru',
    'TTO öz değerlendirme formu (mevcut durum analizi)',
    'Performans hedefleri tablosu (24 aylık, 6 dönemlik)',
    'TTP özgeçmişi ve diploma belgeleri',
    'TTP iş tanımı ve görev sorumlulukları',
    'TTO kurumsal belgeler (YÖK onayı, organizasyon şeması)',
    'İstihdam sözleşmesi taslağı'
  ]
WHERE code = '1613';

-- 1701
UPDATE funds SET
  technical_scope = 'Ar-Ge projelerinin teknik, ekonomik ve yenilikçi yönlerinin değerlendirilmesi ve izlenmesi. Hizmet çağrısı: bağımsız uzmanlar aracılığıyla proje çıktılarının değerlendirilmesi, ekonomik fayda analizi, sürdürülebilirlik izlemesi. Mali destek sağlanmaz; değerlendirme hizmeti sunulur.',
  eligibility = ARRAY[
    'Türkiye''de yerleşik KOBİ veya büyük ölçekli kuruluş',
    'Proje bütçesi en az 5.000.000 TL olan tamamlanmış/devam eden Ar-Ge projesi',
    'Değerlendirme ve izleme hizmeti için başvuru',
    'Proje çıktılarının test edilebilir olması'
  ],
  required_docs = ARRAY[
    'Çağrı metni ve uygulama esasları',
    'Proje değerlendirme dosyası (teknik rapor)',
    'Harcama ve gider formları (AGY330, AGY350)',
    'Proje sonuç raporu (AGY360)',
    'Ekonomik etki analiz raporu',
    'Bağımsız değerlendirme talep dilekçesi'
  ]
WHERE code = '1701';

-- 1702
UPDATE funds SET
  technical_scope = 'Patentli teknolojilerin teknoloji sağlayıcıdan (üniversite/araştırma kurumu) müşteri kuruluşlara (sanayici) transfer edilmesi ve sanayileştirilmesi. Desteklenen faaliyetler: patent lisanslama, teknoloji adaptasyonu, prototip üretimi, test/doğrulama, pilot üretim, ticarileşme. Kavram doğrulama aşaması 500.000 TL, ana proje 4M TL.',
  eligibility = ARRAY[
    'Müşteri kuruluş ve teknoloji sağlayıcı ortaklığı (ikili başvuru)',
    'En az bir patent lisanslama/devralma şartı (tüzel işlem)',
    'Tescil şartı yoksa araştırma/inceleme raporu sunma',
    'Müşteri kuruluş: Türkiye''de yerleşik sermaye şirketi',
    'Teknoloji sağlayıcı: üniversite, araştırma kurumu, TTO',
    'Proje süresi: asgari 24 ay, azami 60 ay'
  ],
  required_docs = ARRAY[
    'Teknoloji Transfer Sözleşmesi (lisanslama/devir)',
    'Patent Özet Tablosu (patent bilgileri)',
    'Patent Tescil Belgeleri (veya araştırma raporu)',
    'Değerleme Raporu (teknolojinin ekonomik değeri)',
    'Proje Sonuçları Uygulama Planı (ticarileşme)',
    'Teknik proje dosyası (adaptasyon ve üretim planı)',
    'Bütçe planı (kavram + ana proje)',
    'AGY300 Ar-Ge Yardım İstek Formu'
  ]
WHERE code = '1702';

-- 1707
UPDATE funds SET
  technical_scope = 'Hızlı ürüne dönüşebilecek, ticarileşme potansiyeli yüksek Ar-Ge projelerinin müşteri-tedarikçi işbirliğiyle finanse edilmesi. Siparişe dayalı Ar-Ge modeli: müşteri kuruluşun ihtiyaç spec''lerini KOBİ tedarikçinin Ar-Ge ile karşılaması. TRL 2-9 arası. Destek: kamu hibesinin %40''ı, müşteri %40 ödeme, KOBİ %20 katkı. 24 ay, 10M TL.',
  eligibility = ARRAY[
    'Müşteri ve KOBİ tedarikçi kuruluşun ortak başvurusu',
    'İlişkili kişi kapsamı dışında olma (bağımsız ortaklık)',
    'İşbirliği sözleşmesi (sipariş spec''leri ve teslim koşulları)',
    'Müşteri kuruluşun en az %40 ödeme yapması',
    'KOBİ tedarikçi: Türkiye''de yerleşik KOBİ',
    'Müşteri kuruluş: Türkiye''de yerleşik sermaye şirketi',
    'Projenin ticarileşme potansiyeli olması'
  ],
  required_docs = ARRAY[
    'Proje Önerisi (PRODİS formu AGY101)',
    'Ekonomik Fizibilite Raporu',
    'İşbirliği Sözleşmesi (müşteri-tedarikçi)',
    'Teknik Fizibilite Raporu (spec''ler ve teslim planı)',
    'Ar-Ge harcaması ve gider belgeleri',
    'Dönem Raporu Paketi (AGY320, AGY330, AGY350)',
    'Müşteri kuruluş %40 ödeme taahhüdü',
    'KOBİ statü belgesi'
  ]
WHERE code = '1707';

-- 1709
UPDATE funds SET
  technical_scope = 'Uluslararası pazara yönelik yenilikçi ürün, süreç ve hizmet geliştirme projeleri. Eurostars-3 programı kapsamında KOBİ koordinatörlüğünde uluslararası konsorsiyum projeleri. TRL 4-9 arası. Desteklenen faaliyetler: ürün geliştirme, prototip, test, pazar doğrulama, uluslararası işbirliği. 36 ay, Türk ortak başına 600.000 EUR.',
  eligibility = ARRAY[
    'Eurostars uluslararası çağrısına başvuru (EUREKA portalı)',
    'En az bir Türk ve bir Eurostars ülke ortağı',
    'Konsorsiyum ve proje yürütücüsü KOBİ olması (tercih)',
    'Projede doktoralı veya uzman personel bulunması',
    'Proje çıktısının uluslararası pazar potansiyeli',
    'Türk ortağın Türkiye''de yerleşik sermaye şirketi olması'
  ],
  required_docs = ARRAY[
    'Uluslararası başvuru formu (Eurostars portalı)',
    'Güncel kurumlar vergisi beyannamesi',
    'Firma imza sirküleri ve yetki belgesi',
    'Proje ekibi özgeçmişleri',
    'Proje önerisi (teknik ve iş planı)',
    'Konsorsiyum anlaşması (ülke ortakları arası)',
    'Bütçe planı (EUR ve TL cinsinden)',
    'AGY300 Ar-Ge Yardım İstek Formu (ulusal)'
  ]
WHERE code = '1709';

-- 1711
UPDATE funds SET
  technical_scope = 'Yapay zekâ teknolojilerinin müşteri kuruluş ihtiyaçlarına uygun ürün ve çözümlere dönüştürülmesi. Desteklenen AI alanları: makine öğrenmesi, derin öğrenme, doğal dil işleme, bilgisayarlı görü, yapay zekâ tabanlı optimizasyon, otonom sistemler. Konsorsiyum yapısı: en az 1 AI KOBİ + 1 üniversite/araştırma + müşteri kuruluş. 24 ay, 10M TL.',
  eligibility = ARRAY[
    'Konsorsiyum kurulması (en az 3 ortak)',
    'En az 1 yapay zekâ KOBİ ve en az 1 üniversite/araştırma birimi',
    'Müşteri kuruluşun teknoloji ihtiyacının net tanımı',
    'Proje ekibinde yapay zekâ ve alan uzmanları',
    'Proje çıktısının ticarileşme potansiyeli',
    'Veri seti ve AI altyapısı uygunluğu'
  ],
  required_docs = ARRAY[
    'PRODİS Ön Kayıt Formu',
    'Proje Öneri Paketi (teknik doküman + AI metodoloji)',
    'Niyet Beyanı (konsorsiyum ortakları arası)',
    'İşbirliği Sözleşmesi (konsorsiyum anlaşması)',
    'Müşteri kuruluş teknoloji ihtiyacı dokümanı',
    'Veri seti ve AI model planı',
    'Proje ekibi özgeçmişleri (AI uzmanlık)',
    'Bütçe planı (24 aylık)'
  ]
WHERE code = '1711';

-- 1719
UPDATE funds SET
  technical_scope = 'Uluslararası ortaklı, piyasaya sürülebilir ürün, süreç veya hizmet geliştirme projeleri. EUREKA Network çağrıları kapsamında ülke ortakları ile konsorsiyum kurularak Ar-Ge projeleri yürütülmesi. TRL 3-9 arası. Çağrı duyurusuna göre teknoloji alanları belirlenir. Süre ve bütçe çağrıya özeldir.',
  eligibility = ARRAY[
    'Sermaye şirketi kurulmuş olması (en az 1 ortak)',
    'Akademik kurumların en az bir sermaye şirketi ortağıyla başvurması',
    'Ayrıntılı çağrı duyurusuna uygun konsorsiyum yapısı',
    'En az 2 ülke ortağı (EUREKA üyesi)',
    'Proje çıktısının uluslararası pazar potansiyeli'
  ],
  required_docs = ARRAY[
    'Çağrı duyurusuna özel başvuru formu',
    'Uluslararası ortaklık ve proje önerisi',
    'Konsorsiyum anlaşması (ülke ortakları arası)',
    'Bütçe planı (ülke bazında dağılım)',
    'Teknik proje planı ve metodoloji',
    'Proje ekibi özgeçmişleri',
    'EUREKA proje uygulama planı'
  ]
WHERE code = '1719';

-- 1812
UPDATE funds SET
  technical_scope = 'Erken aşama teknoloji fikirlerinin katma değerli işletmelere ve istihdam potansiyeli yüksek girişimlere dönüştürülmesi. BiGG Yatırım programı: Aşama 2 (18 ay, 1.350.000 TL yatırım) ve Aşama 3 (36 ay). Destek: %3 hisse karşılığı yatırım + hızlandırma programı + mentörlük. Temiz teknolojide 900.000 TL yatırım limiti.',
  eligibility = ARRAY[
    'Üniversite öğrencisi veya mezunu girişimci',
    'Daha önce ilgili BiGG/Teknogirişim desteği almamış olmak',
    'Aşama 2 için iş planı ve uygulayıcı kuruluş onayı',
    'Yatırım ve pay sahipliği sözleşmesi kabulü (%3 hisse)',
    'Teknoloji tabanlı iş modeli ve Ar-Ge içeriği',
    'YÖK denklik belgesi (yurt dışı mezunları için)'
  ],
  required_docs = ARRAY[
    'Güncel öğrenci belgesi veya mezuniyet belgesi',
    'YÖK denklik belgesi (yurt dışı mezunları için)',
    'Detaylı iş planı (3-5 yıllık)',
    'Varsa Ar-Ge proje çıktıları ve prototip',
    'Etki Kurulu (Impact Board) belgesi',
    'Uygulayıcı kuruluş onay yazısı',
    'Yatırım ve pay sahipliği sözleşmesi',
    'Teknoloji ve pazar analizi'
  ]
WHERE code = '1812';

-- 1831
UPDATE funds SET
  technical_scope = 'Yeşil dönüşüm mevzuatına uyum için danışmanlık, kapasite analizi ve çözüm önerisi desteği. KOBİ''lerin AB Yeşil Mutabakat, CBAM, Sürdürülebilirlik Raporlama Direktifi (CSRD) gibi mevzuata uyum hazırlığı. Desteklenen faaliyet: teknik danışmanlık, karbon ayak izi analizi, yaşam döngüsü değerlendirmesi (LCA), yeşil dönüşüm roadmap''i. 3-6 ay, 310.000 TL.',
  eligibility = ARRAY[
    'Küçük ve orta büyüklükte Türkiye''de yerleşik KOBİ',
    'Ortaklı başvuru kabul edilmez (tek KOBİ)',
    'Bir KOBİ en fazla 3 kez destek alabilir',
    'Yeşil dönüşüm mevzuatına uyum ihtiyacı olması',
    'Danışmanlık hizmeti alacak kapasitede olması'
  ],
  required_docs = ARRAY[
    'Dönem raporu (faaliyet özeti)',
    'Teknik rapor (kapasite analizi ve yol haritası)',
    'Hizmet alım faturası',
    'Ödeme belgesi/banka dekontu',
    'Karbon ayak izi / LCA raporu (varsa)',
    'Yeşil dönüşüm roadmap dokümanı',
    'KOBİ statü belgesi'
  ]
WHERE code = '1831';

-- 1832
UPDATE funds SET
  technical_scope = 'Temiz enerji, kaynak verimliliği, döngüsel ekonomi ve sürdürülebilir üretim odaklı sanayi Ar-Ge projeleri. TRL 3-9 arası. Desteklenen alanlar: karbon azaltım teknolojileri, atık geri kazanım, enerji verimliliği, yeşil hidrojen, döngüsel ekonomi modelleri, sürdürülebilir malzeme. Deprem bölgesi KOBİ''ler %90 destek. 24 ay.',
  eligibility = ARRAY[
    'Türkiye''de yerleşik sermaye şirketi',
    'Tescil tarihi 2 yıl ve üzeri',
    'Yürütücü kuruluşun en az %75 özel sektör olması',
    'En az bir Yeşil Dönüşüm Göstergesi hedefi (karbon azaltım, su tasarrufu vb.)',
    'Proje TRL 3-9 aralığında olması',
    'Ar-Ge niteliği taşıyan yeşil dönüşüm faaliyeti'
  ],
  required_docs = ARRAY[
    'PRODİS Proje Önerisi (AGY101)',
    'Ekonomik Fizibilite Raporu',
    'Çevresel ve Sosyal Etki Beyan Formu',
    'Banka Referans Mektubu',
    'Mikro/Küçük İşletme Teminat Senedi (KOBİ için)',
    'Vergi beyannamesi (son yıl kurumlar vergisi)',
    'Spin-off Değerlendirme Formu',
    'Yeşil Dönüşüm Göstergesi hedef tablosu',
    'AGY300 Ar-Ge Yardım İstek Formu',
    'Dönem raporları (AGY320, AGY330, AGY350)'
  ]
WHERE code = '1832';

-- 1833
UPDATE funds SET
  technical_scope = 'Kurumlar ve platform ortaklarının birlikte yürüttüğü yüksek katma değerli yeşil ürün ve süreç geliştirme programı. Platform yaklaşımı: 3-10 ortak kuruluşun ortak proje yürütmesi. TRL 3-9. Desteklenen alanlar: yeşil teknoloji, döngüsel ekonomi, karbon nötr üretim, temiz enerji, sürdürülebilir tarım. 30 ay (uzatmayla 36). Kuruluş başına 28M/70M TL.',
  eligibility = ARRAY[
    'Yürütücü olarak büyük veya orta ölçekli sermaye şirketi',
    'Platformda en az 3 ortak, en fazla 10 ortak',
    'En az bir Yeşil Dönüşüm Göstergesi hedefi',
    'Lisans dereceli personel istihdamı',
    'Çevresel ve sosyal uygunluk beyanı',
    'Platform ortakları arası işbirliği sözleşmesi'
  ],
  required_docs = ARRAY[
    'Ürünleştirme Programı Önerisi (PRODİS)',
    'Ekonomik Fizibilite Raporu',
    'Tanıtım sunumu ve videosu',
    'İşbirliği Sözleşmesi (platform ortakları arası)',
    'Fikri Sınai Mülkiyet Hakları Sözleşmesi',
    'Çevresel ve Sosyal Risk Yönetimi Beyan Formu',
    'Banka Referans Mektubu',
    'Ar-Ge Harcamaları Tespit Raporu',
    'Ortaklık yapısı belgesi (hissedarlık/org. şema)',
    'Spin-off Değerlendirme Formu',
    'Son yıl kurumlar vergisi beyannamesi'
  ]
WHERE code = '1833';

-- ASL-SAV
UPDATE funds SET
  technical_scope = 'Aselsan''ın savunma sanayi Ar-Ge iş ortaklığı çağrısı. Radar sistemleri, elektronik harp, siber güvenlik, yapay zekâ, otonom sistemler, RF/mikrodalga, görüntü işleme konularında projeler. TRL 5-9 arası. Savunma Sanayi Başkanlığı (SSB) onaylı proje kapsamında Aselsan ile iş ortaklığı. 800.000 TL destek, 2027 son başvuru.',
  eligibility = ARRAY[
    'Savunma, yazılım veya imalat sektöründe faaliyet gösteren firma',
    'TRL 5-9 aralığında olgunlaşmış teknoloji',
    'Savunma sanayi teknolojilerine uygunluk',
    'SSB onaylı proje veya Aselsan ihtiyaç spec''lerine uygunluk',
    'Güvenlik clearance (güvenlik soruşturması) uygunluğu',
    'İlgili alanlarda Ar-Ge yetkinliği ve referans'
  ],
  required_docs = ARRAY[
    'Güvenlik clearance belgesi (SSB''den)',
    'Teknik doküman (teknoloji ve metodoloji)',
    'Ar-Ge yetkinlik raporu (geçmiş projeler)',
    'Personel güvenlik belgeleri (SGK tescil, sabıka kaydı)',
    'Aselsan iş ortaklığı protokolü',
    'Proje önerisi (Aselsan formatında)',
    'Bütçe planı (12 aylık)'
  ],
  application_system = 'Aselsan iştirak/ortak portalı üzerinden',
  application_method = 'Aselsan ile iş ortaklığı protokolü sonrası başvuru',
  supported_expenses = ARRAY['Personel giderleri (savunma alanı uzmanları)','Sarf malzemeleri (elektronik komponent)','Test ve ölçüm ekipmanları','Yazılım lisansları','Seyahat (Aselsan tesisleri arası)'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat','İhracat/komisyon giderleri'],
  notes = ARRAY['Savunme Sanayi Başkanlığı onayı gerekir','Güvenlik soruşturması şartı','TRL 5-9 aralığında olgun teknoloji','800.000 TL destek limiti','2027-01-31 son başvuru tarihi'],
  source_links = ARRAY['https://www.aselsan.com.tr']
WHERE code = 'ASL-SAV';

-- H2020-SME
UPDATE funds SET
  technical_scope = 'Avrupa Birliği Horizon Europe programı kapsamında KOBİ instrument (SME Instrument) desteği. Uluslararası ölçekte Ar-Ge ve inovasyon projeleri. TRL 4-8 arası. İki aşama: Phase 1 (fizibilite, 50.000 EUR) ve Phase 2 (Ar-Ge ve ticarileşme, 2.500.000 EUR). Avans ödeme, hibe şeklinde.',
  eligibility = ARRAY[
    'AB üyesi veya ortak ülkeden KOBİ olması',
    'Uluslararası konsorsiyum (en az 3 ülke)',
    'TRL 4-8 aralığında olması',
    'İnovatif teknoloji içermesi ve pazar potansiyeli',
    'Avrupa Birliği SME statüsüne uygunluk'
  ],
  required_docs = ARRAY[
    'EU başvuru formu (Horizon Europe portalı)',
    'Konsorsiyum anlaşması (Consortium Agreement)',
    'Teknik doküman (Technical Description)',
    'Etki değerlendirme raporu (Impact Assessment)',
    'Bütçe planlaması (EUR cinsinden)',
    'İş planı (Business Plan / Commercialization Strategy)',
    'KOBİ statü belgesi (EU SME definition)',
    'Etik komite onayı (varsa)'
  ],
  application_system = 'EU Funding & Tenders Portal üzerinden',
  application_method = 'Çağrı duyurusuna göre iki aşamalı başvuru',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Teçhizat (Ar-Ge amaçlı)','Alt sözleşme (subcontracting)','Yardımcı hizmetler','Seyahat'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat','Vergi/ceza'],
  notes = ARRAY['Avrupa Birliği hibesi (TÜBİTAK değil)','Phase 1: 50.000 EUR fizibilite','Phase 2: 2.500.000 EUR Ar-Ge + ticarileşme','Avans ödeme sistemi (%70 başında, %30 sonunda)','İngilizce başvuru zorunluluğu'],
  source_links = ARRAY['https://ec.europa.eu/info/funding-tenders','https://single-market-economy.ec.europa.eu']
WHERE code = 'H2020-SME';

-- OR-PoC
UPDATE funds SET
  technical_scope = 'Oyak Renault''un ileri imalat teknolojileri ihtiyaçları için açık inovasyon çağrısı. Robotik, otomasyon, IoT, verimlilik optimizasyonu, kalite kontrol, endüstri 4.0 çözümleri konularında PoC (Proof of Concept) projeleri. TRL 4-8 arası. 500.000 TL PoC bütçesi. 2026-11-15 son başvuru.',
  eligibility = ARRAY[
    'İleri imalat veya yazılım sektöründe faaliyet gösteren firma',
    'TRL 4-8 aralığında olgunlaşmış teknoloji',
    'Otomotiv/imalat teknolojilerine uygunluk',
    'Oyak Renault ihtiyaç spec''lerine çözüm sunabilme',
    'PoC süresi 6-12 ay arası'
  ],
  required_docs = ARRAY[
    'Konsept kanıtlama (PoC) raporu',
    'Teknik doküman (teknoloji ve metodoloji)',
    'Şirket tanıtım dosyası (capability deck)',
    'Referans projeler (geçmiş uygulama örnekleri)',
    'Oyak Renault ihtiyaç spec''lerine uygunluk analizi',
    'Bütçe planı (PoC 6-12 ay)'
  ],
  application_system = 'Oyak Renault açık inovasyon portalı üzerinden',
  application_method = 'Çağrı duyurusuna göre konsept sunumu + değerlendirme',
  supported_expenses = ARRAY['PoC geliştirme giderleri','Prototip malzemeleri','Test ve ölçüm','Yazılım/lisans giderleri','Personel (PoC süresi)'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat','Sermaye harcaması'],
  notes = ARRAY['Oyak Renault ihtiyaç spec''lerine uygun PoC gerekir','TRL 4-8 aralığında olgun teknoloji','500.000 TL PoC bütçesi','2026-11-15 son başvuru','6-12 ay PoC süresi'],
  source_links = ARRAY['https://www.oyakrenault.com.tr']
WHERE code = 'OR-PoC';

-- VST-IoT
UPDATE funds SET
  technical_scope = 'Vestel''in dijital dönüşüm ve IoT çözümleri için PoC bütçesi. Akıllı ev, endüstriyel IoT, enerji yönetimi, bağlı cihaz teknolojileri, edge computing, sensör ağları konularında PoC projeleri. TRL 3-7 arası. 400.000 TL PoC bütçesi. 2026-12-01 son başvuru.',
  eligibility = ARRAY[
    'Yazılım veya imalat sektöründe faaliyet gösteren firma',
    'TRL 3-7 aralığında teknoloji',
    'IoT/dijital dönüşüm teknolojilerine uygunluk',
    'Vestel ihtiyaç alanlarına (akıllı ev, endüstriyel IoT, enerji) çözüm',
    'PoC süresi 3-9 ay arası'
  ],
  required_docs = ARRAY[
    'Konsept kanıtlama (PoC) raporu',
    'Teknik doküman (IoT mimarisi ve metodoloji)',
    'Şirket tanıtım dosyası',
    'Vestel ihtiyaç alanına uygunluk analizi',
    'Bütçe planı (PoC 3-9 ay)'
  ],
  application_system = 'Vestel açık inovasyon portalı üzerinden',
  application_method = 'Çağrı duyurusuna göre konsept sunumu + değerlendirme',
  supported_expenses = ARRAY['PoC geliştirme giderleri','IoT donanım ve sensör malzemeleri','Yazılım/lisans giderleri','Bulut/bilişim altyapısı','Test ve ölçüm'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat','Sermaye harcaması'],
  notes = ARRAY['Vestel ihtiyaç alanlarına (akıllı ev, IoT, enerji) çözüm gerekir','TRL 3-7 aralığında teknoloji','400.000 TL PoC bütçesi','2026-12-01 son başvuru','3-9 ay PoC süresi'],
  source_links = ARRAY['https://www.vestel.com.tr']
WHERE code = 'VST-IoT';

-- EUREKA-SEYAHAT
UPDATE funds SET
  eligibility = ARRAY[
    'Eureka çağrısına başvurabilecek Türkiye''de yerleşik şirket temsilcisi',
    'Çağrı sayfasındaki seyahat şartlarına uygunluk',
    'Konsorsiyum kurma amacıyla seyahat (başka amaçlı değil)',
    'En az 1潜在 uluslararası ortak ile görüşme planı'
  ],
  required_docs = ARRAY[
    'Başvuru formu şablonu (Eureka seyahat desteği)',
    'Seyahat ve toplantı planı (gün-gün ajanda)',
    'Şirket bilgileri ve yetki belgesi',
    'Potansiyel uluslararası ortaklarla görüşme talep yazışmaları',
    'Seyahat gider faturaları (uçak, konaklama)',
    'Toplantı tutanakları/raporu (sonrasında)'
  ]
WHERE code = 'EUREKA-SEYAHAT';

-- EUROSTARS-KOORD
UPDATE funds SET
  eligibility = ARRAY[
    'Türkiye''de yerleşik yenilikçi KOBİ',
    'Eurostars projesinde koordinatörlük hedefi',
    'Çağrı duyurusundaki güncel şartlara uygunluk',
    'KOBİ''nin önceki Eurostars/EUREKA deneyimi (tercih)',
    'Proje yazma ve sunma kapasitesi'
  ],
  required_docs = ARRAY[
    'Koordinatörlük genel başvuru formu',
    'Proje yazma-sunma eğitim planı',
    'Koordinasyon bütçesi (detaylı kalemler)',
    'KOBİ statü belgesi',
    'Önceki proje deneyimi belgeleri (varsa)',
    'Eurostars projesi koordinatör taahhüdü'
  ]
WHERE code = 'EUROSTARS-KOORD';

-- UFUK-AVRUPA
UPDATE funds SET
  eligibility = ARRAY[
    'Ufuk-Avrupa (Horizon Europe) çağrı şartlarına uygunluk',
    'Uluslararası konsorsiyum ve proje konusu',
    'TÜBİTAK ve AB program koşullarının birlikte incelenmesi',
    'En az 3 ülke ortağı (çoğu çağrıda)',
    'İngilizce başvuru kapasitesi'
  ],
  required_docs = ARRAY[
    'Çağrıya özel başvuru formu (Horizon Europe portalı)',
    'Konsorsiyum belgeleri (Consortium Agreement)',
    'Teknik proje önerisi (Technical Annex)',
    'Bütçe ve etki planı (Impact & Budget)',
    'İş planı ve ticarileşme stratejisi',
    'Ortak kuruluşların yetki belgeleri',
    'Etik komite onayı (gerektiğinde)'
  ]
WHERE code = 'UFUK-AVRUPA';