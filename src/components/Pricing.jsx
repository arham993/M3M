import { SquaresFour } from '../icons.js';
import { PAYMENT_PLAN, RATE_SHEET } from '../data/project.js';
import EnquireButton from './EnquireButton.jsx';

function Cell({ value, label, rupee = true, big = false }) {
  if (value == null) return <td className="na" data-label={label}>NA</td>;
  return <td className={big ? 'rate' : undefined} data-label={label}>{rupee ? `₹${value}` : value}</td>;
}

export default function Pricing() {
  return (
    <section className="sec pricing" id="pricing">
      <div className="wrap">
        <div className="price-top rv">
          <div>
            <span className="eyebrow">Floor-wise price list</span>
            <h2>Pick your level. Lock today's price.</h2>
          </div>
          <EnquireButton type="Get Detailed Price Sheet">Get Price Sheet</EnquireButton>
        </div>

        <div className="rate-sheet rv">
          <table>
            <caption>Jewel Crest Project Rate Sheet</caption>
            <thead>
              <tr>
                <th scope="col">Floor</th>
                <th scope="col">AR MG Rate (₹)</th>
                <th scope="col">Rental for 2 Years (₹)</th>
                <th scope="col">CAP (₹)</th>
              </tr>
            </thead>
            <tbody>
              {RATE_SHEET.map((r) => (
                <tr key={r.floor}>
                  <td>{r.floor}</td>
                  <Cell value={r.armg} label="AR MG Rate" big />
                  <Cell value={r.rental} label="Rental 2 Yrs" rupee={false} />
                  <Cell value={r.cap} label="CAP" big />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rate-foot">
          <p className="price-note">
            *Rates per sq ft. Prices are indicative and subject to change without notice. Taxes and other charges extra.
            Please confirm current pricing with our sales team.
          </p>
          <EnquireButton variant="dark" small icon={SquaresFour}>Get Floor Plans</EnquireButton>
        </div>

        <div className="plan rv">
          <div>
            <h3>30:70 payment plan</h3>
            <p>Pay 30% now and the balance as the project reaches key milestones.</p>
          </div>
          <div className="plan-bar" style={{ gridTemplateColumns: PAYMENT_PLAN.map((p) => `${p.weight}fr`).join(' ') }}>
            {PAYMENT_PLAN.map((p) => (
              <div className="seg" key={p.when}><b>{p.pct}</b><span>{p.when}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
