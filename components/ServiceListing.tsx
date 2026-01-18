import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const DATA_ITEMS = [
  "COMMERCIAL ADS",
  "TEASERS/ SHORT FILMS",
  "READY-TO-GO AD CAMPAIGNS",
  "CINEMATIC STORY-TELLING",
  "ULTRA REALISM",
  "PHOTO SHOOTS",
  "VIDEO SHOOTS",
  "INFLUENCERS/ CELEBS/ YOUTUBERS PARTNERSHIP",
  "VERSATILITY",
  "Time-EfficienCY + High-Velocity Delivery",
  "No real-time Production setup",
  "NO HEFTY CREW",
  "synchronicity- THE OVERLAP"
];

const ServiceRow = ({ text, index }: { text: string; index: number }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (!rowRef.current) return;
    
    // Slight shift right for text
    gsap.to(textRef.current, { x: 20, color: "#ffffff", duration: 0.5, ease: 'power3.out' });
    
    // Index highlights
    gsap.to(indexRef.current, { color: "#ea580c", opacity: 1, duration: 0.3 });

    // Wavy line reveal animation
    if (lineRef.current) {
        gsap.fromTo(lineRef.current, 
            { strokeDashoffset: 50, opacity: 0 },
            { strokeDashoffset: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
    }
    
    // Background subtle glow
    gsap.to(rowRef.current, { backgroundColor: 'rgba(255,255,255,0.02)', duration: 0.4 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!rowRef.current) return;

    gsap.to(textRef.current, { x: 0, color: "#737373", duration: 0.5, ease: 'power3.out' });
    gsap.to(indexRef.current, { color: "rgba(255,255,255,0.2)", opacity: 0.4, duration: 0.3 });
    
    if (lineRef.current) {
        gsap.to(lineRef.current, { opacity: 0, duration: 0.3 });
    }
    
    gsap.to(rowRef.current, { backgroundColor: 'transparent', duration: 0.4 });
  }, []);

  return (
    <div
      ref={rowRef}
      className="group relative w-full border-b border-white/10 cursor-default overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between py-8 md:py-10 px-2 md:px-0">
        <div className="flex items-baseline gap-6 md:gap-12 w-full">
          <span 
            ref={indexRef}
            className="font-mono text-xs md:text-sm text-white/20 w-6 md:w-8 transition-colors duration-300"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span 
            ref={textRef}
            className="font-sans text-xl md:text-3xl lg:text-4xl font-semibold text-neutral-500 tracking-tight will-change-transform uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {text}
          </span>
        </div>
        
        <div className="shrink-0 ml-4 hidden md:block">
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
            <path 
              ref={lineRef}
              d="M0 6 Q 10 0, 20 6 T 40 6" 
              stroke="#ea580c" 
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="50"
              strokeDashoffset="50"
              className="opacity-0"
              style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const ServiceListing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Heading Reveal
    gsap.fromTo('.service-header', 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: { 
          trigger: container, 
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        } 
      }
    );

    // 2. Anchor Reveal
    gsap.fromTo('.service-anchor',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: { 
          trigger: container, 
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 3. List Stagger
    gsap.fromTo(container.querySelectorAll('.service-row-wrapper'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { 
          trigger: '.service-list', 
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-[#050505] py-24 md:py-40 px-6 md:px-16 lg:px-24">
       <div className="max-w-[1400px] mx-auto">
         
         {/* SECTION INTRO */}
         <div className="mb-20 md:mb-28">
           <h2 className="service-header font-sans font-black text-3xl md:text-5xl lg:text-7xl text-white leading-[0.95] tracking-tighter max-w-5xl uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
             What will you get associating with NAWF?
           </h2>
         </div>

         {/* CENTRAL ANCHOR */}
         <div className="service-anchor mb-20 md:mb-28 pl-4 md:pl-12 border-l border-white/10">
            <h3 className="text-4xl md:text-6xl lg:text-8xl text-white leading-none tracking-tighter">
              <span className="font-sans font-black block md:inline mr-6" style={{ fontFamily: "'Inter', sans-serif" }}>360°</span>
              <span className="font-serif italic font-light text-white/50">AI Content Arsenal</span>
            </h3>
         </div>

         {/* SERVICE LIST (Continuous) */}
         <div className="service-list border-t border-white/10">
            {DATA_ITEMS.map((item, i) => (
              <div key={i} className="service-row-wrapper">
                <ServiceRow text={item} index={i} />
              </div>
            ))}
         </div>

       </div>
    </section>
  );
};

export default ServiceListing;