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

    const img = nawfRef.current?.querySelector('img');
    if (img) {
      gsap.to(img, {
        y: -5,
        scale: 1.1,
        filter: 'drop-shadow(0 0 15px rgba(234, 88, 12, 0.6))',
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

    const img = nawfRef.current?.querySelector('img');
    if (img) {
      gsap.to(img, {
        y: 0,
        scale: 1,
        filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.5))',
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
          className="relative z-20 cursor-pointer select-none w-20 sm:w-24 md:w-32 lg:w-40"
          onMouseEnter={handleNawfEnter}
          onMouseLeave={handleNawfLeave}
          style={{ opacity: 0 }}
        >
          <img 
            src="https://ik.imagekit.io/vujf7cl5h/pitch%20folder/images/logo/logomark%20png@300x.png" 
            alt="NAWF Logomark" 
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.5))' }}
          />
        </div>

      </div>
    </section>
  );
};

export default VennSection;