import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { trackEvent } from '../lib/analytics';
import { useSEO, useJsonLd, getSiteUrl, useOpenGraph } from '../lib/seo';

export default function Services() {
  useSEO({
    title: "Services — Module",
    description:
      "Stratégie produit, développement web & mobile, automatisation et formation. Des services complets pour réussir vos projets.",
    canonicalPath: "/services",
  });
  useOpenGraph({
    title: "Services — Module",
    description: "Stratégie produit, développement web & mobile, automatisation et formation.",
    path: "/services"
  });
  const siteUrl = getSiteUrl();
  useJsonLd('breadcrumb-services', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` }
    ]
  });

  const [activeTab, setActiveTab] = useState('clients');

  const servicesData = {
    clients: [
      {
        id: 'product-management',
        title: 'Product Management',
        description: 'Accompagnement stratégique pour définir votre vision produit, prioriser les fonctionnalités et maximiser la valeur délivrée.',
        features: [
          'Vision & Stratégie produit',
          'Roadmap & Priorisation',
          'Discovery & User Research',
          'Définition des KPIs',
          'Product-Market Fit'
        ]
      },
      {
        id: 'dev-web',
        title: 'Développement Web',
        description: 'Sites vitrines, e-commerce, applications métier. Technologies modernes pour des produits performants et scalables.',
        features: [
          'Sites vitrine & institutionnels',
          'E-commerce (Shopify, WooCommerce)',
          'Applications web (React, Next.js)',
          'CMS Headless (Strapi, Contentful)',
          'Progressive Web Apps (PWA)'
        ]
      },
      {
        id: 'dev-mobile',
        title: 'Développement Mobile',
        description: 'Applications mobiles natives et cross-platform pour iOS et Android avec expérience utilisateur optimale.',
        features: [
          'Applications React Native',
          'Applications natives Swift',
          'Design & UX mobile',
          'Intégration API',
          'Publication sur les stores'
        ]
      },
      {
        id: 'automation',
        title: 'Automatisation & Intégration',
        description: 'Optimisation de vos processus métier par l\'automatisation et l\'intégration de vos outils existants.',
        features: [
          'Intégration ERP & CRM',
          'Workflows automatisés',
          'API & Webhooks',
          'Gestion commerciale',
          'Reporting automatique'
        ]
      },
      {
        id: 'design',
        title: 'UX/UI Design',
        description: 'Conception d\'interfaces intuitives et esthétiques centrées sur l\'expérience utilisateur.',
        features: [
          'UX Research & Personas',
          'Wireframes & Prototypes',
          'UI Design Figma',
          'Design System',
          'Tests utilisateurs'
        ]
      },
      {
        id: 'maintenance',
        title: 'Maintenance & Support',
        description: 'Accompagnement continu pour faire évoluer votre produit et garantir sa performance dans le temps.',
        features: [
          'Maintenance corrective',
          'Évolutions fonctionnelles',
          'Monitoring & Alertes',
          'Support technique',
          'Optimisation continue'
        ]
      }
    ],
    studio: [
      {
        id: 'mobile-apps',
        title: 'Applications Métier',
        description: 'Conception d\'applications mobiles sur-mesure pour répondre à des besoins métier spécifiques et optimiser vos processus.',
        features: [
          'Apps de réservation (restaurants, services)',
          'Gestion de stock mobile',
          'Outils terrain (BTP, logistique)',
          'CRM & Vente mobile',
          'Suivi production',
          'Apps professionnelles B2B'
        ],
        meta: 'iOS & Android • Sur-mesure'
      },
      {
        id: 'consumer-apps',
        title: 'Applications Grand Public',
        description: 'Développement d\'applications BtoC innovantes : lifestyle, éducation, bien-être, divertissement.',
        features: [
          'Apps recettes & cuisine',
          'Activités pour enfants',
          'Relaxation & méditation',
          'Jeux mobiles',
          'Santé & bien-être',
          'Apps lifestyle'
        ],
        meta: 'BtoC • Freemium/Premium'
      }
    ],
    formation: [
      {
        id: 'product-training',
        title: 'Product Management',
        description: 'Formation complète aux fondamentaux du product management : de la vision stratégique à l\'exécution opérationnelle.',
        features: [
          'Vision & Stratégie produit',
          'Discovery & Validation',
          'Priorisation & Roadmapping',
          'Métriques & Analytics',
          'Collaboration équipe',
          'Outils & Frameworks'
        ],
        meta: '2-3 jours • Tous niveaux'
      },
      {
        id: 'ai-training',
        title: 'IA appliquée au Product',
        description: 'Comment tirer parti de l\'IA générative pour accélérer votre product management et votre workflow de création.',
        features: [
          'Panorama des outils IA',
          'Automatisation discovery',
          'Génération specs & docs',
          'Analyse données avec IA',
          'Prototypage rapide',
          'Cas pratiques'
        ],
        meta: '1-2 jours • Intermédiaire'
      },
      {
        id: 'rapid-deployment',
        title: 'Déploiement rapide en production grâce à l\'IA',
        description: 'Méthodologie complète pour déployer rapidement des produits fiables, sur-mesure et prêts pour la production.',
        features: [
          'Architecture & Stack optimales',
          'CI/CD & Automation',
          'Testing & Qualité',
          'Monitoring production',
          'Security basics',
          'Performance optimization'
        ],
        meta: '3 jours • Tous niveaux • ★ BEST-SELLER',
        bestSeller: true
      },
      {
        id: 'startup-coaching',
        title: 'Accompagnement Start-up',
        description: 'Toolkit entrepreneurial pour valider votre marché et lancer votre produit de manière lean et scalable.',
        features: [
          'Validation problème/solution',
          'MVP & Prototypage',
          'Tests marché & interviews',
          'Go-to-Market strategy',
          'Métriques de traction',
          'Scaling & Growth'
        ],
        meta: '2 jours • Entrepreneurs'
      }
    ]
  };

  const tabs = [
    { id: 'clients', label: 'Projets Clients', count: servicesData.clients.length },
    { id: 'studio', label: 'Studio d\'applications', count: servicesData.studio.length },
    { id: 'formation', label: 'Espace Formation', count: servicesData.formation.length }
  ];

  const activeServices = servicesData[activeTab];

  // ItemList de tous les services (toutes catégories confondues)
  const allServices = [
    ...servicesData.clients,
    ...servicesData.studio,
    ...servicesData.formation
  ];
  useJsonLd('services-itemlist', {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: allServices.length,
    itemListElement: allServices.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: s.title,
      url: `${siteUrl}/service/${s.id}`
    }))
  });

  const handleTabClick = (id, label) => {
    setActiveTab(id);
    trackEvent('services_tab_click', { tab_id: id, tab_label: label });
  };

  return (
    <div className="services-page">
      {/* HERO */}
      <section className="services-hero">
        <div className="hero-content">
          <nav aria-label="Fil d'Ariane" className="breadcrumb">
            <Link to="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Services</span>
          </nav>
          
          <h1 className="hero-title">
            NOS<br />
            SERVICES
          </h1>
          
          <p className="hero-subtitle">
            De la stratégie produit au développement, en passant par la formation : 
            des solutions complètes pour transformer vos ambitions en réalité digitale.
          </p>
        </div>
      </section>

      {/* SERVICES SECTION WITH TABS */}
      <section className="services-section">
        <div className="section-container">
          {/* Tabs Navigation */}
          <div className="tabs-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id, tab.label)}
              >
                <span className="tab-label">{tab.label}</span>
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
            <div 
              className="tab-indicator"
              style={{
                transform: `translateX(${tabs.findIndex(t => t.id === activeTab) * 100}%)`
              }}
            />
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {activeServices.map((service, index) => (
              <Link
                key={service.id}
                to={`/service/${service.id}`}
                className={`service-card ${service.bestSeller ? 'best-seller' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => trackEvent('services_card_click', { id: service.id, title: service.title })}
              >
                <div className="service-content">
                  <div className="service-header">
                    <h3 className="service-title">{service.title}</h3>
                    {service.meta && (
                      <div className="service-meta">{service.meta}</div>
                    )}
                  </div>
                  
                  <p className="service-description">{service.description}</p>
                  
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="service-overlay">
                  <div className="overlay-content">
                    <span className="overlay-text">En savoir plus</span>
                    <span className="overlay-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Prêt à démarrer ?</h2>
          <p>Discutons de vos besoins et trouvons ensemble <br />la meilleure approche pour votre projet.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-cta-large">Prendre contact</Link>
            <Link to="/projets" className="btn-secondary-large">Voir les projets</Link>
          </div>
        </div>
      </section>
    </div>
  );
}