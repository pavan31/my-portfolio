import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#0a0a0a',
      color: '#ffffff'
    },
    title: {
      fontSize: '6rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    text: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#e0e0e0'
    },
    desc: {
      fontSize: '1rem',
      marginBottom: '2rem',
      color: '#b0b0b0',
      maxWidth: '500px'
    },
    button: {
      padding: '12px 24px',
      fontSize: '1rem',
      backgroundColor: 'transparent',
      color: '#667eea',
      border: '2px solid #667eea',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#667eea',
        color: '#ffffff'
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.text}>"Lost in the digital void!"</p>
      <p style={styles.desc}>
        "Looks like you've wandered off the beaten path. Let's get you back to
        safety!"
      </p>
      <button
        style={styles.button}
        onClick={() => navigate("/")}
      >
        Go To Profile
      </button>
    </div>
  );
};

export default ErrorPage;
