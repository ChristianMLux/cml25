"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { app, db } from "@/lib/firebase/firebase";
import { Project } from "@/types";
import { projectsData } from "@/lib/static-data";
import { doc, setDoc } from "firebase/firestore";

// Extends Project type for local state management (handling statuses)
interface AdminProject extends Partial<Project> {
  id: string; // ID is required
  name: string; // Repo name or display name
  status: "new" | "published" | "hidden" | "error";
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
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

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
      console.error("Login failed", e);
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
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) {
        const formatted = data.projects.map((p: any) => ({
          ...p,
          name: p.title || p.id,
          status: "published",
        }));
        // Merge with current state if needed, or just set
        // For simplicity, we just set loaded projects.
        // If we want to keep "new" syncs, we should be careful.
        // Logic: existing "published" projects + newly synced "new" projects.
        setProjects((prev) => {
          const newProjects = prev.filter((p) => p.status === "new");
          return [...formatted, ...newProjects];
        });
      }
    } catch (e) {
      console.error("Failed to fetch projects", e);
    }
  };

  const syncProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
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
      console.error("Sync failed", e);
      alert("Sync failed. Check console and API Keys.");
    } finally {
      setLoading(false);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf("image") !== -1) {
        e.preventDefault();
        setIsUploading(true);
        try {
          const file = item.getAsFile();
          if (!file) return;

          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) throw new Error("Upload failed");

          const data = await res.json();
          setEditForm((prev) => ({ ...prev, imageUrl: data.url }));
        } catch (error) {
          console.error("Upload failed", error);
          alert("Upload failed. Check console.");
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
        imageUrl: data.imageUrl || "/assets/images/placeholder.jpg",
        images: data.images || [],
        technologies: data.technologies || [],
        category: data.category || "web",
        tags: data.tags || [],
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        isFeatured: data.isFeatured ?? false,
        isVisible: data.isVisible ?? true,
        isPrivate: data.isPrivate ?? false,
        source: "firestore",
      };

      // Remove undefined values
      Object.keys(payload).forEach(
        (key) =>
          payload[key as keyof typeof payload] === undefined &&
          delete payload[key as keyof typeof payload],
      );

      await setDoc(doc(db, "projects", id), payload, { merge: true });

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "published" } : p)),
      );
    } catch (e) {
      console.error("Publish error", e);
      alert("Failed to publish: " + (e as any).message);
    }
  };

  if (authLoading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">
        Loading Auth...
      </div>
    );

  const migrateLegacyProjects = async () => {
    if (
      !confirm(
        "This will migrate all legacy (hardcoded) projects to Firestore. Continue?",
      )
    )
      return;

    setMigrationLoading(true);
    try {
      let count = 0;
      for (const project of projectsData) {
        // Prepare data matching Project interface
        const payload: Partial<Project> = {
          title: project.id,
          description: "Imported from Legacy Data",
          imageUrl: project.imageUrl || "/assets/images/placeholder.jpg",
          images: project.images || [],
          technologies: project.technologies || [],
          category: project.category || "web",
          tags: project.tags || [],
          link: project.link,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          // Legacy projects are usually visible
          isFeatured: true,
          isVisible: true,
          source: "firestore",
        };

        // Remove undefined
        Object.keys(payload).forEach(
          (key) =>
            payload[key as keyof typeof payload] === undefined &&
            delete payload[key as keyof typeof payload],
        );

        await setDoc(doc(db, "projects", project.id), payload, { merge: true });
        count++;
      }

      alert(`Successfully migrated ${count} projects. Refreshing...`);
      fetchProjects();
    } catch (e) {
      console.error("Migration failed", e);
      alert("Migration failed: " + (e as any).message);
    } finally {
      setMigrationLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-slate-100 font-sans">
        <div className="p-8 bg-slate-800 rounded-lg shadow-xl border border-slate-700 w-96 text-center">
          <div className="mb-6 bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-blue-400">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Admin Access</h2>
          <p className="text-slate-400 mb-6 text-sm">
            Portfolio Management System
          </p>
          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 pb-32 pt-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Content Manager</h1>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Firestore Connected
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 hidden sm:block">
            {user.email}
          </span>
          <button
            onClick={logout}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Actions */}
      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Project Repository
            </h2>
            <p className="text-sm text-slate-400">
              Sync with GitHub to find new repositories.
            </p>
          </div>

          <div className="flex gap-3">
            {/* View Toggle */}
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800 mr-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${viewMode === "list" ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}
                title="List View"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded ${viewMode === "grid" ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            <button
              onClick={migrateLegacyProjects}
              disabled={migrationLoading || loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm border border-slate-700 transition-all"
            >
              {migrationLoading ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <Database size={18} />
              )}
              {migrationLoading ? "Migrating..." : "Migrate Legacy"}
            </button>

            <button
              onClick={syncProjects}
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                loading
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20"
              }`}
            >
              {loading ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <Github size={18} />
              )}
              {loading ? "AI is analyzing..." : "Sync & Generate AI Content"}
            </button>
          </div>
        </div>

        {/* Project List */}
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {projects.length === 0 && !loading && (
            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-xl col-span-full">
              <p className="text-slate-500">
                No projects found yet. Click Sync to start.
              </p>
            </div>
          )}

          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-slate-900 border rounded-xl overflow-hidden transition-all flex flex-col ${
                project.status === "published"
                  ? "border-green-900/50 shadow-none opacity-90"
                  : "border-slate-800 shadow-xl"
              }`}
            >
              {editingId === project.id ? (
                // --- Edit Mode ---
                <div className="p-6 bg-slate-800/50 animate-in fade-in duration-300">
                  {/* ... (Edit Content remains same) ... */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-emerald-400 font-mono text-sm">
                      Editing: {project.name || project.title}
                    </h3>
                    <button onClick={() => setEditingId(null)}>
                      <X size={20} className="text-slate-500" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Simplified Edit Form for brevity in this replace, keeping logic identical */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Title
                      </label>
                      <input
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200"
                        value={editForm.title || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        AI Generated Description
                      </label>
                      <textarea
                        className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]"
                        value={editForm.description || ""}
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
                      <label className="block text-xs font-semibold text-slate-400 mb-1 flex justify-between">
                        <span>Image URL (Screenshot)</span>
                        <span className="text-indigo-400 font-normal">
                          {isUploading
                            ? "Uploading..."
                            : "Paste (Ctrl+V) enabled"}
                        </span>
                      </label>
                      <input
                        className={`w-full bg-slate-950 border rounded p-2 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-colors ${isUploading ? "border-indigo-500 animate-pulse" : "border-slate-700"}`}
                        value={editForm.imageUrl || ""}
                        onPaste={handlePaste}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder={
                          isUploading
                            ? "Uploading image..."
                            : "Paste screenshot here or enter URL"
                        }
                        disabled={isUploading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Technologies (Comma separated)
                      </label>
                      <input
                        className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={editForm.technologies?.join(", ") || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            technologies: e.target.value
                              .split(",")
                              .map((s) => s.trim()),
                          })
                        }
                      />
                    </div>

                    <div className="flex gap-4 p-4 bg-slate-900/50 rounded-lg">
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
                          className="rounded bg-slate-800 border-slate-600 text-indigo-500"
                        />
                        <Eye
                          size={16}
                          className={
                            editForm.isVisible !== false
                              ? "text-indigo-400"
                              : "text-slate-600"
                          }
                        />
                        <span>Visible</span>
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
                          className="rounded bg-slate-800 border-slate-600 text-amber-500"
                        />
                        <Star
                          size={16}
                          className={
                            editForm.isFeatured
                              ? "fill-amber-500 text-amber-500"
                              : "text-slate-600"
                          }
                        />
                        <span>Featured</span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded text-sm"
                      >
                        <Check size={16} /> Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // --- View Mode ---
                <div
                  className={`p-6 flex gap-6 ${viewMode === "list" ? "flex-col sm:flex-row" : "flex-col h-full"}`}
                >
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3
                        className="text-xl font-bold text-white line-clamp-1"
                        title={project.title || project.name}
                      >
                        {project.title || project.name}
                      </h3>
                      {/* Badges */}
                      <div className="flex gap-2">
                        {project.isPrivate && (
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] uppercase font-bold rounded border border-slate-700">
                            Private
                          </span>
                        )}
                        {project.status === "new" && (
                          <span className="px-2 py-0.5 bg-blue-900/50 text-blue-300 text-[10px] uppercase font-bold rounded border border-blue-800">
                            New
                          </span>
                        )}
                        {project.status === "published" && (
                          <span className="px-2 py-0.5 bg-green-900/50 text-green-300 text-[10px] uppercase font-bold rounded border border-green-800">
                            Published
                          </span>
                        )}
                        {project.isFeatured && (
                          <span className="px-2 py-0.5 bg-amber-900/30 text-amber-400 text-[10px] uppercase font-bold rounded border border-amber-800/50">
                            <Star
                              size={10}
                              className="inline fill-amber-400 mb-0.5"
                            />{" "}
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      className={`text-slate-400 text-sm leading-relaxed mb-4 ${viewMode === "grid" ? "line-clamp-3" : ""}`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies
                        ?.slice(0, viewMode === "grid" ? 4 : 10)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      {viewMode === "grid" &&
                        (project.technologies?.length || 0) > 4 && (
                          <span className="px-2 py-1 bg-slate-800 text-slate-500 text-xs rounded-md">
                            +{project.technologies!.length - 4}
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div
                    className={`flex gap-2 justify-center min-w-[140px] ${
                      viewMode === "list"
                        ? "sm:flex-col sm:border-l sm:border-slate-800 sm:pl-6"
                        : "pt-4 border-t border-slate-800 mt-4"
                    }`}
                  >
                    <button
                      onClick={() => startEdit(project)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded transition-colors"
                    >
                      <Edit2 size={14} /> Edit
                    </button>

                    <button
                      onClick={() => publishProject(project)}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 text-white text-xs rounded transition-colors ${project.status === "published" ? "bg-slate-700 hover:bg-slate-600" : "bg-indigo-600 hover:bg-indigo-500"}`}
                    >
                      {project.status === "published" ? (
                        <RefreshCw size={14} />
                      ) : (
                        <Database size={14} />
                      )}
                      {project.status === "published"
                        ? "Update DB"
                        : "Publish DB"}
                    </button>

                    <div
                      className={`flex items-center justify-center gap-2 pt-2 text-[10px] text-slate-500 ${viewMode === "grid" ? "hidden" : ""}`}
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
    </div>
  );
}
