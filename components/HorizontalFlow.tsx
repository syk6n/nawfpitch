import React, { useRef } from "react";
import { EyeIcon, WaveIcon, ArrowIcon, GeometricShape } from "./Visuals";
import { SplitText } from "./SplitText";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalFlow: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;

    if (!track || !wrapper) return;

    // 1. Calculate Scroll Distance
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const wrapperWidth = wrapper.clientWidth;
      return -(trackWidth - wrapperWidth);
    };

    // 2. Create the Horizontal Scroll Tween
    const scrollTween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        end: () => `+=${track.scrollWidth}`,
        invalidateOnRefresh: true,
      }
    });

    // 3. Section 1: Character Animation (SplitText)
    const textBlocks = gsap.utils.toArray<HTMLElement>('.anim-text-block', wrapper);
    textBlocks.forEach((block) => {
      const chars = block.querySelectorAll('.split-char');
      gsap.from(chars, {
        y: 130,
        opacity: 0,
        scale: 0.5,
        duration: 1,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          containerAnimation: scrollTween,
          start: "left 90%",
          end: "left 50%",
          scrub: true,
          id: "text-reveal"
        }
      });
    });

    // 4. Parallax/Rotation for Visuals (Section 1)
    const svgs = gsap.utils.toArray<HTMLElement>('.anim-svg', wrapper);
    svgs.forEach((svg) => {
      gsap.to(svg, {
        rotation: 360,
        scale: 1.2,
        scrollTrigger: {
          trigger: svg,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "right 0%",
          scrub: 1
        }
      });
    });

    // 5. Section 1 Exit: Drift out of focus
    const section1Elements = gsap.utils.toArray<HTMLElement>('.anim-text-block, .anim-svg, .section-1-attribution', wrapper);
    section1Elements.forEach((el) => {
      gsap.to(el, {
        opacity: 0,
        filter: "blur(12px)",
        scale: 0.95,
        scrollTrigger: {
          trigger: el,
          containerAnimation: scrollTween,
          start: "right 40%",
          end: "right 10%",
          scrub: true
        }
      });
    });

    // 6. Transition Paragraph: Simple Reveal (Replaces Matrix)
    const finalContent = wrapper.querySelector('.anim-final-content');
    if (finalContent) {
       gsap.from(finalContent.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
             trigger: finalContent,
             containerAnimation: scrollTween,
             start: "left 75%",
             end: "left 45%",
             scrub: 1
          }
       });
    }

    // Recalculate once fonts are loaded
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

  }, { scope: wrapperRef });

  // Typography styles
  const textBase = "text-[7vh] md:text-[18vh] leading-none whitespace-nowrap transition-colors duration-300 select-none";
  const fontSerif = "font-serif italic";
  const fontSans = "font-sans font-extrabold tracking-tighter";
  
  return (
    <div ref={wrapperRef} className="relative w-full h-screen overflow-hidden bg-[#050505] flex items-center">
      
      {/* The Track */}
      <div 
        ref={trackRef} 
        className="flex flex-nowrap items-center h-full pl-[5vw] pr-[5vw] md:pl-[10vw] md:pr-[10vw] gap-[3vw] md:gap-[4vw] will-change-transform perspective-1000"
      >
        
        {/* --- SECTION 1: KEANU QUOTE --- */}

        <span className={`${textBase} ${fontSans} text-white anim-text-block`}>
          <SplitText>Reality</SplitText>
        </span>

        <EyeIcon className="w-[7vh] h-[7vh] md:w-[12vh] md:h-[12vh] anim-svg" />

        <span className={`${textBase} ${fontSerif} text-white/90 anim-text-block`}>
          <SplitText>is perception.</SplitText>
        </span>

        <div className="w-[10vh] md:w-[15vh] h-[2px] bg-white/20 mx-2 self-center anim-svg"></div>
        <WaveIcon className="w-[10vh] h-[5vh] md:w-[15vh] md:h-[8vh] anim-svg" />

        <span className={`${textBase} ${fontSerif} text-white anim-text-block`}>
          <SplitText>If your</SplitText>
        </span>

        <span 
          className={`${textBase} ${fontSans} anim-text-block`} 
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)', color: 'transparent' }}
        >
          <SplitText>perception</SplitText>
        </span>

        <ArrowIcon className="w-[8vh] h-[8vh] md:w-[12vh] md:h-[12vh] text-lime-400 anim-svg" />

        <span className={`${textBase} ${fontSans} italic text-white/80 anim-text-block`}>
          <SplitText>changes,</SplitText>
        </span>

        <GeometricShape className="w-[6vh] h-[6vh] md:w-[10vh] md:h-[10vh] anim-svg" />

        <span className={`${textBase} ${fontSerif} text-orange-500 anim-text-block`}>
          <SplitText>your reality</SplitText>
        </span>

        <span className={`${textBase} ${fontSans} text-white anim-text-block`}>
          <SplitText>changes.</SplitText>
        </span>

        <div className="section-1-attribution flex flex-col justify-end h-[30%] md:h-[40%] pb-4 opacity-60 ml-4 md:ml-8">
           <span className="font-mono text-xs md:text-xl tracking-widest uppercase border-t pt-2 md:pt-4 border-white/30 whitespace-nowrap">
            &mdash; Keanu Reeves
          </span>
        </div>

        {/* --- SPACER --- */}
        <div className="shrink-0 w-[10vw] md:w-[20vw]" />

        {/* --- SECTION 2 TRANSITION: NORMAL TEXT --- */}
        <div className="shrink-0 w-[100vw] h-[80vh] flex items-center justify-center relative">
           
           {/* Text Container */}
           <div className="flex flex-col max-w-[90vw] md:max-w-[50vw] space-y-4 md:space-y-6 text-center z-10 p-4 anim-final-content">
              <p className="font-serif italic text-lg md:text-4xl text-white/60">
                So, it&rsquo;s safe to believe that...
              </p>
              <p className="font-sans font-bold text-2xl md:text-6xl leading-[1.2] md:leading-[1.1] text-white">
                OUR REALITY IS CORRELATED TO OUR PERCEPTION.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default HorizontalFlow;