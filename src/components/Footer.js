import React from "react";
import "../css/Footer.css";
import { FaLinkedin, FaEnvelope, FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Colonne gauche */}
        <div className="footer-left">
          <h2>
            <span>Maheriniaina</span> Tommy
          </h2>
          <p>
            Développeur passionné, spécialisé dans les technologies JavaScript. Fort de plusieurs années d’expérience,
            je conçois des applications web et mobiles modernes, performantes et intuitives. Mon expertise
            couvre l’ensemble du développement full-stack, de la conception UI/UX jusqu’à la mise en production.
          </p>
        </div>

        {/* Colonne centre */}
        <div className="footer-center">
          <h3>Navigation</h3>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Colonne droite */}
        <div className="footer-right">
          <h3>Restons connectés</h3>
          <p><a href="mailto:tommymaheriniaina@gmail.com">tommymaheriniaina@gmail.com</a></p>
          <p><a href="tel:+261345316018">+261 34 53 160 18</a></p>
          <p>Fianarantsoa, Madagascar</p>

          <div className="social-icons">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/tommy-maheriniaina-212822261" target="_blank" rel="noreferrer"><FaLinkedin /></a>

            {/* Email vers Gmail */}
            <a 
              href="https://mail.google.com/mail/?view=cm&to=tommymaheriniaina@gmail.com" 
              target="_blank" 
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/tommy.69D.Gun" target="_blank" rel="noreferrer"><FaFacebook /></a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/261345316018" 
              target="_blank" 
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>

            {/* Telegram */}
            <a 
              href="https://t.me/261345316018" 
              target="_blank" 
              rel="noreferrer"
            >
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="footer-bottom">
        <p>© 2025 Maheriniaina Tommy. Tous droits réservés.</p>
        <p>Fait avec <span className="heart">♡</span> et beaucoup de ☕</p>
      </div>
    </footer>
  );
}
