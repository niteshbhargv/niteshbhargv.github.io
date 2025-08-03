import React from 'react';

const About: React.FC = () => {
  return (
    <>
      <section id="about">
        <div className="section-content">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text fade-in">
              <div className="about-intro">
                <p>I'm a <strong>Computer Scientist II at Adobe</strong> with over 9 years of experience in software development and system architecture.</p>
              </div>
              
              <div className="about-details">
                <div className="detail-item">
                  <h4>Current Role</h4>
                  <p>Leading the migration of Adobe Captivate to the cloud and developing enterprise-class content management solutions. Working on CPGenAI, a <strong>AI first microservice</strong> that generates multimodal content (text, images,videos) for Adobe Captivate.  </p>
                
                <br/>
               
                  <h4>Expertise</h4>
                  <p>Full-stack development, microservices architecture, and cloud technologies. <br/> Passionate about building scalable systems across fintech, e-commerce, and enterprise domains.
                  <br/> Strong educational foundation from IIT Madras with hands-on experience at leading companies like Adobe, VMware, and Google.
                  </p>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default About; 