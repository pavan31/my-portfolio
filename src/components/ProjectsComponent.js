import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";

const ProjectsComponent = () => {
  const projects = [
    {
      title: "Project 1",
      description:
        "A web application built with React.js that allows users to manage tasks.",
      imageUrl: "https://via.placeholder.com/350x200", // Replace with your project image
      link: "https://example.com/project-1",
    },
    {
      title: "Project 2",
      description:
        "A mobile app built with React Native, designed for managing personal finance.",
      imageUrl: "https://via.placeholder.com/350x200", // Replace with your project image
      link: "https://example.com/project-2",
    },
    {
      title: "Project 3",
      description:
        "A back-end API built with Node.js and Express, serving data for various front-end applications.",
      imageUrl: "https://via.placeholder.com/350x200", // Replace with your project image
      link: "https://example.com/project-3",
    },
  ];

  // Animation variant for card appearance
  const cardVariant = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const cardStyles = {
    maxWidth: 345,
    margin: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const cardImageStyles = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px 8px 0 0",
  };

  const cardContentStyles = {
    padding: "16px",
  };

  const buttonStyles = {
    marginTop: "10px",
  };

  return (
    <Box style={{ padding: "40px 20px" }} id="projects">
      <Typography variant="h3" align="center" gutterBottom>
        My Projects
      </Typography>
      <Grid container justifyContent="center" spacing={3}>
        {projects.map((project, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: index * 0.2 }}
              variants={cardVariant}
            >
              <Card style={cardStyles}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  style={cardImageStyles}
                />
                <CardContent style={cardContentStyles}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {project.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={project.link}
                    target="_blank"
                    style={buttonStyles}
                  >
                    View Project
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectsComponent;
