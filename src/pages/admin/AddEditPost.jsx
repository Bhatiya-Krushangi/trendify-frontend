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
  thumbnailImage: "",
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
  const [uploadingField, setUploadingField] = useState(null); // 'thumbnail' | 'cover' | null
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data));
    if (isEdit) {
      api.get(`/posts/id/${id}`).then(({ data }) => {
        setForm({
          ...data,
          thumbnailImage: data.thumbnailImage || "",
          coverImage: data.coverImage || "",
          category: data.category?._id || "",
          tags: (data.tags || []).join(", "),
        });
      });
    }
  }, [id]);

  const handleImage = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField(fieldName);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setForm((f) => ({ ...f, [fieldName]: data.url }));
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploadingField(null);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    // Strip read-only fields so edit-saves never reset views/slug in the DB
    const { views: _views, _id: _id_, slug: _slug, ...rest } = form;
    const payload = {
      ...rest,
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            {/* Thumbnail Image Uploader */}
            <div>
              <label className="text-sm font-semibold mb-1 block text-slate-800">
                1. Thumbnail Image (સાઇડ / લિસ્ટ માટે)
              </label>
              <p className="text-xs text-slate-500 mb-3">
                પોસ્ટ કાર્ડ, હોમપેજ ગ્રીડ અને સાઇડબાર લિસ્ટમાં આ ઈમેજ દેખાશે.
                <br />
                <span className="font-semibold text-brand-600">Recommended: 600 x 400 pixels</span>
              </p>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-slate-300 bg-white rounded-lg cursor-pointer hover:bg-slate-100 shrink-0 transition-colors">
                  <UploadCloud size={20} className="text-slate-400" />
                  <span className="text-[11px] text-slate-500 mt-1">
                    {uploadingField === "thumbnailImage" ? "Uploading…" : "Upload Thumbnail"}
                  </span>
                  <input type="file" accept="image/*" onChange={(e) => handleImage(e, "thumbnailImage")} className="hidden" />
                </label>
                {form.thumbnailImage ? (
                  <img src={assetUrl(form.thumbnailImage)} alt="Thumbnail" className="w-32 h-24 object-cover rounded-lg border border-slate-200" />
                ) : form.coverImage ? (
                  <div className="text-center">
                    <img src={assetUrl(form.coverImage)} alt="Fallback Cover" className="w-32 h-24 object-cover rounded-lg border border-slate-200 opacity-60" />
                    <span className="text-[10px] text-slate-400 block mt-0.5">(Fallback from Cover)</span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Cover Image Uploader */}
            <div>
              <label className="text-sm font-semibold mb-1 block text-slate-800">
                2. Cover Image (બ્લોગ અંદર મેઈન પેજ માટે)
              </label>
              <p className="text-xs text-slate-500 mb-3">
                બ્લોગ પોસ્ટ ઓપન કર્યા પછી અંદર મેઈન હેડર પર આ ઈમેજ દેખાશે.
                <br />
                <span className="font-semibold text-brand-600">Recommended: 1200 x 675 pixels</span>
              </p>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-slate-300 bg-white rounded-lg cursor-pointer hover:bg-slate-100 shrink-0 transition-colors">
                  <UploadCloud size={20} className="text-slate-400" />
                  <span className="text-[11px] text-slate-500 mt-1">
                    {uploadingField === "coverImage" ? "Uploading…" : "Upload Cover"}
                  </span>
                  <input type="file" accept="image/*" onChange={(e) => handleImage(e, "coverImage")} className="hidden" />
                </label>
                {form.coverImage && (
                  <img src={assetUrl(form.coverImage)} alt="Cover" className="w-32 h-24 object-cover rounded-lg border border-slate-200" />
                )}
              </div>
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
