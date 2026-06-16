'use client';

import { useEffect, useRef, useState } from 'react';
import { DitheringShader } from '@/components/ui/dithering-shader';

export default function ThemeAwareHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const containerRef = useRef<HTMLElement>(null);
  const [sphereColor, setSphereColor] = useState('#000000');

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

  // Get sphere color from CSS variable based on theme
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSphereColor = () => {
      const color = getComputedStyle(containerRef.current!).getPropertyValue('--sphere-color').trim();
      if (color) {
        setSphereColor(color);
      }
    };

    updateSphereColor();
    
    // Use MutationObserver to detect theme changes
    const observer = new MutationObserver(updateSphereColor);
    
    // Observe the closest theme container
    let themeContainer = containerRef.current.closest('.theme-light, .theme-dark');
    if (!themeContainer) themeContainer = containerRef.current.parentElement;
    
    if (themeContainer) {
      observer.observe(themeContainer, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: false,
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background flex items-end pb-8 px-[4vw]"
    >
      {/* 21st.dev Sphere — Color adapts to theme */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <DitheringShader 
          key={`sphere-${sphereColor}`}
          width={dimensions.width}
          height={dimensions.height}
          shape="sphere"
          type="random"
          colorBack="transparent"
          colorFront={sphereColor}
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
      <span className="absolute bottom-8 right-[4vw] text-eyebrow text-muted uppercase tracking-widest z-10">
        Scroll
      </span>
    </section>
  );
}
