// SEO utilities for a SPA with React Router
// - useSEO({ title, description, canonicalPath })
// - useJsonLd(id, data) to inject JSON-LD
// - getSiteUrl() helper for absolute URLs

import { useEffect } from 'react';

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

function setMetaProperty(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function useSEO({ title, description, canonicalPath, robots }) {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const canonical = canonicalPath
      ? `${siteUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
      : window.location.href;

    if (title) document.title = title;
    if (description) setMeta('description', description);
    setCanonical(canonical);
    if (robots) setMeta('robots', robots);
  }, [title, description, canonicalPath]);
}

export function useJsonLd(id, data) {
  useEffect(() => {
    if (!data) return;
    const scriptId = `ld-${id}`;
    let el = document.getElementById(scriptId);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.text = JSON.stringify(data);
    return () => {
      // keep JSON-LD in head when navigating; do not remove
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, JSON.stringify(data)]);
}

export function getSiteUrl() {
  return (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
}

export function usePaginationLinks(prevPath, nextPath) {
  useEffect(() => {
    const setLink = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!href) {
        if (link) link.parentNode.removeChild(link);
        return;
      }
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      const siteUrl = getSiteUrl();
      const absolute = href.startsWith('http') ? href : `${siteUrl}${href}`;
      link.setAttribute('href', absolute);
    };
    setLink('prev', prevPath);
    setLink('next', nextPath);
    return () => {
      // no-op on unmount
    };
  }, [prevPath, nextPath]);
}

export function useOpenGraph({ title, description, path, image }) {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const url = path
      ? `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
      : window.location.href;
    const img = image || `${siteUrl}/module-og.png`;
    setMetaProperty('og:type', 'website');
    setMetaProperty('og:title', title || document.title);
    setMetaProperty('og:description', description || '');
    setMetaProperty('og:url', url);
    setMetaProperty('og:image', img);
    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title || document.title);
    setMeta('twitter:description', description || '');
    setMeta('twitter:image', img);
  }, [title, description, path, image]);
}

