import React from "react";
import "../css/About.css";

export default function About() {
  return (
    <div className="about-container" id="about">
      <div className="about-text">
        <h2>À propos de <span>moi</span></h2>
        <p>
          Développeur passionné en apprentissage, j'ai découvert ma vocation
          dans le monde du code il y a quelques années. Actuellement en
          formation intensive dans les technologies  <b>JS</b>, je
          développe mes compétences jour après jour pour créer des solutions
          digitales modernes.
        </p>
        <p>
          Mon approche se base sur l'apprentissage continu et la pratique
          régulière. Chaque projet est une opportunité d'apprendre quelque chose
          de nouveau et d'améliorer mes compétences techniques et créatives.
        </p>
        <p>
          Basé à <b>Madagascar</b>, je suis ouvert aux opportunités de
          collaboration et aux projets qui me permettront de grandir en tant que
          développeur.
        </p>
      </div>

      <div className="stats">
        <div><h3>6+</h3><p>Projets personnels</p></div>
        <div><h3>4</h3><p>Apps en développement</p></div>
        <div><h3>+5</h3><p>Langage maîtrisés</p></div>
        <div><h3>100%</h3><p>Motivation</p></div>
      </div>
    </div>
  );
}
