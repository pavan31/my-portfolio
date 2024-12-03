import React from "react";
import styles from "../assets/styles/contactMeStyles";
import { Box, Button, Grid, TextField } from "@mui/material";

const ContactUsForm = () => {
  return (
    <Grid style={styles.contentBox}>
      <Grid item xs={12} sx={styles.row}>
        <Box sx={styles.rowContainer}>
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            InputLabelProps={{ style: styles.inputLabel }}
            InputProps={{
              style: styles.inputText,
            }}
            sx={styles.inputField}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            InputLabelProps={{ style: styles.inputLabel }}
            InputProps={{
              style: styles.inputText,
            }}
            sx={styles.inputField}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sx={styles.row}>
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          InputLabelProps={{ style: styles.inputLabel }}
          InputProps={{
            style: styles.inputText,
          }}
          sx={styles.inputField}
        />
      </Grid>
      <Grid item xs={12} sx={styles.row}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Description"
          InputLabelProps={{ style: styles.inputLabel }}
          InputProps={{
            style: styles.inputText,
          }}
          sx={styles.inputField}
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="outlined" sx={styles.sendButton}>
          Send Message
        </Button>
      </Grid>
    </Grid>
  );
};

export default ContactUsForm;
