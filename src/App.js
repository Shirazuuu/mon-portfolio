import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About"; 
import Skills from "./components/Skills"; 
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NeonGridTrail from "./components/NeonGridTrail";
import "./App.css";

function App() {
  // Mode sombre par défaut
  const [darkMode, setDarkMode] = useState(true);

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  // Mettre à jour le body et localStorage à chaque changement de thème
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // 👇 Curseurs personnalisés sur tout le site (taille originale)
  useEffect(() => {
    // Curseur global
    document.body.style.cursor = "url('/point.cur'), auto";

    // Curseur sur éléments cliquables
    const clickableElements = document.querySelectorAll("a, button");
    clickableElements.forEach(el => {
      el.style.cursor = "url('/zen.cur'), pointer";
    });

    // Observer pour gérer les nouveaux boutons/liens ajoutés dynamiquement
    const observer = new MutationObserver(() => {
      const newClickables = document.querySelectorAll("a, button");
      newClickables.forEach(el => {
        el.style.cursor = "url('/zen.cur'), pointer";
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Nettoyage à la désinstallation du composant
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <NeonGridTrail darkMode={darkMode} /> {/* Fond animé */}
      <Navbar toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      <section id="home">
        <Hero darkMode={darkMode} />
      </section>
      <section id="about"><About /></section>
      <section id="skills"><Skills /></section>
      <section id="projects"><Projects /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}

export default App;