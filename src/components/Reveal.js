import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, EASE_EXIT, DURATION } from "../motion";

/*
 * Reveal — animation d'apparition / disparition au scroll, dans les deux sens.
 *  - En scrollant vers le bas : l'élément monte depuis le bas et se dévoile.
 *  - En scrollant vers le haut : l'élément redescend / se rétracte élégamment.
 *  La direction est déduite de la position de l'élément par rapport au centre
 *  de l'écran au moment où il entre ou sort du viewport (edge = 1 en bas, -1 en haut).
 *  Utilisé dans toutes les sections pour un mouvement cohérent (courbe EASE unique).
 *
 *  Performance : seules opacity et transform sont animées (composées sur le GPU,
 *  fluides à 120 Hz). Le flou (prop `blur`) est conservé pour compatibilité mais
 *  n'est plus animé : un filtre animé sur des dizaines d'éléments fait chuter le
 *  nombre d'images par seconde.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  style,
  side = 0,        // -1 : glisse depuis la gauche, 1 : depuis la droite, 0 : vertical seulement
  distance = 36,   // déplacement vertical (px)
  scale = 0.97,
  blur,            // ignoré (voir note ci-dessus)
  rotate = 0,
  delay = 0,
  amount = 0.2,    // part de l'élément visible pour déclencher l'entrée
  once = false,    // true : ne rejoue pas la sortie
  innerRef,        // callback ref pour récupérer le DOM node (mesures)
  ...rest
}) {
  const ref = useRef(null);
  const [state, setState] = useState({ inView: false, edge: 1 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const r = entry.boundingClientRect;
        const edge = r.top + r.height / 2 > window.innerHeight / 2 ? 1 : -1;
        setState(prev => {
          const inView = entry.isIntersecting || (once && prev.inView);
          return prev.inView === inView && prev.edge === edge ? prev : { inView, edge };
        });
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [amount, once]);

  const hidden = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: distance * state.edge,
        x: side * 28,
        scale,
        rotate: rotate * state.edge,
      };

  const shown = reduce
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 };

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={el => {
        ref.current = el;
        if (innerRef) innerRef(el);
      }}
      className={className}
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: distance, x: side * 28, scale }}
      animate={state.inView ? shown : hidden}
      transition={
        state.inView
          ? { duration: DURATION.enter, ease: EASE, delay }
          : { duration: DURATION.exit, ease: EASE_EXIT, delay: 0 }
      }
      {...rest}
    >
      {typeof children === "function" ? children(state.inView) : children}
    </Tag>
  );
}
