import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use repo name as base when building in GitHub Actions (project pages)
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '';
const isCI = !!process.env.GITHUB_ACTIONS;
const isUserSite = repoName && repoName.endsWith('.github.io');

export default defineConfig({
  plugins: [react()],
  base: isCI ? (isUserSite ? '/' : repoName ? `/${repoName}/` : '/') : '/',
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
