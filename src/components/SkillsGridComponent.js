import React from "react";
import { motion } from "framer-motion";
import styles from "../assets/styles/AboutMePageStyles";

const getGridTemplateColumns = (width) => {
  if (width <= 768) return "repeat(2, 1fr)"; // Mobile
  if (width <= 1024) return "repeat(3, 1fr)"; // Tablet
  return "repeat(auto-fit, minmax(150px, 1fr))"; // Desktop
};

const skillsStyles = {
  container: (width) => ({
    display: "grid",
    gridTemplateColumns: getGridTemplateColumns(width),
    gap: "20px",
    width: "100%",
  }),
};

const skills = [
  { name: "React.js", icon: "fab fa-react" },
  { name: "React Native", icon: "fab fa-react" },
  { name: "Tailwind CSS", icon: "fas fa-wind" },
  { name: "Material UI", icon: "fas fa-palette" },
  { name: "Next.js", icon: "fas fa-layer-group" },
  { name: "Angular", icon: "fab fa-angular" },
  { name: "Redux", icon: "fas fa-exchange-alt" },
  { name: "Bootstrap", icon: "fab fa-bootstrap" },
  { name: "HTML", icon: "fab fa-html5" },
  { name: "CSS", icon: "fab fa-css3-alt" },
  { name: "JavaScript", icon: "fab fa-js" },
  { name: "Node.js", icon: "fab fa-node-js" },
  { name: "MongoDB", icon: "fas fa-database" },
  { name: "Express.js", icon: "fas fa-server" },
  { name: "Spring Boot", icon: "fas fa-leaf" },
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "Postman", icon: "fas fa-envelope" },
  { name: "Agile", icon: "fas fa-tasks" },
  { name: "Responsive Design", icon: "fas fa-mobile-alt" },
  { name: "RESTful APIs", icon: "fas fa-cloud" },
];

const SkillsGridComponent = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={skillsStyles.container(windowWidth)}>
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          style={styles.card}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <i className={skill.icon} style={styles.icon} />
          <p style={styles.text}>{skill.name}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsGridComponent;
