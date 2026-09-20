import { useEffect, useRef } from "react";

/*
 * Grille lumineuse qui suit la souris (fond global).
 * Version optimisée :
 *  - cellule trouvée par calcul d'index (plus de recherche linéaire à chaque mouvement) ;
 *  - seules les cellules actives sont dessinées ; quand il n'y en a plus, la boucle ne
 *    fait plus rien (0 % CPU au repos) ;
 *  - fondu basé sur le temps écoulé, donc identique à 60 Hz et 120 Hz ;
 *  - la boucle est bien arrêtée quand le thème change (avant, chaque bascule
 *    ajoutait une boucle supplémentaire).
 */
export default function NeonGridTrail({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const SIZE = 80;
    const color = darkMode ? "231, 144, 90" : "26, 26, 26"; // orange en sombre, neutre en clair
    let width = 0, height = 0, cols = 0, rows = 0;
    let grid = [];
    const active = new Set();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / SIZE);
      rows = Math.ceil(height / SIZE);
      grid = Array.from({ length: cols * rows }, (_, i) => ({
        x: (i % cols) * SIZE,
        y: Math.floor(i / cols) * SIZE,
        alpha: 0,
        touched: 0,
      }));
      active.clear();
      ctx.clearRect(0, 0, width, height);
    };

    const onMove = (e) => {
      const c = Math.floor(e.clientX / SIZE);
      const r = Math.floor(e.clientY / SIZE);
      if (c < 0 || r < 0 || c >= cols || r >= rows) return;
      const cell = grid[r * cols + c];
      if (cell.alpha === 0) cell.alpha = 0.5;
      cell.touched = performance.now();
      active.add(cell);
    };

    let raf = 0;
    let last = performance.now();
    let dirty = false;

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(64, now - last);
      last = now;

      if (active.size === 0) {
        if (dirty) { ctx.clearRect(0, 0, width, height); dirty = false; }
        return;
      }

      ctx.clearRect(0, 0, width, height);
      dirty = true;
      ctx.lineWidth = 1.3;

      active.forEach((cell) => {
        if (now - cell.touched > 500) cell.alpha -= dt * 0.0012; // ≈ 0,02 par image à 60 Hz
        if (cell.alpha <= 0) { cell.alpha = 0; active.delete(cell); return; }

        const cx = cell.x + SIZE / 2;
        const cy = cell.y + SIZE / 2;
        const g = ctx.createRadialGradient(cx, cy, 5, cx, cy, SIZE);
        g.addColorStop(0, `rgba(${color}, ${cell.alpha})`);
        g.addColorStop(1, `rgba(${color}, 0)`);
        ctx.strokeStyle = g;
        ctx.strokeRect(cell.x + 0.5, cell.y + 0.5, SIZE - 1, SIZE - 1);
      });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [darkMode]);

  // Canvas en fond global
  const canvasStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    backgroundColor: darkMode ? "#0F0F0F" : "#F0F0F0",
    display: "block",
  };

  return <canvas ref={canvasRef} style={canvasStyle} />;
}
