import React from 'react';
import { LINKS } from '../content/links';

const Header: React.FC = () => {
  return (
    <header className="masthead">
      <img className="portrait" src="/profileImage.jpeg" alt="" />
      <h1 className="name">Nitesh Bhargava</h1>
      <p className="tagline">
        Software Engineer at Arista Networks
        <span className="tagline-prev">Previously Computer Scientist II at Adobe</span>
      </p>
      <ul className="contact">
        <li>
          <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
        </li>
        <li>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={LINKS.resume} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
