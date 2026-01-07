import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TextRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Headlines: Word-by-word reveal
    const headlines = gsap.utils.toArray<HTMLElement>('.editorial-headline');
    
    headlines.forEach((headline) => {
        const words = headline.querySelectorAll('.word-span');
        
        gsap.fromTo(words, 
            { y: '110%', opacity: 0, rotateX: -20 },
            { 
                y: '0%', 
                opacity: 1, 
                rotateX: 0,
                duration: 1, 
                stagger: 0.03, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headline,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // 2. Sub-text: Simple fade up with slight delay
    const subs = gsap.utils.toArray<HTMLElement>('.editorial-sub');
    subs.forEach((sub) => {
         gsap.fromTo(sub,
            { y: 30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1.2, 
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sub,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
         );
    });

  }, { scope: containerRef });

  // Helper to wrap words for animation
  const wrapWords = (text: string) => {
    return text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-2 mr-[0.25em] -mb-2 align-bottom leading-[0.9]">
            <span className="word-span inline-block will-change-transform">
                {word}
            </span>
        </span>
    ));
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#050505] text-[#f0f0f0] flex flex-col justify-center py-32 md:py-48 px-[5vw] md:px-[10vw] z-10"
    >
        <div className="flex flex-col gap-40 md:gap-56 max-w-[90rem] mx-auto w-full">
            
            {/* Block 1: Headline Left, Sub Right */}
            <div className="flex flex-col gap-8 md:gap-12 group">
                <h2 className="editorial-headline font-sans font-black text-4xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-white max-w-6xl">
                    {wrapWords("IF YOU’RE ASKING WHAT’S SPECIAL ABOUT THESE, THE ANSWER IS YES AND NO.")}
                </h2>
                
                <div className="editorial-sub self-end md:mr-12 max-w-lg pl-8 border-l-2 border-white/10 md:border-l-0 md:pl-0 md:text-right">
                    <p className="font-serif italic text-xl md:text-3xl text-neutral-400 leading-relaxed">
                        The reality within these content pieces must shape their perception.
                    </p>
                </div>
            </div>

            {/* Block 2: Headline Right, Sub Left (Mirror Layout) */}
            <div className="flex flex-col gap-8 md:gap-12 group md:items-end md:text-right">
                <h2 className="editorial-headline font-sans font-black text-4xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-white max-w-6xl">
                    {wrapWords("IF YOU THOUGHT EVERYTHING’S SHOWN ABOVE WAS REAL... THINK AGAIN!")}
                </h2>
                
                <div className="editorial-sub self-start md:ml-12 max-w-lg pl-8 border-l-2 border-white/10 md:border-l-0 md:border-r-2 md:pl-0 md:pr-8 md:text-left">
                    <p className="font-serif italic text-xl md:text-3xl text-neutral-400 leading-relaxed">
                        Of course, except for Farmley.
                    </p>
                </div>
            </div>

        </div>
    </section>
  );
};

export default TextRevealSection;