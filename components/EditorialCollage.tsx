import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS ---
const IMAGES = [
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/WhatsApp%20Image%202026-01-06%20at%2010.00.06%20PM.jpeg?updatedAt=1767956829228",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/WhatsApp%20Image%202026-01-06%20at%2010.11.31%20PM.jpeg?updatedAt=1767956829230",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/Today%20we%20celebrate%20the%20chocolate%20moustaches%20and%20crispy%20smiles._%E2%9C%A8_Shop%20McCain%20Smiles%20and%20Hershe.jpg?updatedAt=1767956829263",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/Himachal%20ki%20galiyon%20mein,%20_HarKoiPeeraLahoriZeera!_%20_ApnaDesiThanda%20_LahoriZeera.jpg?updatedAt=1767956829276",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/Sleighing%20briefs,%20decking%20feeds.Merry%20Christmas%20from%20Schbang!%20_(Schbang,%20Merry%20Christmas,%20Brand.jpg?updatedAt=1767956829307",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/Sleighing%20briefs,%20decking%20feeds.Merry%20Christmas%20from%20Schbang!%20_(Schbang,%20Merry%20Christmas,%20Brand%20(1).jpg?updatedAt=1767956829367",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/They%20taught%20us%20grammar.%20Then%20someone%20taught%20us%20brand%20tone.%20Both%20changed%20the%20way%20we%20write.This%20Te%20(1).jpg?updatedAt=1767956829356",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/They%20taught%20us%20grammar.%20Then%20someone%20taught%20us%20brand%20tone.%20Both%20changed%20the%20way%20we%20write.This%20Te%20(2).jpg?updatedAt=1767956829354",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/Picnic%20rule%20_1-%20Bring%20vibes.Picnic%20rule%20_2-%20Bring%20_LahoriZeera%20__HarKoiPeeraLahoriZeera%20_ApnaDe.jpg?updatedAt=1767956829345",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/Packed%20with%20colour.%20Powered%20by%20attitude.This%20is%20Skybags,%20the%20Schbang%20way%20_%E2%9C%A8For%20@inskybags%20(Schb.jpg?updatedAt=1767956829410",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/The%20season%20of%20joy%20is%20here!%20Make%20your%20celebrations%20cheerful%20with%20some%20McCain%20smiles%20__Merry%20Chr.jpg?updatedAt=1767956829424",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/Where%20imagination%20leads,%20brands%20follow.This%20Children_s%20Day,%20here_s%20to%20ideas%20that%20stay%20young%20fore.jpg?updatedAt=1767956829494",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/Bright%20ideas%20deserve%20brighter%20celebrations.%20Happy%20Diwali%20from%20us%20to%20you!%20_(Schbang,%20brand%20work,.jpg?updatedAt=1767956829381",
  "https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/examples/They%20taught%20us%20grammar.%20Then%20someone%20taught%20us%20brand%20tone.%20Both%20changed%20the%20way%20we%20write.This%20Te.jpg?updatedAt=1767956829459"
];

// Split images into 3 uneven columns for the masonry effect
const COL_1 = [IMAGES[0], IMAGES[3], IMAGES[6], IMAGES[9], IMAGES[12]];
const COL_2 = [IMAGES[1], IMAGES[4], IMAGES[7], IMAGES[10]];
const COL_3 = [IMAGES[2], IMAGES[5], IMAGES[8], IMAGES[11], IMAGES[13]];

// --- LIGHTBOX COMPONENT (Local) ---
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
        className="max-w-[95vw] max-h-[95vh] object-contain select-none shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute top-6 right-6">
        <button className="text-white/40 hover:text-white transition-colors p-4" onClick={onClose}>
           CLOSE
        </button>
      </div>
    </div>,
    document.body
  );
};

// --- IMAGE ITEM COMPONENT ---
interface CollageItemProps {
  src: string;
  index: number;
  onClick: (src: string) => void;
  onLoad: () => void;
}

const CollageItem: React.FC<CollageItemProps> = ({ src, index, onClick, onLoad }) => {
  // Vary width and margins based on index to create "placed not tiled" feel
  const isSmall = index % 3 === 0;
  const isRightAligned = index % 2 === 0;
  
  return (
    <div 
      className={`collage-image mb-24 md:mb-32 w-full flex ${isRightAligned ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`relative group cursor-pointer overflow-hidden ${isSmall ? 'w-[70%]' : 'w-full'}`}
        onClick={() => onClick(src)}
      >
        <img 
          src={src} 
          alt={`NAWF'S REALITY EDGE ${index}`} 
          className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.03]"
          onLoad={onLoad}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    </div>
  );
};

const EditorialCollage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Debounced Refresh to handle dynamic image loading height changes
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

    // PINNED TIMELINE:
    // This pins the entire screen, allowing the columns to scroll internally at different speeds
    // giving a controlled, sequential feel.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=350%', // Reduced from 600% to remove "extra scroll"
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true, // Ensure calculations rerun on resize/refresh
      }
    });

    // 1. Header Transition (Fade up slightly to make room)
    tl.to('.editorial-header', { 
        y: -100, 
        opacity: 0, // Fade out completely so it doesn't obstruct
        scale: 0.95, 
        duration: 0.5 
    }, 0);

    // 2. Dynamic Column Parallax
    // We calculate exactly how much each column needs to move to show its bottom edge.
    const getTargetY = (col: HTMLElement | null) => {
        if (!col) return 0;
        const height = col.scrollHeight;
        const viewportHeight = window.innerHeight;
        // Move up enough so the bottom of the column aligns with viewport bottom
        // Adding 150px buffer so the last image lifts up a bit clearly
        return -(height - viewportHeight + 150);
    };

    // Col 1
    tl.to(col1Ref.current, { 
        y: () => getTargetY(col1Ref.current), 
        ease: 'none', 
        duration: 1 
    }, 0);

    // Col 2
    tl.to(col2Ref.current, { 
        y: () => getTargetY(col2Ref.current), 
        ease: 'none', 
        duration: 1 
    }, 0);

    // Col 3
    tl.to(col3Ref.current, { 
        y: () => getTargetY(col3Ref.current), 
        ease: 'none', 
        duration: 1 
    }, 0);


    // 3. Image Entry (Subtle Scale)
    const images = gsap.utils.toArray<HTMLElement>('.collage-image img');
    tl.to(images, {
        scale: 1.05,
        duration: 1,
        stagger: 0.05,
        ease: 'none'
    }, 0);

    // 4. End Buffer
    // Shortened buffer so unpin happens immediately after images finish
    tl.to({}, { duration: 0.05 });

  }, { scope: containerRef });

  return (
    <>
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      <section 
        ref={containerRef} 
        className="relative w-full h-screen bg-black text-[#e5e5e5] px-6 md:px-12 lg:px-24 py-12 md:py-24 overflow-hidden flex flex-col z-10"
      >
        
        {/* --- HEADER --- */}
        {/* Fixed at top of the section */}
        <div className="editorial-header max-w-7xl mx-auto w-full relative z-20 shrink-0 mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 border-t border-white/20 pt-8">
                
                {/* Heading */}
                <div className="max-w-2xl">
                    <span className="inline-block border border-white/30 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest mb-6 text-white/60">
                        NAWF'S REALITY EDGE
                    </span>
                    <h2 className="font-mono text-3xl md:text-5xl uppercase tracking-tighter leading-[1.1] text-[#e5e5e5]">
                        NOT THE FAMOUS KURKURE PLASTIC TEST BUT SOMETHING SIMILAR
                    </h2>
                </div>

                {/* Body Copy */}
                <div className="max-w-md pb-2">
                    <p className="font-serif text-lg md:text-xl text-[#a3a3a3] leading-relaxed">
                        Big brands are adopting AI, but are they delivering realism and storytelling that truly converts? Meh… not quite so!
                    </p>
                </div>
            </div>
        </div>

        {/* --- ASYMMETRIC COLLAGE --- */}
        {/* Full height container for columns */}
        <div className="relative w-full max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24 flex-1 h-full">
            
            {/* Column 1 */}
            <div ref={col1Ref} className="flex flex-col pt-12 will-change-transform">
                {COL_1.map((src, i) => (
                    <CollageItem 
                        key={`c1-${i}`} 
                        src={src} 
                        index={i} 
                        onClick={setLightboxSrc} 
                        onLoad={handleImageLoad}
                    />
                ))}
            </div>

            {/* Column 2 - Offset Start */}
            <div ref={col2Ref} className="flex flex-col pt-48 md:pt-64 will-change-transform">
                {COL_2.map((src, i) => (
                    <CollageItem 
                        key={`c2-${i}`} 
                        src={src} 
                        index={i + 10} 
                        onClick={setLightboxSrc} 
                        onLoad={handleImageLoad}
                    />
                ))}
            </div>

            {/* Column 3 - Slight Offset */}
            <div ref={col3Ref} className="flex flex-col pt-24 md:pt-32 will-change-transform">
                {COL_3.map((src, i) => (
                    <CollageItem 
                        key={`c3-${i}`} 
                        src={src} 
                        index={i + 20} 
                        onClick={setLightboxSrc} 
                        onLoad={handleImageLoad}
                    />
                ))}
            </div>

        </div>

        {/* --- FOOTER DECORATION --- */}
        <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end opacity-30 pointer-events-none z-30">
             <span className="font-mono text-xs uppercase tracking-widest">Fig. 01 — 14</span>
             <div className="w-px h-24 bg-white/50" />
        </div>

      </section>
    </>
  );
};

export default EditorialCollage;