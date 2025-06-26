import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-links">
          <a href="mailto:nitesh.bhargv@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="https://www.linkedin.com/in/nitesh-bhargava-643721a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/niteshbhargv" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="./Resume_Nitesh_Bhargava.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download Resume">
            <i className="fas fa-download"></i>
          </a>
        </div>
        <p>&copy; 2024 Nitesh Bhargava. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 