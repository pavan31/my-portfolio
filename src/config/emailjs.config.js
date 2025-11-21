// EmailJS Configuration
// This file can be used as a fallback if environment variables are not available
// For GitHub Pages deployment, you can either:
// 1. Use GitHub Actions with secrets (recommended)
// 2. Or uncomment and fill in the values below (EmailJS public keys are safe to expose)

const emailjsConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  userId: process.env.REACT_APP_EMAILJS_USER_ID || '',
};

export default emailjsConfig;

