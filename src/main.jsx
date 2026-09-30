import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './base.js';
import App from './App.jsx';

const root = document.getElementById('root');
const app = <StrictMode><App /></StrictMode>;

// The production build ships pre-rendered HTML (scripts/prerender.js), so hydrate it.
// In dev the root is empty, so render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
