import React, { useEffect, useRef, useState } from "react";
import "../css/About.css";
import profilePic from "../assets/nice.png";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

export default function About() {
  const experienceRefs = useRef([]);
  const formationRefs = useRef([]);
  const timelineRef = useRef(null);
  const introRef = useRef(null);
  const [timelineHeight, setTimelineHeight] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Fade-in items + glow points
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 });

    [...experienceRefs.current, ...formationRefs.current].forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Timeline scroll + intro text fade
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const winH = window.innerHeight;
        setTimelineHeight(Math.min(rect.height, Math.max(0, winH - rect.top)));
        if (introRef.current) setScrollOpacity(Math.min(Math.max(rect.bottom / winH, 0), 1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experiences = [
    { title: "Nov 2025 - Déc 2025 | Projet de fin de 1re année de Master", desc: "Développement d'une application web de gestion des notes d'un établissement universitaire. L'application repose sur une architecture micro-services et s'intègre à un système plus large développé par l'université.", tech: "React.js, Express.js, PostgreSQL, JWT, Docker, Cloud" },
    { title: "Août 2024 - Nov 2024 | Stage de fin de 3e année de Licence Pro", desc: "Conception et réalisation d'une application web et mobile pour la gestion des clients et le suivi des commandes de produits pharmaceutiques. Mise en place d'un back-office pour l'organisation du catalogue produits et optimisation du processus de commande.", tech: "React.js, React Native, Node.js, PostgreSQL", entreprise: "SunSoft, Ivato, Antananarivo" },
    { title: "Août 2023 - Nov 2023 | Stage de fin de 2e année de Licence Pro", desc: "Développement d'une application web de gestion des congés du personnel pour JIRAMA Fianarantsoa. Système permettant à l'administrateur d'automatiser le suivi et l'approbation des demandes.", tech: "PHP, MySQL" }
  ];

  const formations = [
    { title: "2022 - 2026 | Licence / Master Professionnel", school: "Université École Nationale d'Informatique ENI, Fianarantsoa 301", desc: "2026 : 2e année de Master\n2025 : 1re année de Master\n2024 : 3e année de Licence\n2023 : 2e année de Licence\n2022 : 1re année de Licence", link: "https://www.eni.mg" },
    { title: "Baccalauréat Scientifique", school: "Lycée Saint Joseph de Cluny, Fianarantsoa 301", desc: "2020-2021 | Série D avec mention Bien" }
  ];

  return (
    <div className="about-container" id="about">

      {/* À propos */}
      <div className="about-text">
        <h2>À propos de <span>moi</span></h2>
        <div className="about-intro">
          <div className="about-photo"><img src={profilePic} alt="profil" /></div>
          <p ref={introRef} style={{ opacity: scrollOpacity, transition: "opacity 0.5s ease" }}>
            Je m'appelle <b>Maheriniaina Tommy</b>, développeur Fullstack et designer graphique.
            Passionné par le développement et l'apprentissage continu, j'ai découvert ma vocation
            dans le monde du code il y a quelques années. Actuellement, je me forme intensivement
            aux technologies <b>JavaScript</b> et développe mes compétences chaque jour pour créer
            des solutions digitales modernes.<br/><br/>
            Mon approche repose sur la pratique régulière et l'amélioration continue. Chaque projet
            est une opportunité d'apprendre quelque chose de nouveau et de perfectionner mes compétences
            techniques et créatives.<br/><br/>
            Basé à Madagascar, je suis toujours prêt à collaborer sur des projets stimulants qui me permettent de continuer à évoluer en tant que développeur.
          </p>
        </div>
      </div>

      {/* Expériences & Formation */}
      <div className="experience-formation">

        <div className="experience">
          <h2><FaBriefcase className="section-icon" /> Expériences Professionnelles</h2>
          {experiences.map((exp, i) => (
            <div key={i} className="experience-item fade-in" ref={el => experienceRefs.current[i] = el}>
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
              {exp.entreprise && <p><b>Entreprise :</b> {exp.entreprise}</p>}
              <p><b>Technologies :</b> {exp.tech}</p>
              <span className="timeline-point"></span>
            </div>
          ))}
        </div>

        <div className="vertical-line-container">
          <div className="vertical-line-fill" ref={timelineRef} style={{ height: `${timelineHeight}px` }}></div>
        </div>

        <div className="formation">
          <h2><FaGraduationCap className="section-icon" /> Formation</h2>
          {formations.map((form, i) => (
            <div key={i} className="formation-item fade-in" ref={el => formationRefs.current[i] = el}>
              <h3>{form.title}</h3>
              <p><b>{form.school}</b></p>
              <p>{form.desc.split("\n").map((line, idx) => <span key={idx}>{line}<br/></span>)}</p>
              {form.link && <a href={form.link} target="_blank" rel="noopener noreferrer">{form.link}</a>}
              <span className="timeline-point"></span>
            </div>
          ))}
        </div>

      </div>

      {/* Stats */}
      <div className="stats">
        <div><h3>6+</h3><p>Projets personnels</p></div>
        <div><h3>4</h3><p>Apps en développement</p></div>
        <div><h3>5+</h3><p>Langages maîtrisés</p></div>
        <div><h3>100%</h3><p>Motivation</p></div>
      </div>

    </div>
  );
}