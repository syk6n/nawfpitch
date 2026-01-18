import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VennSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const realityCircleRef = useRef<HTMLDivElement>(null);
  const aiCircleRef = useRef<HTMLDivElement>(null);
  const nawfRef = useRef<HTMLDivElement>(null);
  const flowLinesRef = useRef<SVGSVGElement>(null);
  const realityLabelRef = useRef<HTMLSpanElement>(null);
  const aiLabelRef = useRef<HTMLSpanElement>(null);
  const dottedPathLeftRef = useRef<SVGPathElement>(null);
  const dottedPathRightRef = useRef<SVGPathElement>(null);

  const [hoveredElement, setHoveredElement] = useState<'nawf' | 'reality' | 'ai' | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
      }
    });

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' },
      0
    );

    tl.fromTo(headingLineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: 'power2.out' },
      0.2
    );

    tl.fromTo(realityCircleRef.current,
      { opacity: 0, x: -150, scale: 0.6 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0.3
    );

    tl.fromTo(aiCircleRef.current,
      { opacity: 0, x: 150, scale: 0.6 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0.3
    );

    tl.fromTo(flowLinesRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
      0.5
    );

    if (dottedPathLeftRef.current) {
      const pathLength = dottedPathLeftRef.current.getTotalLength();
      gsap.set(dottedPathLeftRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      tl.to(dottedPathLeftRef.current, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 0.5);
    }

    if (dottedPathRightRef.current) {
      const pathLength = dottedPathRightRef.current.getTotalLength();
      gsap.set(dottedPathRightRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      tl.to(dottedPathRightRef.current, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 0.5);
    }

    tl.fromTo(nawfRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
      0.6
    );

    tl.fromTo([realityLabelRef.current, aiLabelRef.current],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
      0.65
    );

  }, { scope: containerRef });

  const handleNawfEnter = useCallback(() => {
    setHoveredElement('nawf');

    gsap.to([dottedPathLeftRef.current, dottedPathRightRef.current], {
      stroke: '#ffffff',
      strokeWidth: 2.5,
      duration: 0.3,
      ease: 'power2.out'
    });

    const paths = nawfRef.current?.querySelectorAll('.nawf-svg-path');
    if (paths) {
      gsap.to(paths, {
        fill: '#ea580c', // Orange
        y: -5,
        stagger: 0.03,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, []);

  const handleNawfLeave = useCallback(() => {
    setHoveredElement(null);

    gsap.to([dottedPathLeftRef.current, dottedPathRightRef.current], {
      stroke: '#ffffff',
      strokeWidth: 1.5,
      duration: 0.3,
      ease: 'power2.out'
    });

    const paths = nawfRef.current?.querySelectorAll('.nawf-svg-path');
    if (paths) {
      gsap.to(paths, {
        fill: '#ffffff', // White
        y: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, []);

  const handleCircleEnter = useCallback((side: 'reality' | 'ai') => {
    setHoveredElement(side);

    const targetCircle = side === 'reality' ? realityCircleRef.current : aiCircleRef.current;
    const otherCircle = side === 'reality' ? aiCircleRef.current : realityCircleRef.current;
    const targetPath = side === 'reality' ? dottedPathLeftRef.current : dottedPathRightRef.current;

    gsap.to(targetCircle, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(otherCircle, {
      opacity: 0.4,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(targetPath, {
      strokeWidth: 3,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, []);

  const handleCircleLeave = useCallback(() => {
    setHoveredElement(null);

    gsap.to([realityCircleRef.current, aiCircleRef.current], {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to([dottedPathLeftRef.current, dottedPathRightRef.current], {
      strokeWidth: 1.5,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center pt-24 md:pt-32 pb-0"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 mb-20 md:mb-28 text-center px-4">
        <div className="relative inline-block">
          <h2
            ref={headingRef}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.15em] md:tracking-[0.2em]"
            style={{
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 0 60px rgba(234, 88, 12, 0.4), 0 0 120px rgba(234, 88, 12, 0.2)',
              opacity: 0
            }}
          >
            BUILT WITH <span className="text-orange-500">AI</span>
          </h2>
          <div
            ref={headingLineRef}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            style={{ width: '120%', transformOrigin: 'center', transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 flex items-center justify-center" style={{ height: '60vh', minHeight: '500px' }}>

        <svg
          ref={flowLinesRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid meet"
          style={{ opacity: 0 }}
        >
          <defs>
            <linearGradient id="flowGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="flowGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <path
            ref={dottedPathLeftRef}
            d="M 120 180 C 200 120 280 260 400 200"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="8 8"
          />
          <path
            ref={dottedPathRightRef}
            d="M 680 180 C 600 260 520 120 400 200"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="8 8"
          />

          <circle cx="120" cy="180" r="6" fill="#dc2626" />
          <circle cx="680" cy="180" r="6" fill="#0891b2" />
          <circle cx="400" cy="200" r="8" fill="#ea580c" className="animate-pulse" />
        </svg>

        <div
          ref={realityCircleRef}
          className="absolute rounded-full cursor-pointer transition-colors duration-300"
          style={{
            width: 'min(48vw, 340px)',
            height: 'min(48vw, 340px)',
            left: '8%',
            background: 'radial-gradient(circle at 35% 35%, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.08) 50%, transparent 100%)',
            border: '1.5px solid rgba(220, 38, 38, 0.3)',
            boxShadow: '0 0 60px rgba(220, 38, 38, 0.15)',
            opacity: 0
          }}
          onMouseEnter={() => handleCircleEnter('reality')}
          onMouseLeave={handleCircleLeave}
        >
          <span
            ref={realityLabelRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-sm md:text-base uppercase tracking-[0.3em] text-red-400 font-medium"
            style={{ marginLeft: '-25%', opacity: 0 }}
          >
            Reality
          </span>
        </div>

        <div
          ref={aiCircleRef}
          className="absolute rounded-full cursor-pointer transition-colors duration-300"
          style={{
            width: 'min(48vw, 340px)',
            height: 'min(48vw, 340px)',
            right: '8%',
            background: 'radial-gradient(circle at 65% 35%, rgba(8, 145, 178, 0.2) 0%, rgba(8, 145, 178, 0.08) 50%, transparent 100%)',
            border: '1.5px solid rgba(8, 145, 178, 0.3)',
            boxShadow: '0 0 60px rgba(8, 145, 178, 0.15)',
            opacity: 0
          }}
          onMouseEnter={() => handleCircleEnter('ai')}
          onMouseLeave={handleCircleLeave}
        >
          <span
            ref={aiLabelRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-sm md:text-base uppercase tracking-[0.3em] text-cyan-400 font-medium"
            style={{ marginLeft: '25%', opacity: 0 }}
          >
            AI
          </span>
        </div>

        <div
          ref={nawfRef}
          className="relative z-20 cursor-pointer select-none w-40 sm:w-56 md:w-72 lg:w-96"
          onMouseEnter={handleNawfEnter}
          onMouseLeave={handleNawfLeave}
          style={{ opacity: 0 }}
        >
          <svg 
            viewBox="0 0 864.6 296.5" 
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.5))' }}
          >
            <g>
              <path className="nawf-svg-path transition-colors duration-300" fill="#ffffff" d="M172.89,159.8v132.84h-52.17v-119.94c0-12.32-2.54-21.82-7.61-28.5-5.07-6.67-12.29-10.01-21.66-10.01-26.18,0-39.27,18.87-39.27,56.61v101.84H0V88.56h46.59l4.79,36.97h5.8c1.93-13.74,6.61-23.97,14.06-30.71,7.44-6.74,18.73-10.11,33.88-10.11,21.57,0,38.25,6.55,50.06,19.64,11.81,13.09,17.71,31.57,17.71,55.45Z"/>
              <path className="nawf-svg-path transition-colors duration-300" fill="#ffffff" d="M381.37,246.05v-75.47c0-26.96-8.99-47.46-26.96-61.52-17.97-14.05-45.43-21.33-82.4-21.85l-44.47-.57-3.86,47.36,52.18,1.35c18.36.51,32.18,3.3,41.49,8.37,9.31,5.07,13.96,13.06,13.96,23.97v.59c-4.3-.95-8.56-1.72-12.8-2.32-8.16-1.16-17.81-1.73-28.98-1.73-29.01,0-51.4,6.09-67.19,18.29-15.79,12.19-23.68,29.71-23.68,52.56,0,19.64,6.03,34.78,18.09,45.43,12.07,10.66,28.95,15.99,50.64,15.99,12.58,0,23.39-1.96,32.44-5.88,9.05-3.91,16.08-9.82,21.08-17.71,4.11-6.48,6.67-14.27,7.66-23.39h4.64l3.3,45.05,73.16-1.93v-42.35l-28.3-4.24ZM325.63,230.07c-3.79,6.55-9.47,11.94-17.04,16.17-7.57,4.24-17.01,6.36-28.3,6.36-9.37,0-16.49-1.83-21.37-5.49s-7.32-8.95-7.32-15.88c0-15.41,13.48-23.11,40.43-23.11,7.19,0,14.06.17,20.6.48,5.61.28,11.83,1.14,18.66,2.6-.23,6.46-2.11,12.75-5.66,18.87Z"/>
              <polygon className="nawf-svg-path transition-colors duration-300" fill="#ffffff" points="637.11 88.56 617.86 292.64 551.63 292.64 531.02 138.81 528.71 138.81 508.11 292.64 439.96 292.64 426.48 88.56 477.11 88.56 484.43 244.13 487.9 244.13 511.19 88.56 548.54 88.56 571.84 244.13 575.31 244.13 587.82 88.56 637.11 88.56"/>
              <path className="nawf-svg-path transition-colors duration-300" fill="#ffffff" d="M768.72,103.96v25.22h81.25v44.67h-81.25v118.79h-51.98v-118.79h-62v-44.67h62v-23.29c0-70.59,34.08-105.89,102.23-105.89,15.79,0,31,1.28,45.63,3.86l-5,48.32c-8.6-1.02-16.21-1.73-22.82-2.12-6.61-.38-12.93-.57-18.96-.57-32.73,0-49.1,18.16-49.1,54.48Z"/>
            </g>
          </svg>
        </div>

      </div>
    </section>
  );
};

export default VennSection;