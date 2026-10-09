import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Briefcase, Trophy, Clapperboard, Heart, HeartPulse, Plane, ArrowRight, Sparkles, Newspaper, ShieldCheck, TrendingUp } from "lucide-react";
import api from "../api/axios";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import AdSlot from "../components/AdSlot";
import { assetUrl } from "../api/axios";
import { useSettings } from "../hooks/useSettings";
import { useLanguage } from "../context/LanguageContext";
import Translate from "../components/Translate";

const ICONS = {
  Globe, Briefcase, Trophy, Clapperboard, Heart, HeartPulse, Plane,
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop";



const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [sideStories, setSideStories] = useState([]);
  const [latest, setLatest] = useState([]);
  const [categories, setCategories] = useState([]);
  const { settings } = useSettings();
  const { t } = useLanguage();
  const adsEnabled = !!settings?.adsenseEnabled && !!settings?.adsenseClientId;

  useEffect(() => {
    api.get("/posts", { params: { limit: 5 } }).then(({ data }) => {
      setFeatured(data.posts[0] || null);
      setSideStories(data.posts.slice(1, 5));
    });
    api.get("/posts", { params: { limit: 6, page: 2 } }).then(({ data }) => setLatest(data.posts));
    api.get("/categories").then(({ data }) => setCategories(data));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-5">
          {featured && (
            <Link
              to={`/${featured.urltitle || featured.slug}`}
              className="relative rounded-xl overflow-hidden group h-[420px] block shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={(featured.coverImage || featured.thumbnailImage) ? assetUrl(featured.coverImage || featured.thumbnailImage) : FALLBACK_IMG}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 via-60% to-transparent" />
              <div className="absolute bottom-0 p-6 text-white z-10">
                <span
                  className="inline-block text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded mb-3 shadow-sm"
                  style={{ backgroundColor: featured.category?.color || "#4f46e5" }}
                >
                  <Translate>{featured.category?.name}</Translate>
                </span>
                <h1 className="text-2xl md:text-3xl font-display font-bold leading-tight mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <Translate>{featured.title}</Translate>
                </h1>

                <p className="text-sm text-slate-100 line-clamp-2 max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-medium">
                  <Translate>{featured.excerpt}</Translate>
                </p>
              </div>
            </Link>
          )}

          <div className="flex flex-col gap-4">
            {sideStories.map((post) => (
              <Link
                key={post._id}
                to={`/${post.urltitle || post.slug}`}
                className="flex gap-3 group card-surface p-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <img
                  src={(post.thumbnailImage || post.coverImage) ? assetUrl(post.thumbnailImage || post.coverImage) : FALLBACK_IMG}
                  alt={post.title}
                  className="w-24 h-20 object-contain bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: post.category?.color }}>
                    <Translate>{post.category?.name}</Translate>
                  </span>
                  <p className="text-sm font-semibold leading-snug line-clamp-2 text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    <Translate>{post.title}</Translate>
                  </p>

                </div>
              </Link>
            ))}
          </div>
        </div>

        <Sidebar variant="compact" />
      </div>

      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold border-l-4 border-brand-600 pl-3 text-slate-900 dark:text-white">{t("home.latestNews")}</h2>
          <Link to="/search" className="text-sm font-medium text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline">
            {t("home.viewAll")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {latest.map((post) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>
          <AdSlot
            type="skyscraper"
            enabled={adsEnabled}
            clientId={settings?.adsenseClientId}
            slotId={settings?.adSlots?.skyscraper}
            className="hidden lg:flex"
          />
        </div>
      </section>

      <AdSlot
        type="leaderboard"
        enabled={adsEnabled}
        clientId={settings?.adsenseClientId}
        slotId={settings?.adSlots?.leaderboardMid}
      />

      <section>
        <h2 className="text-xl font-bold border-l-4 border-brand-600 pl-3 mb-5 text-slate-900 dark:text-white">{t("home.featuredCategories")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {categories.map((cat) => {
            const Icon = ICONS[cat.icon] || Globe;
            return (
              <Link
                key={cat._id}
                to={`/${cat.slug}`}
                className="relative h-28 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white group shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ backgroundColor: cat.color }}
              >
                {cat.image && (
                  <img
                    src={assetUrl(cat.image)}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className={`absolute inset-0 transition-colors ${cat.image ? "bg-black/45 group-hover:bg-black/35" : "bg-black/20 group-hover:bg-black/10"}`} />
                {!cat.image && <Icon size={22} className="relative mb-2" />}
                <span className="relative font-semibold text-sm">
                  <Translate>{cat.name}</Translate>
                </span>
                <span className="relative text-xs text-white/80">
                  {cat.articleCount} {t("home.articles")}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SEO Editorial & About Section */}
      <section className="card-surface p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 mt-2">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            <Sparkles size={14} /> NexTrendX Editorial Hub
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Breaking News, Trending Stories & In-Depth Articles
          </h2>
          <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Welcome to <strong>NexTrendX</strong>, your premier online destination for timely, accurate, and insightful news coverage from India and around the world. In an era where information moves at lightning speed, our dedicated editorial team works tirelessly to curate verified breaking news, viral social trends, comprehensive analysis, and compelling stories that truly matter.
            </p>
            <p>
              Whether you are tracking real-time developments in <strong>business and finance</strong>, updates on payment systems, innovations in artificial intelligence and technology, major international events, or the latest buzz in sports and entertainment, NexTrendX keeps you ahead of the curve. Our platform is built to deliver rich, engaging articles designed for readers who value quality journalism, factual reporting, and unbiased perspectives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-4">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <Newspaper size={16} className="text-brand-600 dark:text-brand-400" /> Real-Time Updates
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Stay updated with breaking news stories, live updates, and urgent alerts 24/7.
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <TrendingUp size={16} className="text-brand-600 dark:text-brand-400" /> Curated Trending Topics
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Explore what the world is buzzing about across tech, culture, and lifestyle.
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                  <ShieldCheck size={16} className="text-brand-600 dark:text-brand-400" /> Fact-Checked Journalism
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Reliable reporting adhering to high standards of editorial integrity and clarity.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;



