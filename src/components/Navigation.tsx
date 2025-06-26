import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav>
      <div className="container">
        <div className="nav-container">
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#skills">Skills</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 