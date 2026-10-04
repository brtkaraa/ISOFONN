/*
# Add EU and TÜBİTAK funds from ABFonlari.txt

## Description
Inserts additional EU (Horizon Europe, Creative Europe, Digital Europe, ESF, ISF, Euratom, ERC) 
and TÜBİTAK (1001, 2224-C, Bilim ve Toplum) funds parsed from the ABFonlari.txt data file 
into the `funds` table. These funds were not yet in the database.

## New rows in `funds` table:
- ESF-2027-PEP-ENGAGEMENT (AB fonu)
- SOCPL-2026-INFO-REPR (AB fonu)
- HORIZON-JU-EUROHPC-2026-NAPT-11-01 (AB fonu)
- HORIZON-JU-EUROHPC-2026-NQKD-12-01 (AB fonu)
- HORIZON-JU-EUROHPC-2026-QEXP-14-01 (AB fonu)
- HORIZON-CL6-2026-04-GOVERNANCE-01 (AB fonu)
- CREA-MEDIA-2027-DEVSLATE (AB fonu)
- HORIZON-EIC-2026-PRIZE-WIP (AB fonu)
- HORIZON-EIC-2026-PRIZE-WIP-RisingInnovators (AB fonu)
- HORIZON-EIT-2026-PRIZE-WIP-LEADERSHIP (AB fonu)
- ISF-2026-TF2-AG-CYBER-DIGITAL (AB fonu)
- ISF-2026-TF2-AG-CYBER-STANDARD (AB fonu)
- ERC-2027-COG (AB fonu)
- CREA-MEDIA-2027-INNOVBUSMOD (AB fonu)
- DIGITAL-ECCC-2027-DEPLOY-CYBER-11-AI4SME (AB fonu)
- DIGITAL-ECCC-2027-DEPLOY-CYBER-11-COORDPREP (AB fonu)
- DIGITAL-ECCC-2027-DEPLOY-CYBER-11-CYBERAI (AB fonu)
- DIGITAL-ECCC-2027-DEPLOY-CYBER-11-DUALUSE (AB fonu)
- DIGITAL-ECCC-2027-DEPLOY-CYBER-11-EULEG (AB fonu)
- DIGITAL-ECCC-2027-DEPLOY-CYBER-11-NCC (AB fonu)
- DIGITAL-ECCC-2027-DEPLOY-CYBER-11-REGCABH (AB fonu)
- CREA-MEDIA-2027-FILMOVE (AB fonu)
- CREA-MEDIA-2027-DEVVGIM (AB fonu)
- CREA-MEDIA-2027-TVONLINE-1 (AB fonu)
- CREA-MEDIA-2027-TVONLINE-2 (AB fonu)
- CREA-MEDIA-2027-TVONLINE-3 (AB fonu)
- CREA-MEDIA-2027-AUDFILMEDU (AB fonu)
- CREA-MEDIA-2027-CODEV (AB fonu)
- HORIZON-EURATOM-2027-01-01 (AB fonu)
- TÜBİTAK 1001 (kamu)
- TÜBİTAK Bilim ve Toplum Proje Teşvik Ödülleri (kamu)
- TÜBİTAK 2224-C (kamu)

## Security
No security changes — only data insertion into existing `funds` table.

## Notes
1. All EU funds are type='ab'
2. All TÜBİTAK funds are type='kamu'
3. Sectors assigned based on fund topic content
4. TRL ranges estimated from fund descriptions where available
*/

INSERT INTO funds (name, provider, type, budget, min_trl, max_trl, sectors, description, code, application_url, deadline, duration, max_budget_per_project, support_rate, eligibility, required_docs, technical_scope, status, application_system, application_method, supported_expenses, excluded_expenses, notes, source_links)
VALUES

-- 1. ESF PEP Engagement
('ESF-2027 PEP Engagement - Yoksulluk Deneyimi Diyalog Çağrısı', 'Avrupa Komisyonu (ESF)', 'ab', 'EUR 2.500.000', 1, 9, ARRAY['yazilim','enerji'], 'Yoksulluk ve sosyal dışlanma deneyimi yaşamış kişilerle politik karar vericiler arasında sürdürülebilir diyalog oluşturmak için sivil toplum kuruluşları konsorsiyumlarına hibe.', 'ESF-2027-PEP-ENGAGEMENT', '', 'Açık', '', 'EUR 2.500.000', 'Hibe', ARRAY['AB düzeyinde sivil toplom kuruluşları konsorsiyumu','INGO merkezi AB üyesinde'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Sosyal diyalog ve yoksulluk karşıtı politika', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','seyahat','etkinlik','iletişim'], ARRAY[''], ARRAY['EU üye ülkeleri ve katılımcı ülkeler'], ARRAY['https://europa.eu']),

-- 2. SOCPL Info-Repr
('SOCPL-2026 INFO-REPR - Çalışan Temsiliyeti ve Bilgilendirme', 'Avrupa Komisyonu (SOCPL)', 'ab', 'EUR 2.500.000', 1, 9, ARRAY['yazilim','imalat'], 'Avrupa İş Konseylerinde çalışan temsiliyetinin etkinleşmesi ve endüstriyel geçişlerde sosyal diyalogun desteklenmesi için hibe.', 'SOCPL-2026-INFO-REPR', '', 'Açık', '', 'EUR 312.500', 'Hibe (%80)', ARRAY['İş konseyi veya sendika','Avrupa/national/sectoral düzeyde'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Çalışan katılımı ve sosyal diyalog', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','etkinlik','eğitim'], ARRAY[''], ARRAY['8-10 proje desteklenecek'], ARRAY['https://europa.eu']),

-- 3. Horizon EuroHPC NAPT
('Horizon EuroHPC 2026 - Nötr-Atom Kuantum İşlemci Platformları', 'Avrupa Komisyonu (Horizon Europe)', 'ab', 'EUR 20.000.000', 4, 7, ARRAY['yazilim','elektronik','savunma'], 'Nötr-atom kuantum işlemci platformlarının geliştirilmesi, kuantum simülasyon ve gate-based computing uygulamaları için R&D.', 'HORIZON-JU-EUROHPC-2026-NAPT-11-01', '', 'Açık', '3.5 yıl', 'EUR 20.000.000', 'Hibe', ARRAY['EuroHPC JU üye ülkelerinde legal entity'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı','Ekip Özgeçmişleri'], 'Kuantum bilgisayar, nötr-atom platformları, HPC entegrasyonu', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','ekipman','seyahat'], ARRAY[''], ARRAY['3.5 yıl süre'], ARRAY['https://europa.eu']),

-- 4. Horizon EuroHPC NQKD
('Horizon EuroHPC 2026 - Yeni Nesil QKD Sistemleri', 'Avrupa Komisyonu (Horizon Europe)', 'ab', 'EUR 24.000.000', 4, 7, ARRAY['yazilim','elektronik','savunma'], 'Gelişmiş QKD (Kuantum Anahtar Dağıtım) sistemleri ve geleceğin güvenli iletişim ağlarına entegrasyonu için R&D.', 'HORIZON-JU-EUROHPC-2026-NQKD-12-01', '', 'Açık', '3.5 yıl', 'EUR 24.000.000', 'Hibe', ARRAY['EuroHPC JU üye ülkelerinde legal entity'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı','Ekip Özgeçmişleri'], 'Kuantum güvenli iletişim, QKD sistemleri', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','ekipman','seyahat'], ARRAY[''], ARRAY['TRL 4-7'], ARRAY['https://europa.eu']),

-- 5. Horizon EuroHPC QEXP
('Horizon EuroHPC 2026 - Kuantum Teknolojileri Deneysel Pilot Hatları', 'Avrupa Komisyonu (Horizon Europe)', 'ab', 'EUR 15.000.000', 4, 6, ARRAY['yazilim','elektronik','savunma'], 'Kuantum donanım teknolojileri için deneysel pilot hat kapasitelerinin geliştirilmesi, TRL 4-6 aralığında.', 'HORIZON-JU-EUROHPC-2026-QEXP-14-01', '', 'Açık', '', 'EUR 15.000.000', 'Hibe', ARRAY['EuroHPC JU üye ülkelerinde legal entity'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Kuantum donanım pilot hatları', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','ekipman','altyapı'], ARRAY[''], ARRAY['1 beklenen hibe'], ARRAY['https://europa.eu']),

-- 6. Horizon CL6 Governance
('Horizon CL6 2026 - Tarım Verileri Ortaklığı Ek Faaliyetler', 'Avrupa Komisyonu (Horizon Europe)', 'ab', 'EUR 60.000.000', 1, 9, ARRAY['tarim','yazilim','enerji'], 'Avrupa Tarım Verileri Ortaklığına ek faaliyetler için co-funded action, mevcut konsorsiyum tarafından sunulur.', 'HORIZON-CL6-2026-04-GOVERNANCE-01', '', 'Açık', '', 'EUR 60.000.000', '%30', ARRAY['Mevcut konsorsiyum koordinatörü'], ARRAY['Başvuru Formu','Teknik Doküman'], 'Tarım veri ortaklığı, co-fund', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','etkinlik','altyapı'], ARRAY[''], ARRAY['Mevcut hibe anlaşması kapsamında'], ARRAY['https://europa.eu']),

-- 7. CREA MEDIA DevSlate
('Creative Europe MEDIA 2027 - Slate Development Grants', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 22.374.320', 1, 9, ARRAY['yazilim'], 'Bağımsız Avrupa görsel-işitsel prodüksiyon şirketleri için 3-5 eserlik slate geliştirme hibesi.', 'CREA-MEDIA-2027-DEVSLATE', '', 'Açık', '', 'EUR 90.000 - 510.000', 'Hibe', ARRAY['Bağımsız Avrupa prodüksiyon şirketi'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Görsel-işitsel eser geliştirme, slate financing', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['geliştirme','personel'], ARRAY[''], ARRAY['3-5 eser (film, animasyon, belgesel)'], ARRAY['https://europa.eu']),

-- 8. Horizon EIC Prize WIP
('Horizon EIC 2026 - Avrupa Kadın İnovatörler Ödülü', 'Avrupa Komisyonu (Horizon Europe)', 'ab', 'EUR 100.000', 1, 9, ARRAY['yazilim','biyoteknoloji','kimya','enerji'], 'Avrupa Kadın İnovatörler Ödülü, oyunu değiştiren inovasyonları hayata geçiren kadın kuruculara tanınma ödülü.', 'HORIZON-EIC-2026-PRIZE-WIP', '', 'Açık', '', 'EUR 100.000', 'Ödül', ARRAY['Kadın kurucu/kurucu ortak','AB üye veya ilişkili ülke'], ARRAY['Başvuru Formu'], 'Kadın inovatörler tanıma ödülü', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY[''], ARRAY[''], ARRAY['3 kategori: Women Innovators, Rising, EIT Leadership'], ARRAY['https://europa.eu']),

-- 9. Horizon EIC Prize WIP Rising
('Horizon EIC 2026 - Rising Innovators (35 yaş altı kadın girişimciler)', 'Avrupa Komisyonu (Horizon Europe)', 'ab', 'EUR 50.000', 1, 9, ARRAY['yazilim','biyoteknoloji','kimya','enerji'], '35 yaş altı kadın kuruculara yönelik Rising Innovators kategorisi, üç ödül (EUR 50.000, 30.000, 20.000).', 'HORIZON-EIC-2026-PRIZE-WIP-RisingInnovators', '', 'Açık', '', 'EUR 50.000', 'Ödül', ARRAY['35 yaş altı kadın kurucu','AB üye veya ilişkili ülke'], ARRAY['Başvuru Formu'], 'Kadın inovatör tanıma ödülü - Rising kategorisi', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY[''], ARRAY[''], ARRAY['3 ödül: 50K, 30K, 20K EUR'], ARRAY['https://europa.eu']),

-- 10. Horizon EIT Prize WIP Leadership
('Horizon EIT 2026 - EIT Women Leadership Kategorisi', 'Avrupa Komisyonu (Horizon Europe)', 'ab', 'EUR 50.000', 1, 9, ARRAY['yazilim','biyoteknoloji','kimya','enerji'], 'EIT Women Leadership kategorisi, EIT Community ile bağlantısı olan kadın kuruculara tanıma ödülü.', 'HORIZON-EIT-2026-PRIZE-WIP-LEADERSHIP', '', 'Açık', '', 'EUR 50.000', 'Ödül', ARRAY['EIT Community bağlantılı kadın kurucu','AB üye veya ilişkili ülke'], ARRAY['Başvuru Formu'], 'Kadın liderlik tanıma ödülü', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY[''], ARRAY[''], ARRAY['3 ödül: 1st, 2nd, 3rd'], ARRAY['https://europa.eu']),

-- 11. ISF Cyber Digital
('ISF 2026 - Dijital Soruşturmalar için Siber Güvenlik', 'Avrupa Komisyonu (Internal Security Fund)', 'ab', 'EUR 5.000.000', 1, 9, ARRAY['yazilim','savunma'], 'Siber suçlarla mücadelede kolluk kuvvetleri ve yargı mercilerinin operasyonel kapasitesini artırmak için EU hibe.', 'ISF-2026-TF2-AG-CYBER-DIGITAL', '', 'Açık', '24 ay', 'EUR 1.000.000 - 2.500.000', 'Hibe', ARRAY['Kolluk/yargı mercileri','Kamu veya özel hukuk kişileri'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Siber suç, dijital soruşturma, kolluk kapasitesi', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','ekipman','eğitim','seyahat'], ARRAY[''], ARRAY['24 ay süre'], ARRAY['https://europa.eu']),

-- 12. ISF Cyber Standard
('ISF 2026 - Siber Soruşturmalarda Standardizasyon', 'Avrupa Komisyonu (Internal Security Fund)', 'ab', 'EUR 1.500.000', 1, 9, ARRAY['yazilim','savunma','elektronik'], 'Dijital soruşturmalarda standardizasyon ihtiyaçları, 6G, dijital adli bilişim, araç adli bilişimi, AI standardizasyonu.', 'ISF-2026-TF2-AG-CYBER-STANDARD', '', 'Açık', '', 'EUR 1.500.000', 'Hibe', ARRAY['Kolluk/yargı mercileri','Ulusal standardizasyon kuruluşları'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Standardizasyon, 6G, dijital adli bilişim, AI', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','eğitim','standardizasyon'], ARRAY[''], ARRAY['1 proje bekleniyor'], ARRAY['https://europa.eu']),

-- 13. ERC Consolidator
('ERC 2027 Consolidator Grant', 'Avrupa Komisyonu (Horizon Europe)', 'ab', 'EUR 2.000.000', 3, 8, ARRAY['yazilim','biyoteknoloji','kimya','enerji','elektronik'], 'Bağımsız araştırma ekiplerini güçlendiren ERC Consolidator Grant, 60 ay süreyle EUR 2.000.000''a kadar destek.', 'ERC-2027-COG', '', 'Açık', '60 ay', 'EUR 2.000.000', 'Hibe', ARRAY['PhD savunmasından 5-15 yıl geçmiş','Host Institution''da başvuru'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı','Ekip Özgeçmişleri'], 'Bağımsık araştırma, tüm alanlar', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','ekipman','seyahat','yayın'], ARRAY[''], ARRAY['60 ay, PhD 5-15 yıl önce'], ARRAY['https://europa.eu']),

-- 14. CREA MEDIA InnovBusMod
('Creative Europe MEDIA 2027 - İnovatif İş Modelleri', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 14.000.000', 1, 9, ARRAY['yazilim'], 'Avrupa görsel-işitsel endüstrisinde yenilikçi iş modelleri, AI adaptasyonu ve yeşil dönüşüm için hibe.', 'CREA-MEDIA-2027-INNOVBUSMOD', '', 'Açık', '', 'EUR 14.000.000', '%80', ARRAY['Kamu veya özel hukuk kişileri','Uluslararası organizasyonlar'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'İnovatif iş modelleri, AI, yeşil dönüşüm', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['geliştirme','personel','teknoloji'], ARRAY[''], ARRAY['Videogames dahil'], ARRAY['https://europa.eu']),

-- 15. DIGITAL ECCC AI4SME
('Digital Europe 2027 - KOBİ''ler için AI Tabanlı Siber Güvenlik', 'Avrupa Komisyonu (Digital Europe)', 'ab', 'EUR 15.000.000', 1, 9, ARRAY['yazilim','savunma'], 'AI destekli siber güvenlik çözümlerinin KOBİ''lerde yaygınlaştırılması, SaaS toolkit geliştirme.', 'DIGITAL-ECCC-2027-DEPLOY-CYBER-11-AI4SME', '', 'Açık', '', 'EUR 15.000.000', '%50 (KOBİ: %75)', ARRAY['KOBİ''ler, startup''lar','Akademi, kamu, NIS2 entity'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'AI siber güvenlik, SaaS toolkit, KOBı kapasitesi', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['geliştirme','dağıtım','eğitim'], ARRAY[''], ARRAY['SME Support Action'], ARRAY['https://europa.eu']),

-- 16. DIGITAL ECCC CoordPrep
('Digital Europe 2027 - Koordine Hazırlık Testleri ve Siber Dayanıklılık', 'Avrupa Komisyonu (Digital Europe)', 'ab', 'EUR 15.000.000', 1, 9, ARRAY['yazilim','savunma','enerji'], 'Siber Güvenlik Acil Durum Mekanizması kapsamında koordine hazırlık testleri ve diğer hazırlık faaliyetleri.', 'DIGITAL-ECCC-2027-DEPLOY-CYBER-11-COORDPREP', '', 'Açık', '', 'EUR 15.000.000', '%50', ARRAY['Kamu kuruluşları, NIS2 yetkili merciler'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Siber hazırlık, test, kritik altyapı', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['test','ekipman','eğitim'], ARRAY[''], ARRAY['Simple Grants'], ARRAY['https://europa.eu']),

-- 17. DIGITAL ECCC CyberAI
('Digital Europe 2027 - AI Tabanlı Siber Güvenlik Sistemleri', 'Avrupa Komisyonu (Digital Europe)', 'ab', 'EUR 15.000.000', 1, 9, ARRAY['yazilim','savunma'], 'AI tabanlı (GenAI dahil) siber güvenlik sistemleri ve araçları geliştirme ve dağıtım, ulusal/sınır ötesi Cyber Hubs.', 'DIGITAL-ECCC-2027-DEPLOY-CYBER-11-CYBERAI', '', 'Açık', '', 'EUR 3.000.000 - 5.000.000', '%50', ARRAY['Teknoloji sağlayıcılar, Cyber Hubs','Akademi, kamu, NIS2 entity'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'AI siber güvenlik, GenAI, Cyber Hubs', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['geliştirme','dağıtım','altyapı'], ARRAY[''], ARRAY['~4 hibe, 3-5M EUR'], ARRAY['https://europa.eu']),

-- 18. DIGITAL ECCC DualUse
('Digital Europe 2027 - Dual-Use Siber Güvenlik Teknolojileri', 'Avrupa Komisyonu (Digital Europe)', 'ab', 'EUR 15.000.000', 1, 9, ARRAY['savunma','yazilim','elektronik'], 'Sivil ve savunma alanlarında kullanılabilecek dual-use siber güvenlik prototipleri ve operasyonel altyapılar.', 'DIGITAL-ECCC-2027-DEPLOY-CYBER-11-DUALUSE', '', 'Açık', '', 'EUR 15.000.000', '%50', ARRAY['Endüstri, savunma bakanlıkları','İçişleri bakanlıkları, KOBı, startup'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Dual-use siber güvenlik, sivil-savunma işbirliği', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['prototip','ekipman','altyapı'], ARRAY[''], ARRAY['Simple Grants %50'], ARRAY['https://europa.eu']),

-- 19. DIGITAL ECCC EULEG
('Digital Europe 2027 - AB Siber Güvenlik Mevzuat Uyumu', 'Avrupa Komisyonu (Digital Europe)', 'ab', 'EUR 15.000.000', 1, 9, ARRAY['yazilim','savunma'], 'CRA, NIS2, GDPR, DORA, Cybersecurity Act, AI Act uyumu için siber güvenlik kapasite ve yetenek geliştirme.', 'DIGITAL-ECCC-2027-DEPLOY-CYBER-11-EULEG', '', 'Açık', '', 'EUR 15.000.000', '%50', ARRAY['Endüstri paydaşları, KOBı, startup','Yetkili merciler, CSIRT, SOC'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Mevzuat uyumu, CRA, NIS2, GDPR, AI Act', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['araç','eğitim','sertifikasyon','yetenek'], ARRAY[''], ARRAY['Simple Grants %50'], ARRAY['https://europa.eu']),

-- 20. DIGITAL ECCC NCC
('Digital Europe 2027 - Ulusal Koordinasyon Merkezleri Desteği', 'Avrupa Komisyonu (Digital Europe)', 'ab', 'EUR 15.000.000', 1, 9, ARRAY['yazilim','savunma'], 'Ulusal Koordinasyon Merkezlerinin (NCC) operasyonel desteklenmesi, KOBı''lere siber güvenlik çözümlerinin yaygınlaştırılması.', 'DIGITAL-ECCC-2027-DEPLOY-CYBER-11-NCC', '', 'Açık', '', 'EUR 15.000.000', '%50', ARRAY['Komisyon tarafından tanınan NCC''ler','Konsorsiyum ortakları'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'NCC operasyon, siber güvenlik yaygınlaştırma', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['operasyon','farkındalık','eğitim','startup'], ARRAY[''], ARRAY['FSTP izinli'], ARRAY['https://europa.eu']),

-- 21. DIGITAL ECCC RegCableHubs
('Digital Europe 2027 - Bölgesel Kablo Hub''ları', 'Avrupa Komisyonu (Digital Europe)', 'ab', 'EUR 15.000.000', 1, 9, ARRAY['savunma','elektronik','enerji'], 'Denizaltı kablolarına yönelik tehdit tespiti ve durumsal farkındalık için bölgesel Kablo Hub''ları oluşturma.', 'DIGITAL-ECCC-2027-DEPLOY-CYBER-11-REGCABH', '', 'Açık', '', 'EUR 15.000.000', '%50', ARRAY['En az 2 üye devlet yetkili mercileri','Kamu/özel kuruluşlar'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Denizaltı kablo güvenliği, tehdit tespiti', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['altyapı','araç','operasyon'], ARRAY[''], ARRAY['Hub başına EU deniz havzası'], ARRAY['https://europa.eu']),

-- 22. CREA MEDIA FILMOVE
('Creative Europe MEDIA 2027 - Films on the Move', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 22.374.320', 1, 9, ARRAY['yazilim'], 'Avrupa filmlerinin pan-Avrupa tiyatro ve/veya dijital dağıtımı için satış temsilcilerine hibe.', 'CREA-MEDIA-2027-FILMOVE', '', 'Açık', '', 'EUR 90.000 - 510.000', '%90', ARRAY['Avrupa satış temsilcileri (legal entity)'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Pan-Avrupa film dağıtımı, kampanya', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['kampanya','dağıtım','pazarlama'], ARRAY[''], ARRAY['İki kesim tarihi'], ARRAY['https://europa.eu']),

-- 23. CREA MEDIA DEVVGIM
('Creative Europe MEDIA 2027 - Video Oyunları ve İmersif İçerik', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 13.500.000', 1, 9, ARRAY['yazilim'], 'Narratif video oyunları ve interaktif imersif deneyimlerin konsept geliştirme (pre-production) aşaması için lump sum hibe.', 'CREA-MEDIA-2027-DEVVGIM', '', 'Açık', '', 'EUR 200.000', '%60', ARRAY['Avrupa video oyun prodüksiyon şirketi','XR stüdyo','Görsel-işitsel prodüksiyon'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Video oyunu, XR, imersif içerik geliştirme', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['geliştirme','personel','teknoloji'], ARRAY[''], ARRAY['Max EUR 200.000/proje'], ARRAY['https://europa.eu']),

-- 24. CREA MEDIA TVONLINE-1
('Creative Europe MEDIA 2027 - TV/Online Animasyon', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 22.374.320', 1, 9, ARRAY['yazilim'], 'Avrupa bağımsız prodüksiyon şirketleri için animasyon eserleri (tek seferlik veya dizi, min. 24 dk) üretim hibesi.', 'CREA-MEDIA-2027-TVONLINE-1', '', 'Açık', '', 'EUR 70.000 - 2.000.000', 'Hibe', ARRAY['Bağımsız Avrupa prodüksiyon şirketi','En az 2 ülkeden yayıncı işbirliği'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Animasyon üretimi, TV/online yayın', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['üretim','personel','teknoloji'], ARRAY[''], ARRAY['Min 24 dakika'], ARRAY['https://europa.eu']),

-- 25. CREA MEDIA TVONLINE-2
('Creative Europe MEDIA 2027 - TV/Online Belgesel', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 22.374.320', 1, 9, ARRAY['yazilim'], 'Yaratıcı belgesel (tek seferlik veya dizi, min. 50 dk) üretimi için bağımsız Avrupa prodüksiyon şirketlerine hibe.', 'CREA-MEDIA-2027-TVONLINE-2', '', 'Açık', '', 'EUR 70.000 - 2.000.000', 'Hibe', ARRAY['Bağımsız Avrupa prodüksiyon şirketi','Farklı MEDIA ülkelerinden işbirlikçi'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Belgesel üretimi, TV/online yayın', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['üretim','personel','teknoloji'], ARRAY[''], ARRAY['Min 50 dakika'], ARRAY['https://europa.eu']),

-- 26. CREA MEDIA TVONLINE-3
('Creative Europe MEDIA 2027 - TV/Online Drama Fiction', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 22.374.320', 1, 9, ARRAY['yazilim'], 'Drama fiction (tek seferlik veya dizi) üretimi için bağımsız Avrupa prodüksiyon şirketlerine lump sum hibe.', 'CREA-MEDIA-2027-TVONLINE-3', '', 'Açık', '', 'EUR 70.000 - 2.000.000', 'Hibe', ARRAY['Bağımsız Avrupa prodüksiyon şirketi','MEDIA katılımcı ülkelerde yerleşik'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Drama fiction üretimi, TV/online yayın', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['üretim','personel','teknoloji'], ARRAY[''], ARRAY['Lump sum grant'], ARRAY['https://europa.eu']),

-- 27. CREA MEDIA AUDFILMEDU
('Creative Europe MEDIA 2027 - İzleyici Geliştirme ve Film Eğitimi', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 7.000.000', 1, 9, ARRAY['yazilim'], 'Pan-Avrupa işbirliği ve inovasyon ile izleyici geliştirme ve film eğitimi, özellikle genç izleyicilere yönelik.', 'CREA-MEDIA-2027-AUDFILMEDU', '', 'Açık', '', 'EUR 7.000.000', 'Hibe', ARRAY['Kamu veya özel hukuk kişileri','Tek veya konsorsiyum'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'İzleyici geliştirme, film eğitimi, genç izleyici', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['etkinlik','eğitim','yayılım'], ARRAY[''], ARRAY['Miras eserler dahil'], ARRAY['https://europa.eu']),

-- 28. CREA MEDIA CODEV
('Creative Europe MEDIA 2027 - Avrupa Ortak Geliştirme', 'Avrupa Komisyonu (Creative Europe)', 'ab', 'EUR 22.374.320', 1, 9, ARRAY['yazilim'], 'En az iki bağımsız Avrupa prodüksiyon şirketi tarafından ortak geliştirilen tek bir görsel-işitsel proje için hibe.', 'CREA-MEDIA-2027-CODEV', '', 'Açık', '', 'EUR 200.000', 'Hibe', ARRAY['En az 2 bağımsız Avrupa prodüksiyon şirketi'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı'], 'Ortak geliştirme, animasyon/belgesel/fiction', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['geliştirme','personel'], ARRAY[''], ARRAY['Lump sum grant'], ARRAY['https://europa.eu']),

-- 29. Horizon Euratom
('Euratom 2027 - Füzyon Güç Santralleri için Anahtar Teknolojiler', 'Avrupa Komisyonu (Euratom)', 'ab', 'EUR 32.000.000', 6, 8, ARRAY['enerji','elektronik','kimya'], 'Füzyon güç santralleri için anahtar teknolojilerin olgunlaştırılması: plazma ısıtma, süper iletken mıknatıslar, tanılama ve kontrol.', 'HORIZON-EURATOM-2027-01-01', '', 'Açık', '', 'EUR 10.000.000', 'Hibe', ARRAY['Üye devletlerde legal entity','Ukrayna ve İsviçre dahil'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı','Ekip Özgeçmişleri'], 'Füzyon enerjisi, plazma ısıtma, mıknatıs, tanılama', 'open', 'EU Funding Portal', 'Online başvuru', ARRAY['personel','ekipman','altyapı'], ARRAY[''], ARRAY['TRL 6-8, ~EUR 10M/proje'], ARRAY['https://europa.eu']),

-- 30. TÜBİTAK 1001
('TÜBİTAK 1001 - Bilimsel ve Teknolojik Araştırma Projeleri', 'TÜBİTAK', 'kamu', '3.000.000 TL', 1, 9, ARRAY['yazilim','imalat','elektronik','biyoteknoloji','kimya','enerji','savunma','tarim'], 'Yeni bilgiler üretilmesi, bilimsel yorumların yapılması veya teknolojik problemlerin çözümlenmesi için bilimsel esaslara uygun projeleri destekler.', '1001', '', 'Kapalı (2026 1. dönem bekleniyor)', '36 ay', '3.000.000 TL', 'Hibe', ARRAY['Doktora veya eşdeğer dereceli proje yürütücüsü','Yükseköğretim/kamu/özel kuruluş'], ARRAY['Başvuru Formu','Teknik Doküman','Bütçe Planı','Ekip Özgeçmişleri'], 'Tüm bilimsel ve teknolojik araştırma alanları', 'upcoming', 'PRODİS', 'Online başvuru (PRODİS)', ARRAY['personel','ekipman','seyahat','yayın'], ARRAY[''], ARRAY['En fazla 36 ay, 3M TL üst limit'], ARRAY['https://tubitak.gov.tr']),

-- 31. TÜBİTAK Bilim ve Toplum Proje Teşvik Ödülleri
('TÜBİTAK Bilim ve Toplum Proje Teşvik Ödülleri', 'TÜBİTAK', 'kamu', '100.000 TL', 1, 9, ARRAY['yazilim','biyoteknoloji','enerji','tarim'], 'Son üç yılda desteklenen ve başarıyla tamamlanan 4004-4008 projeleri için yürütücü kurum/kuruluşların başvurduğu nakdi teşvik ödülleri.', 'BTP-PROJE-TESVIK', '', 'Kapalı', '', '100.000 TL (1.) / 50.000 TL (2.) / 30.000 TL (3.)', 'Ödül', ARRAY['Son 3 yılda 4004-4008 projesi tamamlamış','Kamu/üniversite/belediye/bilim merkezi'], ARRAY['Başvuru Formu','Proje Sonuç Raporu'], 'Bilim ve toplum projeleri, teşvik ödülü', 'upcoming', 'TÜBİTAK portal', 'Online başvuru', ARRAY[''], ARRAY[''], ARRAY['1.: 100K, 2.: 50K, 3.: 30K TL'], ARRAY['https://tubitak.gov.tr']),

-- 32. TÜBİTAK 2224-C
('TÜBİTAK 2224-C - Uluslararası Bilimsel Etkinliklere Katılım', 'TÜBİTAK', 'kamu', 'TÜBİTAK karşılar', 1, 9, ARRAY['yazilim','imalat','elektronik','biyoteknoloji','kimya','enerji','savunma','tarim'], 'Lisans/lisansüstü üstün başarılı öğrencilere ve doktora dereceli genç araştırmacılara Lindau Nobel Bilim İnsanları Toplantısı''na katılım desteği.', '2224-C', '', 'Kapalı', '', 'Katılım + harcırah + konaklama', 'Hibe', ARRAY['Lisans/yüksek lisans/doktora öğrencisi','Doktora dereceli araştırmacı'], ARRAY['Başvuru Formu'], 'Uluslararası bilimsel etkinlik katılımı', 'upcoming', 'TÜBİTAK portal', 'Online başvuru', ARRAY['katılım','harcırah','konaklama','uçak bileti'], ARRAY[''], ARRAY['Lindau Nobel toplantısı'], ARRAY['https://tubitak.gov.tr']);
