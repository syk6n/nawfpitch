import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "https://res.cloudinary.com/dn8arfwkl/video/upload/v1768033372/0110_1_pudzkj.mp4";

const TeaserSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const teaserRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    // 1. Header Reveal
    const headerWords = container.querySelectorAll('.teaser-header .split-word');
    tl.fromTo(headerWords, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out' },
      0
    );

    // 2. Frame Draw (Clip Path on wrapper to simulate draw from left)
    // Using clip-path allows us to reveal the solid red box smoothly
    tl.fromTo(teaserRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'expo.out' },
        0.2
    );

    // 3. Text Reveal inside frame (Character stagger)
    const teaserChars = container.querySelectorAll('.teaser-text .split-char');
    tl.fromTo(teaserChars,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.02, ease: 'power2.out' },
        0.8 // Start after frame is mostly drawn
    );

  }, { scope: containerRef });

  const handleClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    const video = videoRef.current;
    const teaser = teaserRef.current;
    const text = textRef.current;

    if (!teaser || !video || !text) return;

    const tl = gsap.timeline();

    // 1. Fade out text content immediately
    tl.to(text, { opacity: 0, duration: 0.3, ease: 'power2.out' });

    // 2. Expand Frame
    // We animate width/maxWidth to fill container
    tl.to(teaser, {
        maxWidth: '100%',
        width: '100%',
        duration: 1.2,
        ease: 'expo.inOut'
    }, 0.1);

    // 3. Morph Appearance (Red -> Transparent/Video)
    // We fade the background color out as video fades in
    tl.to(teaser, {
        backgroundColor: '#000000', // Fade to black for video bg
        borderColor: 'transparent', // Border disappears
        duration: 0.8,
        ease: 'power2.out'
    }, 0.3);

    // 4. Reveal & Play Video
    tl.set(video, { display: 'block' }, 0.1);
    tl.fromTo(video, 
        { opacity: 0, scale: 1.05 },
        { 
            opacity: 1, 
            scale: 1, 
            duration: 1.0, 
            ease: 'power2.out', 
            onComplete: () => {
                video.play().catch(e => console.error("Autoplay failed", e));
            } 
        },
        0.5 // Overlap with expansion
    );
  };

  return (
    <section 
        ref={containerRef} 
        className="relative w-full bg-[#F3F2ED] p-6 md:p-12 lg:p-20 flex justify-center items-center min-h-[80vh] z-20"
    >
        {/* Editorial Frame Wrapper */}
        <div className="w-full max-w-[1400px] min-h-[60vh] border border-[#050505] relative flex flex-col p-8 md:p-16 justify-between">
            
            {/* Header - Updated to Serif & Center */}
            <div className="w-full mb-12 md:mb-20 text-center">
                <h2 className="teaser-header font-serif italic font-light text-2xl md:text-5xl uppercase leading-tight text-[#050505] tracking-wide">
                    <SplitText wordClass="split-word inline-block mr-2 md:mr-3">A REASON TILL OUR REALITIES</SplitText>
                    <span className="text-[#dc2626] inline-block">
                        <SplitText wordClass="split-word inline-block">&lt;OVERLAPS&gt;</SplitText>
                    </span>
                </h2>
            </div>

            {/* Teaser Area */}
            <div className="flex-1 flex items-center justify-center w-full relative">
                {/* 
                    The Interactive Frame 
                    Initial: Red fill, centered, fixed max-width.
                    Expanded: Full width, video visible.
                */}
                <div 
                    ref={teaserRef}
                    className="relative bg-[#dc2626] border border-[#dc2626] cursor-pointer overflow-hidden w-full max-w-2xl aspect-video flex items-center justify-center"
                    onClick={handleClick}
                    style={{ willChange: 'width, max-width, clip-path' }}
                >
                    {/* Text Container */}
                    <div ref={textRef} className="teaser-text text-center z-10 text-white font-mono uppercase tracking-widest p-4 select-none">
                        <p className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                            <SplitText charClass="split-char inline-block">CLICK HERE</SplitText>
                        </p>
                        <p className="text-sm md:text-base opacity-90 font-medium">
                            <SplitText charClass="split-char inline-block">[The Crunch-rift Teaser]</SplitText>
                        </p>
                    </div>

                    {/* Hidden Video */}
                    <video
                        ref={videoRef}
                        src={VIDEO_SRC}
                        className="absolute inset-0 w-full h-full object-cover hidden"
                        playsInline
                        controls // Native controls on hover
                    />
                </div>
            </div>
            
            {/* Bottom spacer to balance layout if needed */}
            <div className="hidden md:block h-12" />
        </div>
    </section>
  );
};

export default TeaserSection;