'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

export default function ScrollyTellingPurchase() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000', // Adds 3000px of scroll height
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Hide all initially
      const slides = slidesRef.current;
      gsap.set(slides, { opacity: 0, scale: 0.9, y: 20 });

      slides.forEach((slide, i) => {
        const startTime = i * 2;

        // Fade In
        tl.to(
          slide,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          },
          startTime
        );

        // Fade Out
        tl.to(
          slide,
          {
            opacity: 0,
            scale: 1.1,
            y: -20,
            duration: 1,
            ease: 'power2.in',
          },
          startTime + 1.2
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const phrases =
    language === 'KOR'
      ? [
          <>
            <span className="font-gothic font-normal">아카이브</span> 입장.
          </>,
          <>
            정체성 <span className="font-gothic font-normal">선택</span>.
          </>,
          <>
            욕망 <span className="font-gothic font-normal">확인</span>.
          </>,
          <>
            <span className="font-gothic font-normal">컬렉션</span>의 확장.
          </>,
        ]
      : [
          <>
            <span className="font-gothic font-normal">Enter</span> the archive.
          </>,
          <>
            Select <span className="font-gothic font-normal">identity</span>.
          </>,
          <>
            Confirm <span className="font-gothic font-normal">desire</span>.
          </>,
          <>
            <span className="font-gothic font-normal">Collection</span> grows.
          </>,
        ];

  return (
    <section
      ref={containerRef}
      className="pointer-events-none relative z-30 flex h-screen w-full flex-col overflow-hidden"
    >
      {phrases.map((content, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) slidesRef.current[i] = el;
          }}
          className="absolute bottom-32 left-1/2 flex max-w-lg -translate-x-1/2 flex-col items-center justify-end p-0 text-center md:bottom-12 md:left-20 md:translate-x-0 md:items-start md:text-left"
        >
          <div className="rounded-[32px] border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-sans text-2xl leading-tight font-bold tracking-tighter whitespace-nowrap text-[#171717] md:text-3xl">
              {content}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
}
