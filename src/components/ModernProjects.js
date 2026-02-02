import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import "./ModernProjects.css";

const ModernProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "AMC LADDER",
      category: "Web Platform",
      description:
        "Comprehensive medical exam preparation platform built with Next.js. Features practice tests, detailed explanations, personalized study plans, and smart analytics for AMC CAT exam preparation.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      image: "/api/placeholder/400/300",
      link: "https://www.amcladder.com/",
      github: null,
      featured: true,
    },
    {
      id: 2,
      title: "HAPPILY HEALTH",
      category: "Mobile App",
      description:
        "Health and wellness mobile app built with React Native. Managed a team of 4 cross-functional members, focusing on front-end functionality and user experience.",
      technologies: ["React Native", "JavaScript", "Health APIs"],
      image: "/api/placeholder/400/300",
      link: "https://play.google.com/store/apps/details?id=com.sunpooh.Health&hl=en",
      github: null,
      featured: true,
    },
    {
      id: 3,
      title: "CREDR",
      category: "Web Platform",
      description:
        "Application to buy & sell used bikes & scooters. Elevated platform stability and functionality by resolving production bugs and integrating new URLs.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/api/placeholder/400/300",
      link: "https://www.credr.com",
      github: null,
      featured: false,
    },
    {
      id: 4,
      title: "MYCLNQ",
      category: "Healthcare App",
      description:
        "App for taking care of family healthcare needs. Developed clinic locator and online appointment booking system with user-friendly interface.",
      technologies: ["React Native", "Location Services", "Booking System"],
      image: "/api/placeholder/400/300",
      link: "https://play.google.com/store/search?q=myclnq&c=apps&hl=en",
      github: null,
      featured: false,
    },
    {
      id: 5,
      title: "ACCELECOM SERVICES",
      category: "Backend System",
      description:
        "Backend development for syncing actions between disparate applications using Spring Boot framework with RESTful APIs.",
      technologies: ["Spring Boot", "Java", "REST APIs"],
      image: "/api/placeholder/400/300",
      link: null,
      github: null,
      featured: false,
    },
    {
      id: 6,
      title: "BODY BEAT",
      category: "Fitness App",
      description:
        "Vital tracker mobile app that integrates health and fitness data from various sources like wearables and devices.",
      technologies: ["React Native", "Health APIs", "Data Integration"],
      image: "/api/placeholder/400/300",
      link: null,
      github: null,
      featured: false,
    },
    {
      id: 7,
      title: "OCEANEERING",
      category: "Enterprise System",
      description:
        "Backend development for subsea engineering company. Worked with external APIs, MongoDB, and developed GraphQL APIs.",
      technologies: ["GraphQL", "MongoDB", "Node.js"],
      image: "/api/placeholder/400/300",
      link: null,
      github: null,
      featured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.15, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="modern-projects" id="projects">
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-number">03</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Selected work and technical contributions
          </p>
        </motion.div>

        {/* Projects List */}
        <motion.div className="projects-list" variants={itemVariants}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-item"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.05 }}
            >
              <div className="project-header">
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="project-title-line">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
              </div>

              <div className="project-content">
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <span className="project-link-text">View Project</span>
                    <HiExternalLink />
                  </a>
                ) : (
                  <span className="project-no-link">Private Project</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModernProjects;
