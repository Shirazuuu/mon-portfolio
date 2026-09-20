import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* Trait fin en haut de page qui se remplit selon la position de lecture. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
