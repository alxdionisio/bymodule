// Centralized visuals management for projects + site DA
// Reverted to the initial visuals used before changes, while keeping this indirection layer.

export const projectIdToImage = {};

// Original sequence used across Home/Projets (kept as-is)
const genericPalette = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop'
];

export function getImageForProject(projectId, index = 0) {
  return projectIdToImage[projectId] || genericPalette[index % genericPalette.length];
}

export const testimonialsBackground =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&h=1000&fit=crop&q=60&auto=format';

export function getFallbackImage(index = 0) {
  return genericPalette[index % genericPalette.length];
}

