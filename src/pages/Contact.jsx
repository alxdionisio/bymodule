import { useState } from 'react';
import './Contact.css';
import { trackEvent } from '../lib/analytics';
import { useSEO, useJsonLd, getSiteUrl, useOpenGraph } from '../lib/seo';

export default function Contact() {
  useSEO({
    title: "Contact — Module",
    description:
      "Parlez-nous de votre projet. Réponse sous 24h pour construire la solution adaptée à vos besoins.",
    canonicalPath: "/contact",
  });
  useOpenGraph({
    title: "Contact — Module",
    description: "Parlez-nous de votre projet. Réponse sous 24h.",
    path: "/contact"
  });
  const siteUrl = getSiteUrl();
  useJsonLd('breadcrumb-contact', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` }
    ]
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    services: [],
    budget: '',
    description: '',
    timeline: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'projectType') {
      trackEvent('contact_project_type_change', { projectType: value });
    } else if (name === 'budget') {
      trackEvent('contact_budget_change', { budget: value });
    } else if (name === 'timeline') {
      trackEvent('contact_timeline_change', { timeline: value });
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter(s => s !== value)
    }));
    trackEvent('contact_service_toggle', { service: value, checked });
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Veuillez entrer votre nom';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Veuillez entrer votre email';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Veuillez sélectionner un type de projet';
    }

    if (formData.services.length === 0) {
      newErrors.services = 'Veuillez sélectionner au moins un service';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Veuillez décrire votre projet';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      trackEvent('contact_submit_error', { fields: Object.keys(newErrors) });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');

      // Envoi via FormSubmit (aucun backend requis)
      const endpoint = 'https://formsubmit.co/ajax/contact@bymodule.com';
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: formData.projectType,
        services: formData.services.join(', '),
        budget: formData.budget,
        description: formData.description,
        timeline: formData.timeline,
        _subject: 'Nouveau lead byModule (site)',
        _template: 'table',
        _captcha: 'false'
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setIsSubmitted(true);
      trackEvent('contact_submit', {
        projectType: formData.projectType || '(none)',
        servicesCount: formData.services.length,
        budget: formData.budget || '(none)',
        timeline: formData.timeline || '(none)',
      });

      // Reset du formulaire après succès
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        services: [],
        budget: '',
        description: '',
        timeline: ''
      });
    } catch (err) {
      console.error('Form submit error', err);
      setSubmitError("Une erreur est survenue. Réessayez dans un instant ou écrivez à contact@bymodule.com.");
      trackEvent('contact_submit_fail', { reason: String(err) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      {/* HERO */}
      <section className="page-hero">
        <div className="hero-content">
          <div className="page-tag">Parlons de votre projet</div>
          <h1 className="page-title">
            CRÉONS<br />
            ENSEMBLE
          </h1>
          <p className="page-subtitle">
            Vous avez un projet ? Une idée ? Une question ?<br />
            Nous répondons sous 24h pour discuter de vos besoins.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="contact-section">
        <div className="contact-container">
          {/* INFO SIDE */}
          <div className="contact-info">
            <h2 className="info-title">
              COMMENT NOUS<br />
              CONTACTER
            </h2>
            
            <div className="info-items">
              <div className="info-item">
                <div className="info-label">Réponse rapide</div>
                <div className="info-value">
                  Nous nous engageons à vous répondre dans les 24h ouvrées. 
                  Votre projet mérite toute notre attention.
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Premier échange</div>
                <div className="info-value">
                  Discussion gratuite de 30-45 min pour comprendre vos besoins, 
                  sans engagement.
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Approche</div>
                <div className="info-value">
                  Solutions sur mesure adaptées à votre contexte, 
                  vos objectifs et votre budget.
                </div>
              </div>
            </div>
          </div>

          {/* FORM SIDE */}
          <div className="contact-form-wrapper">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="form-title">
                  Parlez-nous de<br />
                  votre projet
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Nom <span className="required">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Jean Dupont"
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email <span className="required">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="jean@entreprise.fr"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Entreprise</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Type de projet <span className="required">*</span>
                  </label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`form-select ${errors.projectType ? 'error' : ''}`}
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="website">Site vitrine / institutionnel</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="mobile">Application mobile</option>
                    <option value="automation">Automatisation / Intégration</option>
                    <option value="formation">Formation</option>
                    <option value="other">Autre</option>
                  </select>
                  {errors.projectType && <div className="error-message">{errors.projectType}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Services souhaités <span className="required">*</span>
                  </label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="dev" 
                        checked={formData.services.includes('dev')}
                        onChange={handleCheckboxChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">Développement</span>
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="design" 
                        checked={formData.services.includes('design')}
                        onChange={handleCheckboxChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">Design / UX</span>
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="strategy" 
                        checked={formData.services.includes('strategy')}
                        onChange={handleCheckboxChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">Stratégie</span>
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        value="formation" 
                        checked={formData.services.includes('formation')}
                        onChange={handleCheckboxChange}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">Formation</span>
                    </label>
                  </div>
                  {errors.services && <div className="error-message">{errors.services}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Budget estimé</label>
                  <select 
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    <option value="5k">5 000 € - 10 000 €</option>
                    <option value="10k">10 000 € - 25 000 €</option>
                    <option value="25k">25 000 € - 50 000 €</option>
                    <option value="50k+">50 000 € et plus</option>
                    <option value="unknown">À définir</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Décrivez votre projet <span className="required">*</span>
                  </label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-textarea ${errors.description ? 'error' : ''}`}
                    placeholder="Parlez-nous de votre vision, vos objectifs, vos contraintes..."
                  />
                  <div className="form-help">
                    Plus vous serez précis, mieux nous pourrons vous aider
                  </div>
                  {errors.description && <div className="error-message">{errors.description}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Timeline souhaitée</label>
                  <select 
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Sélectionnez un délai</option>
                    <option value="urgent">Urgent (&lt; 1 mois)</option>
                    <option value="short">Court terme (1-3 mois)</option>
                    <option value="medium">Moyen terme (3-6 mois)</option>
                    <option value="long">Long terme (6+ mois)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <button type="submit" className="submit-btn">
                  {isSubmitting ? 'Envoi…' : 'Envoyer ma demande'}
                </button>
                {submitError && <div className="error-message" role="alert">{submitError}</div>}
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3 className="success-title">Message envoyé !</h3>
                <p className="success-text">
                  Merci pour votre message. Nous reviendrons vers vous sous 24h 
                  pour discuter de votre projet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
