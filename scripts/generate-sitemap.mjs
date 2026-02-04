import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Import project and services data
const projectsMod = await import(pathToFileURL(resolve(process.cwd(), 'src/data/projects.js')).href);
const servicesMod = await import(pathToFileURL(resolve(process.cwd(), 'src/data/services.js')).href);

const getAllProjects = projectsMod.getAllProjects || (() => []);
const getAllServices = servicesMod.getAllServices || (() => Object.values(servicesMod.default || {}));

const siteUrl = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://example.com';
const urls = [
  '/',
  '/projets',
  '/services',
  '/contact',
  ...getAllProjects().map(p => `/project/${p.id}`),
  ...getAllServices().map(s => `/service/${s.id}`),
];

const now = new Date().toISOString();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteUrl.replace(/\/$/, '')}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

mkdirSync(resolve(process.cwd(), 'public'), { recursive: true });
writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), xml, 'utf-8');
console.log(`Sitemap generated with ${urls.length} URLs`);

