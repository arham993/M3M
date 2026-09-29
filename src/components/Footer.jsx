import { PaperPlaneTilt, Phone, WhatsappLogo } from '../icons.js';
import { CONFIG, asset } from '../config.js';
import { RERA_NO } from '../data/project.js';
import { useEnquiry } from '../lib/EnquiryContext.jsx';
import EnquireButton from './EnquireButton.jsx';
import LeadForm from './LeadForm.jsx';
import { Logo } from './Header.jsx';

const waLink = () =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hi, I am interested in M3M Jewel Crest, Sector 97 Noida. Please share details.')}`;

export function FinalEnquiry() {
  return (
    <section className="final" id="enquire" style={{ backgroundImage: `url(${asset('images/towers-sunset.jpg')})` }}>
      <div className="wrap">
        <div className="rv">
          <h2>Get the price sheet, floor plans and today's availability</h2>
          <p className="lead">Share your details and our property advisor will call you back with the latest inventory and offers.</p>
        </div>
        <div className="card-form rv">
          <h3>Enquire Now</h3>
          <p>Get a call back within a few hours.</p>
          <LeadForm request="Enquire Now" source="section-form" />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <Logo />
          <span className="rera">UP RERA No. {RERA_NO}</span>
          <EnquireButton small>Enquire Now</EnquireButton>
        </div>
        <p className="disclaimer">
          <strong>Disclaimer:</strong> This website is operated by {CONFIG.brandName}, an authorised channel partner, and is not
          the official website of the developer M3M India. Information is for reference only and does not constitute an offer
          or a legally binding agreement. Images, renders, maps and plans are artistic impressions, not to scale and subject to
          change. Prices, payment plans, specifications and availability are subject to change without notice. Please verify
          all details, including area, amenities, terms of sale and payments, with the developer before booking.
        </p>
        <p className="disclaimer">
          By submitting your details you consent to be contacted by {CONFIG.brandName} and its RERA-registered partners by call,
          SMS, WhatsApp or email about this project, overriding any DND registration. <a href={CONFIG.privacyUrl}>Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}

/** Desktop side tab + WhatsApp bubble, and the fixed bottom bar on mobile */
export function FloatingActions() {
  const { openEnquiry } = useEnquiry();
  return (
    <>
      <button type="button" className="side-tab" onClick={() => openEnquiry('Enquire Now')}>ENQUIRE NOW</button>
      {CONFIG.whatsapp && (
        <a className="wa-fab" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <WhatsappLogo weight="fill" />
        </a>
      )}
      <div className="m-bar">
        {CONFIG.phone && <a href={`tel:${CONFIG.phone}`}><Phone aria-hidden="true" />Call</a>}
        {CONFIG.whatsapp && <a href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsappLogo aria-hidden="true" />WhatsApp</a>}
        <button type="button" className="m-enq" onClick={() => openEnquiry('Enquire Now')}>
          <PaperPlaneTilt aria-hidden="true" />Enquire
        </button>
      </div>
    </>
  );
}
