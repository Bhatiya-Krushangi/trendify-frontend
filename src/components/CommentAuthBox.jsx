import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { useUserAuth } from "../context/UserAuthContext";
import { useLanguage } from "../context/LanguageContext";

const inputClass =
  "w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

// Shown in place of the comment form when no commenter account is signed in.
const CommentAuthBox = () => {
  const { login, register } = useUserAuth();
  const { t } = useLanguage();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
    } catch (err) {
      setError(err.response?.data?.message || t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-surface p-5">
      <div className="flex items-center gap-2 mb-4">
        {mode === "login" ? <LogIn size={17} className="text-brand-600 dark:text-brand-400" /> : <UserPlus size={17} className="text-brand-600 dark:text-brand-400" />}
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {mode === "login" ? t("login.signInToComment") : t("login.createToComment")}
        </h3>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm">
        {mode === "register" && (
          <input
            required
            placeholder={t("login.yourName")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        )}
        <input
          required
          type="email"
          placeholder={t("login.email")}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
        <input
          required
          type="password"
          minLength={6}
          placeholder={t("login.password")}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={inputClass}
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="self-start bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-5 py-2 rounded-md disabled:opacity-60"
        >
          {loading ? t("login.pleaseWait") : mode === "login" ? t("login.signIn") : t("login.createAccount")}
        </button>
      </form>

      <button
        onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
        className="text-xs text-brand-600 dark:text-brand-400 hover:underline mt-4"
      >
        {mode === "login" ? t("login.newHere") : t("login.alreadyHave")}
      </button>
    </div>
  );
};

export default CommentAuthBox;
