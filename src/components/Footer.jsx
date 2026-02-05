import { Link } from 'react-router-dom';
import './Footer.css';
import { trackEvent } from '../lib/analytics';
import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'contact@bymodule.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      trackEvent('footer_email_copy');
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-panel">
          {/* Groupe gauche (2 colonnes) */}
          <div className="footer-left">
            {/* Colonne 1 - Contact + titre */}
            <div className="footer-col contact-col">
              <div className="contact-head">CONTACT</div>
              <h3 className="contact-title">
                <span>Créons votre</span>
                <span>prochain projet</span>
                <span className="cta-highlight">ensemble</span>
              </h3>
            </div>
            {/* Colonne 2 - Actions (CTA + email) */}
            <div className="footer-col actions-col">
              <Link
                to="/contact"
                className="contact-cta"
                onClick={() => trackEvent('footer_link_click', { link: 'cta_contact' })}
              >
                Prendre rendez-vous →
              </Link>
              <div className="contact-alt">ou écrivez-nous :</div>
            <div className="email-row">
              <button className="email-chip" onClick={copyEmail} aria-label="Copier l’adresse email">
                {email}
              </button>
              {copied ? <span className="copy-status">Copié</span> : null}
            </div>
            </div>
          </div>

          {/* Groupe droite (2 colonnes) - ferré à droite */}
          <div className="footer-right">
            {/* Colonne 3 - Menu */}
            <div className="footer-col links-col">
              <div className="col-title">Menu</div>
              <nav className="footer-links main" aria-label="Navigation principale pied de page">
                <Link to="/projets" onClick={() => trackEvent('footer_link_click', { link: 'projets' })}>Projets</Link>
                <Link to="/services" onClick={() => trackEvent('footer_link_click', { link: 'services' })}>Services</Link>
                <Link to="/contact" onClick={() => trackEvent('footer_link_click', { link: 'contact' })}>Contact</Link>
              </nav>
            </div>
            {/* Colonne 4 - Informations */}
            <div className="footer-col info-col">
              <div className="col-title">Informations</div>
              <nav className="footer-links legal" aria-label="Informations légales">
                <Link to="/plan-du-site" onClick={() => trackEvent('footer_link_click', { link: 'sitemap' })}>Plan du site</Link>
                <Link to="/mentions-legales" onClick={() => trackEvent('footer_link_click', { link: 'legal' })}>Mentions légales</Link>
                <Link to="/politique-de-confidentialite" onClick={() => trackEvent('footer_link_click', { link: 'privacy' })}>Politique de confidentialité</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <Link to="/" aria-label="Retour à l'accueil" onClick={() => trackEvent('footer_link_click', { link: 'home' })}>
              <img src="/module-logo-white.png" alt="Module" className="logo-img" />
            </Link>
          </div>
          <div className="footer-credits">
            © 2026 - Proudly powered by{' '}
            <Link
              to="/"
              style={{ color: 'var(--lime)' }}
              onClick={() => trackEvent('footer_link_click', { link: 'brand' })}
            >
              Module
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}