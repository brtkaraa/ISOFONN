-- Populate all funds with detailed Excel data: supported/excluded expenses, application system/method, notes, source links, and richer descriptions/technical scopes.

UPDATE funds SET
  description = '1501 kodlu ulusal hibe programı. KOBİ ölçeğindeki kuruluşların Ar-Ge, teknoloji geliştirme ve yenilikçilik faaliyetlerini destekler. Proje bazlı destek sağlanır; hibe şeklinde geri ödeme yoktur.',
  technical_scope = 'Ürün, süreç veya hizmet geliştirmeye yönelik ulusal sanayi Ar-Ge ve yenilik projeleri. TRL 1-9 arası tüm teknoloji olgunluk seviyeleri desteklenir. Proje sonunda ticarileşme potansiyeli olan çıktılar beklenir.',
  application_system = 'PRODİS (Çevrimiçi Proje Destek Sistemi) üzerinden e-imza ile başvuru',
  application_method = 'Kuruluş bazlı ön kayıt sonrası çevrimiçi proje önerisi sunumu',
  supported_expenses = ARRAY['Personel giderleri (araştırmacı, teknisyen)','Seyahat giderleri','Sarf malzemeleri','Yardımcı hizmetler (danışmanlık, dış test)','Genel giderler (toplam bütçenin %3-5''i)','Makine/teçhizat (sadece Ar-Ge amaçlı)'],
  excluded_expenses = ARRAY['Pazarlama ve satış giderleri','Normal üretim giderleri','Bina/inşaat giderleri','Hisse senedi alımı','Vergi/ceza/gümrük giderleri'],
  notes = ARRAY['İlk 5 projede %75, sonraki projelerde %60 destek oranı uygulanır','En az 1 üniversite/araştırma kuruluşu ile işbirliği zorunludur','KOBİ olma şartı aranır','Proje süresi 24 ay, şartlı uzatmayla en fazla 36 ay'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1501']
WHERE code = '1501';

UPDATE funds SET
  description = '1503 kodlu sürekli açık program. Üniversite, araştırma ve özel sektör temsilcilerini proje işbirliği için buluşturur. Proje pazarı etkinliklerinin organize edilmesi ve bu etkinliklerdeki proje eşleşmeleri desteklenir.',
  technical_scope = 'Üniversite, araştırma ve özel sektör temsilcileri arasında proje pazarı ve işbirliği ortamı oluşturulması. Etkinlik sonunda proje önerilerinin eşleştirilmesi ve işbirliklerinin başlatılması hedeflenir.',
  application_system = 'PRODİS üzerinden çevrimiçi başvuru',
  application_method = 'Etkinlik düzenleyecek kuruluşun proje önerisi sunması',
  supported_expenses = ARRAY['Etkinlik organizasyon giderleri','Seyahat ve konaklama giderleri','Tanıtım ve yayım giderleri','Davetli konuşmacı giderleri'],
  excluded_expenses = ARRAY['Altyapı/yatırım giderleri','Personel maaşı (etkinlik dışı)','Bina/teçhizat alımı'],
  notes = ARRAY['Sürekli açık bir programdır','Etkinlikte en az bir üniversite katılımı zorunludur','Sanayi veya ticaret odası, birlik ya da ihracatçı birliği başvuru sahibi olabilir'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1503']
WHERE code = '1503';

UPDATE funds SET
  description = '1505 kodlu sürekli açık program. Üniversitelerdeki bilgi ve teknolojinin sanayiye aktarılmasını destekler. Müşteri kuruluş (sanayici) ile yürütücü kuruluş (üniversite/araştırma hastanesi) arasında Ar-Ge işbirliği projeleri desteklenir.',
  technical_scope = 'Üniversite ve araştırma kuruluşlarındaki bilgi ve teknolojinin ürün, süreç veya hizmete dönüştürülmesi. Müşteri kuruluşun ihtiyaç duyduğu Ar-Ge faaliyetinin üniversite tarafından yürütülmesi esasına dayanır.',
  application_system = 'PRODİS (Çevrimiçi Proje Destek Sistemi) üzerinden e-imza ile başvuru',
  application_method = 'Müşteri kuruluş ve yürütücü kuruluş ortak başvurusu. PRODİS üzerinden proje öneri bilgileri formu (AGY305), teknik rapor (AGY315) ve YMM raporu (AGY505) sunulur.',
  supported_expenses = ARRAY['Personel giderleri (üniversite araştırmacıları)','Sarf malzemeleri ve laboratuvar giderleri','Seyahat giderleri','Yardımcı hizmetler (danışmanlık, dış test)','Genel giderler (toplam bütçenin %3-5''i)','Teçhizat/kıymetli demirbaş (sadece Ar-Ge amaçlı)'],
  excluded_expenses = ARRAY['Pazarlama ve satış giderleri','Normal üretim giderleri','Bina/inşaat giderleri','Vergi/ceza/gümrük giderleri','Müşteri kuruluşun kendi personel giderleri'],
  notes = ARRAY['KOBİ müşteride %75, büyük müşteride %60 TÜBİTAK desteği sağlanır','Müşteri kuruluş Türkiye''de yerleşik sermaye şirketi olmalıdır','Yürütücü kuruluş üniversite, vakıf üniversitesi veya araştırma hastanesi olabilir','Müşteri ve yürütücü arasında işbirliği sözleşmesi zorunludur','Süre en fazla 24 ay','Başvuru için PRODİS sistemi kullanılır'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1505','https://teydeb.tubitak.gov.tr']
WHERE code = '1505';

UPDATE funds SET
  description = '1507 kodlu KOBİ Ar-Ge başlangıç destek programı. KOBİ''lerin ilk kez veya öncelikli Ar-Ge projesi yürütmesini teşvik eder. Yeni ürün, mevcut ürün geliştirme ve teknoloji Ar-Ge projeleri desteklenir.',
  technical_scope = 'KOBİ''lerin rekabetçiliğini artıran yeni ürün, mevcut ürün geliştirme ve teknoloji Ar-Ge projeleri. TRL 1-7 arası projeler için uygundur.',
  application_system = 'PRODİS üzerinden e-imza ile başvuru',
  application_method = 'Kuruluş bazlı ön kayıt sonrası çevrimiçi proje önerisi sunumu',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Seyahat giderleri','Yardımcı hizmetler','Genel giderler (%3-5)','Küçük teçhizat alımı'],
  excluded_expenses = ARRAY['Pazarlama/satış giderleri','Normal üretim giderleri','Bina/inşaat','Hisse senedi alımı'],
  notes = ARRAY['%75 destek oranı tüm KOBİ''ler için geçerlidir','Proje bütçesi 3.500.000 TL ile sınırlıdır','Süre en fazla 18 ay','İlk kez Ar-Ge projesi yürüten KOBİ''ler önceliklidir'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1507']
WHERE code = '1507';

UPDATE funds SET
  description = '1511 kodlu Teknoloji Odaklı Sanayi Hamlesi programı. Öncelikli sektörlerde yüksek katma değerli ürünlerin Türkiye''de üretimini ve teknoloji geliştirmeyi destekler.',
  technical_scope = 'Orta-yüksek teknoloji seviyeli, katma değeri yüksek ürün ve teknolojilerin geliştirilmesi. Bağımsız değerlendirme ve ekonomik fizibilite süreci vardır.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Ön kayıt, bağımsız değerlendirme, ardından AGY111 formu sunumu',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Seyahat','Yardımcı hizmetler','Genel giderler','Makine/teçhizat (Ar-Ge amaçlı)'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat','Vergi/ceza'],
  notes = ARRAY['KOBİ %75, büyük ölçekli %50 destek oranı','KOBİ üst limiti 20M TL, büyük ölçekli 40M TL','Süre çağrıya göre, azami 36 ay','Bağımsız değerlendirme raporu gerekir'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1511']
WHERE code = '1511';

UPDATE funds SET
  description = '1512 kodlu çağrı. Girişimci adaylarının teknoloji ve yenilik fikirlerini uygulayıcı kuruluşlar aracılığıyla destekler. BiGG programının 1. aşamasını oluşturur.',
  technical_scope = 'Teknoloji tabanlı fikirlerin kavramsal aşamadan pazara kadar desteklenmesi. Erken aşama girişimcilik ve fikir geliştirme odaklıdır.',
  application_system = 'Çağrı duyurusu üzerinden çevrimiçi başvuru',
  application_method = 'Uygulayıcı kuruluş ile ortak başvuru',
  supported_expenses = ARRAY['Girişimci ödenekleri','Uygulayıcı kuruluş hizmet bedelleri','Eğitim ve mentörlük giderleri','Prototip geliştirme giderleri'],
  excluded_expenses = ARRAY['Pazarlama/satış','Bina/inşaat','Normal üretim'],
  notes = ARRAY['Ortak başvuruda en fazla 4 kuruluş','Kurum başına 1 başvuru','2025-1 çağrısı kapanmıştır, yeni çağrı beklenmektedir'],
  source_links = ARRAY['https://www.tubitak.gov.tr/bigg']
WHERE code = '1512';

UPDATE funds SET
  description = '1513 kodlu program. Üniversite bünyesindeki teknoloji transfer ofislerinin ticarileştirme faaliyetlerini destekler. Kurumsal kapasite ve hedef odaklı büyüme olmak üzere iki ana destek bileşeni vardır.',
  technical_scope = 'Üniversite kaynaklı bilgi ve teknolojilerin sanayiye aktarılması ve ticarileştirilmesi. TTO''ların kurumsal kapasitelerinin artırılması ve hedef odaklı projelerinin desteklenmesi.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Üniversite TTO''su tarafından proje önerisi sunumu',
  supported_expenses = ARRAY['TTO personel giderleri','Ofis altyapı giderleri','Patent/fikri mülkiyet giderleri','Etkinlik ve network giderleri','Danışmanlık hizmetleri'],
  excluded_expenses = ARRAY['Bina/inşaat','Araştırma laboratuvar ekipmanları','Normal eğitim giderleri'],
  notes = ARRAY['Kurumsal kapasite: yıllık 1.250.000 TL, %80 destek','Hedef odaklı büyüme: yıllık 1.750.000 TL, %40-%80 destek','YÖK onaylı TTO veya TGB yöneticiliği gerekir'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1513']
WHERE code = '1513';

UPDATE funds SET
  description = '1514 kodlu girişim sermayesi destek programı (Tech-InvesTR). Erken aşama teknoloji tabanlı şirketlerin ticarileşmesini girişim sermayesi fonu aracılığıyla destekler.',
  technical_scope = 'Teknoloji tabanlı şirketlerin ürün ve teknolojilerini ticarileştirmeleri için girişim sermayesi fon desteği.',
  application_system = 'Çağrı duyurusu üzerinden başvuru',
  application_method = 'Fon yöneticisi ve TTO/TGB ortak başvurusu',
  supported_expenses = ARRAY['Erken aşama teknoloji girişimlerine yatırım','Fon yönetim giderleri','Değerlendirme ve due diligence giderleri'],
  excluded_expenses = ARRAY['Olgun aşama şirketlere yatırım','Gayrimenkul yatırımları','Normal üretim giderleri'],
  notes = ARRAY['%50 hibe + %10 genel gider desteği','Tek kuruluşa azami 20M TL','Çağrı beklenmektedir'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1514']
WHERE code = '1514';

UPDATE funds SET
  description = '1515 kodlu program. Türkiye''deki öncül Ar-Ge laboratuvarlarının giderlerini destekler. Seçilmiş alanlarda yüksek teknoloji geliştirme kapasitesi oluşturmayı hedefler.',
  technical_scope = 'Öncül kuruluşların Ar-Ge laboratuvarlarının giderlerini destekleyerek seçilmiş alanlarda yüksek teknoloji geliştirme.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Niyet beyanı sonrası başvuru formu sunumu',
  supported_expenses = ARRAY['Türk uyruklu personel giderleri (%75)','Danışmanlık/eğitim giderleri (%75)','Sarf malzemeleri','Teçhizat alımı'],
  excluded_expenses = ARRAY['Yabancı uyruklu personel (%25 destek)','Bina/inşaat','Pazarlama/satış'],
  notes = ARRAY['Son 3 yılda en az 15M TL Ar-Ge harcaması gerekir','Personelin en az %50''si Türk uyruklu olmalı','Toplam personelin en az 1/3''ü doktora sahibi olmalı','Yıllık 25M TL destek limiti'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1515']
WHERE code = '1515';

UPDATE funds SET
  description = '1601 kodlu program. Girişimcilik ve yenilik alanlarında kapasite artırımını, üniversite-sanayi işbirliğini ve ekosistem gelişimini destekler.',
  technical_scope = 'Girişimcilik, üniversite-sanayi işbirliği ve özel sektör Ar-Ge kapasitesinin geliştirilmesi.',
  application_system = 'Çağrı duyurusuna göre',
  application_method = 'Çağrıya özel proje başvuru formu',
  supported_expenses = ARRAY['Eğitim ve mentörlük giderleri','Etkinlik organizasyon','Kapasite geliştirme altyapısı','Danışmanlık hizmetleri'],
  excluded_expenses = ARRAY['Bina/inşaat','Normal üretim','Pazarlama'],
  notes = ARRAY['%100''e kadar destek','Çağrıya bağlı olarak değişir','Türkiye''de yerleşik şirket, üniversite, kamu araştırma merkezi veya vakıf başvurabilir'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1601']
WHERE code = '1601';

UPDATE funds SET
  description = '1602 kodlu hibe/ödül programı. Ulusal ve uluslararası patent başvuru ve inceleme giderlerini destekler. Patent sayısını artırmayı hedefler.',
  technical_scope = 'Ülke kaynaklı ulusal ve uluslararası patent başvuru sayısını artırmaya yönelik destek.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Patent başvuru sonrası destek talebi',
  supported_expenses = ARRAY['Patent başvuru ücretleri','İnceleme ve arama ücretleri','Vekillik giderleri','Çeviri giderleri (uluslararası)'],
  excluded_expenses = ARRAY['PatentDEVAMI/annuity ücretleri','Ticaret markası/tasarım giderleri','Dava/itiraz giderleri'],
  notes = ARRAY['Toplam destek sınırı 240.000 TL','T.C. vatandaşı veya Türkiye''de yerleşik kuruluş','TÜRKPATENT veya WIPO''ya başvuru yapılmış olmalı'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1602']
WHERE code = '1602';

UPDATE funds SET
  description = '1613 kodlu sürekli açık çağrı. Üniversite TTO''larına teknoloji transferi profesyoneli istihdam desteği sağlar.',
  technical_scope = 'TTO''larda yeni teknoloji transfer profesyoneli istihdamı ve mevcut profesyonellerin devamı.',
  application_system = 'Çevrimiçi çağrı duyurusu üzerinden',
  application_method = 'TTO öz değerlendirme formu ve performans hedefleri tablosu sunumu',
  supported_expenses = ARRAY['Teknoloji transfer profesyoneli maaşı','Sosyal güvenlik giderleri','Hizmet alım giderleri'],
  excluded_expenses = ARRAY['Bina/inşaat','Ekipman alımı','Pazarlama'],
  notes = ARRAY['24 ay süre ile personel desteği','6 dönemlik takvim ile başvuru','%60 veya %80 destek oranı'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1613']
WHERE code = '1613';

UPDATE funds SET
  description = '1701 kodlu hizmet çağrısı. Ar-Ge projelerinin yenilik, iş planı ve ekonomik fayda sürdürülebilirliğini değerlendirir ve izler. Mali destek sağlanmaz.',
  technical_scope = 'Ar-Ge projelerinin teknik, ekonomik ve yenilikçi yönlerinin değerlendirilmesi ve izlenmesi.',
  application_system = 'Çağrı duyurusu üzerinden',
  application_method = 'Değerlendirme ve izleme hizmeti için başvuru',
  supported_expenses = ARRAY['Değerlendirme uzmanı giderleri','İzleme ve raporlama giderleri'],
  excluded_expenses = ARRAY['Proje Ar-Ge giderleri','Ekipman alımı','Bina/inşaat'],
  notes = ARRAY['Mali destek sağlanmıyor','Proje bütçesi en az 5.000.000 TL olmalı','Kapalı; yeni çağrı bekleniyor'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1701']
WHERE code = '1701';

UPDATE funds SET
  description = '1702 kodlu program. Üniversite ve araştırma kurumlarında geliştirilen patentli teknolojilerin sanayiye aktarılmasını destekler.',
  technical_scope = 'Patentli teknolojilerin teknoloji sağlayıcıdan müşteri kuruluşlara transfer edilmesi ve sanayileştirilmesi.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Müşteri kuruluş ve teknoloji sağlayıcı ortak başvurusu',
  supported_expenses = ARRAY['Teknoloji transfer giderleri','Lisanslama giderleri','Prototip geliştirme','Test ve doğrulama giderleri','Personel giderleri'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat'],
  notes = ARRAY['Temel %25 destek; KOBİ +%15; yüksek teknoloji +%15; Yeşil Mutabakat +%15','Proje bütçesi 4M TL; kavram doğrulama 500.000 TL','En az 60 ay, asgari 24 ay','En az bir patent lisanslama/devralma şartı'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1702']
WHERE code = '1702';

UPDATE funds SET
  description = '1707 kodlu çağrı. Müşteri ve tedarikçi kuruluş işbirliğiyle ticarileşme potansiyeli yüksek Ar-Ge projelerini destekler. Siparişe dayalı Ar-Ge modeliyle çalışır.',
  technical_scope = 'Hızlı ürüne dönüşebilecek, ticarileşme potansiyeli yüksek Ar-Ge projelerinin müşteri-tedarikçi işbirliğiyle finanse edilmesi.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Müşteri ve KOBİ tedarikçi kuruluş ortak başvurusu',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Seyahat','Yardımcı hizmetler','Genel giderler','Teçhizat (Ar-Ge amaçlı)'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat','Vergi/ceza'],
  notes = ARRAY['Kamu hibe tutarının %40''ı desteklenir','Müşteri kuruluş en az %40 ödeme yapmalıdır','Proje bütçesi 10M TL','Süre en fazla 24 ay','İlişkili kişi kapsamı dışında olmalı'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1707']
WHERE code = '1707';

UPDATE funds SET
  description = '1709 kodlu Eurostars uluslararası ortaklı çağrı. Pazar odaklı yenilikçi ürün, süreç ve hizmet geliştirme projelerini destekler. EUREKA Network çerçevesinde yürütülür.',
  technical_scope = 'Uluslararası pazara yönelik yenilikçi ürün, süreç ve hizmet geliştirme projeleri. KOBİ''ler koordinatör olarak tercih edilir.',
  application_system = 'Eurostars uluslararası portal + PRODİS ulusal başvuru',
  application_method = 'Uluslararası başvuru formu + ulusal belgeler',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Seyahat','Yardımcı hizmetler','Genel giderler','Teçhizat (Ar-Ge amaçlı)'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat'],
  notes = ARRAY['KOBİ %75, büyük %60, kamu/üniversite %100 destek','Türk ortak başına 600.000 EUR','Ortaklı proje bütçesi 850.000 EUR','En az bir Türk ve bir Eurostars ülke ortağı gerekli','Süre en fazla 36 ay'],
  source_links = ARRAY['https://www.eurekanetwork.org','https://www.tubitak.gov.tr/1709']
WHERE code = '1709';

UPDATE funds SET
  description = '1711 kodlu Yapay Zekâ Ekosistem çağrısı. Müşteri kuruluşların yapay zekâ ihtiyaçlarını ürün veya çözüme dönüştürür. Konsorsiyum yapısı gerektirir.',
  technical_scope = 'Yapay zekâ teknolojilerinin müşteri kuruluş ihtiyaçlarına uygun ürün ve çözümlere dönüştürülmesi.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Konsorsiyum kuruluşu sonrası ön kayıt ve proje önerisi',
  supported_expenses = ARRAY['Personel giderleri (yapay zekâ ve alan uzmanları)','Sarf malzemeleri','Bulut/bilişim altyapısı giderleri','Seyahat','Yardımcı hizmetler','Genel giderler'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat'],
  notes = ARRAY['KOBİ müşteri %70, büyük müşteri %60, kamu/üniversite %100','Proje bütçesi 10M TL','En az 1 yapay zekâ KOBİ ve 1 üniversite/araştırma birimi gerekli','Konsorsiyum kurulması zorunludur','Süre en fazla 24 ay'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1711']
WHERE code = '1711';

UPDATE funds SET
  description = '1719 kodlu Eureka Network çağrıları. Piyasaya sürülebilir ürün, süreç veya hizmet ortaya koyan uluslararası Ar-Ge projelerini destekler.',
  technical_scope = 'Uluslararası ortaklı, piyasaya sürülebilir ürün, süreç veya hizmet geliştirme projeleri.',
  application_system = 'EUREKA Network portal + PRODİS ulusal başvuru',
  application_method = 'Çağrı duyurusuna göre konsorsiyum ve proje önerisi',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Seyahat','Yardımcı hizmetler','Genel giderler','Teçhizat (Ar-Ge amaçlı)'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat'],
  notes = ARRAY['Büyük %60, KOBİ %75, kamu/üniversite %100 destek','Çağrıya bağlı olarak değişir','En az bir sermaye şirketi ortak olmalı'],
  source_links = ARRAY['https://www.eurekanetwork.org']
WHERE code = '1719';

UPDATE funds SET
  description = '1812 kodlu program. Teknoloji ve yenilik odaklı fikirlerin girişimlere dönüştürülmesi için yatırım ve hızlandırma desteği sağlar. BiGG programının yatırım aşamasını oluşturur.',
  technical_scope = 'Erken aşama teknoloji fikirlerinin katma değerli işletmelere ve istihdam potansiyeli yüksek girişimlere dönüştürülmesi.',
  application_system = 'Çağrı duyurusu üzerinden başvuru',
  application_method = 'İş planı ve uygulayıcı kuruluş onayı ile başvuru',
  supported_expenses = ARRAY['Girişim yatırımı (pay karşılığı)','Ekipman ve yazılım alımı','Prototip geliştirme','Mentörlük ve danışmanlık'],
  excluded_expenses = ARRAY['Pazarlama/satış (sınırlandırılmış)','Bina/inşaat','Normal üretim'],
  notes = ARRAY['%3 hisse karşılığı yatırım','Aşama 2: 1.350.000 TL (temiz teknolojide 900.000 TL)','Aşama 2 en fazla 18 ay, Aşama 3 36 ay','Üniversite öğrencisi/mezunu olmalı','Daha önce BiGG/Teknogirişim almamış olmalı'],
  source_links = ARRAY['https://www.tubitak.gov.tr/bigg']
WHERE code = '1812';

UPDATE funds SET
  description = '1831 kodlu sürekli açık çağrı. KOBİ''lerin yeşil dönüşüm mevzuatına uyumu için teknik danışmanlık ve kapasite analizini destekler.',
  technical_scope = 'Yeşil dönüşüm mevzuatına uyum için danışmanlık, kapasite analizi ve çözüm önerisi desteği.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'KOBİ tarafından hizmet alımı başvurusu',
  supported_expenses = ARRAY['Teknik danışmanlık hizmet bedeli','Kapasite analizi giderleri','Çözüm önerisi raporlama giderleri'],
  excluded_expenses = ARRAY['Ekipman alımı','Bina/inşaat','Normal üretim','Personel maaşı'],
  notes = ARRAY['Hizmet bedelinin %90''ı TÜBİTAK hibesi','Üst limit 310.000 TL','Süre 3-6 ay','Bir KOBİ en fazla 3 kez destek alabilir','Ortaklı başvuru kabul edilmez'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1831']
WHERE code = '1831';

UPDATE funds SET
  description = '1832 kodlu çağrı. Firmaların yeşil dönüşüm faaliyetlerine yönelik THS 3-9 Ar-Ge çalışmalarını destekler. Sanayide yeşil dönüşümü hızlandırmayı hedefler.',
  technical_scope = 'Temiz enerji, kaynak verimliliği, döngüsel ekonomi ve sürdürülebilir üretim odaklı sanayi Ar-Ge projeleri.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Proje önerisi (PRODİS) + ekonomik fizibilite raporu sunumu',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Seyahat','Yardımcı hizmetler','Genel giderler','Teçhizat (Ar-Ge amaçlı)','Yeşil teknoloji altyapı yatırımları'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat (Ar-Ge dışı)','Vergi/ceza'],
  notes = ARRAY['Büyük %70, KOBİ %80, deprem bölgesi KOBİ %90 destek','Mikro/küçük 15M TL, orta 24M TL, büyük 51,5M TL','Tescil tarihi 2 yıl ve üzeri','Yürütücü kuruluş en az %75 özel sektör','En az bir Yeşil Dönüşüm Göstergesi hedefi','Süre en fazla 24 ay'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1832']
WHERE code = '1832';

UPDATE funds SET
  description = '1833 kodlu platform çağrısı. Kurumlar ve yürütücü kuruluşların ortaklığıyla yüksek katma değerli yeşil ürün ve süreçlerin geliştirilmesini sağlar. Platform yaklaşımı ile çok ortaklı projeler desteklenir.',
  technical_scope = 'Kurumlar ve platform ortaklarının birlikte yürüttüğü yüksek katma değerli yeşil ürün ve süreç geliştirme programı.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Ürünleştirme Programı Önerisi + tanıtım sunumu/videosu sunumu',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Seyahat','Yardımcı hizmetler','Genel giderler','Teçhizat (Ar-Ge amaçlı)','Yeşil teknoloji altyapı'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat (Ar-Ge dışı)','Vergi/ceza'],
  notes = ARRAY['KOBİ %20-%80, büyük %30-%70 geri ödemeli; deprem bölgesi KOBİ %10-%90','Kuruluş başına 28M veya 70M TL; platform toplamı 1,5 milyar TL','Platformda 3-10 ortak','Yürütücü büyük veya orta ölçekli sermaye şirketi','Süre en fazla 30 ay, uzatmayla 36 ay','Kapalı; yeni çağrı bekleniyor'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1833']
WHERE code = '1833';

UPDATE funds SET
  description = '1509 kodlu uluslararası ortaklı program. Türk firmalarının uluslararası Ar-Ge ve yenilik projeleriyle teknik yeterliliğini ve ihracat kapasitesini artırır.',
  technical_scope = 'Uluslararası ortaklarla yürütülen Ar-Ge ve yenilik projelerinde teknik yeterlilik ve pazar erişimi desteği.',
  application_system = 'PRODİS üzerinden başvuru',
  application_method = 'Uluslararası ortaklık anlaşması ile proje önerisi sunumu',
  supported_expenses = ARRAY['Personel giderleri','Sarf malzemeleri','Seyahat','Yardımcı hizmetler','Genel giderler','Teçhizat (Ar-Ge amaçlı)'],
  excluded_expenses = ARRAY['Pazarlama/satış','Normal üretim','Bina/inşaat'],
  notes = ARRAY['KOBİ ilk 5 proje %75, sonrası %60; büyük ilk %60, sonrası %40','Tek ortaklı 25M TL, ortaklı toplam 80M TL','Sürekli açık','Uluslararası ortak/partner gerekli'],
  source_links = ARRAY['https://www.tubitak.gov.tr/1509']
WHERE code = '1509';

-- EUREKA-SEYAHAT
UPDATE funds SET
  description = 'Eureka çağrılarına başvuracak Türkiye''de yerleşik şirket temsilcilerinin konsorsiyum kurma seyahatlerini destekleyen program.',
  technical_scope = 'Eureka uluslararası Ar-Ge projeleri için konsorsiyum kurmaya yönelik seyahat giderleri.',
  application_system = 'Çağrı duyurusu üzerinden',
  application_method = 'Seyahat başvuru formu',
  supported_expenses = ARRAY['Seyahat giderleri (uçak, konaklama)','Toplantı organizasyon giderleri'],
  excluded_expenses = ARRAY['Ekipman','Personel maaşı','Bina/inşaat'],
  notes = ARRAY['Eureka çağrısına başvurabilecek Türkiye''de yerleşik şirket temsilcisi','Çağrı sayfasındaki seyahat şartlarına uygunluk'],
  source_links = ARRAY['https://www.eurekanetwork.org']
WHERE code = 'EUREKA-SEYAHAT';

-- EUROSTARS-KOORD
UPDATE funds SET
  description = 'Eurostars projelerinde koordinatör olmayı hedefleyen yenilikçi KOBİ''lerin koordinasyon giderlerini destekler.',
  technical_scope = 'Eurostars projelerinde koordinatörlük, proje yazma ve sunma hizmet giderleri.',
  application_system = 'Çağrı duyurusu üzerinden',
  application_method = 'Koordinatörlük başvuru formu',
  supported_expenses = ARRAY['Proje yazma giderleri','Sunma ve toplantı giderleri','Koordinasyon giderleri'],
  excluded_expenses = ARRAY['Ekipman','Personel maaşı','Bina/inşaat'],
  notes = ARRAY['Türkiye''de yerleşik yenilikçi KOBİ','Eurostars projesinde koordinatörlük hedefi'],
  source_links = ARRAY['https://www.eurekanetwork.org']
WHERE code = 'EUROSTARS-KOORD';

-- UFUK-AVRUPA
UPDATE funds SET
  description = 'Ufuk-Avrupa (Horizon Europe) programı için TÜBİTAK bilgilendirme ve yönlendirme kaydı. Güncel proje çağrıları resmi program sayfasından takip edilir.',
  technical_scope = 'Avrupa Birliği araştırma ve inovasyon çağrılarına erişim ve uluslararası proje geliştirme.',
  application_system = 'Horizon Europe portalı üzerinden başvuru',
  application_method = 'Uluslararası konsorsiyum ile çağrıya özel başvuru',
  supported_expenses = ARRAY['Proje Ar-Ge giderleri','Personel giderleri','Seyahat','Ekipman (proje amaçlı)'],
  excluded_expenses = ARRAY['Bina/inşaat','Normal üretim','Pazarlama'],
  notes = ARRAY['Uluslararası konsorsiyum gerekli','TÜBİTAK ve AB program koşulları birlikte incelenmeli','Çağrı duyurusuna göre değişir'],
  source_links = ARRAY['https://research-and-innovation.ec.europa.eu','https://ufuk2020.tubitak.gov.tr']
WHERE code = 'UFUK-AVRUPA';