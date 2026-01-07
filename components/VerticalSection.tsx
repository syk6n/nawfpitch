import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- SHARED DATA ---
const realityPoints = [
  { id: 1, text: "Chaotic", shapeId: 1, corner: { x: 5, y: 10 }, color: "#ea580c" },    // Orange
  { id: 2, text: "Unfair", shapeId: 2, corner: { x: 95, y: 10 }, color: "#9333ea" },    // Purple
  { id: 3, text: "Inconvenient", shapeId: 3, corner: { x: 5, y: 90 }, color: "#0891b2" },   // Cyan
  { id: 4, text: "Emotionally uncomfortable", shapeId: 4, corner: { x: 95, y: 90 }, color: "#65a30d" },   // Lime
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

// --- SCRAMBLE UTILS ---
const GLYPHS = "█▓▒░<>/[]{}—=+*";

const scrambleString = (targetText: string, progress: number, originalText: string = ""): string => {
  const length = Math.floor(
    gsap.utils.interpolate(originalText.length, targetText.length, progress)
  );
  
  let result = "";
  for (let i = 0; i < length; i++) {
    // Noise peaks at 0.5 (progress) for a "cut" feel
    const noiseLevel = 1 - Math.abs(progress - 0.5) * 2;
    
    // Higher probability of glyphs during the transition
    if (Math.random() < noiseLevel * 0.9) {
      result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    } else {
      if (progress < 0.5) {
        result += originalText[i] || GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      } else {
        result += targetText[i] || " ";
      }
    }
  }
  return result;
};

const InteractiveScrambleText: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Reset refs on each render to prevent stale nodes in the array
  // This is safe because we re-populate in the map below
  charsRef.current = [];

  useGSAP(() => {
    // Proximity Scramble Logic
    // This creates a "magnetic" disruption effect when the cursor moves near the text
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const proximityRadius = 150; // Distance in pixels to trigger effect

      charsRef.current.forEach((charSpan, i) => {
        if (!charSpan) return;

        // Get character center position
        const rect = charSpan.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dist = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
        
        // Use textContent instead of innerText to avoid issues with CSS uppercase transformation
        const currentChar = charSpan.textContent; 
        const targetChar = text[i];

        if (dist < proximityRadius) {
           // Normalize distance (0 = center, 1 = edge)
           const progress = dist / proximityRadius;
           const intensity = 1 - progress; // 1 at center, 0 at edge

           // Random scramble chance based on intensity
           // Higher intensity = more likely to show a glyph
           if (intensity > 0.1 && Math.random() < intensity * 0.7) {
             charSpan.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
             charSpan.style.color = Math.random() > 0.5 ? "#ea580c" : "inherit"; // Occasional brand orange flicker
             charSpan.style.opacity = "0.7";
           } else {
             // Resolve
             if (currentChar !== targetChar) charSpan.textContent = targetChar;
             charSpan.style.color = "inherit";
             charSpan.style.opacity = "1";
           }
        } else {
           // Reset if outside radius
           if (currentChar !== targetChar) {
             charSpan.textContent = targetChar;
             charSpan.style.color = "inherit";
             charSpan.style.opacity = "1";
           }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { dependencies: [text] });

  // Track the global index of characters (including spaces) for the ref array
  let globalCharIndex = 0;
  const words = text.split(" ");

  return (
    <h1 
      ref={containerRef} 
      className="font-sans font-black text-4xl md:text-7xl text-center leading-tight tracking-tighter uppercase max-w-4xl mx-auto text-[#1a1a1a] cursor-default select-none"
      aria-label={text}
    >
      {words.map((word, wIndex) => (
        <React.Fragment key={wIndex}>
          {/* Word Wrapper: Enforces no-wrap within the word */}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, cIndex) => {
               // Capture index synchronously for this character
               const index = globalCharIndex++;
               return (
                <span 
                  key={cIndex} 
                  ref={(el) => { if (el) charsRef.current[index] = el; }}
                  className="inline-block transition-colors duration-75 min-w-[0.3em]"
                >
                  {char}
                </span>
               );
            })}
          </span>

          {/* Space Wrapper: Allows wrapping between words, while maintaining ref for scramble logic */}
          {wIndex < words.length - 1 && (() => {
             // Capture index synchronously for this space
             const spaceIndex = globalCharIndex++;
             return (
               <span 
                 key={`space-${wIndex}`}
                 ref={(el) => { if (el) charsRef.current[spaceIndex] = el; }}
                 className="inline-block min-w-[0.3em]"
               >
                 &nbsp;
               </span>
             );
          })()}
        </React.Fragment>
      ))}
    </h1>
  );
};


const VerticalSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const icons = gsap.utils.toArray<HTMLElement>('.manifesto-icon-wrapper');

    // --- INITIAL SETUP ---
    gsap.set('.bg-lines', { opacity: 0.4 }); 
    gsap.set(['.manifesto-headline', '.manifesto-label', '.manifesto-text', '.manifesto-outro'], { 
      opacity: 0, 
      y: 30, 
      filter: "blur(10px)" 
    });
    gsap.set('.scene-3', { opacity: 0, y: 30, filter: "blur(5px)" });
    
    // --- TIMELINE ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: "+=5000",
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // ========================================================================
    // STAGE 1 -> STAGE 2
    // ========================================================================
    icons.forEach((icon, i) => {
        const point = realityPoints[i];
        tl.from(icon, {
            x: () => {
                const iconRect = icon.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const currentRelX = iconRect.left - containerRect.left;
                const startRelX = containerRect.width * (point.corner.x / 100);
                return startRelX - currentRelX - (iconRect.width / 2);
            },
            y: () => {
                const iconRect = icon.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const currentRelY = iconRect.top - containerRect.top;
                const startRelY = containerRect.height * (point.corner.y / 100);
                return startRelY - currentRelY - (iconRect.height / 2);
            },
            rotation: () => gsap.utils.random(-180, 180),
            scale: 2.5,
            duration: 1.5,
            color: "#1a1a1a", // Force explicit starting color
            ease: "power3.inOut"
        }, 0);
    });

    tl.to('.scene-1', { opacity: 0, scale: 0.9, filter: "blur(8px)", duration: 0.8 }, 0);
    tl.to('.bg-lines', { opacity: 0, duration: 0.5 }, 0);

    const stage2Start = 0.8;
    tl.to('.manifesto-headline', { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, stage2Start);
    tl.to('.manifesto-label', { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, stage2Start + 0.1);
    tl.to(gsap.utils.toArray('.manifesto-text'), { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.15 }, stage2Start + 0.2);
    tl.to('.manifesto-outro', { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 }, stage2Start + 0.8);

    // ========================================================================
    // STAGE 2 -> STAGE 3 (Alignment)
    // ========================================================================
    const stage3Start = stage2Start + 2.5; 

    tl.to(['.manifesto-headline', '.manifesto-label', '.manifesto-text', '.manifesto-outro'], {
        opacity: 0, y: -30, filter: "blur(10px)", duration: 1, stagger: 0.05
    }, stage3Start);

    icons.forEach((icon, i) => {
        tl.to(icon, {
            x: () => {
                const iconRect = icon.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const iconWidth = iconRect.width;
                const gap = 60;
                const totalWidth = (iconWidth * 4) + (gap * 3);
                const containerCenter = containerRect.width / 2;
                const startX = containerCenter - (totalWidth / 2);
                const targetRelX = startX + (i * (iconWidth + gap));
                const currentRelX = iconRect.left - containerRect.left;
                return targetRelX - currentRelX;
            },
            y: () => {
                const iconRect = icon.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const targetRelY = (containerRect.height / 2) - 100;
                const currentRelY = iconRect.top - containerRect.top;
                return targetRelY - currentRelY;
            },
            rotation: 0,
            scale: 1.5,
            color: realityPoints[i].color,
            duration: 2,
            ease: "power3.inOut"
        }, stage3Start + 0.5);
    });

    tl.to('.scene-3', { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, stage3Start + 2.0);

    // ========================================================================
    // STAGE 3 -> STAGE 4 (The Rewrite / Editorial Cut)
    // ========================================================================
    const stage4Start = stage3Start + 3.2; // Start quickly after alignment

    // SCRAMBLE LOGIC
    const originalLine1 = "Brands don’t win by showing what is.";
    const targetLine1 = "HERE’S SOMETHING WE’VE PREPARED FOR FARMLEY";
    
    const originalLine2 = "They win by shaping what it means.";
    const targetLine2 = "WHILE STAYING IN REALITY, CAPTURING DIFFERENT PERCEPTIONS.";

    const scrambler = { val: 0 };
    
    // 1. Text Transformation - FAST (0.8s)
    tl.to(scrambler, {
        val: 1,
        duration: 0.8, // Tight duration for a "cut" feel
        ease: "power3.inOut",
        onUpdate: () => {
            const p = scrambler.val;
            
            if (line1Ref.current) line1Ref.current.innerText = scrambleString(targetLine1, p, originalLine1);
            if (line2Ref.current) line2Ref.current.innerText = scrambleString(targetLine2, p, originalLine2);

            // Instant swap of icons at 50%
            if (p > 0.5) {
                gsap.set('.icon-variant-a', { opacity: 0 });
                gsap.set('.icon-variant-b', { opacity: 1 });
            } else {
                gsap.set('.icon-variant-a', { opacity: 1 });
                gsap.set('.icon-variant-b', { opacity: 0 });
            }
        }
    }, stage4Start);

    // 2. Icon Physical Reaction - Snap
    icons.forEach((icon) => {
        // Contract (Tension)
        tl.to(icon, {
            scale: 1.2,
            rotation: () => gsap.utils.random(-8, 8),
            duration: 0.4,
            ease: "back.in(2)",
        }, stage4Start);

        // Expand (Release)
        tl.to(icon, {
            scale: 1.6,
            rotation: 0,
            filter: "brightness(1.2)",
            duration: 0.4,
            ease: "back.out(1.5)", // Confident settle
        }, stage4Start + 0.4);
    });
    
    // 3. Typographic Style Shift
    tl.to('.stage-3-line-1', {
        color: "#1a1a1a",
        fontWeight: "800",
        fontFamily: "Inter, sans-serif",
        fontStyle: "normal",
        duration: 0.8
    }, stage4Start);

    tl.to('.stage-3-line-2', {
        color: "#1a1a1a",
        fontWeight: "800",
        fontFamily: "Inter, sans-serif",
        letterSpacing: "-0.02em",
        duration: 0.8
    }, stage4Start);

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#F3F2ED] text-[#1a1a1a] overflow-hidden flex flex-col items-center justify-center font-mono selection:bg-orange-200"
    >
      <svg className="bg-lines absolute inset-0 w-full h-full pointer-events-none z-10">
        {realityPoints.map((node) => (
             <React.Fragment key={node.id}>
                 <line 
                   x1={`${node.corner.x}%`} y1={`${node.corner.y}%`} 
                   x2="50%" y2="50%" 
                   stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
                 />
                 <circle cx={`${node.corner.x}%`} cy={`${node.corner.y}%`} r="6" fill="none" stroke="#1a1a1a" strokeWidth="2" />
             </React.Fragment>
        ))}
      </svg>

      {/* --- SCENE 1 --- */}
      <div className="scene-1 absolute inset-0 z-20 flex flex-col items-center justify-center w-full px-8 pointer-events-none">
         {/* Added pointer-events-auto to container to ensure mousemove is captured over text area */}
         <div className="pointer-events-auto">
            <InteractiveScrambleText text="The strongest brands don’t change reality, they change how it’s PERCEIVED." />
         </div>
      </div>

      {/* --- SCENE 2 --- */}
      <div className="scene-2 absolute inset-0 z-30 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="max-w-6xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12">
          
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

          <div className="md:col-span-8 flex flex-col space-y-8 md:space-y-6">
            {realityPoints.map((point) => (
              <div key={point.id} className="manifesto-item flex items-center h-16 md:h-20">
                <div className="w-16 h-16 md:w-20 md:h-20 mr-6 shrink-0 flex items-center justify-center relative z-50">
                   <div className="manifesto-icon-wrapper w-full h-full text-black will-change-transform">
                      <div className="icon-variant-a absolute inset-0 opacity-100 transition-none">
                        <PixelGlyphIcon shapeId={point.shapeId} variant="A" className="w-full h-full drop-shadow-2xl" />
                      </div>
                      <div className="icon-variant-b absolute inset-0 opacity-0 transition-none">
                        <PixelGlyphIcon shapeId={point.shapeId} variant="B" className="w-full h-full drop-shadow-2xl" />
                      </div>
                   </div>
                </div>
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

      {/* --- SCENE 3 & 4: THE SYNTHESIS --- */}
      <div className="scene-3 absolute inset-0 z-40 w-full h-full flex flex-col items-center justify-center pointer-events-none">
          <div className="mt-32 md:mt-48 text-center space-y-4 max-w-5xl w-full px-6">
              <p 
                ref={line1Ref}
                className="stage-3-line-1 font-serif italic text-2xl md:text-4xl text-neutral-600 will-change-contents min-h-[1.5em]"
              >
                  Brands don’t win by showing what is.
              </p>
              <p 
                ref={line2Ref}
                className="stage-3-line-2 font-sans font-black text-3xl md:text-5xl text-[#1a1a1a] tracking-tight will-change-contents min-h-[1.5em]"
              >
                  They win by shaping what it means.
              </p>
          </div>
      </div>

    </section>
  );
};

export default VerticalSection;