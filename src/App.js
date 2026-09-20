import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Assistant from "./components/Assistant";
import NeonGridTrail from "./components/NeonGridTrail";
import ScrollProgress from "./components/ScrollProgress";
import { LanguageProvider } from "./i18n/LanguageContext";
import "./App.css";

function App() {
  // Mode sombre par défaut
  const [darkMode, setDarkMode] = useState(true);

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  // Mettre à jour le body et localStorage à chaque changement de thème
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);


  return (
    <LanguageProvider>
      <div className={`App ${darkMode ? "dark" : ""}`}>
        <NeonGridTrail darkMode={darkMode} />
        <ScrollProgress />
        <Navbar toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
        <section id="home">
          <Hero darkMode={darkMode} />
        </section>
        <section id="services"><Services /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
        <Footer />
        <Assistant />
      </div>
    </LanguageProvider>
  );
}

export default App;
