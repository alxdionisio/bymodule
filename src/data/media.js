// Centralized visuals management for projects + site DA
// Uses local curated images for reliable, creative visuals (works in Node + Vite)

const BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ||
  process.env.BASE_URL ||
  process.env.VITE_BASE_URL ||
  '/';

import { projectsData } from './projects.js';

// Une miniature par projet : première image du slider (media[0])
export const projectIdToImage = {};
if (typeof projectsData === 'object') {
  Object.keys(projectsData).forEach((id) => {
    const p = projectsData[id];
    if (p?.media?.length > 0 && p.media[0].src) {
      projectIdToImage[id] = p.media[0].src;
    }
  });
}

// Fallback pour projets sans image (cartes)
const genericPalette = [
  'https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1738494610263-4e27d9d4e201?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export function getImageForProject(projectId, index = 0) {
  if (projectIdToImage[projectId]) {
    return projectIdToImage[projectId];
  }
  return genericPalette[index % genericPalette.length];
}

export const testimonialsBackground =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&h=1000&fit=crop&q=60&auto=format';

export function getFallbackImage(index = 0) {
  return genericPalette[index % genericPalette.length];
}

