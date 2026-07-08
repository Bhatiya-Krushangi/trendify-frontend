import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, FileText, FolderTree, MessageSquare, Settings, LogOut, Mail, Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "Posts", path: "/admin/posts", icon: FileText },
  { name: "Categories", path: "/admin/categories", icon: FolderTree },
  { name: "Comments", path: "/admin/comments", icon: MessageSquare },
  { name: "Messages", path: "/admin/messages", icon: Mail },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-60 shrink-0 bg-ink text-slate-300 flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-white/10">
        <span className="font-display text-xl font-bold text-white">TrendPluse</span>
        <span className="text-brand-500">.</span>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(({ name, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-brand-600 text-white" : "hover:bg-white/5 text-slate-300"
              }`
            }
          >
            <Icon size={17} /> {name}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
