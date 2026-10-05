// Akıllı eşleştirme motoru (Hackhaton/web_otomasyon) sitenin içinden /motor/ altında sunulur.
// Kopyalama işini scripts/sync-motor.mjs yapar (npm run dev / build öncesi otomatik çalışır).

export type MotorModule = 'tubitak' | 'ab';

const MOTOR_BASE = (import.meta.env.VITE_MOTOR_URL || '/motor/').replace(/\/?$/, '/');

const MOTOR_PAGES: Record<MotorModule, string> = {
  tubitak: 'index.html',
  ab: 'eu.html',
};

export const MOTOR_MODULES: { id: MotorModule; label: string; description: string }[] = [
  { id: 'tubitak', label: 'TÜBİTAK Fonları', description: '26 ulusal ve uluslararası TÜBİTAK programı' },
  { id: 'ab', label: 'AB Fonları', description: 'Horizon Europe ve diğer AB çağrıları' },
];

export function motorUrl(module: MotorModule): string {
  return `${MOTOR_BASE}${MOTOR_PAGES[module]}`;
}
