import React from "react";
import { FaCode, FaMobileAlt, FaPencilRuler, FaServer } from "react-icons/fa";
import "../css/Services.css";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { useLang } from "../i18n/LanguageContext";

const ICONS = [<FaCode />, <FaMobileAlt />, <FaPencilRuler />, <FaServer />];

export default function Services() {
  const { t } = useLang();
  const s = t.services;

  return (
    <div className="services-container">
      <div className="services-header">
        <Reveal as="span" className="section-kicker" distance={12} blur={4}>01</Reveal>
        <WordReveal as="h2" text={s.title} accent={s.accent} />
        <Reveal as="p" className="services-subtitle" distance={16} blur={4} delay={0.1}>{s.subtitle}</Reveal>
      </div>

      <div className="services-grid">
        {s.items.map((item, i) => (
          <Reveal
            key={item.title}
            className="service-card"
            delay={i * 0.08}
            side={i % 2 === 0 ? -1 : 1}
            whileHover={{ y: -6 }}
          >
            <span className="service-index">0{i + 1}</span>
            <span className="service-icon">{ICONS[i]}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
