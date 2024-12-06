import React from "react";
import ContactUsPage from "./ContactUsPage";
import styles from "../assets/styles/HomePageStyles";
import AboutMePage from "./AboutMePage";
import ProjectsComponent from "../components/ProjectsComponent";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <AboutMePage />
      {/* <ProjectsComponent /> */}
      <ContactUsPage />
    </div>
  );
};

export default HomePage;
