import Nav from '@/components/Nav';
import ThemeAwareHero from '@/components/ThemeAwareHero';
import Work from '@/components/Work';
import Services from '@/components/Services';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function PageContent() {
  return (
    <>
      <Nav />
      <ThemeAwareHero />
      <Work />
      <Services />
      <CTA />
      <Footer />
    </>
  );
}
