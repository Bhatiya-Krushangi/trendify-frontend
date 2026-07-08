import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import api from "../api/axios";
import NewsCard from "./NewsCard";
import AdSlot from "./AdSlot";
import { useSettings } from "../hooks/useSettings";
import { useLanguage } from "../context/LanguageContext";

const Sidebar = ({ variant = "full" }) => {
  const [trending, setTrending] = useState([]);
  const { settings } = useSettings();
  const { t } = useLanguage();

  useEffect(() => {
    api.get("/posts/trending").then(({ data }) => setTrending(data)).catch(() => {});
  }, []);

  const adsEnabled = !!settings?.adsenseEnabled && !!settings?.adsenseClientId;

  return (
    <aside className="flex flex-col gap-6">
      <AdSlot
        type="rectangle"
        enabled={adsEnabled}
        clientId={settings?.adsenseClientId}
        slotId={settings?.adSlots?.rectangle}
      />

      <div className="card-surface p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400 mb-4">
          <TrendingUp size={16} /> {t("sidebar.trendingNow")}
        </h3>
        <div className="flex flex-col gap-4">
          {trending.length === 0 && (
            <p className="text-sm text-slate-400 dark:text-slate-500">{t("sidebar.nothingTrending")}</p>
          )}
          {trending.map((post) => (
            <NewsCard key={post._id} post={post} variant="compact" />
          ))}
        </div>
      </div>

      {variant === "full" && (
        <AdSlot
          type="skyscraper"
          enabled={adsEnabled}
          clientId={settings?.adsenseClientId}
          slotId={settings?.adSlots?.skyscraper}
        />
      )}
    </aside>
  );
};

export default Sidebar;



