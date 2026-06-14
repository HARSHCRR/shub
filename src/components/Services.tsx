import FadeUp from './FadeUp';

const services = [
  {
    title: 'Brand Identities',
    tags: ['Logo', 'Typography', 'Color Palette', 'Brand Guidelines'],
    description: 'Our team will assist you in building a brand that resonates with your audience and stands the test of time.',
    offset: 'calc(10vh + 0px)',
  },
  {
    title: 'Web Design',
    tags: ['UI/UX', 'Prototyping', 'Motion Design', 'Design Systems'],
    description: 'We design digital experiences that are intuitive, beautiful, and conversion-focused.',
    offset: 'calc(10vh + 20px)',
  },
  {
    title: 'Development',
    tags: ['React', 'Next.js', 'GSAP', 'Three.js'],
    description: 'We build fast, accessible, and highly animated web products that perform.',
    offset: 'calc(10vh + 40px)',
  },
  {
    title: 'Motion & 3D',
    tags: ['GSAP', 'Spline', 'WebGL', 'Lottie'],
    description: 'We bring interfaces to life with purposeful motion and spatial 3D elements.',
    offset: 'calc(10vh + 60px)',
  },
];

export default function Services() {
  return (
    <section className="relative bg-background px-[4vw] pt-24 pb-[40vh]">
      <FadeUp className="mb-16">
        <span className="text-eyebrow text-highlight uppercase tracking-widest">What we do</span>
        <h2 className="text-section font-medium text-foreground mt-2">Services</h2>
      </FadeUp>

      {/* Stacking cards container */}
      <div className="relative">
        {services.map((service, i) => (
          <article
            key={service.title}
            style={{ top: service.offset }}
            className="sticky w-full min-h-[50vh] bg-darkCard text-white rounded-card p-8 md:p-12 mb-4 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-card font-medium">{service.title}</h3>
              {/* Continuously rotating asterisk */}
              <span
                className="text-4xl text-highlight animate-spin-slow"
              >
                ✳
              </span>
            </div>

            <div className="mt-auto">
              <p className="text-body text-white/60 max-w-lg mb-6">{service.description}</p>
              <ul className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-eyebrow border border-white/20 rounded-full px-4 py-1.5 text-white/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
