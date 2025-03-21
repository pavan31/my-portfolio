import React, { useState, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import "../assets/styles/about.css";

const AboutMe = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 475;

  return (
    <div
      className="about-section"
      style={{
        padding: isMobile ? "16px" : "16px 32px",
        boxSizing: "border-box"
      }}
    >
      <h2 className="title">🚀 Building the Future, One Line of Code at a Time!</h2>
      <p className="intro-text">
      I'm <b>Pavan Seshu Kumar</b>, a passionate Full-Stack Developer with expertise in React, Next.js, and building scalable web applications. With years of experience in frontend and backend development, I focus on crafting seamless user experiences and delivering high-performance solutions.
      </p>
      <blockquote className="quote">"Code is more than syntax; it's a language that turns imagination into reality."</blockquote>
      
      <VerticalTimeline layout={isMobile ? "1-column-left" : "2-columns"}>
        {/* Experience */}
        <VerticalTimelineElement
          iconStyle={{ background: "#061c43", color: "#fff" }}
          contentStyle={{ border: "2px solid #061c43", boxShadow: "none" }}
          contentArrowStyle={{ borderRight: "7px solid #061c43" }}
          icon={<FaBriefcase />}
          position={isMobile ? "left" : "left"}
        >
          <p className="about-title">Software Development Engineer II</p>
          <div style={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
          <p className="about-subtitle">Aspire Infolabs Global Pvt. Ltd </p>
          <p className="about-subtitle">2018 - present </p>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          iconStyle={{ background: "#061c43", color: "#fff" }}
          contentStyle={{ border: "2px solid #061c43", boxShadow: "none" }}
          contentArrowStyle={{ borderRight: "7px solid #061c43" }}
          icon={<FaBriefcase />}
          position={isMobile ? "left" : "right"}
        >
          <p className="about-title">Internship</p>
          <div style={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
          <p className="about-subtitle">Srushty Global Solutions Pvt Ltd</p>
          <p className="about-subtitle">2017</p>
          </div>
        </VerticalTimelineElement>

        {/* Education */}
        <VerticalTimelineElement
          iconStyle={{ background: "#061c43", color: "#fff" }}
          contentStyle={{ border: "2px solid #061c43", boxShadow: "none" }}
          contentArrowStyle={{ borderRight: "7px solid #061c43" }}
          icon={<FaGraduationCap />}
          position={isMobile ? "left" : "left"}
        >
          <p className="about-title">B.Tech in Computer Engineering</p>
          <div style={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
          <p className="about-subtitle">IIITDM Kancheepuram</p>
          <p className="about-subtitle">2012 - 2014</p>
          </div>
        </VerticalTimelineElement>

      </VerticalTimeline>
    </div>
  );
};

export default AboutMe;
