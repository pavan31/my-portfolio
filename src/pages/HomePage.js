import React, { useEffect, useState } from "react";
import ContactUsPage from "./ContactUsPage";
import styles from "../assets/styles/HomePageStyles";
import SkillsPage from "./SkillsPage";
import ProjectsComponent from "../components/ProjectsComponent";
import HeroSection from "../components/HeroSetion";
import AboutMe from "../components/AboutComponent";
import HeaderComponent from "../components/HeaderComponent";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const offset = 80; // Adjust this value based on header height

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      let currentSection = "hero";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 - offset && rect.bottom >= window.innerHeight / 2 - offset) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const topOffset = section.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };
  
  return (
    <div style={styles.container}>
      <HeaderComponent activeSection={activeSection} scrollToSection={scrollToSection} />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutMe />
      </div>
      <div id="skills">
        <SkillsPage />
      </div>
      <div id="projects">
        <ProjectsComponent />
      </div>
      <div id="contact">
        <ContactUsPage />
      </div>
    </div>
  );
};

export default HomePage;