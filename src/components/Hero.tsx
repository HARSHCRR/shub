'use client';

import { useEffect, useRef, useState } from 'react';
import { DitheringShader } from '@/components/ui/dithering-shader';

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  useEffect(() => {
    if (!headingRef.current) return;
    
    // Trigger animation on mount
    setTimeout(() => {
      headingRef.current?.classList.add('hero-visible');
    }, 200);

    // Set responsive dimensions for sphere
    const updateDimensions = () => {
      const size = Math.min(window.innerWidth * 0.4, window.innerHeight * 0.5, 600);
      setDimensions({ width: size, height: size });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background flex items-end pb-8 px-[4vw]">
      {/* 21st.dev Sphere — Solid Black, Centered */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <DitheringShader 
          width={dimensions.width}
          height={dimensions.height}
          shape="sphere"
          type="random"
          colorBack="transparent"
          colorFront="#000000"
          pxSize={2}
          speed={1.5}
        />
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
