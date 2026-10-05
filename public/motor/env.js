// İSOFON: Bu dosya scripts/sync-motor.mjs tarafından env.example.js'ten üretildi; anahtar içermez.
// ─── F8 Karar Destek Sistemi — Ortam Yapılandırması ───
// Bu dosya şablondur. Kopyalayıp adını env.js yapın ve anahtarınızı girin (env.js git tarafından izlenmez).

window.ENV = {
    // ══════════════════════════════════════════════════════════════════════════════
    // GROQ BULUT YAPAY ZEKA YAPILANDIRMASI (TAVSİYE EDİLEN - HIZLI & 70B KALİTE)
    // ══════════════════════════════════════════════════════════════════════════════
    // Groq API anahtarınızı (gsk_...) aşağıdaki tırnakların içine yapıştırın:
    // Ücretsiz API anahtarı almak için: https://console.groq.com/keys

    GROQ_API_KEY: 'BURAYA_GROQ_API_ANAHTARINIZI_YAPISTIRIN',

    // Groq üzerinde hesabınızın erişimine açık olan en güncel ve güçlü model:
    // Hesabınızda aktif modeller: 'qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'
    GROQ_MODEL: 'qwen/qwen3.8-27b',

    // ══════════════════════════════════════════════════════════════════════════════
    // YEREL OLLAMA YAPILANDIRMASI (Groq anahtarı olmadığında devreye girer)
    // ══════════════════════════════════════════════════════════════════════════════
    OLLAMA_HOST: 'http://localhost:11434',
    OLLAMA_API_URL: 'http://127.0.0.1:11434',
    OLLAMA_MODEL: 'qwen3:4b',

    // Çoklu Ajan / Model Orkestrasyonu (Yerel modeller için)
    MODELS: {
        ORCHESTRATOR: 'qwen3:4b',            // Baş Danışman & Sentezleme
        LEGAL_AGENT: 'qwen2.5:3b-instruct', // Mevzuat & Şartlar Uzmanı
        FINANCE_AGENT: 'llama3.2:1b'          // Bütçe & Finans Uzmanı
    }
};
