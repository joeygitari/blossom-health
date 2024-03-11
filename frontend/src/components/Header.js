import React, { useState, useEffect } from 'react';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSetActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-brand">
          <div className="logo">
            BlossomHealth<b>❀</b>
          </div>
        </div>
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#home" className={`nav-link ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleSetActiveLink('home')}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#aboutUs" className={`nav-link ${activeLink === 'aboutUs' ? 'active' : ''}`} onClick={() => handleSetActiveLink('skills')}>About Us</a>
            </li>
            <li className="nav-item">
              <a href="#services" className={`nav-link ${activeLink === 'services' ? 'active' : ''}`} onClick={() => handleSetActiveLink('projects')}>Services</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className={`nav-link ${activeLink === 'connect' ? 'active' : ''}`} onClick={() => handleSetActiveLink('contact')}>Contact</a>
            </li>
          </ul>
          <div className="navbar-text">
            <button className="vvd"><span>Register</span></button>
            <button className="vvd"><span>Login</span></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
