import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>
          Hi, I'm <span style={styles.highlight}>Pavan Seshu Kumar</span>
        </h1>

        <div style={styles.heroSubtitleWrapper}>
          <TypeAnimation
            sequence={[
              "Full-Stack Developer",
              2000,
              "React | Node.js | MongoDB",
              2000,
              "Building Scalable Web & Mobile Apps",
              2000,
            ]}
            wrapper="span"
            speed={50}
            style={styles.heroSubtitle}
            repeat={Infinity}
          />
        </div>

        <div style={styles.heroButtons}>
          <a href="#projects" style={{ ...styles.btn, ...styles.primary }}>
            View My Work
          </a>
          <a
            href="mailto:pavan@example.com"
            style={{ ...styles.btn, ...styles.secondary }}
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Mouse Scroll Icon */}
      <div style={styles.mouseIcon}>
        <div style={styles.mouse}>
          <div style={styles.mouseWheel}></div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    width: "100vw",
    height: "100vh",
    background: "black",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "5vw",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "90vw",
    height: "85%",
  },
  heroTitle: {
    fontSize: "5vw", // Default size for "Hi, I'm"
    fontWeight: "bold",
    marginBottom: "10px",
  },
  highlight: {
    color: "transparent", // No fill
    fontSize: "7vw", // Scales with screen size
    // fontWeight: "900", // Extra bold for better stroke effect
    WebkitTextStroke: "2px white", // Thick white outline
    // textRendering: "optimizeLegibility", // Improves clarity
  },
  heroSubtitleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  heroSubtitle: {
    fontSize: "3vw",
    fontWeight: "bold",
    color: "#f0f0f0",
  },
  heroButtons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  btn: {
    display: "inline-block",
    padding: "12px 24px",
    fontSize: "2vw",
    fontWeight: "bold",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    margin: "10px",
    cursor: "pointer",
    border: "2px solid transparent",
  },
  primary: {
    backgroundColor: "#061c43",
    color: "white",
    border: "2px solid #061c43",
  },
  secondary: {
    backgroundColor: "white",
    color: "black",
    border: "2px solid white",
  },

  // Mouse Scroll Icon
  mouseIcon: {
    position: "absolute",
    bottom: "5%",
    left: "50%",
    transform: "translateX(-50%)",
  },
  mouse: {
    width: "25px",
    height: "40px",
    border: "2px solid white",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mouseWheel: {
    width: "5px",
    height: "10px",
    backgroundColor: "white",
    borderRadius: "5px",
    animation: "scrollAnimation 1.5s infinite",
  },

  // Responsive Styles
  "@media (max-width: 768px)": {
    heroTitle: {
      fontSize: "8vw", // Bigger text for mobile
      marginTop: "10vh", // Moves name down
    },
    highlight: {
      fontSize: "10vw", // Bigger name size on mobile
      WebkitTextStroke: "1px white", // Slightly thinner outline for clarity
      fontWeight: "100",
    },
    heroSubtitle: {
      fontSize: "5vw",
    },
    btn: {
      fontSize: "4vw",
    },
  },
};

// export default Hero;
