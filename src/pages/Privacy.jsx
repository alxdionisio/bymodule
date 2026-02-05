import { useSEO, useOpenGraph, useJsonLd, getSiteUrl } from '../lib/seo';
import './Legal.css';

export default function PrivacyPage() {
  useSEO({
    title: 'Politique de confidentialité — Module',
    description: 'Informations sur la collecte, l\'utilisation et la protection des données personnelles sur byModule.',
    canonicalPath: '/politique-de-confidentialite',
  });
  useOpenGraph({
    title: 'Politique de confidentialité — Module',
    description: 'Collecte et traitement des données personnelles.',
    path: '/politique-de-confidentialite',
  });
  const siteUrl = getSiteUrl();
  useJsonLd('breadcrumb-privacy', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Politique de confidentialité', item: `${siteUrl}/politique-de-confidentialite` }
    ]
  });

  return (
    <div className="legal privacy">
      <section className="page-hero" aria-labelledby="privacy-title">
        <div className="hero-content">
          <nav aria-label="Fil d'Ariane" className="breadcrumb">
            <a href="/">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Politique de confidentialité</span>
          </nav>
          <div className="hero-text">
            <h1 id="privacy-title" className="page-title">POLITIQUE DE<br />CONFIDENTIALITÉ</h1>
            <p className="page-subtitle">Comment nous collectons, utilisons et protégeons vos données.</p>
          </div>
        </div>
      </section>
      <section className="legal-content">
        <div className="container">
          <h2>Introduction</h2>
          <p>Module accorde une grande importance à la protection de vos données personnelles et s'engage à les traiter de manière responsable et conforme au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.</p>
          <p>Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons, partageons et protégeons vos données personnelles lorsque vous utilisez notre site web byModule.com</p>

          <h2>Responsable du traitement</h2>
          <p><strong>Module</strong><br />
          Siège social : Marseille, France<br />
          Email : contact@bymodule.com</p>

          <h2>Données personnelles collectées</h2>
          <p>Nous collectons différentes catégories de données personnelles selon votre interaction avec notre site :</p>

          <h3>Données de navigation</h3>
          <p>Lors de votre visite sur notre site, nous collectons automatiquement certaines données techniques via Google Analytics 4 :</p>
          <ul>
            <li>Adresse IP (anonymisée)</li>
            <li>Type de navigateur et version</li>
            <li>Système d'exploitation</li>
            <li>Pages visitées et durée de visite</li>
            <li>Source de référence (site web d'origine)</li>
            <li>Données de localisation approximative (pays, ville)</li>
            <li>Résolution d'écran et type d'appareil</li>
          </ul>

          <h3>Données de contact</h3>
          <p>Lorsque vous utilisez notre formulaire de contact, nous collectons :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Nom de votre entreprise (optionnel)</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Message et toute information que vous choisissez de nous communiquer</li>
          </ul>

          <h2>Finalités du traitement</h2>
          <p>Nous utilisons vos données personnelles pour les finalités suivantes :</p>

          <h3>Mesure d'audience et amélioration du site</h3>
          <p>Les données de navigation collectées via Google Analytics nous permettent de :</p>
          <ul>
            <li>Analyser le trafic et le comportement des visiteurs</li>
            <li>Améliorer l'expérience utilisateur et la navigation</li>
            <li>Optimiser le contenu et les fonctionnalités du site</li>
            <li>Identifier et corriger les problèmes techniques</li>
          </ul>

          <h3>Gestion des demandes de contact</h3>
          <p>Les données collectées via le formulaire de contact sont utilisées pour :</p>
          <ul>
            <li>Répondre à vos questions et demandes d'information</li>
            <li>Vous fournir des devis et propositions commerciales</li>
            <li>Assurer le suivi de votre demande</li>
            <li>Archiver nos échanges à des fins de preuve</li>
          </ul>

          <h2>Base légale du traitement</h2>
          <p>Le traitement de vos données repose sur les bases légales suivantes :</p>
          <ul>
            <li><strong>Intérêt légitime</strong> pour l'analyse d'audience et l'amélioration de notre site web</li>
            <li><strong>Consentement</strong> pour l'utilisation de cookies analytiques lorsque requis par la réglementation</li>
            <li><strong>Exécution de mesures précontractuelles</strong> pour le traitement de vos demandes de contact et l'établissement de devis</li>
            <li><strong>Obligation légale</strong> pour la conservation de certaines données à des fins comptables et fiscales</li>
          </ul>

          <h2>Destinataires des données</h2>
          <p>Vos données personnelles peuvent être transmises aux catégories de destinataires suivants :</p>
          <ul>
            <li><strong>Personnel de Module</strong> : seules les personnes habilitées ont accès à vos données dans le cadre de leurs fonctions</li>
            <li><strong>Prestataires techniques</strong> : Google (Google Analytics), GitHub (hébergement), EmailJS ou service équivalent (envoi de formulaires)</li>
            <li><strong>Autorités légales</strong> : sur demande légale et dans les limites prévues par la loi</li>
          </ul>
          <p>Nous veillons à ce que nos prestataires présentent des garanties suffisantes en matière de protection des données et respectent les exigences du RGPD.</p>

          <h2>Transfert de données hors UE</h2>
          <p>Certains de nos prestataires (notamment Google et GitHub) peuvent transférer vos données en dehors de l'Union Européenne. Ces transferts sont encadrés par des garanties appropriées conformes au RGPD, telles que les clauses contractuelles types de la Commission Européenne ou l'adhésion au Data Privacy Framework.</p>

          <h2>Durées de conservation</h2>
          <p>Nous conservons vos données personnelles pendant les durées suivantes :</p>
          <ul>
            <li><strong>Données de navigation (Analytics)</strong> : 26 mois maximum à compter de la collecte</li>
            <li><strong>Données de contact (formulaire)</strong> : 3 ans à compter du dernier contact pour les prospects, ou pendant la durée de la relation commerciale puis 5 ans en archive pour les clients</li>
            <li><strong>Cookies</strong> : 13 mois maximum à compter du dépôt</li>
          </ul>
          <p>À l'issue de ces durées, vos données sont supprimées ou anonymisées de manière irréversible.</p>

          <h2>Sécurité des données</h2>
          <p>Module met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la destruction accidentelle ou illicite, la perte, l'altération, la divulgation non autorisée ou l'accès non autorisé :</p>
          <ul>
            <li>Connexion sécurisée HTTPS (SSL/TLS)</li>
            <li>Hébergement sur des serveurs sécurisés (GitHub Pages)</li>
            <li>Accès limité et authentifié aux données</li>
            <li>Pseudonymisation et anonymisation lorsque possible</li>
            <li>Sauvegardes régulières</li>
          </ul>

          <h2>Vos droits</h2>
          <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants concernant vos données personnelles :</p>
          <ul>
            <li><strong>Droit d'accès</strong> : obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
            <li><strong>Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données dans certains cas</li>
            <li><strong>Droit à la limitation du traitement</strong> : demander le gel temporaire du traitement de vos données</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données pour des raisons tenant à votre situation particulière</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et couramment utilisé</li>
            <li><strong>Droit de retirer votre consentement</strong> : à tout moment, pour les traitements basés sur le consentement</li>
            <li><strong>Droit de définir des directives post-mortem</strong> : définir le sort de vos données après votre décès</li>
          </ul>

          <h3>Exercice de vos droits</h3>
          <p>Pour exercer vos droits, vous pouvez nous contacter par email à <strong>contact@bymodule.com</strong> en précisant :</p>
          <ul>
            <li>Vos nom, prénom et adresse email</li>
            <li>Le droit que vous souhaitez exercer</li>
            <li>Une copie de votre pièce d'identité en cas de doute sur votre identité</li>
          </ul>
          <p>Nous nous engageons à vous répondre dans un délai d'un mois à compter de la réception de votre demande. Ce délai peut être prolongé de deux mois en cas de complexité ou de nombre important de demandes.</p>

          <h3>Réclamation auprès de la CNIL</h3>
          <p>Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :</p>
          <p><strong>CNIL</strong><br />
          3 Place de Fontenoy - TSA 80715<br />
          75334 PARIS CEDEX 07<br />
          Tél : 01 53 73 22 22<br />
          Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>

          <h2>Cookies et traceurs</h2>
          <p>Notre site utilise des cookies et autres traceurs pour améliorer votre expérience de navigation et mesurer notre audience.</p>

          <h3>Qu'est-ce qu'un cookie ?</h3>
          <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de la visite d'un site web. Il permet de conserver des données utilisateur afin de faciliter la navigation et de permettre certaines fonctionnalités.</p>

          <h3>Cookies utilisés sur notre site</h3>
          <p><strong>Cookies de mesure d'audience (Google Analytics 4)</strong></p>
          <ul>
            <li>Finalité : analyser l'audience du site, mesurer les performances et améliorer l'expérience utilisateur</li>
            <li>Durée de conservation : 13 mois</li>
            <li>Base légale : consentement ou intérêt légitime selon configuration</li>
          </ul>

          <p><strong>Cookies de consentement</strong></p>
          <ul>
            <li>Finalité : mémoriser vos choix concernant les cookies</li>
            <li>Durée de conservation : 13 mois</li>
            <li>Base légale : exemption (cookies strictement nécessaires)</li>
          </ul>

          <h3>Gestion de vos préférences</h3>
          <p>Vous pouvez à tout moment modifier vos préférences concernant les cookies via la bannière de consentement accessible sur notre site. Vous pouvez accepter, refuser ou personnaliser les cookies.</p>
          <p>Vous pouvez également configurer votre navigateur pour refuser tous les cookies ou être informé de leur dépôt. Toutefois, le refus de certains cookies peut affecter le bon fonctionnement du site.</p>

          <h2>Modifications de la politique de confidentialité</h2>
          <p>Module se réserve le droit de modifier cette politique de confidentialité à tout moment, notamment pour se conformer à toute évolution réglementaire, jurisprudentielle, éditoriale ou technique.</p>
          <p>Les modifications entreront en vigueur dès leur mise en ligne. Nous vous invitons à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.</p>
          <p>En cas de modification substantielle, nous nous efforcerons de vous en informer par un avis visible sur le site ou par email si nous disposons de votre adresse.</p>

          <h2>Contact</h2>
          <p>Pour toute question relative à cette politique de confidentialité ou au traitement de vos données personnelles, vous pouvez nous contacter :</p>
          <p><strong>Par email :</strong> contact@bymodule.com<br />
          <strong>Par courrier :</strong> Module, Marseille, France</p>

          <p style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.7 }}>Dernière mise à jour : Février 2026</p>
        </div>
      </section>
    </div>
  );
}