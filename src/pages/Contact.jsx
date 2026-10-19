import { useState } from 'react';
import { hotel } from '../data/hotel';
import { rooms } from '../data/rooms';

const getToday = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
};

const initialFormData = {
  name: '',
  email: '',
  arrival: '',
  departure: '',
  guests: '1',
  room: 'Any available room',
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const today = getToday();

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!formData.email.trim()) nextErrors.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.arrival) nextErrors.arrival = 'Choose your arrival date.';
    else if (formData.arrival < today) nextErrors.arrival = 'Arrival must be today or a future date.';
    if (!formData.departure) nextErrors.departure = 'Choose your departure date.';
    else if (formData.arrival && formData.departure <= formData.arrival) {
      nextErrors.departure = 'Departure must be after arrival.';
    }
    if (!Number.isInteger(Number(formData.guests)) || Number(formData.guests) < 1) {
      nextErrors.guests = 'Enter at least one guest.';
    }
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <>
      <section className="contact-scene relative isolate min-h-[100svh] overflow-hidden">
        <img
          src="/Images/ContactPool.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_55%]"
          fetchpriority="high"
        />
        <div className="contact-scene__veil absolute inset-0" />
        <div className="section-shell relative z-10 flex min-h-[100svh] items-center py-32 md:py-28">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="contact-details text-white">
              <p className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#e4d5b7] md:text-[11px]">
                <span className="h-px w-9 bg-gold" />
                Contact & reservations
              </p>
              <h1 className="max-w-lg text-5xl leading-[0.9] md:text-7xl">Let Us Welcome You.</h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
                Planning a visit to Freetown? Share your dates and preferences and start a reservation enquiry. Our team can help confirm room options and details for your stay.
              </p>

              <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-[10px] uppercase tracking-[0.24em] text-[#ddc69d]">Address</p>
                  <p className="text-sm leading-relaxed text-white/90">{hotel.address}</p>
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] uppercase tracking-[0.24em] text-[#ddc69d]">Call us</p>
                  <a href={`tel:${hotel.phone.replace(/[^\d+]/g, '')}`} className="text-sm text-white/90 underline decoration-gold underline-offset-4">
                    {hotel.phone}
                  </a>
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] uppercase tracking-[0.24em] text-[#ddc69d]">Email</p>
                  <a href={`mailto:${hotel.email}`} className="break-all text-sm text-white/90 underline decoration-gold underline-offset-4">
                    {hotel.email}
                  </a>
                </div>
              </div>
              <div className="mt-7 max-w-md overflow-hidden border border-white/20">
                <iframe
                  title="Hotel location map"
                  src={hotel.mapEmbedUrl}
                  className="contact-location-map h-32 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-2 text-[10px] text-white/65">Brookfields area map; please confirm the exact hotel location before travelling.</p>
            </div>

            <div id="reservation" className="contact-form-panel scroll-mt-28 p-6 md:p-8 lg:p-10">
              <div className="mb-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#ddc69d]">Plan your stay</p>
                <h2 className="mt-2 text-4xl text-white md:text-5xl">Start a reservation enquiry.</h2>
                <p className="mt-3 text-xs leading-relaxed text-white/70">
                  Tell us a little about your visit. We can then confirm availability, room details, and rates.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-4 sm:grid-cols-2" noValidate>
                <div>
                  <label htmlFor="name" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/75">Full name</label>
                  <input id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} className="contact-input w-full px-3.5 py-3 text-sm text-white focus:outline-none" />
                  {errors.name && <p id="name-error" className="mt-2 text-sm text-red-200" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/75">Email address</label>
                  <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className="contact-input w-full px-3.5 py-3 text-sm text-white focus:outline-none" />
                  {errors.email && <p id="email-error" className="mt-2 text-sm text-red-200" role="alert">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="arrival" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/75">Arrival</label>
                  <input id="arrival" name="arrival" type="date" min={today} value={formData.arrival} onChange={handleChange} aria-invalid={Boolean(errors.arrival)} aria-describedby={errors.arrival ? 'arrival-error' : undefined} className="contact-input w-full px-3.5 py-3 text-sm text-white focus:outline-none" />
                  {errors.arrival && <p id="arrival-error" className="mt-2 text-sm text-red-200" role="alert">{errors.arrival}</p>}
                </div>
                <div>
                  <label htmlFor="departure" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/75">Departure</label>
                  <input id="departure" name="departure" type="date" min={formData.arrival || today} value={formData.departure} onChange={handleChange} aria-invalid={Boolean(errors.departure)} aria-describedby={errors.departure ? 'departure-error' : undefined} className="contact-input w-full px-3.5 py-3 text-sm text-white focus:outline-none" />
                  {errors.departure && <p id="departure-error" className="mt-2 text-sm text-red-200" role="alert">{errors.departure}</p>}
                </div>
                <div>
                  <label htmlFor="guests" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/75">Guests</label>
                  <input id="guests" name="guests" type="number" min="1" step="1" value={formData.guests} onChange={handleChange} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? 'guests-error' : undefined} className="contact-input w-full px-3.5 py-3 text-sm text-white focus:outline-none" />
                  {errors.guests && <p id="guests-error" className="mt-2 text-sm text-red-200" role="alert">{errors.guests}</p>}
                </div>
                <div>
                  <label htmlFor="room" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/75">Room preference</label>
                  <select id="room" name="room" value={formData.room} onChange={handleChange} className="contact-input w-full px-3.5 py-3 text-sm text-white focus:outline-none">
                    <option className="text-charcoal">Any available room</option>
                    {rooms.map((room) => <option key={room.id} className="text-charcoal">{room.name}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/75">Additional details <span className="normal-case tracking-normal text-white/55">(optional)</span></label>
                  <textarea id="message" name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Share any questions or requests for your stay." className="contact-input w-full resize-y px-3.5 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none" />
                </div>

                <button type="submit" className="btn-primary contact-submit w-full justify-center sm:col-span-2">
                  Prepare reservation enquiry
                </button>

                {submitted && (
                  <div className="border border-emerald-200/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100 sm:col-span-2" role="status">
                    <p className="font-medium">Your enquiry details are ready.</p>
                    <p className="mt-1">This preview does not send or store your request, and no room has been reserved. The displayed contact details are fictional sample data.</p>
                    <p className="mt-2 text-xs">Stay: {formData.arrival} to {formData.departure} · {formData.guests} guest{Number(formData.guests) === 1 ? '' : 's'} · {formData.room}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
