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

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 });

    [...experienceRefs.current, ...formationRefs.current].forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const winH = window.innerHeight;

        setTimelineHeight(Math.min(rect.height, Math.max(0, winH - rect.top)));

        if (introRef.current) {
          // ✅ FIX MOBILE : toujours visible sur petits écrans
          if (window.innerWidth <= 768) {
            setScrollOpacity(1);
          } else {
            const opacity = Math.min(Math.max(rect.bottom / winH, 0), 1);
            setScrollOpacity(opacity);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experiences = [
    { title:"Nov 2025 - Déc 2025 | Projet Master", desc:"App web gestion notes université...", tech:"React.js, Express.js, PostgreSQL, JWT, Docker, Cloud" },
    { title:"Août 2024 - Nov 2024 | Stage Licence Pro", desc:"App web/mobile gestion clients produits pharmaceutiques...", tech:"React.js, React Native, Node.js, PostgreSQL", entreprise:"SunSoft, Ivato, Antananarivo" },
    { title:"Août 2023 - Nov 2023 | Stage Licence Pro", desc:"App web gestion congés personnel JIRAMA Fianarantsoa...", tech:"PHP, MySQL" }
  ];

  const formations = [
    { title:"2022 - 2026 | Licence / Master", school:"Université ENI, Fianarantsoa", desc:"2026 : 2e Master\n2025 : 1re Master\n2024 : 3e Licence\n2023 : 2e Licence\n2022 : 1re Licence", link:"https://www.eni.mg" },
    { title:"Baccalauréat Scientifique", school:"Lycée Saint Joseph de Cluny, Fianarantsoa", desc:"2020-2021 | Série D mention Bien" }
  ];

  return (
    <div className="about-container" id="about">
      <div className="about-text">
        <h2>À propos de <span>moi</span></h2>

        <div className="about-intro">
          <div className="about-photo">
            <img src={profilePic} alt="profil" />
          </div>

          <p
            ref={introRef}
            style={{ opacity: scrollOpacity, transition: "opacity 0.5s ease" }}
          >
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

      <div className="experience-formation">
        <div className="experience">
          <h2><FaBriefcase className="section-icon"/> Expériences</h2>

          {experiences.map((exp, i) => (
            <div key={i} className="experience-item" ref={el => experienceRefs.current[i] = el}>
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
              {exp.entreprise && <p><b>Entreprise :</b> {exp.entreprise}</p>}
              <p><b>Technologies :</b> {exp.tech}</p>
              <span className="timeline-point"></span>
            </div>
          ))}
        </div>

        <div className="vertical-line-container">
          <div
            className="vertical-line-fill"
            ref={timelineRef}
            style={{ height: `${timelineHeight}px` }}
          ></div>
        </div>

        <div className="formation">
          <h2><FaGraduationCap className="section-icon"/> Formation</h2>

          {formations.map((form, i) => (
            <div key={i} className="formation-item" ref={el => formationRefs.current[i] = el}>
              <h3>{form.title}</h3>
              <p><b>{form.school}</b></p>
              <p>
                {form.desc.split("\n").map((line, idx) => (
                  <span key={idx}>{line}<br/></span>
                ))}
              </p>
              {form.link && (
                <a href={form.link} target="_blank" rel="noopener noreferrer">
                  {form.link}
                </a>
              )}
              <span className="timeline-point"></span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats">
        <div><h3>6+</h3><p>Projets personnels</p></div>
        <div><h3>4</h3><p>Apps en développement</p></div>
        <div><h3>5+</h3><p>Langages maîtrisés</p></div>
        <div><h3>100%</h3><p>Motivation</p></div>
      </div>
    </div>
  );
}