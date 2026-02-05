// DONNÉES COMPLÈTES DES SERVICES - TARIFS AJUSTÉS

const servicesData = {
  'product-management': {
    id: 'product-management',
    title: 'Product Management',
    subtitle: 'Accompagnement stratégique pour définir votre vision produit, prioriser les fonctionnalités et maximiser la valeur délivrée.',
    badge: 'STRATÉGIE',
    category: 'clients',
    meta: {
      durée: '3-6 mois',
      format: 'Accompagnement',
      niveau: 'Tous niveaux'
    },
    overview: 'Le Product Management est au cœur de la réussite de tout produit digital. Nous vous accompagnons dans la définition de votre vision produit, l\'identification des besoins utilisateurs, la priorisation des fonctionnalités et la maximisation de la valeur délivrée. Un accompagnement sur‑mesure pour transformer vos idées en produits à succès.',
    details: [
      {
        title: 'Vision & Stratégie',
        description: 'Définition claire de votre vision produit et stratégie à long terme',
        items: ['Product Vision Board', 'Analyse concurrentielle', 'Positionnement marché', 'OKRs & KPIs']
      },
      {
        title: 'Discovery & Research',
        description: 'Comprendre en profondeur vos utilisateurs et leurs besoins',
        items: ['User interviews', 'Personas & User Journey', 'Problem validation', 'Market research']
      },
      {
        title: 'Roadmap & Priorisation',
        description: 'Planification stratégique et priorisation des initiatives',
        items: ['Product roadmap', 'Frameworks de priorisation', 'Sprint planning', 'Release planning']
      }
    ],
    deliverables: [
      'Product Vision & Strategy',
      'User Research complète',
      'Product Roadmap 12 mois',
      'Documentation produit',
      'Framework de décision',
      'KPIs & Métriques'
    ],
    pricing: [
      { label: 'Audit initial', value: '800€ – 2 500€', description: 'Diagnostic produit complet (offert si engagement)' },
      { label: 'Accompagnement mensuel', value: '2 500€ – 5 500€/mois', description: 'Pilotage produit continu', featured: true },
      { label: 'Sprint stratégie (1–2 sem.)', value: '1 500€ – 3 000€', description: 'Vision, Roadmap, KPIs' }
    ],
    tags: ['Product Management', 'Stratégie', 'UX Research', 'Roadmap'],
    relatedServices: ['dev-web', 'design', 'dev-mobile']
  },
  
  'dev-web': {
    id: 'dev-web',
    title: 'Développement Web',
    subtitle: 'Sites vitrines, e-commerce, applications métier. Technologies modernes pour des produits performants et scalables.',
    badge: 'DÉVELOPPEMENT',
    category: 'clients',
    meta: {
      durée: '2-4 mois',
      format: 'Projet',
      technos: 'React, Next.js, Shopify'
    },
    overview: 'Développement de sites web et applications modernes avec les dernières technologies. De la simple vitrine au e-commerce complexe, je crée des solutions performantes, SEO-friendly et parfaitement adaptées à vos besoins. Une approche sur-mesure pour un résultat professionnel.',
    details: [
      {
        title: 'Sites Vitrine',
        description: 'Sites institutionnels performants et optimisés SEO',
        items: ['Design responsive', 'Optimisation vitesse', 'SEO on-page', 'Analytics intégrés']
      },
      {
        title: 'E-commerce',
        description: 'Boutiques en ligne avec Shopify ou solutions custom',
        items: ['Shopify Hydrogen', 'Paiements sécurisés', 'Gestion catalogue', 'Tunnel optimisé']
      },
      {
        title: 'Applications Web',
        description: 'Applications métier sur-mesure avec React/Next.js',
        items: ['Architecture scalable', 'API REST/GraphQL', 'Dashboard admin', 'Authentication']
      }
    ],
    deliverables: [
      'Code source complet',
      'Documentation technique',
      'Hébergement configuré',
      'Formation admin',
      'Support 3 mois',
      'Optimisation SEO'
    ],
    pricing: [
      { label: 'Site vitrine', value: 'À partir de 3 000€', description: 'Site responsive 4–10 pages' },
      { label: 'E‑commerce', value: 'À partir de 8 000€', description: 'Boutique Shopify/Headless', featured: true },
      { label: 'Application web (MVP)', value: 'À partir de 12 000€', description: 'App métier sur‑mesure' }
    ],
    tags: ['React', 'Next.js', 'Shopify', 'TypeScript', 'SEO'],
    relatedServices: ['product-management', 'design', 'maintenance']
  },

  'dev-mobile': {
    id: 'dev-mobile',
    title: 'Développement Mobile',
    subtitle: 'Applications mobiles natives et cross-platform pour iOS et Android avec expérience utilisateur optimale.',
    badge: 'MOBILE',
    category: 'clients',
    meta: {
      durée: '3-6 mois',
      format: 'Projet',
      technos: 'React Native, Swift'
    },
    overview: 'Création d\'applications mobiles performantes pour iOS et Android. Du prototypage à la publication sur les stores, je vous accompagne dans toutes les étapes. Applications natives Swift pour iOS ou cross-platform avec React Native selon vos besoins.',
    details: [
      {
        title: 'React Native',
        description: 'Applications cross-platform iOS & Android',
        items: ['Code partagé', 'Performance native', 'Updates OTA', 'Stores publishing']
      },
      {
        title: 'Native iOS',
        description: 'Applications natives Swift pour une expérience premium',
        items: ['SwiftUI', 'Performances max', 'APIs système', 'App Store optimization']
      },
      {
        title: 'UX Mobile',
        description: 'Design et expérience utilisateur mobile-first',
        items: ['Prototypes interactifs', 'Design iOS/Android', 'Animations fluides', 'Tests utilisateurs']
      }
    ],
    deliverables: [
      'Application iOS/Android',
      'Code source',
      'Publication stores',
      'Documentation',
      'Formation équipe',
      'Monitoring crashes'
    ],
    pricing: [
      { label: 'MVP mobile', value: 'À partir de 5 000€', description: 'Prototype fonctionnel' },
      { label: 'App complète', value: 'À partir de 20 000€', description: 'Prête production', featured: true },
      { label: 'Maintenance', value: '600€ – 1 200€/mois', description: 'Mises à jour & support' }
    ],
    tags: ['React Native', 'Swift', 'iOS', 'Android', 'Mobile'],
    relatedServices: ['product-management', 'design', 'maintenance']
  },

  'automation': {
    id: 'automation',
    title: 'Automatisation & Intégration',
    subtitle: 'Optimisation de vos processus métier par l\'automatisation et l\'intégration de vos outils existants.',
    badge: 'AUTOMATISATION',
    category: 'clients',
    meta: {
      durée: '1-3 mois',
      format: 'Mission',
      outils: 'Zapier, Make, n8n, API'
    },
    overview: 'Automatisez vos tâches répétitives et connectez vos outils pour gagner en productivité. De l\'intégration ERP/CRM aux workflows automatisés, je crée des solutions sur-mesure qui vous font économiser du temps et réduisent les erreurs.',
    details: [
      {
        title: 'Intégrations',
        description: 'Connexion de vos outils existants (ERP, CRM, etc.)',
        items: ['APIs REST/SOAP', 'Webhooks', 'Sync bidirectionnelle', 'Data mapping']
      },
      {
        title: 'Workflows',
        description: 'Automatisation de processus métier complexes',
        items: ['Zapier/Make/n8n', 'Déclencheurs custom', 'Conditions logiques', 'Notifications auto']
      },
      {
        title: 'Reporting',
        description: 'Tableaux de bord et reporting automatisé',
        items: ['Dashboard temps réel', 'Exports automatiques', 'Alertes KPIs', 'Analytics']
      }
    ],
    deliverables: [
      'Workflows configurés',
      'Intégrations testées',
      'Documentation process',
      'Formation équipe',
      'Support 2 mois'
    ],
    pricing: [
      { label: 'Audit', value: '800€ – 2 500€', description: 'Cartographie & quick wins (offert si engagement)' },
      { label: 'Automatisation', value: '2 000€ – 8 000€', description: 'Workflows Make/Zapier/n8n/Airtable + APIs', featured: true },
      { label: 'Intégration ERP/CRM', value: 'Sur devis', description: 'Connecteurs & data sync avancés' }
    ],
    tags: ['Zapier', 'Make', 'n8n', 'API REST', 'Automatisation'],
    relatedServices: ['dev-web', 'maintenance']
  },

  'design': {
    id: 'design',
    title: 'UX/UI Design',
    subtitle: 'Conception d\'interfaces intuitives et esthétiques centrées sur l\'expérience utilisateur.',
    badge: 'DESIGN',
    category: 'clients',
    meta: {
      durée: '2-4 semaines',
      format: 'Sprint',
      outils: 'Figma'
    },
    overview: 'Design d\'interfaces utilisateur modernes et intuitives. De la recherche utilisateur au design system complet, je crée des expériences qui convertissent. Approche centrée utilisateur et tests itératifs pour des résultats optimaux.',
    details: [
      {
        title: 'UX Research',
        description: 'Comprendre vos utilisateurs en profondeur',
        items: ['User interviews', 'Personas', 'User journeys', 'Wireframes']
      },
      {
        title: 'UI Design',
        description: 'Interfaces modernes et esthétiques',
        items: ['Maquettes Figma', 'Prototypes interactifs', 'Design responsive', 'Micro-interactions']
      },
      {
        title: 'Design System',
        description: 'Système de design cohérent et scalable',
        items: ['Composants réutilisables', 'Tokens design', 'Guidelines', 'Documentation']
      }
    ],
    deliverables: [
      'Fichiers Figma',
      'Prototypes cliquables',
      'Design system',
      'Guidelines UI/UX',
      'Assets exportés',
      'Specs développeurs'
    ],
    pricing: [
      { label: 'Audit UX', value: '800€ – 2 500€', description: 'Évaluation + plan d’actions' },
      { label: 'Design complet', value: '2 000€ – 6 000€', description: 'Maquettes + prototypes', featured: true },
      { label: 'Design System', value: '5 000€ – 12 000€', description: 'Bibliothèque & guidelines' }
    ],
    tags: ['Figma', 'UI/UX', 'Design System', 'Prototypage'],
    relatedServices: ['dev-web', 'dev-mobile', 'product-management']
  },

  'maintenance': {
    id: 'maintenance',
    title: 'Maintenance & Support',
    subtitle: 'Accompagnement continu pour faire évoluer votre produit et garantir sa performance dans le temps.',
    badge: 'SUPPORT',
    category: 'clients',
    meta: {
      durée: 'Récurrent',
      format: 'Abonnement',
      sla: 'Garanti'
    },
    overview: 'Votre produit mérite un suivi professionnel. Maintenance corrective, évolutions fonctionnelles, monitoring et support technique. Nous veillons sur votre application pour que vous puissiez vous concentrer sur votre activité.',
    details: [
      {
        title: 'Maintenance Corrective',
        description: 'Résolution rapide des bugs et incidents',
        items: ['Hotfixes', 'Bug tracking', 'Tests régression', 'SLA garanti']
      },
      {
        title: 'Évolutions',
        description: 'Nouvelles fonctionnalités et améliorations',
        items: ['Features requests', 'Optimisations', 'Refactoring', 'Updates technos']
      },
      {
        title: 'Monitoring',
        description: 'Surveillance proactive et optimisation',
        items: ['Uptime monitoring', 'Performance', 'Logs & alertes', 'Backups auto']
      }
    ],
    deliverables: [
      'Corrections illimitées',
      'Updates sécurité',
      'Rapport mensuel',
      'Hotline prioritaire',
      'Backups quotidiens',
      'Optimisations continues'
    ],
    pricing: [
      { label: 'Essentiel', value: '350€ – 600€/mois', description: 'Monitoring + correctifs' },
      { label: 'Business', value: '900€ – 1 500€/mois', description: 'Évolutions incluses', featured: true },
      { label: 'Enterprise', value: 'Sur devis', description: 'SLA & support 24/7' }
    ],
    tags: ['Maintenance', 'Support', 'Monitoring', 'DevOps'],
    relatedServices: ['dev-web', 'dev-mobile', 'automation']
  },

  'mobile-apps': {
    id: 'mobile-apps',
    title: 'Applications Métier',
    subtitle: 'Le studio conçoit des applications mobiles métier innovantes. Collaboration possible pour adapter nos solutions à vos besoins spécifiques.',
    badge: 'STUDIO',
    category: 'studio',
    meta: {
      activité: 'Développement interne',
      collaboration: 'Partenariat possible',
      approche: 'Sur-mesure'
    },
    overview: 'Le studio développe ses propres applications mobiles métier : réservation, gestion, suivi d\'activité. Ces solutions peuvent être adaptées à votre contexte professionnel dans le cadre d\'un partenariat sur-mesure. Discussion préalable indispensable pour évaluer la faisabilité et l\'adéquation.',
    details: [
      {
        title: 'Applications développées',
        description: 'Exemples de solutions métier en développement',
        items: ['Systèmes de réservation (restaurants, services)', 'Gestion de stock & inventaire mobile', 'Outils terrain (BTP, logistique)', 'CRM & Vente mobile', 'Suivi de production en temps réel']
      },
      {
        title: 'Collaboration possible',
        description: 'Comment travailler avec le studio',
        items: ['Adaptation d\'une solution existante', 'Co-développement sur-mesure', 'White label de nos technologies', 'Partenariat stratégique', 'Licence avec personnalisation']
      },
      {
        title: 'Notre approche',
        description: 'Méthodologie de collaboration',
        items: ['Discussion préalable approfondie', 'Évaluation de faisabilité', 'Proposition de MVP adapté', 'Développement itératif', 'Support post-lancement']
      }
    ],
    deliverables: [
      'Solution adaptée à vos besoins',
      'Code source (selon accord)',
      'Documentation technique',
      'Formation utilisateurs',
      'Support dédié',
      'Évolutions continues'
    ],
    pricing: [
      { label: 'Discussion préalable', value: 'Gratuite', description: 'Évaluation faisabilité & adéquation' },
      { label: 'MVP Sur-mesure', value: 'Sur devis', description: 'Après discussions approfondies', featured: true },
      { label: 'Partenariat', value: 'À définir', description: 'Selon modalités de collaboration' }
    ],
    tags: ['React Native', 'Swift', 'Kotlin', 'Studio', 'Métier', 'Collaboration'],
    relatedServices: ['dev-mobile', 'product-management', 'design']
  },

  'consumer-apps': {
    id: 'consumer-apps',
    title: 'Applications Grand Public',
    subtitle: 'Le studio développe des applications BtoC innovantes. Partenariat possible pour co-créer des solutions lifestyle adaptées à votre marché.',
    badge: 'STUDIO',
    category: 'studio',
    meta: {
      activité: 'Développement interne',
      audience: 'Grand public BtoC',
      modèle: 'White label possible'
    },
    overview: 'Le studio crée ses propres applications grand public : recettes de cuisine, activités pour enfants, relaxation, jeux mobiles. Ces apps peuvent être déclinées en white label ou adaptées dans le cadre d\'un partenariat. Échanges préalables nécessaires pour définir les modalités de collaboration.',
    details: [
      {
        title: 'Apps en développement',
        description: 'Portfolio d\'applications BtoC du studio',
        items: ['Applications de recettes & cuisine', 'Activités créatives pour enfants', 'Sons blancs & relaxation', 'Jeux mobiles casual', 'Santé & bien-être', 'Lifestyle & quotidien']
      },
      {
        title: 'Opportunités de collaboration',
        description: 'Comment adapter nos solutions',
        items: ['White label de nos apps', 'Personnalisation marque', 'Adaptation contenu spécifique', 'Co-création nouvelle app', 'Licence technologie']
      },
      {
        title: 'Process de collaboration',
        description: 'Étapes pour travailler ensemble',
        items: ['Échange initial gratuit', 'Présentation portfolio apps', 'Définition besoins & budget', 'Proposition MVP adapté', 'Développement sur-mesure']
      }
    ],
    deliverables: [
      'Application personnalisée',
      'Design adapté à votre marque',
      'Publication stores assurée',
      'Kit marketing fourni',
      'Analytics configurés',
      'Support & évolutions'
    ],
    pricing: [
      { label: 'Échange initial', value: 'Gratuit', description: 'Présentation solutions & faisabilité' },
      { label: 'White Label', value: 'Sur devis', description: 'Licence + personnalisation', featured: true },
      { label: 'Co-création', value: 'À définir', description: 'Partenariat sur-mesure complet' }
    ],
    tags: ['BtoC', 'Lifestyle', 'Enfants', 'Bien-être', 'Studio', 'White Label'],
    relatedServices: ['dev-mobile', 'design', 'product-management']
  },

  'saas-platform': {
    id: 'saas-platform',
    title: 'Plateformes SaaS',
    subtitle: 'Conception et développement de solutions SaaS multi-tenant scalables avec modèles d\'abonnement.',
    badge: 'STUDIO',
    category: 'studio',
    meta: {
      modèle: 'SaaS B2B/B2C',
      architecture: 'Multi-tenant',
      billing: 'Abonnements récurrents'
    },
    overview: 'Développement de plateformes SaaS complètes, de l\'architecture technique à la gestion des abonnements. Expertise en systèmes multi-tenant, billing automatisé et analytics avancés. Des solutions pensées pour scaler.',
    details: [
      {
        title: 'Architecture',
        description: 'Infrastructure robuste et scalable',
        items: ['Multi-tenant', 'API-first design', 'Microservices', 'Cloud infrastructure']
      },
      {
        title: 'Fonctionnalités',
        description: 'Features essentielles pour SaaS',
        items: ['Gestion utilisateurs', 'Permissions granulaires', 'Team collaboration', 'White labeling']
      },
      {
        title: 'Business',
        description: 'Monétisation et croissance',
        items: ['Plans tarifaires', 'Billing automatisé', 'Analytics MRR/ARR', 'Churn analysis']
      }
    ],
    deliverables: [
      'Plateforme complète',
      'Dashboard analytics',
      'Billing intégré',
      'APIs documentées',
      'Onboarding users',
      'Support infrastructure'
    ],
    pricing: [
      { label: 'Co-création', value: 'Equity', description: 'Partenariat stratégique' },
      { label: 'MVP SaaS', value: '35 000€', description: 'Plateforme MVP fonctionnelle', featured: true },
      { label: 'Enterprise', value: 'Sur devis', description: 'Solution sur-mesure complète' }
    ],
    tags: ['SaaS', 'Multi-tenant', 'API', 'Billing', 'Analytics'],
    relatedServices: ['dev-web', 'product-management', 'automation']
  },

  'marketplace': {
    id: 'marketplace',
    title: 'Marketplaces',
    subtitle: 'Création de plateformes marketplace connectant acheteurs et vendeurs avec gestion complète des transactions.',
    badge: 'STUDIO',
    category: 'studio',
    meta: {
      modèle: 'Two-sided marketplace',
      paiement: 'Escrow & split payments',
      commission: 'Modèle configurable'
    },
    overview: 'Développement de marketplaces B2C, B2B ou C2C. Double interface vendeur/acheteur, gestion des transactions sécurisées, système de notation et commission automatisée. L\'infrastructure complète pour lancer votre marketplace.',
    details: [
      {
        title: 'Double Interface',
        description: 'Expériences optimisées pour acheteurs et vendeurs',
        items: ['Dashboard vendeur', 'Catalogue produits', 'Interface achat', 'Messagerie intégrée']
      },
      {
        title: 'Transactions',
        description: 'Paiements sécurisés et gestion financière',
        items: ['Stripe Connect', 'Escrow payments', 'Split automatique', 'Facturation auto']
      },
      {
        title: 'Confiance',
        description: 'Système de notation et modération',
        items: ['Reviews & ratings', 'Modération contenu', 'Vérification vendeurs', 'Dispute resolution']
      }
    ],
    deliverables: [
      'Marketplace complète',
      'Paiements configurés',
      'Dashboard analytics',
      'Modération tools',
      'Commission engine',
      'Support intégré'
    ],
    pricing: [
      { label: 'MVP Marketplace', value: 'À partir de 40 000€', description: 'Version initiale fonctionnelle' },
      { label: 'Plateforme Complète', value: 'À partir de 75 000€', description: 'Toutes fonctionnalités', featured: true },
      { label: 'White Label', value: 'Sur devis', description: 'Licence complète personnalisable' }
    ],
    tags: ['Marketplace', 'E-commerce', 'Paiements', 'Commission', 'Rating'],
    relatedServices: ['dev-web', 'product-management', 'saas-platform']
  },

  'ai-tools': {
    id: 'ai-tools',
    title: 'Outils IA & Automation',
    subtitle: 'Applications intelligentes intégrant l\'IA pour automatiser et optimiser vos processus métier.',
    badge: 'STUDIO',
    category: 'studio',
    meta: {
      technologies: 'GPT, Claude, Computer Vision',
      domaines: 'NLP, ML, Automation',
      intégration: 'API-first'
    },
    overview: 'Développement d\'outils et applications intégrant l\'intelligence artificielle. De l\'automatisation de tâches répétitives à l\'analyse de données complexes, je crée des solutions IA pratiques et rentables pour les entreprises.',
    details: [
      {
        title: 'IA Générative',
        description: 'Intégration GPT, Claude et autres LLMs',
        items: ['Chatbots intelligents', 'Génération contenu', 'Assistants virtuels', 'Fine-tuning models']
      },
      {
        title: 'Computer Vision',
        description: 'Analyse et traitement d\'images',
        items: ['Object detection', 'OCR avancé', 'Classification images', 'Quality control']
      },
      {
        title: 'Workflows IA',
        description: 'Automatisation intelligente de processus',
        items: ['Document processing', 'Data extraction', 'Décisions automatisées', 'Predictive analytics']
      }
    ],
    deliverables: [
      'Outil IA fonctionnel',
      'APIs intégrées',
      'Dashboard contrôle',
      'Documentation',
      'Training données',
      'Monitoring continu'
    ],
    pricing: [
      { label: 'PoC', value: '8 000€', description: 'Proof of concept validé' },
      { label: 'Solution IA', value: '22 000€', description: 'Outil production complet', featured: true },
      { label: 'Enterprise', value: 'Sur devis', description: 'Training custom + scale' }
    ],
    tags: ['IA', 'GPT', 'Machine Learning', 'Automation', 'NLP'],
    relatedServices: ['automation', 'dev-web', 'saas-platform']
  },

  'product-training': {
    id: 'product-training',
    title: 'Formation Product Management',
    subtitle: 'Formation complète aux fondamentaux du product management : de la vision stratégique à l\'exécution opérationnelle.',
    badge: 'FORMATION',
    category: 'formation',
    meta: {
      durée: '2-3 jours',
      niveau: 'Tous niveaux',
      format: 'Présentiel ou distanciel'
    },
    overview: 'Formation intensive aux méthodes et outils du product management moderne. De la définition de vision produit à l\'exécution opérationnelle, acquérez les compétences essentielles pour piloter efficacement vos produits digitaux.',
    details: [
      {
        title: 'Jour 1: Vision & Stratégie',
        description: 'Fondamentaux et vision produit',
        items: ['Rôle du PM', 'Product Vision Board', 'OKRs & KPIs', 'Stratégie produit']
      },
      {
        title: 'Jour 2: Discovery & Delivery',
        description: 'Recherche utilisateur et priorisation',
        items: ['User research', 'Priorisation (RICE, MoSCoW)', 'Roadmapping', 'Sprint planning']
      },
      {
        title: 'Jour 3: Mesure & Iteration',
        description: 'Métriques et amélioration continue',
        items: ['Analytics & metrics', 'A/B testing', 'Feedback loops', 'Product-market fit']
      }
    ],
    deliverables: [
      'Support de formation',
      'Templates & frameworks',
      'Exercices pratiques',
      'Études de cas',
      'Certificat formation',
      'Suivi 1 mois'
    ],
    pricing: [
      { label: 'Inter-entreprises', value: '1 200€', description: 'Par participant' },
      { label: 'Intra-entreprise', value: '3 500€', description: 'Jusqu\'à 10 personnes', featured: true },
      { label: 'Sur-mesure', value: 'Sur devis', description: 'Programme adapté à vos besoins' }
    ],
    tags: ['Formation', 'Product Management', 'Stratégie', 'Workshop'],
    relatedServices: ['product-management', 'ai-training', 'launch-training']
  },

  'ai-training': {
    id: 'ai-training',
    title: 'Formation IA appliquée au Product',
    subtitle: 'Comment tirer parti de l\'IA générative pour accélérer votre product management et votre workflow de création.',
    badge: 'FORMATION',
    category: 'formation',
    meta: {
      durée: '1-2 jours',
      niveau: 'Intermédiaire',
      outils: 'GPT, Claude, Midjourney'
    },
    overview: 'Formation pratique sur l\'utilisation de l\'IA générative dans le product management. Découvrez comment automatiser vos tâches répétitives, accélérer la création de contenu et améliorer vos prises de décision grâce à l\'IA.',
    details: [
      {
        title: 'Panorama IA',
        description: 'État des lieux et outils disponibles',
        items: ['LLMs (GPT, Claude)', 'Génération d\'images', 'Outils no-code', 'Use cases PM']
      },
      {
        title: 'Automatisation PM',
        description: 'IA pour product managers',
        items: ['Génération user stories', 'Research synthesis', 'Specs techniques', 'Data analysis']
      },
      {
        title: 'Prototypage Rapide',
        description: 'Accélérer création et validation',
        items: ['Maquettes IA', 'Copy generation', 'A/B test ideas', 'Customer insights']
      }
    ],
    deliverables: [
      'Prompts library',
      'Workflows IA',
      'Outils sélectionnés',
      'Cas d\'usage réels',
      'Templates prêts',
      'Accès communauté'
    ],
    pricing: [
      { label: 'Workshop', value: '800€', description: 'Session 1 jour intensive' },
      { label: 'Formation Complète', value: '1 600€', description: '2 jours + suivi personnalisé', featured: true },
      { label: 'Entreprise', value: 'Sur devis', description: 'Groupe + cas d\'usage métier' }
    ],
    tags: ['Formation', 'IA', 'ChatGPT', 'Automation', 'Product'],
    relatedServices: ['product-training', 'ai-tools', 'automation']
  },

  'rapid-deployment': {
    id: 'rapid-deployment',
    title: 'Déploiement rapide en production grâce à l\'IA',
    subtitle: 'Méthodologie complète pour déployer rapidement des produits fiables, sur-mesure et prêts pour la production.',
    badge: 'FORMATION',
    category: 'formation',
    bestSeller: true,
    meta: {
      durée: '3 jours',
      niveau: 'Tous niveaux',
      format: 'Intensif présentiel/distanciel'
    },
    overview: 'Formation premium pour maîtriser l\'art du déploiement rapide de produits en production grâce à des solutions d\'IA. Apprenez à construire, tester et déployer des solutions robustes en un temps record, sans compromis sur la qualité. Méthodologie éprouvée sur +50 projets.',
    details: [
      {
        title: 'Architecture & Stack',
        description: 'Choisir les bonnes technologies pour aller vite',
        items: ['Stack decisions', 'Architecture modulaire', 'Services managed', 'Infrastructure as Code']
      },
      {
        title: 'MVP to Production',
        description: 'De l\'idée au déploiement en quelques semaines',
        items: ['Scope minimal viable', 'CI/CD setup', 'Testing automatisé', 'Monitoring production']
      },
      {
        title: 'Qualité & Fiabilité',
        description: 'Déployer vite sans sacrifier la qualité',
        items: ['Best practices code', 'Error handling', 'Performance optimization', 'Security basics']
      }
    ],
    deliverables: [
      'Playbook déploiement',
      'Templates architectures',
      'Checklist qualité',
      'Scripts automation',
      'Accès repo exemples',
      'Mentorat 3 mois'
    ],
    pricing: [
      { label: 'Individuel', value: '2 400€', description: 'Entrepreneur ou freelance' },
      { label: 'Équipe de builders', value: '6 500€', description: 'Jusqu\'à 5 personnes', featured: true },
      { label: 'Entreprise', value: 'Sur devis', description: 'Programme sur-mesure avec cas réels' }
    ],
    tags: ['Formation', 'AI', 'CI/CD', 'Production', 'Best Practices'],
    relatedServices: ['dev-web', 'dev-mobile', 'product-management']
  },

  'startup-coaching': {
    id: 'startup-coaching',
    title: 'Accompagnement Start-up',
    subtitle: 'Toolkit entrepreneurial pour valider votre marché et lancer votre produit de manière lean et scalable.',
    badge: 'FORMATION',
    category: 'formation',
    meta: {
      durée: '2 jours',
      niveau: 'Entrepreneurs',
      format: 'Workshop intensif'
    },
    overview: 'Formation intensive pour entrepreneurs et porteurs de projets. Apprenez à valider votre idée, construire votre MVP et lancer votre produit avec une approche lean. De la validation problème/solution au go-to-market, toutes les étapes clés.',
    details: [
      {
        title: 'Validation Marché',
        description: 'Valider le problème et la solution',
        items: ['Problem-solution fit', 'Customer interviews', 'MVP scope', 'Market sizing']
      },
      {
        title: 'Construction MVP',
        description: 'Créer le minimum viable product',
        items: ['No-code tools', 'Prototypage rapide', 'Landing page', 'Early adopters']
      },
      {
        title: 'Go-to-Market',
        description: 'Stratégie de lancement et croissance',
        items: ['Pricing strategy', 'Distribution channels', 'Growth loops', 'Métriques traction']
      }
    ],
    deliverables: [
      'Canvas complets',
      'Roadmap lancement',
      'Outils no-code',
      'Templates marketing',
      'Checklist MVP',
      'Mentoring 2 mois'
    ],
    pricing: [
      { label: 'Individuel', value: '900€', description: 'Entrepreneur solo' },
      { label: 'Équipe Startup', value: '2 200€', description: 'Jusqu\'à 3 fondateurs', featured: true },
      { label: 'Incubateur', value: 'Sur devis', description: 'Programme groupe personnalisé' }
    ],
    tags: ['Formation', 'Startup', 'MVP', 'Lean Startup', 'GTM'],
    relatedServices: ['product-training', 'product-management', 'rapid-deployment']
  }
};

// Export par défaut
export default servicesData;

// Export nommé
export { servicesData };

// Fonctions helper
export const getServiceById = (id) => {
  return servicesData[id];
};

export const getAllServices = () => {
  return Object.values(servicesData);
};

export const getServicesByCategory = (category) => {
  return Object.values(servicesData).filter(service => service.category === category);
};

export const getRelatedServices = (serviceId) => {
  const service = servicesData[serviceId];
  if (!service || !service.relatedServices) return [];
  
  return service.relatedServices.map(id => servicesData[id]).filter(Boolean);
};