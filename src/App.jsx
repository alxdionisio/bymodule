import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projets from './pages/Projets';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import { initAnalytics, trackPageView } from './lib/analytics';
import ConsentBanner from './components/ConsentBanner';
import NotFound from './pages/NotFound';
import { useJsonLd, getSiteUrl } from './lib/seo';
import { SEO_REGION_STRING } from './data/seo-keywords';
import SitemapPage from './pages/Sitemap';
import LegalPage from './pages/Legal';
import PrivacyPage from './pages/Privacy';

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Initialize GA4 once
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search, document.title);
  }, [pathname]);

  // Global JSON-LD: Organization + WebSite + LocalBusiness (SEO région)
  const siteUrl = getSiteUrl();
  useJsonLd('organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Module',
    url: siteUrl,
    logo: `${siteUrl}/module-logo.png`,
    description: 'Studio de développement web, product management et applications mobiles. Marseille, Aix-en-Provence, PACA, Côte Bleue.',
    sameAs: ['https://www.linkedin.com/in/alexdionisio'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marseille',
      addressRegion: 'Provence-Alpes-Côte d\'Azur',
      addressCountry: 'FR'
    },
    areaServed: [
      { '@type': 'City', name: 'Marseille' },
      { '@type': 'City', name: 'Aix-en-Provence' },
      { '@type': 'AdministrativeArea', name: 'PACA' },
      { '@type': 'Place', name: 'Côte Bleue' },
      { '@type': 'City', name: 'Sausset-les-Pins' },
      { '@type': 'City', name: 'Carry-le-Rouet' }
    ],
    knowsAbout: ['Développement web', 'Product Management', 'Applications mobiles', 'UX/UI design', 'Automatisation', 'E-commerce']
  });
  useJsonLd('website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Module',
    url: siteUrl,
    description: 'Développement web, product management et applications à Marseille, Aix-en-Provence, PACA, Côte Bleue.',
    inLanguage: 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/projets?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  });
  useJsonLd('localbusiness', {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Module',
    url: siteUrl,
    description: 'Développement web, product management, applications mobiles et formation. Marseille, Aix-en-Provence, PACA, Sausset-les-Pins, Carry-le-Rouet, Côte Bleue.',
    address: { '@type': 'PostalAddress', addressLocality: 'Marseille', addressRegion: 'PACA', addressCountry: 'FR' },
    areaServed: SEO_REGION_STRING.split(', ').map(name => ({ '@type': 'Place', name })),
    priceRange: '€€',
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' }
  });

  return (
    <div className="app">
      <Header />
      <ConsentBanner />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-du-site" element={<SitemapPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/politique-de-confidentialite" element={<PrivacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
