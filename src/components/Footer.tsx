export default function Footer() {
  const footerLinks = ['Studio', 'Work', 'Contact'];
  const socialLinks = ['Twitter', 'Instagram', 'LinkedIn', 'Dribbble'];

  return (
    <footer className="relative h-screen bg-background overflow-hidden flex flex-col justify-end items-center pb-8">
      {/* 3D Battery Placeholder — Replace with Spline scene when available */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[15vw] text-foreground">✦</span>
        </div>
      </div>

      {/* Large background wordmark — sits BEHIND 3D object */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] flex items-end justify-center overflow-hidden pointer-events-none">
        <span className="text-[18vw] font-medium text-foreground leading-none tracking-[-0.04em] opacity-10 select-none">
          sohub
        </span>
      </div>

      {/* Floating bottom pill nav */}
      <div className="relative z-10 bg-darkCard rounded-full flex items-center gap-1 p-1.5 mb-4">
        {footerLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-foreground text-eyebrow uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-muted/20 transition-colors duration-200"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Social links */}
      <div className="relative z-10 flex gap-6 mt-2">
        {socialLinks.map((s) => (
          <a key={s} href="#" className="text-eyebrow text-muted hover:text-foreground transition-colors duration-200">
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
