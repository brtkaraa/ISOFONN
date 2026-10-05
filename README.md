# İSOFON

**İSOFON**, şirketlerin projelerine en uygun **TÜBİTAK** ve **AB** fonlarını bulmasına yardım eden bir web platformudur.

## Neler yapılabilir?

- **Şirket profili** oluşturma
- **Proje ekleme** ve projeye uygun fonları listeleme
- **Fon çağrılarını** inceleme ve detaylarını görme
- **Akıllı Eşleştirme:** Projeyi fonlarla karşılaştırıp gerekçeli bir **uyum skoru** hesaplar. Menüdeki "Akıllı Eşleştirme" butonundan TÜBİTAK veya AB fonları için açılır.

## Nasıl çalıştırılır?

Bilgisayarda **Node.js** kurulu olmalı → https://nodejs.org (LTS sürümü)

Terminalde proje klasörüne girin:

```bash
cd ISOFONN
```

İlk seferde paketleri kurun (sadece bir kere):

```bash
npm install
```

Siteyi başlatın:

```bash
npm run dev
```

Tarayıcıda açın: **http://localhost:5173**

Kapatmak için terminalde `Ctrl + C`. Sonraki seferlerde sadece `npm run dev` yeterli.

## .env dosyası

Klasörde `.env` adında bir dosya olmalı. İçindeki değerleri **ekipten isteyin**. Bu dosya GitHub'a yüklenmez.

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
GROQ_API_KEY=...
```

## Kullanılan teknolojiler

React · TypeScript · Vite · Tailwind CSS · Supabase
