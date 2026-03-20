import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import logoDark from "../assets/11.png"; // logo pour mode sombre
import logoLight from "../assets/12.png"; // logo pour mode clair
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ toggleDarkMode, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const handleLinkClick = () => setIsOpen(false);

  // Effet pour apparition/disparition navbar au scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(!(currentScrollY > lastScrollY && currentScrollY > 80));
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Bloquer le scroll quand menu ouvert
  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  // Gestion du click dark mode avec effet pulse
  const handleDarkModeClick = () => {
    const button = document.querySelector(".dark-toggle");
    button.classList.add("pulse");
    setTimeout(() => button.classList.remove("pulse"), 300);
    toggleDarkMode();
  };

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"} ${darkMode ? "" : "light-mode"}`}>
      {/* LOGO avec transition et scale */}
      <div className="logo">
        <img
          src={logoDark}
          alt="Logo sombre"
          className={`fade-logo ${darkMode ? "show" : "hide"}`}
        />
        <img
          src={logoLight}
          alt="Logo clair"
          className={`fade-logo ${darkMode ? "hide" : "show"}`}
        />
      </div>

      {/* LIENS */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#home" onClick={handleLinkClick}>Accueil</a></li>
        <li><a href="#about" onClick={handleLinkClick}>À propos</a></li>
        <li><a href="#skills" onClick={handleLinkClick}>Compétences</a></li>
        <li><a href="#projects" onClick={handleLinkClick}>Projets</a></li>
        <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
      </ul>

      {/* DARK MODE BUTTON avec pulse */}
      <button onClick={handleDarkModeClick} className="dark-toggle">
        {darkMode ? <FaSun /> : <FaMoon />}
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