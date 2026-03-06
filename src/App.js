import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About"; 
import Skills from "./components/Skills"; 
import Projects from "./components/Projects"; // ✅ Import du nouveau composant
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Navbar en haut */}
      <Navbar />

      {/* Sections */}
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      {/* ✅ Nouvelle section Projects */}
      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>

      {/* ✅ Footer en bas */}
      <Footer />
    </div>
  );
}

export default App;
