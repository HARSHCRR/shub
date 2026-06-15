'use client';

import { ThemeComparison } from '@/components/ui/theme-comparison';
import PageContent from '@/components/PageContent';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeComparison>
        <PageContent />
      </ThemeComparison>
    </main>
  );
}
