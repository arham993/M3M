import { useEffect, useRef } from 'react';
import { CheckCircle, X } from '../icons.js';
import { asset } from '../config.js';
import { ENQUIRY_COPY, MODAL_POINTS } from '../data/project.js';
import { useEnquiry } from '../lib/EnquiryContext.jsx';
import { useEscape, useScrollLock } from '../hooks/useReveal.js';
import LeadForm from './LeadForm.jsx';

export default function EnquiryModal() {
  const { open, type, source, closeEnquiry } = useEnquiry();
  const copy = ENQUIRY_COPY[type] || ENQUIRY_COPY['Enquire Now'];
  const nameRef = useRef(null);
  const returnFocus = useRef(null);

  useScrollLock(open);
  useEscape(open, closeEnquiry);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement;
      const t = window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 250);
      return () => window.clearTimeout(t);
    }
    returnFocus.current?.focus?.({ preventScroll: true });
    return undefined;
  }, [open]);

  return (
    <div className={`modal${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="enquiry-title" aria-hidden={!open}>
      <div className="modal-bg" onClick={closeEnquiry} />
      <div className="modal-box">
        <button type="button" className="x" onClick={closeEnquiry} aria-label="Close"><X /></button>
        <div className="modal-art" style={{ backgroundImage: `url(${asset('images/thumbs/clock-facade.jpg')})` }}>
          <b>M3M Jewel Crest, Sector 97</b>
          <ul>
            {MODAL_POINTS.map((p) => <li key={p}><CheckCircle weight="fill" aria-hidden="true" />{p}</li>)}
          </ul>
        </div>
        <div className="modal-body">
          <h3 id="enquiry-title">{type}</h3>
          <p>{copy.sub}</p>
          {/* key remounts the form for each new enquiry type, so its state is fresh */}
          <LeadForm key={`${type}|${source}`} request={type} source={source} ctaLabel={copy.cta} nameInputRef={nameRef} />
        </div>
      </div>
    </div>
  );
}
