import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import logo from "../assets/11.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  // Fermer le menu au clic
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Bloquer le scroll quand menu ouvert
  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  // Apparition/disparition navbar au scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      
      {/* LOGO */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* LIENS */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#home" onClick={handleLinkClick}>Accueil</a></li>
        <li><a href="#about" onClick={handleLinkClick}>À propos</a></li>
        <li><a href="#skills" onClick={handleLinkClick}>Compétences</a></li>
        <li><a href="#projects" onClick={handleLinkClick}>Projets</a></li>
        <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
      </ul>

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
