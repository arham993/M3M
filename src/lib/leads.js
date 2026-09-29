import { CONFIG, asset } from '../config.js';

const LEAD_KEY = 'jc_lead';
const POPUP_KEY = 'jc_popup_seen';

/** sessionStorage can throw in private mode or when blocked, so every access is guarded. */
const session = {
  get(key) { try { return window.sessionStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { window.sessionStorage.setItem(key, value); } catch { /* ignore */ } },
};

export const hasSubmittedLead = () => session.get(LEAD_KEY) === '1';
export const hasSeenPopup = () => session.get(POPUP_KEY) === '1';
export const markPopupSeen = () => session.set(POPUP_KEY, '1');

/** UTM / click ids from the landing URL, e.g. "utm_source=google&utm_campaign=jc" */
export function readCampaign() {
  const qs = new URLSearchParams(window.location.search);
  return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']
    .filter((k) => qs.get(k))
    .map((k) => `${k}=${qs.get(k)}`)
    .join('&');
}

export function validateLead({ name, phone, email, consent }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Please enter your name';
  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = 'Enter a valid 10-digit mobile number';
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email';
  if (!consent) errors.consent = 'Please agree to be contacted';
  return errors;
}

/**
 * Sends a lead to the Google Sheet web app.
 * sendBeacon queues the POST in the background (it survives the visitor closing the tab),
 * so the thank-you can show instantly. URL-encoded so Apps Script reads it into e.parameter.
 */
export async function submitLead(fields, honeypot = '') {
  const data = {
    project: CONFIG.projectName,
    ...fields,
    page: window.location.href.split('?')[0],
    utm: readCampaign(),
    submitted_at: new Date().toISOString(),
  };

  if (CONFIG.formEndpoint) {
    const body = new URLSearchParams({ ...data, website: honeypot });
    const queued = typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(CONFIG.formEndpoint, body);
    if (!queued) {
      await fetch(CONFIG.formEndpoint, { method: 'POST', body, mode: 'no-cors', keepalive: true });
    }
  } else {
    console.warn('[Lead] CONFIG.formEndpoint is empty. Lead not sent anywhere:', data);
  }

  session.set(LEAD_KEY, '1');
  (window.dataLayer = window.dataLayer || []).push({ event: 'generate_lead', lead_request: data.request });
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
  return data;
}

export function downloadBrochure() {
  const a = document.createElement('a');
  a.href = asset(CONFIG.brochureFile);
  a.download = '';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
