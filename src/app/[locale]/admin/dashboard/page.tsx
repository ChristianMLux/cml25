'use client';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  Github,
  Save,
  RefreshCw,
  Edit2,
  Check,
  X,
  LogOut,
  Database,
  Cpu,
  Lock,
  Eye,
  EyeOff,
  Star,
  LayoutGrid,
  List,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

import { Dialog } from '@/components/ui/Dialog';
import { app, db } from '@/lib/firebase/firebase';
import { projectsData } from '@/lib/static-data';
import { Project } from '@/types';

// Toast notification type
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

// Extends Project type for local state management (handling statuses)
interface AdminProject extends Partial<Project> {
  id: string; // ID is required
  name: string; // Repo name or display name
  status: 'new' | 'published' | 'hidden' | 'error';
  isFeatured?: boolean;
  isVisible?: boolean;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<AdminProject>>({});
  const [authLoading, setAuthLoading] = useState(true);
  const [migrationLoading, setMigrationLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Toast notifications state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // Toast helper functions
  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, message, type }]);
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Auth Init
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
      if (u) {
        fetchProjects();
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  const logout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setProjects([]);
  };

  // API Interactions
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.projects) {
        const formatted = data.projects.map((p: any) => ({
          ...p,
          name: p.title || p.id,
          status: 'published',
        }));
        // Merge with current state if needed, or just set
        // For simplicity, we just set loaded projects.
        // If we want to keep "new" syncs, we should be careful.
        // Logic: existing "published" projects + newly synced "new" projects.
        setProjects((prev) => {
          const newProjects = prev.filter((p) => p.status === 'new');
          return [...formatted, ...newProjects];
        });
      }
    } catch (e) {
      console.error('Failed to fetch projects', e);
    }
  };

  const syncProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/sync', { method: 'POST' });
      const data = await res.json();

      if (data.projects) {
        // Merge new projects, avoiding duplicates by GitHub ID or Name
        setProjects((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newOnes = data.projects.filter(
            (p: any) => !existingIds.has(p.id),
          );
          return [...newOnes, ...prev];
        });
      }
    } catch (e) {
      console.error('Sync failed', e);
      showToast('Sync failed. Check console and API Keys.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        setIsUploading(true);
        try {
          const file = item.getAsFile();
          if (!file) return;

          const formData = new FormData();
          formData.append('file', file);

          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) throw new Error('Upload failed');

          const data = await res.json();
          setEditForm((prev) => ({ ...prev, imageUrl: data.url }));
        } catch (error) {
          console.error('Upload failed', error);
          showToast('Upload failed. Check console.', 'error');
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  const startEdit = (project: AdminProject) => {
    setEditingId(project.id);
    setEditForm({ ...project });
  };

  const saveEdit = () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === editingId ? ({ ...p, ...editForm } as AdminProject) : p,
      ),
    );
    setEditingId(null);
  };

  const publishProject = async (project: AdminProject) => {
    try {
      // Save to DB directly (Client SDK uses Auth)
      const { id, ...data } = project;

      // Sanitize data
      const payload: Partial<Project> = {
        title: data.title || data.name,
        description: data.description,
        imageUrl: data.imageUrl || '/assets/images/placeholder.jpg',
        images: data.images || [],
        technologies: data.technologies || [],
        category: data.category || 'web',
        tags: data.tags || [],
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        isFeatured: data.isFeatured ?? false,
        isVisible: data.isVisible ?? true,
        isPrivate: data.isPrivate ?? false,
        source: 'firestore',
      };

      // Remove undefined values
      Object.keys(payload).forEach(
        (key) =>
          payload[key as keyof typeof payload] === undefined &&
          delete payload[key as keyof typeof payload],
      );

      await setDoc(doc(db, 'projects', id), payload, { merge: true });

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'published' } : p)),
      );
    } catch (e) {
      console.error('Publish error', e);
      showToast('Failed to publish: ' + (e as any).message, 'error');
    }
  };

  if (authLoading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Loading Auth...
      </div>
    );

  const executeMigration = async () => {
    setMigrationLoading(true);
    try {
      let count = 0;
      for (const project of projectsData) {
        // Prepare data matching Project interface
        const payload: Partial<Project> = {
          title: project.id,
          description: 'Imported from Legacy Data',
          imageUrl: project.imageUrl || '/assets/images/placeholder.jpg',
          images: project.images || [],
          technologies: project.technologies || [],
          category: project.category || 'web',
          tags: project.tags || [],
          link: project.link,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          // Legacy projects are usually visible
          isFeatured: true,
          isVisible: true,
          source: 'firestore',
        };

        // Remove undefined
        Object.keys(payload).forEach(
          (key) =>
            payload[key as keyof typeof payload] === undefined &&
            delete payload[key as keyof typeof payload],
        );

        await setDoc(doc(db, 'projects', project.id), payload, { merge: true });
        count++;
      }

      showToast(`Successfully migrated ${count} projects. Refreshing...`, 'success');
      fetchProjects();
    } catch (e) {
      console.error('Migration failed', e);
      showToast('Migration failed: ' + (e as any).message, 'error');
    } finally {
      setMigrationLoading(false);
    }
  };

  const migrateLegacyProjects = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Migrate Legacy Projects',
      message:
        'This will migrate all legacy (hardcoded) projects to Firestore. Continue?',
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        executeMigration();
      },
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground font-sans">
        <div className="p-8 bg-glass-low backdrop-blur-md border border-glass-border rounded-xl shadow-xl w-96 text-center">
          <div className="mb-6 bg-cyber-neon/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-cyber-neon">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            Admin Access
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Portfolio Management System
          </p>
          <button
            onClick={login}
            className="w-full bg-cyber-neon hover:bg-cyber-neon/90 text-black font-medium py-2.5 px-4 rounded-lg transition-all duration-200 ease-spring hover:shadow-lg hover:shadow-cyber-neon/30"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-6 pb-32 pt-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-cyber-neon/20 p-2 rounded-lg text-cyber-neon">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Content Manager
            </h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-cyber-neon" />
              Firestore Connected
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user.email}
          </span>
          <button
            onClick={logout}
            className="p-2 hover:bg-glass-low rounded-full text-muted-foreground hover:text-cyber-pink transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Actions */}
      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Project Repository
            </h2>
            <p className="text-sm text-muted-foreground">
              Sync with GitHub to find new repositories.
            </p>
          </div>

          <div className="flex gap-3">
            {/* View Toggle */}
            <div className="flex bg-glass-low rounded-lg p-1 border border-glass-border mr-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-cyber-neon text-black' : 'text-muted-foreground hover:text-foreground'}`}
                title="List View"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-cyber-neon text-black' : 'text-muted-foreground hover:text-foreground'}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            <button
              onClick={migrateLegacyProjects}
              disabled={migrationLoading || loading}
              className="flex items-center gap-2 px-4 py-2 bg-glass-low hover:bg-glass-medium border border-glass-border text-foreground rounded-lg text-sm transition-all hover:border-cyber-cyan/50"
            >
              {migrationLoading ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <Database size={18} />
              )}
              {migrationLoading ? 'Migrating...' : 'Migrate Legacy'}
            </button>

            <button
              onClick={syncProjects}
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                loading
                  ? 'bg-glass-low text-muted-foreground cursor-not-allowed'
                  : 'bg-cyber-neon hover:bg-cyber-neon/90 text-black shadow-lg shadow-cyber-neon/20'
              }`}
            >
              {loading ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <Github size={18} />
              )}
              {loading ? 'AI is analyzing...' : 'Sync & Generate AI Content'}
            </button>
          </div>
        </div>

        {/* Project List */}
        <div
          className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
        >
          {projects.length === 0 && !loading && (
            <div className="text-center py-20 border-2 border-dashed border-glass-border rounded-xl col-span-full">
              <p className="text-muted-foreground">
                No projects found yet. Click Sync to start.
              </p>
            </div>
          )}

          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-glass-low backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 ease-spring flex flex-col ${
                project.status === 'published'
                  ? 'border-cyber-neon/30 opacity-95'
                  : 'border-glass-border hover:border-cyber-pink/50 shadow-lg'
              }`}
            >
              {editingId === project.id ? (
                // --- Edit Mode ---
                <div className="p-6 bg-glass-medium backdrop-blur-md animate-in fade-in duration-300">
                  {/* ... (Edit Content remains same) ... */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-cyber-neon font-mono text-sm">
                      Editing: {project.name || project.title}
                    </h3>
                    <button onClick={() => setEditingId(null)}>
                      <X
                        size={20}
                        className="text-muted-foreground hover:text-cyber-pink"
                      />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Simplified Edit Form for brevity in this replace, keeping logic identical */}
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Title
                      </label>
                      <input
                        className="w-full bg-background border border-glass-border rounded-lg p-2 text-sm text-foreground focus:ring-2 focus:ring-cyber-neon outline-none"
                        value={editForm.title || ''}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        AI Generated Description
                      </label>
                      <textarea
                        className="w-full bg-background border border-glass-border rounded-lg p-3 text-sm text-foreground focus:ring-2 focus:ring-cyber-neon outline-none min-h-[100px]"
                        value={editForm.description || ''}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* ... (Other Edit Fields) ... */}
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1 flex justify-between">
                        <span>Image URL (Screenshot)</span>
                        <span className="text-cyber-cyan font-normal">
                          {isUploading
                            ? 'Uploading...'
                            : 'Paste (Ctrl+V) enabled'}
                        </span>
                      </label>
                      <input
                        className={`w-full bg-background border rounded-lg p-2 text-sm text-foreground focus:ring-2 focus:ring-cyber-neon outline-none transition-colors ${isUploading ? 'border-cyber-cyan animate-pulse' : 'border-glass-border'}`}
                        value={editForm.imageUrl || ''}
                        onPaste={handlePaste}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder={
                          isUploading
                            ? 'Uploading image...'
                            : 'Paste screenshot here or enter URL'
                        }
                        disabled={isUploading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Technologies (Comma separated)
                      </label>
                      <input
                        className="w-full bg-background border border-glass-border rounded-lg p-3 text-sm text-foreground focus:ring-2 focus:ring-cyber-neon outline-none"
                        value={editForm.technologies?.join(', ') || ''}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            technologies: e.target.value
                              .split(',')
                              .map((s) => s.trim()),
                          })
                        }
                      />
                    </div>

                    <div className="flex gap-4 p-4 bg-glass-low rounded-lg border border-glass-border">
                      <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={editForm.isVisible ?? true}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              isVisible: e.target.checked,
                            })
                          }
                          className="rounded bg-background border-glass-border text-cyber-neon"
                        />
                        <Eye
                          size={16}
                          className={
                            editForm.isVisible !== false
                              ? 'text-cyber-cyan'
                              : 'text-muted-foreground'
                          }
                        />
                        <span className="text-foreground">Visible</span>
                      </label>

                      <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={editForm.isFeatured ?? false}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              isFeatured: e.target.checked,
                            })
                          }
                          className="rounded bg-background border-glass-border text-cyber-warning"
                        />
                        <Star
                          size={16}
                          className={
                            editForm.isFeatured
                              ? 'fill-cyber-warning text-cyber-warning'
                              : 'text-muted-foreground'
                          }
                        />
                        <span className="text-foreground">Featured</span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-2 bg-cyber-neon hover:bg-cyber-neon/90 text-black px-4 py-2 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-cyber-neon/30"
                      >
                        <Check size={16} /> Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // --- View Mode ---
                <div
                  className={`p-6 flex gap-6 ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col h-full'}`}
                >
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3
                        className="text-xl font-bold text-foreground line-clamp-1"
                        title={project.title || project.name}
                      >
                        {project.title || project.name}
                      </h3>
                      {/* Badges */}
                      <div className="flex gap-2">
                        {project.isPrivate && (
                          <span className="px-2 py-0.5 bg-glass-low text-muted-foreground text-[10px] uppercase font-bold rounded border border-glass-border">
                            Private
                          </span>
                        )}
                        {project.status === 'new' && (
                          <span className="px-2 py-0.5 bg-cyber-cyan/20 text-cyber-cyan text-[10px] uppercase font-bold rounded border border-cyber-cyan/50">
                            New
                          </span>
                        )}
                        {project.status === 'published' && (
                          <span className="px-2 py-0.5 bg-cyber-neon/20 text-cyber-neon text-[10px] uppercase font-bold rounded border border-cyber-neon/50">
                            Published
                          </span>
                        )}
                        {project.isFeatured && (
                          <span className="px-2 py-0.5 bg-cyber-warning/20 text-cyber-warning text-[10px] uppercase font-bold rounded border border-cyber-warning/50">
                            <Star
                              size={10}
                              className="inline fill-cyber-warning mb-0.5"
                            />{' '}
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      className={`text-muted-foreground text-sm leading-relaxed mb-4 ${viewMode === 'grid' ? 'line-clamp-3' : ''}`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies
                        ?.slice(0, viewMode === 'grid' ? 4 : 10)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      {viewMode === 'grid' &&
                        (project.technologies?.length || 0) > 4 && (
                        <span className="px-2 py-1 bg-glass-low text-muted-foreground text-xs rounded-md border border-glass-border">
                            +{project.technologies!.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div
                    className={`flex gap-2 justify-center min-w-[140px] ${
                      viewMode === 'list'
                        ? 'sm:flex-col sm:border-l sm:border-glass-border sm:pl-6'
                        : 'pt-4 border-t border-glass-border mt-4'
                    }`}
                  >
                    <button
                      onClick={() => startEdit(project)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-glass-low hover:bg-glass-medium border border-glass-border text-foreground text-xs rounded-lg transition-all hover:border-cyber-cyan/50"
                    >
                      <Edit2 size={14} /> Edit
                    </button>

                    <button
                      onClick={() => publishProject(project)}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs rounded-lg transition-all ${project.status === 'published' ? 'bg-glass-low border border-glass-border text-foreground hover:border-cyber-cyan/50' : 'bg-cyber-neon hover:bg-cyber-neon/90 text-black'}`}
                    >
                      {project.status === 'published' ? (
                        <RefreshCw size={14} />
                      ) : (
                        <Database size={14} />
                      )}
                      {project.status === 'published'
                        ? 'Update DB'
                        : 'Publish DB'}
                    </button>

                    <div
                      className={`flex items-center justify-center gap-2 pt-2 text-[10px] text-muted-foreground ${viewMode === 'grid' ? 'hidden' : ''}`}
                    >
                      <Cpu size={12} />
                      <span>AI Generated</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Toast Notifications */}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 p-4 rounded-lg backdrop-blur-xl border shadow-lg animate-in slide-in-from-right duration-300 ${
                toast.type === 'error'
                  ? 'bg-cyber-error/20 border-cyber-error/50 text-cyber-error'
                  : toast.type === 'success'
                    ? 'bg-cyber-neon/20 border-cyber-neon/50 text-cyber-neon'
                    : 'bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan'
              }`}
            >
              {toast.type === 'error' && <AlertCircle size={18} />}
              {toast.type === 'success' && <CheckCircle size={18} />}
              {toast.type === 'info' && <Info size={18} />}
              <span className="text-sm flex-1">{toast.message}</span>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-current opacity-70 hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        title={confirmDialog.title}
        size="sm"
      >
        <p className="text-muted-foreground mb-6">{confirmDialog.message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() =>
              setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
            }
            className="px-4 py-2 bg-glass-low hover:bg-glass-medium border border-glass-border text-foreground rounded-lg text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={confirmDialog.onConfirm}
            className="px-4 py-2 bg-cyber-neon hover:bg-cyber-neon/90 text-black rounded-lg text-sm font-medium transition-all"
          >
            Continue
          </button>
        </div>
      </Dialog>
    </div>
  );
}
