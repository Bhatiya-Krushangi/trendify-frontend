import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { assetUrl } from "../api/axios";
import Translate from "./Translate";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=800&auto=format&fit=crop";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const NewsCard = ({ post, variant = "default" }) => {
  if (!post) return null;
  const img = post.coverImage ? assetUrl(post.coverImage) : FALLBACK_IMG;
  const catColor = post.category?.color || "#4f46e5";

  if (variant === "compact") {
    return (
      <Link to={`/post/${post.slug}`} className="flex gap-3 group">
        <img src={img} alt={post.title} className="w-20 h-16 object-cover rounded-md shrink-0" />
        <div>
          <p className="text-sm font-semibold text-ink dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            <Translate>{post.title}</Translate>
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
            <Clock size={11} /> {formatDate(post.createdAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <article className="group card-surface overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-3">
      <Link to={`/post/${post.slug}`} className="block overflow-hidden rounded-lg mb-3">
        <img
          src={img}
          alt={post.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <span
        className="inline-block text-[11px] font-bold uppercase tracking-wide mb-1.5"
        style={{ color: catColor }}
      >
        <Translate>{post.category?.name}</Translate>
      </span>
      <h3 className="font-semibold text-ink dark:text-slate-100 leading-snug mb-1.5 line-clamp-2">
        <Link to={`/post/${post.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          <Translate>{post.title}</Translate>
        </Link>
      </h3>

      <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
        <Clock size={11} /> {formatDate(post.createdAt)}
      </p>
    </article>
  );
};

export default NewsCard;

