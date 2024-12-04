import React from "react";
import { motion } from "framer-motion";
import styles from "../assets/styles/AboutMePageStyles";
import { Typography } from "@mui/material";

const AboutComponent = () => {
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={textVariant}
        transition={{ duration: 0.5 }}
      >
        <Typography style={styles.subTitle}>who I am, what I do</Typography>
      </motion.div>

      {[
        "I am a Software Development Engineer with a strong foundation in front-end technologies like React.js, React Native, and Angular, complemented by proficiency in back-end frameworks like Node.js and Express.js. My journey in software development has been driven by my love for solving complex problems and delivering impactful digital solutions.",
        "Currently, I focus on creating reusable components, developing APIs, and ensuring web applications are responsive across devices. I thrive in collaborative environments, working closely with cross-functional teams to bring innovative ideas to life.",
        "Beyond coding, I have a proven track record of managing projects, mentoring team members, and contributing to every stage of the development lifecycle from planning and designing to deployment and maintenance.",
      ].map((text, index) => (
        <motion.div
          key={index}
          whileInView="visible"
          initial="hidden"
          transition={{ duration: 0.5, delay: index * 0.3 }}
          variants={textVariant}
        >
          <Typography style={styles.aboutText}>{text}</Typography>
        </motion.div>
      ))}
    </>
  );
};

export default AboutComponent;
