import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Mail } from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import { useLanguage } from "../context/LanguageContext";
import Translate from "./Translate";

const Footer = () => {
  const { settings } = useSettings();
  const { t } = useLanguage();

  const defaultTagline = "Your trusted source for breaking news, in-depth analysis, and trending stories from around the world.";

  return (
    <footer className="bg-ink dark:bg-slate-950 text-slate-300 mt-12 transition-colors duration-200">
      <div className="container-page py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-xl font-bold text-white mb-3">
            {settings?.logoText || "NexTrendX"}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            <Translate>{settings?.tagline || defaultTagline}</Translate>
          </p>
          {settings?.contactEmail && (
            <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mt-3">
              <Mail size={14} /> {settings.contactEmail}
            </a>
          )}
          <div className="flex items-center gap-3 mt-4">
            {settings?.social?.facebook && (
              <a href={settings.social.facebook} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-600 transition"><Facebook size={15} /></a>
            )}
            {settings?.social?.twitter && (
              <a href={settings.social.twitter} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-600 transition"><Twitter size={15} /></a>
            )}
            {settings?.social?.instagram && (
              <a href={settings.social.instagram} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-600 transition"><Instagram size={15} /></a>
            )}
            {settings?.social?.youtube && (
              <a href={settings.social.youtube} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-600 transition"><Youtube size={15} /></a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">{t("footer.quickLinks")}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">{t("footer.aboutUs")}</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">{t("footer.contactUs")}</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">{t("footer.privacyPolicy")}</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">{t("footer.terms")}</Link></li>
            <li><Link to="/sitemap" className="hover:text-white transition-colors">{t("footer.sitemap")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">{t("footer.categories")}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/category/world" className="hover:text-white transition-colors"><Translate>World</Translate></Link></li>
            <li><Link to="/category/business" className="hover:text-white transition-colors"><Translate>Business</Translate></Link></li>
            <li><Link to="/category/sports" className="hover:text-white transition-colors"><Translate>Sports</Translate></Link></li>
            <li><Link to="/category/entertainment" className="hover:text-white transition-colors"><Translate>Entertainment</Translate></Link></li>
            <li><Link to="/category/lifestyle" className="hover:text-white transition-colors"><Translate>Lifestyle</Translate></Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {settings?.logoText || "NexTrendX"}. {t("footer.allRights")}
      </div>
    </footer>
  );
};

export default Footer;
