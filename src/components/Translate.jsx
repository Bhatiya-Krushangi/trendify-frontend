import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * Translate component for inline dynamic text translation.
 * Translates its string children from English to the currently selected language.
 *
 * Example:
 *   <Translate>{post.title}</Translate>
 */
const Translate = ({ children }) => {
  const { lang, translateTexts } = useLanguage();
  const [translated, setTranslated] = useState(children);

  useEffect(() => {
    if (typeof children !== "string" || !children.trim()) {
      setTranslated(children);
      return;
    }
    if (lang === "en") {
      setTranslated(children);
      return;
    }

    let cancelled = false;
    translateTexts([children]).then((res) => {
      if (!cancelled && res && res[0]) {
        setTranslated(res[0]);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [children, lang, translateTexts]);

  return <>{translated}</>;
};

export default Translate;
