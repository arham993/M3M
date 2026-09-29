import { useEffect, useRef, useState } from 'react';
import { PhoneCall } from '../icons.js';
import { CONFIG } from '../config.js';
import { NAV } from '../data/project.js';
import EnquireButton from './EnquireButton.jsx';

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="M3M Jewel Crest home">
      <b>M3M Jewel Crest</b><span>Sector 97, Noida</span>
    </a>
  );
}

export default function Header() {
  const sentinel = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // Border appears once the page is scrolled (IntersectionObserver, no scroll listener)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    if (sentinel.current) io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="top-sentinel" aria-hidden="true" />
      <header className={`hdr${scrolled ? ' scrolled' : ''}`} id="top">
        <div className="wrap">
          <Logo />
          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <div className="hdr-cta">
            {CONFIG.phone && (
              <a className="hdr-call" href={`tel:${CONFIG.phone}`}>
                <PhoneCall aria-hidden="true" />{CONFIG.phone.replace(/^\+91/, '+91 ')}
              </a>
            )}
            <EnquireButton small>Enquire Now</EnquireButton>
          </div>
        </div>
      </header>
    </>
  );
}
