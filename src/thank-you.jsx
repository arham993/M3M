import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './base.js';
import ThankYouPage from './pages/ThankYou.jsx';

const root = document.getElementById('root');
const page = <StrictMode><ThankYouPage /></StrictMode>;

if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
