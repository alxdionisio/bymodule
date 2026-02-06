// Centralized visuals management for projects + site DA
// Uses local curated images for reliable, creative visuals (works in Node + Vite)

const BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ||
  process.env.BASE_URL ||
  process.env.VITE_BASE_URL ||
  '/';

export const projectIdToImage = {
  'ecommerce-edition': `${BASE_URL}images/Gallmeister-BookCard-desktop.png`,
  'app-restaurant': `${BASE_URL}images/Spot%20-%20Screenshot%20-%20iPhone%2017%20-%202026-02-05%20at%2023.21.35.png`,
  'recipe-website': `${BASE_URL}images/macuisinesante-homepage.png`,
  'pest-control': `${BASE_URL}images/ActionNuisibles13-homepage.png`,
};

// Placeholders MacBook Pro (alternating) pour les cartes projets
const genericPalette = [
  // 1. URL fournie par l'utilisateur
  'https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 2. URL fournie par l'utilisateur
  'https://images.unsplash.com/photo-1738494610263-4e27d9d4e201?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export function getImageForProject(projectId, index = 0) {
  // Toujours alterner entre les 2 visuels partagés pour les cartes preview,
  // sans utiliser d'images maquettes spécifiques aux projets.
  return genericPalette[index % genericPalette.length];
}

export const testimonialsBackground =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&h=1000&fit=crop&q=60&auto=format';

export function getFallbackImage(index = 0) {
  return genericPalette[index % genericPalette.length];
}

