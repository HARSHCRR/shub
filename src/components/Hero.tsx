'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    
    // Trigger animation on mount
    setTimeout(() => {
      headingRef.current?.classList.add('hero-visible');
    }, 200);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background flex items-end pb-8 px-[4vw]">
      {/* 3D Robot Placeholder — Replace with Spline scene when available */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[20vw] text-foreground">✦</span>
        </div>
      </div>

      {/* Hero Text */}
      <h1
        ref={headingRef}
        className="hero-heading relative z-10 text-[20vw] leading-[0.85] tracking-[-0.04em] font-medium text-foreground select-none"
      >
        sohub
      </h1>

      {/* Scroll hint */}
      <span className="absolute bottom-8 right-[4vw] text-eyebrow text-highlight uppercase tracking-widest z-10">
        Scroll
      </span>
    </section>
  );
}
