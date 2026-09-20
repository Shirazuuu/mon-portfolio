import React, { useEffect, useRef, useState } from "react";
import "../css/Skills.css";
import { motion, animate, useInView } from "framer-motion";
import {
  FaCode, FaServer, FaDatabase, FaTools, FaLayerGroup,
  FaUserTie, FaComments, FaLightbulb, FaProjectDiagram, FaSyncAlt, FaBrain,
  FaPlug, FaPenNib, FaSitemap, FaDraftingCompass, FaPencilRuler,
} from "react-icons/fa";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiBootstrap, SiHtml5, SiCss, SiJavascript,
  SiExpress, SiDjango, SiFastapi, SiSpringboot, SiPhp, SiLaravel, SiSymfony,
  SiMysql, SiPostgresql, SiMongodb, SiGit, SiDocker, SiLinux, SiGithubactions,
  SiOpenai, SiWordpress, SiGooglesearchconsole, SiGoogle,
  SiFigma, SiAndroidstudio, SiDiagramsdotnet, SiApachenetbeanside, SiEclipseide,
  SiPostman, SiVirtualbox, SiJenkins, SiGitlab, SiKalilinux,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { EASE } from "../motion";
import { useLang } from "../i18n/LanguageContext";

/* =====================================================================
   ICÔNES + COULEUR OFFICIELLE DE CHAQUE TECHNOLOGIE
   (les marques presque noires utilisent la couleur du texte pour rester
   lisibles en mode sombre)
   ===================================================================== */
const TEXT = "var(--text)";

const TECH = {
  "React.js":        { icon: <SiReact />,        color: "#61DAFB" },
  "Next.js":         { icon: <SiNextdotjs />,    color: TEXT },
  "Vue.js":          { icon: <SiVuedotjs />,     color: "#4FC08D" },
  "Tailwind CSS":    { icon: <SiTailwindcss />,  color: "#06B6D4" },
  "Bootstrap":       { icon: <SiBootstrap />,    color: "#7952B3" },
  "HTML / CSS":      { icon: <SiHtml5 />,        color: "#E34F26" },
  "JavaScript":      { icon: <SiJavascript />,   color: "#F7DF1E" },
  "React Native":    { icon: <SiReact />,        color: "#61DAFB" },
  "Express.js":      { icon: <SiExpress />,      color: TEXT },
  "Django (Python)": { icon: <SiDjango />,       color: "#44B78B" },
  "FastAPI (Python)":{ icon: <SiFastapi />,      color: "#009688" },
  "Spring Boot":     { icon: <SiSpringboot />,   color: "#6DB33F" },
  "PHP":             { icon: <SiPhp />,          color: "#777BB4" },
  "Laravel":         { icon: <SiLaravel />,      color: "#FF2D20" },
  "Symfony":         { icon: <SiSymfony />,      color: TEXT },
  "API REST":        { icon: <FaPlug />,         color: "#e7905a" },
  "MySQL":           { icon: <SiMysql />,        color: "#4479A1" },
  "PostgreSQL":      { icon: <SiPostgresql />,   color: "#4169E1" },
  "MongoDB":         { icon: <SiMongodb />,      color: "#47A248" },
  "Git":             { icon: <SiGit />,          color: "#F05032" },
  "Docker":          { icon: <SiDocker />,       color: "#2496ED" },
  "Linux":           { icon: <SiLinux />,        color: "#FCC624" },
  "CI/CD":           { icon: <SiGithubactions />,color: "#2088FF" },
  /* catégorie « Autres » (clés traduites) */
  ai:                { icon: <SiOpenai />,       color: "#10A37F" },
  wordpress:         { icon: <SiWordpress />,    color: "#21759B" },
  seo:               { icon: <SiGooglesearchconsole />, color: "#458CF5" },
  indexing:          { icon: <SiGoogle />,       color: "#4285F4" },
  writing:           { icon: <FaPenNib />,       color: "#e7905a" },
};

const CSS_ICON = { icon: <SiCss />, color: "#663399" }; // réservé si HTML et CSS sont séparés un jour
void CSS_ICON; void FaSitemap;

/* ================= DONNÉES COMPÉTENCES (les libellés de catégorie viennent des traductions) ================= */

export const skillData = [
  { icon: <FaCode />, skills: [
    { name: "React.js", level: 90 }, { name: "Next.js", level: 80 }, { name: "Vue.js", level: 80 }, { name: "Tailwind CSS", level: 85 },
    { name: "Bootstrap", level: 85 }, { name: "HTML / CSS", level: 95 }, { name: "JavaScript", level: 90 }, { name: "React Native", level: 80 },
  ]},
  { icon: <FaServer />, skills: [
    { name: "Express.js", level: 80 }, { name: "Django (Python)", level: 85 }, { name: "FastAPI (Python)", level: 78 }, { name: "Spring Boot", level: 75 },
    { name: "PHP", level: 70 }, { name: "Laravel", level: 75 }, { name: "Symfony", level: 60 }, { name: "API REST", level: 85 },
  ]},
  { icon: <FaDatabase />, skills: [
    { name: "MySQL", level: 85 }, { name: "PostgreSQL", level: 80 }, { name: "MongoDB", level: 80 },
  ]},
  { icon: <FaTools />, skills: [
    { name: "Git", level: 90 }, { name: "Docker", level: 75 }, { name: "Linux", level: 80 }, { name: "CI/CD", level: 80 },
  ]},
  /* Autres : IA, CMS et visibilité web (libellés traduits via s.other) */
  { icon: <FaLayerGroup />, skills: [
    { key: "ai", level: 78 }, { key: "wordpress", level: 80 }, { key: "seo", level: 75 },
    { key: "indexing", level: 75 }, { key: "writing", level: 80 },
  ]},
];

/* ================= TECHNOLOGIES (bandeau) ================= */

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
  { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "WordPress", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "Spring", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
];

/* ================= OUTILS (icône + couleur) ================= */

const tools = [
  { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
  { name: "VS Code", icon: <VscVscode />, color: "#007ACC" },
  { name: "Android Studio", icon: <SiAndroidstudio />, color: "#3DDC84" },
  { name: "Wondershare Mockitt", icon: <FaPencilRuler />, color: "#e7905a" },
  { name: "Draw.io", icon: <SiDiagramsdotnet />, color: "#F08705" },
  { name: "PlantUML", icon: <FaProjectDiagram />, color: "#FBBD16" },
  { name: "Visual Paradigm", icon: <FaDraftingCompass />, color: "#2D9CDB" },
  { name: "Apache NetBeans", icon: <SiApachenetbeanside />, color: "#1B6AC6" },
  { name: "Eclipse", icon: <SiEclipseide />, color: "#F7941E" },
  { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
  { name: "VirtualBox", icon: <SiVirtualbox />, color: "#2F6FBF" },
  { name: "Jenkins", icon: <SiJenkins />, color: "#D24939" },
  { name: "GitLab", icon: <SiGitlab />, color: "#FC6D26" },
  { name: "Kali Linux", icon: <SiKalilinux />, color: "#557C94" },
  { name: "StarUML", icon: <FaDraftingCompass />, color: "#e7905a" },
];

/* ================= TRANSVERSALES (icône + teinte) ================= */

const soft = [
  { icon: <FaUserTie />, color: "#e7905a" },
  { icon: <FaComments />, color: "#3B82F6" },
  { icon: <FaLightbulb />, color: "#F59E0B" },
  { icon: <FaSyncAlt />, color: "#10B981" },
  { icon: <FaProjectDiagram />, color: "#0EA5E9" },
  { icon: <FaBrain />, color: "#F87171" },
];

/* Pourcentage qui compte de 0 à la valeur quand il entre à l'écran */
function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) { setVal(0); return undefined; }
    const controls = animate(0, to, { duration: 0.9, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref} className="sk-pct">{val}%</span>;
}

/* ================= COMPONENT ================= */

export default function Skills() {
  const { t } = useLang();
  const s = t.skills;
  const [active, setActive] = useState(0);
  const cat = skillData[active];
  const count = skillData.length;

  /* Flèches gauche / droite pour passer d'une catégorie à l'autre au clavier */
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") setActive((active + 1) % count);
    if (e.key === "ArrowLeft") setActive((active - 1 + count) % count);
  };

  return (
    <section className="skills-container">
      {/* TITRE */}
      <Reveal as="span" className="section-kicker" distance={12}>03</Reveal>
      <WordReveal as="h2" text={s.title} accent={s.accent} />
      <Reveal as="p" className="small-text" distance={16} delay={0.1}>{s.subtitle}</Reveal>

      {/* ONGLETS : la pastille orange glisse d'un onglet à l'autre */}
      <Reveal className="sk-tabs" distance={14} delay={0.15} role="tablist" aria-label={s.title} onKeyDown={onKeyDown}>
        {skillData.map((c, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            className={`sk-tab ${active === i ? "sk-tab--active" : ""}`}
            onClick={() => setActive(i)}
          >
            {active === i && (
              <motion.span layoutId="sk-tab-pill" className="sk-tab-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="sk-tab-ico">{c.icon}</span>
            {s.categories[i]}
          </button>
        ))}
      </Reveal>

      {/* PANNEAU DE LA CATÉGORIE ACTIVE */}
      <Reveal distance={24} delay={0.2} amount={0.15}>
        <motion.div
          key={active}
          className="sk-panel"
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <div className="sk-panel-head">
            <motion.span
              className="sk-panel-icon"
              initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {cat.icon}
            </motion.span>
            <div>
              <h3>{s.categories[active]}</h3>
              <p>{cat.skills.length} {s.countLabel}</p>
            </div>
          </div>

          <div className="sk-list">
            {cat.skills.map((sk, j) => {
              const tech = TECH[sk.key || sk.name] || { icon: <FaCode />, color: "#e7905a" };
              return (
                <motion.div
                  className="sk-row"
                  key={sk.key || sk.name}
                  style={{ "--c": tech.color }}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.05 + j * 0.05 }}
                >
                  <span className="sk-ico" aria-hidden="true">{tech.icon}</span>
                  <div className="sk-body">
                    <div className="sk-row-top">
                      <span>{sk.key ? s.other[sk.key] : sk.name}</span>
                      <CountUp to={sk.level} />
                    </div>
                    <div className="sk-track">
                      <motion.span
                        className="sk-fill"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: sk.level / 100 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.1 + j * 0.05 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Reveal>

      {/* BANDEAU DE LOGOS */}
      <Reveal className="tech-slider" distance={20} amount={0.3}>
        <div className="tech-track">
          {[...techIcons, ...techIcons].map((tech, i) => (
            <div className="tech-item" key={i} title={tech.name}>
              <img src={tech.url} alt={tech.name} loading="lazy" width="34" height="34" />
            </div>
          ))}
        </div>
      </Reveal>

      {/* OUTILS */}
      <div className="sk-block">
        <Reveal as="h3" distance={16}>{s.toolsTitle}</Reveal>
        <Reveal as="p" className="sk-block-sub" distance={12} delay={0.05}>{s.toolsSub}</Reveal>
        <Reveal className="tools-grid" distance={20} delay={0.1}>
          {tools.map((tool) => (
            <span className="tool" key={tool.name} style={{ "--c": tool.color }}>
              <span className="tool-ico" aria-hidden="true">{tool.icon}</span>
              {tool.name}
            </span>
          ))}
        </Reveal>
      </div>

      {/* COMPÉTENCES TRANSVERSALES : cartes avec halo coloré au survol */}
      <div className="sk-block">
        <Reveal as="h3" distance={16}>{s.softTitle}</Reveal>
        <Reveal as="p" className="sk-block-sub" distance={12} delay={0.05}>{s.softSub}</Reveal>
        <div className="soft-grid">
          {s.soft.map((sk, i) => (
            <Reveal
              key={i}
              className="soft-card"
              style={{ "--c": soft[i].color }}
              delay={i * 0.05}
              amount={0.3}
              whileHover={{ y: -6 }}
            >
              <div className="soft-icon">{soft[i].icon}</div>
              <div>
                <h4>{sk.title}</h4>
                <p>{sk.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
