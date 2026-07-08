import { Outlet, Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { admin } = useAuth();

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <Link to="/" target="_blank" className="text-sm text-slate-500 hover:text-brand-600">
            View site ↗
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">{admin?.name || "Admin"}</span>
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
              {(admin?.name || "A")[0]}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
