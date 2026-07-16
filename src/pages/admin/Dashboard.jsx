import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, FolderTree, Users, MessageSquare, Eye, RotateCcw } from "lucide-react";
import api from "../../api/axios";

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="rounded-xl p-5 text-white flex items-center justify-between" style={{ backgroundColor: color }}>
    <div>
      <p className="text-sm opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
    <Icon size={28} className="opacity-70" />
  </div>
);

const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [resetting, setResetting] = useState(false);

  const loadStats = () =>
    api.get("/dashboard/stats").then(({ data }) => setStats(data));

  useEffect(() => { loadStats(); }, []);

  const resetViews = async () => {
    if (!confirm("Reset ALL post views to 0? This cannot be undone.")) return;
    setResetting(true);
    try {
      await api.post("/posts/admin/reset-views");
      await loadStats(); // refresh dashboard numbers
    } catch {
      alert("Failed to reset views. Please try again.");
    } finally {
      setResetting(false);
    }
  };

  if (!stats) return <p className="text-slate-400">Loading dashboard…</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Posts" value={stats.totalPosts} icon={FileText} color="#4f46e5" />
        <StatCard label="Categories" value={stats.totalCategories} icon={FolderTree} color="#16a34a" />
        <StatCard label="Total Views" value={stats.totalViews} icon={Eye} color="#7c3aed" />
        <StatCard label="Comments" value={stats.totalComments} icon={MessageSquare} color="#e11d48" />
        <StatCard label="Registered Users" value={stats.totalUsers ?? 0} icon={Users} color="#0891b2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Recent Posts</h2>
            <Link to="/admin/posts" className="text-sm text-brand-600 hover:underline">View All Posts</Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100">
                <th className="pb-2 font-medium">Title</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentPosts.map((p) => (
                <tr key={p._id} className="border-b border-slate-50">
                  <td className="py-2.5 pr-2 max-w-[220px] truncate">{p.title}</td>
                  <td className="py-2.5 text-slate-500">{p.category?.name}</td>
                  <td className="py-2.5 text-slate-500">{formatDate(p.createdAt)}</td>
                  <td className="py-2.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === "published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      {p.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold mb-4">At a Glance</h2>
          <ul className="flex flex-col gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2"><FileText size={15} className="text-brand-600" /> {stats.publishedPosts} Published / {stats.draftPosts} Draft</li>
            <li className="flex items-center gap-2"><FolderTree size={15} className="text-brand-600" /> {stats.totalCategories} Categories</li>
            <li className="flex items-center gap-2"><MessageSquare size={15} className="text-brand-600" /> {stats.pendingComments} comments awaiting review</li>
            <li className="flex items-center gap-2"><Users size={15} className="text-brand-600" /> {stats.totalUsers ?? 0} Registered Users</li>
          </ul>
          <div className="flex flex-col gap-1 mt-4">
            {stats.pendingComments > 0 && (
              <Link to="/admin/comments" className="inline-block text-sm text-brand-600 hover:underline">
                Moderate comments →
              </Link>
            )}
            <Link to="/admin/users" className="inline-block text-sm text-brand-600 hover:underline">
              Manage users →
            </Link>
          </div>

          {/* Danger zone */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={resetViews}
              disabled={resetting}
              className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
            >
              <RotateCcw size={13} />
              {resetting ? "Resetting…" : "Reset all views to 0"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
