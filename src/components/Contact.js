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

  // ================= TOAST SYSTEM (FIXED + SAFE) =================
  const addToast = (type, message) => {
    const id = crypto.randomUUID?.() || Date.now();

    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // ================= SUBMIT (DEBUG IMPROVED) =================
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

      let data = null;

      try {
        data = await res.json();
      } catch (err) {
        console.error("❌ JSON invalide du backend");
      }

      console.log("API RESPONSE:", res.status, data);

      if (res.ok) {
        addToast("success", "Message envoyé avec succès 🚀");

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setWebsite("");
      } else {
        addToast(
          "error",
          data?.error || "Erreur lors de l’envoi du message ❌"
        );
      }
    } catch (error) {
      console.error("NETWORK ERROR:", error);
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
      {/* ================= TOASTS (FIXED VISIBILITY) ================= */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <div className="toast-content">
              <span className="toast-icon">
                {t.type === "success" ? "✅" : "❌"}
              </span>
              <span>{t.message}</span>
            </div>

            <div className="toast-progress" />
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div className="contact-header animate">
        <h2>Restons en <span>Contact</span></h2>
        <p>Envoyez-moi un message et je vous réponds rapidement.</p>
      </div>

      <div className="contact-grid animate">

        {/* INFO */}
        <div className="contact-info">
          <h2>Informations</h2>

          <a className="info-box" href="mailto:tommymaheriniaina@gmail.com">
            <b>Email</b>
            <p>tommymaheriniaina@gmail.com</p>
          </a>

          <a className="info-box" href="https://wa.me/261345316018">
            <b>WhatsApp</b>
            <p>+261 34 53 160 18</p>
          </a>

          <div className="availability">
            <h4>Disponibilité</h4>
            <p>Lun - Ven</p>
            <div className="status">Disponible</div>
          </div>
        </div>

        {/* FORM */}
        <div className="contact-form">
          <h2>Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                placeholder="Email"
                type="email"
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
              placeholder="Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            {/* HONEYPOT */}
            <input
              type="text"
              style={{ display: "none" }}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
            />

            <button className="btn" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}