import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * useTranslated(texts)
 * Given an array of original English strings, returns the translated versions
 * for the current language. Returns originals for English.
 * Re-translates whenever the language or source texts change.
 *
 * Usage:
 *   const titles = useTranslated(posts.map(p => p.title));
 */
const useTranslated = (texts) => {
  const { lang, translateTexts } = useLanguage();
  const [result, setResult] = useState(texts);

  useEffect(() => {
    if (!texts || texts.length === 0) {
      setResult(texts);
      return;
    }
    if (lang === "en") {
      setResult(texts);
      return;
    }

    let cancelled = false;
    translateTexts(texts).then((translated) => {
      if (!cancelled) setResult(translated);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, JSON.stringify(texts)]);

  return result;
};

export default useTranslated;
