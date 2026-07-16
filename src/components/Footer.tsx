import React from 'react';
import { LINKS } from '../content/links';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <ul className="contact">
        <li>
          <a href={`mailto:${LINKS.email}`}>Email</a>
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
      <p className="colophon">© {new Date().getFullYear()} Nitesh Bhargava</p>
    </footer>
  );
};

export default Footer;
