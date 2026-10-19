import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hotel } from '../data/hotel';
import { rooms } from '../data/rooms';
import ResponsiveImage from '../components/ui/ResponsiveImage';

export default function Accommodation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    if (!galleryOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setGalleryOpen(false);
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen]);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
  };

  const openGallery = (index) => {
    setActiveIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <ResponsiveImage src="/Images/Accommodation/Accommodation4.jpg" width={3024} height={4032} sizes="100vw" alt="A thoughtfully designed guest room" loading="eager" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />
        <div className="section-shell relative z-10 flex h-full items-end pb-14">
          <div className="max-w-2xl text-white">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/80">Accommodation</p>
            <h1 className="mt-4 text-5xl md:text-7xl">A Comfortable Place to Call Your Own.</h1>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-shell max-w-5xl">
          <p className="eyebrow">Find your room</p>
          <h2 className="mt-4 max-w-2xl text-5xl text-charcoal md:text-[4rem]">Room to rest, recharge, and feel at home.</h2>
          <p className="mt-6 max-w-3xl text-lg text-charcoal/75">
          Whether you are visiting for work, travelling with family, or taking time to explore the city, choose the room style that best suits your plans. Send us your dates and preferences so we can confirm availability, room configuration, and amenities before you book.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell space-y-14">
          {rooms.map((room, index) => (
            <article key={room.id} className="grid gap-6 overflow-hidden bg-[#efebe4] shadow-soft lg:grid-cols-2 lg:items-center">
              <div className="overflow-hidden">
                <button type="button" onClick={() => openGallery(index)} aria-label={`Open image gallery for ${room.name}`} className="block w-full overflow-hidden">
                  <ResponsiveImage
                    src={room.image}
                    width={room.width}
                    height={room.height}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt={`${room.name} at New Brookfields Hotel`}
                    loading="lazy"
                    className="h-[420px] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </button>
              </div>
              <div className="space-y-6 p-7 md:p-10">
                <div>
                  <p className="eyebrow">{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
                  <h3 className="mt-3 text-5xl text-charcoal">{room.name}</h3>
                </div>
                <p className="text-base text-charcoal/75">{room.description}</p>
                <p className="text-sm text-charcoal/65">Room layouts and amenities may vary. Please confirm the details available for your dates.</p>
                <div className="flex flex-wrap items-center gap-4">
                  <button type="button" onClick={() => openGallery(index)} className="btn-secondary">
                    View room photos
                  </button>
                  {hotel.bookingUrl ? (
                    <a href={hotel.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">Reserve now</a>
                  ) : (
                    <Link to="/contact#reservation" className="btn-primary">Enquire about this room</Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {galleryOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4" onClick={() => setGalleryOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Room image gallery" className="relative w-full max-w-5xl bg-[#f5f3ed] p-3 shadow-soft" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Close gallery" className="absolute right-4 top-4 z-10 p-2 text-charcoal" onClick={() => setGalleryOpen(false)}>
              <X size={22} />
            </button>
            <div className="relative">
              <ResponsiveImage src={rooms[activeIndex].image} width={rooms[activeIndex].width} height={rooms[activeIndex].height} sizes="100vw" loading="eager" alt={`${rooms[activeIndex].name} at New Brookfields Hotel`} className="h-[60vh] w-full object-cover" />
              <div className="flex items-center justify-between bg-[#f5f3ed] p-5">
                <div>
                  <p className="eyebrow">Gallery</p>
                  <h3 className="mt-2 text-4xl text-charcoal">{rooms[activeIndex].name}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" aria-label="Previous room" className="rounded-full border border-charcoal p-2" onClick={goToPrevious}>
                    <ArrowLeft size={18} />
                  </button>
                  <button type="button" aria-label="Next room" className="rounded-full border border-charcoal p-2" onClick={goToNext}>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
