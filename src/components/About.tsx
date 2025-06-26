import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="section-content">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text fade-in">
            <p>I'm a seasoned Computer Scientist II at Adobe with over 9 years of experience in software development and system architecture. Currently, I'm leading the migration of Adobe Captivate to the cloud and developing enterprise-class content management solutions.</p>
            
            <p>My expertise spans full-stack development, microservices architecture, and cloud technologies. I'm passionate about building scalable systems and have successfully delivered multiple projects across various domains including fintech, e-commerce, and enterprise software.</p>
            
            <p>With a strong educational background from IIT Madras and hands-on experience at leading companies like Adobe, VMware, and Google, I bring a unique blend of theoretical knowledge and practical expertise to solve complex technical challenges.</p>
          </div>
          <div className="skills-grid fade-in">
            <div className="skill-category">
              <h4>Backend Technologies</h4>
              <div className="skill-tags">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Spring Boot</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Apache Sling</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Frontend Technologies</h4>
              <div className="skill-tags">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">DCX-js</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Cloud & DevOps</h4>
              <div className="skill-tags">
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Argo CI/CD</span>
                <span className="skill-tag">OSGI</span>
              </div>
            </div>
            <div className="skill-category">
              <h4>Data & Analytics</h4>
              <div className="skill-tags">
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Elastic Search</span>
                <span className="skill-tag">Prometheus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 