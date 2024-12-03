import { Box, Grid, Typography } from "@mui/material";
import styles from "../assets/styles/contactMeStyles";
import React from "react";
import ContactUsForm from "../components/ContactUsForm";
import ContactInfoComponent from "../components/ContactInfoComponent";
const ContactUsPage = () => {
  return (
    <Box sx={styles.container}>
      <Typography style={styles.title}>Contact Me</Typography>
      <Grid
        style={{
          ...styles.contactInfoContainer,
        }}
        container
      >
        <Grid style={styles.subContainer} sm={12} md={12} lg={6} xl={6}>
          <ContactInfoComponent />
        </Grid>
        <Grid style={styles.subContainer} sm={12} md={12} lg={6} xl={6}>
          <ContactUsForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUsPage;
