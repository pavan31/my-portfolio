import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/images/logo.png";
import styles from "../assets/styles/headerStyles"; // Importing the stylesheet
import { useNavigate } from "react-router-dom";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          {/* Logo */}
          <img src={Logo} style={styles.logo} alt="logo" />

          {/* Hamburger Menu */}
          <IconButton
            color="inherit"
            onClick={toggleModal}
            style={styles.menuIcon}
          >
            <MenuIcon style={styles.menuIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            style={styles.modal}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.7, ease: "circInOut" }}
          >
            <IconButton
              onClick={toggleModal}
              sx={{
                position: "absolute",
                top: 0,
                right: 16,
                color: "white",
                zIndex: 10,
              }}
            >
              <CloseIcon style={styles.closeIcon} />
            </IconButton>
            <Box sx={styles.box}>
              {["Home", "About", "Portfolio", "Contact"].map((item, index) => (
                <Typography
                  key={index}
                  variant="h3"
                  sx={styles.menuItem}
                  onClick={() => {
                    navigate(`/${item}`);
                    toggleModal();
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderComponent;
