import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import api from "../api/axios";
import { useSettings } from "../hooks/useSettings";
import { useUserAuth } from "../context/UserAuthContext";
import { useLanguage } from "../context/LanguageContext";
import LoginDialog from "../components/LoginDialog";

const inputClass =
  "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-ink dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

const Contact = () => {
  const { settings } = useSettings();
  const { user } = useUserAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const doSubmit = async () => {
    setStatus("sending");
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      setLoginOpen(true);
      return;
    }
    await doSubmit();
  };

  const handleLoginSuccess = async () => {
    await doSubmit();
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-display font-bold mb-3 text-ink dark:text-white">{t("contact.title")}</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">{t("contact.subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 card-surface p-4">
            <Mail size={18} className="text-brand-600 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-ink dark:text-white">{t("contact.email")}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{settings?.contactEmail || "contact@trendpluse.com"}</p>
            </div>  
          </div>
          <div className="flex items-start gap-3 card-surface p-4">
            <MapPin size={18} className="text-brand-600 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-ink dark:text-white">{t("contact.newsroom")}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t("contact.remoteTeam")}</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="card-surface p-6 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input required placeholder={t("contact.yourName")} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass} />
            <input required type="email" placeholder={t("contact.yourEmail")} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass} />
          </div>
          <input placeholder={t("contact.subject")} value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputClass} />
          <textarea required rows={5} placeholder={t("contact.yourMessage")} value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass} />
          <button type="submit" disabled={status === "sending"}
            className="self-start bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-5 py-2.5 rounded-md flex items-center gap-2 disabled:opacity-60">
            <Send size={15} /> {status === "sending" ? t("contact.sending") : t("contact.send")}
          </button>
          {status === "sent" && <p className="text-sm text-emerald-600 dark:text-emerald-400">{t("contact.sent")}</p>}
          {status === "error" && <p className="text-sm text-red-600 dark:text-red-400">{t("contact.error")}</p>}
        </form>
      </div>

      <LoginDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        title={t("login.contactPrompt")}
      />
    </div>
  );
};

export default Contact;




