import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TextBlockProps {
  headline: string;
  subtext: string;
  alignment: 'left' | 'right';
}

const TextBlock: React.FC<TextBlockProps> = ({ headline, subtext, alignment }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const headlineEl = headlineRef.current;
    const subtextEl = subtextRef.current;
    if (!headlineEl || !subtextEl) return;

    const words = headlineEl.querySelectorAll('.word-reveal');

    gsap.fromTo(words,
      {
        y: 60,
        opacity: 0,
        filter: "blur(10px)"
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineEl,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(subtextEl,
      { y: 30, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: subtextEl,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: blockRef });

  const wrapWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span
        key={i}
        className="word-reveal inline-block will-change-transform"
        style={{ marginRight: '0.25em' }}
      >
        {word}
      </span>
    ));
  };

  const isLeft = alignment === 'left';

  return (
    <div
      ref={blockRef}
      className={`flex flex-col gap-8 md:gap-12 ${isLeft ? '' : 'md:items-end'}`}
    >
      <h2
        ref={headlineRef}
        className={`font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase leading-[0.95] tracking-tighter text-white max-w-6xl ${isLeft ? 'text-left' : 'md:text-right'}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {wrapWords(headline)}
      </h2>

      <p
        ref={subtextRef}
        className={`text-xl md:text-2xl lg:text-3xl text-neutral-400 leading-relaxed max-w-xl ${isLeft ? 'self-end md:mr-12' : 'self-start md:ml-12'}`}
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
      >
        {subtext}
      </p>
    </div>
  );
};

const TextRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-center py-32 md:py-40 lg:py-56 px-6 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="flex flex-col gap-40 md:gap-64 max-w-[1400px] mx-auto w-full">

        <TextBlock
          headline="IF YOU'RE ASKING WHAT'S SPECIAL ABOUT THESE, THE ANSWER IS YES AND NO."
          subtext="The reality within these content pieces must shape their perception."
          alignment="left"
        />

        <TextBlock
          headline="IF YOU THOUGHT EVERYTHING'S SHOWN ABOVE WAS REAL... THINK AGAIN!"
          subtext="Of course, except for Farmley."
          alignment="right"
        />

      </div>
    </section>
  );
};

export default TextRevealSection;