import { useSEO, useOpenGraph, useJsonLd, getSiteUrl } from '../lib/seo';
import './Legal.css';

export default function LegalPage() {
  useSEO({
    title: 'Mentions légales — Module | Marseille, PACA',
    description: 'Mentions légales du site Module : éditeur, hébergeur, contact. Développement web, product management à Marseille, Aix-en-Provence, PACA.',
    canonicalPath: '/mentions-legales',
  });
  useOpenGraph({
    title: 'Mentions légales — Module Marseille, PACA',
    description: 'Éditeur, hébergeur et informations légales. Module — développement web, product management, Marseille, PACA.',
    path: '/mentions-legales',
  });
  const siteUrl = getSiteUrl();
  useJsonLd('breadcrumb-legal', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Mentions légales', item: `${siteUrl}/mentions-legales` }
    ]
  });

  return (
    <div className="legal mentions">
      <section className="page-hero" aria-labelledby="legal-title">
        <div className="hero-content">
          <nav aria-label="Fil d'Ariane" className="breadcrumb">
            <a href="/">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Mentions légales</span>
          </nav>
          <div className="hero-text">
            <h1 id="legal-title" className="page-title">MENTIONS<br />LÉGALES</h1>
            <p className="page-subtitle">Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.</p>
          </div>
        </div>
      </section>
      <section className="legal-content">
        <div className="container">
          <h2>Éditeur du site</h2>
          <p>Le site byModule est édité par Module, agence de design et développement digital basée à Marseille, France.</p>
          <p><strong>Raison sociale :</strong> Module<br />
          <strong>Siège social :</strong> Marseille, France<br />
          <strong>Email :</strong> contact@bymodule.com<br />
          <strong>Directeur de publication :</strong> Module</p>

          <h2>Hébergement</h2>
          <p>Le site byModule.com est hébergé par GitHub Pages, service fourni par GitHub Inc.</p>
          <p><strong>Raison sociale :</strong> GitHub Inc.<br />
          <strong>Adresse :</strong> 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA<br />
          <strong>Site web :</strong> <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer">pages.github.com</a></p>

          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble des éléments composant le site byModule.com (structure, textes, images, graphismes, logos, icônes, sons, logiciels, bases de données) est la propriété exclusive de Module, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.</p>
          <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Module.</p>
          <p>Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>

          <h2>Responsabilité</h2>
          <p>Module s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toutefois, Module ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.</p>
          <p>En conséquence, Module décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site, ainsi que pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site.</p>

          <h2>Liens hypertextes</h2>
          <p>Le site byModule.com peut contenir des liens hypertextes vers d'autres sites. Module n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>
          <p>La mise en place de liens hypertextes vers le site byModule.com nécessite une autorisation préalable écrite de Module. Cette autorisation peut être demandée par email à contact@bymodule.com</p>

          <h2>Données personnelles</h2>
          <p>Pour toute information concernant la collecte et le traitement de vos données personnelles, veuillez consulter notre <a href="/politique-de-confidentialite">Politique de confidentialité</a>.</p>

          <h2>Cookies</h2>
          <p>Le site byModule.com utilise des cookies pour améliorer l'expérience utilisateur et mesurer l'audience. Vous pouvez gérer vos préférences concernant les cookies via la bannière de consentement présente sur le site.</p>

          <h2>Droit applicable et juridiction</h2>
          <p>Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.</p>

          <h2>Contact</h2>
          <p>Pour toute question, demande d'information ou réclamation concernant le site, vous pouvez nous contacter à l'adresse suivante : <strong>contact@bymodule.com</strong></p>
          <p>Vous pouvez également utiliser notre <a href="/contact">formulaire de contact</a> en ligne.</p>

          <p style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.7 }}>Dernière mise à jour : Février 2026</p>
        </div>
      </section>
    </div>
  );
}