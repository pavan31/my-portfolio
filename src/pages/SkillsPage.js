import React from "react";
import styles from "../assets/styles/AboutMePageStyles";
import { Grid, Typography } from "@mui/material";
import SkillsGridComponent from "../components/SkillsGridComponent";

const AboutMePage = () => {
  return (
    <div style={styles.container}>
      <Typography style={styles.title}>MY SKILLS</Typography>
      <Grid style={styles.subContainer} xs={12}>
        <SkillsGridComponent />
      </Grid>
    </div>
  );
};

export default AboutMePage;
