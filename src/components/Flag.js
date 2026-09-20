import React from "react";

/*
 * Drapeaux en SVG inline (les drapeaux emoji ne s'affichent pas sous Windows).
 * Rendu en pastille ronde, taille pilotée par la prop `size`.
 */
export default function Flag({ code, size = 16 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false" };

  if (code === "fr") {
    return (
      <svg {...common}>
        <clipPath id="flag-fr"><circle cx="12" cy="12" r="12" /></clipPath>
        <g clipPath="url(#flag-fr)">
          <rect width="8" height="24" fill="#0055A4" />
          <rect x="8" width="8" height="24" fill="#FFFFFF" />
          <rect x="16" width="8" height="24" fill="#EF4135" />
        </g>
      </svg>
    );
  }

  /* Royaume-Uni (simplifié) */
  return (
    <svg {...common}>
      <clipPath id="flag-gb"><circle cx="12" cy="12" r="12" /></clipPath>
      <g clipPath="url(#flag-gb)">
        <rect width="24" height="24" fill="#012169" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#FFFFFF" strokeWidth="4.5" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#C8102E" strokeWidth="2" />
        <path d="M12 0v24M0 12h24" stroke="#FFFFFF" strokeWidth="7" />
        <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="4" />
      </g>
    </svg>
  );
}
