import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaFacebookF,
  FaDownload,
} from "react-icons/fa";

import profileLight from "../assets/profile.webp";
import profileDark from "../assets/profile_dark.webp";
import { EASE } from "../motion";
import { useLang } from "../i18n/LanguageContext";

import "../css/Hero.css";

/* Entrées en cascade (courbe EASE unique) */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

export default function Hero({ darkMode }) {
  const { t } = useLang();
  const reduce = useReducedMotion();

  /* Machine à écrire */
  const fullText = "Maheriniaina Tommy";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 60 : 120;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(fullText.substring(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) setTimeout(() => setIsDeleting(true), 1200);
      } else {
        setText(fullText.substring(0, index - 1));
        setIndex(index - 1);
        if (index === 0) setIsDeleting(false);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  /* Parallaxe douce : la photo descend un peu plus lentement que la page,
     le texte remonte légèrement. Désactivée si l'utilisateur limite les animations. */
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 60]);
  const yText = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -30]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0.35]);

  /* La photo de l'autre thème est préchargée : le changement de thème n'attend aucune image. */
  useEffect(() => {
    const img = new Image();
    img.src = darkMode ? profileLight : profileDark;
  }, [darkMode]);

  const cvUrl = `${process.env.PUBLIC_URL}/CV_MaAJ.pdf`;

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-wrapper"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        style={{ opacity: opacityHero }}
      >
        {/* GAUCHE */}
        <motion.div className="hero-left" variants={container} style={{ y: yText }}>
          <motion.p className="hero-tagline" variants={item}>{t.hero.tagline}</motion.p>

          <motion.h1 className="hero-title" variants={item}>
            {t.hero.greeting}{" "}
            <span className="typing-wrap">
              <span className="typing-ghost" aria-hidden="true">{fullText}</span>
              <span className="gradient-text typing-text">
                {text}
                <span className="cursor">|</span>
              </span>
            </span>
          </motion.h1>

          <motion.p className="hero-description" variants={item}>{t.hero.description}</motion.p>

          <motion.div className="hero-actions" variants={item}>
            <a href="#contact" className="primary-btn">
              <FaEnvelope />
              {t.hero.contact}
            </a>
            <a href={cvUrl} download="Maheriniaina-Tommy-CV.pdf" className="secondary-btn">
              <FaDownload />
              {t.hero.cv}
            </a>
          </motion.div>

          <motion.div className="hero-socials" variants={item}>
            <a href="https://github.com/Tommy-ZzZ" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/tommy-maheriniaina-212822261" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ "--c": "#0A66C2" }}><FaLinkedin /></a>
            <a href="https://www.facebook.com/tommy.69D.Gun" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ "--c": "#1877F2" }}><FaFacebookF /></a>
            <a href="https://wa.me/261345316018" target="_blank" rel="noreferrer" aria-label="WhatsApp" style={{ "--c": "#25D366" }}><FaWhatsapp /></a>
          </motion.div>
        </motion.div>

        {/* DROITE */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          <motion.div className="image-wrapper" style={{ y: yImage }}>
            <img
              src={darkMode ? profileDark : profileLight}
              alt="Maheriniaina Tommy"
              className="hero-image"
              width="900"
              height="818"
              fetchpriority="high"
            />
            <div className="floating-card floating-card-1">{t.hero.badges[0]}</div>
            <div className="floating-card floating-card-2">{t.hero.badges[1]}</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicateur de défilement */}
      <a href="#services" className="hero-scroll" aria-label={t.hero.scroll}>
        <span className="hero-scroll-line" />
        <span className="hero-scroll-text">{t.hero.scroll}</span>
      </a>
    </section>
  );
}
