import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use a simpler trigger for the footer since it's at the end
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%', // Trigger slightly earlier
        toggleActions: 'play none none none'
      }
    });

    // 1. Reveal "Start the conversation" (Italic Serif)
    tl.fromTo('.contact-intro', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
    );

    // 2. Reveal Phone Number (Big Sans) - Staggered chars
    const phoneChars = container.querySelectorAll('.contact-phone .split-char');
    tl.fromTo(phoneChars,
      { y: 120, opacity: 0, rotateX: -60 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 1.2, 
        stagger: 0.04, 
        ease: 'power3.out' 
      },
      "-=0.6"
    );

    // 3. Line separator
    tl.fromTo('.contact-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'expo.out' },
        "-=0.8"
    );

    // 4. Reveal "Call us" label
    tl.fromTo('.contact-label',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.8"
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#050505] text-[#e0e0e0] pt-48 pb-32 md:pt-64 md:pb-48 px-6 md:px-16 flex flex-col items-center justify-center relative z-20 overflow-hidden mt-24"
    >
        {/* Background Texture/Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
                 backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
                 backgroundSize: '24px 24px' 
             }} 
        />

        <div className="max-w-5xl w-full text-center relative z-10">
            
            {/* Intro Text */}
            <div className="contact-intro mb-8 md:mb-16">
                <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-neutral-500 font-light">
                    NAWF IS JUST A CALL AWAY
                </p>
            </div>

            {/* Main Phone Display */}
            <div className="relative inline-block group cursor-pointer">
                {/* Number */}
                <h2 className="contact-phone font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white transition-colors duration-300 group-hover:text-[#ea580c] will-change-transform">
                    <SplitText charClass="split-char inline-block">
                        +91 8368508897, +91 8287156273, +91 9643710693
                    </SplitText>
                </h2>
                
                {/* Underline */}
                <div className="contact-line w-full h-1 md:h-2 bg-[#ea580c] mt-4 origin-center transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            </div>

            {/* Sub-label */}
            <div className="contact-label mt-12 md:mt-16 flex items-center justify-center gap-4 opacity-0">
                <span className="w-12 h-px bg-white/30" />
                <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-white/50">
                    Sometimes reality is too complex. Stories give it form.
                </span>
                <span className="w-12 h-px bg-white/30" />
            </div>

        </div>

        {/* Footer Brand Mark */}
        <div className="absolute bottom-8 left-0 w-full text-center">
             <p className="font-mono text-[10px] uppercase tracking-widest text-[#333]">
                 NAWF / EST. 2026
             </p>
        </div>
    </section>
  );
};

export default ContactSection;