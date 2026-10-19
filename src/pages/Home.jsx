import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import { experiences } from '../data/experiences';
import ResponsiveImage from '../components/ui/ResponsiveImage';

export default function Home() {
  return (
    <>
      <section className="home-hero relative isolate h-[100svh] overflow-hidden">
        <ResponsiveImage
          src="/Images/hotel-exterior/Home.png"
          width={1622}
          height={970}
          sizes="100vw"
          alt="Exterior of New Brookfields Hotel"
          className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="home-hero__veil absolute inset-0" />

        <div className="section-shell relative z-10 flex h-full items-end pb-20 pt-24 md:pb-24">
          <div className="max-w-4xl text-white">
            <p className="mb-5 flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.32em] text-white/85 md:text-[11px]">
              <span className="h-px w-10 bg-gold" />
              New Brookfields Hotel · Freetown
            </p>
            <h1 className="max-w-5xl text-5xl leading-[1.08] md:text-6xl lg:text-[4rem]">A Refined Stay in the Heart of Freetown.</h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              A warm welcome, considered comfort, and a relaxed base for business, family time, and city discoveries.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link to="/contact#reservation" className="btn-primary hero-booking">
                Plan your stay
              </Link>
              <Link to="/experiences" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/90 transition-colors hover:text-[#d8c49e] md:text-[11px]">
                Discover experiences <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/75">
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em]">
            <span>Explore</span>
            <ArrowDown size={16} />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-olive">Welcome to New Brookfields</p>
            <h2 className="mt-5 max-w-xl text-5xl md:text-[4rem] text-charcoal">Contemporary Comfort. Timeless Hospitality.</h2>
          </div>
          <div className="space-y-5 text-lg text-charcoal/80">
            <p>
              New Brookfields Hotel offers a welcoming starting point for getting to know Freetown. Expect a considered atmosphere, contemporary style, and the warmth of Sierra Leonean hospitality.
            </p>
            <p>
              From your first enquiry to the end of your stay, we want the details to feel straightforward: helpful guidance before arrival, a comfortable place to return to, and a team ready to help you make the most of your time in the city.
            </p>
          </div>
        </div>

        <div className="section-shell mt-14 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="overflow-hidden shadow-soft">
            <ResponsiveImage src="/Images/Accommodation/Accommodation7.jpg" width={4911} height={3253} sizes="(min-width: 1024px) 60vw, 100vw" alt="A calm, contemporary guest room" loading="lazy" className="h-[540px] w-full object-cover transition-transform duration-500 hover:scale-[1.02]" />
          </div>
          <div className="flex flex-col gap-4 text-charcoal/80">
            <div className="flex items-center gap-3 text-olive">
              <MapPin size={18} />
              <span className="text-[11px] uppercase tracking-[0.22em]">Brookfields, Freetown</span>
            </div>
            <p className="max-w-md text-2xl text-charcoal md:text-3xl">
              Settle in, find your rhythm, and feel at home in the heart of Freetown.
            </p>
            <Link to="/contact#reservation" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-olive">
              Start a reservation enquiry <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#efebe4] py-20 md:py-28">
        <div className="section-shell">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Featured accommodation</p>
              <h2 className="mt-4 max-w-lg text-5xl text-charcoal md:text-[4rem]">Stay in spaces designed for ease.</h2>
            </div>
            <Link to="/accommodation" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-charcoal">
              View all rooms <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {rooms.slice(0, 2).map((room) => (
              <article key={room.id} className="group overflow-hidden bg-ivory shadow-soft">
                <div className="overflow-hidden">
                  <ResponsiveImage src={room.image} width={room.width} height={room.height} sizes="(min-width: 1024px) 50vw, 100vw" alt={`${room.name} at New Brookfields Hotel`} loading="lazy" className="h-[360px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="space-y-6 p-7 md:p-9">
                  <div>
                    <p className="eyebrow">Stay</p>
                    <h3 className="mt-3 text-4xl text-charcoal md:text-5xl">{room.name}</h3>
                  </div>
                  <p className="max-w-lg text-base text-charcoal/75">{room.description}</p>
                  <Link to="/accommodation" className="btn-secondary inline-flex">
                    Explore room
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow">The hotel experience</p>
            <h2 className="mt-4 text-5xl text-charcoal md:text-[4rem]">Moments that feel effortless and memorable.</h2>
          </div>

          <div className="overflow-hidden">
            <ResponsiveImage
              src="/Images/Experiences/Experience4.jpg"
              width={3500}
              height={2333}
              sizes="100vw"
              alt="A welcoming hotel space for guests to enjoy"
              loading="lazy"
              className="h-[500px] w-full object-cover md:h-[620px]"
            />
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {experiences.map((experience) => (
              <article key={experience.id} className="group border-t border-charcoal/15 pt-6">
                <ResponsiveImage src={experience.image} width={experience.width} height={experience.height} sizes="(min-width: 768px) 33vw, 100vw" alt={`${experience.title} at New Brookfields Hotel`} loading="lazy" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="mt-6">
                  <p className="eyebrow">{experience.title}</p>
                  <h3 className="mt-3 text-4xl text-charcoal">{experience.title}</h3>
                  <p className="mt-3 text-charcoal/75">{experience.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2f352f] py-20 text-white md:py-28">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-[#d9d0bf]">Your stay begins here</p>
            <h2 className="mt-5 max-w-md text-5xl text-white md:text-[4.5rem]">Your Stay Begins Here.</h2>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Link to="/contact#reservation" className="btn-primary border-white bg-white text-charcoal hover:bg-[#efe9df] hover:text-charcoal">
              Enquire about a stay
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
