import { useEffect, useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import api from "../../api/axios";

const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const load = () => api.get("/contact").then(({ data }) => setMessages(data));
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/contact/${id}`);
    load();
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Contact Messages</h1>
      <div className="flex flex-col gap-3">
        {messages.length === 0 && <p className="text-slate-400">No messages yet.</p>}
        {messages.map((m) => (
          <div key={m._id} className={`bg-white rounded-xl border p-4 ${m.read ? "border-slate-200" : "border-brand-300"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {m.read ? <MailOpen size={14} className="text-slate-400" /> : <Mail size={14} className="text-brand-600" />}
                  <span className="font-semibold text-sm">{m.name}</span>
                  <span className="text-xs text-slate-400">{m.email}</span>
                </div>
                <p className="text-sm font-medium mb-1">{m.subject || "General Inquiry"}</p>
                <p className="text-sm text-slate-600">{m.message}</p>
                <p className="text-xs text-slate-400 mt-1">{formatDate(m.createdAt)}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!m.read && (
                  <button onClick={() => markRead(m._id)} className="text-xs font-semibold text-brand-600 px-2">Mark read</button>
                )}
                <button onClick={() => remove(m._id)} className="p-2 rounded-md hover:bg-red-50 text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
