import { asset } from '../config.js';
import { HIGHLIGHTS } from '../data/project.js';
import EnquireButton from './EnquireButton.jsx';

export function Overview() {
  return (
    <section className="sec" id="overview">
      <div className="wrap overview">
        <div className="overview-img rv">
          <img src={asset('images/atrium-sphere.jpg')} alt="Central atrium with sculptural sphere and shopfronts" loading="lazy" width="1800" height="1013" />
          <img src={asset('images/thumbs/sky-canopy.jpg')} alt="Rooftop canopy with lattice lighting" loading="lazy" width="820" height="461" />
        </div>
        <div className="rv">
          <h2>Where global brands meet Noida's fastest-growing corridor</h2>
          <p className="lead">
            M3M Jewel Crest is a luxury retail and lifestyle destination planned for global fashion, luxury couture,
            fine dining, artisanal cafés, entertainment and exclusive clubs.
          </p>
          <p>
            An atrium-led design gives every level clear sightlines and easy circulation, while the three-side-open plan
            keeps shopfronts visible from the Expressway. Part of an integrated development with premium residences above.
          </p>
          <EnquireButton>Book a Site Visit</EnquireButton>
        </div>
      </div>
    </section>
  );
}

export function Highlights() {
  return (
    <section className="sec sec-flush" id="highlights">
      <div className="wrap">
        <div className="bento-head rv">
          <h2>Why investors are looking at Jewel Crest</h2>
          <p className="lead">Built for footfall, visibility and long-term value on one of NCR's busiest arterial roads.</p>
        </div>
        <div className="bento">
          {HIGHLIGHTS.map(({ title, text, image, icon: Icon, tint, size }) => {
            const cls = ['tile', 'rv', image && 'img', tint && 'tint', size === 'big' && 't-big', size === 'wide' && 't-wide']
              .filter(Boolean).join(' ');
            return (
              <div key={title} className={cls} style={image ? { backgroundImage: `url(${asset(image)})` } : undefined}>
                {Icon && <Icon aria-hidden="true" />}
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
