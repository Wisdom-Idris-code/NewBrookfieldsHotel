import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { hotel, navItems } from '../../data/hotel';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return;
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) {
      window.addEventListener('keydown', closeOnEscape);
    }
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

  const hasImageHero = location.pathname === '/' || location.pathname === '/contact';
  const navClass = isScrolled || !hasImageHero
    ? 'bg-ivory text-charcoal shadow-soft border-b border-[#e3ddd0]'
    : 'bg-transparent text-white border-transparent';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${navClass}`}>
      <div className="section-shell flex h-24 items-center justify-between gap-6">
        <div className="flex items-end gap-3">
          <div className="text-left leading-none">
            <p className="font-serif text-lg leading-none tracking-[0.04em] md:text-xl">New Brookfields</p>
              <span className="mt-1 block font-sans text-[8px] uppercase tracking-[0.35em] opacity-80">Hotel · Freetown</span>
          </div>
        </div>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform after:duration-200 ${
                  isActive ? 'opacity-100 after:scale-x-100' : 'opacity-75 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          {hotel.bookingUrl ? (
            <a href={hotel.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary text-[10px]">
              Reserve Your Stay
            </a>
          ) : (
            <Link to="/contact#reservation" className="btn-primary text-[10px]">
              Plan Your Stay
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="inline-flex items-center justify-center rounded-full border border-current p-2 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-[#1a1d19]/80 transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-[86vw] max-w-sm bg-ivory p-6 pt-10 text-charcoal transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.35em]">New Brookfields</p>
              <span className="mt-1 block font-sans text-[8px] uppercase tracking-[0.25em] text-olive">Hotel</span>
            </div>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium text-charcoal ${isActive ? 'opacity-100' : 'opacity-80'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {hotel.bookingUrl ? (
            <a href={hotel.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary mt-10 w-full">
              Reserve Your Stay <ArrowRight size={14} className="ml-2" />
            </a>
          ) : (
            <Link to="/contact#reservation" onClick={() => setMobileOpen(false)} className="btn-primary mt-10 w-full">
              Plan Your Stay <ArrowRight size={14} className="ml-2" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2a2f28] px-4 py-16 text-[#f5f2eb] md:px-8">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#d7d2c7]">New Brookfields Hotel</p>
            <h3 className="mt-5 max-w-xs font-serif text-5xl text-white">An elevated stay in Freetown.</h3>
          </div>
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-[#d7d2c7]">Navigation</p>
            <ul className="space-y-3 text-sm text-[#f0ece3]">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-[#d7d2c7]">Contact</p>
            <ul className="space-y-3 text-sm text-[#f0ece3]">
              <li>{hotel.address}</li>
              <li><a href={`tel:${hotel.phone.replace(/[^\d+]/g, '')}`}>{hotel.phone}</a></li>
              <li><a href={`mailto:${hotel.email}`}>{hotel.email}</a></li>
            </ul>
            <p className="mt-3 text-xs text-[#d7d2c7]">Fictional sample contact details for this website preview.</p>
          </div>
          <div className="md:text-left">
            <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-[#d7d2c7]">Reservation</p>
            {hotel.bookingUrl ? (
              <a href={hotel.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary w-full md:w-auto">
                Reserve now
              </a>
            ) : (
              <Link to="/contact#reservation" className="btn-primary w-full md:w-auto">
                Plan your stay
              </Link>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#d7d2c7] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} New Brookfields Hotel.</p>
          <p>Website concept by Wisdom Designs.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const pageMetadata = {
      '/': {
        title: 'New Brookfields Hotel | A Welcoming Stay in Freetown',
        description: 'Discover a welcoming city stay in Brookfields, Freetown, with considered accommodation and thoughtful hotel experiences.',
      },
      '/accommodation': {
        title: 'Accommodation | New Brookfields Hotel',
        description: 'Explore room styles at New Brookfields Hotel in Brookfields, Freetown, and enquire about availability for your dates.',
      },
      '/experiences': {
        title: 'Experiences | New Brookfields Hotel',
        description: 'Discover dining, time to unwind, and event possibilities at New Brookfields Hotel in Freetown.',
      },
      '/contact': {
        title: 'Reservations & Contact | New Brookfields Hotel',
        description: 'Plan a visit to New Brookfields Hotel in Brookfields, Freetown, and prepare a reservation enquiry.',
      },
    };
    const metadata = pageMetadata[location.pathname] ?? pageMetadata['/'];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Header />
      <main className={location.pathname === '/' || location.pathname === '/contact' ? '-mt-24' : ''}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
