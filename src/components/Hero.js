import React, { useState, useEffect, useRef } from "react";
import profileLight from "../assets/profile.png";
import profileDark from "../assets/profile_dark.png";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import "../css/Hero.css";

const useTypingLoop = (texts, start = true, typingSpeed = 150, erasingSpeed = 100, delayBetween = 1500) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    const currentText = texts[index % texts.length];
    if (!isDeleting && displayText.length < currentText.length)
      timeoutRef.current = setTimeout(() => setDisplayText(currentText.substring(0, displayText.length + 1)), typingSpeed);
    else if (isDeleting && displayText.length > 0)
      timeoutRef.current = setTimeout(() => setDisplayText(currentText.substring(0, displayText.length - 1)), erasingSpeed);
    else if (!isDeleting && displayText.length === currentText.length)
      timeoutRef.current = setTimeout(() => setIsDeleting(true), delayBetween);
    else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setIndex(prev => prev + 1);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, index, texts, start, typingSpeed, erasingSpeed, delayBetween]);

  return displayText;
};

export default function Hero({ darkMode }) {
  const [nameFinished, setNameFinished] = useState(false);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const subtitles = ["Développeur Full-Stack", "Designer", "Assistant Virtuel"];

  const nameText = useTypingLoop(["Bonjour, je suis Maheriniana Tommy"], true, 70, 50, 1000);

  // Quand le nom est terminé, on déclenche les sous-titres
  useEffect(() => {
    if (nameText === "Bonjour, je suis Maheriniana Tommy") {
      setNameFinished(true);
    }
  }, [nameText]);

  // Changement automatique du sous-titre
  useEffect(() => {
    if (!nameFinished) return;
    const interval = setInterval(() => {
      setSubtitleIndex(prev => (prev + 1) % subtitles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [nameFinished, subtitles.length]); // ✅ correction : ajout de subtitles.length

  const splitName = nameText.split("Bonjour,");
  const afterBonjour = splitName[1] || "";

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        {/* IMAGE */}
        <motion.div className="profile-container" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <img key={darkMode ? "dark" : "light"} src={darkMode ? profileDark : profileLight} alt="Profil" className="profile-img" loading="lazy" />
        </motion.div>

        {/* TEXTE */}
        <motion.div className="text-container" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}>
          <motion.h1 className="hero-title" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <span>Bonjour,</span>
            <span className="highlight">{afterBonjour}</span>
            <span className="cursor">|</span>
          </motion.h1>

          {/* SOUS-TITRES DYNAMIQUES */}
          {nameFinished && (
            <motion.h2
              key={subtitleIndex}
              className="subtitle subtitle-vertical animate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {subtitles[subtitleIndex]}
            </motion.h2>
          )}

          <motion.p className="description" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ delay: 0.5 }}>
            Développeur passionné, spécialisé dans les technologies JavaScript. Je conçois des applications web et mobiles modernes, performantes et intuitives.
          </motion.p>

          <motion.div className="hero-buttons" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ delay: 0.8 }}>
            <a href="#contact" className="btn contact-btn" aria-label="Me Contacter">
              <FaEnvelope className="icon" /> Me Contacter
            </a>
            <a href="/ProCV.pdf" download="ProCV.pdf" className="btn download-btn" aria-label="Télécharger le CV">
              <FaDownload className="icon" /> Mon CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}