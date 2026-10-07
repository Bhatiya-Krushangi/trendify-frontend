import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * Translate component for inline dynamic or static text translation.
 * Translates its string children from English to the currently selected language.
 *
 * Example:
 *   <Translate>{post.title}</Translate>
 */
const Translate = ({ children }) => {
  const { lang, translateTexts, getInstantTranslation } = useLanguage();
  const instant = typeof children === "string" ? getInstantTranslation?.(children) : null;
  const [translated, setTranslated] = useState(instant || children);

  useEffect(() => {
    if (typeof children !== "string" || !children.trim()) {
      setTranslated(children);
      return;
    }
    if (lang === "en") {
      setTranslated(children);
      return;
    }

    const currentInstant = getInstantTranslation?.(children);
    if (currentInstant) {
      setTranslated(currentInstant);
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
  }, [children, lang, translateTexts, getInstantTranslation]);

  if (typeof children !== "string") {
    return <>{children}</>;
  }

  const display = lang === "en" ? children : instant || translated;
  return <>{display}</>;
};

export default Translate;
