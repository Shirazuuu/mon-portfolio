import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/Projects.css";
import { FaGlobe, FaMobileAlt, FaRobot, FaCogs, FaPills, FaLightbulb, FaGithub, FaExternalLinkAlt, FaEye, FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { EASE } from "../motion";
import { useLang } from "../i18n/LanguageContext";

/* =======================================================
   TECH LOGOS — SVG inline par technologie
======================================================= */
const TECH_LOGOS = {
  React: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  "React Native": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.5L2 6.75v10.5L12 22.5l10-5.25V6.75L12 1.5z" fill="#339933" opacity="0.15"/>
      <path d="M12 2.5L3 7.25v9.5L12 21.5l9-4.75v-9.5L12 2.5z" stroke="#339933" strokeWidth="1.2" fill="none"/>
      <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#339933" fontFamily="monospace">N</text>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
      <path d="M7 17.5c.5.9 1.2 1.5 2.4 1.5 1.1 0 1.8-.55 1.8-1.3 0-.9-.7-1.2-1.9-1.72l-.65-.28c-1.9-.8-3.15-1.8-3.15-3.93 0-1.95 1.5-3.45 3.83-3.45 1.66 0 2.86.58 3.72 2.1l-2.04 1.3c-.45-.8-.93-1.1-1.68-1.1-.77 0-1.25.48-1.25 1.1 0 .77.48 1.08 1.6 1.55l.65.28c2.23.95 3.5 1.93 3.5 4.1 0 2.36-1.85 3.63-4.34 3.63-2.44 0-4.01-1.16-4.77-2.68L7 17.5zm9.3.25c.4.7.76 1.3 1.62 1.3.83 0 1.35-.32 1.35-1.57v-8.5h2.5v8.55c0 2.6-1.52 3.77-3.74 3.77-2.01 0-3.17-1.04-3.76-2.3l2.03-1.25z" fill="#323330"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#3178C6"/>
      <path d="M4 12.5h5.5V14H7v7H5.5v-7H4v-1.5zm7.5 0H16c1.1 0 2 .9 2 2v.5c0 .8-.48 1.5-1.2 1.82L18.5 21H17l-1.6-3.8H13V21h-1.5v-8.5zm1.5 1.5v2.2h2c.44 0 .8-.36.8-.8v-.6c0-.44-.36-.8-.8-.8H13z" fill="white"/>
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="11" ry="6" fill="#777BB4" opacity="0.15"/>
      <ellipse cx="12" cy="12" rx="11" ry="6" stroke="#777BB4" strokeWidth="1.2" fill="none"/>
      <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#777BB4" fontFamily="monospace">php</text>
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C7 3 3 4.8 3 7s4 4 9 4 9-1.8 9-4-4-4-9-4z" fill="#4479A1" opacity="0.2"/>
      <path d="M3 7v5c0 2.2 4 4 9 4s9-1.8 9-4V7" stroke="#4479A1" strokeWidth="1.2" fill="none"/>
      <path d="M3 12v5c0 2.2 4 4 9 4s9-1.8 9-4v-5" stroke="#4479A1" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="7" rx="9" ry="4" stroke="#4479A1" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C7 3 3 4.8 3 7s4 4 9 4 9-1.8 9-4-4-4-9-4z" fill="#336791" opacity="0.2"/>
      <path d="M3 7v5c0 2.2 4 4 9 4s9-1.8 9-4V7" stroke="#336791" strokeWidth="1.2" fill="none"/>
      <path d="M3 12v5c0 2.2 4 4 9 4s9-1.8 9-4v-5" stroke="#336791" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="7" rx="9" ry="4" stroke="#336791" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 8 8 8 13a4 4 0 008 0c0-5-4-11-4-11z" fill="#4EA94B" opacity="0.3"/>
      <path d="M12 2C12 2 8 8 8 13a4 4 0 008 0c0-5-4-11-4-11z" stroke="#4EA94B" strokeWidth="1.3" fill="none"/>
      <line x1="12" y1="17" x2="12" y2="22" stroke="#4EA94B" strokeWidth="1.5"/>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="11" width="20" height="8" rx="2" fill="#2496ED" opacity="0.15"/>
      <rect x="2" y="11" width="20" height="8" rx="2" stroke="#2496ED" strokeWidth="1.2" fill="none"/>
      <rect x="4" y="8" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <rect x="8" y="8" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <rect x="12" y="8" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <rect x="8" y="5" width="3" height="3" rx="0.5" fill="#2496ED"/>
      <path d="M20 13c1.5 0 2.5.8 2.5 2" stroke="#2496ED" strokeWidth="1" fill="none"/>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M8 16V8l8 9V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  "Vue.js": (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3l10 18L22 3h-4l-6 10.8L6 3H2z" fill="#4FC08D" opacity="0.2"/>
      <path d="M2 3l10 18L22 3h-4l-6 10.8L6 3H2z" stroke="#4FC08D" strokeWidth="1.2" fill="none"/>
      <path d="M6 3l6 10.8L18 3h-3l-3 5.4L9 3H6z" fill="#35495E" opacity="0.5"/>
    </svg>
  ),
  NestJS: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6L12 2z" fill="#E0234E" opacity="0.15"/>
      <path d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6L12 2z" stroke="#E0234E" strokeWidth="1.2" fill="none"/>
      <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#E0234E" fontFamily="monospace">N</text>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.716 1.219C13.269 10.453 14.356 11.6 16.5 11.6c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.716-1.219C15.231 7.147 14.144 6 12 6zM7.5 11.6C5.1 11.6 3.6 12.8 3 15.2c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.716 1.219C8.769 16.053 9.856 17.2 12 17.2c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.716-1.219C10.731 12.747 9.644 11.6 7.5 11.6z" fill="#38BDF8"/>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2h8a3 3 0 010 6H8a3 3 0 010-6z" fill="#F24E1E" opacity="0.8"/>
      <path d="M8 8h4a3 3 0 010 6H8V8z" fill="#FF7262" opacity="0.8"/>
      <circle cx="16" cy="11" r="3" fill="#1ABCFE"/>
      <path d="M8 14h4a3 3 0 010 6H8v-6z" fill="#0ACF83" opacity="0.8"/>
      <path d="M5 17a3 3 0 106 0 3 3 0 00-6 0z" fill="#A259FF" opacity="0.8"/>
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" fill="#E34F26" opacity="0.15"/>
      <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" stroke="#E34F26" strokeWidth="1.2" fill="none"/>
      <text x="12" y="14" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#E34F26" fontFamily="monospace">HTML</text>
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" fill="#1572B6" opacity="0.15"/>
      <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" stroke="#1572B6" strokeWidth="1.2" fill="none"/>
      <text x="12" y="14" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#1572B6" fontFamily="monospace">CSS</text>
    </svg>
  ),
  JWT: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="9" width="20" height="6" rx="3" fill="#000000" opacity="0.1"/>
      <rect x="2" y="9" width="20" height="6" rx="3" stroke="#000000" strokeWidth="1.2" fill="none"/>
      <text x="12" y="14" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#000" fontFamily="monospace">JWT</text>
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L22 21H2L12 3z" fill="currentColor" opacity="0.15"/>
      <path d="M12 3L22 21H2L12 3z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 14.5s-1.5.9.9 1.2c2.9.4 4.4.3 7.6-.3 0 0 .8.5 2 .9-7.3 3.1-16.5-.2-10.5-1.8z" fill="#EA2D2E"/>
      <path d="M8.5 12s-1.7 1.3 1 1.7c2.4.3 5.4.4 7.5-.2 0 0 .6.6 1.5.9-6.6 1.9-14-.1-10-2.4z" fill="#EA2D2E"/>
      <path d="M13.5 3c0 0 2.6 2.6-2.5 6.5-4.1 3.2-.9 5 0 7.1-2.3-2.1-4-3.9-2.9-5.6 1.7-2.5 6.5-3.8 5.4-8z" fill="#EA2D2E"/>
    </svg>
  ),
  FastAPI: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#009688" opacity="0.15"/>
      <circle cx="12" cy="12" r="10" stroke="#009688" strokeWidth="1.2" fill="none"/>
      <path d="M13 5l-5 8h5l-2 6 6-9h-5l1-5z" fill="#009688"/>
    </svg>
  ),
};

const getTechLogo = (tag) => {
  const key = Object.keys(TECH_LOGOS).find(
    (k) => tag.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(tag.toLowerCase())
  );
  return key ? TECH_LOGOS[key] : null;
};

/* =======================================================
   VISUALS PAR CATÉGORIE
======================================================= */
const getVisuals = (categories = []) => {
  const map = {
    Web: { icon: <FaGlobe />, gradient: "#1A1A1A" },
    Mobile: { icon: <FaMobileAlt />, gradient: "#4A4A4A" },
    IA: { icon: <FaRobot />, gradient: "#8A8A8A" },
    DevOps: { icon: <FaCogs />, gradient: "#4A4A4A" },
  };
  if (categories.includes("Web") && categories.includes("Mobile")) {
    return { icon: <FaPills />, gradient: "#1A1A1A" };
  }
  if (categories.includes("IA")) return map.IA;
  return map[categories[0]] || { icon: <FaLightbulb />, gradient: "#4A4A4A" };
};

/* =======================================================
   TECH TAG avec logo
======================================================= */
const TechTag = ({ tag }) => {
  const logo = getTechLogo(tag);
  return (
    <span className="pj-tag">
      {logo && <span className="pj-tag-logo">{logo}</span>}
      {tag}
    </span>
  );
};

/* =======================================================
   TEXTES SELON LA LANGUE
======================================================= */
const localized = (project, lang) => ({
  title: lang === "en" && project.title_en ? project.title_en : project.title,
  description: lang === "en" && project.description_en ? project.description_en : project.description,
});

/* =======================================================
   LIGHTBOX IMAGES
======================================================= */
const ImageLightbox = ({ images, startIndex, onClose, labels }) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = (e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "Escape") onClose();
      e.stopPropagation();
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [images.length, onClose]);

  return (
    <motion.div className="pj-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="pj-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button className="pj-lightbox-close" onClick={onClose} aria-label={labels.close}><FaTimes /></button>
        <div className="pj-lightbox-stage">
          {images.length > 1 && <button className="pj-lightbox-nav pj-lightbox-nav--prev" onClick={prev} aria-label={labels.prev}><FaChevronLeft /></button>}
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`preview-${current}`}
              className="pj-lightbox-img"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </AnimatePresence>
          {images.length > 1 && <button className="pj-lightbox-nav pj-lightbox-nav--next" onClick={next} aria-label={labels.next}><FaChevronRight /></button>}
        </div>
        {images.length > 1 && (
          <div className="pj-lightbox-dots">
            {images.map((_, i) => (
              <button key={i} className={`pj-lightbox-dot ${i === current ? "pj-lightbox-dot--active" : ""}`} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} aria-label={`${i + 1}`} />
            ))}
          </div>
        )}
        {images.length > 1 && <p className="pj-lightbox-counter">{current + 1} / {images.length}</p>}
      </motion.div>
    </motion.div>
  );
};

/* =======================================================
   MODAL PROJET (avec navigation précédent / suivant)
======================================================= */
const ProjectDetailsModal = ({ project, onClose, onPrev, onNext, lang, labels }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (!project) return undefined;
    const handleKey = (e) => {
      if (lightboxIndex !== null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, lightboxIndex, onClose, onPrev, onNext]);

  if (!project) return null;

  const { icon, gradient } = getVisuals(project.categories);
  const { title, description } = localized(project, lang);
  const coverImage = project.image || (project.images && project.images[0]);
  const allImages = project.images || (project.image ? [project.image] : []);

  return (
    <>
      <motion.div className="pj-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          key={project.id}
          className="pj-modal"
          initial={{ scale: 0.94, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 24, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <button className="pj-modal-close" onClick={onClose} aria-label={labels.close}><FaTimes /></button>

          {onPrev && <button className="pj-modal-nav pj-modal-nav--prev" onClick={onPrev} aria-label={labels.prev}><FaChevronLeft /></button>}
          {onNext && <button className="pj-modal-nav pj-modal-nav--next" onClick={onNext} aria-label={labels.next}><FaChevronRight /></button>}

          <div className="pj-modal-hero">
            {coverImage ? (
              <>
                <img src={coverImage} alt={title} className="pj-modal-cover" />
                <div className="pj-modal-cover-overlay" />
                <span className="pj-modal-icon pj-modal-icon--over">{icon}</span>
              </>
            ) : (
              <div className="pj-modal-hero-gradient" style={{ background: gradient }}>
                <span className="pj-modal-icon">{icon}</span>
              </div>
            )}
          </div>

          <div className="pj-modal-body">
            <p className="pj-modal-cat">{project.categories.join(" · ")}</p>
            <h3 className="pj-modal-title">{title}</h3>
            <p className="pj-modal-desc">{description}</p>
            <div className="pj-accent-line" />

            {allImages.length > 1 && (
              <div className="pj-modal-section">
                <p className="pj-modal-label">{labels.previews}</p>
                <div className="pj-gallery">
                  {allImages.map((img, index) => (
                    <motion.div key={index} className="pj-gallery-item" whileHover={{ scale: 1.04 }} transition={{ duration: 0.35, ease: EASE }} onClick={() => setLightboxIndex(index)}>
                      <img src={img} alt={`preview-${index}`} className="pj-gallery-img" loading="lazy" />
                      <div className="pj-gallery-overlay"><span className="pj-gallery-zoom"><FaSearchPlus /></span></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="pj-modal-section">
              <p className="pj-modal-label">{labels.technologies}</p>
              <div className="pj-tags">
                {project.tags.map((tag, i) => <TechTag key={i} tag={tag} />)}
              </div>
            </div>

            <div className="pj-modal-footer">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="pj-btn pj-btn-ghost"><FaGithub /> {labels.github}</a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="pj-btn pj-btn-primary"><FaExternalLinkAlt /> {labels.demoLive}</a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox images={allImages} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} labels={labels} />
        )}
      </AnimatePresence>
    </>
  );
};

/* =======================================================
   CARTE PROJET
======================================================= */
const ProjectCard = ({ project, index, onClick, lang, labels }) => {
  const { icon, gradient } = getVisuals(project.categories);
  const { title, description } = localized(project, lang);

  return (
    <Reveal
      className="pj-card"
      delay={(index % 3) * 0.08}
      amount={0.25}
      whileHover={{ y: -6 }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(project); } }}
    >
      <div className="pj-card-img">
        {project.image ? (
          <>
            <img src={project.image} alt={title} className="pj-real-img" loading="lazy" width="1400" height="700" />
            <div className="pj-img-overlay" />
          </>
        ) : (
          <div className="pj-img-bg" style={{ background: gradient }}>
            <span>{icon}</span>
          </div>
        )}
        <span className="pj-badge">{project.categories.join(" / ")}</span>
      </div>
      <div className="pj-card-body">
        <div className="pj-card-icon-row">
          <span className="pj-card-icon">{icon}</span>
        </div>
        <h3 className="pj-card-title">{title}</h3>
        <p className="pj-card-desc">{description}</p>
        <div className="pj-tags">
          {project.tags.map((tag, i) => <TechTag key={i} tag={tag} />)}
        </div>
        <div className="pj-card-actions">
          {project.id === 3 && project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="pj-btn pj-btn-ghost" onClick={(e) => e.stopPropagation()}>
              <FaGithub /> {labels.github}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="pj-btn pj-btn-primary" onClick={(e) => e.stopPropagation()}>
              <FaExternalLinkAlt /> {labels.demo}
            </a>
          )}
          <button className="pj-btn pj-btn-outline" onClick={(e) => { e.stopPropagation(); onClick(project); }}>
            <FaEye /> {labels.details}
          </button>
        </div>
      </div>
    </Reveal>
  );
};

/* =======================================================
   COMPOSANT PRINCIPAL
======================================================= */
const HASH_PREFIX = "#projects/";

const readSlugFromHash = () => {
  const h = window.location.hash || "";
  return h.startsWith(HASH_PREFIX) ? decodeURIComponent(h.slice(HASH_PREFIX.length)) : null;
};

const Projects = () => {
  const { t, lang } = useLang();
  const labels = t.projects;

  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState(null);
  const gridRef = useRef(null);

  /* Chargement des données */
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/projects.json`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Erreur chargement JSON :", error));
  }, []);

  /* Deep-link : #projects/<slug> ouvre directement la fiche */
  useEffect(() => {
    const sync = () => setSelectedSlug(readSlugFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return ["all", ...Array.from(set)];
  }, [projects]);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [projects, filter]
  );

  const selectedIndex = visible.findIndex((p) => p.slug === selectedSlug);
  const selected = selectedIndex >= 0 ? visible[selectedIndex] : projects.find((p) => p.slug === selectedSlug) || null;

  const openProject = useCallback((project) => {
    window.history.replaceState(null, "", HASH_PREFIX + project.slug);
    setSelectedSlug(project.slug);
  }, []);

  const closeProject = useCallback(() => {
    window.history.replaceState(null, "", "#projects");
    setSelectedSlug(null);
  }, []);

  const goPrev = selectedIndex > 0 ? () => openProject(visible[selectedIndex - 1]) : null;
  const goNext = selectedIndex >= 0 && selectedIndex < visible.length - 1 ? () => openProject(visible[selectedIndex + 1]) : null;

  /* Bloquer le scroll de la page quand une fiche est ouverte */
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const scrollToGrid = () => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="pj-section">
      {/* HEADER */}
      <div className="pj-header">
        <Reveal as="span" className="section-kicker" distance={12} blur={4}>04</Reveal>
        <WordReveal as="h2" className="pj-title" text={labels.title} accent={labels.accent} accentTag="em" />
        <Reveal as="p" className="pj-subtitle" distance={16} blur={4} delay={0.1}>{labels.subtitle}</Reveal>

        {/* FILTRES */}
        <Reveal className="pj-filters" distance={14} blur={4} delay={0.15} role="tablist" aria-label="Filtres">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              className={`pj-filter ${filter === cat ? "pj-filter--active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat === "all" ? labels.all : cat}
            </button>
          ))}
        </Reveal>

        <motion.button
          className="pj-scroll-arrow"
          onClick={scrollToGrid}
          aria-label={labels.seeProjects}
          whileHover={{ scale: 1.1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="pj-arrow-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15.5" stroke="currentColor" strokeOpacity="0.25" />
            <path d="M10 13.5L16 19.5L22 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

      {/* GRILLE */}
      <div className="pj-grid" ref={gridRef}>
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} onClick={openProject} lang={lang} labels={labels} />
          ))}
        </AnimatePresence>
        {projects.length > 0 && visible.length === 0 && <p className="pj-empty">{labels.empty}</p>}
      </div>

      {/* MODALE */}
      <AnimatePresence>
        {selected && (
          <ProjectDetailsModal
            project={selected}
            onClose={closeProject}
            onPrev={goPrev}
            onNext={goNext}
            lang={lang}
            labels={labels}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
