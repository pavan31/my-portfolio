import React from "react";
import ContactUsPage from "./ContactUsPage";
import styles from "../assets/styles/HomePageStyles";
import SkillsPage from "./SkillsPage";
import ProjectsComponent from "../components/ProjectsComponent";
import HeroSection from "../components/HeroSetion";
import AboutMe from "../components/AboutComponent";
import HeaderComponent from "../components/HeaderComponent";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <HeaderComponent />
      <HeroSection />
      <AboutMe />
      <SkillsPage />
      <ProjectsComponent />
      <ContactUsPage />
    </div>
  );
};

export default HomePage;
