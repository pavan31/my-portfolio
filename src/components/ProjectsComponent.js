import React, { useState, useEffect } from "react";
import styles from "../assets/styles/ProjectStyles";
import { Typography } from "@mui/material";

const projects = [
  {
    id: 1,
    title: "HAPPILY HEALTH - Health and Wellness Mobile App",
    description:
      "Managed a team of 4 cross-functional members in creating a cross-platform health and wellness app using React Native, focusing on front-end functionality and user experience. Collaborated with design and development teams to deliver a user-friendly, visually appealing, and easy-to-navigate app that received positive user feedback.",
    link: "https://play.google.com/store/apps/details?id=com.sunpooh.Health&hl=en",
  },
  {
    id: 2,
    title: "CREDR - Application to Buy & Sell Used Bikes & Scooters",
    description:
      "Elevated platform stability and functionality by resolving production bugs and integrating new URLs into the frontend environment. Led the development of a new internal tool feature, collaborating closely with backend counterparts for seamless API integration. Actively engaged in project meetings to identify and tackle emerging challenges.",
    link: "https://www.credr.com",
  },
  {
    id: 3,
    title: "MYCLNQ - App for Taking Care of Family Healthcare Needs",
    description:
      "Developed a feature to locate the nearest clinics quickly and efficiently. Implemented an online appointment booking system to save time and reduce waiting periods. Designed a user-friendly interface to help users discover top doctors and healthcare services.",
    link: "https://play.google.com/store/search?q=myclnq&c=apps&hl=en",
  },
  {
    id: 4,
    title: "ACCELECOM SERVICES - Backend Development for Syncing Actions",
    description:
      "Designed and implemented task synchronization functionality between disparate applications using the Spring Boot framework. Utilized RESTful APIs and data mapping techniques to ensure efficient and reliable data transfer.",
  },
  {
    id: 5,
    title: "BODY BEAT - Vital Tracker Mobile App",
    description:
      "Led the front-end development of an app that integrates and tracks health and fitness data from various sources, such as wearables and other devices, to provide users with a comprehensive overview of their health status. This allowed users to easily monitor and manage their health, making it a more user-friendly and efficient experience.",
  },
  {
    id: 6,
    title: "OCEANEERING - Backend Development for a Subsea Engineering Company",
    description:
      "As a backend team member, worked with external APIs and MongoDB and developed new GraphQL APIs to provide clients with data access. The project aimed to create a cutting-edge system for cargo owners to have better visibility and understanding of maritime operations.",
  },
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
              <div style={styles.cardBack}>
                <div style={styles.cardContent}>
                  <Typography style={styles.cardTitle}>
                    {project.title}
                  </Typography>
                  <Typography style={styles.cardDescription}>
                    {project.description}
                  </Typography>
                  {project.link && (
                    <a
                      href={project.link}
                      style={styles.cardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"Visit Site"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
