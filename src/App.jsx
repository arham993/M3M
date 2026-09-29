import { EnquiryProvider } from './lib/EnquiryContext.jsx';
import { useReveal } from './hooks/useReveal.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import { Overview, Highlights } from './components/Overview.jsx';
import Pricing from './components/Pricing.jsx';
import Gallery from './components/Gallery.jsx';
import { Location, LifestyleMix } from './components/Location.jsx';
import { FinalEnquiry, Footer, FloatingActions } from './components/Footer.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';

function Page() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Highlights />
        <Pricing />
        <Gallery />
        <Location />
        <LifestyleMix />
        <FinalEnquiry />
      </main>
      <Footer />
      <FloatingActions />
      <EnquiryModal />
    </>
  );
}

export default function App() {
  return (
    <EnquiryProvider>
      <Page />
    </EnquiryProvider>
  );
}
