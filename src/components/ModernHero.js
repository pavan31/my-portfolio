import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiCode, HiSparkles } from 'react-icons/hi';
import './ModernHero.css';

const ModernHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth) * 100;
      const yPos = (clientY / innerHeight) * 100;

      if (heroRef.current) {
        heroRef.current.style.setProperty('--mouse-x', `${xPos}%`);
        heroRef.current.style.setProperty('--mouse-y', `${yPos}%`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section ref={heroRef} className="modern-hero" id="hero">
      {/* Background Elements */}
      <div className="hero-background">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="floating-element floating-code"
        variants={floatingVariants}
        animate="animate"
      >
        <HiCode />
      </motion.div>

      <motion.div
        className="floating-element floating-sparkles"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      >
        <HiSparkles />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-content" variants={itemVariants}>
          {/* Greeting */}
          <motion.div className="hero-greeting" variants={itemVariants}>
            <span className="greeting-text">Hello, I'm</span>
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero-name" variants={itemVariants}>
            <span className="name-text">Pavan Seshu Kumar</span>
            <motion.span
              className="name-highlight"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.h1>

          {/* Title Animation */}
          <motion.div className="hero-title" variants={itemVariants}>
            <TypeAnimation
              sequence={[
                'Full-Stack Developer',
                2000,
                'React Specialist',
                2000,
                'Mobile App Developer',
                2000,
                'Problem Solver',
                2000,
                'Innovation Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="title-text"
              repeat={Infinity}
            />
          </motion.div>

          {/* Description */}
          <motion.p className="hero-description" variants={itemVariants}>
            I craft exceptional digital experiences through clean code,
            innovative solutions, and a passion for turning ideas into reality.
            Let's build something amazing together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <motion.button
              className="btn btn-primary btn-lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>

            <motion.button
              className="btn btn-secondary btn-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

        </motion.div>

      </motion.div>

      {/* Mouse Follower */}
      <div className="mouse-follower"></div>
    </section>
  );
};

export default ModernHero;
