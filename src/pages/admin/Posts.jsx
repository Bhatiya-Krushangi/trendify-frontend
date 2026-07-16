import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, GripVertical, Save } from "lucide-react";
import api from "../../api/axios";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);

  // drag state
  const dragIdx = useRef(null);
  const dragOverIdx = useRef(null);

  const load = () => {
    setLoading(true);
    setOrderChanged(false);
    api
      .get("/posts/admin/all")
      .then(({ data }) => setPosts(data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const remove = async (id) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await api.delete(`/posts/${id}`);
    load();
  };

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const handleDragStart = (e, index) => {
    dragIdx.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    dragOverIdx.current = index;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === index) return;

    // Re-order the filtered-search-aware full list
    const from = dragIdx.current;
    const to = index;

    setPosts((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });

    dragIdx.current = null;
    dragOverIdx.current = null;
    setOrderChanged(true);
  };

  const handleDragEnd = () => {
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      await api.post("/posts/reorder", { orderedIds: posts.map((p) => p._id) });
      setOrderChanged(false);
    } catch {
      alert("Failed to save order. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  // ──────────────────────────────────────────────────────────────────────────

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex items-center gap-3">
          {orderChanged && (
            <button
              onClick={saveOrder}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-60"
            >
              <Save size={16} />
              {saving ? "Saving…" : "Save Order"}
            </button>
          )}
          <Link
            to="/admin/posts/new"
            className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={16} /> Add New Post
          </Link>
        </div>
      </div>

      <div className="text-xs text-slate-400 -mt-2 flex items-center gap-1">
        <GripVertical size={13} />
        Drag rows to reorder posts, then click <strong className="text-slate-500">Save Order</strong>
      </div>

      <div className="relative max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts…"
          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="p-4 font-medium w-8"></th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Views</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">
                  No posts found.
                </td>
              </tr>
            )}
            {filtered.map((p, index) => (
              <tr
                key={p._id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className="border-b border-slate-50 hover:bg-slate-50 cursor-default transition-colors"
                style={{ opacity: dragIdx.current === index ? 0.4 : 1 }}
              >
                {/* Drag handle */}
                <td className="p-4 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing">
                  <GripVertical size={16} />
                </td>
                <td className="p-4 max-w-[260px] truncate font-medium">{p.title}</td>
                <td className="p-4 text-slate-500">{p.category?.name}</td>
                <td className="p-4 text-slate-500">{formatDate(p.createdAt)}</td>
                <td className="p-4 text-slate-500">{p.views}</td>
                <td className="p-4">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === "published"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                      }`}
                  >
                    {p.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/posts/${p._id}/edit`}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => remove(p._id)}
                      className="p-1.5 rounded-md hover:bg-red-50 text-red-500"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
