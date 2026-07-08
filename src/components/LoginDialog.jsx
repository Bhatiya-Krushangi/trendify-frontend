import { useState, useEffect } from "react";
import { X, LogIn, UserPlus } from "lucide-react";
import { useUserAuth } from "../context/UserAuthContext";

const inputClass =
  "w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-ink dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition";

/**
 * LoginDialog — modal overlay for login / register.
 * Props:
 *   open        {boolean}  — whether the dialog is visible
 *   onClose     {fn}       — called when user dismisses
 *   onSuccess   {fn}       — called after successful login/register (receives user data)
 *   title       {string}   — optional custom heading above the tabs
 */
const LoginDialog = ({ open, onClose, onSuccess, title }) => {
  const { login, register } = useUserAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset state whenever dialog opens
  useEffect(() => {
    if (open) {
      setMode("login");
      setForm({ name: "", email: "", password: "" });
      setError("");
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let result;
      if (mode === "login") {
        result = await login(form.email, form.password);
      } else {
        result = await register(form.name, form.email, form.password);
      }
      onSuccess?.(result);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 z-10 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Title */}
        {title && (
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">{title}</p>
        )}

        {/* Mode tabs */}
        <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 mb-5">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all ${
              mode === "login"
                ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <LogIn size={14} /> Sign In
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all ${
              mode === "register"
                ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <UserPlus size={14} /> Sign Up
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          {mode === "register" && (
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          )}
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
          <input
            required
            type="password"
            minLength={6}
            placeholder="Password (min. 6 characters)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={inputClass}
          />

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-2.5 rounded-md text-sm disabled:opacity-60 transition mt-1"
          >
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
