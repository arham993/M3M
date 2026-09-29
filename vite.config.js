import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH lets the same build run in a sub-folder (e.g. BASE_PATH=/M3M/ for GitHub Pages).
// On your own domain leave it unset.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  build: { assetsInlineLimit: 0 },
});
