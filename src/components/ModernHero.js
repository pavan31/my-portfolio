import React, { useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiDownload } from "react-icons/hi";
import "./ModernHero.css";

const ModernHero = () => {
  const heroRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.15, ease: "easeOut" },
    },
  };

  const handleDownloadResume = () => {
    // Create a link element to trigger download
    const link = document.createElement("a");
    link.href = "/Pavan-Seshu-Kumar-Resume-v10.pdf";
    link.download = "Pavan-Seshu-Kumar-Resume-v10.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={heroRef} className="modern-hero" id="hero">
      {/* Main Content */}
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-content" variants={itemVariants}>
          {/* Greeting */}
          <motion.div className="hero-greeting" variants={itemVariants}>
            <span className="greeting-text">Hello, I'm</span>
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero-name" variants={itemVariants}>
            <span className="name-text">Pavan Seshu Kumar</span>
          </motion.h1>

          {/* Title Animation */}
          <motion.div className="hero-title" variants={itemVariants}>
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "React Specialist",
                2000,
                "Mobile App Developer",
                2000,
                "Problem Solver",
                2000,
                "Innovation Enthusiast",
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="title-text"
              repeat={Infinity}
            />
          </motion.div>

          {/* Description */}
          <motion.p className="hero-description" variants={itemVariants}>
            I craft exceptional digital experiences through clean code,
            innovative solutions, and a passion for turning ideas into reality.
            Let's build something amazing together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <motion.button
              className="btn btn-primary btn-lg"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.button>

            <motion.button
              className="btn btn-secondary btn-lg"
              onClick={handleDownloadResume}
              whileTap={{ scale: 0.98 }}
            >
              <HiDownload />
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModernHero;
