import { useEffect, useState } from 'react';
import { CheckCircle, DownloadSimple, Phone, WhatsappLogo } from '../icons.js';
import { CONFIG, asset } from '../config.js';
import { EnquiryProvider } from '../lib/EnquiryContext.jsx';
import { downloadBrochure, readThankYouContext } from '../lib/leads.js';
import { Logo } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import EnquiryModal from '../components/EnquiryModal.jsx';

const HOME = asset('');
const NEXT_STEPS = [
  { title: 'A call back shortly', text: 'Our property advisor will call you within a few hours.' },
  { title: 'Price sheet and floor plans', text: 'Shared on WhatsApp and email for your preferred level.' },
  { title: 'Site visit', text: 'Scheduled at a time that suits you.' },
];
const PHOTOS = [
  ['retail-podium-night', 'Retail podium at night'],
  ['atrium-sphere', 'Central atrium'],
  ['towers-golf', 'Towers from the greens'],
];

function ThankYouContent() {
  // Read after hydration so the pre-rendered HTML matches (name lives in sessionStorage)
  const [ctx, setCtx] = useState({ name: '', brochure: false });

  useEffect(() => {
    const c = readThankYouContext();
    setCtx(c);
    (window.dataLayer = window.dataLayer || []).push({ event: 'lead_thank_you', lead_request: c.request || 'unknown' });
    if (c.brochure) downloadBrochure();
  }, []);

  const wa = CONFIG.whatsapp
    && `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hi, I just enquired about M3M Jewel Crest, Sector 97 Noida. Please share the details.')}`;

  return (
    <>
      <header className="hdr scrolled hdr-ty">
        <div className="wrap">
          <Logo href={HOME} />
          <div className="hdr-cta">
            <a className="btn btn-line btn-sm" href={HOME}>Back to Home</a>
          </div>
        </div>
      </header>

      <main className="ty">
        <section className="wrap ty-hero">
          <div className="ty-card">
            <CheckCircle weight="fill" className="ty-icon" aria-hidden="true" />
            <h1>{ctx.name ? `Thank you, ${ctx.name}!` : 'Thank you!'}</h1>
            <p className="lead">
              Your enquiry for M3M Jewel Crest, Sector 97 Noida has been received. Our property advisor will call you
              shortly with the price sheet, floor plans and today's availability.
            </p>
            {ctx.brochure && (
              <p className="ty-note">Your brochure is downloading. If it doesn't start, use the button below.</p>
            )}
            <div className="cta-row ty-actions">
              <a className="btn btn-dark" href={asset(CONFIG.brochureFile)} download>
                <DownloadSimple aria-hidden="true" />Download Brochure
              </a>
              {wa && (
                <a className="btn btn-line" href={wa} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo aria-hidden="true" />Chat on WhatsApp
                </a>
              )}
              {CONFIG.phone && (
                <a className="btn btn-line" href={`tel:${CONFIG.phone}`}><Phone aria-hidden="true" />Call Us</a>
              )}
            </div>
          </div>

          <ol className="ty-steps">
            {NEXT_STEPS.map((s) => (
              <li key={s.title}><b>{s.title}</b><span>{s.text}</span></li>
            ))}
          </ol>
        </section>

        <section className="wrap ty-photos" aria-label="Project images">
          {PHOTOS.map(([file, alt]) => (
            <img key={file} src={asset(`images/thumbs/${file}.jpg`)} alt={alt} width="820" height="461" loading="lazy" />
          ))}
        </section>

        <p className="wrap ty-home"><a href={HOME}>Explore the project again</a></p>
      </main>

      <Footer />
      <EnquiryModal />
    </>
  );
}

export default function ThankYouPage() {
  return (
    <EnquiryProvider autoPopup={false}>
      <ThankYouContent />
    </EnquiryProvider>
  );
}
