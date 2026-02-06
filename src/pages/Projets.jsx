import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { getAllProjects, getProjectsByCategory } from '../data/projects';
import './Projets.css';
import { trackEvent } from '../lib/analytics';
import { useSEO, useJsonLd, getSiteUrl, usePaginationLinks, useOpenGraph } from '../lib/seo';
import { getImageForProject, getFallbackImage } from '../data/media';

export default function Portfolio() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const hasSearch = !!(searchParams.get('tags') || searchParams.get('q'));
  useSEO({
    title: "Projets — Développement web, apps & automatisation | Module Marseille PACA",
    description:
      "Portfolio : développement web, e-commerce, apps mobiles, automatisation. Marseille, Aix-en-Provence, PACA, Côte Bleue.",
    canonicalPath: hasSearch ? "/projets" : `/projets${location.search || ''}`,
    robots: hasSearch ? "noindex,follow" : undefined,
  });
  useOpenGraph({
    title: "Projets — Développement web, apps & automatisation | Module Marseille PACA",
    description:
      "Portfolio : développement web, e-commerce, apps mobiles, automatisation. Marseille, Aix-en-Provence, PACA, Côte Bleue.",
    path: "/projets"
  });
  const siteUrl = getSiteUrl();
  useJsonLd('breadcrumb-projets', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Projets', item: `${siteUrl}/projets` }
    ]
  });
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTags, setActiveTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const pageSize = 4;
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  // Normaliser les tags pour regrouper "Headless" et "Headless CMS"
  const normalizeTag = (tag) => {
    if (tag === 'Headless' || tag === 'Headless CMS') {
      return 'Headless CMS';
    }
    return tag;
  };

  // Récupérer tous les tags uniques des projets (normalisés)
  const allTags = useMemo(() => {
    const projects = getAllProjects();
    const tagsSet = new Set();
    projects.forEach(project => {
      project.tags.forEach(tag => {
        const normalized = normalizeTag(tag);
        tagsSet.add(normalized);
      });
    });
    return Array.from(tagsSet).sort();
  }, []);

  // Gérer les paramètres URL au chargement
  useEffect(() => {
    const tagsFromUrl = searchParams.get('tags');
    if (tagsFromUrl) {
      const tagsList = tagsFromUrl.split(',').map(t => decodeURIComponent(t));
      setActiveTags(tagsList);
      setActiveFilter('all');
    }
  }, [searchParams]);

  const filters = [
    { id: 'all', label: 'Tous', count: 8 },
    { id: 'ecommerce', label: 'E-commerce', count: 1 },
    { id: 'mobile', label: 'Mobile', count: 1 },
    { id: 'automation', label: 'Automatisation', count: 1 },
    { id: 'website', label: 'Sites Web', count: 4 },
    { id: 'studio', label: 'R&D', count: 1 }
  ];

  // Memoized filtered and searched projects
  const filteredProjects = useMemo(() => {
    let projects = getProjectsByCategory(activeFilter);
    
    // Filtrer par tags si des tags sont actifs (ET logique - tous les tags doivent être présents)
    if (activeTags.length > 0) {
      projects = projects.filter(project => {
        // Normaliser les tags du projet
        const normalizedProjectTags = project.tags.map(tag => normalizeTag(tag));
        
        // Vérifier que tous les tags actifs sont présents dans le projet
        return activeTags.every(activeTag => 
          normalizedProjectTags.some(projectTag => 
            projectTag.toLowerCase() === activeTag.toLowerCase()
          )
        );
      });
    }
    
    // Filtrer par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      projects = projects.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.tags.some(tag => normalizeTag(tag).toLowerCase().includes(query)) ||
        project.meta.industry.toLowerCase().includes(query)
      );
    }
    
    return projects;
  }, [activeFilter, activeTags, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const visibleProjects = filteredProjects.slice(0, currentPage * pageSize);

  // prev/next link rel for SEO
  const buildPathWithPage = (page) => {
    const sp = new URLSearchParams(searchParams);
    if (page <= 1) sp.delete('page');
    else sp.set('page', String(page));
    const qs = sp.toString();
    return `/projets${qs ? `?${qs}` : ''}`;
  };
  const prevPath = currentPage > 1 ? buildPathWithPage(currentPage - 1) : null;
  const nextPath = currentPage < totalPages ? buildPathWithPage(currentPage + 1) : null;
  usePaginationLinks(prevPath, nextPath);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
    setActiveTags([]);
    setSearchQuery('');
    setSearchParams({}); // reset page to 1
    setFiltersOpen(false);
    trackEvent('projects_filter_category', { category: filterId });
  }, [setSearchParams]);

  const handleTagClick = useCallback((tag) => {
    setActiveTags(prev => {
      let newTags;
      if (prev.includes(tag)) {
        // Retirer le tag s'il est déjà sélectionné
        newTags = prev.filter(t => t !== tag);
        trackEvent('projects_filter_tag_remove', { tag });
      } else {
        // Ajouter le tag
        newTags = [...prev, tag];
        trackEvent('projects_filter_tag_add', { tag });
      }
      
      setActiveFilter('all');
      setSearchQuery('');
      
      if (newTags.length > 0) {
        setSearchParams({ tags: newTags.join(',') }); // page reset
      } else {
        setSearchParams({}); // page reset
      }
      
      return newTags;
    });
  }, [setSearchParams]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(value.length > 0);
    trackEvent('projects_search', { query: value });
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
    trackEvent('projects_search_clear');
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setActiveFilter('all');
    setActiveTags([]);
    setSearchParams({}); // page reset
    trackEvent('projects_filters_reset');
  }, [setSearchParams]);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
    trackEvent('projects_filters_toggle', { open: !filtersOpen });
  };

  const closeFilters = () => {
    setFiltersOpen(false);
    trackEvent('projects_filters_toggle', { open: false });
  };

  const loadMore = () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    const sp = new URLSearchParams(searchParams);
    if (nextPage <= 1) sp.delete('page');
    else sp.set('page', String(nextPage));
    setSearchParams(sp);
    trackEvent('projects_load_more', { to_page: nextPage });
  };

  return (
    <div className="portfolio">
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>

      {/* HERO */}
      <section className="page-hero" aria-labelledby="portfolio-title">
        <div className="hero-content">
          <nav aria-label="Fil d'Ariane" className="breadcrumb">
            <Link to="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Projets</span>
          </nav>
          
          <div className="hero-text">
            <h1 id="portfolio-title" className="page-title">
              NOS<br />
              RÉALISATIONS
            </h1>
            
            <p className="page-subtitle">
              Une sélection de projets web, mobile et d'automatisation 
              réalisés pour des clients de différents secteurs.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER BUTTON - STICKY */}
      <button 
        className="filter-toggle-btn"
        onClick={toggleFilters}
        aria-label="Ouvrir les filtres"
        aria-expanded={filtersOpen}
      >
        <span className="filter-icon">⚙</span>
        <span className="filter-label">Filtres</span>
        {(activeFilter !== 'all' || activeTags.length > 0) && (
          <span className="filter-active-badge">{activeTags.length || ''}</span>
        )}
      </button>

      {/* FILTERS SIDEBAR MODAL */}
      <aside 
        className={`filters-sidebar ${filtersOpen ? 'open' : ''}`}
        aria-label="Panneau de filtres"
      >
        <div className="filters-sidebar-header">
          <h2 className="filters-sidebar-title">Filtres & Recherche</h2>
          <button 
            className="filters-close-btn"
            onClick={closeFilters}
            aria-label="Fermer les filtres"
          >
            ✕
          </button>
        </div>

        <div className="filters-sidebar-content">
          {/* Search Bar */}
          <div className="search-wrapper">
            <label htmlFor="project-search" className="search-label">
              Rechercher
            </label>
            <div className="search-input-wrapper">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                id="project-search"
                type="search"
                className="search-input"
                placeholder="Nom, technologie, secteur..."
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Rechercher un projet"
              />
              {isSearching && (
                <button
                  onClick={clearSearch}
                  className="search-clear"
                  aria-label="Effacer la recherche"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter List - Categories */}
          <div className="filter-list">
            <h3 className="filter-list-title">Catégories</h3>
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-item ${activeFilter === filter.id && activeTags.length === 0 ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter.id)}
              >
                <span className="filter-item-label">{filter.label}</span>
                <span className="filter-item-count">{filter.count}</span>
              </button>
            ))}
          </div>

          {/* Filter List - Tags */}
          <div className="filter-list">
            <h3 className="filter-list-title">Technologies (sélection multiple)</h3>
            <div className="tags-list">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-filter-item ${activeTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tags Display */}
          {activeTags.length > 0 && (
            <div className="active-tags-display">
              <div className="active-tags-label">Filtres actifs :</div>
              <div className="active-tags-list">
                {activeTags.map((tag) => (
                  <span key={tag} className="active-tag-badge">
                    {tag}
                    <button
                      onClick={() => handleTagClick(tag)}
                      className="remove-tag-btn"
                      aria-label={`Retirer ${tag}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reset Button */}
          {(searchQuery || activeFilter !== 'all' || activeTags.length > 0) && (
            <button 
              onClick={resetFilters}
              className="btn-reset-filters"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </aside>

      {/* Overlay */}
      {filtersOpen && (
        <div 
          className="filters-overlay" 
          onClick={closeFilters}
          aria-hidden="true"
        />
      )}

      {/* PROJECTS */}
      <section 
        className="projects-section" 
        id="main-content"
        aria-labelledby="projects-heading"
      >
        <div className="projects-container">
          <div className="projects-count" role="status" aria-live="polite">
            {activeTags.length > 0 && (
              <span>Projets avec {activeTags.join(' + ')} : </span>
            )}
            {isSearching && searchQuery && (
              <span>Résultats pour « {searchQuery} » : </span>
            )}
            <strong>{filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''}</strong>
          </div>

          {filteredProjects.length > 0 ? (
            <div 
              className="projects-grid" 
              id="projects-grid"
              role="list"
            >
              {visibleProjects.map((project, index) => {
                return (
                  <article
                    key={project.id}
                    className="project-card"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    role="listitem"
                  >
                    <Link
                      to={`/project/${project.id}`}
                      className="project-card-link"
                      aria-label={`Voir le projet ${project.title.replace(/\n/g, ' ')}`}
                    >
                      <div className="project-image-container">
                        <img 
                          src={getImageForProject(project.id, index)}
                          alt={project.title}
                          className="project-image-placeholder"
                          loading="lazy"
                          decoding="async"
                          width="600"
                          height="400"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getFallbackImage(index); }}
                        />
                        
                        {/* Tags - visible au hover uniquement */}
                        <div className="project-tags-overlay">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="project-tag">{normalizeTag(tag)}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="project-info">
                        <h3 className="project-name">{project.title.replace(/\n/g, ' ')}</h3>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <span className="empty-icon" aria-hidden="true">🔍</span>
              <h2 className="empty-title">Aucun projet trouvé</h2>
              <p className="empty-text">
                {searchQuery 
                  ? `Aucun résultat pour "${searchQuery}". Essayez avec d'autres mots-clés.`
                  : activeTags.length > 0
                  ? `Aucun projet avec la combinaison ${activeTags.join(' + ')}.`
                  : 'Aucun projet dans cette catégorie pour le moment.'}
              </p>
              {(searchQuery || activeFilter !== 'all' || activeTags.length > 0) && (
                <button 
                  onClick={resetFilters}
                  className="btn-reset"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}
          {currentPage * pageSize < filteredProjects.length && (
            <div className="pagination-actions">
              <button className="btn-secondary" onClick={loadMore}>
                Afficher plus de projets
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <nav className="pagination-nav" aria-label="Pagination des projets">
              <div className="pagination-bar">
                <Link
                  to={prevPath || buildPathWithPage(1)}
                  className={`pagination-link arrow ${currentPage === 1 ? 'disabled' : ''}`}
                  aria-disabled={currentPage === 1}
                >
                  ← Précédent
                </Link>
                <ul className="pagination-pages" role="list">
                  {pages.map((p) => (
                    <li key={p} role="listitem">
                      <Link
                        to={buildPathWithPage(p)}
                        className={`pagination-page ${p === currentPage ? 'active' : ''}`}
                        aria-current={p === currentPage ? 'page' : undefined}
                      >
                        {p}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={nextPath || buildPathWithPage(totalPages)}
                  className={`pagination-link arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                  aria-disabled={currentPage === totalPages}
                >
                  Suivant →
                </Link>
              </div>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}