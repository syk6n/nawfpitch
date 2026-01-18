import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const ClosingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 60%',
        toggleActions: 'play none none none'
      }
    });

    // 1. Badge Reveal (Scale & Fade)
    tl.fromTo('.closing-badge',
      { scale: 0.8, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: -12, duration: 0.8, ease: 'back.out(1.2)' },
      0
    );

    // 2. Intro Paragraph (Line Fade)
    const introWords = container.querySelectorAll('.closing-intro .split-word');
    tl.fromTo(introWords,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: 'power2.out' },
      0.3
    );

    // 3. Core Declaration (Word Reveal)
    const declWords = container.querySelectorAll('.closing-declaration .split-word');
    tl.fromTo(declWords,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' },
      0.8
    );

    // 4. Red Manifesto (Line/Block Reveal)
    // We animate words here for smooth flow but grouped tightly
    const manifestoWords = container.querySelectorAll('.closing-manifesto .split-word');
    tl.fromTo(manifestoWords,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.04, 
        ease: 'power3.out' 
      },
      1.2
    );

    // 5. Final Lock-in (Simple Fade)
    const lockinWords = container.querySelectorAll('.closing-lockin .split-word');
    tl.fromTo(lockinWords,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.02, ease: 'power2.out' },
      2.5
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#F3F2ED] text-[#050505] flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 overflow-hidden z-20"
    >
        {/* EDITORIAL FRAME */}
        <div className="relative w-full max-w-[1400px] border border-[#050505] min-h-[80vh] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 md:py-32">
            
            {/* 1. BADGE */}
            <div className="closing-badge absolute -top-8 -left-2 md:-top-10 md:-left-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#dc2626] text-white flex items-center justify-center z-10 shadow-lg">
                <div className="text-center font-bold font-mono text-[10px] md:text-xs leading-tight tracking-widest uppercase transform rotate-12">
                    <p>NAWF’S</p>
                    <p>CLOSING</p>
                    <p>NOTE</p>
                </div>
            </div>

            {/* CONTENT WRAPPER */}
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 md:gap-16">

                {/* 2. INTRO PARAGRAPH */}
                <div className="closing-intro max-w-xl">
                    <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-neutral-600 leading-relaxed">
                        <SplitText wordClass="split-word inline-block mr-1">
                            It’s commendable that you’ve scrolled till here.
                        </SplitText>
                        <br className="hidden md:block"/>
                        <SplitText wordClass="split-word inline-block mr-1">
                             This proves that we did quite a good job in positioning your perception on our reality.
                        </SplitText>
                    </p>
                </div>

                <div className="w-full h-px bg-black/10 origin-left" />

                {/* 3. CORE DECLARATION */}
                <div className="closing-declaration">
                    <h3 className="font-sans font-black text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter text-[#050505]">
                        <SplitText wordClass="split-word inline-block mr-2">
                            WHAT WE’RE CHASING FOR BRANDS IS
                        </SplitText>
                    </h3>
                </div>

                {/* 4. RED MANIFESTO BLOCK */}
                <div className="closing-manifesto">
                    <h2 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-tighter text-[#dc2626]">
                        <SplitText wordClass="split-word inline-block mr-3 md:mr-4">
                            CONVENIENCE, LESS HASSLE, VERSATILITY,
                        </SplitText>
                        <br className="hidden md:block"/>
                        <SplitText wordClass="split-word inline-block mr-3 md:mr-4">
                            STORY-TELLING AND THE OVERLAP OF AI
                        </SplitText>
                        <br className="hidden md:block"/>
                        <SplitText wordClass="split-word inline-block mr-3 md:mr-4">
                            AND REALISM…
                        </SplitText>
                    </h2>
                </div>

                {/* 5. FINAL LOCK-IN STATEMENT */}
                <div className="closing-lockin pt-8 md:pt-12">
                    <p className="font-sans font-bold text-lg md:text-2xl uppercase tracking-tight text-[#050505] max-w-2xl">
                        <SplitText wordClass="split-word inline-block mr-2">
                            IF THESE ARE DONE RIGHT, THE NUMBERS
                        </SplitText>
                        <br className="hidden md:block"/>
                        <SplitText wordClass="split-word inline-block mr-2">
                            WILL FOLLOW AUTOMATICALLY.
                        </SplitText>
                    </p>
                </div>

            </div>
        </div>

        {/* Footer Mark */}
        <div className="absolute bottom-6 md:bottom-12 w-full text-center opacity-30">
             <span className="font-mono text-[10px] tracking-[0.3em] uppercase">NAWF © 2026</span>
        </div>

    </section>
  );
};

export default ClosingSection;