import React, { useEffect, useState } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernHero from '../components/ModernHero';
import ModernAbout from '../components/ModernAbout';
import ModernSkills from '../components/ModernSkills';
import ModernProjects from '../components/ModernProjects';
import ModernContact from '../components/ModernContact';
import '../styles/global.css';

const ModernHomePage = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      let currentSection = 'hero';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 100;

          if (rect.top <= window.innerHeight / 2 - offset && rect.bottom >= window.innerHeight / 2 - offset) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const headerHeight = 80;
      const topOffset = section.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="modern-portfolio">
      <ModernHeader activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="main-content">
        <ModernHero />
        <ModernAbout />
        <ModernSkills />
        <ModernProjects />
        <ModernContact />
      </main>
    </div>
  );
};

export default ModernHomePage;
