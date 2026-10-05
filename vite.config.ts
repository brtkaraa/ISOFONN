import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { IncomingMessage } from 'node:http';

// ─── Akıllı eşleştirme motoru (public/motor) için Groq vekili ───
// Anahtar yalnız sunucuda tutulur: önce .env'deki GROQ_API_KEY, yoksa Hackhaton/web_otomasyon/env.js.
// Tarayıcıdaki motor api.groq.com yerine /motor-api/groq/ adresine gider (bkz. motor-overlay/isofon-bridge.js).
const GROQ_PROXY_PREFIX = '/motor-api/groq/';
const GROQ_ALLOWED_PATH = /^openai\/v1\/(models|chat\/completions)$/;
// Motorun "anahtar var" kontrolünü geçen, gerçek anahtar olmayan yer tutucu
const GROQ_KEY_PLACEHOLDER = 'isofon-sunucu-vekili';

function isUsableGroqKey(key: string | undefined): key is string {
  return !!key && key.trim().length > 10 && !key.includes('BURAYA');
}

function resolveGroqKey(env: Record<string, string>, root: string): string | null {
  if (isUsableGroqKey(env.GROQ_API_KEY)) return env.GROQ_API_KEY.trim();
  const motorEnv = resolve(root, env.MOTOR_SOURCE || '../../Hackhaton/web_otomasyon', 'env.js');
  if (!existsSync(motorEnv)) return null;
  const match = readFileSync(motorEnv, 'utf8').match(/GROQ_API_KEY\s*:\s*['"]([^'"]+)['"]/);
  return isUsableGroqKey(match?.[1]) ? match[1].trim() : null;
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((ok, fail) => {
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => chunks.push(c));
    req.on('end', () => ok(Buffer.concat(chunks)));
    req.on('error', fail);
  });
}

function motorGroqProxy(): Plugin {
  let groqKey: string | null = null;
  let envFiles: string[] = [];

  const middleware: Connect.NextHandleFunction = async (req, res, next) => {
    const url = req.url?.split('?')[0] ?? '';

    // Anahtar sunucuda varsa motorun env.js'ine yer tutucu yazılır → motor Groq'u kullanır.
    // Yoksa public/motor/env.js olduğu gibi gider → motor yerel Ollama'ya düşer.
    if (url === '/motor/env.js' && groqKey) {
      const file = envFiles.find((f) => existsSync(f));
      if (!file) return next();
      const js = readFileSync(file, 'utf8').replace(/(GROQ_API_KEY\s*:\s*)['"][^'"]*['"]/, `$1'${GROQ_KEY_PLACEHOLDER}'`);
      res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.end(js);
      return;
    }

    if (!url.startsWith(GROQ_PROXY_PREFIX)) return next();

    const path = url.slice(GROQ_PROXY_PREFIX.length);
    const sendError = (status: number, message: string) => {
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: { message } }));
    };

    if (!GROQ_ALLOWED_PATH.test(path) || (req.method !== 'GET' && req.method !== 'POST')) {
      return sendError(404, 'Desteklenmeyen Groq isteği');
    }
    if (!groqKey) return sendError(503, 'Groq API anahtarı sunucuda tanımlı değil');

    try {
      const upstream = await fetch(`https://api.groq.com/${path}`, {
        method: req.method,
        headers: {
          Authorization: `Bearer ${groqKey}`,
          'Content-Type': req.headers['content-type'] ?? 'application/json',
        },
        body: req.method === 'POST' ? await readBody(req) : undefined,
      });
      res.statusCode = upstream.status;
      res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json');
      res.end(Buffer.from(await upstream.arrayBuffer()));
    } catch (err) {
      sendError(502, `Groq'a ulaşılamadı: ${(err as Error).message}`);
    }
  };

  return {
    name: 'motor-groq-proxy',
    configResolved(config) {
      // dev: public/motor/env.js · preview: dist/motor/env.js
      envFiles = [config.publicDir, resolve(config.root, config.build.outDir)].map((dir) => resolve(dir, 'motor', 'env.js'));
      groqKey = resolveGroqKey(loadEnv(config.mode, config.root, ''), config.root);
    },
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), motorGroqProxy()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
