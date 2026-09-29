import { useEffect } from 'react';

/** Fades in every `.rv` element as it scrolls into view (CSS handles reduced motion). */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Locks page scroll while an overlay is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => { root.style.overflow = prev; };
  }, [locked]);
}

/** Calls handler on Escape while active. */
export function useEscape(active, handler) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') handler(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, handler]);
}
