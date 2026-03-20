import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
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
  </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        loading="lazy"
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
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [modalVideo, setModalVideo] = useState(null);
  const [modalImages, setModalImages] = useState(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section className="projects">
      <h2>
        Mes <span>Projets</span>
      </h2>

      <motion.div
        className="projects-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card-header">
                <span className="badge">{project.categories.join(" / ")}</span>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ cursor: project.images ? "pointer" : "default" }}
                  onClick={() =>
                    project.images && setModalImages(project.images)
                  }
                  loading="lazy"
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
                  <button
                    className="demo-btn"
                    onClick={() => setModalVideo(project.video)}
                  >
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
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {modalVideo && (
          <ProjectVideoModal
            videoSrc={modalVideo}
            onClose={() => setModalVideo(null)}
          />
        )}
        {modalImages && (
          <ProjectImagesModal
            images={modalImages}
            onClose={() => setModalImages(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;