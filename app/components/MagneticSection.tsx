'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface MagneticSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticSection({
  children,
  className = '',
}: MagneticSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'center center',
        end: '+=400', // How long it stays locked (in pixels)
        pin: true,
        pinSpacing: true, // Adds space so it doesn't overlap next content
        // Optional: Add snap if we want it to really pull the user in
        // snap: {
        //   snapTo: 1, // Snap to the end (pinned state) ?
        //   duration: 0.5,
        //   ease: "power1.inOut"
        // }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {children}
    </div>
  );
}
