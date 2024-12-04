import React from "react";
import { motion } from "framer-motion";
import styles from "../assets/styles/contactMeStyles";
import { Box, Button, Grid, TextField } from "@mui/material";

const slideInFromRightVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const ContactUsForm = () => {
  return (
    <Grid style={styles.contentBox}>
      {/* Name Fields */}
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={slideInFromRightVariant}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      {/* Email Field */}
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={slideInFromRightVariant}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      {/* Description Field */}
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={slideInFromRightVariant}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      {/* Submit Button */}
      <motion.div
        whileInView="visible"
        initial="hidden"
        variants={slideInFromRightVariant}
        transition={{ duration: 0.5 }}
      >
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" sx={styles.sendButton}>
            Send Message
          </Button>
        </Grid>
      </motion.div>
    </Grid>
  );
};

export default ContactUsForm;
