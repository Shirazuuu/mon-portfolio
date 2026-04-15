import React, { useState, useEffect, useRef } from "react";
import "../css/Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const contactRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // ================= TOAST SYSTEM =================
  const addToast = (type, message) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // ================= SUBMIT =================
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
          website,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        addToast("success", "Message envoyé avec succès 🚀");

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setWebsite("");
      } else {
        console.error(data.error);
        addToast("error", "Erreur lors de l’envoi ❌");
      }
    } catch (error) {
      console.error(error);
      addToast("error", "Erreur réseau ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= SCROLL ANIMATION =================
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
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
      {/* TOASTS */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <div className="toast-content">
              {t.type === "success" ? "✅" : "⚠️"}
              <span>{t.message}</span>
            </div>
            <div className="toast-progress" />
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div className="contact-header animate-on-scroll">
        <h2>Restons en <span>Contact</span></h2>
        <p>Vous avez un projet en tête ? Parlons-en ensemble.</p>
      </div>

      <div className="contact-grid animate-on-scroll">

        {/* INFO */}
        <div className="contact-info">
          <h2>Informations de <span>Contact</span></h2>

          <a href="mailto:tommymaheriniaina@gmail.com" className="info-box">
            <b>Email</b>
            <p>tommymaheriniaina@gmail.com</p>
          </a>

          <a href="https://wa.me/261345316018" className="info-box" target="_blank" rel="noreferrer">
            <b>WhatsApp</b>
            <p>+261 34 53 160 18</p>
          </a>

          <a href="https://www.google.com/maps/place/Madagascar" className="info-box" target="_blank" rel="noreferrer">
            <b>Localisation</b>
            <p>Fianarantsoa, Madagascar</p>
          </a>

          <div className="availability">
            <h4>Disponibilité</h4>
            <p>Lun - Ven: 9h - 18h</p>
            <p>Sam: 10h - 16h</p>
            <p>Dim: Sur rendez-vous</p>
            <div className="status">✅ Disponible</div>
          </div>
        </div>

        {/* FORM */}
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
              placeholder="Sujet"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              placeholder="Votre message..."
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* HONEYPOT */}
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ display: "none" }}
              autoComplete="off"
            />

            <button type="submit" className="btn glitch" disabled={loading}>
              {loading ? "Envoi en cours..." : "✈ Envoyer"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}