import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiCode, HiLightBulb, HiHeart, HiTrendingUp } from 'react-icons/hi';
import './ModernAbout.css';

const ModernAbout = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
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

  const values = [
    {
      icon: <HiCode />,
      title: 'Clean Code',
      description: 'I believe in writing maintainable, scalable, and efficient code that stands the test of time.',
    },
    {
      icon: <HiLightBulb />,
      title: 'Innovation',
      description: 'Always exploring new technologies and approaches to solve problems in creative ways.',
    },
    {
      icon: <HiHeart />,
      title: 'Passion',
      description: 'Driven by genuine enthusiasm for technology and the impact it can have on people\'s lives.',
    },
    {
      icon: <HiTrendingUp />,
      title: 'Growth',
      description: 'Continuously learning and evolving to stay at the forefront of technology trends.',
    },
  ];


  return (
    <section ref={ref} className="modern-about" id="about">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-number">01</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate developer crafting digital experiences that matter
          </p>
        </motion.div>

        <div className="about-content">
          {/* Main Content */}
          <motion.div className="about-main" variants={itemVariants}>
            <div className="about-text">
              <h3 className="about-heading">
                Building the Future, One Line of Code at a Time
              </h3>
              <p className="about-description">
                I'm <strong>Pavan Seshu Kumar</strong>, a passionate Full-Stack Developer with
                expertise in React, Next.js, React Native, MongoDB, Express, and building
                scalable web applications. With years of experience in frontend and backend
                development, I focus on crafting seamless user experiences and delivering
                high-performance solutions.
              </p>
              <p className="about-description">
                My journey in technology is driven by curiosity and a desire to create
                meaningful impact. I believe that great software isn't just about functionality—it's
                about creating experiences that users love and that solve real-world problems.
              </p>
              <blockquote className="about-quote">
                "Code is more than syntax; it's a language that turns imagination into reality."
              </blockquote>
            </div>

          </motion.div>

          {/* Values Cards */}
          <motion.div className="values-section" variants={itemVariants}>
            <h4 className="values-title">What Drives Me</h4>
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="value-card"
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="value-icon">
                    {value.icon}
                  </div>
                  <h5 className="value-title">{value.title}</h5>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Cards */}
        <motion.div className="experience-section" variants={itemVariants}>
          <h4 className="experience-title">Professional Journey</h4>
          <div className="experience-grid">
            <motion.div
              className="experience-card featured"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="experience-badge">Current</div>
              <div className="experience-header">
                <h5 className="experience-position">Software Development Engineer II</h5>
                <span className="experience-company">Aspire Infolabs Global Pvt. Ltd</span>
              </div>
              <div className="experience-period">2018 - Present</div>
              <div className="experience-highlights">
                <span className="highlight-tag">Team Leadership</span>
                <span className="highlight-tag">Full-Stack Development</span>
                <span className="highlight-tag">Mentoring</span>
              </div>
              <p className="experience-description">
                Leading development of scalable web and mobile applications,
                mentoring junior developers, and driving technical innovation
                across multiple projects.
              </p>
            </motion.div>

            <motion.div
              className="experience-card"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="experience-header">
                <h5 className="experience-position">Internship</h5>
                <span className="experience-company">Srushty Global Solutions Pvt Ltd</span>
              </div>
              <div className="experience-period">2017</div>
              <div className="experience-highlights">
                <span className="highlight-tag">Learning</span>
                <span className="highlight-tag">Industry Exposure</span>
              </div>
              <p className="experience-description">
                Gained hands-on experience in software development and
                learned industry best practices in a professional environment.
              </p>
            </motion.div>

            <motion.div
              className="experience-card"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="experience-header">
                <h5 className="experience-position">B.Tech in Computer Engineering</h5>
                <span className="experience-company">IIITDM Kancheepuram</span>
              </div>
              <div className="experience-period">2014 - 2018</div>
              <div className="experience-highlights">
                <span className="highlight-tag">Computer Science</span>
                <span className="highlight-tag">Algorithms</span>
                <span className="highlight-tag">Software Engineering</span>
              </div>
              <p className="experience-description">
                Solid foundation in computer science principles,
                algorithms, and software engineering methodologies.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModernAbout;
