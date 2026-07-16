import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  variant?: 'home' | 'post';
}

const Layout: React.FC<LayoutProps> = ({ children, variant = 'home' }) => {
  return (
    <div className="page">
      {variant === 'home' ? (
        <Header />
      ) : (
        <div className="topbar">
          <Link to="/" className="topbar-back">
            ← Nitesh Bhargava
          </Link>
        </div>
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
