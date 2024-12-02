import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/images/logo.png";
import headerStyles from "../assets/styles/headerStyles"; // Importing the stylesheet

const HeaderComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <>
      <AppBar position="static" sx={headerStyles.appBar}>
        <Toolbar sx={headerStyles.toolbar}>
          {/* Logo */}
          <img src={Logo} style={headerStyles.logo} alt="logo" />

          {/* Hamburger Menu */}
          <IconButton
            color="inherit"
            onClick={toggleModal}
            style={headerStyles.menuIcon}
          >
            <MenuIcon style={headerStyles.menuIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            style={headerStyles.modal}
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
              <CloseIcon style={headerStyles.closeIcon} />
            </IconButton>
            <Box sx={headerStyles.box}>
              {["Home", "About", "Portfolio", "Contact"].map((item, index) => (
                <Typography
                  key={index}
                  variant="h3"
                  sx={headerStyles.menuItem}
                  onClick={toggleModal}
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
