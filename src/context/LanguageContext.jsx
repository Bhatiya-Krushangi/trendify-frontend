import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import translations from "../i18n/translations";
import api from "../api/axios";

const LanguageContext = createContext(null);

const SUPPORTED = ["en", "hi", "gu"];

/** Helper to load persistent translation cache */
const loadPersistentCache = () => {
  try {
    const raw = localStorage.getItem("tp_trans_cache_v2");
    if (raw) {
      return new Map(JSON.parse(raw));
    }
  } catch {
    // ignore
  }
  return new Map();
};

/** Helper to persist cache (max 1000 items to prevent storage overflow) */
const savePersistentCache = (map) => {
  try {
    const entries = Array.from(map.entries()).slice(-1000);
    localStorage.setItem("tp_trans_cache_v2", JSON.stringify(entries));
  } catch {
    // ignore
  }
};

/**
 * Direct client-side Google Translate caller (dict-chrome-ex client).
 * Has CORS: * and works directly in browsers.
 */
async function directTranslateGoogle(text, targetLang) {
  if (!text || !text.trim() || targetLang === "en") return text;

  // Split very long texts (or HTML blocks) into chunks to avoid URL limits
  if (text.length > 1000) {
    const delimiter = text.includes("</p>")
      ? /(?<=<\/p>|<\/div>|<\/h[1-6]>|<br\s*\/?>)/gi
      : /(?<=\. |\n\n)/g;
    const parts = text.split(delimiter);
    if (parts.length > 1) {
      const translatedParts = await Promise.all(
        parts.map((p) => directTranslateGoogle(p, targetLang))
      );
      return translatedParts.join("");
    }
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=auto&tl=${encodeURIComponent(
      targetLang
    )}&dt=t&q=${encodeURIComponent(text)}`;
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      if (data && Array.isArray(data[0])) {
        const translated = data[0].map((seg) => seg[0]).filter(Boolean).join("");
        if (translated) return translated;
      }
    }
  } catch {
    // Fallback below
  }

  // Fallback to MyMemory
  try {
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text.slice(0, 500)
    )}&langpair=en|${targetLang}`;
    const mmResp = await fetch(mmUrl);
    if (mmResp.ok) {
      const mmJson = await mmResp.json();
      if (mmJson?.responseData?.translatedText) {
        return mmJson.responseData.translatedText;
      }
    }
  } catch {
    // ignore
  }

  return text;
}

/** Check static translations dictionary */
function findStaticTranslation(text, targetLang) {
  if (!text || typeof text !== "string" || targetLang === "en") return null;
  const trimmed = text.trim();

  if (translations[text] && translations[text][targetLang]) {
    return translations[text][targetLang];
  }
  if (translations[trimmed] && translations[trimmed][targetLang]) {
    return translations[trimmed][targetLang];
  }

  const lower = trimmed.toLowerCase();
  for (const key of Object.keys(translations)) {
    const item = translations[key];
    if (item && item.en && item.en.toLowerCase() === lower && item[targetLang]) {
      return item[targetLang];
    }
  }

  return null;
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem("tp_lang");
    return SUPPORTED.includes(stored) ? stored : "en";
  });

  // Persistent cache for translated dynamic texts: { "hi::Hello" -> "नमस्ते" }
  const cacheRef = useRef(null);
  if (!cacheRef.current) {
    cacheRef.current = loadPersistentCache();
  }

  const setLang = useCallback((code) => {
    if (!SUPPORTED.includes(code)) return;
    setLangState(code);
    localStorage.setItem("tp_lang", code);
  }, []);

  /** Translate a static UI key or phrase, e.g. t("nav.home") or t("World") */
  const t = useCallback(
    (key) => {
      if (!key) return "";
      const staticMatch = findStaticTranslation(key, lang);
      if (staticMatch) return staticMatch;

      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang]
  );

  /** Synchronous instant translation check (dictionary + cache) */
  const getInstantTranslation = useCallback(
    (text) => {
      if (!text || typeof text !== "string" || lang === "en") return text;
      const staticMatch = findStaticTranslation(text, lang);
      if (staticMatch) return staticMatch;

      const cacheKey = `${lang}::${text}`;
      if (cacheRef.current && cacheRef.current.has(cacheKey)) {
        return cacheRef.current.get(cacheKey);
      }
      return null;
    },
    [lang]
  );

  /**
   * Translate an array of dynamic texts (titles, excerpts, content, etc.).
   * Checks static dictionary first, then persistent cache, then backend / direct Google Translate.
   */
  const translateTexts = useCallback(
    async (texts) => {
      if (lang === "en" || !texts || texts.length === 0) return texts;

      const results = new Array(texts.length);
      const toFetch = []; // { index, text }
      const cache = cacheRef.current;

      for (let i = 0; i < texts.length; i++) {
        const item = texts[i];
        if (!item || typeof item !== "string" || !item.trim()) {
          results[i] = item;
          continue;
        }

        const staticMatch = findStaticTranslation(item, lang);
        if (staticMatch) {
          results[i] = staticMatch;
          continue;
        }

        const cacheKey = `${lang}::${item}`;
        if (cache.has(cacheKey)) {
          results[i] = cache.get(cacheKey);
        } else {
          toFetch.push({ index: i, text: item });
        }
      }

      if (toFetch.length === 0) return results;

      let backendSucceeded = false;
      try {
        const { data } = await api.post("/translate", {
          texts: toFetch.map((f) => f.text),
          target: lang,
        });

        if (data && Array.isArray(data.translations)) {
          let hasRealTranslation = false;
          for (let j = 0; j < toFetch.length; j++) {
            const translated = data.translations[j];
            if (translated && translated !== toFetch[j].text) {
              hasRealTranslation = true;
            }
          }

          if (hasRealTranslation) {
            backendSucceeded = true;
            for (let j = 0; j < toFetch.length; j++) {
              const translated = data.translations[j] || toFetch[j].text;
              results[toFetch[j].index] = translated;
              cache.set(`${lang}::${toFetch[j].text}`, translated);
            }
            savePersistentCache(cache);
          }
        }
      } catch {
        // backend failed, will fallback to direct client-side translation
      }

      // If backend did not provide real translations, fallback to direct Google Translate
      if (!backendSucceeded) {
        await Promise.all(
          toFetch.map(async (f) => {
            const translated = await directTranslateGoogle(f.text, lang);
            results[f.index] = translated || f.text;
            cache.set(`${lang}::${f.text}`, results[f.index]);
          })
        );
        savePersistentCache(cache);
      }

      return results;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        translateTexts,
        getInstantTranslation,
        SUPPORTED,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
