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

## .env dosyası (giriş yapabilmek için şart)

Hesap/giriş sistemi Supabase'tedir. `.env` olmadan site açılır ama **giriş ve kayıt çalışmaz**.

1. Klasördeki `.env.example` dosyasını kopyalayıp adını `.env` yapın.
2. İçindeki değerleri **ekipten isteyin** ve doldurun.
3. `npm run dev` çalışıyorsa kapatıp yeniden başlatın.

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
GROQ_API_KEY=...   # isteğe bağlı (motorun yapay zeka açıklamaları)
```

`.env` GitHub'a yüklenmez. Giriş için kendi hesabınızla **Kayıt Ol** diyebilirsiniz; başka birinin hesabını kullanacaksanız e-posta ve şifresini ondan alın.

## Akıllı eşleştirme motoru

Motor dosyaları `public/motor` klasöründe repoya dahildir, ek bir şey kurmanız gerekmez.
Motorun asıl kaynağı ayrı bir projededir (Hackhaton/web_otomasyon); o klasörün olduğu bilgisayarda `npm run dev` kopyayı otomatik günceller, güncel hâli commit'lenmelidir.

## Kullanılan teknolojiler

React · TypeScript · Vite · Tailwind CSS · Supabase
