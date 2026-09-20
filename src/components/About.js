import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import "../css/About.css";
import profilePic from "../assets/nice.webp";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { useLang, renderBold } from "../i18n/LanguageContext";

/* ================= SOUS-COMPOSANTS ================= */

/* Pourcentage affiché (isolé pour ne re-rendre que ce nœud) */
function Percent({ progress, className }) {
  const [pct, setPct] = useState(0);
  useMotionValueEvent(progress, "change", v => {
    const p = Math.round(v * 100);
    setPct(prev => (prev === p ? prev : p));
  });
  return <span className={className}>{pct}%</span>;
}

/* Checkpoints sur la barre : s'allument quand le remplissage les dépasse */
function TrackNodes({ progress, nodes }) {
  const [active, setActive] = useState("");
  const compute = v => {
    const key = nodes.map(n => (v >= n.ratio ? "1" : "0")).join("");
    setActive(prev => (prev === key ? prev : key));
  };
  useMotionValueEvent(progress, "change", compute);
  useEffect(() => { compute(progress.get()); }, [nodes]); // eslint-disable-line react-hooks/exhaustive-deps
  return nodes.map((n, i) => (
    <span
      key={i}
      className={`xp-node ${n.side} ${active[i] === "1" ? "active" : ""}`}
      style={{ top: `${n.ratio * 100}%` }}
    />
  ));
}

/* Compteur animé façon score de jeu */
function StatNumber({ value, suffix, inView }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) { el.textContent = value + suffix; return; }

    const from = Number(el.dataset.current || 0);
    const controls = animate(from, inView ? value : 0, {
      duration: inView ? 1.4 : 0.5,
      ease: inView ? [0.16, 1, 0.3, 1] : [0.4, 0, 0.6, 1],
      onUpdate: v => {
        el.dataset.current = v;
        el.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduce]);

  return <h3 ref={ref}>0{suffix}</h3>;
}

/* ================= COMPOSANT PRINCIPAL ================= */

export default function About() {
  const { t } = useLang();
  const a = t.about;
  const { experiences, formations, stats } = a;
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const [nodes, setNodes] = useState([]);

  /* --- Barre de progression (XP bar) --- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });
  const headTop = useTransform(progress, v => `${v * 100}%`);

  /* --- Position des checkpoints (mesurée sur le layout, pas sur les transforms) --- */
  const measure = useCallback(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const h = sec.offsetHeight;
    if (!h) return;
    setNodes(
      itemRefs.current
        .filter(Boolean)
        .map(el => ({ ratio: (el.offsetTop + 30) / h, side: el.dataset.side }))
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600); // après chargement des polices
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  return (
    <div className="about-container" id="about">
      <div className="about-text">
        <Reveal as="span" className="section-kicker" distance={12} blur={4}>02</Reveal>
        <WordReveal as="h2" text={a.title} accent={a.accent} />

        <div className="about-intro">
          <Reveal className="about-photo" scale={0.88} rotate={-6} blur={10} amount={0.3}>
            <img src={profilePic} alt="Maheriniaina Tommy" width="600" height="400" loading="lazy" />
          </Reveal>

          <Reveal as="p" distance={28} blur={6} delay={0.1} amount={0.15}>
            {a.intro.map((para, i) => (
              <React.Fragment key={i}>
                {renderBold(para)}
                {i < a.intro.length - 1 && <><br /><br /></>}
              </React.Fragment>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="experience-formation" ref={sectionRef}>

        {/* HUD mobile : barre horizontale sticky */}
        <div className="xp-hud" aria-hidden="true">
          <span className="xp-hud-label">{a.progress}</span>
          <div className="xp-hud-track">
            <motion.div className="xp-hud-fill" style={{ scaleX: progress }} />
          </div>
          <Percent progress={progress} className="xp-hud-pct" />
        </div>

        <div className="experience">
          <Reveal as="h2" side={-1} distance={16} blur={4}>
            <FaBriefcase className="section-icon"/> {a.experiencesTitle}
          </Reveal>

          {experiences.map((exp, i) => (
            <Reveal
              key={i}
              className="experience-item"
              side={-1}
              innerRef={el => { itemRefs.current[i] = el; }}
              data-side="left"
            >
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
              {exp.company && <p><b>{a.company} :</b> {exp.company}</p>}
              <p><b>{a.technologies} :</b> {exp.tech}</p>
            </Reveal>
          ))}
        </div>

        {/* Barre XP verticale (desktop) */}
        <div className="xp-track" aria-hidden="true">
          <div className="xp-track-inner">
            <motion.div className="xp-fill" style={{ scaleY: progress }} />
            <div className="xp-ticks" />
          </div>
          <TrackNodes progress={progress} nodes={nodes} />
          <motion.div className="xp-comet" style={{ top: headTop }} />
          <motion.div className="xp-head" style={{ top: headTop }}>
            <span className="xp-sparks" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i />
            </span>
            <Percent progress={progress} className="xp-label" />
          </motion.div>
        </div>

        <div className="formation">
          <Reveal as="h2" side={1} distance={16} blur={4}>
            <FaGraduationCap className="section-icon"/> {a.formationsTitle}
          </Reveal>

          {formations.map((form, i) => (
            <Reveal
              key={i}
              className="formation-item"
              side={1}
              innerRef={el => { itemRefs.current[experiences.length + i] = el; }}
              data-side="right"
            >
              <h3>{form.title}</h3>
              <p><b>{form.school}</b></p>
              <p>
                {form.lines.map((line, idx) => (
                  <span key={idx}>{line}<br/></span>
                ))}
              </p>
              {form.link && (
                <a href={form.link} target="_blank" rel="noopener noreferrer">
                  {form.link}
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      <div className="stats">
        {stats.map((s, i) => (
          <Reveal
            key={i}
            scale={0.85}
            blur={6}
            distance={30}
            delay={i * 0.08}
            amount={0.4}
            whileHover={{ y: -10, scale: 1.05 }}
          >
            {inView => (
              <div className={`stat-inner ${inView ? "lit" : ""}`}>
                <span className="stat-sparks" aria-hidden="true">
                  <i /><i /><i /><i /><i /><i />
                </span>
                <StatNumber value={s.value} suffix={s.suffix} inView={inView} />
                <p>{s.label}</p>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
