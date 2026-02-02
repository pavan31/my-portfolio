import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiPaperAirplane,
  HiCheckCircle,
} from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "emailjs-com";
import emailjsConfig from "../config/emailjs.config";
import "./ModernContact.css";

const ModernContact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const contactInfo = [
    {
      icon: <HiMail />,
      title: "Email",
      value: "poluparthipavanseshukumar@gmail.com",
      link: "mailto:poluparthipavanseshukumar@gmail.com",
    },
    {
      icon: <HiPhone />,
      title: "Phone",
      value: "+91 9790564056",
      link: "tel:+919790564056",
    },
    {
      icon: <HiLocationMarker />,
      title: "Location",
      value: "Visakhapatnam, India",
      link: null,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get EmailJS credentials from environment variables or config file
      const serviceId =
        process.env.REACT_APP_EMAILJS_SERVICE_ID || emailjsConfig.serviceId;
      const templateId =
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || emailjsConfig.templateId;
      const userId =
        process.env.REACT_APP_EMAILJS_USER_ID || emailjsConfig.userId;

      // Validate that all required EmailJS credentials are set
      if (!serviceId || !templateId || !userId) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables or config file."
        );
      }

      // Format template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Pavan Seshu Kumar", // Your name
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );

      console.log("Email sent successfully:", result);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      alert(
        error.message ||
          "Failed to send message. Please try again later or contact me directly at poluparthipavanseshukumar@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              I'm always excited to work on new projects and collaborate with
              amazing people. Whether you have a question, want to discuss a
              project, or just want to say hello, I'd love to hear from you.
            </p>

            <motion.div
              className="contact-methods-single-card"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.05 }}
            >
              <div className="contact-items-container">
                {contactInfo.map((info, index) => (
                  <div key={info.title} className="contact-item">
                    <div className="contact-item-icon">{info.icon}</div>
                    <div className="contact-item-content">
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
            <div className="social-links">
              <a
                href="https://linkedin.com/in/pavan-seshu-kumar"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/pavan31"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="contact-form-section" variants={itemVariants}>
            <h3 className="contact-form-title">Send a Message</h3>

            {isSubmitted ? (
              <motion.div
                className="success-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <HiCheckCircle className="success-icon" />
                <p>
                  Thank you for reaching out. I'll get back to you as soon as
                  possible.
                </p>
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
                  whileTap={{ scale: 0.98 }}
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
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div className="contact-footer" variants={itemVariants}>
          <p className="footer-text">© 2025 Pavan Seshu Kumar</p>
          <a
            href="#hero"
            className="back-to-top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to Top ↑
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModernContact;
