import { useState, useEffect } from 'react';
import {
  ArrowLeft, Landmark, Building2, Globe, Award, Calendar, Clock,
  CircleDollarSign, TrendingUp, CheckCircle2, FileText, ExternalLink,
  Upload, AlertCircle, X, Target, ListChecks, FileCheck,
  Wallet, Ban, Info, Link2, Monitor, Plus, FolderOpen, Loader2,
} from 'lucide-react';
import { supabase, FUND_TYPE_LABELS, SECTORS, type Fund, type Project } from '@/lib/supabase';

type Props = {
  fund: Fund;
  onBack: () => void;
  onApply: (fund: Fund) => void;
  onApplyExisting?: (project: Project, fund: Fund) => void;
};

export default function CallDetail({ fund, onBack, onApply, onApplyExisting }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  useEffect(() => {
    if (showProjectPicker && projects.length === 0 && !loadingProjects) {
      setLoadingProjects(true);
      supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data) setProjects(data as Project[]);
          setLoadingProjects(false);
        });
    }
  }, [showProjectPicker, projects.length, loadingProjects]);

  const fundTypeIcons: Record<string, typeof Landmark> = {
    kamu: Landmark,
    ozel_sektor: Building2,
    ab: Globe,
  };

  const Icon = fundTypeIcons[fund.type] || Award;

  const typeColors: Record<string, { bg: string; text: string }> = {
    kamu: { bg: 'bg-green-50', text: 'text-green-600' },
    ozel_sektor: { bg: 'bg-amber-50', text: 'text-amber-600' },
    ab: { bg: 'bg-cyan-50', text: 'text-cyan-600' },
  };
  const c = typeColors[fund.type] || typeColors.kamu;
  const statusLabel = fund.status === 'open' ? 'Başvuruya Açık' : fund.status === 'closed' ? 'Kapalı' : 'Takvime Bağlı';
  const statusClass = fund.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-300';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles([...uploadedFiles, ...names]);
    }
  };

  const removeFile = (name: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f !== name));
  };

  const allDocsUploaded = fund.required_docs.every((doc) =>
    uploadedFiles.some((f) => f.toLowerCase().includes(doc.toLowerCase().split(' ')[0]))
  );

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#ed1c24] transition mb-6 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" /> Çağrılara Geri Dön
        </button>

        {/* Header Card */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
          <div className="bg-slate-900 text-white p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${c.bg} ${c.text}`}>
                <Icon className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {fund.code && <span className="text-sm font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{fund.code}</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.bg} ${c.text}`}>
                    {FUND_TYPE_LABELS[fund.type]}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusClass}`}>
                    {statusLabel}
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-1">{fund.name}</h1>
                <p className="text-slate-400 text-sm">{fund.provider}</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">{fund.description}</p>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gray-100 dark:bg-gray-700">
            {[
              { icon: CircleDollarSign, label: 'Program bütçesi', value: fund.budget || '-' },
              { icon: CircleDollarSign, label: 'Proje üst limiti', value: fund.max_budget_per_project || '-' },
              { icon: TrendingUp, label: 'Destek oranı', value: fund.support_rate || '-' },
              { icon: Clock, label: 'Süre', value: fund.duration || '-' },
              { icon: Calendar, label: 'Son başvuru', value: fund.deadline || '-' },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <div key={i} className="bg-white dark:bg-[#1e1e1e] p-4 text-center">
                  <ItemIcon className="h-5 w-5 text-[#ed1c24] mx-auto mb-2" />
                  <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-[#181818] dark:text-gray-100">{item.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sectors */}
        {fund.sectors.length > 0 && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 text-[#181818] dark:text-gray-100">İlgili sektörler</h2>
            <div className="flex flex-wrap gap-2">
              {fund.sectors.map((sector) => {
                const item = SECTORS.find((entry) => entry.value === sector);
                return item ? <span key={sector} className="rounded-full bg-[#fbe8e9] px-3 py-1.5 text-sm font-medium text-[#d71920]">{item.icon} {item.label}</span> : null;
              })}
            </div>
          </div>
        )}

        {/* Technical Scope */}
        {fund.technical_scope && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" /> Teknik Kapsam
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{fund.technical_scope}</p>
          </div>
        )}

        {/* Eligibility */}
        {fund.eligibility.length > 0 && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-[#ed1c24]" /> Başvuru Koşulları
            </h2>
            <ul className="space-y-3">
              {fund.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Required Documents */}
        {fund.required_docs.length > 0 && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-[#ed1c24]" /> Gerekli Belgeler
              </h2>
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="text-sm text-[#ed1c24] font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                <Upload className="h-4 w-4" /> Belge Yükle
              </button>
            </div>

            {/* Upload area */}
            {showUpload && (
              <div className="mb-4 animate-fade-in">
                <label className="block">
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-8 text-center hover:border-[#ed1c24] transition cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Belge yüklemek için tıklayın veya sürükleyin</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (maks. 10MB)</p>
                    <input type="file" multiple className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
                  </div>
                </label>
              </div>
            )}

            {/* Uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="mb-4 space-y-2">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#fbe8e9] rounded-lg p-3">
                    <FileText className="h-5 w-5 text-[#d71920] flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-200 flex-1 truncate">{file}</span>
                    <button onClick={() => removeFile(file)} className="text-gray-400 hover:text-red-500 transition">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Document checklist */}
            <ul className="space-y-2">
              {fund.required_docs.map((doc, i) => {
                const uploaded = uploadedFiles.some((f) =>
                  f.toLowerCase().includes(doc.toLowerCase().split(' ')[0])
                );
                return (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {uploaded ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-gray-600 flex-shrink-0" />
                    )}
                    <span className={uploaded ? 'text-gray-400 line-through' : 'text-gray-600 dark:text-gray-300'}>{doc}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Supported Expenses */}
        {fund.supported_expenses.length > 0 && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-600" /> Desteklenen Giderler
            </h2>
            <ul className="space-y-2">
              {fund.supported_expenses.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Excluded Expenses */}
        {fund.excluded_expenses.length > 0 && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Ban className="h-5 w-5 text-red-500" /> Desteklenmeyen Giderler
            </h2>
            <ul className="space-y-2">
              {fund.excluded_expenses.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Application System & Method */}
        {(fund.application_system || fund.application_method) && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Monitor className="h-5 w-5 text-blue-600" /> Başvuru Sistemi & Yöntemi
            </h2>
            <div className="space-y-3">
              {fund.application_system && (
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Başvuru Sistemi</span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-1">{fund.application_system}</p>
                </div>
              )}
              {fund.application_method && (
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Başvuru Yöntemi</span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-1">{fund.application_method}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {fund.notes.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-700/30 p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Info className="h-5 w-5" /> Önemli Notlar
            </h2>
            <ul className="space-y-3">
              {fund.notes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Source Links */}
        {fund.source_links.length > 0 && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Link2 className="h-5 w-5 text-[#ed1c24]" /> Kaynak Bağlantıları
            </h2>
            <ul className="space-y-2">
              {fund.source_links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#ed1c24] hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 flex-shrink-0" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* External link */}
        {fund.application_url && (
          <div className="bg-[#fbe8e9] rounded-xl border border-[#ed1c24]/20 p-4 mb-6 flex items-center gap-3">
            <ExternalLink className="h-5 w-5 text-[#d71920] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-[#d71920]">Resmi başvuru sayfası ve detaylı bilgi için:</p>
              <a
                href={fund.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#ed1c24] font-medium hover:underline"
              >
                {fund.application_url}
              </a>
            </div>
          </div>
        )}

        {/* Actions */}
        {!showProjectPicker ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onApply(fund)}
              className="flex-1 bg-[#ed1c24] hover:bg-[#c91018] text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-lg shadow-[#ed1c24]/20"
            >
              <Plus className="h-5 w-5" /> Yeni Proje ile Başvur
            </button>
            {onApplyExisting && (
              <button
                onClick={() => setShowProjectPicker(true)}
                className="flex-1 bg-white hover:bg-gray-50 dark:bg-[#2a2a2a] dark:hover:bg-[#333] text-[#181818] dark:text-gray-100 font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition border-2 border-gray-200 dark:border-gray-700"
              >
                <FolderOpen className="h-5 w-5" /> Projemle Eşleştir
              </button>
            )}
            {fund.application_url && (
              <a
                href={fund.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-800 hover:bg-gray-700 dark:bg-[#2a2a2a] dark:hover:bg-[#333] text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <ExternalLink className="h-5 w-5" /> Resmi Sayfaya Git
              </a>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-[#ed1c24]" /> Proje Seçin
              </h2>
              <button
                onClick={() => setShowProjectPicker(false)}
                className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition font-medium"
              >
                <X className="h-4 w-4 inline" /> İptal
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Bu çağrıyı hangi projenizle eşleştirmek istersiniz?</p>
            {loadingProjects ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 text-[#ed1c24] animate-spin" /></div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Henüz projeniz yok. Yeni bir proje oluşturun.</p>
                <button
                  onClick={() => onApply(fund)}
                  className="bg-[#ed1c24] hover:bg-[#c91018] text-white font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition"
                >
                  <Plus className="h-5 w-5" /> Yeni Proje Oluştur
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {projects.map((proj) => {
                  const sector = SECTORS.find((s) => s.value === proj.sector);
                  const trlMatch = proj.trl_level >= fund.min_trl && proj.trl_level <= fund.max_trl;
                  const sectorMatch = fund.sectors.includes(proj.sector);
                  return (
                    <div
                      key={proj.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#ed1c24]/40 hover:bg-[#fbe8e9]/30 transition cursor-pointer"
                      onClick={() => onApplyExisting?.(proj, fund)}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fbe8e9] text-lg flex-shrink-0">
                        {sector?.icon || '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-[#181818] dark:text-gray-100 truncate">{proj.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{proj.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full font-medium">TRL {proj.trl_level}</span>
                          {trlMatch && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">TRL uyumlu</span>}
                          {sectorMatch && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Sektör uyumlu</span>}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Status note */}
        {uploadedFiles.length > 0 && !allDocsUploaded && (
          <div className="mt-4 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 rounded-lg p-3">
            <AlertCircle className="h-4 w-4" />
            Tüm gerekli belgeleri yüklediğinizden emin olun.
          </div>
        )}
        {allDocsUploaded && fund.required_docs.length > 0 && (
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg p-3">
            <CheckCircle2 className="h-4 w-4" />
            Tüm gerekli belgeler yüklendi. Başvuruya hazırsınız!
          </div>
        )}
      </div>
    </div>
  );
}
