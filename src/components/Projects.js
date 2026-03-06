import React, { useState } from "react";
import "../css/Projects.css";

const modalBtnStyle = {
  padding: "8px 15px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#a020f0",
  color: "#fff",
  fontSize: "1rem",
};

// Modal vidéo
const ProjectVideoModal = ({ videoSrc, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    onClick={onClose}
  >
    <video
      src={videoSrc}
      controls
      autoPlay
      style={{ maxWidth: "90%", maxHeight: "80%", borderRadius: "12px" }}
      onClick={(e) => e.stopPropagation()}
    />
  </div>
);

// Modal images
const ProjectImagesModal = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <img
        src={images[currentIndex]}
        alt="project"
        style={{ maxWidth: "90%", maxHeight: "80%", borderRadius: "12px" }}
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <div style={{ marginTop: "15px", display: "flex", gap: "20px" }}>
          <button onClick={prevImage} style={modalBtnStyle}>
            ◀
          </button>
          <button onClick={nextImage} style={modalBtnStyle}>
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [modalVideo, setModalVideo] = useState(null);
  const [modalImages, setModalImages] = useState(null);

  const projects = [
    {
      id: 1,
      categories: ["Web"],
      title: "E-congé : Application de gestion des absences",
      description:
        "Application web permettant la gestion des employés et des congés.",
      tags: ["PHP", "MySQL", "Gestion RH"],
      github: "https://github.com/Tommy-ZzZ/Gestion-des-employ-et-cong-personnel",
      image: "/e-conge/1.png",
      images: ["/e-conge/1.png", "/e-conge/2.png", "/e-conge/3.png", "/e-conge/4.png", "/e-conge/5.png"],
      video: "/e-conge/demo.mp4",
    },
    {
      id: 2,
      categories: ["Web", "Mobile"],
      title: "E-Pharma : Application de gestion pharmaceutique",
      description:
        "Application web et mobile développée avec React, React Native et PostgreSQL.",
      tags: ["React", "React Native", "PostgreSQL"],
      github: "https://github.com/Tommy-ZzZ/Mon-projet-Pharma",
      image: "/pharma/1.png",
      images: ["/pharma/1.png", "/pharma/2.png", "/pharma/3.png", "/pharma/11.png"],
      video: "/pharma/pharma.mp4",
    },
    {
      id: 3,
      categories: ["Web"],
      title: "E-Notes : Gestion des Notes",
      description: "Site web moderne et responsive conçu avec React.",
      tags: ["React", "CSS", "Responsive"],
      github: "https://github.com/Tommy-ZzZ/Gestion-notes",
      image: "/notes/1.png",
      images: ["/notes/1.png", "/notes/2.png", "/notes/3.png", "/notes/4.png"],
      video: "/notes/note.mp4",
      demo: "#",
    },
  ];

  return (
    <section className="projects">
      <h2>
        Mes <span>Projets</span>
      </h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="card-header">
              <span className="badge">{project.categories.join(" / ")}</span>
              <img
                src={project.image}
                alt={project.title}
                style={{ cursor: project.images ? "pointer" : "default" }}
                onClick={() => project.images && setModalImages(project.images)}
              />
            </div>

            <div className="card-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {project.video && (
                <button className="demo-btn" onClick={() => setModalVideo(project.video)}>
                  🎯 Démo en Vidéo
                </button>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo-btn"
                  style={{ marginLeft: "10px", background: "#444" }}
                >
                  💻 GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalVideo && <ProjectVideoModal videoSrc={modalVideo} onClose={() => setModalVideo(null)} />}
      {modalImages && <ProjectImagesModal images={modalImages} onClose={() => setModalImages(null)} />}
    </section>
  );
};

export default Projects;