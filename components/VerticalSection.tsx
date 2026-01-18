import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const realityPoints = [
  { id: 1, text: "CHAOTIC", shapeId: 1, color: "#ea580c" },    // Orange (Cross)
  { id: 2, text: "UNFAIR", shapeId: 2, color: "#9333ea" },    // Purple (Steps)
  { id: 3, text: "INCONVENIENT", shapeId: 3, color: "#0891b2" },   // Cyan (Arch)
  { id: 4, text: "EMOTIONALLY UNCOMFORTABLE", shapeId: 4, color: "#65a30d" },   // Lime (Grid)
];

// Map index to corner positions using Tailwind classes for reliable framing
const cornerClasses = [
  "top-6 left-6 md:top-10 md:left-12",       // Top Left
  "top-6 right-6 md:top-10 md:right-12",     // Top Right
  "bottom-6 left-6 md:bottom-10 md:left-12",  // Bottom Left
  "bottom-6 right-6 md:bottom-10 md:right-12" // Bottom Right
];

// --- ICONS ---
const PixelGlyphIcon: React.FC<{ className?: string, shapeId: number, variant?: 'A' | 'B' }> = ({ className = "", shapeId, variant = 'A' }) => {
  const renderPath = () => {
    // VARIANT A: Abstract, Pixelated, "Raw Reality"
    if (variant === 'A') {
        switch (shapeId) {
            case 1: return <path d="M20 20 H50 V35 H65 V20 H80 V50 H65 V65 H80 V80 H50 V65 H35 V80 H20 V50 H35 V35 H20 Z" />;
            case 2: return <path d="M20 50 H35 V35 H50 V20 H80 V50 H65 V65 H50 V80 H20 Z" />;
            case 3: return <path d="M20 20 H80 V80 H65 V35 H35 V65 H20 Z" />;
            case 4: return (
                <>
                  <rect x="20" y="20" width="25" height="25" />
                  <rect x="55" y="20" width="25" height="25" />
                  <rect x="20" y="55" width="25" height="25" />
                  <rect x="55" y="55" width="25" height="45" />
                </>
              );
            default: return <rect x="25" y="25" width="50" height="50" />;
        }
    } 
    // VARIANT B: Solid, Structured, "The Solution" (Farmley)
    else {
        switch (shapeId) {
            case 1: return <path d="M35 20 H65 V35 H80 V65 H65 V80 H35 V65 H20 V35 H35 Z" />;
            case 2: return <path d="M50 20 L80 50 L50 80 L20 50 Z" />;
            case 3: return <path d="M50 20 C66.57 20 80 33.43 80 50 C80 66.57 66.57 80 50 80 C33.43 80 20 66.57 20 50 C20 33.43 33.43 20 50 20 Z" />;
            case 4: return <path d="M20 20 H80 V80 H20 Z M35 35 V65 H65 V35 Z" fillRule="evenodd" />;
            default: return <circle cx="50" cy="50" r="30" />;
        }
    }
  };

  return (
    <svg viewBox="0 0 100 100" className={`${className}`} fill="currentColor">
      {renderPath()}
    </svg>
  );
};

const VerticalSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Refresh ScrollTrigger when fonts load or window resizes
    const handleRefresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(handleRefresh);
    window.addEventListener('resize', handleRefresh);

    const icons = gsap.utils.toArray<HTMLElement>('.manifesto-icon-target');
    const markers = gsap.utils.toArray<HTMLElement>('.manifesto-icon-marker');

    // --- INITIAL STATE ---
    gsap.set('.bg-lines', { opacity: 0.4 }); 
    gsap.set(['.manifesto-headline', '.manifesto-label', '.manifesto-text', '.manifesto-outro'], { 
      opacity: 0, 
      y: 30, 
      filter: "blur(10px)" 
    });
    // Ensure both groups are hidden initially
    gsap.set('.stage-3-group-1', { opacity: 0 }); 
    gsap.set('.stage-3-group-2', { opacity: 0 });
    
    // Icons: Ensure black and visible
    gsap.set(icons, { color: '#1a1a1a', opacity: 1, scale: 1 });

    // Subtle breathing animation for icons in corners (Scene 1)
    icons.forEach((icon, i) => {
       gsap.to(icon, {
         y: "+=10",
         duration: 2 + (i * 0.5),
         yoyo: true,
         repeat: -1,
         ease: "sine.inOut"
       });
    });

    // --- SCROLL TIMELINE ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=5000", // Adjusted: Long enough for reading, not endless
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // ========================================================================
    // STAGE 1 (Corners) -> STAGE 2 (List)
    // ========================================================================
    
    // Move icons to list markers
    icons.forEach((icon, i) => {
        const getEndPos = () => {
            if (!markers[i]) return { x: 0, y: 0 };
            const iconRect = icon.getBoundingClientRect();
            const markerRect = markers[i].getBoundingClientRect();
            
            return {
                x: markerRect.left + (markerRect.width/2) - (iconRect.left + iconRect.width/2),
                y: markerRect.top + (markerRect.height/2) - (iconRect.top + iconRect.height/2)
            };
        };

        tl.to(icon, {
            x: () => getEndPos().x,
            y: () => getEndPos().y,
            rotation: () => gsap.utils.random(-180, 180),
            scale: 0.8,
            duration: 1.5,
            ease: "power3.inOut",
            overwrite: "auto"
        }, 0);
    });

    // Fade out Scene 1 Text & Lines
    tl.to('.scene-1', { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 0.8 }, 0);
    tl.to('.bg-lines', { opacity: 0, duration: 0.5 }, 0);

    const stage2Start = 1.0;
    tl.to('.manifesto-headline', { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, stage2Start);
    tl.to('.manifesto-label', { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, stage2Start + 0.1);
    tl.to(gsap.utils.toArray('.manifesto-text'), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1 }, stage2Start + 0.2);
    tl.to('.manifesto-outro', { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 }, stage2Start + 0.8);

    // ========================================================================
    // STAGE 2 (List) -> STAGE 3 (Horizontal Row & Text 1)
    // ========================================================================
    const stage3Start = stage2Start + 2.5; // Slight pause to read list

    // Hide Manifesto Text
    tl.to(['.manifesto-headline', '.manifesto-label', '.manifesto-text', '.manifesto-outro'], {
        opacity: 0, y: -30, filter: "blur(10px)", duration: 0.8, stagger: 0.05
    }, stage3Start);

    // Move Icons to Horizontal Center Row
    icons.forEach((icon, i) => {
        tl.to(icon, {
            x: () => {
                const iconWidth = 80;
                const gap = 30; 
                const totalWidth = (iconWidth * 4) + (gap * 3);
                const viewportWidth = window.innerWidth;
                const rowStartX = (viewportWidth - totalWidth) / 2;
                const targetX = rowStartX + (i * (iconWidth + gap)) + (iconWidth / 2);
                
                const style = window.getComputedStyle(icon);
                const startLeft = parseFloat(style.left) || (window.innerWidth - parseFloat(style.right) - 80);

                return targetX - startLeft - 40;
            },
            y: () => {
                 const style = window.getComputedStyle(icon);
                 const startTop = parseFloat(style.top); 
                 let effectiveStartTop = startTop;
                 if (isNaN(startTop)) {
                    effectiveStartTop = window.innerHeight - parseFloat(style.bottom) - 80;
                 }
                 
                 const rowTargetY = window.innerHeight * 0.35;
                 return rowTargetY - effectiveStartTop - 40;
            },
            rotation: 0,
            scale: 1.2,
            color: realityPoints[i].color,
            duration: 1.2,
            ease: "power3.inOut"
        }, stage3Start + 0.2);
    });

    // Reveal SCENE 3 GROUP 1 ("Brands don't win...")
    tl.set('.stage-3-group-1', { opacity: 1 }, stage3Start + 0.2); 
    const group1Chars = gsap.utils.toArray('.stage-3-group-1 .split-char');
    tl.fromTo(group1Chars, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power2.out" },
        stage3Start + 0.8
    );

    // ========================================================================
    // PAUSE -> TRANSITION TO GROUP 2
    // ========================================================================
    
    const switchStart = stage3Start + 2.5; // Read time for Group 1

    // Animate GROUP 1 OUT
    tl.to(group1Chars, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.01,
        ease: "power2.in"
    }, switchStart);

    // Animate GROUP 2 IN ("Here's something...")
    tl.set('.stage-3-group-2', { opacity: 1 }, switchStart);
    const group2Chars = gsap.utils.toArray('.stage-3-group-2 .split-char');
    tl.fromTo(group2Chars,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.02, ease: "power2.out" },
        switchStart + 0.4
    );

    // Swap Icons to Variant B (Clean shapes)
    tl.to('.icon-variant-a', { opacity: 0, duration: 0.3 }, switchStart + 0.4);
    tl.to('.icon-variant-b', { opacity: 1, duration: 0.3 }, switchStart + 0.4);

    // Snap Effect on Icons
    icons.forEach((icon) => {
        tl.to(icon, {
            scale: 0.9,
            rotation: () => gsap.utils.random(-8, 8),
            duration: 0.3,
            ease: "back.in(2)",
        }, switchStart + 0.3);

        tl.to(icon, {
            scale: 1.3,
            rotation: 0,
            filter: "brightness(1.2)",
            duration: 0.5,
            ease: "back.out(1.5)",
        }, switchStart + 0.6);
    });

    // *** THE FIX: ADD BUFFER "PAUSE" AT THE END ***
    // This empty tween holds the state for ~1.5 duration units of scrolling
    // so the user can read the final message before the pin releases.
    tl.to({}, { duration: 1.5 });

    return () => {
        window.removeEventListener('resize', handleRefresh);
    };

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#F3F2ED] text-[#1a1a1a] overflow-visible flex flex-col items-center justify-center font-mono selection:bg-orange-200"
    >
      {/* BACKGROUND LINES (Scene 1) - Visual Only */}
      <svg className="bg-lines absolute inset-0 w-full h-full pointer-events-none z-10">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
      </svg>
      
      {/* --- DEDICATED ICON LAYER (Z-40) --- */}
      <div className="absolute inset-0 z-40 w-full h-full pointer-events-none overflow-visible">
         {realityPoints.map((point, i) => (
            <div 
                key={point.id}
                className={`manifesto-icon-target absolute flex items-center justify-center w-16 h-16 md:w-20 md:h-20 ${cornerClasses[i]}`}
                style={{ color: '#1a1a1a' }}
            >
                <div className="w-full h-full relative will-change-transform">
                    <div className="icon-variant-a absolute inset-0 opacity-100 transition-none">
                        <PixelGlyphIcon shapeId={point.shapeId} variant="A" className="w-full h-full drop-shadow-2xl" />
                    </div>
                    <div className="icon-variant-b absolute inset-0 opacity-0 transition-none">
                        <PixelGlyphIcon shapeId={point.shapeId} variant="B" className="w-full h-full drop-shadow-2xl" />
                    </div>
                </div>
            </div>
         ))}
      </div>

      {/* --- SCENE 1 (Headline) (Z-50) --- */}
      <div className="scene-1 absolute inset-0 z-50 flex flex-col items-center justify-center w-full px-8 pointer-events-none">
         <div className="pointer-events-auto">
             <h1 className="font-sans font-black text-4xl md:text-7xl text-center leading-tight tracking-tighter uppercase max-w-5xl mx-auto text-[#1a1a1a]">
                <SplitText>The strongest brands don’t change reality, they change how it’s PERCEIVED.</SplitText>
             </h1>
         </div>
      </div>

      {/* --- SCENE 2 (List) (Z-30) --- */}
      <div className="scene-2 absolute inset-0 z-30 w-full h-full flex flex-col items-center justify-center pointer-events-none overflow-visible">
        <div className="max-w-6xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 relative overflow-visible">
          
          <div className="md:col-span-12 mb-8 text-center md:text-left manifesto-headline">
            <h2 className="font-serif italic text-3xl md:text-5xl leading-tight opacity-90">
              Humans don&rsquo;t consume reality directly. <br />
              <span className="text-black font-semibold">They consume interpretations of it.</span>
            </h2>
          </div>

          <div className="md:col-span-4 md:text-right pt-4 manifesto-label">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase border-t-2 border-black pt-4 inline-block text-black font-bold">
              Raw Reality Is:
            </span>
          </div>

          <div className="md:col-span-8 flex flex-col space-y-8 md:space-y-6 relative overflow-visible">
            {realityPoints.map((point) => (
              <div key={point.id} className="manifesto-item flex items-center h-16 md:h-20 overflow-visible">
                {/* Marker Wrapper (Empty, target for icon movement) */}
                <div className="manifesto-icon-marker w-16 h-16 md:w-20 md:h-20 mr-8 md:mr-12 shrink-0 relative overflow-visible" />
                
                {/* Text */}
                <h3 className="manifesto-text font-sans font-black text-3xl md:text-6xl uppercase tracking-tighter text-[#1a1a1a] leading-none opacity-0 will-change-transform">
                  {point.text}
                </h3>
              </div>
            ))}
          </div>

          <div className="md:col-start-5 md:col-span-8 mt-12 manifesto-outro">
            <p className="font-serif text-xl md:text-3xl text-neutral-600 leading-relaxed">
              So we <span className="text-orange-600 font-medium border-b border-orange-200">soften</span> it,{" "}
              <span className="text-purple-600 font-medium border-b border-purple-200">narrativize</span> it,{" "}
              and <span className="text-cyan-600 font-medium border-b border-cyan-200">aestheticize</span> it.
            </p>
          </div>
        </div>
      </div>

      {/* --- SCENE 3: THE SYNTHESIS (Overlaid Text Groups) --- */}
      <div className="scene-3 absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-7xl mx-auto px-6 h-[50vh] flex items-center justify-center mt-[15vh]">
              
              {/* GROUP 1: Initial Statement */}
              <div className="stage-3-group-1 absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 md:space-y-8">
                  <p className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-neutral-600 leading-tight">
                      <SplitText charClass="split-char inline-block">Brands don’t win by showing what is.</SplitText>
                  </p>
                  <p className="font-sans font-black text-4xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-tighter leading-none">
                      <SplitText charClass="split-char inline-block">They win by shaping what it means.</SplitText>
                  </p>
              </div>

              {/* GROUP 2: The Solution (Revealed after scroll) */}
              <div className="stage-3-group-2 absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 md:space-y-10">
                  <h3 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-tighter leading-[0.9] uppercase max-w-5xl">
                      <SplitText charClass="split-char inline-block">Here’s something we’ve prepared for Farmley</SplitText>
                  </h3>
                  <p className="font-sans font-bold text-xl md:text-3xl lg:text-4xl text-neutral-500 tracking-tight leading-tight uppercase max-w-4xl">
                      <SplitText charClass="split-char inline-block">While staying in reality, capturing different perceptions.</SplitText>
                  </p>
              </div>

          </div>
      </div>

    </section>
  );
};

export default VerticalSection;