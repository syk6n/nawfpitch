import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Video Data ---
const VIDEOS = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dn8arfwkl/video/upload/v1767424415/Ugc2_xrnv5p.mp4",
    label: "PERSPECTIVE 01"
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dn8arfwkl/video/upload/f_auto,q_auto,w_720,fps_30/UGC1_qgvy1e.mp4",
    label: "PERSPECTIVE 02"
  }
];

const POST_GALLERY_VIDEOS = [
  {
    id: 3,
    src: "https://res.cloudinary.com/dn8arfwkl/video/upload/v1767782537/1misc_irnvug.mp4",
    label: "PERSPECTIVE 03"
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dn8arfwkl/video/upload/v1767782536/2misc_sifsgr.mp4",
    label: "PERSPECTIVE 04"
  }
];

// --- Gallery Data ---
const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762033/product_shots_1_ytmxlh.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762032/product_shots_10_rzddzj.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762032/product_shots_11_tllysc.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762032/product_shots_12_edkmhz.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762030/product_shots_13_wyaikt.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762033/product_shots_14_v4nskz.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762033/product_shots_15_yrpy9y.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762266/product_shots_155_bpl6t8.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762030/product_shots_2_i871a8.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762033/product_shots_3_qneuvq.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762031/product_shots_4_eqslbr.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762031/product_shots_5_yivovu.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762030/product_shots_6_y5vxfk.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762030/product_shots_7_ctkxuo.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762031/product_shots_8_odij4s.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762030/product_shots_9_jz7rar.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762035/product_shots_16_ebmwya.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762459/AIRA_FARMLEY_02_ae1dbm.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762458/AIRA_71.1.jpeg_ubazmy.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767773776/AIRA_FARMLEY_SHOOT_06_uilvvi.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762454/AIRA_FARMLEY_PHOTOSHOOT_04_emqhma.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762454/AIRA_FARMLEY_01_kszjto.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762453/AIRA_FARMLEY_PHOTOSHOOT_03_pdkx7m.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762452/AIRA_FARMLEY_PHOTOSHOOT_04.1_wh4iww.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762451/AIRA_FARMLEY_SHOOT_05.1_bpnvvq.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762450/AIRA_FARMLEY_SHOOT_05_kjj13z.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762419/DHAIRYA_FARMLEY_04_qaed1x.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762418/DHAIRYA_FARMLEY_SHOOT_05_k6ky02.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762417/DHAIRYA_FARMLEY_SHOOT_06_chogha.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762416/DHAIRYA_FARMLEY_03_rnfhz2.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762416/DHAIRYA_FARMLEY_SHOOT_05.1_io0nrl.jpg",
  "https://res.cloudinary.com/dn8arfwkl/image/upload/v1767762416/DHAIRYA_FARMLEY_02_aiawhf.jpg"
];

// --- Sub-Component: Lightbox ---
const Lightbox = ({ src, onClose }: { src: string | null, onClose: () => void }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (src) {
      setIsActive(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsActive(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [src]);

  if (!src && !isActive) return null;

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-opacity duration-500 ${src ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className="relative max-w-[95vw] max-h-[95vh] p-2 flex flex-col items-center">
        {src && (
            <img 
                src={src} 
                alt="Full Screen View" 
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl select-none"
            />
        )}
        <div className="mt-6 text-center">
             <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase border border-white/10 px-3 py-1 rounded-full">Click anywhere to close</span>
        </div>
      </div>
      
      <button className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-4 group">
        <svg className="w-10 h-10 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
};

// --- Sub-Component: Cinematic Video Card ---
const CinematicVideo = ({ src, label }: { src: string, label: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null); 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const userPausedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Strict intersection check: 85% visible to play, otherwise pause immediately
          if (entry.isIntersecting) {
            if (!userPausedRef.current && video.paused) {
              video.play()
                .then(() => setIsPlaying(true))
                .catch((err) => {
                  console.debug("Autoplay prevented:", err);
                  setIsPlaying(false);
                });
            }
          } else {
            // Pause immediately when leaving strict view
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
            // Note: We don't reset userPausedRef here to allow autoplay to resume 
            // naturally when scrolling back, unless the user explicitly paused.
          }
        });
      },
      { threshold: 0.85 } 
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play()
        .then(() => {
            setIsPlaying(true);
            userPausedRef.current = false;
        })
        .catch(err => {
            console.error("Play failed:", err);
        });
    } else {
      video.pause();
      setIsPlaying(false);
      userPausedRef.current = true;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && progressBarRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      gsap.set(progressBarRef.current, { width: `${progress}%` });
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    
    // Safety check for duration to prevent NaN
    if (isFinite(video.duration)) {
        video.currentTime = percentage * video.duration;
        if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { width: `${percentage * 100}%` });
        }
    }
  };

  return (
    <div 
      ref={wrapperRef}
      className="relative group w-[70vw] md:w-[40vh] aspect-[9/16] shrink-0 bg-neutral-900 rounded-sm overflow-hidden border border-white/5 mx-[5vw]"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
        playsInline
        loop
        muted
        preload="metadata"
        crossOrigin="anonymous"
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
          {label}
        </span>
      </div>

      <div 
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end"
        onClick={(e) => togglePlay(e)}
      >
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

        <div className="relative z-20 w-full px-5 pb-5 flex flex-col gap-3">
            <div 
                className="w-full h-1 bg-white/20 rounded-full cursor-pointer relative group/scrubber hover:h-1.5 transition-all duration-300 overflow-hidden"
                onClick={handleSeek}
            >
                <div 
                    ref={progressBarRef} 
                    className="h-full bg-white w-0 rounded-full relative"
                />
            </div>

            <div className="flex items-center justify-between">
                <button 
                    onClick={togglePlay}
                    className="flex items-center gap-3 group/btn focus:outline-none"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-200 group-hover/btn:bg-white/20 group-hover/btn:scale-105 group-active/btn:scale-95">
                        {isPlaying ? (
                            <svg className="w-3 h-3 text-white fill-white" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        ) : (
                            <svg className="w-3 h-3 text-white fill-white ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        )}
                    </div>
                    <span className="font-mono text-[10px] text-white/80 tracking-widest uppercase opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300">
                        {isPlaying ? 'Pause' : 'Play'}
                    </span>
                </button>

                <button 
                    onClick={toggleMute}
                    className="flex items-center gap-3 group/btn focus:outline-none flex-row-reverse"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-200 group-hover/btn:bg-white/20 group-hover/btn:scale-105 group-active/btn:scale-95">
                        {isMuted ? (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                        ) : (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        )}
                    </div>
                    <span className="font-mono text-[10px] text-white/80 tracking-widest uppercase opacity-0 translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300">
                        {isMuted ? 'Unmute' : 'Mute'}
                    </span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};


const HorizontalVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Debounced Refresh Ref
  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced refresh handler
  const handleImageLoad = useCallback(() => {
    if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    refreshTimeout.current = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200); // 200ms debounce
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Safety: ensure track has width, otherwise default to a reasonable fallback
    // to prevent GSAP errors or infinite scroll loops.
    const getScrollAmount = () => {
        if (!track) return 0;
        const width = track.scrollWidth;
        const viewport = window.innerWidth;
        // If track hasn't laid out yet, return 0 to be safe
        if (width === 0) return 0;
        return -(width - viewport);
    };

    // Timeline for the entire section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1, 
        // Dynamic end calculation to handle resizing gracefully
        end: () => `+=${Math.max(1000, track.scrollWidth - window.innerWidth + 500)}`, 
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. Background Color Morph
    tl.to(container, {
      backgroundColor: "#050505", 
      duration: 0.5,
      ease: "power2.inOut"
    }, 0);

    // 2. Horizontal Scroll Logic
    const scrollTween = tl.to(track, {
      x: getScrollAmount,
      ease: "none",
      duration: 10
    }, 0);

    // 3. Reveal Videos (Fast & Early)
    const videos = gsap.utils.toArray<HTMLElement>(".cinematic-video-wrapper");
    if (videos.length > 0) {
      tl.fromTo(videos, 
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          duration: 0.5, 
          stagger: 0.1, 
          ease: "power2.out" 
        },
        0 // Start immediately
      );
    }

    // 4. Reveal Gallery Items
    const galleryItems = gsap.utils.toArray<HTMLElement>(".gallery-item");
    galleryItems.forEach((item, i) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                containerAnimation: scrollTween, 
                start: "left 110%", 
                end: "left 80%",
                scrub: 1,
                id: `gallery-item-${i}`
            }
        });
    });

    // 5. Reveal Late Videos (Post-Gallery)
    const lateVideos = gsap.utils.toArray<HTMLElement>(".cinematic-video-wrapper-late");
    lateVideos.forEach((video, i) => {
        gsap.from(video, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: video,
                containerAnimation: scrollTween, 
                start: "left 110%", 
                end: "left 70%",
                scrub: 1,
                id: `late-video-${i}`
            }
        });
    });

  }, { scope: containerRef, dependencies: [] });

  return (
    <>
      {/* Lightbox Overlay */}
      <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />

      <section 
        ref={containerRef} 
        className="relative w-full h-screen overflow-hidden bg-[#F3F2ED] flex items-center"
      >
        
        <div 
          ref={trackRef} 
          className="flex items-center h-full px-[10vw] will-change-transform"
        >
          
          {/* Intro Text Block */}
          <div className="shrink-0 w-[80vw] md:w-[30vw] mr-[10vw] flex flex-col justify-center">
            <h2 className="font-sans font-black text-4xl md:text-6xl tracking-tighter text-white mix-blend-difference mb-6">
              SHIFT<br/>PERSPECTIVE
            </h2>
            <div className="w-12 h-1 bg-white/20 mb-6" />
            <p className="font-mono text-sm text-white/60 max-w-xs leading-relaxed">
              When we change the lens, we change the output. Observe the process in motion.
            </p>
          </div>

          {/* Videos */}
          {VIDEOS.map((video) => (
            <div key={video.id} className="cinematic-video-wrapper shrink-0">
               <CinematicVideo 
                 src={video.src} 
                 label={video.label}
               />
            </div>
          ))}

          {/* Section Divider / Title */}
          <div className="shrink-0 w-[30vw] flex flex-col items-center justify-center opacity-40 mx-[5vw]">
             <div className="h-24 w-px bg-white/50 mb-4" />
             <span className="font-mono text-xs tracking-widest uppercase text-white rotate-90 whitespace-nowrap">
                The Artefacts
             </span>
             <div className="h-24 w-px bg-white/50 mt-4" />
          </div>

          {/* 
            Linear Gallery: Horizontal Flex Row
            Simple, clean presentation of full-height images.
          */}
          <div className="shrink-0 h-[60vh] flex items-center gap-6 mr-[10vw]">
             {GALLERY_IMAGES.map((imgSrc, i) => (
                <div 
                    key={i}
                    className="gallery-item relative h-full shrink-0 group cursor-pointer border border-transparent hover:border-white/20 rounded-sm transition-all duration-300"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(imgSrc);
                    }}
                >
                    <img 
                        src={imgSrc} 
                        alt={`Gallery ${i}`}
                        className="h-full w-auto max-w-none object-contain shadow-sm"
                        onLoad={handleImageLoad} 
                        loading="lazy"
                    />
                    
                    {/* Hover Overlay - Only visible on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-md p-3 rounded-full text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                        </div>
                    </div>
                </div>
             ))}
          </div>

          {/* Section Divider 2 */}
          <div className="shrink-0 w-[30vw] flex flex-col items-center justify-center opacity-40 mx-[5vw]">
             <div className="h-24 w-px bg-white/50 mb-4" />
             <span className="font-mono text-xs tracking-widest uppercase text-white rotate-90 whitespace-nowrap">
                In Motion
             </span>
             <div className="h-24 w-px bg-white/50 mt-4" />
          </div>

          {/* Late Videos */}
          {POST_GALLERY_VIDEOS.map((video) => (
            <div key={video.id} className="cinematic-video-wrapper-late shrink-0">
               <CinematicVideo 
                 src={video.src} 
                 label={video.label}
               />
            </div>
          ))}

          {/* Outro Spacer */}
          <div className="shrink-0 w-[20vw]" />

        </div>

        {/* Decorative Overlay: Vignette for cinematic feel */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      </section>
    </>
  );
};

export default HorizontalVideoSection;