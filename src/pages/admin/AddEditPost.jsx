import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UploadCloud, Save } from "lucide-react";
import api, { assetUrl } from "../../api/axios";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  coverImage: "",
  tags: "",
  status: "published",
  featured: false,
  metaTitle: "",
  metaDescription: "",
};

const AddEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data));
    if (isEdit) {
      api.get(`/posts/id/${id}`).then(({ data }) => {
        setForm({
          ...data,
          category: data.category?._id || "",
          tags: (data.tags || []).join(", "),
        });
      });
    }
  }, [id]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setForm((f) => ({ ...f, coverImage: data.url }));
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (isEdit) {
        await api.put(`/posts/${id}`, payload);
      } else {
        await api.post("/posts", payload);
      }
      navigate("/admin/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-5">{isEdit ? "Edit Post" : "Add New Post"}</h1>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter post title"
              className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Excerpt</label>
            <textarea
              required
              rows={2}
              maxLength={300}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Short summary shown on cards (max 300 characters)"
              className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">Select category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Tags (comma-separated)</label>
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="climate, policy, summit"
                className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Cover Image</label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 shrink-0">
                <UploadCloud size={20} className="text-slate-400" />
                <span className="text-[11px] text-slate-400 mt-1">{uploading ? "Uploading…" : "Click to upload"}</span>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
              {form.coverImage && (
                <img src={assetUrl(form.coverImage)} alt="Cover" className="w-32 h-24 object-cover rounded-lg" />
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Content</label>
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val })}
              modules={{
                toolbar: [
                  [{ header: [2, 3, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "blockquote"],
                  ["clean"],
                ],
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm font-medium">Mark as featured (hero story)</label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-sm">SEO (optional)</h2>
          <input
            value={form.metaTitle}
            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            placeholder="Meta title"
            className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <textarea
            rows={2}
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            placeholder="Meta description"
            className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-6 py-2.5 rounded-md flex items-center gap-2 disabled:opacity-60"
          >
            <Save size={16} /> {saving ? "Saving…" : isEdit ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditPost;
