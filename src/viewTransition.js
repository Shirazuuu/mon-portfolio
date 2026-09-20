import { flushSync } from "react-dom";

/*
 * Enveloppe une mise à jour d'état React dans une View Transition du navigateur
 * (Chrome, Edge, Safari 18+). L'ancien et le nouveau rendu de la page sont
 * capturés, puis animés par les règles ::view-transition-* de App.css :
 *   - type "theme" : cercle qui se propage depuis le point (x, y) du bouton ;
 *   - type "lang"  : fondu glissé de l'ancien contenu vers le nouveau.
 * Sans support (ou si l'utilisateur limite les animations), la mise à jour
 * est appliquée directement.
 */
export function withViewTransition(update, { type = "fade", x, y } = {}) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof document.startViewTransition !== "function" || reduce) {
    update();
    return;
  }

  root.dataset.vt = type;
  if (x != null && y != null) {
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    /* rayon suffisant pour couvrir l'écran depuis le point de départ */
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.style.setProperty("--vt-r", `${Math.ceil(r)}px`);
  }

  const transition = document.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => {
    delete root.dataset.vt;
  });
}
