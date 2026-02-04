import { Link } from 'react-router-dom';
import './NotFound.css';
import { useEffect, useRef, useState } from 'react';
import { useSEO } from '../lib/seo';
import { trackEvent } from '../lib/analytics';

export default function NotFound() {
  useSEO({
    title: 'Page introuvable — Module',
    description: "La page que vous cherchez n'existe pas ou a été déplacée.",
    canonicalPath: '/404',
    robots: 'noindex, nofollow',
  });

  const containerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [eggPos, setEggPos] = useState({ top: '70%', left: '80%' });

  // Fixe le footer en bas uniquement sur la 404 et ajuste la hauteur utile
  useEffect(() => {
    document.body.classList.add('notfound-active');
    const adjust = () => {
      const header = document.querySelector('.header');
      const footer = document.querySelector('.footer');
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const footerH = footer ? footer.getBoundingClientRect().height : 0;
      if (containerRef.current) {
        containerRef.current.style.minHeight = `calc(100vh - ${headerH + footerH}px)`;
        containerRef.current.style.paddingTop = `${Math.max(24, headerH + 16)}px`;
        containerRef.current.style.paddingBottom = `${Math.max(32, footerH + 24)}px`;
      }
      document.documentElement.style.setProperty('--footer-h', `${footerH}px`);

      // Place the easter egg at a random position (percentages) within the container.
      if (containerRef.current) {
        const rand = (min, max) => Math.random() * (max - min) + min;
        // Eviter les bords et le footer/header : 12% à 84% approx.
        const top = rand(12, 84);
        const left = rand(10, 88);
        setEggPos({ top: `${top}%`, left: `${left}%` });
      }
    };
    adjust();
    window.addEventListener('resize', adjust);
    trackEvent('404_view', { path: window.location.pathname });
    return () => {
      document.body.classList.remove('notfound-active');
      window.removeEventListener('resize', adjust);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
    trackEvent('404_easter_egg_open');
  };

  const closeModal = () => setModalOpen(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('MODULE-AUDIT-100');
      trackEvent('404_promo_copy');
    } catch {}
  };

  return (
    <div className="notfound-page" ref={containerRef}>
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">Oups… cette page a disparu… ou a été déplacée. <br />En attendant, vous pouvez retourner à l’accueil ou tenter de trouver le cadeau caché.</p>
        <Link to="/" className="notfound-link">Revenir à l’accueil</Link>

        {/* Easter egg: texte blanc sur blanc cliquable */}
        <button
          className="notfound-easter-egg"
          aria-label="Surprise"
          onClick={openModal}
          style={{ top: eggPos.top, left: eggPos.left }}
        >
          Audit gratuit caché: cliquez ici
        </button>
      </div>

      {/* Modal promo */}
      {modalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Code promotionnel">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Audit gratuit</h2>
              <button className="modal-close" onClick={closeModal} aria-label="Fermer">✕</button>
            </div>
            <div className="modal-body">
              <p>Utilisez ce code lors de votre prise de contact pour bénéficier d’un audit gratuit.</p>
              <div className="promo-code" onClick={copyCode} role="button" tabIndex={0}>
                MODULE-AUDIT-404
              </div>
              <button className="copy-btn" onClick={copyCode}>Copier le code</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

