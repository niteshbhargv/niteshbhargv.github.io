import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="section-content">
        <div className="header-content">
          <div className="profile-img">
            <i className="fas fa-user"></i>
          </div>
          <h1>Nitesh Bhargava</h1>
          <p className="subtitle">Computer Scientist II at Adobe</p>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+91 77609 51188</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:nitesh.bhargv@gmail.com">nitesh.bhargv@gmail.com</a>
            </div>
            <div className="contact-item">
              <i className="fab fa-linkedin"></i>
              <a href="https://www.linkedin.com/in/nitesh-bhargava-6437211a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="contact-item">
              <i className="fab fa-github"></i>
              <a href="https://github.com/niteshbhargv" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 