'use client';

import { useEffect, useState } from 'react';

type Project = {
  id?: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  size: string;
};

const emptyForm: Project = {
  title: '',
  description: '',
  image: '',
  link: '',
  category: 'Web Development',
  size: 'medium',
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Gagal memuat data project');
      }

      setProjects(result.data ?? []);
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil data project dari database Neon.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!editingId && !selectedFile) {
      alert('Pilih file gambar untuk project baru.');
      return;
    }

    setSaving(true);

    try {
      const endpoint = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';
      const formData = new FormData();

      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('link', form.link || '');
      formData.append('category', form.category);
      formData.append('size', form.size);

      if (form.image && !selectedFile && editingId) {
        formData.append('image', form.image);
      }

      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Request gagal');
      }

      setForm(emptyForm);
      setEditingId(null);
      setSelectedFile(null);
      await fetchProjects();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link,
      category: project.category,
      size: project.size,
    });
    setSelectedFile(null);
    setEditingId(project.id ?? null);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;

    const confirmDelete = window.confirm('Yakin ingin menghapus project ini?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Hapus project gagal');
      }

      await fetchProjects();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Admin</p>
            <h1 className="mt-3 text-4xl font-bold">CRUD Project</h1>
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30"
          >
            <h2 className="mb-5 text-xl font-semibold text-blue-400">
              {editingId ? 'Edit Project' : 'Tambah Project'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-300">Judul</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0 transition focus:border-blue-500"
                  placeholder="Contoh: Portfolio Website"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Kategori</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0 transition focus:border-blue-500"
                  placeholder="Web Development"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Ukuran</label>
                <select
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Gambar Project</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setSelectedFile(file);
                  }}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-blue-500 file:mr-3 file:rounded file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-white"
                />
                {(selectedFile || form.image) && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-slate-700 bg-slate-950 p-2">
                    <img
                      src={selectedFile ? URL.createObjectURL(selectedFile) : form.image}
                      alt="Preview project"
                      className="h-28 w-full rounded-md object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Link Project</label>
                <input
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Deskripsi</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="min-h-[130px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none transition focus:border-blue-500"
                  placeholder="Deskripsikan project..."
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Menyimpan...' : editingId ? 'Update Project' : 'Simpan Project'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setEditingId(null);
                  }}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  Batal
                </button>
              )}
            </div>
          </form>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-blue-400">Daftar Project</h2>
              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300">
                {projects.length} item
              </span>
            </div>

            {loading ? (
              <div className="py-10 text-center text-slate-400">Memuat data...</div>
            ) : projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center text-slate-400">
                Belum ada project di database.
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id ?? project.title}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">{project.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{project.category}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(project)}
                          className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-300 transition hover:bg-blue-500/20"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-3 text-sm text-slate-300">{project.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                      <span className="rounded-full border border-slate-700 px-2.5 py-1">Size: {project.size}</span>
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-slate-700 px-2.5 py-1 text-blue-300 underline-offset-2 hover:underline"
                        >
                          View Link
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
