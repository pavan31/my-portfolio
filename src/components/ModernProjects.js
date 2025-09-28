import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiExternalLink, HiCode, HiDeviceMobile, HiServer } from 'react-icons/hi';
import './ModernProjects.css';

const ModernProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'AMC LADDER',
      category: 'Web Platform',
      description: 'Comprehensive medical exam preparation platform built with Next.js. Features practice tests, detailed explanations, personalized study plans, and smart analytics for AMC CAT exam preparation.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      image: '/api/placeholder/400/300',
      link: 'https://www.amcladder.com/',
      github: null,
      featured: true,
      icon: <HiCode />,
    },
    {
      id: 2,
      title: 'HAPPILY HEALTH',
      category: 'Mobile App',
      description: 'Health and wellness mobile app built with React Native. Managed a team of 4 cross-functional members, focusing on front-end functionality and user experience.',
      technologies: ['React Native', 'JavaScript', 'Health APIs'],
      image: '/api/placeholder/400/300',
      link: 'https://play.google.com/store/apps/details?id=com.sunpooh.Health&hl=en',
      github: null,
      featured: true,
      icon: <HiDeviceMobile />,
    },
    {
      id: 3,
      title: 'CREDR',
      category: 'Web Platform',
      description: 'Application to buy & sell used bikes & scooters. Elevated platform stability and functionality by resolving production bugs and integrating new URLs.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: '/api/placeholder/400/300',
      link: 'https://www.credr.com',
      github: null,
      featured: false,
      icon: <HiCode />,
    },
    {
      id: 4,
      title: 'MYCLNQ',
      category: 'Healthcare App',
      description: 'App for taking care of family healthcare needs. Developed clinic locator and online appointment booking system with user-friendly interface.',
      technologies: ['React Native', 'Location Services', 'Booking System'],
      image: '/api/placeholder/400/300',
      link: 'https://play.google.com/store/search?q=myclnq&c=apps&hl=en',
      github: null,
      featured: false,
      icon: <HiDeviceMobile />,
    },
    {
      id: 5,
      title: 'ACCELECOM SERVICES',
      category: 'Backend System',
      description: 'Backend development for syncing actions between disparate applications using Spring Boot framework with RESTful APIs.',
      technologies: ['Spring Boot', 'Java', 'REST APIs'],
      image: '/api/placeholder/400/300',
      link: null,
      github: null,
      featured: false,
      icon: <HiServer />,
    },
    {
      id: 6,
      title: 'BODY BEAT',
      category: 'Fitness App',
      description: 'Vital tracker mobile app that integrates health and fitness data from various sources like wearables and devices.',
      technologies: ['React Native', 'Health APIs', 'Data Integration'],
      image: '/api/placeholder/400/300',
      link: null,
      github: null,
      featured: false,
      icon: <HiDeviceMobile />,
    },
    {
      id: 7,
      title: 'OCEANEERING',
      category: 'Enterprise System',
      description: 'Backend development for subsea engineering company. Worked with external APIs, MongoDB, and developed GraphQL APIs.',
      technologies: ['GraphQL', 'MongoDB', 'Node.js'],
      image: '/api/placeholder/400/300',
      link: null,
      github: null,
      featured: false,
      icon: <HiServer />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of my recent work and technical expertise
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div className="featured-projects" variants={itemVariants}>
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card featured ${hoveredProject === project.id ? 'hovered' : ''}`}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <div className="project-overlay">
                    <div className="project-icon">{project.icon}</div>
                    <div className="project-category">{project.category}</div>
                  </div>
                  <div className="project-image-placeholder">
                    <div className="placeholder-content">
                      <div className="placeholder-icon">{project.icon}</div>
                      <span className="placeholder-text">{project.title}</span>
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-category-badge">{project.category}</span>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HiExternalLink />
                        <span>View Project</span>
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HiCode />
                        <span>View Code</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Projects */}
        <motion.div className="other-projects" variants={itemVariants}>
          <h3 className="other-projects-title">Other Projects</h3>
          <div className="other-projects-grid">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card compact"
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="project-header">
                  <div className="project-icon-small">{project.icon}</div>
                  <div className="project-info">
                    <h4 className="project-title-small">{project.title}</h4>
                    <span className="project-category-small">{project.category}</span>
                  </div>
                </div>

                <p className="project-description-small">{project.description}</p>

                <div className="project-technologies-small">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag-small">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag-small">+{project.technologies.length - 3}</span>
                  )}
                </div>

                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-small"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiExternalLink />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="projects-cta" variants={itemVariants}>
          <div className="cta-content">
            <h3 className="cta-title">Interested in working together?</h3>
            <p className="cta-description">
              I'm always excited to take on new challenges and create amazing digital experiences.
            </p>
            <motion.button
              className="btn btn-primary btn-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Collaborate
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModernProjects;
