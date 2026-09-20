import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext({ lang: "fr", setLang: () => {}, t: translations.fr });

function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
    const nav = (navigator.language || "fr").toLowerCase();
    return nav.startsWith("en") ? "en" : "fr";
  } catch {
    return "fr";
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((l) => (l === "fr" ? "en" : "fr")),
      t: translations[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);

/* Rend **texte** en <b>texte</b> */
export function renderBold(str) {
  return String(str)
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <b key={i}>{part.slice(2, -2)}</b>
        : <React.Fragment key={i}>{part}</React.Fragment>
    );
}
