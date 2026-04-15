import React, { useState, useEffect, useRef } from "react";
import "../css/Contact.css";

// icons
import { MdEmail, MdLocationOn, MdSchedule } from "react-icons/md";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

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

  // ================= TOAST =================
  const addToast = (type, message) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          website,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        addToast("success", "Message envoyé avec succès 🚀");

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setWebsite("");
      } else {
        addToast("error", data?.error || "Erreur lors de l’envoi ❌");
      }
    } catch (err) {
      addToast("error", "Erreur réseau ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= SCROLL =================
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
              {t.type === "success" ? "✅" : "❌"}
              <span>{t.message}</span>
            </div>
            <div className="toast-progress" />
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div className="contact-header animate">
        <h2>Restons en <span>Contact</span></h2>
        <p>Vous avez un projet ? Parlons-en ensemble.</p>
      </div>

      <div className="contact-grid animate">

        {/* ================= INFO ================= */}
        <div className="contact-info">

          <h2>Informations de <span>Contact</span></h2>

          {/* EMAIL */}
          <a href="mailto:tommymaheriniaina@gmail.com" className="info-box">
            <MdEmail className="icon" />
            <div>
              <b>Email</b>
              <p>tommymaheriniaina@gmail.com</p>
            </div>
          </a>

          {/* PHONE */}
          <a href="tel:+261345316018" className="info-box">
            <FaPhoneAlt className="icon" />
            <div>
              <b>Téléphone</b>
              <p>+261 34 53 160 18</p>
            </div>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/261345316018"
            target="_blank"
            rel="noreferrer"
            className="info-box"
          >
            <FaWhatsapp className="icon" />
            <div>
              <b>WhatsApp</b>
              <p>Chat direct disponible</p>
            </div>
          </a>

          {/* LOCATION */}
          <a
            href="https://www.google.com/maps/place/Madagascar"
            target="_blank"
            rel="noreferrer"
            className="info-box"
          >
            <MdLocationOn className="icon" />
            <div>
              <b>Localisation</b>
              <p>Fianarantsoa, Madagascar</p>
            </div>
          </a>

          {/* AVAILABILITY */}
          <div className="availability">
            <MdSchedule className="icon big" />
            <h4>Disponibilité</h4>

            <p>Lun - Ven: 9h00 - 18h00</p>
            <p>Sam: 10h00 - 16h00</p>
            <p>Dim: Sur rendez-vous</p>

            <div className="status">
              ✅ Disponible pour de nouveaux projets
            </div>
          </div>

        </div>

        {/* ================= FORM ================= */}
        <div className="contact-form">

          <h2>Envoyez-moi un <span>Message</span></h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <input
              placeholder="Sujet"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <textarea
              rows="5"
              placeholder="Votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            {/* HONEYPOT */}
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ display: "none" }}
              autoComplete="off"
            />

            <button className="btn glitch" disabled={loading}>
              {loading ? "Envoi..." : "✈ Envoyer"}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}