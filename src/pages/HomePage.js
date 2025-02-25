import React from "react";
import ContactUsPage from "./ContactUsPage";
import styles from "../assets/styles/HomePageStyles";
import SkillsPage from "./SkillsPage";
import ProjectsComponent from "../components/ProjectsComponent";
import HeroSection from "../components/HeroSetion";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <HeroSection />
      <SkillsPage />
      <ProjectsComponent />
      <ContactUsPage />
    </div>
  );
};

export default HomePage;
