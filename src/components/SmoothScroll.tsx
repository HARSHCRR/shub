'use client';

import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // Using CSS scroll-behavior smooth as fallback
  return <>{children}</>;
}
