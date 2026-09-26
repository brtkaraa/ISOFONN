import { useState, useEffect } from 'react';
import {
  Plus, FileText, Award, Layers, TrendingUp, Loader2,
  Trash2, ArrowRight, Bell, FileCheck, ChevronDown, ChevronUp,
  Search, AlertCircle,
} from 'lucide-react';
import { supabase, SECTORS, type Project, type ProjectNotification, type ProjectDraft } from '@/lib/supabase';

type Props = {
  onNewProject: () => void;
  onSelectProject: (project: Project) => void;
  onSelectDraft: (project: Project, draft: ProjectDraft) => void;
};

export default function ProjectsPage({ onNewProject, onSelectProject, onSelectDraft }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Record<string, ProjectNotification[]>>({});
  const [drafts, setDrafts] = useState<Record<string, ProjectDraft[]>>({});
  const [showNotifications, setShowNotifications] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      const projs = data as Project[];
      setProjects(projs);
      const notifMap: Record<string, ProjectNotification[]> = {};
      const draftMap: Record<string, ProjectDraft[]> = {};
      for (const proj of projs) {
        const [notifsRes, draftsRes] = await Promise.all([
          supabase.from('project_notifications').select('*').eq('project_id', proj.id).order('created_at', { ascending: false }),
          supabase.from('project_drafts').select('*').eq('project_id', proj.id).order('created_at', { ascending: false }),
        ]);
        if (notifsRes.data) notifMap[proj.id] = notifsRes.data as ProjectNotification[];
        if (draftsRes.data) draftMap[proj.id] = draftsRes.data as ProjectDraft[];
      }
      setNotifications(notifMap);
      setDrafts(draftMap);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleMarkRead = async (notifId: string, projectId: string) => {
    await supabase.from('project_notifications').update({ read: true }).eq('id', notifId);
    const projNotifs = notifications[projectId] || [];
    setNotifications({
      ...notifications,
      [projectId]: projNotifs.map((n) => (n.id === notifId ? { ...n, read: true } : n)),
    });
  };

  const sectorLabel = (val: string) => SECTORS.find((s) => s.value === val)?.label || val;
  const sectorIcon = (val: string) => SECTORS.find((s) => s.value === val)?.icon || '📦';

  const filtered = projects.filter((p) => {
    if (!search) return true;
    return p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
  });

  const statusLabels: Record<string, string> = {
    draft: 'Taslak',
    matched: 'Eşleşti',
    submitted: 'Başvuruldu',
    completed: 'Tamamlandı',
  };

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    matched: 'bg-[#fbe8e9] text-[#d71920]',
    submitted: 'bg-amber-100 text-amber-700',
    completed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 text-[#181818] dark:text-gray-100">Projelerim</h1>
            <p className="text-gray-500 dark:text-gray-400">Ar-Ge projelerinizi yönetin ve fon eşleştirmelerini takip edin.</p>
          </div>
          <button
            onClick={onNewProject}
            className="bg-[#ed1c24] hover:bg-[#c91018] text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-lg shadow-[#ed1c24]/20"
          >
            <Plus className="h-5 w-5" /> Yeni Proje
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Toplam Proje', value: projects.length, icon: FileText },
            { label: 'Eşleşen', value: projects.filter((p) => p.status === 'matched').length, icon: Award },
            { label: 'Ortalama TRL', value: projects.length ? (projects.reduce((s, p) => s + p.trl_level, 0) / projects.length).toFixed(1) : '-', icon: TrendingUp },
            { label: 'Sektör Sayısı', value: new Set(projects.map((p) => p.sector)).size, icon: Layers },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-[#fbe8e9] text-[#d71920]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-extrabold text-[#181818] dark:text-gray-100">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        {projects.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Proje ara..."
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] py-3.5 pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-[#ed1c24] focus:ring-2 focus:ring-[#ed1c24]/10 dark:text-gray-100"
              />
            </div>
          </div>
        )}

        {/* Projects List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-[#ed1c24] animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#fbe8e9] flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-[#d71920]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#181818] dark:text-gray-100">Henüz projeniz yok</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">İlk Ar-Ge projenizi oluşturun ve yapay zeka ile fon eşleştirin.</p>
            <button
              onClick={onNewProject}
              className="bg-[#ed1c24] hover:bg-[#c91018] text-white font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition shadow-lg shadow-[#ed1c24]/20"
            >
              <Plus className="h-5 w-5" /> Yeni Proje Oluştur
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-100 dark:border-gray-700 p-12 text-center">
            <AlertCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Aramanıza uygun proje bulunamadı.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((project) => {
              const projDrafts = drafts[project.id] || [];
              const projNotifs = notifications[project.id] || [];
              const unreadCount = projNotifs.filter((n) => !n.read).length;

              return (
                <article
                  key={project.id}
                  className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ed1c24]/30 hover:shadow-lg cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fbe8e9] text-lg">
                        {sectorIcon(project.sector)}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#181818] dark:text-gray-100 group-hover:text-[#ed1c24] transition">{project.title}</h3>
                        <p className="text-xs text-gray-400">{sectorLabel(project.sector)}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                      className="text-gray-300 hover:text-red-500 transition p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{project.description}</p>

                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="bg-[#fbe8e9] text-[#d71920] text-xs font-bold px-3 py-1 rounded-full">TRL {project.trl_level}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColors[project.status] || statusColors.draft}`}>
                      {statusLabels[project.status] || 'Taslak'}
                    </span>
                    {projDrafts.length > 0 && (
                      <span className="bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <FileCheck className="h-3 w-3" /> {projDrafts.length} Taslak
                      </span>
                    )}
                    {unreadCount > 0 && (
                      <span className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                        <Bell className="h-3 w-3" /> {unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Drafts dropdown */}
                  {showDrafts === project.id && projDrafts.length > 0 && (
                    <div className="mb-4 space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Başvuru Taslakları</div>
                      {projDrafts.map((draft) => (
                        <div
                          key={draft.id}
                          onClick={(e) => { e.stopPropagation(); onSelectDraft(project, draft); }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:border-amber-300 transition cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/40">
                            <FileCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#181818] dark:text-gray-100">{draft.fund_name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{draft.fund_provider}</p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(draft.created_at).toLocaleDateString('tr-TR')}</p>
                            {draft.documents.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {draft.documents.map((doc, di) => (
                                  <span key={di} className="text-xs bg-white dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                                    <FileText className="h-3 w-3" /> {doc}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notifications dropdown */}
                  {showNotifications === project.id && projNotifs.length > 0 && (
                    <div className="mb-4 space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Bildirimler</div>
                      {projNotifs.map((notif) => (
                        <div key={notif.id} className={`flex items-start gap-3 p-3 rounded-lg ${notif.read ? 'bg-gray-50 dark:bg-[#2a2a2a]' : 'bg-[#fbe8e9] border border-[#ed1c24]/20'}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-gray-200 dark:bg-gray-600' : 'bg-[#fbe8e9]'}`}>
                            <Bell className={`h-4 w-4 ${notif.read ? 'text-gray-400' : 'text-[#d71920]'}`} />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${notif.read ? 'text-gray-500 dark:text-gray-400' : 'text-[#181818] dark:text-gray-100'}`}>{notif.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(notif.created_at).toLocaleDateString('tr-TR')}</p>
                          </div>
                          {!notif.read && (
                            <button
                              onClick={() => handleMarkRead(notif.id, project.id)}
                              className="text-xs text-[#ed1c24] font-medium hover:underline"
                            >Okundu</button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="text-sm text-[#ed1c24] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Fonları Gör <ArrowRight className="h-4 w-4" />
                      </button>
                      {projDrafts.length > 0 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowDrafts(showDrafts === project.id ? null : project.id); }}
                          className="text-sm text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1 hover:text-amber-700 transition"
                        >
                          <FileCheck className="h-4 w-4" /> {projDrafts.length} Taslak
                          {showDrafts === project.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>
                      )}
                      {projNotifs.length > 0 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowNotifications(showNotifications === project.id ? null : project.id); }}
                          className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition"
                        >
                          <Bell className="h-4 w-4" /> {unreadCount > 0 ? `${unreadCount} yeni` : 'Bildirimler'}
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(project.created_at).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
