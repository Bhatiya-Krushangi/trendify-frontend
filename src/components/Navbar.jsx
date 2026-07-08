import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Menu, X, Search, Moon, Sun, ChevronDown, UserCircle, Globe } from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import { useTheme } from "../context/ThemeContext";
import { useUserAuth } from "../context/UserAuthContext";
import { useLanguage } from "../context/LanguageContext";
import Translate from "./Translate";
import api from "../api/axios";

const MAX_VISIBLE = 5;

const LANG_OPTIONS = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "hi", label: "HI", flag: "🇮🇳" },
  { code: "gu", label: "GU", flag: "🇮🇳" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { settings } = useSettings();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUserAuth();
  const { lang, setLang, t } = useLanguage();
  const moreRef = useRef(null);
  const langRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data)).catch(() => { });
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const visible = categories.slice(0, MAX_VISIBLE);
  const overflow = categories.slice(MAX_VISIBLE);

  const openMore = () => {
    clearTimeout(closeTimer.current);
    setMoreOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMoreOpen(false), 150);
  };

  const currentLang = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="container-page flex items-center justify-between py-3.5">
        <Link to="/" className="font-display text-2xl font-bold text-ink dark:text-white shrink-0">
          {settings?.logoText || "TrendPluse"}
          <span className="text-brand-600 dark:text-brand-400">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10"
                : "text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`
            }
          >
            {t("nav.home")}
          </NavLink>
          {visible.map((cat) => (
            <NavLink
              key={cat._id}
              to={`/category/${cat.slug}`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10"
                  : "text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`
              }
            >
              <Translate>{cat.name}</Translate>
            </NavLink>
          ))}
          {overflow.length > 0 && (
            <div
              ref={moreRef}
              className="relative"
              onMouseEnter={openMore}
              onMouseLeave={scheduleClose}
            >
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1"
              >
                {t("nav.more")} <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1.5 z-50">
                  {overflow.map((cat) => (
                    <NavLink
                      key={cat._id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setMoreOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${isActive
                          ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        }`
                      }
                    >
                      <Translate>{cat.name}</Translate>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Change language"
            >
              <Globe size={15} />
              <span className="hidden sm:inline">{currentLang.label}</span>
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-50 overflow-hidden">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => { setLang(opt.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors ${lang === opt.code
                        ? "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                  >
                    <span className="text-base">{opt.flag}</span>
                    {t(`lang.${opt.code}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/search" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400" aria-label="Search">
            <Search size={18} />
          </Link>
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hidden sm:inline-flex"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button> */}
          {user && (
            <button
              onClick={logout}
              title={`Signed in as ${user.name} — click to sign out`}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 hover:bg-brand-100 dark:hover:bg-brand-500/20"
            >
              <UserCircle size={15} /> {user.name.split(" ")[0]}
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="container-page py-2 flex flex-col">
            <NavLink
              to="/"
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-2 py-2.5 text-sm font-medium border-b border-slate-50 dark:border-slate-800 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-600 dark:text-slate-300"
                }`
              }
            >
              {t("nav.home")}
            </NavLink>
            {categories.map((cat) => (
              <NavLink
                key={cat._id}
                to={`/category/${cat.slug}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-2 py-2.5 text-sm font-medium border-b border-slate-50 dark:border-slate-800 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-600 dark:text-slate-300"
                  }`
                }
              >
                <Translate>{cat.name}</Translate>
              </NavLink>
            ))}
            {/* Mobile language selector */}
            {/* <div className="flex items-center gap-2 px-2 py-2.5 border-b border-slate-50 dark:border-slate-800">
              <Globe size={15} className="text-slate-500" />
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${lang === opt.code
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div> */}
           
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;


