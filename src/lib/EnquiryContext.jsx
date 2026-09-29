import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CONFIG } from '../config.js';
import { downloadBrochure, hasSeenPopup, hasSubmittedLead, markPopupSeen } from './leads.js';

const EnquiryContext = createContext(null);

/**
 * One enquiry popup for the whole page. Any button calls openEnquiry("Download Brochure", ...)
 * and the popup shows that heading. It also opens by itself after CONFIG.popupDelayMs,
 * once per visit, and never after the visitor has already submitted a lead.
 */
export function EnquiryProvider({ children }) {
  const [state, setState] = useState({ open: false, type: 'Enquire Now', source: 'button' });

  const openEnquiry = useCallback((type = 'Enquire Now', source = `cta:${type}`) => {
    // Already a lead and just wants the brochure: give it straight away
    if (type === 'Download Brochure' && hasSubmittedLead()) {
      downloadBrochure();
      return;
    }
    markPopupSeen();
    setState({ open: true, type, source });
  }, []);

  const closeEnquiry = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hasSubmittedLead() || hasSeenPopup()) return;
      setState((s) => {
        if (s.open) return s;
        markPopupSeen();
        return { open: true, type: 'Enquire Now', source: 'auto-popup-10s' };
      });
    }, CONFIG.popupDelayMs);
    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo(() => ({ ...state, openEnquiry, closeEnquiry }), [state, openEnquiry, closeEnquiry]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return ctx;
}
