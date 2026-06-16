import FadeUp from './FadeUp';

export default function CTA() {
  return (
    <section className="relative h-[80vh] overflow-hidden bg-background flex items-center px-[4vw]">
      {/* 3D Chair Placeholder — Replace with Spline scene when available */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[15vw] text-foreground">✦</span>
        </div>
      </div>

      <FadeUp className="relative z-10 max-w-2xl">
        <span className="text-eyebrow text-muted uppercase tracking-widest">Let's Talk</span>
        <h2 className="text-section font-medium text-foreground mt-2 mb-6">
          Ready to build something great?
        </h2>
        <a
          href="#"
          className="inline-block bg-foreground text-primary-foreground text-body px-8 py-4 rounded-full hover:opacity-80 transition-opacity duration-200"
        >
          Book a Call
        </a>
      </FadeUp>
    </section>
  );
}
