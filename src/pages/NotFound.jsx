import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-lg mx-auto py-24 text-center">
      <p className="text-brand-600 font-display font-bold text-6xl mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{t("404.title")}</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">{t("404.desc")}</p>
      <Link to="/" className="inline-block bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-md text-sm font-medium">
        {t("404.backHome")}
      </Link>
    </div>
  );
};

export default NotFound;
