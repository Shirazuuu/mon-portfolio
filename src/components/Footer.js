import React from "react";
import "../css/Footer.css";
import { FaLinkedin, FaEnvelope, FaFacebook, FaWhatsapp, FaTelegram, FaArrowUp } from "react-icons/fa";
import Reveal from "./Reveal";
import { useLang } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Colonne gauche */}
        <Reveal className="footer-left" distance={20} blur={4} amount={0.3}>
          <h2><span>Maheriniaina</span> Tommy</h2>
          <p>{f.description}</p>
        </Reveal>

        {/* Colonne centre */}
        <Reveal className="footer-center" distance={20} blur={4} delay={0.08} amount={0.3}>
          <h3>{f.navigation}</h3>
          <ul>
            <li><a href="#home">{t.nav.home}</a></li>
            <li><a href="#services">{t.nav.services}</a></li>
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#skills">{t.nav.skills}</a></li>
            <li><a href="#projects">{t.nav.projects}</a></li>
            <li><a href="#contact">{t.nav.contact}</a></li>
          </ul>
        </Reveal>

        {/* Colonne droite */}
        <Reveal className="footer-right" distance={20} blur={4} delay={0.16} amount={0.3}>
          <h3>{f.connect}</h3>
          <p><a href="mailto:tommymaheriniaina@gmail.com">tommymaheriniaina@gmail.com</a></p>
          <p><a href="tel:+261345316018">+261 34 53 160 18</a></p>
          <p>Fianarantsoa, Madagascar</p>

          <div className="social-icons">
            <a href="https://www.linkedin.com/in/tommy-maheriniaina-212822261" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ "--c": "#0A66C2" }}><FaLinkedin /></a>
            <a href="https://mail.google.com/mail/?view=cm&to=tommymaheriniaina@gmail.com" target="_blank" rel="noreferrer" aria-label="Email" style={{ "--c": "#EA4335" }}><FaEnvelope /></a>
            <a href="https://www.facebook.com/tommy.69D.Gun" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ "--c": "#1877F2" }}><FaFacebook /></a>
            <a href="https://wa.me/261345316018" target="_blank" rel="noreferrer" aria-label="WhatsApp" style={{ "--c": "#25D366" }}><FaWhatsapp /></a>
            <a href="https://t.me/261345316018" target="_blank" rel="noreferrer" aria-label="Telegram" style={{ "--c": "#26A5E4" }}><FaTelegram /></a>
          </div>
        </Reveal>
      </div>

      {/* Bas du footer */}
      <Reveal className="footer-bottom" distance={12} blur={3} amount={0.5}>
        <p>© {year} Maheriniaina Tommy. {f.rights}</p>
        <p>{f.madeWith} <span className="heart">♡</span> {f.andCoffee}</p>
        <a href="#home" className="back-to-top"><FaArrowUp /> {f.backToTop}</a>
      </Reveal>
    </footer>
  );
}
