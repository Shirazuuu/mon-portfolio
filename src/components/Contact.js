import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/Contact.css";
import { MdEmail, MdLocationOn, MdSchedule } from "react-icons/md";
import { FaWhatsapp, FaPhoneAlt, FaCheckCircle, FaTimesCircle, FaPaperPlane, FaTimes } from "react-icons/fa";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { EASE } from "../motion";
import { useLang } from "../i18n/LanguageContext";

const TOAST_MS = 5000;

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  /* Après un envoi réussi, le formulaire laisse place à un écran de confirmation */
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  /* ================= TOAST ================= */
  const dismissToast = (id) => setToasts((prev) => prev.filter((x) => x.id !== id));

  const addToast = (type, title, text) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message: text }]);
    setTimeout(() => dismissToast(id), TOAST_MS);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, website }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        addToast("success", c.toastSuccessTitle, c.toastSuccess);
        setSentName(name.trim().split(/\s+/)[0] || "");
        setSent(true);
        setName(""); setEmail(""); setSubject(""); setMessage(""); setWebsite("");
      } else {
        addToast("error", c.toastErrorTitle, data?.error || c.toastError);
      }
    } catch (err) {
      addToast("error", c.toastErrorTitle, c.toastNetwork);
    } finally {
      setLoading(false);
    }
  };

  const thanks = sentName ? c.sentThanksName.replace("{name}", sentName) : c.sentThanks;

  const infos = [
    { href: "mailto:tommymaheriniaina@gmail.com", icon: <MdEmail className="icon" style={{ color: "#EA4335" }} />, label: c.email, sub: "tommymaheriniaina@gmail.com" },
    { href: "tel:+261345316018", icon: <FaPhoneAlt className="icon" style={{ color: "#10B981" }} />, label: c.phone, sub: "+261 34 53 160 18" },
    { href: "https://wa.me/261345316018", icon: <FaWhatsapp className="icon" style={{ color: "#25D366" }} />, label: c.whatsapp, sub: c.whatsappSub, external: true },
    { href: "https://www.google.com/maps/place/Madagascar", icon: <MdLocationOn className="icon" style={{ color: "#4285F4" }} />, label: c.location, sub: c.locationSub, external: true },
  ];

  return (
    <div className="contact-container" id="contact-inner">
      {/* TOASTS */}
      <div className="toast-container" aria-live="polite">
        <AnimatePresence>
          {toasts.map((x) => (
            <motion.div
              key={x.id}
              layout
              className={`toast ${x.type}`}
              role="status"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <span className="toast-bubble">
                {x.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
              </span>
              <div className="toast-text">
                <strong>{x.title}</strong>
                <span>{x.message}</span>
              </div>
              <button type="button" className="toast-close" onClick={() => dismissToast(x.id)} aria-label={c.close}>
                <FaTimes />
              </button>
              <span className="toast-progress" aria-hidden="true" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* HEADER */}
      <div className="contact-header">
        <Reveal as="span" className="section-kicker" distance={12}>05</Reveal>
        <WordReveal as="h2" text={c.title} accent={c.accent} />
        <Reveal as="p" distance={16} delay={0.1}>{c.subtitle}</Reveal>
      </div>

      <div className="contact-grid">
        {/* ================= INFO ================= */}
        <div className="contact-info">
          <WordReveal as="h2" text={c.infoTitle} accent={c.infoAccent} amount={0.8} />

          {infos.map((info, i) => (
            <Reveal
              key={info.label}
              as="a"
              href={info.href}
              target={info.external ? "_blank" : undefined}
              rel={info.external ? "noreferrer" : undefined}
              className="info-box"
              side={-1}
              delay={i * 0.06}
              amount={0.4}
              whileHover={{ y: -4 }}
            >
              {info.icon}
              <div>
                <b>{info.label}</b>
                <p>{info.sub}</p>
              </div>
            </Reveal>
          ))}

          <Reveal className="availability" side={-1} delay={0.25} amount={0.3}>
            <MdSchedule className="icon big" style={{ color: "#e7905a" }} />
            <h4>{c.availability}</h4>
            {c.hours.map((h) => <p key={h}>{h}</p>)}
            <div className="status">
              <FaCheckCircle className="status-icon" /> {c.status}
            </div>
          </Reveal>
        </div>

        {/* ================= FORM ================= */}
        <Reveal className="contact-form" side={1} delay={0.1} amount={0.2}>
          <WordReveal as="h2" text={c.formTitle} accent={c.formAccent} amount={0.8} />

          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                className="form-success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <svg viewBox="0 0 64 64" className="form-success-check" aria-hidden="true">
                  <motion.circle
                    cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="2.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  <motion.path
                    d="M20 33l8 8 16-17" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
                  />
                </svg>
                <h3>{c.sentTitle}</h3>
                <p>{thanks}</p>
                <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
                  {c.sentAgain}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <div className="form-group">
                  <input placeholder={c.name} value={name} onChange={(e) => setName(e.target.value)} required aria-label={c.name} />
                  <input type="email" placeholder={c.yourEmail} value={email} onChange={(e) => setEmail(e.target.value)} required aria-label={c.yourEmail} />
                </div>

                <input placeholder={c.subject} value={subject} onChange={(e) => setSubject(e.target.value)} required aria-label={c.subject} />

                <textarea rows="5" placeholder={c.message} value={message} onChange={(e) => setMessage(e.target.value)} required aria-label={c.message} />

                {/* HONEYPOT */}
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} style={{ display: "none" }} autoComplete="off" tabIndex={-1} />

                <button className={`btn btn-send ${loading ? "is-loading" : ""}`} disabled={loading}>
                  {loading ? (
                    <><span className="btn-spinner" aria-hidden="true" />{c.sending}</>
                  ) : (
                    <><span className="btn-plane"><FaPaperPlane /></span>{c.send}</>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </div>
  );
}
