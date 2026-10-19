import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experiences } from '../data/experiences';

export default function Experiences() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src="/Images/Experiences/Experience5.jpg" alt="A welcoming hotel experience in Freetown" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/20" />
        <div className="section-shell relative z-10 flex h-full items-end pb-14">
          <div className="max-w-2xl text-white">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/80">Experiences</p>
            <h1 className="mt-4 text-5xl md:text-7xl">Make More of Your Time in Freetown.</h1>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-shell space-y-16">
          {experiences.map((experience, index) => (
            <article key={experience.id} className={`grid gap-6 md:gap-10 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="overflow-hidden shadow-soft">
                <img src={experience.image} alt={`${experience.title} at New Brookfields Hotel`} loading="lazy" className="h-[420px] w-full object-cover" />
              </div>
              <div className="space-y-6">
                <p className="eyebrow">{experience.title}</p>
                <h2 className="text-5xl text-charcoal md:text-[4rem]">{experience.title}</h2>
                <p className="max-w-xl text-lg text-charcoal/75">{experience.description}</p>
                <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
                  {experience.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
