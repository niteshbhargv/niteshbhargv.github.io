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
                {showBackButton ? (
                  <>
                    <li><Link to="/#about">About</Link></li>
                    <li><Link to="/#experience">Experience</Link></li>
                    <li><Link to="/#education">Education</Link></li>
                    <li><Link to="/#skills">Skills</Link></li>
                    <li><Link to="/#posts">Posts</Link></li>
                    <li><Link to="/" className="back-button">← Back to Portfolio</Link></li>
                  </>
                ) : (
                  <>
                    <li><a href="#about">About</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#education">Education</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#posts">Posts</a></li>
                  </>
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