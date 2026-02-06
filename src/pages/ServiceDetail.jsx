import { useParams, Link } from 'react-router-dom';
import './ServiceDetail.css';

// Import direct de servicesData depuis services.js
import servicesData from '../data/services';
import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { useSEO, useJsonLd, getSiteUrl, useOpenGraph } from '../lib/seo';

export default function ServiceDetail() {
  const { id } = useParams();
  
  // Récupération du service
  const service = servicesData[id];

  // Page 404 si service non trouvé
  if (!service) {
    return (
      <div className="service-detail">
        <div className="service-hero">
          <div className="service-hero-content">
            <h1 className="service-hero-title">Service non trouvé</h1>
            <p className="service-hero-subtitle">
              Le service demandé n'existe pas ou a été déplacé.
            </p>
            <Link to="/services" className="service-back">
              ← Retour aux services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Autres services de la même catégorie
  const otherServices = Object.values(servicesData)
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  useSEO({
    title: `${service.title} — Service — Module | Marseille, PACA`,
    description: service.subtitle ? `${service.subtitle} Marseille, Aix-en-Provence, PACA, Côte Bleue, Sausset-les-Pins, Carry-le-Rouet.` : 'Prestations développement web, product management, apps. Marseille, PACA.',
    canonicalPath: `/service/${service.id}`,
  });
  useOpenGraph({
    title: `${service.title} — Module Marseille, PACA`,
    description: service.subtitle || 'Service développement web, product management, apps. Marseille, PACA.',
    path: `/service/${service.id}`
  });
  const siteUrl = getSiteUrl();
  useJsonLd(`breadcrumb-service-${id}`, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${siteUrl}/service/${service.id}` }
    ]
  });
  useJsonLd(`service-${id}`, {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.subtitle || service.overview,
    serviceType: service.badge,
    url: `${siteUrl}/service/${service.id}`,
    areaServed: [
      { '@type': 'City', name: 'Marseille' },
      { '@type': 'City', name: 'Aix-en-Provence' },
      { '@type': 'AdministrativeArea', name: 'PACA' },
      { '@type': 'Place', name: 'Côte Bleue' },
      { '@type': 'City', name: 'Sausset-les-Pins' },
      { '@type': 'City', name: 'Carry-le-Rouet' }
    ],
    provider: { '@type': 'Organization', name: 'Module', url: siteUrl },
    offers: (service.pricing || [])
      .map((p) => {
        const digits = String(p.value || '').replace(/[^\d]/g, '');
        if (!digits) return null;
        return {
          '@type': 'Offer',
          price: Number(digits),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `${siteUrl}/service/${service.id}`,
          name: p.label
        };
      })
      .filter(Boolean)
  });

  useEffect(() => {
    if (service) {
      trackEvent('service_detail_view', { service_id: service.id, service_title: service.title });
    }
  }, [service]);

  return (
    <div className="service-detail">
      {/* HERO */}
      <section className="service-hero">
        <div className="service-hero-content">
          <Link to="/services" className="service-back">
            ← Retour aux services
          </Link>
          
          <div className="service-badge">
            {service.badge}
            {service.bestSeller && <span className="best-seller-badge">★ BEST-SELLER</span>}
          </div>
          
          <h1 className="service-hero-title">{service.title}</h1>
          
          <p className="service-hero-subtitle">{service.subtitle}</p>
          
          <div className="service-meta-grid">
            {Object.entries(service.meta).map(([key, value]) => (
              <div key={key} className="meta-item">
                <div className="meta-label">{key}</div>
                <div className="meta-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="service-content">
        {/* Overview */}
        <section className="content-section">
          <h2 className="section-title">Vue d'ensemble</h2>
          <p className="section-text">{service.overview}</p>
        </section>

        {/* Details */}
        <section className="content-section">
          <h2 className="section-title">Détails du service</h2>
          <div className="cards-grid">
            {service.details.map((detail, index) => (
              <div key={index} className="detail-card">
                <h3 className="card-title">{detail.title}</h3>
                <p className="card-description">{detail.description}</p>
                <ul className="card-list">
                  {detail.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section className="content-section">
          <h2 className="section-title">Livrables</h2>
          <div className="cards-grid">
            <div className="detail-card">
              <h3 className="card-title">Ce que vous recevez</h3>
              <ul className="card-list">
                {service.deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="content-section">
          <h2 className="section-title">Tarifs</h2>
          <div className="pricing-cards">
            {service.pricing.map((price, index) => (
              <div 
                key={index} 
                className={`pricing-card ${price.featured ? 'featured' : ''}`}
              >
                <div className="pricing-label">{price.label}</div>
                <div className="pricing-value">{price.value}</div>
                {!price.value.toLowerCase().includes('sur devis') && 
                 !price.value.toLowerCase().includes('equity') &&
                 !price.value.toLowerCase().includes('gratuit') &&
                 !price.value.toLowerCase().includes('gratuite') &&
                 !price.value.toLowerCase().includes('à définir') &&
                 service.category !== 'studio' && (
                  <div className="pricing-unit">HT</div>
                )}
                <p className="pricing-description">{price.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tags */}
        <section className="service-tags-section">
          <h3 className="tags-title">Technologies & Domaines</h3>
          <div className="service-tags-list">
            {service.tags.map((tag, idx) => (
              <span
                key={idx}
                className="service-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Other Services */}
      {otherServices.length > 0 && (
        <section className="other-services-section">
          <div className="other-services-container">
            <h2 className="other-services-title">Autres services</h2>
            <div className="other-services-grid">
              {otherServices.map((otherService) => (
                <Link
                  key={otherService.id}
                  to={`/service/${otherService.id}`}
                  className="other-service-card"
                  onClick={() => trackEvent('service_detail_other_click', { to_service_id: otherService.id })}
                >
                  <div className="other-service-content">
                    <span className="other-service-badge">{otherService.badge}</span>
                    <h3 className="other-service-title">{otherService.title}</h3>
                    <p className="other-service-description">
                      {otherService.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="service-cta">
        <h2>Intéressé par ce service ?</h2>
        <p>Discutons de votre projet et trouvons la meilleure approche ensemble.</p>
        <Link to="/contact" className="btn-secondary" onClick={() => trackEvent('service_detail_cta_click', { service_id: service.id })}>
          Prendre contact
        </Link>
      </section>
    </div>
  );
}