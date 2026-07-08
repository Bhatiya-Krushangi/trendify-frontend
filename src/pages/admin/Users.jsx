import { useEffect, useState } from "react";
import { Trash2, Search, UserCircle2, Mail, Calendar, Users } from "lucide-react";
import api from "../../api/axios";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    api
      .get("/users")
      .then(({ data }) => setUsers(data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const initials = (name) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  // Generate a consistent color from name
  const avatarColor = (name) => {
    const colors = [
      "#4f46e5", "#7c3aed", "#e11d48", "#16a34a",
      "#ea580c", "#0891b2", "#9333ea", "#dc2626",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Registered Users</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {users.length} user{users.length !== 1 ? "s" : ""} have created accounts
          </p>
        </div>

        {/* Stats badge */}
        <div className="flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-xl text-sm font-semibold border border-brand-100">
          <Users size={16} />
          {users.length} Total Users
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="pl-9 pr-4 py-2.5 w-full border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-400">Loading users…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <UserCircle2 size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="text-slate-400 font-medium">
              {search ? "No users match your search." : "No users have registered yet."}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5 hidden md:table-cell">Email</th>
                <th className="px-5 py-3.5 hidden lg:table-cell">Joined</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors group">
                  {/* Avatar + Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: avatarColor(user.name) }}
                      >
                        {initials(user.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{user.name}</p>
                        {/* Email shown inline on small screens */}
                        <p className="text-xs text-slate-400 md:hidden">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 hidden md:table-cell">
                    <a
                      href={`mailto:${user.email}`}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-brand-600 transition-colors"
                    >
                      <Mail size={13} />
                      {user.email}
                    </a>
                  </td>

                  {/* Joined date */}
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span
                      className="flex items-center gap-1.5 text-slate-500"
                      title={formatDateTime(user.createdAt)}
                    >
                      <Calendar size={13} />
                      {formatDate(user.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user._id, user.name)}
                      disabled={deleting === user._id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                      title="Delete user"
                    >
                      <Trash2 size={13} />
                      {deleting === user._id ? "Deleting…" : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer count */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-slate-400 text-right">
          Showing {filtered.length} of {users.length} user{users.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default AdminUsers;
