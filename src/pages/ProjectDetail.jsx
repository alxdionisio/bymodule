import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectById, getAllProjects } from '../data/projects';
import './ProjectDetail.css';
import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { useSEO, useJsonLd, getSiteUrl, useOpenGraph } from '../lib/seo';
import { getImageForProject, getFallbackImage } from '../data/media';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);

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
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'Module', url: siteUrl }
    });
  }

  useEffect(() => {
    if (project) {
      trackEvent('project_detail_view', { project_id: project.id, project_title: project.title.replace(/\n/g, ' ') });
    }
  }, [project]);

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