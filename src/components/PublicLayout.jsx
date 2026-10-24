import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdSlot from "./AdSlot";
import AdsterraStickyMobile from "./AdsterraStickyMobile";
import { useSettings } from "../hooks/useSettings";

const PublicLayout = () => {
  const { settings } = useSettings();
  const adsEnabled = !!settings?.adsenseEnabled && !!settings?.adsenseClientId;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200 pb-16 md:pb-0">
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
      {/* Mobile Sticky 320x50 Adsterra Banner (320x50_1 • ID: 31895012) */}
      <AdsterraStickyMobile />
    </div>
  );
};

export default PublicLayout;
