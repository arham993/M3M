/**
 * Site settings. Each value can be overridden at build time with an env var
 * (see .env.example), or edited directly here.
 */
const env = import.meta.env;

export const CONFIG = {
  /** Company name, shown in the footer disclaimer */
  brandName: env.VITE_BRAND_NAME || 'M3M',
  /** Call number, e.g. "+919876543210". Call buttons are hidden while empty. */
  phone: env.VITE_PHONE || '+919999434837',
  /** WhatsApp number, digits only with country code, e.g. "919876543210". Hidden while empty. */
  whatsapp: env.VITE_WHATSAPP || '919999434837',
  /** Google Apps Script web app that writes leads to the Google Sheet (google-sheet/Code.gs) */
  formEndpoint:
    env.VITE_FORM_ENDPOINT ||
    'https://script.google.com/macros/s/AKfycbwgUYh1R9F9ie380CRpYXsJusX35_x19ERXsFhiaFfg-7NbrENMmU6eL54kv2N7eRbIfQ/exec',
  /** Link to your privacy policy */
  privacyUrl: env.VITE_PRIVACY_URL || '#',
  /** Auto enquiry popup delay */
  popupDelayMs: 10000,
  /** File downloaded after a "Download Brochure" enquiry (in /public) */
  brochureFile: 'M3M-Jewel-Crest-Brochure.pdf',
  projectName: 'M3M Jewel Crest Sector 97',
};

/** Prefix a /public file with the deploy base path ("/" on your domain). */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
