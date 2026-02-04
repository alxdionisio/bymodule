import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getAllProjects } from '../data/projects';
import './Home.css';
import { trackEvent } from '../lib/analytics';
import { useSEO, useJsonLd, getSiteUrl, useOpenGraph } from '../lib/seo';
import { getImageForProject, getFallbackImage } from '../data/media';

export default function Home() {
  useSEO({
    title: "Module — Outils numériques pour propulser votre business",
    description:
      "Studio web & mobile: sites, apps, automatisation. Projets récents, témoignages et services pour accélérer votre activité.",
    canonicalPath: "/",
  });
  useOpenGraph({
    title: "Module — Outils numériques pour propulser votre business",
    description:
      "Studio web & mobile: sites, apps, automatisation. Projets récents, témoignages et services pour accélérer votre activité.",
    path: "/"
  });
  const siteUrl = getSiteUrl();
  useJsonLd('breadcrumb-home', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${siteUrl}/`
      }
    ]
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const projectsRef = useRef(null);
  const aboutTextRef = useRef(null);
  const projectsTextRef = useRef(null);
  const blogTextRef = useRef(null);
  const ctaTextRef = useRef(null);
  
  const allProjects = getAllProjects();

  const testimonials = [
    {
      text: "Alex m'a accompagné dans le lancement de mon activité en créant un site professionnel optimisé pour le référencement local. Résultat : visibilité immédiate sur Google et un flux constant de demandes dès les premières semaines. Le meilleur investissement pour démarrer sereinement.",
      author: "Salim C. — Éradication de nuisibles"
    },
    {
      text: "Excellent travail sur notre application mobile. Alex a transformé notre gestion de réservations et nous a fait gagner un temps précieux. Les retours clients sont unanimes, l'app est intuitive et moderne.",
      author: "Lionel C. — Restaurateur"
    },
    {
      text: "Collaboration parfaite du début à la fin. Alex a automatisé notre production et réduit nos erreurs de 95%. Un vrai gain de productivité pour notre atelier. Je ne peux que le recommander.",
      author: "Suzy D. — Boulangerie artisanale"
    },
    {
      text: "Site vitrine magnifique et optimisé pour le SEO local. Alex a compris notre secteur et nos besoins. Nos demandes de devis ont triplé en quelques mois. Un investissement rentabilisé rapidement.",
      author: "Annie C. — Agence de voyages"
    }
  ];

  // Scroll progress for projects grid
  useEffect(() => {
    const handleScroll = () => {
      if (!projectsRef.current) return;

      const element = projectsRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (elementTop <= windowHeight && elementTop + elementHeight >= 0) {
        const progress = Math.min(
          1,
          Math.max(0, (windowHeight - elementTop) / (windowHeight + elementHeight / 2))
        );
        setScrollProgress(progress);
      }

      // Animated background texts
      const animateBackgroundText = (ref, direction) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / windowHeight));
          const translateX = direction === 'left' 
            ? -100 + (progress * 100) 
            : 100 - (progress * 100);
          ref.current.style.transform = `translateX(${translateX}%)`;
          ref.current.style.opacity = progress;
        }
      };

      animateBackgroundText(aboutTextRef, 'right');
      animateBackgroundText(projectsTextRef, 'left');
      animateBackgroundText(blogTextRef, 'left');
      animateBackgroundText(ctaTextRef, 'left');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonials slider - auto rotate (desktop only)
  useEffect(() => {
    if (window.innerWidth > 768) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  // Gestion du scroll horizontal sur mobile pour testimonials
  useEffect(() => {
    const handleTestimonialScroll = () => {
      if (window.innerWidth > 768) return;
      
      const container = document.querySelector('.testimonial-slider');
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth || 0;
      
      if (containerWidth > 0) {
        const currentIndex = Math.round(scrollLeft / containerWidth);
        setCurrentTestimonial(currentIndex);
      }
    };

    const container = document.querySelector('.testimonial-slider');
    if (container) {
      container.addEventListener('scroll', handleTestimonialScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleTestimonialScroll);
    }
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    trackEvent('testimonial_nav', { action: 'next', index: (currentTestimonial + 1) % testimonials.length });
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    trackEvent('testimonial_nav', { action: 'prev', index: (currentTestimonial - 1 + testimonials.length) % testimonials.length });
  };

  // Navigation vers un testimonial spécifique (pour les dots)
  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    trackEvent('testimonial_dot', { index });
    
    // Sur mobile, scroll vers le slide
    if (window.innerWidth <= 768) {
      const container = document.querySelector('.testimonial-slider');
      if (container) {
        container.scrollTo({
          left: container.clientWidth * index,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="home-crafto">

      {/* HERO - CRAFTO STYLE */}
      <section className="hero-crafto entrance-animation">
        <div className="hero-background">
          <div className="hero-text-bg">Module</div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Des outils numériques</span>
            <span className="title-line">pour propulser</span>
            <span className="title-line">votre business</span>
          </h1>

          <div className="hero-stats">
            <div className="stat-badge">
              <span className="stat-icon">●</span>
              <span>10+ PROJETS LIVRÉS PAR AN</span>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-badge">
              <span className="stat-icon">●</span>
              <span>UN STUDIO D'APPLICATIONS</span>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-badge">
              <span className="stat-icon">●</span>
              <span>UN ESPACE DE FORMATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-crafto entrance-animation" id="about">
        <div className="about-grid">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
              alt="Équipe en réunion"
              className="about-img"
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
          </div>

          <div className="about-content">
            <div className="about-text-bg" ref={aboutTextRef}>About</div>       
            <div className="about-card">
              <h3 className="card-title">Développement web</h3>
              <p className="card-desc">
                Sites web, applications mobiles, e-commerce. Nous créons des produits 
                digitaux performants avec les technologies modernes.
              </p>
            </div>

            <div className="about-card">
              <h3 className="card-title">Product management</h3>
              <p className="card-desc">
                De la stratégie à l'exécution, nous accompagnons vos projets avec une 
                vision produit claire et des méthodes éprouvées.
              </p>
            </div>

            <div className="about-card">
              <h3 className="card-title">Automatisation</h3>
              <p className="card-desc">
                Intégration ERP, workflows automatisés. Nous optimisons vos processus 
                pour gagner en efficacité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION - GRILLE 4x2 DÉCALÉE */}
      <section className="projects-crafto entrance-animation" ref={projectsRef} id="main-content">
        <div className="projects-header">
          <div className="projects-text-bg" ref={projectsTextRef}>projects</div>
          <h2 className="projects-title">Projets récents</h2>
          <Link to="/projets" className="projects-link" onClick={() => trackEvent('cta_projects_click', { from: 'projects_header' })}>
            <span>VOIR TOUS LES PROJETS</span>
          </Link>
        </div>

        <div className="projects-grid-crafto">
          {allProjects.map((project, index) => {
            const column = index % 4;
            
            let initialOffset;
            if (column === 0) initialOffset = 40;
            else if (column === 1) initialOffset = -40;
            else if (column === 2) initialOffset = 20;
            else initialOffset = -20;
            
            const offset = initialOffset * (1 - scrollProgress);

            return (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="project-item-crafto"
                style={{
                  transform: `translateY(${offset}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onClick={() =>
                  trackEvent('project_click', {
                    project_id: project.id,
                    project_title: project.title.replace(/\n/g, ' '),
                    index
                  })
                }
              >
                <div className="project-image-crafto">
                  <img 
                    src={getImageForProject(project.id, index)} 
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getFallbackImage(index); }}
                  />
                </div>
                <div className="project-info-crafto">
                  <h3 className="project-name">{project.title.replace(/\n/g, ' ')}</h3>
                  <p className="project-category">{project.badge}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section 
        className="testimonial-crafto entrance-animation"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="testimonial-content">
          
          <div className="testimonial-slider">
            <button 
              className="slider-btn slider-prev" 
              onClick={prevTestimonial}
              aria-label="Témoignage précédent"
            >
              ‹
            </button>
            
            <div className="testimonial-track">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`testimonial-slide ${index === currentTestimonial ? 'active' : ''}`}
                >
                  <blockquote className="testimonial-text">
                    {testimonial.text}
                  </blockquote>
                  <p className="testimonial-author">{testimonial.author}</p>
                </div>
              ))}
            </div>
            
            <button 
              className="slider-btn slider-next" 
              onClick={nextTestimonial}
              aria-label="Témoignage suivant"
            >
              ›
            </button>
          </div>

          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

          <Link to="/projets" className="testimonial-link btn-expand-ltr" onClick={() => trackEvent('cta_projects_click', { from: 'testimonials' })}>
            <span>DÉCOUVRIR NOS PROJETS</span>
            <span className="btn-hover-animation"></span>
          </Link>
        </div>
      </section>

      {/* BLOG SECTION - COMMENTEE POUR L'INSTANT
      <section className="blog-crafto entrance-animation">
        <div className="blog-header">
          <div className="blog-text-bg" ref={blogTextRef}>articles</div>
          <h2 className="blog-title">Derniers articles</h2>
          <Link to="/blog" className="blog-link">
            <span>VOIR TOUS LES ARTICLES</span>
          </Link>
        </div>

        <div className="blog-grid">
          {[
            'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop'
          ].map((img, index) => (
            <article key={index} className="blog-card">
              <div className="blog-image">
                <img src={img} alt={`Article ${index + 1}`} className="blog-img" />
              </div>
              <div className="blog-content">
                <span className="blog-category">DESIGN</span>
                <time className="blog-date">26 JANVIER 2026</time>
                <h3 className="blog-title-card">
                  Comment créer une identité visuelle forte pour votre marque
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
      */}

      {/* CTA FINAL */}
      <section className="cta-crafto entrance-animation">
        <div className="cta-text-bg" ref={ctaTextRef}>work</div>
        <div className="cta-content">
          <h2 className="cta-title">
            <span>Créons votre</span>
            <span>prochain projet</span>
            <span className="cta-highlight">ensemble</span>
          </h2>

          <Link to="/contact" className="cta-contact-btn" onClick={() => trackEvent('cta_contact_click', { from: 'home_cta' })}>
            Prêts à démarrer ?
          </Link>

          <div className="cta-info">
            <div className="info-block">
              <strong>Localisation</strong>
              <span>Marseille, France</span>
            </div>
            <div className="info-block">
              <strong>Email</strong>
              <a className="email-link" href="mailto:contact@bymodule.com">contact@bymodule.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}