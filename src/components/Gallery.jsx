import { useCallback, useEffect, useMemo, useState } from 'react';
import { CaretLeft, CaretRight, Images, X } from '../icons.js';
import { asset } from '../config.js';
import { GALLERY, GALLERY_TABS } from '../data/project.js';
import { useEscape, useScrollLock } from '../hooks/useReveal.js';
import EnquireButton from './EnquireButton.jsx';

const INITIAL_COUNT = 9;

function Lightbox({ items, index, onClose, onStep }) {
  const open = index != null;
  useScrollLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onStep]);

  if (!open) return null;
  const item = items[index];
  return (
    <div className="lb open" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button type="button" className="lb-x" onClick={onClose} aria-label="Close"><X /></button>
      <button type="button" className="lb-p" onClick={() => onStep(-1)} aria-label="Previous image"><CaretLeft /></button>
      <img src={asset(`images/${item.file}.jpg`)} alt={item.alt} />
      <button type="button" className="lb-n" onClick={() => onStep(1)} aria-label="Next image"><CaretRight /></button>
      <EnquireButton className="lb-cta" onBeforeOpen={onClose}>Download Brochure</EnquireButton>
    </div>
  );
}

export default function Gallery() {
  const [tab, setTab] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const visible = useMemo(() => {
    const matches = GALLERY.filter((g) => tab === 'all' || g.cat === tab);
    return tab === 'all' && !expanded ? matches.slice(0, INITIAL_COUNT) : matches;
  }, [tab, expanded]);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback((d) => setOpenIndex((i) => (i + d + visible.length) % visible.length), [visible.length]);

  return (
    <section className="sec" id="gallery">
      <div className="wrap">
        <div className="gal-head rv">
          <h2>Gallery</h2>
          <div className="tabs" role="tablist" aria-label="Filter gallery">
            {GALLERY_TABS.map((t) => (
              <button key={t.id} type="button" className="tab" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="masonry">
          {visible.map((g, i) => (
            <button key={g.file} type="button" className={i === 0 ? 'big' : undefined} onClick={() => setOpenIndex(i)} aria-label={`View: ${g.alt}`}>
              <img src={asset(`images/thumbs/${g.file}.jpg`)} alt={g.alt} loading="lazy" width="820" height="461" />
            </button>
          ))}
        </div>

        <div className="gal-foot">
          {tab === 'all' && !expanded && (
            <button type="button" className="btn btn-line" onClick={() => setExpanded(true)}>
              <Images aria-hidden="true" />View All Photos
            </button>
          )}
          <EnquireButton>Download Brochure</EnquireButton>
        </div>
      </div>

      <Lightbox items={visible} index={openIndex} onClose={close} onStep={step} />
    </section>
  );
}
