import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdSlot from "./AdSlot";
import { useSettings } from "../hooks/useSettings";

const PublicLayout = () => {
  const { settings } = useSettings();
  const adsEnabled = !!settings?.adsenseEnabled && !!settings?.adsenseClientId;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <Navbar />
      <div className="container-page mt-5">
        <AdSlot
          type="leaderboard"
          enabled={adsEnabled}
          clientId={settings?.adsenseClientId}
          slotId={settings?.adSlots?.leaderboardTop}
        />
      </div>
      <main className="flex-1 container-page my-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
