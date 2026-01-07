import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VennSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightMassRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Light Mass Entry (Sharpens & Brightens)
    // Simulates coming into focus or exposure settling
    tl.fromTo(lightMassRef.current,
        { opacity: 0, scale: 1.1, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        0
    );

    // 2. NAWF Reveal (Contrast Fade)
    tl.fromTo(textRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        0.1 // Slight overlap with light reveal for cohesion
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#080808] overflow-hidden flex flex-col items-center justify-center select-none"
    >
        {/* --- FILM GRAIN (Global Texture) --- */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07] z-0 mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* --- HEADING (Static, Editorial) --- */}
        <div className="relative z-20 mb-16 md:mb-24 text-center px-4">
            <h2 className="font-serif text-[#E0E0E0] text-4xl md:text-6xl tracking-widest uppercase leading-tight">
                Built With AI
            </h2>
        </div>

        {/* --- OPTICAL VISUAL CORE --- */}
        <div className="relative w-full flex items-center justify-center">
            
            {/* The "Perceptual Interference" Light Mass */}
            <div 
                ref={lightMassRef} 
                className="absolute flex items-center justify-center pointer-events-none w-full h-full"
            >
                {/* 1. The Smear (Motion Blur Base) - Warm Amber */}
                <div 
                    className="absolute w-[60vw] h-[15vw] md:w-[50vw] md:h-[12vw] bg-amber-700/60 mix-blend-screen blur-[50px] md:blur-[80px]"
                    style={{ transform: 'rotate(-8deg) scaleX(1.2)' }}
                />

                {/* 2. The Interference (Muted Violet) */}
                <div 
                    className="absolute w-[50vw] h-[25vw] md:w-[40vw] md:h-[20vw] bg-[#4c2a5e]/70 mix-blend-screen blur-[60px] md:blur-[90px]"
                    style={{ transform: 'rotate(10deg) translateX(5%)' }}
                />

                {/* 3. The Cold Leak (Desaturated Blue) */}
                <div 
                    className="absolute w-[40vw] h-[12vw] md:w-[30vw] md:h-[8vw] bg-slate-500/50 mix-blend-screen blur-[40px] md:blur-[60px]"
                    style={{ transform: 'rotate(-2deg) translateY(20%)' }}
                />

                {/* 4. The Hotspot (Exposure Center) */}
                <div 
                    className="absolute w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] bg-white/20 mix-blend-screen blur-[40px]"
                />
            </div>

            {/* --- CORE WORDMARK --- */}
            <div className="relative z-30">
                <h1 
                    ref={textRef}
                    className="font-sans font-black text-[14vw] md:text-[12vw] leading-none tracking-tighter text-white"
                    style={{ 
                        // Subtle softening edge to feel photographic
                        filter: 'blur(0.5px)',
                        // Slight shadow to lift it just enough to be legible but look embedded
                        textShadow: '0 0 40px rgba(0,0,0,0.5)'
                    }}
                >
                    NAWF
                </h1>
            </div>

        </div>

        {/* Bottom Spacer */}
        <div className="h-[15vh]" />

    </section>
  );
};

export default VennSection;