import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const AutomationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Master Timeline with Pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=250%', // Increased from 150% for smoother timing
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // 1. Header & Vertical Line Reveal
    // Vertical line grows down
    tl.to('.automation-line', {
      height: '10rem', // Increased height to accommodate larger text
      duration: 0.5,
      ease: 'power2.out'
    }, 0);

    // "AUTOMATION" reveal (Word stagger)
    const automationWords = container.querySelectorAll('.automation-label .split-word');
    tl.fromTo(automationWords, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      0.1
    );

    // 2. Main Statement Reveal ("NO GATEKEEPING...")
    // Character reveal fast but controlled
    const gatekeepingChars = container.querySelectorAll('.no-gatekeeping .split-char');
    tl.fromTo(gatekeepingChars,
      { opacity: 0, y: 30, scale: 1.1 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, // Tracking tightening effect via scale reduction/reset
        duration: 0.6, 
        stagger: 0.02, 
        ease: 'power3.out' 
      },
      0.3
    );

    // 3. Bullets Reveal
    // Sequential reveal with red connector line drawing in
    const bullets = gsap.utils.toArray<HTMLElement>('.bullet-item');
    bullets.forEach((bullet, i) => {
        const line = bullet.querySelector('.bullet-line');
        const text = bullet.querySelector('.bullet-text');
        
        const startTime = 0.8 + (i * 0.15);

        // Line grows
        tl.fromTo(line,
            { width: 0 },
            { width: '2rem', duration: 0.3, ease: 'power2.out' },
            startTime
        );

        // Text reveals
        tl.fromTo(text,
            { x: 10, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
            startTime + 0.1
        );
    });

    // 4. Core Value Statement Reveal
    // Line by line fade + slide up
    const coreValueLines = container.querySelectorAll('.core-value-line');
    tl.fromTo(coreValueLines,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        1.5 // Starts after bullets begin finishing
    );

    // 5. Footer Process Line Reveal
    tl.fromTo('.footer-process',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        2.2
    );
    
    // Animate red arrows in footer slightly
    tl.fromTo('.footer-arrow',
        { x: -5, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'power2.out' },
        2.5
    );

    // *** THE FIX: ADD BUFFER "PAUSE" AT THE END ***
    // Keeps the footer visible for a moment before scrolling away
    tl.to({}, { duration: 1.0 });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#050505] text-[#e0e0e0] py-24 px-6 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden"
    >
       {/* Top Section: Header & Hero */}
       <div className="w-full">
           {/* 1. Section Header */}
           <div className="flex flex-col items-start mb-12 relative pl-1">
              {/* Vertical Guide Line */}
              <div className="automation-line w-[1px] bg-red-600 h-0 absolute top-0 left-0"></div>
              
              <div className="pl-6 pt-2">
                <h3 className="automation-label leading-none mb-6 overflow-hidden flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                    <span className="text-white font-serif italic text-4xl md:text-6xl lg:text-7xl inline-block">
                        <SplitText wordClass="split-word inline-block">And</SplitText>
                    </span>
                    <span className="text-red-600 font-sans font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter inline-block">
                        <SplitText wordClass="split-word inline-block">AUTOMATION</SplitText>
                    </span>
                </h3>
              </div>
           </div>

           {/* 2. Main Statement */}
           <h2 className="no-gatekeeping font-sans font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] uppercase max-w-7xl tracking-tighter text-white mix-blend-screen">
              <SplitText charClass="split-char inline-block origin-bottom will-change-transform">
                  NO GATEKEEPING ON WHAT’S HAPPENING!
              </SplitText>
           </h2>
       </div>

       {/* Middle Section: Grid Content */}
       <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mt-24 lg:mt-32 items-end">
           
           {/* 3. Supporting Bullet Stack (Left Column) */}
           <div className="lg:col-span-5 flex flex-col gap-6">
               {[
                   "An automated onboarding dashboard for every real-time work status",
                   "Real-time feedback",
                   "Transparent Management",
                   "No dependency on calls or follow-ups",
                   "Faster iterations"
               ].map((text, i) => (
                   <div key={i} className="bullet-item flex items-center gap-6">
                       <div className="bullet-line h-[1px] bg-red-600 w-0 shrink-0"></div>
                       <div className="bullet-text opacity-0">
                           <p className="font-mono text-base md:text-lg leading-relaxed text-[#e6e6e6]">
                               {text}
                           </p>
                       </div>
                   </div>
               ))}
           </div>

           {/* 4. Core Value Statement (Center/Right Emphasis) */}
           <div className="lg:col-span-7 flex flex-col justify-end pb-2">
               <div className="font-sans font-bold text-2xl md:text-4xl lg:text-5xl leading-tight text-white/95 tracking-tight">
                   <div className="overflow-hidden">
                       <p className="core-value-line block">A SINGLE DASHBOARD THAT GIVES YOU VISIBILITY, CONTROL, AND REAL-TIME INFLUENCE OVER THE WORK.</p>
                   </div>
               </div>
           </div>
       </div>

       {/* 5. Footer Process Line (Bottom) */}
       <div className="footer-process w-full border-t border-white/10 pt-8 mt-12 opacity-0">
          <p className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 uppercase flex flex-wrap items-center gap-4 md:gap-8">
             <span className="text-[#e6e6e6]">ANSWER THE ONBOARDING QUESTIONS</span>
             <span className="footer-arrow text-red-600 text-lg">&gt;</span>
             <span className="text-[#e6e6e6]">TRACK EVERYTHING</span>
             <span className="footer-arrow text-red-600 text-lg">&gt;</span>
             <span className="text-[#e6e6e6]">LET US TAKE YOU</span>
             <span className="text-red-600 font-bold ml-2">#TowardsNawf</span>
          </p>
       </div>

    </section>
  );
};

export default AutomationSection;