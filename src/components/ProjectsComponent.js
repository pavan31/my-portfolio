import React, { useState, useEffect } from "react";
import styles from "../assets/styles/ProjectStyles";
import { Typography } from "@mui/material";

const projects = [
  { id: 1, title: "Project 1", description: "Details about Project 1" },
  { id: 2, title: "Project 2", description: "Details about Project 2" },
  { id: 3, title: "Project 3", description: "Details about Project 3" },
  { id: 4, title: "Project 4", description: "Details about Project 4" },
  { id: 5, title: "Project 5", description: "Details about Project 5" },
  { id: 6, title: "Project 6", description: "Details about Project 6" },
];

const ProjectGrid = () => {
  const [flipped, setFlipped] = useState(Array(projects.length).fill(false));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getGridTemplateColumns = () => {
    if (windowWidth >= 1024) return "repeat(3, 1fr)";
    if (windowWidth >= 768) return "repeat(2, 1fr)";
    return "repeat(1, 1fr)";
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: getGridTemplateColumns(),
    width: "100%",
    padding: 32,
    perspective: "1000px",
    boxSizing: "border-box",
  };

  return (
    <div>
      <Typography style={styles.title}>My Projects</Typography>
      <div style={gridContainerStyle}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            style={styles.cardContainer}
            onMouseEnter={() =>
              setFlipped((prev) => {
                const newFlipState = [...prev];
                newFlipState[index] = true;
                return newFlipState;
              })
            }
            onMouseLeave={() =>
              setFlipped((prev) => {
                const newFlipState = [...prev];
                newFlipState[index] = false;
                return newFlipState;
              })
            }
          >
            <div
              style={{
                ...styles.card,
                transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div style={styles.cardFront}>
                <div style={styles.numberText}>
                  {String(project.id).padStart(2, "0")}
                </div>
              </div>
              <div style={styles.cardBack}>{project.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
