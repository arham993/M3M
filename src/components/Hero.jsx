import { DownloadSimple, SealCheck } from '../icons.js';
import { asset } from '../config.js';
import { FACTS, RERA_NO } from '../data/project.js';
import EnquireButton from './EnquireButton.jsx';

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow rv" style={{ '--i': 0 }}>Noida-Greater Noida Expressway</span>
            <h1 className="rv" style={{ '--i': 1 }}>The defining landmark of <em>retail</em> in Noida</h1>
            <p className="lead rv" style={{ '--i': 2 }}>
              Luxury retail, dining and anchor spaces across five levels on a 6&#8209;acre, three&#8209;side&#8209;open site in Sector 97.
            </p>
            <div className="hero-price rv" style={{ '--i': 3 }}>Retail shops from <strong>₹65 Lacs*</strong></div>
            <div className="cta-row rv" style={{ '--i': 4 }}>
              <EnquireButton>Enquire Now</EnquireButton>
              <EnquireButton variant="line" icon={DownloadSimple}>Download Brochure</EnquireButton>
            </div>
          </div>
          <div className="hero-media rv" style={{ '--i': 2 }}>
            <img src={asset('images/retail-podium-night.jpg')} alt="M3M Jewel Crest retail podium lit up at night"
              width="1800" height="1013" fetchpriority="high" />
            <div className="hero-note">
              <SealCheck weight="fill" aria-hidden="true" />
              <div><small>UP RERA Approved</small><b>{RERA_NO}</b></div>
            </div>
          </div>
        </div>
      </section>

      <div className="facts">
        <div className="wrap">
          {FACTS.map((f) => (
            <div className="fact" key={f.label}><b>{f.value}</b><span>{f.label}</span></div>
          ))}
        </div>
      </div>
    </>
  );
}
