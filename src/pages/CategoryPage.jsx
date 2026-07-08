import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../context/LanguageContext";
import Translate from "../components/Translate";

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.get(`/categories/${slug}`).then(({ data }) => setCategory(data)).catch(() => setCategory(null));
    api
      .get("/posts", { params: { category: slug, page, limit: 9 } })
      .then(({ data }) => {
        setPosts(data.posts);
        setPages(data.pages);
      })
      .finally(() => setLoading(false));
  }, [slug, page]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
      <div>
        <div className="mb-6 pb-5 border-b border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: category?.color || "#4f46e5" }}>
            {t("category.label")}
          </span>
          <h1 className="text-2xl md:text-3xl font-display font-bold mt-1 text-ink dark:text-white">
            <Translate>{category?.name || slug}</Translate>
          </h1>
          {category?.description && (
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
              <Translate>{category.description}</Translate>
            </p>
          )}
        </div>

        {loading ? (
          <p className="text-slate-400 dark:text-slate-500">{t("category.loading")}</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500">{t("category.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${p === page
                    ? "bg-brand-600 text-white"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default CategoryPage;



