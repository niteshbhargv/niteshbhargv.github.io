import React from 'react';

const Skills: React.FC = () => {
  return (
    <section id="skills">
        <div className="section-content">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
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
export default Skills;