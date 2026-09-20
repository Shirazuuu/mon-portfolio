# Propositions d'amélioration du portfolio

Objectif : rendre le site plus moderne et « chill » (calme, fluide, précis) sans casser son identité actuelle : base grise, accent orange `#e7905a` unique, pas de néon, pas d'emoji, largeur 1100 px.

Chaque proposition indique l'effort estimé : **S** (moins d'une heure), **M** (une demi-journée), **L** (une journée ou plus).

---

## 1. Design

### 1.1 Typographie (M)
Le site utilise Arial / Inter. Une seule police de caractère pour les titres suffit à donner une identité sans refonte.
- Titres : **Sora**, **Manrope** ou **Space Grotesk** (géométriques, modernes, sobres).
- Corps : garder Inter, ou passer à **Manrope** partout pour une seule famille.
- Réduire le poids des grands titres de 800 à 600 ou 700 : plus léger, plus « chill ».
- Espacement des lettres légèrement négatif sur les titres (`letter-spacing: -0.02em`).

### 1.2 Système d'espacement (S)
Les sections ont des paddings différents (60, 80, 90 px). Uniformiser avec des tokens dans `App.css` :
```css
--space-section: clamp(64px, 8vw, 110px);
--space-block: 40px;
```
Résultat : un rythme vertical régulier qui donne immédiatement une impression de site « construit ».

### 1.3 Hiérarchie des titres de section (S)
Ajouter un petit libellé au-dessus de chaque titre (« 01 — À propos », « 02 — Compétences »…) en petites capitales grises, avec un trait orange de 24 px à gauche. Ce motif, répété partout, structure la lecture.

### 1.4 Cartes : un seul style (S)
Aujourd'hui les cartes (expériences, compétences, projets, contact) ont des rayons (12, 14, 16, 18 px) et des ombres différents. Définir `--radius: 14px` et `--shadow` une fois pour toutes, et les utiliser partout.

### 1.5 Hero (M)
- Ajouter une ligne d'accroche courte sous le nom, en gris : « Développeur Fullstack · Madagascar ».
- Ajouter un second bouton secondaire « Voir mes projets » (contour gris, sans remplissage) à côté de « Contacter ».
- Indicateur de scroll discret en bas du Hero (petit trait vertical animé ou texte « Défiler »).
- Les deux étiquettes flottantes (« Full Stack », « Développeur ») sont peu lisibles en mode clair : leur donner un fond `var(--card-bg)` et une bordure 1 px.

### 1.6 Projets (M)
- Les couvertures sont très colorées (violet, bleu) sur une base grise : appliquer un léger voile gris au repos (`filter: saturate(0.6)`) qui disparaît au survol. Les images gardent leurs couleurs quand on s'y intéresse, et la grille reste calme.
- Ajouter un filtre par catégorie (Web / Mobile / IA / DevOps) sous le titre, sous forme de pastilles.
- Afficher l'année ou la durée sur chaque carte.

### 1.7 Contact (S)
- Le bouton « Envoyer » est le seul bouton contour du site : le passer en plein orange comme « Contacter » pour une cohérence des actions principales.
- Retirer l'effet « glitch » au survol (`.glitch`), très marqué par rapport au reste.

### 1.8 Footer (S)
- Passer sur deux colonnes (présentation + contact) : la colonne « Navigation » duplique la navbar.
- Ajouter un lien « Retour en haut ».

### 1.9 Mode clair (S)
Le fond `#F0F0F0` est bien. Donner aux cartes un fond légèrement plus clair que la page (déjà `#F8F8F8`) mais retirer les ombres portées en mode clair, qui grisent l'ensemble : une bordure 1 px suffit.

---

## 2. Fonctionnalités

### 2.1 Navigation active (S)
Souligner en orange le lien de la navbar correspondant à la section visible (IntersectionObserver sur chaque section). Très attendu sur un one-page.

### 2.2 Barre de progression de lecture (S)
Un trait orange de 2 px en haut de la page qui se remplit selon le scroll global, dans l'esprit de la story line de la section À propos. Léger, cohérent, moderne.

### 2.3 Téléchargement du CV (S)
Bouton « CV » dans la navbar ou le Hero, avec un PDF dans `public/`. C'est l'action la plus utile pour un recruteur.

### 2.4 Projets : page ou modale enrichie (M)
La modale existe déjà. Ajouter :
- un bloc « Rôle et responsabilités » et « Résultat » (2 à 3 lignes chacun) ;
- navigation précédent / suivant entre projets sans fermer la modale ;
- deep-link : `/#projects/e-notes` ouvre directement la modale (utile pour partager un projet).

### 2.5 Formulaire de contact (M)
- Validation en temps réel (email valide, message trop court) avec message sous le champ.
- État de succès inline dans le formulaire (texte + icône) en plus du toast.
- Bouton désactivé tant que les champs ne sont pas valides.

### 2.6 Internationalisation FR / EN (L)
Un bouton FR / EN dans la navbar, avec les textes dans un fichier `src/i18n/fr.json` et `en.json`. Ouvre le portfolio aux recruteurs anglophones.

### 2.7 Section « Ce que je fais » (M)
Trois à quatre blocs courts : Développement web, Applications mobiles, UI/UX & design graphique, Déploiement. Chaque bloc avec une icône de ligne, un titre et deux phrases. Cela manque entre le Hero et « À propos » pour comprendre l'offre en cinq secondes.

### 2.8 Témoignages ou références (M)
Deux ou trois citations courtes (stages SunSoft, JIRAMA, enseignants ENI) en carrousel discret. Renforce fortement la crédibilité.

### 2.9 Statistiques GitHub en direct (M)
Nombre de dépôts, langages les plus utilisés, dernière activité, via l'API publique GitHub. À afficher dans les cartes stats de « À propos » ou dans une petite carte à part.

### 2.10 Page 404 et favicon adaptatif (S)
- Une page 404 dans le style du site (route inconnue).
- Favicon SVG qui suit le thème clair / sombre.

---

## 3. Animations et motion

Principe général : peu d'animations, mais toutes lentes, amorties et cohérentes. Une seule courbe d'easing partout : `cubic-bezier(0.16, 1, 0.3, 1)` (déjà utilisée dans Reveal et le Hero).

### 3.1 Généraliser `Reveal` (S)
Le composant `Reveal` (entrée et sortie directionnelles selon le sens du scroll) n'est utilisé que dans « À propos ». L'appliquer aux cartes de Compétences, Projets, Contact et au Footer, en remplacement des IntersectionObserver et classes `.visible` locales. Même comportement partout, moins de code.

### 3.2 Titres qui se dévoilent (S)
Pour chaque titre de section : les mots apparaissent l'un après l'autre (stagger de 40 ms) avec un léger mouvement vertical. Avec framer-motion : `staggerChildren` sur un conteneur, un `motion.span` par mot.

### 3.3 Parallaxe très douce (M)
- Photo du Hero : décalage de 20 à 30 px selon le scroll (`useScroll` + `useTransform`).
- Étiquettes flottantes : décalage inverse. Effet de profondeur sans être distrayant.

### 3.4 Curseur personnalisé « doux » (M)
Le site a déjà des curseurs `.cur`. Alternative moderne : un point orange de 8 px qui suit la souris avec un léger retard (spring), qui grandit en anneau au survol des liens et boutons. Désactivé sur mobile et si `prefers-reduced-motion`.

### 3.5 Jauges de compétences (S)
Ajouter au remplissage un compteur qui monte de 0 au pourcentage (comme les stats de « À propos »), et un léger dépassement puis retour (overshoot) à la fin du remplissage.

### 3.6 Slider de technologies (S)
- Ralentir légèrement (18 s → 30 s) et mettre en pause au survol, avec agrandissement de l'icône survolée.
- Logos en gris au repos, couleur au survol (`filter: grayscale(1)` → `grayscale(0)`) : calme la bande.

### 3.7 Grille au survol (NeonGridTrail) (S)
Réduire l'alpha initial (1 → 0.5) et allonger la durée d'extinction. L'effet reste, mais en fond, sans rivaliser avec le contenu. Le désactiver sous 768 px pour économiser la batterie.

### 3.8 Boutons (S)
- Un seul micro-mouvement au survol : `translateY(-2px)` et ombre un peu plus large. Retirer les `scale(1.05)` et rotations d'icônes.
- Au clic : `scale(0.97)` très bref.

### 3.9 Transition de thème (S)
Au basculement clair / sombre, animer aussi les couleurs des icônes et des bordures (`transition: color, background-color, border-color 0.4s`). Actuellement seuls fond et texte sont animés.

### 3.10 Transition d'entrée de page (M)
Au premier chargement : un voile de la couleur du fond qui se retire vers le haut en 0,6 s, puis le Hero s'anime. Donne une impression de « site fini ».

### 3.11 Respect des préférences (S)
Un bloc global `@media (prefers-reduced-motion: reduce)` qui désactive les animations continues (étincelles, shimmer, pulsations, slider). Déjà en place dans « À propos », à généraliser.

---

## 4. Performance et technique

### 4.1 Images (M)
- `nice.png`, `profile.png`, `profile_dark.png` et les couvertures de projets pèsent lourd (la photo de profil fait 1,7 Mo). Convertir en WebP et redimensionner (400 px suffisent pour la photo ronde, 900 px pour les couvertures).
- Ajouter `loading="lazy"` et `width` / `height` sur toutes les images hors Hero.

### 4.2 Polices (S)
Si une police Google est ajoutée : `preconnect` + `display=swap`, et ne charger que les graisses utilisées (400, 600, 700).

### 4.3 Code (M)
- Extraire les données (expériences, formations, projets, compétences) dans `src/data/*.js` : les composants ne contiennent plus que la présentation.
- Supprimer `App.test.js` / `setupTests.js` s'ils ne sont pas utilisés, ou écrire un test de rendu par section.
- Envisager la migration de Create React App vers **Vite** : démarrage en une seconde, build trois fois plus rapide. Effort L mais gain quotidien.

### 4.4 Déploiement (S)
- Vérifier `homepage` dans `package.json` pour l'hébergement (Vercel, Netlify, GitHub Pages).
- Ajouter un `robots.txt` et un `sitemap.xml` minimal.

---

## 5. Accessibilité et SEO

### 5.1 Métadonnées (S)
Dans `public/index.html` : `description` réelle (actuellement le texte par défaut de CRA), balises Open Graph (`og:title`, `og:description`, `og:image`) pour un bel aperçu sur LinkedIn et WhatsApp.

### 5.2 Structure (S)
- Un seul `h1` (le Hero), puis `h2` par section, `h3` dans les cartes.
- `aria-label` sur les boutons icône (thème, burger, fermeture de modale : déjà fait pour la modale).
- Focus visible : un contour orange de 2 px sur `:focus-visible` pour tous les liens et boutons.

### 5.3 Contrastes (S)
Le gris secondaire `#8A8A8A` sur fond `#F0F0F0` est limite (3,2:1). Utiliser `#6E6E6E` pour les textes de plus de 14 px en mode clair.

---

## 6. Ordre de réalisation conseillé

| Priorité | Proposition | Effort | Impact | État |
|---|---|---|---|---|
| 1 | Navigation active + barre de progression (2.1, 2.2) | S | Fort | Réalisé le 20/09/2026 |
| 2 | Généraliser Reveal + easing unique (3.1) | S | Fort | Réalisé le 20/09/2026 |
| 3 | Téléchargement du CV + métadonnées OG (2.3, 5.1) | S | Fort | Réalisé le 20/09/2026 |
| 4 | Images WebP + lazy loading (4.1) | M | Fort | Réalisé le 20/09/2026 |
| 5 | Uniformiser rayons, ombres, espacements (1.2, 1.4) | S | Moyen | Réalisé le 20/09/2026 |
| 6 | Typographie des titres (1.1) | M | Moyen | Réalisé le 20/09/2026 |
| 7 | Section « Ce que je fais » (2.7) | M | Fort | Réalisé le 20/09/2026 |
| 8 | Filtres projets + deep-link modale (1.6, 2.4) | M | Moyen | Réalisé le 20/09/2026 |
| 9 | Parallaxe douce + titres mot à mot (3.2, 3.3) | M | Moyen | Réalisé le 20/09/2026 |
| 10 | FR / EN (2.6) | L | Fort selon cible | Réalisé le 20/09/2026 |

Les dix lignes ci-dessus ont été réalisées le 20 septembre 2026. Restent à faire, dans l’ordre conseillé : la validation du formulaire en temps réel (2.5), les témoignages (2.8), les statistiques GitHub (2.9), la page 404 (2.10), le curseur amorti (3.4), la transition d’entrée de page (3.10) et la migration vers Vite (4.3).
