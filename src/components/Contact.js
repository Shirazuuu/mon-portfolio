import React, { useState, useEffect, useRef } from "react";
import "../css/Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // ⭐ HONEYPOT
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
          website, // ⭐ anti-bot field
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 5000);

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setWebsite("");
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
        <div className="toast show">✅ Message envoyé !</div>
      )}

      <div className="contact-header">
        <h2>Restons en <span>Contact</span></h2>
        <p>Vous avez un projet en tête ? Contactez-moi.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Informations de <span>Contact</span></h2>

          <a href="mailto:tommymaheriniaina@gmail.com" className="info-box">
            <b>Email</b>
            <p>tommymaheriniaina@gmail.com</p>
          </a>
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
              placeholder="Sujet"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              placeholder="Message"
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* ⭐ HONEYPOT FIELD (hidden for bots) */}
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ display: "none" }}
              autoComplete="off"
            />

            <button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}