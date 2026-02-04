import { useEffect, useState } from 'react';
import './ConsentBanner.css';
import { updateConsent } from '../lib/analytics';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem('ga_consent_choice');
      if (!choice) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleChoice = (granted) => {
    updateConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consent-banner" role="dialog" aria-live="polite" aria-label="Préférences de confidentialité">
      <div className="consent-content">
        <div className="consent-title">Votre confidentialité</div>
        <div className="consent-text">
          Nous utilisons des cookies pour mesurer l’audience et améliorer l’expérience.
          Vous pouvez accepter ou refuser. Vous pourrez modifier votre choix ultérieurement.
        </div>
        <div className="consent-actions">
          <button className="consent-btn secondary" onClick={() => handleChoice(false)}>
            Tout refuser
          </button>
          <button className="consent-btn primary" onClick={() => handleChoice(true)}>
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}

