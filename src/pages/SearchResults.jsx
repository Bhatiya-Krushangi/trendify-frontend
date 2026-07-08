import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import api from "../api/axios";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import { useSettings } from "../hooks/useSettings";
import { useLanguage } from "../context/LanguageContext";

const SEARCH_DEBOUNCE_MS = 400;

const SearchResults = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [input, setInput] = useState(q);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showingDefault, setShowingDefault] = useState(false);
  const { settings } = useSettings();
  const { t } = useLanguage();

  // Debounce: update the URL (and therefore trigger the search effect below) shortly after typing stops
  useEffect(() => {
    const trimmed = input.trim();
    if (trimmed === q) return;
    const timer = setTimeout(() => {
      setParams(trimmed ? { q: trimmed } : {}, { replace: true });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    setLoading(true);
    if (q) {
      setShowingDefault(false);
      api.get("/posts", { params: { search: q, limit: 12 } })
        .then(({ data }) => setPosts(data.posts))
        .finally(() => setLoading(false));
    } else {
      // No query yet — show recent articles so the page never feels empty
      setShowingDefault(true);
      api.get("/posts", { params: { limit: 9 } })
        .then(({ data }) => setPosts(data.posts))
        .finally(() => setLoading(false));
    }
  }, [q]);

  const clear = () => {
    setInput("");
    setParams({});
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-2xl mx-auto w-full text-center py-4">
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-2 text-ink dark:text-white">
          {t("search.title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          {t("search.subtitle")} {settings?.logoText || "TrendPluse"}.
        </p>
        <div className="relative max-w-lg mx-auto">
            <SearchIcon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full pl-11 pr-9 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-ink dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
            />
            {input && (
              <button
                type="button"
                onClick={clear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-ink dark:text-white">
              {loading
                ? t("search.searching")
                : showingDefault
                ? t("search.recentArticles")
                : `${posts.length} ${posts.length === 1 ? t("search.results") : t("search.resultsPlural")} ${t("search.for")} "${q}"`}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-surface p-3 animate-pulse">
                  <div className="w-full h-40 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3" />
                  <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                  <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 card-surface">
              <p className="text-slate-400 dark:text-slate-500">
                {t("search.noResults")} "{q}". {t("search.tryDifferent")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {posts.map((post) => <NewsCard key={post._id} post={post} />)}
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default SearchResults;
