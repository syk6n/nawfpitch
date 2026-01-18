import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS ---
const AIRA_IMAGES = [
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762637/AIRA_ANGLES_11_jqsisy.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762539/Aira_48.1.jpeg_xre4ta.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762537/Aira_54.jpeg_or4kfk.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762536/Aira_45.1.jpeg_olyupe.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762536/Aira_50.jpeg_kswmch.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762535/Aira_31.jpeg_mmaw1d.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762534/AIRA_78.jpeg_t4eqx4.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762531/AIRA_69.jpeg_pwbkxc.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762530/AIRA_67.1.jpeg_suxlfw.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762529/Aira_20.jpeg_tcy4cz.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762526/AIRA_85.1_dms8ap.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762526/AIRA_57.jpeg_bxinuy.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762526/AIRA_65.jpeg_o74tqe.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762525/Aira_34.jpeg_bxa3ol.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762519/Aira_25.1.jpeg_srrk4o.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762518/Aira_19.jpeg_stb1p5.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762518/Aira_53.1.jpeg_gzkffh.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762515/AIRA_ANGLES_7_f2dibr.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762514/AIRA_70.3.jpeg_og5smz.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762514/AIRA_63.jpeg_i2yctk.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762513/AIRA_72.jpeg_rxw5vg.jpg"
];

const DHAIRYA_IMAGES = [
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762713/DHAIRYA_14_raavc6.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762709/DHAIRYA_31_pkxcee.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762707/DHAIRYA_8_n5gbvu.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762707/DHAIRYA_17_rumorn.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762704/DHAIRYA_23_azzrtl.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762700/DHAIRYA_18_drhpla.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762699/DHAIRYA_3_b4gwu5.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762699/DHAIRYA_5_ujitxe.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762695/DHAIRYA_24_upot8z.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762694/DHAIRYA_4_tfv3lc.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762692/DHAIRYA_28_u2zjd4.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762691/DHAIRYA_26_kw7nwx.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762689/DHAIRYA_19_h0y0hf.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762687/DHAIRYA_27_ch6ys9.jpg"
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
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <img
        src={src}
        alt="Full Screen"
        className="max-w-[98vw] max-h-[98vh] object-contain select-none shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-4"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase border border-white/10 px-3 py-1 rounded-full bg-black/50">
          Close [ESC]
        </span>
      </div>
    </div>,
    document.body
  );
};

const InfluencerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const airaTextRef = useRef<HTMLDivElement>(null);
  const dhairyaTextRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Ref for debouncing scroll refresh on image load
  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleImageLoad = useCallback(() => {
    if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    refreshTimeout.current = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // 1. Calculate horizontal scroll distance
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      // Scroll exactly to the end of the track
      return -(trackWidth - viewportWidth);
    };

    // The Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        // Responsive speed: Distance to travel = Scroll Distance (1:1 mapping)
        // This ensures the scroll feels natural and fast, not sluggish.
        end: () => `+=${track.scrollWidth - window.innerWidth}`, 
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    // Horizontal Movement - LINEAR EASE for constant speed
    const scrollTween = tl.to(track, {
      x: getScrollAmount,
      ease: 'none', 
    });

    // --- TEXT FADE LOGIC ---
    // 1. Aira Text Reveal (Fade in very early)
    gsap.fromTo(airaTextRef.current,
        { opacity: 0, x: -50 },
        { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            ease: 'power2.out',
            scrollTrigger: {
                trigger: container,
                start: 'top top', 
                end: '+=10%', // Reveal quickly
                scrub: true,
                toggleActions: 'play none none reverse'
            }
        }
    );

    // 2. The Switch (Triggered ONLY when we reach the marker element)
    const dhairyaStartEl = track.querySelector('.dhairya-start-marker');
    
    if (dhairyaStartEl) {
        // Fade OUT Aira Text
        gsap.to(airaTextRef.current, {
            opacity: 0,
            x: -20,
            duration: 0.3, // Fast transition
            scrollTrigger: {
                trigger: dhairyaStartEl,
                containerAnimation: scrollTween,
                // Trigger exactly when the marker is fully visible (Right edge touches viewport Right edge)
                // This aligns with Dhairya's images entering the screen
                start: 'right 100%', 
                end: 'right 85%',
                scrub: true,
                id: 'aira-fade-out'
            }
        });

        // Fade IN Dhairya Text
        gsap.fromTo(dhairyaTextRef.current,
            { opacity: 0, x: -20 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.3,
                scrollTrigger: {
                    trigger: dhairyaStartEl,
                    containerAnimation: scrollTween,
                    start: 'right 100%',
                    end: 'right 85%',
                    scrub: true,
                    id: 'dhairya-fade-in'
                }
            }
        );
    }

    // Intro Text Animation
    const introText = container.querySelectorAll('.intro-anim');
    gsap.to(introText, {
        opacity: 0,
        x: -100,
        stagger: 0.05,
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=15%', // Faster fade out
            scrub: true
        }
    });

  }, { scope: containerRef });

  // Styles
  const metaStyle = "font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#eaeaea]";
  const nameStyle = "font-sans font-black text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-none mb-6";
  const labelStyle = "font-mono text-xs text-red-600 tracking-widest uppercase mb-4 block";

  return (
    <>
    <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
    
    <section ref={containerRef} className="relative w-full h-screen bg-black text-[#eaeaea] overflow-hidden">
      
      {/* Background Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* --- FIXED TEXT LAYER (Z-INDEX 20) --- */}
      <div className="absolute inset-0 z-20 pointer-events-none">
          
          {/* AIRA TEXT */}
          <div 
            ref={airaTextRef}
            className="absolute left-0 top-0 h-full w-[45vw] md:w-[35vw] flex flex-col justify-center px-6 md:px-12 bg-gradient-to-r from-black via-black/95 to-transparent opacity-0"
          >
              <div className="pointer-events-auto pl-2 md:pl-8">
                <span className={labelStyle}>NAWF'S</span>
                <h2 className={nameStyle}>
                    <SplitText>AIRA</SplitText><br/>
                    <SplitText className="text-neutral-500">OBEROI</SplitText>
                </h2>
                
                {/* Red Banner Data Style */}
                <div className="border-t border-b border-red-600/50 py-4 bg-red-900/10 backdrop-blur-sm">
                   <p className={`${metaStyle} leading-loose`}>
                      <span className="text-white font-bold">JANUARY 01, 1998</span> 
                      <span className="text-red-600 mx-3">|</span> 
                      <span className="text-white/80">28 YRS</span><br/>
                      <span className="text-white font-bold">MUMBAI</span> 
                      <span className="text-red-600 mx-3">|</span> 
                      <span className="text-white/80">5'8"</span><br/>
                      <span className="text-white font-bold">CAPRICORN</span>
                   </p>
                </div>
              </div>
          </div>

          {/* DHAIRYA TEXT */}
          <div 
            ref={dhairyaTextRef}
            className="absolute left-0 top-0 h-full w-[45vw] md:w-[35vw] flex flex-col justify-center px-6 md:px-12 bg-gradient-to-r from-black via-black/95 to-transparent opacity-0"
          >
              <div className="pointer-events-auto pl-2 md:pl-8">
                <span className={labelStyle}>NAWF'S</span>
                <h2 className={nameStyle}>
                    <SplitText>DHAIRYA</SplitText><br/>
                    <SplitText className="text-neutral-500">NAIR</SplitText>
                </h2>
                
                <div className="border-t border-b border-red-600/50 py-4 bg-red-900/10 backdrop-blur-sm">
                   <p className={`${metaStyle} leading-loose`}>
                      <span className="text-white font-bold">NOVEMBER 07, 1999</span> 
                      <span className="text-red-600 mx-3">|</span> 
                      <span className="text-white/80">26 YRS</span><br/>
                      <span className="text-white font-bold">DELHI</span> 
                      <span className="text-red-600 mx-3">|</span> 
                      <span className="text-white/80">6'0"</span><br/>
                      <span className="text-white font-bold">SCORPIO</span>
                   </p>
                </div>
              </div>
          </div>
      </div>

      {/* --- SCROLLING TRACK (Z-INDEX 10) --- */}
      <div ref={trackRef} className="flex h-full will-change-transform z-10 relative items-center">
        
        {/* 1. INTRO PANEL */}
        <div className="w-screen h-full shrink-0 flex flex-col justify-center items-center relative px-6">
           <div className="max-w-6xl text-center intro-anim flex flex-col items-center">
                <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-[0.9] mb-12">
                    NAWF’S<br/>
                    <span className="font-sans font-black tracking-tighter">Influencer Tease</span>
                </h1>

                <div className="mb-12">
                    <span className="inline-block px-8 py-4 border border-red-600 rounded-full bg-red-950/30 backdrop-blur-md text-red-500 font-sans font-black text-lg md:text-3xl lg:text-4xl tracking-widest uppercase shadow-[0_0_40px_rgba(220,38,38,0.3)] leading-tight">
                        INDIA’S 1ST EVER ULTRA REALISTIC AI INFLUENCERS
                    </span>
                </div>

                <p className="font-mono text-lg md:text-2xl lg:text-3xl tracking-[0.2em] text-neutral-400 uppercase font-bold text-center max-w-4xl mx-auto leading-relaxed">
                    The Future of Influencer Marketing
                </p>
           </div>
        </div>

        {/* 2. AIRA GALLERY 
            Padding ensures text doesn't overlap images initially.
        */}
        <div className="flex items-center gap-6 h-[60vh] md:h-[75vh] pl-[45vw] md:pl-[40vw]">
             {AIRA_IMAGES.map((src, i) => (
                 <div 
                    key={`aira-${i}`}
                    className="relative h-full shrink-0 group cursor-pointer border border-transparent hover:border-white/20 transition-all duration-300"
                    onClick={() => setSelectedImage(src)}
                 >
                     <img 
                        src={src} 
                        alt={`Aira Look ${i}`}
                        className="h-full w-auto max-w-none object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                        loading="lazy"
                        onLoad={handleImageLoad}
                     />
                     <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[10px] font-mono uppercase text-white">Full Screen</span>
                     </div>
                 </div>
             ))}
        </div>

        {/* SPACER / TRANSITION MARKER 
            Reduced spacer to 10vw for faster transition to next profile.
        */}
        <div className="w-[10vw] shrink-0" />
        
        <div className="dhairya-start-marker w-[20vw] shrink-0 h-full border-l border-white/10 mx-12 relative flex items-center justify-center">
             <span className="font-mono text-[10px] text-white/30 uppercase -rotate-90 tracking-widest whitespace-nowrap">
                 Next Profile
             </span>
        </div>

        {/* 3. DHAIRYA GALLERY */}
        <div className="flex items-center gap-6 h-[60vh] md:h-[75vh] pr-[20vw]">
             {DHAIRYA_IMAGES.map((src, i) => (
                 <div 
                    key={`dhairya-${i}`}
                    className="relative h-full shrink-0 group cursor-pointer border border-transparent hover:border-white/20 transition-all duration-300"
                    onClick={() => setSelectedImage(src)}
                 >
                     <img 
                        src={src} 
                        alt={`Dhairya Look ${i}`}
                        className="h-full w-auto max-w-none object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                        loading="lazy"
                        onLoad={handleImageLoad}
                     />
                 </div>
             ))}
        </div>

      </div>
    </section>
    </>
  );
};

export default InfluencerSection;