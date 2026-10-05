import { LayoutDashboard, FileText, Building2, LogOut, Menu, X, RefreshCw, Megaphone, ChevronDown, Landmark, User, Home, Moon, Sun, Sparkles, ExternalLink } from 'lucide-react';
import { useState, type ReactNode, useRef, useEffect } from 'react';
import type { Company } from '@/lib/supabase';
import BrandLogo from '@/components/BrandLogo';
import { MOTOR_MODULES, motorUrl } from '@/lib/motor';

export type PageId = 'home' | 'funds' | 'reverse-calls' | 'my-calls' | 'projects' | 'profile';

type Props = {
  company: Company | null;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onExit: () => void;
  children: ReactNode;
};

export default function AppLayout({ company, currentPage, onNavigate, onExit, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [motorOpen, setMotorOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const motorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (motorRef.current && !motorRef.current.contains(e.target as Node)) {
        setMotorOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'home', label: 'Ana Sayfa', icon: Home },
    { id: 'funds', label: 'Çağrılar', icon: Landmark },
    { id: 'reverse-calls', label: 'Tersine Çağrılar', icon: RefreshCw },
    { id: 'my-calls', label: 'Çağrılarım', icon: Megaphone },
    { id: 'projects', label: 'Projelerim', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f9] dark:bg-[#121212] font-sans text-[#181818] dark:text-gray-100">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1e1e1e] text-[#181818] dark:text-gray-100 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 shrink-0">
              <BrandLogo compact />
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.id;
                return (
                  <button key={item.id} onClick={() => onNavigate(item.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${active ? 'bg-[#ed1c24] text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-[#181818]'}`}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}

              {/* Akıllı eşleştirme motoru — yeni sekmede açılır */}
              <div ref={motorRef} className="relative">
                <button
                  onClick={() => setMotorOpen(!motorOpen)}
                  aria-haspopup="menu"
                  aria-expanded={motorOpen}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition border ${motorOpen ? 'bg-[#fbe8e9] border-[#ed1c24]/40 text-[#c91018]' : 'border-[#ed1c24]/30 text-[#d71920] hover:bg-[#fbe8e9]'}`}
                >
                  <Sparkles className="h-4 w-4" />
                  Akıllı Eşleştirme
                  <ChevronDown className={`h-4 w-4 transition-transform ${motorOpen ? 'rotate-180' : ''}`} />
                </button>
                {motorOpen && (
                  <div role="menu" className="absolute left-0 top-full mt-2 w-72 bg-white text-[#181818] rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
                    <div className="px-4 pt-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Uyum skoru motoru · yeni sekme</div>
                    {MOTOR_MODULES.map((m) => (
                      <a
                        key={m.id}
                        role="menuitem"
                        href={motorUrl(m.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMotorOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-[#f6f7f9] transition group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#fbe8e9] text-[#d71920] flex items-center justify-center shrink-0">
                          <Landmark className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-sm font-bold group-hover:text-[#ed1c24] transition">
                            {m.label} <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{m.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Dark mode toggle + Profile dropdown */}
            <div className="hidden lg:flex items-center gap-3 relative">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2a2a] dark:hover:bg-[#333] transition"
                title={darkMode ? 'Açık moda geç' : 'Koyu moda geç'}
              >
                {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-gray-600" />}
              </button>
              <div ref={profileRef} className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                <div className="w-8 h-8 rounded-full bg-[#ed1c24] flex items-center justify-center text-sm font-bold">{company?.name?.charAt(0).toUpperCase() || 'K'}</div>
                <span className="text-sm font-medium max-w-[120px] truncate">{company?.name || 'Profilim'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-[#181818] rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-bold text-sm truncate">{company?.name || 'Kullanıcı'}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{company?.contact_email || ''}</p>
                  </div>
                  <button onClick={() => { onNavigate('profile'); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#f6f7f9] transition">
                    <Building2 className="h-4 w-4 text-gray-500" /> Firma Profilim
                  </button>
                  <button onClick={onExit} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100">
                    <LogOut className="h-4 w-4" /> Çıkış Yap
                  </button>
                </div>
              )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-[#181818]">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <button key={item.id} onClick={() => { onNavigate(item.id); setMobileOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${active ? 'bg-[#ed1c24] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="px-4 pt-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#ed1c24]" /> Akıllı Eşleştirme
              </div>
              {MOTOR_MODULES.map((m) => (
                <a
                  key={m.id}
                  href={motorUrl(m.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#d71920] hover:bg-[#fbe8e9] transition"
                >
                  <Landmark className="h-5 w-5" />
                  {m.label}
                  <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                </a>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <button onClick={toggleDarkMode} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {darkMode ? 'Açık Mod' : 'Koyu Mod'}
              </button>
              <button onClick={() => { onNavigate('profile'); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
                <User className="h-5 w-5" /> Firma Profilim
              </button>
              <button onClick={onExit} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 transition">
                <LogOut className="h-5 w-5" /> Çıkış Yap
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
