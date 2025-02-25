import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { styles } from "../assets/styles/HeroStyles";

const HeroSection = () => {
  const portalRef = useRef(null);
  const controls = useAnimation();
  const textControls = useAnimation();
  const welcomeControls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scaleValue = 1 + scrollY * 0.006;
      const opacityValue = scaleValue > 3 ? 0 : 1;

      controls.start({
        scale: scaleValue > 4 ? 4 : scaleValue,
        opacity: opacityValue,
        filter: `blur(${Math.min(scrollY * 0.015, 8)}px)`,
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      if (scrollY > 200) {
        welcomeControls.start({
          opacity: 0,
          transition: { duration: 0.7, ease: "easeInOut" },
        });
        textControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 1.2, ease: "easeInOut" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, textControls, welcomeControls]);

  return (
    <div style={styles.heroContainer}>
      <motion.div
        ref={portalRef}
        style={{ ...styles.portal, background: "rgba(255, 255, 255, 0.1)" }}
        animate={controls}
        initial={{ scale: 1, opacity: 1 }}
      />

      <motion.h1
        style={styles.welcomeText}
        initial={{ opacity: 1 }}
        animate={welcomeControls}
      >
        Welcome to my portfolio
      </motion.h1>

      <motion.div
        style={styles.textContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={textControls}
      >
        <h1 style={styles.heroTitle}>Hi, I'm Pavan Seshu Kumar</h1>
        <p style={styles.heroSubtitle}>
          Full-Stack Developer | Crafting Scalable Solutions
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
