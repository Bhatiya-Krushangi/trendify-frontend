import { useEffect, useState } from "react";
import { Plus, UploadCloud } from "lucide-react";
import api, { assetUrl } from "../../api/axios";

const ICONS = ["Globe", "Briefcase", "Trophy", "Clapperboard", "Heart", "HeartPulse", "Plane", "Newspaper", "Cpu", "Gamepad2"];

const emptyForm = { name: "", slug: "", description: "", icon: "Globe", color: "#4f46e5", image: "" };

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => api.get("/categories").then(({ data }) => setCategories(data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, form);
      } else {
        await api.post("/categories", form);
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save category");
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setForm((f) => ({ ...f, image: data.url }));
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const edit = (c) => {
    setEditingId(c._id);
    setForm({
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      icon: c.icon || "Globe",
      color: c.color || "#4f46e5",
      image: c.image || "",
    });
  };

  const remove = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold mb-4">{editingId ? "Edit Category" : "Add New Category"}</h2>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <form onSubmit={submit} className="flex flex-col gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter category name"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Icon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Color</label>
                <input
                  type="color"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full h-9 border border-slate-200 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category Image</label>
              <div className="flex items-center gap-3">
                <label className="flex flex-col items-center justify-center w-24 h-16 border border-dashed border-slate-300 rounded-md cursor-pointer hover:bg-slate-50 shrink-0">
                  <UploadCloud size={16} className="text-slate-400" />
                  <span className="text-[9px] text-slate-400 mt-0.5">{uploading ? "Uploading…" : "Upload"}</span>
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
                {form.image && (
                  <div className="relative group w-24 h-16 rounded-md overflow-hidden border border-slate-200">
                    <img src={assetUrl(form.image)} alt="Category Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, image: "" }))}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-semibold transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2">
                <Plus size={15} /> {editingId ? "Update Category" : "Add Category"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="text-sm text-slate-500 px-3">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Slug</th>
                <th className="p-4 font-medium">Articles</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id} className="border-b border-slate-50">
                  <td className="p-4 font-medium flex items-center gap-3">
                    {c.image ? (
                      <img src={assetUrl(c.image)} alt={c.name} className="w-10 h-8 object-cover rounded border border-slate-200 shrink-0" />
                    ) : (
                      <div className="w-10 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-[9px] font-medium shrink-0">No Img</div>
                    )}
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <span>{c.name}</span>
                  </td>
                  <td className="p-4 text-slate-500">{c.slug}</td>
                  <td className="p-4 text-slate-500">{c.articleCount}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => edit(c)} className="text-brand-600 text-xs font-semibold mr-3">Edit</button>
                    <button onClick={() => remove(c._id)} className="text-red-500 text-xs font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
