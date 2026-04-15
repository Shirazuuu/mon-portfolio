import React, { useEffect, useRef } from "react";
import "../css/Skills.css";
import { motion } from "framer-motion";

import {
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaUserTie,
  FaComments,
  FaLightbulb,
  FaProjectDiagram,
  FaSyncAlt,
  FaBrain,
} from "react-icons/fa";

/* ================= DONNÉES COMPÉTENCES ================= */

const skillData = [
  {
    category: "Frontend",
    icon: <FaCode />,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Vue.js", level: 80 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Bootstrap", level: 85 },
      { name: "HTML / CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "React Native", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: <FaServer />,
    skills: [
      { name: "Express.js", level: 80 },
      { name: "Django (Python)", level: 85 },
      { name: "Spring Boot", level: 75 },
      { name: "PHP", level: 70 },
      { name: "API REST", level: 85 },
    ],
  },
  {
    category: "Base de données",
    icon: <FaDatabase />,
    skills: [
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    category: "DevOps & Outils",
    icon: <FaTools />,
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Linux", level: 80 },
      { name: "CI/CD", level: 80 },
    ],
  },
];

/* ================= TECHNOLOGIES ================= */

const techIcons = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Tailwind", url: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Vue.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Spring", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
];

/* ================= OUTILS ================= */

const tools = [
  "Figma",
  "VS Code",
  "Android Studio",
  "Wondershare Mockitt",
  "Draw.io",
  "PlantUML",
  "Visual Paradigm",
  "Apache NetBeans",
  "Eclipse",
  "Postman",
  "VirtualBox",
  "Jenkins",
  "GitLab",
  "Kali Linux",
  "StarUML",
];

/* ================= SOFT SKILLS ================= */

const softSkills = [
  { title: "Leadership", desc: "Diriger et motiver une équipe technique", icon: <FaUserTie /> },
  { title: "Communication", desc: "Bonne communication avec les équipes et clients", icon: <FaComments /> },
  { title: "Résolution de problèmes", desc: "Analyse et résolution de problèmes complexes", icon: <FaLightbulb /> },
  { title: "Adaptabilité", desc: "Apprentissage rapide des nouvelles technologies", icon: <FaSyncAlt /> },
  { title: "Gestion de projet", desc: "Planification et exécution des projets", icon: <FaProjectDiagram /> },
  { title: "Apprentissage continu", desc: "Amélioration constante des compétences", icon: <FaBrain /> },
];

/* ================= COMPONENT ================= */

export default function Skills() {
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const value = el.dataset.level;

            requestAnimationFrame(() => {
              el.style.width = value + "%";
              el.classList.add("active");
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    barsRef.current.forEach((el) => {
      if (el) {
        el.style.width = "0%";
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-container">

      {/* TITRE */}
      <h2>
        Compétences <span style={{ color: "#7f5af0" }}>Techniques</span>
      </h2>

      <p className="small-text">
        Technologies modernes utilisées pour créer des applications performantes
      </p>

      {/* SKILLS */}
      <div className="skills-grid">
        {skillData.map((cat, i) => (
          <motion.div
            key={i}
            className="skill-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <h3 className="category-title">
              <span className="icon">{cat.icon}</span>
              {cat.category}
            </h3>

            {cat.skills.map((s, j) => {
              const index = i * 10 + j;

              return (
                <div className="skill" key={j}>
                  <div className="skill-header">
                    <span>{s.name}</span>
                    <span className="percent">{s.level}%</span>
                  </div>

                  <div className="bar">
                    <div
                      ref={(el) => (barsRef.current[index] = el)}
                      data-level={s.level}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* TECH SLIDER (NE S’ARRÊTE PLUS AU HOVER) */}
      <div className="tech-slider">
        <div className="tech-track">
          {[...techIcons, ...techIcons].map((tech, i) => (
            <div className="tech-item" key={i}>
              <img src={tech.url} alt={tech.name} />
            </div>
          ))}
        </div>
      </div>

      {/* OUTILS (UI MODERNE AMÉLIORÉE) */}
      <div className="tools-section">
        <h3>Outils et technologies</h3>

        <div className="tools-grid">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              className="tool"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 8px 20px rgba(127,90,240,0.25)"
              }}
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </div>

      {/* SOFT SKILLS */}
      <div className="soft-skills">
        <h3>Compétences transversales</h3>

        <div className="soft-grid">
          {softSkills.map((s, i) => (
            <motion.div
              key={i}
              className="soft-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="soft-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}