import { DISTANCES, LIFESTYLE_MIX } from '../data/project.js';

export function Location() {
  return (
    <section className="sec sec-flush" id="location">
      <div className="wrap loc">
        <div className="rv">
          <h2>Sector 97, on the Noida-Greater Noida Expressway</h2>
          <p className="lead">
            Drawing shoppers from Delhi, Noida, Greater Noida and Gurugram, close to established hubs like DLF Mall of India and Atta Market.
          </p>
          <div className="dist">
            {DISTANCES.map((d) => <div key={d.place}><b>{d.time}</b><span>{d.place}</span></div>)}
          </div>
        </div>
        <div className="map rv">
          <iframe
            title="Map of Sector 97, Noida"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Sector%2097%2C%20Noida%2C%20Uttar%20Pradesh&z=14&output=embed"
          />
        </div>
      </div>
    </section>
  );
}

export function LifestyleMix() {
  return (
    <section className="mix">
      <div className="wrap">
        <h2 className="rv">Planned for a complete lifestyle mix</h2>
        <div className="pills rv">
          {LIFESTYLE_MIX.map(({ icon: Icon, label }) => (
            <span className="pill" key={label}><Icon aria-hidden="true" />{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
