import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://trendify-backend-p94u.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const isAdminPath = window.location.pathname.startsWith("/admin");
  const token = isAdminPath
    ? localStorage.getItem("tp_admin_token")
    : localStorage.getItem("tp_user_token") || localStorage.getItem("tp_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname.startsWith("/admin")) {
      localStorage.removeItem("tp_admin_token");
      localStorage.removeItem("tp_admin_user");
      if (!window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);

export const assetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_UPLOADS_URL || "https://trendify-backend-p94u.onrender.com";
  return `${base}${path}`;
};

export default api;
