import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaWhatsapp, FaEnvelope, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import "../css/Assistant.css";
import { EASE } from "../motion";
import { translations } from "../i18n/translations";
import { skillData } from "./Skills";

/* =====================================================================
   ZzZ — mini assistant du portfolio (100 % côté client, sans backend).
   1. Demande la langue (FR / EN).
   2. Répond par mots-clés sur le site, les compétences, les projets,
      les services, le parcours, la disponibilité.
   3. Pour un rendez-vous ou un devis : renvoie vers WhatsApp.
   ===================================================================== */

const WHATSAPP = "261345316018";
const EMAIL = "tommymaheriniaina@gmail.com";

const STR = {
  fr: {
    name: "ZzZ",
    role: "Assistant du portfolio",
    teaser: "Perdu ? Je peux vous guider.",
    open: "Ouvrir l’assistant ZzZ",
    close: "Fermer",
    placeholder: "Posez votre question…",
    send: "Envoyer",
    askLang: "Salut, moi c’est ZzZ, l’assistant de Tommy. Dans quelle langue souhaitez-vous discuter ?",
    welcome: "Parfait, on continue en français. Je peux vous parler du site, des compétences de Tommy, de ses projets et de ses services. Pour un rendez-vous, je vous donne son WhatsApp.",
    chips: { skills: "Compétences", projects: "Projets", services: "Services", about: "Parcours", appointment: "Prendre rendez-vous", lost: "Je suis perdu" },
    whatsapp: "Écrire sur WhatsApp",
    email: "Envoyer un e-mail",
    waText: "Bonjour Tommy, je souhaite prendre rendez-vous.",
    goTo: "Voir la section",
    demo: "Voir la démo",
    lost: "Pas de souci. Le site se lit de haut en bas : Accueil, Services, À propos, Compétences, Projets, puis Contact. Le menu en haut vous y emmène directement, et la barre orange tout en haut montre votre progression.",
    skillsIntro: "Voici l’essentiel de la boîte à outils de Tommy :",
    projectsIntro: "Quelques projets réalisés par Tommy :",
    projectsLoading: "Les projets se chargent, réessayez dans un instant.",
    servicesIntro: "Tommy propose quatre types d’accompagnement :",
    appointment: "Avec plaisir. Le plus simple pour un rendez-vous, un devis ou une question précise, c’est WhatsApp : Tommy répond généralement sous 24 h.",
    hoursIntro: "Disponibilité :",
    cv: "Le CV se télécharge depuis l’accueil, bouton « Télécharger le CV ».",
    price: "Chaque projet est différent, donc pas de grille fixe : décrivez votre besoin sur WhatsApp et Tommy vous fait un devis rapidement.",
    thanks: "Avec plaisir ! Je reste là si vous avez une autre question.",
    fallback: "Je ne suis pas sûr d’avoir compris. Je peux vous parler des compétences, des projets, des services ou vous mettre en contact avec Tommy :",
    switched: "D’accord, on continue en français.",
    tools: "Outils",
  },
  en: {
    name: "ZzZ",
    role: "Portfolio assistant",
    teaser: "Lost? I can guide you.",
    open: "Open the ZzZ assistant",
    close: "Close",
    placeholder: "Ask your question…",
    send: "Send",
    askLang: "Hi, I’m ZzZ, Tommy’s assistant. Which language would you like to chat in?",
    welcome: "Great, let’s continue in English. I can tell you about this site, Tommy’s skills, projects and services. For an appointment, I’ll give you his WhatsApp.",
    chips: { skills: "Skills", projects: "Projects", services: "Services", about: "Background", appointment: "Book a call", lost: "I’m lost" },
    whatsapp: "Chat on WhatsApp",
    email: "Send an email",
    waText: "Hello Tommy, I would like to book an appointment.",
    goTo: "Open the section",
    demo: "View demo",
    lost: "No worries. The site reads top to bottom: Home, Services, About, Skills, Projects, then Contact. The top menu takes you straight there, and the orange bar at the very top shows your progress.",
    skillsIntro: "Here is the core of Tommy’s toolbox:",
    projectsIntro: "A few projects built by Tommy:",
    projectsLoading: "Projects are still loading, please try again in a moment.",
    servicesIntro: "Tommy offers four kinds of support:",
    appointment: "Gladly. The easiest way to book a call, get a quote or ask something specific is WhatsApp: Tommy usually replies within 24 hours.",
    hoursIntro: "Availability:",
    cv: "The résumé can be downloaded from the home section, “Download résumé” button.",
    price: "Every project is different, so there is no fixed price list: describe your needs on WhatsApp and Tommy will send a quote quickly.",
    thanks: "You’re welcome! I’m here if you have another question.",
    fallback: "I’m not sure I understood. I can tell you about skills, projects, services, or put you in touch with Tommy:",
    switched: "Sure, let’s continue in English.",
    tools: "Tools",
  },
};

/* Mots-clés par intention (accents retirés, minuscules) */
const INTENTS = [
  { id: "lang-fr", words: ["francais", "french", "fr"] },
  { id: "lang-en", words: ["anglais", "english", "en"] },
  { id: "appointment", words: ["rendez", "rdv", "appointment", "meeting", "call", "devis", "quote", "whatsapp", "contact", "telephone", "phone", "mail", "email", "joindre", "reach", "appel", "collabor", "embauch", "hire", "recrut"] },
  { id: "price", words: ["prix", "tarif", "price", "cost", "combien", "budget", "pricing"] },
  { id: "cv", words: ["cv", "resume", "résumé", "curriculum"] },
  { id: "projects", words: ["projet", "project", "realisation", "portfolio", "greenz", "pharma", "conge", "notes", "demo", "travaux", "work"] },
  { id: "services", words: ["service", "prestation", "offre", "propose", "offer", "faire quoi", "what do you do", "site web", "website", "application", "app", "design", "ui", "ux", "logo"] },
  { id: "skills", words: ["competence", "skill", "techno", "stack", "langage", "language", "react", "next", "vue", "python", "django", "fastapi", "php", "laravel", "node", "sql", "docker", "wordpress", "seo", "ia", "ai", "outil", "tool", "maitrise", "connait", "know"] },
  { id: "about", words: ["qui", "who", "parcours", "formation", "etude", "study", "experience", "background", "bio", "propos", "about", "tommy", "age", "madagascar", "fianarantsoa", "ou", "where"] },
  { id: "hours", words: ["disponib", "availab", "horaire", "hours", "quand", "when", "ouvert", "open"] },
  { id: "lost", words: ["perdu", "lost", "aide", "help", "navig", "comment", "how", "menu", "section", "ou est", "where is", "trouver", "find"] },
  { id: "thanks", words: ["merci", "thank", "thx", "super", "parfait", "great", "cool", "ok"] },
  { id: "greeting", words: ["bonjour", "salut", "hello", "hi", "hey", "bonsoir", "coucou", "yo"] },
];

const normalize = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s]/g, " ").trim();

function detectIntent(text) {
  const n = normalize(text);
  const tokens = n.split(/\s+/);
  for (const intent of INTENTS) {
    for (const w of intent.words) {
      if (w.length <= 3 ? tokens.includes(w) : n.includes(w)) return intent.id;
    }
  }
  return "fallback";
}

const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("zzz-lang") || null; } catch { return null; }
  });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [projects, setProjects] = useState([]);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const s = STR[lang || "fr"];

  /* Petite bulle d'invitation, une fois par session */
  useEffect(() => {
    let shown = false;
    try { shown = sessionStorage.getItem("zzz-teaser") === "1"; } catch { /* privé */ }
    if (shown) return undefined;
    const on = setTimeout(() => setTeaser(true), 6000);
    const off = setTimeout(() => setTeaser(false), 16000);
    return () => { clearTimeout(on); clearTimeout(off); };
  }, []);

  /* Projets (pour les réponses), chargés une fois à l'ouverture */
  useEffect(() => {
    if (!open || projects.length) return;
    fetch(`${process.env.PUBLIC_URL}/data/projects.json`)
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [open, projects.length]);

  /* Premier message à l'ouverture */
  useEffect(() => {
    if (!open || messages.length) return;
    if (lang) {
      pushBot({ text: STR[lang].welcome, chips: ["skills", "projects", "services", "appointment", "lost"] });
    } else {
      pushBot({ text: STR.fr.askLang, langChoice: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* Défilement automatique */
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const pushBot = (msg, delay = 0) => {
    if (delay) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { id: Date.now() + Math.random(), from: "bot", ...msg }]);
      }, delay);
    } else {
      setMessages((m) => [...m, { id: Date.now() + Math.random(), from: "bot", ...msg }]);
    }
  };

  const pushUser = (text) => setMessages((m) => [...m, { id: Date.now() + Math.random(), from: "user", text }]);

  const chooseLang = (l) => {
    setLang(l);
    try { localStorage.setItem("zzz-lang", l); } catch { /* privé */ }
    pushUser(l === "fr" ? "Français" : "English");
    pushBot({ text: STR[l].welcome, chips: ["skills", "projects", "services", "appointment", "lost"] }, 500);
  };

  /* ---------- Réponses ---------- */
  const skillsSummary = useMemo(() => {
    const L = lang || "fr";
    const cats = translations[L].skills.categories;
    const other = translations[L].skills.other;
    return skillData.map((cat, i) => ({
      label: cats[i],
      items: cat.skills.map((sk) => (sk.key ? other[sk.key] : sk.name)),
    }));
  }, [lang]);

  const answer = (intent) => {
    const L = lang || "fr";
    const t = STR[L];
    const tr = translations[L];
    const contactActions = [
      { label: t.whatsapp, href: waLink(t.waText), icon: <FaWhatsapp />, kind: "wa" },
      { label: t.email, href: `mailto:${EMAIL}`, icon: <FaEnvelope /> },
    ];

    switch (intent) {
      case "greeting":
        return { text: t.welcome, chips: ["skills", "projects", "services", "appointment"] };
      case "lost":
        return { text: t.lost, links: [
          { label: tr.nav.services, href: "#services" }, { label: tr.nav.about, href: "#about" },
          { label: tr.nav.skills, href: "#skills" }, { label: tr.nav.projects, href: "#projects" }, { label: tr.nav.contact, href: "#contact" },
        ] };
      case "skills":
        return {
          text: t.skillsIntro,
          list: skillsSummary.map((c) => `${c.label} : ${c.items.join(", ")}`),
          links: [{ label: `${t.goTo} · ${tr.nav.skills}`, href: "#skills" }],
        };
      case "projects":
        if (!projects.length) return { text: t.projectsLoading, chips: ["projects"] };
        return {
          text: t.projectsIntro,
          cards: projects.map((p) => ({
            title: L === "en" && p.title_en ? p.title_en : p.title,
            href: `#projects/${p.slug}`,
            demo: p.demo,
            tags: p.tags.slice(0, 3).join(" · "),
          })),
        };
      case "services":
        return {
          text: t.servicesIntro,
          list: tr.services.items.map((it) => `${it.title} : ${it.desc}`),
          links: [{ label: `${t.goTo} · ${tr.nav.services}`, href: "#services" }],
        };
      case "about":
        return {
          text: tr.about.intro[0].replace(/\*\*/g, "") + " " + tr.about.intro[2].replace(/\*\*/g, ""),
          links: [{ label: `${t.goTo} · ${tr.nav.about}`, href: "#about" }],
        };
      case "hours":
        return { text: `${t.hoursIntro}`, list: tr.contact.hours, actions: contactActions };
      case "cv":
        return { text: t.cv, links: [{ label: tr.hero.cv, href: `${process.env.PUBLIC_URL}/CV_MaAJ.pdf`, external: true }] };
      case "price":
        return { text: t.price, actions: contactActions };
      case "appointment":
        return { text: t.appointment, list: tr.contact.hours, actions: contactActions };
      case "thanks":
        return { text: t.thanks, chips: ["skills", "projects", "appointment"] };
      default:
        return { text: t.fallback, chips: ["skills", "projects", "services", "appointment"], actions: [contactActions[0]] };
    }
  };

  const handle = (text, forcedIntent) => {
    const clean = text.trim();
    if (!clean && !forcedIntent) return;
    pushUser(clean);
    setInput("");

    if (!lang) {
      const guess = detectIntent(clean);
      const tk = normalize(clean).split(" ").filter(Boolean);
      const enWords = ["en", "english", "anglais", "hello", "hi", "hey"];
      if (guess === "lang-en" || tk.some((w) => enWords.includes(w))) return chooseLangSilently("en");
      return chooseLangSilently("fr");
    }

    const intent = forcedIntent || detectIntent(clean);
    if (intent === "lang-fr" || intent === "lang-en") {
      const l = intent === "lang-fr" ? "fr" : "en";
      setLang(l);
      try { localStorage.setItem("zzz-lang", l); } catch { /* privé */ }
      pushBot({ text: STR[l].switched, chips: ["skills", "projects", "services", "appointment"] }, 400);
      return;
    }
    pushBot(answer(intent), 550 + Math.min(600, clean.length * 15));
  };

  /* Langue déduite d'un texte tapé avant le choix explicite */
  const chooseLangSilently = (l) => {
    setLang(l);
    try { localStorage.setItem("zzz-lang", l); } catch { /* privé */ }
    pushBot({ text: STR[l].welcome, chips: ["skills", "projects", "services", "appointment", "lost"] }, 500);
  };

  const onChip = (key) => {
    const label = s.chips[key];
    handle(label, key);
  };

  const openPanel = () => {
    setOpen(true);
    setTeaser(false);
    try { sessionStorage.setItem("zzz-teaser", "1"); } catch { /* privé */ }
    setTimeout(() => inputRef.current?.focus(), 350);
  };

  const onLinkClick = () => {
    if (window.innerWidth < 640) setOpen(false);
  };

  return (
    <div className="zzz" aria-live="polite">
      {/* Bulle d'invitation */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.button
            type="button"
            className="zzz-teaser"
            onClick={openPanel}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {s.teaser}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panneau */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="zzz-panel"
            role="dialog"
            aria-label={s.name}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="zzz-head">
              <span className="zzz-avatar">ZzZ</span>
              <div className="zzz-head-text">
                <strong>{s.name}</strong>
                <span><i className="zzz-dot" /> {s.role}</span>
              </div>
              {lang && (
                <div className="zzz-langs" aria-label="Langue">
                  <button type="button" className={lang === "fr" ? "on" : ""} onClick={() => handle("Français", "lang-fr")}>FR</button>
                  <button type="button" className={lang === "en" ? "on" : ""} onClick={() => handle("English", "lang-en")}>EN</button>
                </div>
              )}
              <button type="button" className="zzz-close" onClick={() => setOpen(false)} aria-label={s.close}><FaTimes /></button>
            </div>

            <div className="zzz-list" ref={listRef}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  className={`zzz-msg ${m.from}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {m.from === "bot" && <span className="zzz-mini">Z</span>}
                  <div className="zzz-bubble">
                    <p>{m.text}</p>

                    {m.list && (
                      <ul className="zzz-ul">
                        {m.list.map((li, i) => <li key={i}>{li}</li>)}
                      </ul>
                    )}

                    {m.cards && (
                      <div className="zzz-cards">
                        {m.cards.map((c) => (
                          <a key={c.href} href={c.href} className="zzz-card" onClick={onLinkClick}>
                            <strong>{c.title}</strong>
                            <span>{c.tags}</span>
                            <FaArrowRight className="zzz-card-arrow" />
                          </a>
                        ))}
                      </div>
                    )}

                    {m.links && (
                      <div className="zzz-links">
                        {m.links.map((l) => (
                          <a key={l.href + l.label} href={l.href} className="zzz-link" onClick={onLinkClick}
                             target={l.external ? "_blank" : undefined} rel={l.external ? "noreferrer" : undefined}>
                            {l.label} {l.external ? <FaExternalLinkAlt /> : <FaArrowRight />}
                          </a>
                        ))}
                      </div>
                    )}

                    {m.actions && (
                      <div className="zzz-actions">
                        {m.actions.map((a) => (
                          <a key={a.href} href={a.href} target="_blank" rel="noreferrer" className={`zzz-action ${a.kind || ""}`}>
                            {a.icon} {a.label}
                          </a>
                        ))}
                      </div>
                    )}

                    {m.langChoice && !lang && (
                      <div className="zzz-chips">
                        <button type="button" className="zzz-chip" onClick={() => chooseLang("fr")}>Français</button>
                        <button type="button" className="zzz-chip" onClick={() => chooseLang("en")}>English</button>
                      </div>
                    )}

                    {m.chips && lang && (
                      <div className="zzz-chips">
                        {m.chips.map((key) => (
                          <button type="button" key={key} className="zzz-chip" onClick={() => onChip(key)}>{s.chips[key]}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div className="zzz-msg bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="zzz-mini">Z</span>
                  <div className="zzz-bubble zzz-typing"><i /><i /><i /></div>
                </motion.div>
              )}
            </div>

            <form className="zzz-input" onSubmit={(e) => { e.preventDefault(); handle(input); }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={s.placeholder}
                aria-label={s.placeholder}
                maxLength={300}
              />
              <button type="submit" aria-label={s.send} disabled={!input.trim()}><FaPaperPlane /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton flottant */}
      <motion.button
        type="button"
        className={`zzz-fab ${open ? "is-open" : ""}`}
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? s.close : s.open}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "z"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="zzz-fab-ico"
          >
            {open ? <FaTimes /> : "ZzZ"}
          </motion.span>
        </AnimatePresence>
        {!open && <span className="zzz-ring" aria-hidden="true" />}
      </motion.button>
    </div>
  );
}
