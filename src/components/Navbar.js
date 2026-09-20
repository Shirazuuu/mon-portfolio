import React, { useState, useEffect } from "react";
import Flag from "./Flag";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../motion";
import { withViewTransition } from "../viewTransition";
import "../css/Navbar.css";
import logoDark from "../assets/11.webp"; // logo pour mode sombre
import logoLight from "../assets/12.webp"; // logo pour mode clair
import { FaMoon, FaSun } from "react-icons/fa";
import { useLang } from "../i18n/LanguageContext";

const SECTIONS = ["home", "services", "about", "skills", "projects", "contact"];

export default function Navbar({ toggleDarkMode, darkMode }) {
  const { t, lang, toggle } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("home");

  const toggleMenu = () => setIsOpen(prev => !prev);
  const handleLinkClick = () => setIsOpen(false);

  // Apparition / disparition de la navbar selon le sens du scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(!(currentScrollY > lastScrollY && currentScrollY > 80));
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lien actif : la section qui traverse la bande centrale de l'écran
  useEffect(() => {
    const els = SECTIONS.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  /* Thème : le nouveau rendu s'ouvre en cercle depuis le bouton */
  const handleDarkModeClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    withViewTransition(toggleDarkMode, { type: "theme", x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  /* Langue : fondu glissé de l'ancien texte vers le nouveau */
  const handleLangClick = () => withViewTransition(toggle, { type: "lang" });

  const links = [
    ["home", t.nav.home],
    ["services", t.nav.services],
    ["about", t.nav.about],
    ["skills", t.nav.skills],
    ["projects", t.nav.projects],
    ["contact", t.nav.contact],
  ];

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"} ${darkMode ? "" : "light-mode"}`}>
      {/* LOGO */}
      <a href="#home" className="logo" aria-label="Accueil">
        <img src={logoDark} alt="" width="300" height="117" className={`fade-logo ${darkMode ? "show" : "hide"}`} />
        <img src={logoLight} alt="" width="300" height="113" className={`fade-logo ${darkMode ? "hide" : "show"}`} />
      </a>

      {/* LIENS */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {links.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={handleLinkClick}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "true" : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* LANGUE */}
      <button onClick={handleLangClick} className="lang-toggle" aria-label={t.nav.switchLang} title={t.nav.switchLang}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={lang}
            className="lang-toggle-inner"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.16, ease: EASE }}
          >
            <motion.span
              className="lang-toggle-flag"
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              <Flag code={lang === "fr" ? "gb" : "fr"} size={16} />
            </motion.span>
            {lang === "fr" ? "EN" : "FR"}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* THÈME */}
      <button onClick={handleDarkModeClick} className="dark-toggle" aria-label={t.nav.toggleTheme} title={t.nav.toggleTheme}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={darkMode ? "sun" : "moon"}
            className="dark-toggle-ico"
            initial={{ rotate: -120, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 120, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* BURGER */}
      <button
        className={`burger ${isOpen ? "toggle" : ""}`}
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </button>
    </nav>
  );
}
