import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";

import profileLight from "../assets/profile.png";
import profileDark from "../assets/profile_dark.png";

import "../css/Hero.css";

/* ✨ ANIMATIONS MODERNES */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
    filter: "blur(12px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero({ darkMode }) {

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

        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setText(fullText.substring(0, index - 1));
        setIndex(index - 1);

        if (index === 0) setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting]);

  return (
    <section className="hero" id="home">

      <div className="hero-blur hero-blur-1"></div>
      <div className="hero-blur hero-blur-2"></div>

      {/* ✅ CHANGEMENT ICI : animate → whileInView */}
      <motion.div
        className="hero-wrapper"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
      >

        {/* LEFT */}
        <motion.div className="hero-left" variants={container}>

          <motion.h1 className="hero-title" variants={item}>
            Bonjour, je suis{" "}
            <span className="gradient-text typing-text">
              {text}
              <span className="cursor">|</span>
            </span>
          </motion.h1>

          <motion.p className="hero-description" variants={item}>
            Développeur passionné spécialisé dans la création
            d’applications web modernes, performantes et intuitives.
            J’aime concevoir des expériences fluides avec les technologies JavaScript modernes.
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <a href="#contact" className="primary-btn">
              <FaEnvelope />
              Contacter
            </a>
          </motion.div>

          <motion.div className="hero-socials" variants={item}>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/tommy.69D.Gun" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://wa.me/261345316018" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>
          </motion.div>

        </motion.div>

        {/* RIGHT (entrée fluide premium) */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="image-wrapper">

            <img
              src={darkMode ? profileDark : profileLight}
              alt="Maheriniaina Tommy"
              className="hero-image"
            />

            <div className="floating-card floating-card-1">
              Full Stack
            </div>

            <div className="floating-card floating-card-2">
              Développeur
            </div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}