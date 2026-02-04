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

  // Global JSON-LD: Organization + WebSite
  const siteUrl = getSiteUrl();
  useJsonLd('organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Module',
    url: siteUrl,
    logo: `${siteUrl}/module-logo.png`,
    sameAs: [
      'https://www.linkedin.com/in/alexdionisio'
    ]
  });
  useJsonLd('website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Module',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/projets?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
