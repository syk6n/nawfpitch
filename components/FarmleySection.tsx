import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const LIST_ITEMS = [
  "Early farm-to-snack supply chain transparency in dry fruits",
  "Among the first to turn dry fruits into mainstream healthy snack formats",
  "Among the earliest brands to rebrand nuts, dates, and makhanas as lifestyle products",
  "Scale omnichannel distribution aggressively",
  "Treat trust, packaging, and speed as differentiators"
];

const FarmleySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Master Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=300%', // Increased from 150% for slower, clearer animation
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. Header Reveal
    const headerWords = container.querySelectorAll('.farmley-header .split-word');
    tl.fromTo(headerWords, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' },
      0
    );

    // 2. Tree Animation
    // Vertical Line grows down
    tl.fromTo('.tree-vertical-line', 
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: 'none' },
        0.3
    );

    // Branches and Text Reveal (Staggered)
    const items = gsap.utils.toArray<HTMLElement>('.tree-item');
    items.forEach((item, i) => {
        const branch = item.querySelector('.tree-branch path');
        const text = item.querySelector('.tree-text');
        
        // Start slightly after the vertical line passes this point
        const startTime = 0.5 + (i * 0.2);

        // Branch grows (using stroke-dashoffset)
        if (branch) {
            tl.fromTo(branch, 
                { strokeDashoffset: 100 }, 
                { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' },
                startTime
            );
        }

        // Text reveals
        tl.fromTo(text,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            startTime + 0.2
        );
    });

    // 3. Footer Reveal
    const footerChars = container.querySelectorAll('.farmley-footer .split-char');
    tl.fromTo(footerChars,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.01, ease: 'power3.out' },
        2.5
    );

    // *** THE FIX: ADD BUFFER "PAUSE" AT THE END ***
    // Allows user to read the footer and full tree before unpinning
    tl.to({}, { duration: 1.0 });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#050505] text-[#e0e0e0] py-10 md:py-16 px-6 md:px-16 lg:px-24 flex flex-col justify-between overflow-visible z-10"
    >
       {/* HEADER */}
       <div className="w-full mb-6 md:mb-10 relative z-10">
           <h2 className="farmley-header font-sans font-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.1] uppercase max-w-6xl tracking-tighter text-white">
              <SplitText wordClass="split-word inline-block mr-3">
                FARMLEY’S “FIRST-MOVER / EARLY-SHAPER” LANGUAGE RESULTED IN-
              </SplitText>
           </h2>
       </div>

       {/* TREE LIST CONTENT */}
       <div className="flex-1 w-full relative pl-2 md:pl-12 flex flex-col justify-center">
           
           {/* Main Vertical Line Container */}
           <div className="absolute top-0 bottom-0 left-2 md:left-12 w-px bg-white/10">
               <div className="tree-vertical-line w-full h-full bg-red-600 origin-top" />
           </div>

           {/* List Items */}
           <div className="flex flex-col gap-3 md:gap-6 py-2 md:py-4">
               {LIST_ITEMS.map((text, i) => (
                   <div key={i} className="tree-item relative pl-8 md:pl-16">
                       {/* SVG Branch */}
                       <div className="absolute left-0 top-0 w-8 md:w-16 h-12 pointer-events-none transform -translate-x-[1px]">
                           <svg className="tree-branch w-full h-full overflow-visible" viewBox="0 0 64 48" preserveAspectRatio="none">
                               <path 
                                    d="M 0 0 Q 0 24 64 24" 
                                    fill="none" 
                                    stroke="#dc2626" 
                                    strokeWidth="2" 
                                    vectorEffect="non-scaling-stroke"
                                    pathLength="100"
                                    style={{ strokeDasharray: 100 }}
                               />
                           </svg>
                       </div>
                       
                       {/* Text */}
                       <div className="tree-text font-mono text-xs md:text-lg text-neutral-300 leading-relaxed max-w-4xl pt-1">
                           {text}
                       </div>
                   </div>
               ))}
           </div>
       </div>

       {/* FOOTER */}
       <div className="w-full mt-6 md:mt-10 pt-6 md:pt-8 border-t border-white/10 pb-6">
           <div className="farmley-footer font-sans font-black text-lg md:text-3xl lg:text-4xl leading-tight text-white uppercase max-w-6xl">
               <div className="mb-2">
                    <SplitText charClass="split-char inline-block">CATEGORY-FIRST WAS STEP ONE. </SplitText>
                    <span className="text-red-600">
                        <SplitText charClass="split-char inline-block">AI-FIRST IS THE NEXT ADVANTAGE.</SplitText>
                    </span>
               </div>
               <div>
                    <SplitText charClass="split-char inline-block">FARMLEY LED THE CATEGORY. NOW IT’S TIME TO </SplitText>
                    <br className="md:hidden" />
                    <span className="text-white border-b-2 border-red-600 inline-block">
                        <SplitText charClass="split-char inline-block">LEAD THE ALGORITHM.</SplitText>
                    </span>
               </div>
           </div>
       </div>

    </section>
  );
};

export default FarmleySection;