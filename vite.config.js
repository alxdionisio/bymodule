import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages base handling:
// - username.github.io → base '/'
// - username.github.io/repo → base '/repo/'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '';
const isCI = !!process.env.GITHUB_ACTIONS;
const isUserSite = repoName && repoName.endsWith('.github.io');

export default defineConfig({
  plugins: [react()],
  base: isCI ? (isUserSite ? '/' : repoName ? `/${repoName}/` : '/') : '/',
  server: {
    port: 3000,
    open: true,
  },
});
