import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/** Used only at build time to pre-render the page into dist/index.html */
export function render() {
  return renderToString(<StrictMode><App /></StrictMode>);
}
