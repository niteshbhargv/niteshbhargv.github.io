import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Footer from './components/Footer';
import Skills from './components/Skills';

const App: React.FC = () => {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Fade in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe all experience panels, education cards, and skill categories
    const animatedElements = document.querySelectorAll('.experience-panel, .education-card, .about-text, .skills-grid, .detail-item');
    animatedElements.forEach(el => {
      observer.observe(el);
    });

    // Active navigation link highlighting
    const handleNavHighlight = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a');
      
      let current = '';
      sections.forEach(section => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleNavHighlight);

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      window.removeEventListener('scroll', handleNavHighlight);
      animatedElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="app-container">
      <div className="app-content">
        <Header />
        <Navigation />
        <main className="main-content">
          <About />
          <Experience />
          <Education />
          <Skills />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
