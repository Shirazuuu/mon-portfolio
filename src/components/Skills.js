import React from "react";
import "../css/Skills.css";

function Skills() {
  return (
    <div className="skills-container" id="skills">
      <h2>
        Compétences <span>Techniques</span>
      </h2>
      <p className="subtitle">
        Les technologies et outils que j’utilise pour créer des applications exceptionnelles
      </p>

      {/* === Section Compétences Techniques === */}
      <div className="skills-grid">
        {/* Frontend */}
        <div className="skill-box">
          <h3>Frontend</h3>
          <div className="skill"><span>React.js</span><div className="bar"><div style={{width: "90%"}}>90%</div></div></div>
          <div className="skill"><span>Vue.js</span><div className="bar"><div style={{width: "65%"}}>65%</div></div></div>
          <div className="skill"><span>Tailwind CSS</span><div className="bar"><div style={{width: "80%"}}>80%</div></div></div>
          <div className="skill"><span>Bootstrap</span><div className="bar"><div style={{width: "85%"}}>85%</div></div></div>
          <div className="skill"><span>HTML/CSS</span><div className="bar"><div style={{width: "95%"}}>95%</div></div></div>
          <div className="skill"><span>JavaScript</span><div className="bar"><div style={{width: "90%"}}>90%</div></div></div>
          <div className="skill"><span>React Native</span><div className="bar"><div style={{width: "80%"}}>80%</div></div></div>
        </div>

        {/* Backend */}
        <div className="skill-box">
          <h3>Backend</h3>
          <div className="skill"><span>Express.js</span><div className="bar"><div style={{width: "60%"}}>60%</div></div></div>
          <div className="skill"><span>Python (Django)</span><div className="bar"><div style={{width: "70%"}}>70%</div></div></div>
          <div className="skill"><span>PHP</span><div className="bar"><div style={{width: "50%"}}>50%</div></div></div>
          <div className="skill"><span>API REST</span><div className="bar"><div style={{width: "75%"}}>75%</div></div></div>
        </div>

        {/* Base de données */}
        <div className="skill-box">
          <h3>Base de données</h3>
          <div className="skill"><span>MySQL</span><div className="bar"><div style={{width: "80%"}}>80%</div></div></div>
          <div className="skill"><span>PostgreSQL</span><div className="bar"><div style={{width: "65%"}}>65%</div></div></div>
          <div className="skill"><span>MongoDB</span><div className="bar"><div style={{width: "70%"}}>70%</div></div></div>
        </div>

        {/* DevOps */}
        <div className="skill-box">
          <h3>DevOps & Outils</h3>
          <div className="skill"><span>Git</span><div className="bar"><div style={{width: "90%"}}>90%</div></div></div>
          <div className="skill"><span>Docker</span><div className="bar"><div style={{width: "65%"}}>65%</div></div></div>
          <div className="skill"><span>Linux</span><div className="bar"><div style={{width: "75%"}}>75%</div></div></div>
          <div className="skill"><span>CI/CD (GitLab CI, Jenkins)</span><div className="bar"><div style={{width: "70%"}}>70%</div></div></div>
        </div>
      </div>

      {/* === Outils & Technologies === */}
      <div className="tools-section">
        <h3>Outils & Technologies</h3>
        <div className="tools-grid">
          {[
            "Figma", "VS Code", "Android Studio", "wondershare Mokitt",
            "Draw.io", "PlantUML", "Visual Paradigm","Apache Netbeans", "Eclipse", "Postman",
            "VirtualBox", "Jenkins", "GitLab", "Kali Linux", "StarUML"
          ].map((tool, index) => (
            <span key={index} className="tool">{tool}</span>
          ))}
        </div>
      </div>

      {/* === Compétences Transversales === */}
      <div className="soft-skills">
        <h3>Compétences Transversales</h3>
        <div className="soft-grid">
          <div className="soft-card"><h4>Leadership</h4><p>Capacité à diriger et motiver une équipe technique</p></div>
          <div className="soft-card"><h4>Communication</h4><p>Excellente communication avec les clients et les équipes</p></div>
          <div className="soft-card"><h4>Résolution de problèmes</h4><p>Approche analytique pour résoudre des défis complexes</p></div>
          <div className="soft-card"><h4>Adaptabilité</h4><p>Capacité à s’adapter rapidement aux nouvelles technologies</p></div>
          <div className="soft-card"><h4>Gestion de projet</h4><p>Planification et exécution efficace des projets</p></div>
          <div className="soft-card"><h4>Apprentissage continu</h4><p>Passion pour l’apprentissage et l’amélioration continue</p></div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
