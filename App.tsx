import React from 'react';
import HorizontalFlow from './components/HorizontalFlow';
import VerticalSection from './components/VerticalSection';
import HorizontalVideoSection from './components/HorizontalVideoSection';

const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-[#050505] text-[#e0e0e0] overflow-x-hidden selection:bg-orange-500 selection:text-black">
      {/* First Section: Horizontal Scroll (Pinned) */}
      <HorizontalFlow />
      
      {/* Second Section: Vertical Scroll (Natural) */}
      <VerticalSection />

      {/* Third Section: Cinematic Video Horizontal Scroll */}
      <HorizontalVideoSection />
      
      {/* Footer / Scroll hint */}
      <div className="fixed bottom-8 left-8 z-50 mix-blend-difference pointer-events-none">
        <p className="font-mono text-xs text-white/50 uppercase tracking-widest">
          Scroll Down &darr;
        </p>
      </div>
    </main>
  );
};

export default App;