import React from "react";
import styles from "../assets/styles/contactMeStyles";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Button, Grid, Typography } from "@mui/material";

const ContactInfoComponent = () => {
  return (
    <Grid style={styles.contentBox}>
      <Grid item xs={12} sx={styles.row}>
        <Box sx={styles.rowContainer}>
          <PhoneAndroidIcon sx={styles.icon} />
          <Typography variant="body1" sx={styles.text}>
            +91 9790564056
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sx={styles.row}>
        <Box sx={styles.rowContainer}>
          <EmailIcon sx={styles.icon} />
          <Typography variant="body1" sx={styles.text}>
            poluparthipavanseshukumar@gmail.com
          </Typography>
        </Box>
      </Grid>

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

      <Grid item xs={12} sx={styles.row}>
        <Button
          variant="outlined"
          sx={styles.button}
          // onClick={() => window.open("", "_blank")}
        >
          Download Resume
        </Button>
      </Grid>
    </Grid>
  );
};

export default ContactInfoComponent;
