import React from "react";
import styles from "../assets/styles/ErrorPageStyles";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box style={styles.container}>
      <Typography style={styles.title}>404</Typography>
      <Typography style={styles.text}>"Lost in the digital void!"</Typography>
      <Typography style={styles.desc}>
        "Looks like you’ve wandered off the beaten path. Let’s get you back to
        safety!"
      </Typography>
      <Grid item xs={12} sx={styles.row}>
        <Button
          variant="outlined"
          sx={styles.button}
          onClick={() => navigate("/")}
        >
          Go To Profile
        </Button>
      </Grid>
    </Box>
  );
};

export default ErrorPage;
