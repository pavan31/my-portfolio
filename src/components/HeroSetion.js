import React from "react";
import { TypeAnimation } from "react-type-animation";
import "../assets/styles/Hero.css";

export default function Hero() {
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
          <a href="#projects" className="btn primary">
            View My Work
          </a>
          <a href="mailto:pavan@example.com" className="btn secondary">
            Contact Me
          </a>
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
