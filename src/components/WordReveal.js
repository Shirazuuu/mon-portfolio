import React from "react";
import { motion } from "framer-motion";
import { EASE } from "../motion";

/*
 * WordReveal — titre dont les mots apparaissent l'un après l'autre.
 *  text   : la partie neutre du titre
 *  accent : le ou les mots mis en couleur (rendus dans <accentTag>)
 */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const word = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
};

const split = (s) => String(s || "").trim().split(/\s+/).filter(Boolean);

export default function WordReveal({ as = "h2", className, text = "", accent = "", accentTag = "span", amount = 0.6, ...rest }) {
  const Tag = motion[as] || motion.h2;
  const AccentTag = accentTag;
  const words = split(text);
  const accentWords = split(accent);

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount }}
      {...rest}
    >
      {words.map((w, i) => (
        <React.Fragment key={`w${i}`}>
          <motion.i className="wr-word" variants={word}>{w}</motion.i>
          {" "}
        </React.Fragment>
      ))}
      {accentWords.length > 0 && (
        <AccentTag>
          {accentWords.map((w, i) => (
            <React.Fragment key={`a${i}`}>
              <motion.i className="wr-word" variants={word}>{w}</motion.i>
              {i < accentWords.length - 1 ? " " : ""}
            </React.Fragment>
          ))}
        </AccentTag>
      )}
    </Tag>
  );
}
