import { useId, useRef, useState } from 'react';
import { CheckCircle } from '../icons.js';
import { INTEREST_OPTIONS } from '../data/project.js';
import { downloadBrochure, submitLead, validateLead } from '../lib/leads.js';

/** Keeps 10 digits, so pasted numbers like "+91 98123 45678" or "098123 45678" work */
function normalisePhone(raw) {
  let d = raw.replace(/\D/g, '');
  if (d.length > 10 && d.startsWith('91')) d = d.slice(2);
  if (d.length > 10 && d.startsWith('0')) d = d.slice(1);
  return d.slice(0, 10);
}

const EMPTY = { name: '', phone: '', email: '', interest: INTEREST_OPTIONS[0], consent: true };

/**
 * Lead capture form used in the popup and the enquiry section.
 * `request` is the enquiry type saved to the sheet; `source` says which button/popup it came from.
 */
export default function LeadForm({ request = 'Enquire Now', source = 'section-form', ctaLabel = 'Get Call Back', nameInputRef }) {
  const id = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const honeypot = useRef(null);
  const localNameRef = useRef(null);
  const nameRef = nameInputRef || localNameRef;
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const set = (key) => (e) => {
    let v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (key === 'phone') v = normalisePhone(v);
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((s) => ({ ...s, [key]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateLead(values);
    setErrors(found);
    if (Object.keys(found).length) {
      ({ name: nameRef, phone: phoneRef, email: emailRef }[Object.keys(found)[0]])?.current?.focus();
      return;
    }
    setStatus('sending');
    try {
      await submitLead({
        name: values.name.trim(),
        phone: `+91${values.phone}`,
        email: values.email.trim(),
        interest: values.interest,
        request,
        source,
      }, honeypot.current?.value || '');
      setStatus('done');
      if (request === 'Download Brochure') downloadBrochure();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="form-ok" role="status">
        <CheckCircle weight="fill" aria-hidden="true" />
        <h3>Thank you!</h3>
        <p>
          {request === 'Download Brochure'
            ? 'Your brochure is downloading. Our advisor will call you shortly.'
            : 'Our advisor will call you shortly with the price sheet and availability.'}
        </p>
      </div>
    );
  }

  const field = (key) => `${id}-${key}`;
  return (
    <form className="lead-form" noValidate onSubmit={onSubmit}>
      <div className={`field${errors.name ? ' invalid' : ''}`}>
        <label htmlFor={field('name')}>Full name</label>
        <input id={field('name')} ref={nameRef} name="name" autoComplete="name" placeholder="Your name"
          value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={field('name-err')} />
        <span className="err" id={field('name-err')}>{errors.name}</span>
      </div>

      <div className={`field${errors.phone ? ' invalid' : ''}`}>
        <label htmlFor={field('phone')}>Mobile number</label>
        <div className="phone-wrap">
          <span>+91</span>
          <input id={field('phone')} ref={phoneRef} name="phone" type="tel" inputMode="numeric" autoComplete="tel-national"
            placeholder="10-digit mobile" value={values.phone} onChange={set('phone')}
            aria-invalid={!!errors.phone} aria-describedby={field('phone-err')} />
        </div>
        <span className="err" id={field('phone-err')}>{errors.phone}</span>
      </div>

      <div className="row-2">
        <div className={`field${errors.email ? ' invalid' : ''}`}>
          <label htmlFor={field('email')}>Email (optional)</label>
          <input id={field('email')} ref={emailRef} name="email" type="email" autoComplete="email" placeholder="you@email.com"
            value={values.email} onChange={set('email')} aria-invalid={!!errors.email} />
          <span className="err">{errors.email}</span>
        </div>
        <div className="field">
          <label htmlFor={field('interest')}>Interested in</label>
          <select id={field('interest')} name="interest" value={values.interest} onChange={set('interest')}>
            {INTEREST_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <label className={`consent${errors.consent ? ' invalid' : ''}`}>
        <input type="checkbox" name="consent" checked={values.consent} onChange={set('consent')} />
        <span>I agree to be contacted about this project by call, SMS or WhatsApp.</span>
      </label>

      {/* Spam trap: hidden from people, bots fill it in */}
      <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />

      <button className="btn btn-enquire" type="submit" disabled={status === 'sending'}>
        <span className="spark" aria-hidden="true" />
        {status === 'sending' ? 'Sending...' : status === 'error' ? 'Try again' : ctaLabel}
      </button>
    </form>
  );
}
