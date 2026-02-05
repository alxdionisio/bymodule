// Compatible Vite (browser) and Node (scripts): resolve BASE_URL safely
const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL)
  || process.env.BASE_URL
  || process.env.VITE_BASE_URL
  || '/';

export const projectsData = {
  'ecommerce-edition': {
    id: 'ecommerce-edition',
    category: 'ecommerce',
    badge: 'E-commerce',
    title: 'Boutique en ligne\nMaison d\'édition',
    subtitle: 'Passage d\'un écosystème éclaté à une plateforme unique "portfolio + e-commerce" sous Shopify Hydrogen, pensée pour vendre et valoriser le catalogue.',
    meta: {
      client: 'Maison d\'édition indépendante',
      durée: '9 mois',
      année: '2025',
      industry: '📚 Édition'
    },
    link: 'https://gallmeister.fr/',
    media: [
      { src: `${BASE_URL}images/Gallmeister-BookCard-desktop.png`, alt: 'Gallmeister — Book card (desktop)' },
      { src: `${BASE_URL}images/Gallmeister-modale achat-desktop.png`, alt: 'Gallmeister — Modale achat (desktop)' },
      { src: `${BASE_URL}images/Gallmeister-Totem-desktop.png`, alt: 'Gallmeister — Totem (desktop)' }
    ],
    overview: 'À l\'origine, l\'éditeur ne disposait pas de boutique en ligne et gérait plusieurs sites distincts (institutionnel, collections, auteurs). La stratégie a consisté à regrouper ces présences et à centraliser plus de 700 titres au sein d\'un seul site faisant à la fois office de vitrine (portfolio) et de boutique e‑commerce.',
    challenge: 'La maison d\'édition ne disposait initialement d\'aucune boutique en ligne et gérait un catalogue de plus de 700 références réparties sur plusieurs sites, avec des variantes complexes (formats, éditions, langues). Les plateformes existantes étaient lentes et peu adaptées au mobile, entraînant un fort taux de rebond.',
    solution: 'Mise en place d\'une architecture headless avec Shopify Hydrogen et React pour des performances élevées, migration et normalisation de plus de 700 titres, et unification des contenus (collections, auteurs). Implémentation d\'un moteur de recherche et de filtres avancés, de fiches livres enrichies (extraits, métadonnées).',
    techStack: {
      'Frontend': ['React', 'Shopify Hydrogen', 'TypeScript', 'Tailwind CSS'],
      'Backend & CMS': ['Shopify', 'API REST', 'Headless CMS']
    },
    tags: ['Shopify', 'Shopify Hydrogen', 'React', 'Headless CMS', 'TypeScript', 'Tailwind CSS'],
    features: [
      { title: 'Recherche avancée', desc: 'Système de recherche intelligent avec filtres par genre, auteur, collection, format et prix. Résultats instantanés avec debouncing.' },
      { title: 'Mobile optimisé', desc: 'Interface responsive avec navigation simplifiée et processus d\'achat optimisé pour mobile. Performance scores >90/100. Le design system a été complètement revu et amélioré.' },
      { title: 'Pages enrichies', desc: 'Fiches produits détaillées avec extraits, biographie auteur, recommandations personnalisées et avis partenaires intégrés.' },
      { title: 'Tunnel d’achat optimisé', desc: 'Parcours simple et fluide, achat de livres imprimés et numériques (ebook) en quelques étapes, paiement sécurisé.' }
    ],
    kpis: [
      { value: '700+', label: 'Titres migrés', desc: 'Catalogue centralisé et normalisé sur une même plateforme' },
      { value: '0→22%', label: 'Ventes en ligne', desc: 'Part des ventes réalisées via l’e‑commerce en 6 mois' },
      { value: '+48%', label: 'Conversion', desc: 'Tunnel d’achat simplifié (livres imprimés & ebooks)' }
    ]
  },

  'app-restaurant': {
    id: 'app-restaurant',
    category: 'mobile',
    badge: 'Application',
    title: 'App de réservation\nRestaurant',
    subtitle: 'Application mobile complète pour la réservation en ligne et la gestion d\'informations pour un groupe de restaurants locaux.',
    meta: {
      client: 'Groupe de restaurateurs',
      durée: '3 mois',
      année: '2025',
      industry: '🍽️ Restauration'
    },
    link: '',
    media: [
      { src: `${BASE_URL}images/Spot%20-%20Screenshot%20-%20iPhone%2017%20-%202026-02-05%20at%2023.21.35.png`, alt: 'Spot — iPhone 17 screenshot (23:21:35)' },
      { src: `${BASE_URL}images/Spot%20-%20Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-02-05%20at%2023.21.27.png`, alt: 'Spot — iPhone 17 simulator (23:21:27)' },
      { src: `${BASE_URL}images/Spot%20-%20Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-02-05%20at%2023.21.39.png`, alt: 'Spot — iPhone 17 simulator (23:21:39)' },
      { src: `${BASE_URL}images/Spot%20-%20Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-02-05%20at%2023.21.44.png`, alt: 'Spot — iPhone 17 simulator (23:21:44)' },
      { src: `${BASE_URL}images/Spot%20-%20Simulator%20Screenshot%20-%20iPhone%2017%20-%202026-02-05%20at%2023.21.49.png`, alt: 'Spot — iPhone 17 simulator (23:21:49)' }
    ],
    overview: 'Développement d\'une application mobile native permettant aux clients de découvrir les restaurants du groupe, consulter les menus, réserver une table et gérer leurs réservations. Interface intuitive avec géolocalisation et notifications push.',
    challenge: 'Le groupe gérait les réservations manuellement par téléphone, causant des erreurs de planning, des doubles réservations et une perte de temps considérable pour le personnel. Aucune visibilité sur les préférences clients.',
    solution: 'Application React Native avec backend API REST, système de réservation en temps réel, gestion des disponibilités automatisée et profils clients enrichis. Tableau de bord pour les gérants permettant de gérer les réservations et analyser les données.',
    techStack: {
      'Mobile': ['React Native', 'TypeScript'],
      'Backend': ['Node.js', 'API REST']
    },
    tags: ['React Native', 'Node.js', 'TypeScript', 'API REST', 'UI/UX'],
    features: [
      { title: 'Géolocalisation', desc: 'Localisation automatique, affichage des restaurants à proximité et navigation GPS intégrée.' },
      { title: 'Réservation intelligente', desc: 'Sélection date/heure, choix du nombre de convives, disponibilité en temps réel et confirmation instantanée.' },
      { title: 'Notifications push', desc: 'Rappels de réservation, offres spéciales, nouveaux menus et communication ciblée avec les clients.' },
      { title: 'Profil personnalisé', desc: 'Historique des visites, restaurants favoris, préférences alimentaires et programme de fidélité.' }
    ],
    kpis: [
      { value: '2500+', label: 'Téléchargements', desc: 'En 3 mois avec taux de rétention de 68%' },
      { value: '-70%', label: 'Appels entrants', desc: 'Réduction drastique des appels pour réservation' },
      { value: '85%', label: 'Satisfaction', desc: 'Note moyenne de 4.3/5 sur les stores' }
    ]
  },

  'automation-bakery': {
    id: 'automation-bakery',
    category: 'automation',
    badge: 'Automatisation',
    title: 'Production automatisée\nBoulangerie',
    subtitle: 'Intégration ERP, workflow de commandes automatisé et génération de plans de production pour optimiser un atelier de boulangerie.',
    meta: {
      client: 'Atelier de boulangerie artisanale',
      durée: '5 mois',
      année: '2025',
      industry: '🥖 Boulangerie'
    },
    link: '',
    media: [
      { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup dashboard 1' },
      { src: 'https://images.unsplash.com/photo-1523475496153-3d6cc0f0f6d4?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup workflow 2' },
      { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup ERP 3' }
    ],
    overview: 'Mise en place d\'un système complet d\'automatisation des processus de production, de la réception des commandes à la génération des plans de fabrication, en intégrant l\'ERP existant et les outils de gestion commerciale.',
    challenge: 'L\'atelier recevait des commandes via multiples canaux (email, téléphone, formulaires web), nécessitant une saisie manuelle dans l\'ERP. La génération des plans de production prenait plusieurs heures chaque jour et les erreurs étaient fréquentes.',
    solution: 'Création d\'un portail de commandes centralisé, intégration bidirectionnelle avec l\'ERP via API, automatisation de la génération des plans de production basée sur les stocks, les capacités et les délais. Dashboard temps réel pour le suivi.',
    techStack: {
      'Backend': ['PHP', 'MySQL'],
      'Intégrations': ['API REST', 'n8n']
    },
    tags: ['PHP', 'n8n', 'API REST', 'MySQL'],
    features: [
      { title: 'Portail unifié', desc: 'Interface unique pour tous les clients avec validation automatique, calcul de prix et confirmation instantanée.' },
      { title: 'Synchronisation ERP', desc: 'Intégration bidirectionnelle temps réel avec l\'ERP pour la gestion commerciale, comptable et des stocks.' },
      { title: 'Plans auto', desc: 'Génération automatique des plannings de production optimisés selon les contraintes et les priorités.' },
      { title: 'Notifications', desc: 'Alertes automatiques pour les ruptures de stock, retards potentiels et optimisations suggérées.' }
    ],
    kpis: [
      { value: '-90%', label: 'Temps de saisie', desc: 'Réduction de 4h à 20min par jour' },
      { value: '-95%', label: 'Erreurs', desc: 'Quasi-élimination des erreurs de production' },
      { value: '+35%', label: 'Capacité', desc: 'Augmentation grâce à l\'optimisation' }
    ]
  },

  'travel-agency': {
    id: 'travel-agency',
    category: 'website',
    badge: 'Site Vitrine',
    title: 'Agence de voyages',
    subtitle: 'Site institutionnel moderne avec catalogue de destinations, système de recherche et formulaires de contact personnalisés.',
    meta: {
      client: 'Agence de voyages locale',
      durée: '2 mois',
      année: '2025',
      industry: '✈️ Tourisme'
    },
    link: '',
    media: [
      { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup voyage 1' },
      { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup voyage 2' },
      { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup voyage 3' }
    ],
    overview: 'Création d\'un site vitrine premium pour présenter les destinations, circuits et services d\'une agence de voyages. Focus sur l\'expérience visuelle et la facilité de navigation avec galeries photo immersives.',
    challenge: 'L\'agence perdait des clients face à la concurrence en ligne. Le site existant était obsolète, peu attractif et ne reflétait pas la qualité des voyages proposés.',
    solution: 'Site moderne avec galeries photo immersives, présentation détaillée des destinations, système de recherche avancée et formulaires de contact intelligents avec qualification automatique des demandes.',
    techStack: {
      'Frontend': ['React', 'Tailwind CSS'],
      'Backend': ['Strapi', 'Headless CMS']
    },
    tags: ['React', 'Strapi', 'Tailwind CSS', 'Headless CMS'],
    features: [
      { title: 'Catalogue destinations', desc: 'Présentation riche avec galeries photos, itinéraires détaillés, tarifs et disponibilités en temps réel.' },
      { title: 'Recherche multicritères', desc: 'Filtres par destination, budget, durée, type de voyage et période pour trouver le séjour idéal.' },
      { title: 'Devis personnalisés', desc: 'Formulaires intelligents avec qualification des besoins et génération automatique de devis préliminaires.' },
      { title: 'Expérience immersive', desc: 'Design moderne avec animations fluides, galeries interactives et optimisation mobile parfaite.' }
    ],
    kpis: [
      { value: '+180%', label: 'Demandes', desc: 'Triplement des demandes de devis' },
      { value: '4.2min', label: 'Temps de visite', desc: 'Engagement élevé témoignant de la qualité' },
      { value: '92/100', label: 'Performance', desc: 'Score Lighthouse excellent' }
    ]
  },

  'political-campaign': {
    id: 'political-campaign',
    category: 'website',
    badge: 'Institutionnel',
    title: 'Campagne municipale',
    subtitle: 'Plateforme de campagne avec programme détaillé, blog d\'actualités et outils de mobilisation citoyenne.',
    meta: {
      client: 'Candidat municipal',
      durée: '2 mois',
      année: '2026',
      industry: '🏛️ Politique'
    },
    link: 'https://campagne-municipale.example.com',
    media: [
      { src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup campagne 1' },
      { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup campagne 2' }
    ],
    overview: 'Site de campagne électorale complet avec présentation du programme politique, actualités de campagne et outils d\'engagement citoyen.',
    challenge: 'Besoin de communiquer rapidement sur les propositions et mobiliser les citoyens dans un temps limité avant les élections.',
    solution: 'Site Next.js avec CMS pour publication rapide d\'actualités, section programme interactive et formulaires d\'engagement des bénévoles.',
    techStack: {
      'Frontend': ['Next.js', 'React', 'Tailwind CSS'],
      'Backend': ['Strapi', 'Node.js', 'Headless CMS']
    },
    tags: ['Next.js', 'React', 'Strapi', 'Node.js', 'Tailwind CSS', 'Headless CMS'],
    features: [
      { title: 'Programme interactif', desc: 'Présentation claire du programme avec navigation par thématique et recherche de propositions.' },
      { title: 'Blog d\'actualités', desc: 'Publication rapide d\'articles, événements et communiqués de campagne avec partage social.' },
      { title: 'Mobilisation', desc: 'Formulaires de contact, inscription bénévoles et organisation d\'événements de campagne.' },
      { title: 'SEO local', desc: 'Optimisation pour les recherches locales et visibilité sur les moteurs de recherche.' }
    ],
    kpis: [
      { value: '500+', label: 'Bénévoles', desc: 'Inscrits via le site' },
      { value: '15k', label: 'Visiteurs uniques', desc: 'Durant la campagne' },
      { value: '3min', label: 'Temps moyen', desc: 'Consultation du programme' }
    ]
  },

  'recipe-website': {
    id: 'recipe-website',
    category: 'website',
    badge: 'Contenu',
    title: 'Plateforme de recettes',
    subtitle: 'Site de recettes avec CMS headless Strapi, recherche avancée par ingrédients et système de favoris.',
    meta: {
      client: 'Chef cuisinier',
      durée: '3 mois',
      année: '2026',
      industry: '👨‍🍳 Gastronomie'
    },
    link: '',
    media: [
      { src: `${BASE_URL}images/macuisinesante-homepage.png`, alt: 'MaCuisineSanté — Homepage' },
      { src: `${BASE_URL}images/macuisinesante-detail%20recette.png`, alt: 'MaCuisineSanté — Détail recette' },
      { src: `${BASE_URL}images/macuisinesante-toutes%20les%20recettes.png`, alt: 'MaCuisineSanté — Toutes les recettes' }
    ],
    overview: 'Plateforme de partage de recettes gastronomiques avec recherche avancée, filtres multiples et gestion de favoris personnalisés.',
    challenge: 'Organiser et rendre accessible une large collection de recettes avec recherche intuitive par ingrédients, difficulté et temps de préparation.',
    solution: 'Site React avec Strapi CMS headless pour gestion du contenu, système de recherche full-text et filtrage avancé, profils utilisateurs avec favoris.',
    techStack: {
      'Frontend': ['React', 'TypeScript', 'Tailwind CSS'],
      'Backend': ['Strapi', 'Headless CMS']
    },
    tags: ['React', 'Strapi', 'Headless CMS', 'TypeScript', 'Tailwind CSS'],
    features: [
      { title: 'Recherche intelligente', desc: 'Recherche full-text par nom, ingrédients, tags avec suggestions automatiques.' },
      { title: 'Filtres avancés', desc: 'Filtrage par difficulté, temps de préparation, régime alimentaire et saison.' },
      { title: 'Favoris & notes', desc: 'Système de favoris personnel, notation des recettes et commentaires communautaires.' },
      { title: 'Mode cuisine', desc: 'Interface simplifiée en mode cuisine avec minuteurs intégrés et navigation vocale.' }
    ],
    kpis: [
      { value: '200+', label: 'Recettes', desc: 'Publiées dans la base' },
      { value: '5k', label: 'Utilisateurs', desc: 'Inscrits en 6 mois' },
      { value: '40%', label: 'Engagement', desc: 'Taux de retour mensuel' }
    ]
  },

  'pest-control': {
    id: 'pest-control',
    category: 'website',
    badge: 'Professionnel',
    title: 'Éradication nuisibles',
    subtitle: 'Site professionnel avec système de prise de rendez-vous et optimisation SEO local pour artisan.',
    meta: {
      client: 'Artisan éradication',
      durée: '1.5 mois',
      année: '2025',
      industry: '🏠 Services'
    },
    link: '',
    media: [
      { src: `${BASE_URL}images/ActionNuisibles13-homepage.png`, alt: 'Action Nuisibles 13 — Homepage' },
      { src: `${BASE_URL}images/ActionNuisibles13-contact.png`, alt: 'Action Nuisibles 13 — Contact' },
      { src: `${BASE_URL}images/ActionNuisibles13-engagements.png`, alt: 'Action Nuisibles 13 — Engagements' },
    ],
    overview: 'Site vitrine professionnel pour artisan spécialisé dans l\'éradication de nuisibles avec prise de rendez-vous en ligne et optimisation SEO local.',
    challenge: 'Améliorer la visibilité locale et faciliter la prise de contact avec automatisation de la gestion des demandes d\'intervention.',
    solution: 'Site WordPress optimisé avec plugin de réservation, fiches services détaillées et stratégie SEO local ciblant les villes d\'intervention.',
    techStack: {
      'Frontend': ['WordPress'],
      'Backend': ['PHP', 'MySQL']
    },
    tags: ['WordPress', 'PHP', 'MySQL'],
    features: [
      { title: 'Réservation en ligne', desc: 'Système de prise de rendez-vous avec sélection du service et estimation tarifaire.' },
      { title: 'Zones d\'intervention', desc: 'Carte interactive des villes et quartiers couverts avec délais d\'intervention.' },
      { title: 'SEO local', desc: 'Optimisation Google My Business et référencement local pour visibilité maximale.' },
      { title: 'Avis clients', desc: 'Intégration et affichage des avis Google pour renforcer la confiance.' }
    ],
    kpis: [
      { value: '+250%', label: 'Demandes', desc: 'Augmentation des demandes d\'intervention' },
      { value: 'Top 3', label: 'Google Local', desc: 'Positionnement sur requêtes locales' },
      { value: '4.8/5', label: 'Note clients', desc: 'Satisfaction moyenne' }
    ]
  },

  'app-studio': {
    id: 'app-studio',
    category: 'studio',
    badge: 'R&D',
    title: 'Studio d\'applications',
    subtitle: 'Framework de création d\'applications mobiles avec templates, automatisation et documentation collaborative.',
    meta: {
      client: 'Projet interne',
      durée: 'En cours',
      année: '2025-2026',
      industry: '🛠️ Innovation'
    },
    link: 'https://studio-apps.example.com',
    media: [
      { src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup studio 1' },
      { src: 'https://images.unsplash.com/photo-1556157381-36b1a7116f6b?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup studio 2' }
    ],
    overview: 'Projet R&D visant à créer un framework de développement d\'applications mobiles avec templates réutilisables, automatisation des processus et documentation partagée.',
    challenge: 'Réduire le temps de développement d\'applications mobiles similaires et capitaliser sur les bonnes pratiques à travers les projets.',
    solution: 'Framework basé sur React Native avec bibliothèque de composants, générateurs de code, templates d\'architecture et documentation automatisée.',
    techStack: {
      'Mobile': ['React Native', 'TypeScript'],
      'Outils': ['Figma']
    },
    tags: ['React Native', 'TypeScript', 'Figma', 'UI/UX'],
    features: [
      { title: 'Bibliothèque composants', desc: 'Collection de composants React Native réutilisables avec variantes et documentation.' },
      { title: 'Templates architecture', desc: 'Structures de projet pré-configurées avec routing, state management et API.' },
      { title: 'Générateurs code', desc: 'CLI pour générer rapidement screens, components et features avec best practices.' },
      { title: 'Documentation auto', desc: 'Documentation technique générée automatiquement et guides de contribution.' }
    ],
    kpis: [
      { value: '-60%', label: 'Temps dev', desc: 'Réduction du temps de développement' },
      { value: '20+', label: 'Composants', desc: 'Dans la bibliothèque' },
      { value: '3', label: 'Apps créées', desc: 'Avec le framework' }
    ]
  }
};

export const getProjectById = (id) => {
  return projectsData[id];
};

export const getAllProjects = () => {
  return Object.values(projectsData);
};

export const getProjectsByCategory = (category) => {
  if (category === 'all') return getAllProjects();
  return Object.values(projectsData).filter(project => project.category === category);
};