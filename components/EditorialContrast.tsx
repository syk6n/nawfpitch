import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/existing%20ai%20(2).jpg",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/existing%20ai%20(1).jpg"
];

// --- LIGHTBOX COMPONENT ---
const Lightbox = ({ src, onClose }: { src: string | null, onClose: () => void }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (src) { document.body.style.overflow = "hidden"; } 
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [src]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && src) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [src, onClose]);

  if (!mounted || !src) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/98"
      onClick={onClose}
    >
      <img
        src={src}
        alt="Full View"
        className="max-w-[95vw] max-h-[95vh] object-contain select-none shadow-none"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute top-6 right-6">
        <button 
            className="text-white/40 hover:text-white transition-colors p-4 font-mono text-xs uppercase tracking-widest" 
            onClick={onClose}
        >
           Close
        </button>
      </div>
    </div>,
    document.body
  );
};

const EditorialContrast: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  
  // Debounce refresh to handle layout shifts from image loading
  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleImageLoad = useCallback(() => {
    if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    refreshTimeout.current = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Elements
    const images = gsap.utils.toArray<HTMLElement>('.editorial-plate');
    const textLines = gsap.utils.toArray<HTMLElement>('.manifesto-line');

    // PINNED TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%', // Controlled scroll distance
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // 1. Images Reveal (Fade Up)
    tl.fromTo(images, 
      { opacity: 0, y: 80, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.0, 
        stagger: 0.2, 
        ease: 'power3.out' 
      },
      0
    );

    // 2. Text Reveal (Line by Line, rising from below)
    tl.fromTo(textLines,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power2.out'
      },
      0.5 // Overlap significantly with images
    );

    // 3. Buffer (Hold the state)
    tl.to({}, { duration: 0.5 });

  }, { scope: containerRef });

  return (
    <>
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      <section 
        ref={containerRef} 
        className="relative w-full h-screen bg-black flex flex-col justify-center items-center px-6 md:px-12 z-20 overflow-hidden"
      >
        {/* --- IMAGE PLATES ROW --- */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center w-full max-w-6xl mb-12 md:mb-20">
            {IMAGES.map((src, index) => (
                <div 
                    key={index}
                    className="editorial-plate relative w-full md:w-[420px] aspect-[3/4] cursor-zoom-in group overflow-hidden bg-[#111]"
                    onClick={() => setLightboxSrc(src)}
                >
                    <img 
                        src={src} 
                        alt={`Editorial Plate ${index + 1}`} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-out"
                        onLoad={handleImageLoad}
                    />
                </div>
            ))}
        </div>

        {/* --- MANIFESTO TEXT --- */}
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-10 max-w-5xl mx-auto">
            <p 
                className="manifesto-line text-2xl md:text-4xl lg:text-5xl text-[#f0f0f0] leading-tight tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
                1st Ai influencer? Sure… but 1st ultra-realistic Ai influencer? Nope.
            </p>
            <p 
                className="manifesto-line text-2xl md:text-4xl lg:text-5xl text-[#f0f0f0] leading-tight tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
                Cuz if they don’t feel human, they don’t influence
            </p>
            <p 
                className="manifesto-line text-xl md:text-3xl text-white/50 leading-relaxed tracking-wide mt-2"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: 'italic' }}
            >
                (for the right reasons).
            </p>
        </div>

      </section>
    </>
  );
};

export default EditorialContrast;