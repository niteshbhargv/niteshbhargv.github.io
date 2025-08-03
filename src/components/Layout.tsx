import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton = false }) => {
  return (
    <div className="app-container">
      <div className="app-content">
        <Header />
        <nav>
          <div className="section-content">
            <div className="nav-container">
              <ul className="nav-links">
                <li><Link to="/#about">About</Link></li>
                <li><Link to="/#experience">Experience</Link></li>
                <li><Link to="/#education">Education</Link></li>
                <li><Link to="/#skills">Skills</Link></li>
                <li><Link to="/#posts">Posts</Link></li>
                {showBackButton && (
                  <li><Link to="/" className="back-button">← Back to Portfolio</Link></li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;