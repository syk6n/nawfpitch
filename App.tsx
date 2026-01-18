import React from 'react';
import HorizontalFlow from './components/HorizontalFlow';
import VerticalSection from './components/VerticalSection';
import HorizontalVideoSection from './components/HorizontalVideoSection';
import EditorialCollage from './components/EditorialCollage';
import TextRevealSection from './components/TextRevealSection';
import VennSection from './components/VennSection';
import OverlapSection from './components/OverlapSection';
import ServiceListing from './components/ServiceListing';
import AutomationSection from './components/AutomationSection';
import InfluencerSection from './components/InfluencerSection';
import EditorialContrast from './components/EditorialContrast';
import FarmleySection from './components/FarmleySection';
import ClosingSection from './components/ClosingSection';
import TeaserSection from './components/TeaserSection';
import ContactSection from './components/ContactSection';
import NawfLogo from './components/NawfLogo';

const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-[#050505] text-[#e0e0e0] overflow-x-hidden selection:bg-orange-500 selection:text-black">
      {/* First Section: Horizontal Scroll (Pinned) */}
      <HorizontalFlow />
      
      {/* Second Section: Vertical Scroll (Natural) */}
      <VerticalSection />

      {/* Third Section: Cinematic Video Horizontal Scroll */}
      <HorizontalVideoSection />

      {/* Fourth Section: Editorial Text Reveal */}
      <TextRevealSection />

      {/* Fifth Section: NAWF Venn Diagram */}
      <VennSection />

      {/* Sixth Section: The Overlap Label */}
      <OverlapSection />

      {/* Seventh Section: Service Listing */}
      <ServiceListing />

      {/* Eighth Section: Automation Dashboard */}
      <AutomationSection />

      {/* Ninth Section: AI Influencer Tease (Aira & Dhairya) */}
      <InfluencerSection />

      {/* Tenth Section: Editorial Collage (Evidence Wall) */}
      <EditorialCollage />

      {/* Eleventh Section: Editorial Contrast (Critique) */}
      <EditorialContrast />
      
      {/* Twelfth Section: Farmley Strategy (Tree) */}
      <FarmleySection />

      {/* Visual Gap/Spacer */}
      <div className="w-full h-24 md:h-40 bg-[#050505] relative z-20" />

      {/* Thirteenth Section: Closing Manifesto */}
      <ClosingSection />

      {/* Fourteenth Section: The Final Teaser */}
      <TeaserSection />

      {/* Fifteenth Section: Contact */}
      <ContactSection />

      {/* Footer / Scroll hint */}
      <div className="fixed bottom-8 left-8 z-50 mix-blend-difference pointer-events-none">
        <p className="font-mono text-xs text-white/50 uppercase tracking-widest">
          Scroll Down &darr;
        </p>
      </div>

      {/* Persistent Logo */}
      <NawfLogo />
    </main>
  );
};

export default App;