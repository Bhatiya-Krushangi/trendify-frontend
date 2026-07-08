import { createContext, useContext, useState, useCallback, useRef } from "react";
import translations from "../i18n/translations";
import api from "../api/axios";

const LanguageContext = createContext(null);

const SUPPORTED = ["en", "hi", "gu"];

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem("tp_lang");
    return SUPPORTED.includes(stored) ? stored : "en";
  });

  // In-memory cache for translated dynamic texts: { "hi::Hello" -> "नमस्ते" }
  const dynamicCache = useRef(new Map());

  const setLang = useCallback((code) => {
    if (!SUPPORTED.includes(code)) return;
    setLangState(code);
    localStorage.setItem("tp_lang", code);
  }, []);

  /** Translate a static UI key, e.g. t("nav.home") */
  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang]
  );

  /**
   * Translate an array of dynamic texts (blog titles, excerpts, etc.) via the backend proxy.
   * Returns the translated strings array. Falls back to originals on error.
   * Results are cached to avoid repeated API calls.
   */
  const translateTexts = useCallback(
    async (texts) => {
      if (lang === "en" || !texts || texts.length === 0) return texts;

      const results = new Array(texts.length);
      const toFetch = []; // { index, text }
      const cache = dynamicCache.current;

      // Check cache first
      for (let i = 0; i < texts.length; i++) {
        const key = `${lang}::${texts[i]}`;
        if (cache.has(key)) {
          results[i] = cache.get(key);
        } else {
          toFetch.push({ index: i, text: texts[i] });
        }
      }

      // If everything cached, return immediately
      if (toFetch.length === 0) return results;

      try {
        const { data } = await api.post("/translate", {
          texts: toFetch.map((f) => f.text),
          target: lang,
        });

        for (let j = 0; j < toFetch.length; j++) {
          const translated = data.translations[j] || toFetch[j].text;
          results[toFetch[j].index] = translated;
          cache.set(`${lang}::${toFetch[j].text}`, translated);
        }
      } catch {
        // Fallback to originals
        for (const f of toFetch) {
          results[f.index] = f.text;
        }
      }

      return results;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, translateTexts, SUPPORTED }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
