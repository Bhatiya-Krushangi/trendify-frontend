import { useEffect, useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import api from "../../api/axios";

const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const statusStyle = {
  pending: "bg-amber-50 text-amber-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("all");

  const load = () => api.get("/comments").then(({ data }) => setComments(data));
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.put(`/comments/${id}`, { status });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this comment?")) return;
    await api.delete(`/comments/${id}`);
    load();
  };

  const filtered = filter === "all" ? comments : comments.filter((c) => c.status === filter);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Comments</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-slate-200 rounded-md px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 && <p className="text-slate-400">No comments here.</p>}
        {filtered.map((c) => (
          <div key={c._id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{c.name}</span>
                <span className="text-xs text-slate-400">{c.email}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[c.status]}`}>{c.status}</span>
              </div>
              <p className="text-sm text-slate-600 mb-1">{c.content}</p>
              <p className="text-xs text-slate-400">
                on <span className="font-medium">{c.post?.title}</span> · {formatDate(c.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {c.status !== "approved" && (
                <button onClick={() => setStatus(c._id, "approved")} className="p-2 rounded-md hover:bg-emerald-50 text-emerald-600" title="Approve">
                  <Check size={16} />
                </button>
              )}
              {c.status !== "rejected" && (
                <button onClick={() => setStatus(c._id, "rejected")} className="p-2 rounded-md hover:bg-amber-50 text-amber-600" title="Reject">
                  <X size={16} />
                </button>
              )}
              <button onClick={() => remove(c._id)} className="p-2 rounded-md hover:bg-red-50 text-red-500" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
