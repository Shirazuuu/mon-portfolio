import React, { useEffect, useRef } from "react";
import "../css/Skills.css";

const skillData = [
  { category: "Frontend", skills: [
      { name: "React.js", level: 90 }, { name: "Vue.js", level: 65 },
      { name: "Tailwind CSS", level: 80 }, { name: "Bootstrap", level: 85 },
      { name: "HTML/CSS", level: 95 }, { name: "JavaScript", level: 90 },
      { name: "React Native", level: 80 },
    ]},
  { category: "Backend", skills: [
      { name: "Express.js", level: 60 }, { name: "Python (Django)", level: 70 },
      { name: "PHP", level: 50 }, { name: "API REST", level: 75 },
    ]},
  { category: "Base de données", skills: [
      { name: "MySQL", level: 80 }, { name: "PostgreSQL", level: 65 }, { name: "MongoDB", level: 70 },
    ]},
  { category: "DevOps & Outils", skills: [
      { name: "Git", level: 90 }, { name: "Docker", level: 65 },
      { name: "Linux", level: 75 }, { name: "CI/CD (GitLab CI, Jenkins)", level: 70 },
    ]},
];

const tools = ["Figma","VS Code","Android Studio","Wondershare Mokitt","Draw.io","PlantUML","Visual Paradigm","Apache Netbeans","Eclipse","Postman","VirtualBox","Jenkins","GitLab","Kali Linux","StarUML"];

const softSkills = [
  { title: "Leadership", desc: "Capacité à diriger et motiver une équipe technique" },
  { title: "Communication", desc: "Excellente communication avec les clients et les équipes" },
  { title: "Résolution de problèmes", desc: "Approche analytique pour résoudre des défis complexes" },
  { title: "Adaptabilité", desc: "Capacité à s’adapter rapidement aux nouvelles technologies" },
  { title: "Gestion de projet", desc: "Planification et exécution efficace des projets" },
  { title: "Apprentissage continu", desc: "Passion pour l’apprentissage et l’amélioration continue" },
];

export default function Skills() {

  // refs pour toutes les barres
  const barsRef = useRef([]);

  useEffect(() => {
    // Appliquer la largeur des barres après le montage
    barsRef.current.forEach(bar => {
      if (bar) {
        const value = bar.getAttribute("data-level");
        bar.style.width = `${value}%`;
      }
    });
  }, []);

  return (
    <section className="skills-container" id="skills">
      <h2>Compétences <span>Techniques</span></h2>
      <p className="subtitle">Technologies et outils pour créer des applications modernes et performantes</p>

      <div className="skills-grid">
        {skillData.map((cat, i) => (
          <div key={i} className="skill-box">
            <h3>{cat.category}</h3>
            {cat.skills.map((s, j) => (
              <div key={j} className="skill">
                <span>{s.name}</span>
                <div className="bar">
                  <div
                    ref={el => barsRef.current[i * 10 + j] = el} // chaque barre a sa propre ref
                    data-level={s.level}
                  >
                    {s.level}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="tools-section">
        <h3>Outils & Technologies</h3>
        <div className="tools-grid">
          {tools.map((tool, i) => <span key={i} className="tool">{tool}</span>)}
        </div>
      </div>

      <div className="soft-skills">
        <h3>Compétences Transversales</h3>
        <div className="soft-grid">
          {softSkills.map((s, i) => (
            <div key={i} className="soft-card">
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}