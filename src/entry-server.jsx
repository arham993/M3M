import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import ThankYouPage from './pages/ThankYou.jsx';

/** Used only at build time to pre-render each page's HTML */
export const pages = {
  'index.html': () => renderToString(<StrictMode><App /></StrictMode>),
  'thank-you/index.html': () => renderToString(<StrictMode><ThankYouPage /></StrictMode>),
};
