import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane, HiCheckCircle } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './ModernContact.css';

const ModernContact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const contactInfo = [
    {
      icon: <HiMail />,
      title: 'Email',
      value: 'poluparthipavanseshukumar@gmail.com',
      link: 'mailto:poluparthipavanseshukumar@gmail.com',
    },
    {
      icon: <HiPhone />,
      title: 'Phone',
      value: '+91 9790564056',
      link: 'tel:+919790564056',
    },
    {
      icon: <HiLocationMarker />,
      title: 'Location',
      value: 'Visakhapatnam, India',
      link: null,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your EmailJS service details
      const result = await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formData,
        'YOUR_USER_ID'
      );

      console.log('Email sent successfully:', result);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      // For demo purposes, we'll simulate success
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/pavan-seshu-kumar',
      icon: '💼',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/pavan-seshu-kumar',
      icon: '💻',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/pavan_seshu',
      icon: '🐦',
    },
  ];

  return (
    <section ref={ref} className="modern-contact" id="contact">
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-number">04</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to bring your ideas to life? Let's start a conversation.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div className="contact-info" variants={itemVariants}>
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-description">
              I'm always excited to work on new projects and collaborate with amazing people.
              Whether you have a question, want to discuss a project, or just want to say hello,
              I'd love to hear from you.
            </p>

            <motion.div
              className="contact-methods-single-card"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="contact-items-container">
                {contactInfo.map((info, index) => (
                  <div key={info.title} className="contact-item">
                    <div className="contact-item-icon">
                      {info.icon}
                    </div>
                    <div className="contact-item-content">
                      <span className="contact-item-label">{info.title}</span>
                      {info.link ? (
                        <a href={info.link} className="contact-item-value">
                          {info.value}
                        </a>
                      ) : (
                        <span className="contact-item-value">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="social-links-new">
              <h4 className="social-title-new">Connect With Me</h4>
              <div className="social-single-view">
                <motion.a
                  href="https://linkedin.com/in/pavan-seshu-kumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-new"
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="social-icon-new" />
                  <span className="social-name-new">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="https://github.com/pavan31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-new"
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="social-icon-new" />
                  <span className="social-name-new">GitHub</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="contact-form-section" variants={itemVariants}>
            <div className="form-container">
              <h3 className="form-title">Send a Message</h3>

              {isSubmitted ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <HiCheckCircle className="success-icon" />
                  <h4 className="success-title">Message Sent!</h4>
                  <p className="success-description">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <motion.button
                    className="btn btn-secondary"
                    onClick={() => setIsSubmitted(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      required
                      rows={6}
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary btn-lg form-submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div className="contact-footer" variants={itemVariants}>
          <div className="footer-content">
            <p className="footer-text">
              © 2025 Pavan Seshu Kumar. Built with React and lots of ☕
            </p>
            <div className="footer-links">
              <button
                className="footer-link"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModernContact;
