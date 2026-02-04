import { Link } from 'react-router-dom';
import './Footer.css';
import { trackEvent } from '../lib/analytics';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
        <Link to="/" aria-label="Retour à l'accueil" onClick={() => trackEvent('footer_link_click', { link: 'home' })}>
          <img src="/module-logo-white.png" alt="Module" className="logo-img" />
        </Link>
        </div>
        
        <nav className="footer-links" aria-label="Navigation du pied de page">
          <Link to="/projets" onClick={() => trackEvent('footer_link_click', { link: 'projets' })}>Projets</Link>
          <Link to="/services" onClick={() => trackEvent('footer_link_click', { link: 'services' })}>Services</Link>
          <Link to="/contact" onClick={() => trackEvent('footer_link_click', { link: 'contact' })}>Contact</Link>
        </nav>
        
        <div className="footer-credits">
          © {new Date().getFullYear()} proudly powered by <a style={{color: 'var(--lime)'}} href="/" onClick={(e) => { e.preventDefault(); trackEvent('footer_link_click', { link: 'brand' }); }}>Module</a>
        </div>
      </div>
    </footer>
  );
}