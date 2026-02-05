import { Link } from 'react-router-dom';
import { useSEO, useOpenGraph, useJsonLd, getSiteUrl } from '../lib/seo';
import './Legal.css';

export default function SitemapPage() {
  useSEO({
    title: 'Plan du site — Module',
    description: 'Navigation complète du site byModule: pages, services, projets et contact.',
    canonicalPath: '/plan-du-site',
  });
  useOpenGraph({
    title: 'Plan du site — Module',
    description: 'Navigation complète du site byModule.',
    path: '/plan-du-site',
  });
  const siteUrl = getSiteUrl();
  useJsonLd('breadcrumb-sitemap', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Plan du site', item: `${siteUrl}/plan-du-site` }
    ]
  });

  return (
    <div className="legal sitemap">
      <section className="page-hero" aria-labelledby="sitemap-title">
        <div className="hero-content">
          <nav aria-label="Fil d'Ariane" className="breadcrumb">
            <a href="/">Accueil</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Plan du site</span>
          </nav>
          <div className="hero-text">
            <h1 id="sitemap-title" className="page-title">PLAN<br />DU SITE</h1>
            <p className="page-subtitle">Retrouvez rapidement les pages clés de byModule.</p>
          </div>
        </div>
      </section>
      <section className="legal-content">
        <div className="container">
          <p>Bienvenue sur le plan du site de byModule. Cette page vous permet d'accéder rapidement à l'ensemble des sections et pages de notre site web. Naviguez facilement à travers notre contenu et découvrez nos services, projets et informations légales.</p>

          <h2>Pages principales</h2>
          <ul>
            <li>
              <Link to="/"><strong>Accueil</strong></Link>
              <p>Découvrez Module, notre vision et notre approche du design et du développement digital.</p>
            </li>
            <li>
              <Link to="/projets"><strong>Projets</strong></Link>
              <p>Explorez notre portfolio de réalisations : sites web, applications, identités visuelles et expériences digitales créées pour nos clients.</p>
            </li>
            <li>
              <Link to="/services"><strong>Services</strong></Link>
              <p>Découvrez l'étendue de nos compétences : design UX/UI, développement web, stratégie digitale, branding et conseil.</p>
            </li>
            <li>
              <Link to="/contact"><strong>Contact</strong></Link>
              <p>Prenez contact avec notre équipe pour discuter de votre projet, obtenir un devis ou simplement échanger sur vos besoins digitaux.</p>
            </li>
          </ul>

          <h2>Informations légales</h2>
          <ul>
            <li>
              <Link to="/mentions-legales"><strong>Mentions légales</strong></Link>
              <p>Informations sur l'éditeur du site, l'hébergement, la propriété intellectuelle et les conditions d'utilisation de byModule.com</p>
            </li>
            <li>
              <Link to="/politique-de-confidentialite"><strong>Politique de confidentialité</strong></Link>
              <p>Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD et à la loi Informatique et Libertés.</p>
            </li>
            <li>
              <Link to="/plan-du-site"><strong>Plan du site</strong></Link>
              <p>Cette page : vue d'ensemble de l'architecture et de la navigation du site byModule.</p>
            </li>
          </ul>

          <h2>Ressources et navigation</h2>
          <p>Le site byModule est conçu pour offrir une navigation intuitive et une expérience utilisateur optimale. Chaque page est accessible via le menu principal et le pied de page du site.</p>
          
          <h3>Accessibilité</h3>
          <p>Nous nous engageons à rendre notre site accessible au plus grand nombre. Si vous rencontrez des difficultés de navigation ou d'accessibilité, n'hésitez pas à nous contacter via notre <Link to="/contact">formulaire de contact</Link>.</p>

          <h3>Structure du site</h3>
          <p>Le site byModule s'articule autour de quatre grandes sections :</p>
          <ul>
            <li><strong>Présentation</strong> : qui nous sommes et notre approche</li>
            <li><strong>Réalisations</strong> : nos projets et cas clients</li>
            <li><strong>Expertise</strong> : nos services et compétences</li>
            <li><strong>Contact</strong> : comment nous joindre et collaborer</li>
          </ul>

          <h2>Vous avez une question ?</h2>
          <p>Si vous ne trouvez pas l'information que vous recherchez sur ce plan du site, notre équipe est à votre disposition pour vous aider. Contactez-nous par email à <strong>contact@bymodule.com</strong> ou via notre <Link to="/contact">formulaire de contact</Link>.</p>

          <h2>Mise à jour du contenu</h2>
          <p>Ce plan du site est régulièrement mis à jour pour refléter les évolutions et ajouts de contenu sur byModule.com. Nous vous invitons à le consulter régulièrement pour découvrir nos nouveautés.</p>

          <p style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.7 }}>Dernière mise à jour : Février 2026</p>
        </div>
      </section>
    </div>
  );
}