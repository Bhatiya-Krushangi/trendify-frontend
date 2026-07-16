import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Send, LogOut } from "lucide-react";
import api, { assetUrl } from "../api/axios";
import Sidebar from "../components/Sidebar";
import NewsCard from "../components/NewsCard";
import AdSlot from "../components/AdSlot";
import LoginDialog from "../components/LoginDialog";
import { useSettings } from "../hooks/useSettings";
import { useUserAuth } from "../context/UserAuthContext";
import { useLanguage } from "../context/LanguageContext";
import Translate from "../components/Translate";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop";



const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [status, setStatus] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [translatedContent, setTranslatedContent] = useState("");
  const { settings } = useSettings();
  const { user, logout } = useUserAuth();
  const { lang, t, translateTexts } = useLanguage();
  const adsEnabled = !!settings?.adsenseEnabled && !!settings?.adsenseClientId;

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`/posts/${slug}`).then(({ data }) => {
      setPost(data);
      setTranslatedContent(data.content);
      api.get("/posts", { params: { category: data.category?.slug, exclude: data._id, limit: 3 } })
        .then(({ data: r }) => setRelated(r.posts));
      api.get(`/comments/post/${data._id}`).then(({ data: c }) => setComments(c));
    });
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    if (lang === "en") {
      setTranslatedContent(post.content);
    } else {
      translateTexts([post.content]).then((res) => {
        if (res && res[0]) setTranslatedContent(res[0]);
      });
    }
  }, [post, lang, translateTexts]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    // If not logged in, open the login dialog instead
    if (!user) {
      setLoginOpen(true);
      return;
    }
    setStatus("sending");
    try {
      await api.post("/comments", { post: post._id, content: commentText.trim() });
      setStatus("sent");
      setCommentText("");
    } catch (err) {
      if (err.response?.status === 401) {
        setLoginOpen(true);
      } else {
        setStatus("error");
      }
    }
  };

  // After successful login, automatically submit the pending comment
  const handleLoginSuccess = async () => {
    if (!commentText.trim() || !post) return;
    setStatus("sending");
    try {
      await api.post("/comments", { post: post._id, content: commentText.trim() });
      setStatus("sent");
      setCommentText("");
    } catch {
      setStatus("error");
    }
  };

  if (!post) return <p className="text-slate-400 dark:text-slate-500">{t("post.loading")}</p>;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const inputClass =
    "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-ink dark:text-slate-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-slate-400 dark:placeholder:text-slate-500";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
      <article>
        <span
          className="inline-block text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded mb-3"
          style={{ backgroundColor: post.category?.color || "#4f46e5", color: "#fff" }}
        >
          <Translate>{post.category?.name}</Translate>
        </span>
        <h1 className="text-2xl md:text-4xl font-display font-bold leading-tight mb-4 text-ink dark:text-white">
          <Translate>{post.title}</Translate>
        </h1>


        <img
          src={post.coverImage ? assetUrl(post.coverImage) : FALLBACK_IMG}
          alt={post.title}
          className="w-full h-[320px] md:h-[420px] object-cover rounded-xl mb-6"
        />

        <div className="prose-content" dangerouslySetInnerHTML={{ __html: translatedContent }} />

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((t) => (
              <span key={t} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full">#{t}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("post.share")}</span>
          <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-brand-600 hover:text-white transition"><Facebook size={15} /></a>
          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-brand-600 hover:text-white transition"><Twitter size={15} /></a>
          <a href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-brand-600 hover:text-white transition"><Linkedin size={15} /></a>
        </div>

        <AdSlot
          type="leaderboard"
          enabled={adsEnabled}
          clientId={settings?.adsenseClientId}
          slotId={settings?.adSlots?.leaderboardMid}
          className="my-8"
        />

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold border-l-4 border-brand-600 pl-3 mb-5 text-ink dark:text-white">{t("post.relatedArticles")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => <NewsCard key={p._id} post={p} />)}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-bold border-l-4 border-brand-600 pl-3 mb-5 text-ink dark:text-white">
            {t("post.comments")} ({comments.length})
          </h2>
          <div className="flex flex-col gap-4 mb-8">
            {comments.map((c) => (
              <div key={c._id} className="card-surface p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-ink dark:text-slate-100">{c.name}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <Translate>{c.content}</Translate>
                </p>
              </div>
            ))}
            {comments.length === 0 && <p className="text-sm text-slate-400 dark:text-slate-500">{t("post.beFirst")}</p>}
          </div>

          {user && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
              {t("post.commentingAs")} <span className="font-medium text-slate-600 dark:text-slate-300">{user.name}</span> ·{" "}
              <button onClick={logout} className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 underline">
                <LogOut size={11} /> {t("post.signOut")}
              </button>
            </p>
          )}

          <form onSubmit={submitComment} className="card-surface p-5 flex flex-col gap-3">
            <h3 className="font-semibold text-ink dark:text-white">{t("post.leaveComment")}</h3>
            <textarea
              rows={3}
              placeholder={t("post.writeComment")}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="self-start bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-5 py-2 rounded-md flex items-center gap-2 disabled:opacity-60"
            >
              <Send size={14} /> {status === "sending" ? t("post.posting") : t("post.postComment")}
            </button>
            {status === "sent" && <p className="text-sm text-emerald-600 dark:text-emerald-400">{t("post.commentSubmitted")}</p>}
            {status === "error" && <p className="text-sm text-red-600 dark:text-red-400">{t("post.commentError")}</p>}
          </form>

          <LoginDialog
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
            onSuccess={handleLoginSuccess}
            title={t("login.commentPrompt")}
          />
        </section>
      </article>
      <Sidebar />
    </div>
  );
};

export default PostDetail;



