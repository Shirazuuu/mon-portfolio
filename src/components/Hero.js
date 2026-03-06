import React, { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import { FaDownload, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import "../css/Hero.css";

/* Hook pour typing effect avec erase auto */
const useTypingLoop = (texts, start = true, typingSpeed = 150, erasingSpeed = 100, delayBetween = 1500) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!start) return; // ne démarre pas si start = false
    let timeout;

    const currentText = texts[index % texts.length];

    if (!isDeleting && displayText.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, erasingSpeed);
    } else if (!isDeleting && displayText.length === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setIndex(prev => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, texts, start, typingSpeed, erasingSpeed, delayBetween]);

  return displayText;
};

export default function Hero() {
  const [nameFinished, setNameFinished] = useState(false);

  // Nom affiché en premier (plus rapide)
  const nameText = useTypingLoop(
    ["Bonjour, je suis Maheriniana Tommy"],
    true,
    70,   // vitesse de frappe rapide
    50,   // vitesse d'effacement rapide
    1000  // délai réduit
  );

  // Détecter quand le nom est entièrement effacé pour lancer le sous-titre
  useEffect(() => {
    if (nameText === "" && !nameFinished) {
      setNameFinished(true);
    }
  }, [nameText, nameFinished]);

  // Sous-titre (plus rapide)
  const subtitleText = useTypingLoop(
    ["Développeur Full-Stack"],
    nameFinished, 
    60,   // frappe très rapide
    40,   // effacement très rapide
    1000  // délai réduit
  );

  const handleDownload = () => {
    console.log("✅ Téléchargement du CV lancé avec succès");
  };

  // Séparer le mot "Bonjour," du reste pour appliquer la couleur blanche
  const splitName = nameText.split("Bonjour,");
  const afterBonjour = splitName[1] || "";

  return (
    <section className="hero" id="home">
      <div className="hero-content">

        {/* Image de profil */}
        <motion.div
          className="profile-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={profile} alt="Profil" className="profile-img" />
        </motion.div>

        {/* Texte */}
        <div className="text-container">

          {/* Bonjour + Nom (typing auto + erase) */}
          <h1 className="hero-title">
            <span style={{ color: "white" }}>Bonjour,</span>
            <span className="highlight">{afterBonjour}</span>
          </h1>

          {/* Développeur Full-Stack avec typing auto */}
          <h2
            className="subtitle"
            style={{ color: "white", fontSize: "1.6rem", marginTop: "0.5rem" }}
          >
            {subtitleText}
          </h2>

          {/* Description fade / slide */}
          <motion.p
            className="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Développeur passionné, spécialisé dans les technologies JavaScript.
            Je conçois des applications web et mobiles modernes, performantes
            et intuitives.
          </motion.p>

          {/* Boutons fade / slide */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a href="#contact" className="btn contact-btn">
              <FaEnvelope className="icon" /> Me Contacter
            </a>

            <a
              href="/ProCV.pdf"
              download="ProCV.pdf"
              className="btn download-btn"
              onClick={handleDownload}
            >
              <FaDownload className="icon" /> Télécharger le CV
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
