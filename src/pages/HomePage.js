import React from "react";
import ContactUsPage from "./ContactUsPage";
import styles from "../assets/styles/HomePageStyles";
// import AboutMePage from "./AboutMePage";
import SkillsPage from "./SkillsPage";
import ProjectsComponent from "../components/ProjectsComponent";

const HomePage = () => {
  return (
    <div style={styles.container}>
      {/* <AboutMePage /> */}
      <SkillsPage />
      <ProjectsComponent />
      <ContactUsPage />
    </div>
  );
};

export default HomePage;
