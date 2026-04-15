import React, { useState, useEffect, useRef } from "react";
import "../css/Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await res.json(); // ⭐ IMPORTANT

      if (res.ok) {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 5000);

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        console.error("Erreur API:", data.error);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={contactRef}
      className={`contact-container ${visible ? "visible" : ""}`}
      id="contact"
    >
      {toastVisible && (
        <div className="toast show">
          ✅ Votre message a été envoyé !
        </div>
      )}

      <div className="contact-header">
        <h2>Restons en <span>Contact</span></h2>
        <p>Vous avez un projet en tête ? N'hésitez pas à me contacter.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Informations de <span>Contact</span></h2>

          <a href="mailto:tommymaheriniaina@gmail.com" className="info-box">
            <b>Email</b>
            <p>tommymaheriniaina@gmail.com</p>
          </a>

          <a href="https://wa.me/261345316018" target="_blank" rel="noopener noreferrer" className="info-box">
            <b>Téléphone / WhatsApp</b>
            <p>+261 34 53 160 18</p>
          </a>

          <a href="https://www.google.com/maps/place/Madagascar" target="_blank" rel="noopener noreferrer" className="info-box">
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
              placeholder="Décrivez votre projet..."
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="btn glitch" disabled={loading}>
              {loading ? "Envoi..." : "✈ Envoyer le message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}