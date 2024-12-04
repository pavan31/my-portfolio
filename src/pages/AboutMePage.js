import React from "react";
import styles from "../assets/styles/AboutMePageStyles";
import { Grid, Typography } from "@mui/material";
import SkillsGridComponent from "../components/SkillsGridComponent";
import AboutComponent from "../components/AboutComponent";

const AboutMePage = () => {
  return (
    <div style={styles.container}>
      <Typography style={styles.title}>About Me</Typography>
      <div style={styles.descContainer}>
        <Typography style={styles.descText}>
          Here, you can learn more about me, what I do, and my current skills,
          primarily focused on programming and technology.
        </Typography>
      </div>
      <Grid
        style={{
          ...styles.contactInfoContainer,
        }}
        container
      >
        <Grid style={styles.subContainer} xs={12} md={6}>
          <AboutComponent />
        </Grid>
        <Grid style={styles.subContainer} xs={12} md={6}>
          <SkillsGridComponent />
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutMePage;
