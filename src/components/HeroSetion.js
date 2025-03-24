import React from "react";
import { TypeAnimation } from "react-type-animation";
import "../assets/styles/Hero.css";

export default function Hero() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = document.querySelector("header")?.offsetHeight || 80;
      const topOffset = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I'm
          <br className="mobile-break" />
          <span className="highlight">Pavan Seshu Kumar</span>
        </h1>

        <div className="hero-subtitle-wrapper">
          <TypeAnimation
            sequence={[
              "Full-Stack Developer",
              2000,
              "React | React Native | Node.js | MongoDB",
              2000,
              "Building Scalable Web & Mobile Apps",
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="hero-subtitle"
            repeat={Infinity}
          />
        </div>

        <div className="hero-buttons">
          <button className="btn primary" onClick={() => scrollToSection("projects")}>
            View My Work
          </button>
          <button className="btn secondary" onClick={() => scrollToSection("contact")}>
            Contact Me
          </button>
        </div>
      </div>

      {/* Mouse Scroll Icon */}
      <div className="mouse-icon">
        <div className="mouse">
          <div className="mouse-wheel"></div>
        </div>
      </div>
    </section>
  );
}
