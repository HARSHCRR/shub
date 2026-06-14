import Nav      from '@/components/Nav';
import Hero     from '@/components/Hero';
import Work     from '@/components/Work';
import Services from '@/components/Services';
import CTA      from '@/components/CTA';
import Footer   from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Work />
      <Services />
      <CTA />
      <Footer />
    </main>
  );
}
