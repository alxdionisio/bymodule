import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectById, getAllProjects } from '../data/projects';
import './ProjectDetail.css';
import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { useSEO, useJsonLd, getSiteUrl, useOpenGraph } from '../lib/seo';
import { getImageForProject, getFallbackImage } from '../data/media';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);
  const carouselRef = useRef(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useSEO({
    title: project ? `${project.title.replace(/\n/g, ' ')} — Projet — Module` : 'Projet — Module',
    description: project?.subtitle || 'Détail du projet et résultats.',
    canonicalPath: project ? `/project/${project.id}` : undefined,
  });
  useOpenGraph({
    title: project ? `${project.title.replace(/\n/g, ' ')} — Projet — Module` : 'Projet — Module',
    description: project?.subtitle || 'Détail du projet et résultats.',
    path: project ? `/project/${project.id}` : undefined
  });
  const siteUrl = getSiteUrl();
  useJsonLd(`breadcrumb-project-${id}`, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Projets', item: `${siteUrl}/projets` },
      { '@type': 'ListItem', position: 3, name: project ? project.title.replace(/\n/g, ' ') : 'Projet', item: `${siteUrl}/project/${id}` }
    ]
  });
  if (project) {
    useJsonLd(`project-${id}`, {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title.replace(/\n/g, ' '),
      description: project.subtitle,
      url: `${siteUrl}/project/${project.id}`,
      about: project.badge,
      keywords: project.tags?.join(', '),
      image: (project.media?.map(m => m.src) ?? []).slice(0, 6),
      sameAs: project.link ? [project.link] : undefined,
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'Module', url: siteUrl }
    });
  }

  useEffect(() => {
    if (project) {
      trackEvent('project_detail_view', { project_id: project.id, project_title: project.title.replace(/\n/g, ' ') });
    }
  }, [project]);

  // Media carousel handlers
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth || 1;
      const idx = Math.round(el.scrollLeft / w);
      setMediaIndex(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollBySlide = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: el.scrollLeft + dir * w, behavior: 'smooth' });
    trackEvent('project_media_nav', { project_id: project.id, direction: dir });
  };

  const goToSlide = (idx) => {
    const el = carouselRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: idx * w, behavior: 'smooth' });
    trackEvent('project_media_dot', { project_id: project.id, index: idx });
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    const img = (project.media && project.media[index]) || null;
    trackEvent('project_media_open', { project_id: project.id, index, src: img?.src });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxIndex(0);
  };

  // Lock scroll and handle Escape when lightbox open
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') {
        const total = project.media?.length || 0;
        setLightboxIndex((i) => Math.min(total - 1, i + 1));
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Projet non trouvé</h1>
        <Link to="/projets" className="btn-primary">Retour au portfolio</Link>
      </div>
    );
  }

  // Get other projects (exclude current, take 3)
  const otherProjects = getAllProjects()
    .filter(p => p.id !== id)
    .slice(0, 3);

  return (
    <div className="project-detail">
      {/* HERO */}
      <section className="project-hero">
        <div className="hero-content">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Retour
          </button>
          
          <span className="project-badge">{project.badge}</span>
          
          <h1 className="project-title">
            {project.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < project.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          
          <p className="project-subtitle">{project.subtitle}</p>

          <div className="project-meta">
            <div className="meta-item">
              <div className="meta-label">Client</div>
              <div className="meta-value">{project.meta.client}</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Durée</div>
              <div className="meta-value">{project.meta.durée}</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Année</div>
              <div className="meta-value">{project.meta.année}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="project-content">
        <div className="content-container">
          

          {/* Overview */}
          {project.overview && (
            <div className="content-section">
              <h2 className="section-title">Vue d'ensemble</h2>
              <p className="section-text">{project.overview}</p>
              {project.link && (
                <p style={{ textAlign: 'center' }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    onClick={() => trackEvent('project_detail_site_click', { project_id: project.id, link: project.link })}
                  >
                    Voir le site →
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Challenge & Solution */}
          {(project.challenge || project.solution) && (
            <div className="content-section">
              <div className="split-content">
                {project.challenge && (
                  <div className="split-card">
                    <h3>Le défi</h3>
                    <p>{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="split-card highlight">
                    <h3>La solution</h3>
                    <p>{project.solution}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Media carousel (après Défi/Solution) */}
          {!['automation-bakery', 'travel-agency', 'political-campaign'].includes(project.id) && (
          <div className="content-section">
            <h2 className="section-title">Aperçu visuel</h2>
            <div className={`project-media ${project.id === 'app-restaurant' ? 'portrait' : ''}`}>
              {(() => {
                const total = project.media?.length || 3;
                return mediaIndex > 0 ? (
                  <button className="media-arrow left" aria-label="Précédent" onClick={() => scrollBySlide(-1)}>‹</button>
                ) : null;
              })()}
              <div className="media-carousel" ref={carouselRef}>
                {(project.media && project.media.length > 0
                  ? project.media
                  : [
                      { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup 1' },
                      { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup 2' },
                      { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&auto=format&fit=crop&q=60', alt: 'Mockup 3' }
                    ]
                ).map((m, i) => (
                  <div className="media-slide" key={i}>
                    <img
                      src={m.src}
                      alt={m.alt || project.title.replace(/\n/g, ' ')}
                      loading="lazy"
                      decoding="async"
                      width="1400"
                      height="800"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getFallbackImage(i); }}
                      onClick={() => openLightbox(i)}
                      role="button"
                      style={{ cursor: 'zoom-in' }}
                    />
                  </div>
                ))}
              </div>
              {(() => {
                const total = project.media?.length || 3;
                return mediaIndex < total - 1 ? (
                  <button className="media-arrow right" aria-label="Suivant" onClick={() => scrollBySlide(1)}>›</button>
                ) : null;
              })()}
            </div>
            <div className="media-dots">
              {(project.media?.length || 3) > 0 &&
                new Array(project.media?.length || 3).fill(0).map((_, i) => (
                  <button
                    key={i}
                    className={`media-dot ${mediaIndex === i ? 'active' : ''}`}
                    aria-label={`Aller à l'image ${i + 1}`}
                    onClick={() => goToSlide(i)}
                  />
                ))
              }
            </div>
          </div>
          )}

          {/* Lightbox modal */}
          {lightboxOpen && (
            <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Agrandir l’image" onClick={closeLightbox}>
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-close" aria-label="Fermer" onClick={closeLightbox}>✕</button>
                {/* Lightbox arrows */}
                {lightboxIndex > 0 && (
                  <button
                    className="lightbox-arrow left"
                    aria-label="Précédent"
                    onClick={() => setLightboxIndex((i) => Math.max(0, i - 1))}
                  >‹</button>
                )}
                {lightboxIndex < (project.media?.length || 1) - 1 && (
                  <button
                    className="lightbox-arrow right"
                    aria-label="Suivant"
                    onClick={() => setLightboxIndex((i) => Math.min((project.media?.length || 1) - 1, i + 1))}
                  >›</button>
                )}
                <img
                  className="lightbox-img"
                  src={project.media?.[lightboxIndex]?.src}
                  alt={project.media?.[lightboxIndex]?.alt || project.title.replace(/\n/g, ' ')}
                />
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && (
            <div className="content-section">
              <h2 className="section-title">Stack technique</h2>
              <div className="tech-grid">
                {Object.entries(project.techStack).map(([category, techs]) => (
                  <div key={category} className="tech-category">
                    <div className="tech-category-title">{category}</div>
                    <div className="tech-items">
                      {techs.map((tech, idx) => (
                        <Link
                          key={idx}
                          to={`/projets?tags=${encodeURIComponent(tech)}`}
                          className="tech-tag"
                          title={`Voir tous les projets avec ${tech}`}
                          onClick={() => trackEvent('project_detail_tech_click', { tech })}
                        >
                          {tech}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="content-section">
              <h2 className="section-title">Fonctionnalités clés</h2>
              <div className="features-grid">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="feature-card">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KPIs */}
          {project.kpis && project.kpis.length > 0 && (
            <div className="content-section">
              <h2 className="section-title">Résultats & Impact</h2>
              <div className="kpis-grid">
                {project.kpis.map((kpi, idx) => (
                  <div key={idx} className="kpi-card">
                    <div className="kpi-value">{kpi.value}</div>
                    <div className="kpi-label">{kpi.label}</div>
                    <div className="kpi-desc">{kpi.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags Section - Cliquables */}
          {project.tags && project.tags.length > 0 && (
            <div className="project-tags-section">
              <h3 className="tags-title">Technologies & Domaines</h3>
              <div className="project-tags-list">
                {project.tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/projets?tags=${encodeURIComponent(tag)}`}
                    className="project-tag-link"
                    title={`Voir tous les projets avec ${tag}`}
                    onClick={() => trackEvent('project_detail_tag_click', { tag })}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="project-cta">
            <h2 className="cta-title">Un projet similaire en tête ?</h2>
            <p className="cta-text">
              Discutons de vos besoins et créons ensemble une solution sur mesure.
            </p>
            <Link to="/contact" className="cta-btn" onClick={() => trackEvent('project_detail_cta_click', { project_id: project.id })}>Démarrer un projet</Link>
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div className="other-projects-section">
              <h2 className="section-title">Autres projets</h2>
              <div className="other-projects-grid">
                {otherProjects.map((otherProject, index) => (
                  <Link
                    key={otherProject.id}
                    to={`/project/${otherProject.id}`}
                    className="other-project-card"
                    onClick={() => trackEvent('project_detail_other_click', { to_project_id: otherProject.id })}
                  >
                    <div className="other-project-image">
                      <img 
                        src={getImageForProject(otherProject.id, index)}
                        alt={otherProject.title}
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="400"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getFallbackImage(index); }}
                      />
                      <span className="project-badge">{otherProject.badge}</span>
                    </div>
                    <div className="other-project-content">
                      <h3 className="other-project-title">
                        {otherProject.title.replace(/\n/g, ' ')}
                      </h3>
                      <div className="other-project-tags">
                        {otherProject.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="view-all-projects">
                <Link to="/projets" className="btn-secondary">
                  Voir tous les projets
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}