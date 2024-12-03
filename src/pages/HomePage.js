import React from "react";
import ContactUsPage from "./ContactUsPage";
import styles from "../assets/styles/HomePageStyles";
import AboutMePage from "./AboutMePage";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <AboutMePage />
      <ContactUsPage />
    </div>
  );
};

export default HomePage;
