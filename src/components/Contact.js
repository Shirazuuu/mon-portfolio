import React, { useState } from "react";
import "../css/Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log dans la console
    console.log("Formulaire soumis !");
    console.log("Nom:", name);
    console.log("Email du client:", email);
    console.log("Sujet:", subject);
    console.log("Message:", message);

    // Construction du lien Gmail avec le message de l'utilisateur
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=tommymaheriniaina@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    // Ouvrir dans un nouvel onglet
    window.open(gmailLink, "_blank");
  };

  return (
    <div className="contact-container" id="contact">
      <div className="contact-header">
        <h2>Restons en <span>Contact</span></h2>
        <p>Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.</p>
      </div>

      <div className="contact-grid">
        {/* Partie gauche - Informations */}
        <div className="contact-info">
          <h2>Informations de <span>Contact</span></h2>

          <a href="mailto:tommymaheriniaina@gmail.com" className="info-box">
            <b>Email</b>
            <p>tommymaheriniaina@gmail.com</p>
          </a>

          <a href="tel:+261345316018" className="info-box">
            <b>Téléphone</b>
            <p>+261 34 53 160 18</p>
          </a>

          <a
            href="https://www.google.com/maps/place/Madagascar"
            target="_blank"
            rel="noopener noreferrer"
            className="info-box"
          >
            <b>Localisation</b>
            <p>Fianarantsoa, Madagascar</p>
          </a>

          <div className="availability">
            <h4>Disponibilité</h4>
            <p>Lun - Ven: 9h00 - 18h00</p>
            <p>Sam: 10h00 - 16h00</p>
            <p>Dim: Sur rendez-vous</p>
            <div className="status">✅ Disponible pour de nouveaux projets</div>
          </div>
        </div>

        {/* Partie droite - Formulaire */}
        <div className="contact-form">
          <h2>Envoyez-moi un <span>Message</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Votre nom"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Votre email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Sujet de votre message"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Décrivez votre projet ou posez votre question..."
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type="submit" className="btn glitch">
              ✈ Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
