import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';
import { trackEvent } from '../lib/analytics';

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Header scrolled style
      setScrolled(currentScrollY > 50);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
        setMobileMenuOpen(false); // Close mobile menu when hiding
      } else if (currentScrollY < lastScrollY) {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    trackEvent('nav_menu_toggle', { open: !mobileMenuOpen });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    trackEvent('nav_menu_toggle', { open: false });
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
      <nav className="nav-content" aria-label="Navigation principale">
        <Link to="/" className="logo" aria-label="Retour à l'accueil">
          <img src="/module-logo.png" alt="Module" className="logo-img" />
        </Link>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={isActive('/') ? 'nav-link active' : 'nav-link'}
            onClick={() => {
              closeMobileMenu();
              trackEvent('nav_link_click', { link: 'home' });
            }}
          >
            Accueil
          </Link>
          <Link 
            to="/projets" 
            className={isActive('/projets') ? 'nav-link active' : 'nav-link'}
            onClick={() => {
              closeMobileMenu();
              trackEvent('nav_link_click', { link: 'projets' });
            }}
          >
            Projets
          </Link>
          <Link 
            to="/services" 
            className={isActive('/services') ? 'nav-link active' : 'nav-link'}
            onClick={() => {
              closeMobileMenu();
              trackEvent('nav_link_click', { link: 'services' });
            }}
          >
            Services
          </Link>
          
          {/* CTA mobile dans le menu */}
          <Link 
            to="/contact" 
            className="cta-mobile"
            onClick={() => {
              closeMobileMenu();
              trackEvent('nav_link_click', { link: 'contact' });
            }}
          >
            Nous contacter
          </Link>
        </div>

        <Link to="/contact" className="cta-header" onClick={() => trackEvent('cta_header_click')}>
          Nous contacter
        </Link>

        <button 
          className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Menu mobile"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      
      {/* Overlay pour fermer le menu mobile */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}