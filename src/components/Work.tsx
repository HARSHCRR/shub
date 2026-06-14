'use client';

import FadeUp from './FadeUp';

const projects = [
  { title: 'Project Alpha', category: 'Brand Identity', img: '/work/alpha.webp' },
  { title: 'Project Beta',  category: 'Web Design',    img: '/work/beta.webp'  },
  { title: 'Project Gamma', category: 'Motion',        img: '/work/gamma.webp' },
  { title: 'Project Delta', category: 'Development',   img: '/work/delta.webp' },
];

export default function Work() {
  return (
    <section className="px-[4vw] py-24 bg-background">
      {/* Section header */}
      <FadeUp className="mb-16">
        <h2 className="text-section font-medium text-foreground max-w-3xl">
          We are a{' '}
          <span className="text-highlight">diligent</span>{' '}
          team that crafts digital experiences.
        </h2>
      </FadeUp>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {projects.map((project, i) => (
          <FadeUp key={project.title} delay={i * 0.1}>
            <a href="#" className="group block">
              {/* Image wrapper — overflow-hidden required for scale containment */}
              <div className="relative overflow-hidden rounded-card aspect-[16/10] bg-darkCard">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-quart-out group-hover:scale-105"
                />
                {/* Hover overlay meta */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  {/* Arrow — translates in on hover */}
                  <span className="text-white text-lg -translate-x-4 opacity-0 transition-all duration-300 ease-quart-out group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                  <h3 className="text-white font-medium text-xl">{project.title}</h3>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-eyebrow text-highlight uppercase tracking-widest">
                  {project.category}
                </span>
              </div>
            </a>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
