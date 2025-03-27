import React from "react";
import { motion } from "framer-motion";
import styles from "../assets/styles/contactMeStyles";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Grid, Typography, Button } from "@mui/material";
import resume from "../assets/files/Pavan-Resume.pdf";

const slideInVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const ContactInfoComponent = () => {

  const handleDownload = () => {
    // Trigger a toast notification
    // toast.success("Your download has started!");

    // Create a link to download the PDF
    const link = document.createElement("a");
    link.href = resume; // Use the imported file
    link.download = "Pavan-Resume.pdf"; // File name for the downloaded file
    link.click();
  };

  return (
    <Grid style={styles.contentBox}>
      {/* Phone Section */}
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={slideInVariant}
        transition={{ duration: 0.5 }}
      >
        <Grid item xs={12} sx={styles.row}>
          <Box sx={styles.rowContainer}>
            <PhoneAndroidIcon sx={styles.icon} />
            <Typography variant="body1" sx={styles.text}>
              +91 9790564056
            </Typography>
          </Box>
        </Grid>
      </motion.div>

      {/* Email Section */}
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={slideInVariant}
        transition={{ duration: 0.5 }}
      >
        <Grid item xs={12} sx={styles.row}>
          <Box sx={styles.rowContainer}>
            <EmailIcon sx={styles.icon} />
            <Typography variant="body1" sx={styles.text}>
              poluparthipavanseshukumar@gmail.com
            </Typography>
          </Box>
        </Grid>
      </motion.div>

      {/* LinkedIn Section */}
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={slideInVariant}
        transition={{ duration: 0.5 }}
      >
        <Grid item xs={12} sx={styles.row}>
          <Box sx={styles.rowContainer}>
            <LinkedInIcon sx={styles.icon} />
            <Typography
              variant="body1"
              sx={{ ...styles.text, cursor: "pointer" }}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/pavan-seshu-kumar",
                  "_blank"
                )
              }
            >
              https://www.linkedin.com/in/pavan-seshu-kumar
            </Typography>
          </Box>
        </Grid>
      </motion.div>

      {/* Button Section */}
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={slideInVariant}
        transition={{ duration: 0.5 }}
      >
        <Grid item xs={12} sx={styles.row}>
          <Button variant="outlined" sx={styles.button} onClick={handleDownload}>
            Download Resume
          </Button>
        </Grid>
      </motion.div>
    </Grid>
  );
};

export default ContactInfoComponent;
