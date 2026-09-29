import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/urbanist/500.css';
import '@fontsource/urbanist/600.css';
import '@fontsource/urbanist/700.css';
import '@fontsource/urbanist/500-italic.css';
import './styles.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = <StrictMode><App /></StrictMode>;

// The production build ships pre-rendered HTML (scripts/prerender.js), so hydrate it.
// In dev the root is empty, so render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
