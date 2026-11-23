import { PhoneLink } from '@/components/custom/PhoneLink';
import { Button } from '@/components/ui/button';
import { contact } from '@/data/contact';
import { useSimpleParallax } from '@/hooks/useParallax';
import { IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Clock, ExternalLink, MapPin, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type HeroWithBentoGridProps = {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

export const HeroWithBentoGrid = ({
  id,
  className,
  title: _title = 'Quality Medical Equipment Rentals',
  subtitle: _subtitle = 'Keep your patients comfortable and mobile',
  description:
    _description = 'Professional medical supply rentals and sales. We understand your patients needs and provide the equipment they require for recovery and mobility.',
  primaryButtonText: _primaryButtonText = 'Browse Equipment',
  secondaryButtonText: _secondaryButtonText = 'Learn More',
  onPrimaryClick,
  onSecondaryClick,
}: HeroWithBentoGridProps) => {
  const componentName = 'HeroWithBentoGrid';
  const reduceMotion = useReducedMotion();
  const rootId = id ?? componentName;

  // Parallax effects for depth
  const vanParallax = useSimpleParallax(0.3); // Slow parallax for background
  const cardsParallax = useSimpleParallax(0.15); // Subtle parallax for cards
  const cardsParallax2 = useSimpleParallax(0.2); // Slightly different parallax for second card

  return (
    <section
      id={rootId}
      data-component={componentName}
      className={cn(
        'w-full min-w-0 min-h-[600px] md:min-h-[700px] xl:h-[calc(100vh-8rem)] flex items-center px-4 py-6 md:px-6 md:py-8 xl:px-8 xl:pb-6',
        className
      )}
    >
      {/* Main Layout - Left Content + Right Column */}
      <div className="w-full h-full flex flex-col xl:flex-row gap-4 md:gap-6">
        {/* LEFT COLUMN - Full Height Content Card (40%) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="w-full xl:flex-[0_0_40%] flex"
        >
          <div className="bg-gradient-to-br from-muted via-background to-accent/10 rounded-2xl xl:rounded-3xl p-6 md:p-8 xl:p-8 w-full flex flex-col justify-center shadow-sm h-full">
            {/* Trust Indicators Header */}
            <div className="flex flex-wrap items-center gap-3 pb-3">
              <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                <div
                  className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  aria-hidden="true"
                ></div>
                Licensed Provider
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                <Star
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
                4.9/5 Rating
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                20+ Years Experience
              </div>
            </div>

            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary w-fit mb-5">
              All equipment is available for rent or purchase
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-text-primary leading-tight mb-4 md:mb-5">
              Bay Area&apos;s #1 Durable{' '}
              <span className="text-primary">Medical Equipment</span> Rental
              &amp; Supply
            </h1>

            <p className="text-md xl:text-lg text-text-muted leading-relaxed mb-5 md:mb-6">
              Wheelchair, hospital bed, and mobility scooter rentals delivered
              to your door in San Jose, Mountain View, Palo Alto, Sunnyvale, and
              across the Bay Area.
            </p>

            {/* Service Features Grid */}
            <ul className="grid grid-cols-2 gap-3 mb-5 md:mb-6 list-none">
              <li className="flex items-center gap-2 text-sm text-text-primary">
                <div
                  className="w-1 h-4 bg-primary rounded-full"
                  aria-hidden="true"
                ></div>
                All equipment is sanitized
              </li>
              <li className="flex items-center gap-2 text-sm text-text-primary">
                <div
                  className="w-1 h-4 bg-primary rounded-full"
                  aria-hidden="true"
                ></div>
                Walk-ins welcome
              </li>
              <li className="flex items-center gap-2 text-sm text-text-primary">
                <div
                  className="w-1 h-4 bg-primary rounded-full"
                  aria-hidden="true"
                ></div>
                Professional delivery service
              </li>
              <li className="flex items-center gap-2 text-sm text-text-primary">
                <div
                  className="w-1 h-4 bg-primary rounded-full"
                  aria-hidden="true"
                ></div>
                Trusted by 15,000+ customers
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={onPrimaryClick}
                className="w-full sm:w-auto"
                asChild
              >
                <PhoneLink
                  aria-label={`Call us at ${contact.phone.display}`}
                  onKeyDown={(e) => {
                    if (e.key === ' ') {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {contact.phone.display}
                </PhoneLink>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onSecondaryClick}
                className="w-full sm:w-auto"
                asChild
              >
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find our location on Google Maps (opens in a new tab)"
                  onKeyDown={(e) => {
                    if (e.key === ' ') {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Find Location
                  <ExternalLink
                    className="h-3 w-3 ml-1 opacity-60"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </div>

            {/* Hours */}
            <div className="mt-3 md:mt-4 pt-3 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/10 shrink-0">
                    <Phone
                      className="h-4 w-4 md:h-5 md:w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm md:text-md font-medium text-text-primary">
                      Phone Hours
                    </p>
                    <p className="text-sm md:text-md text-text-muted whitespace-pre-line">
                      {contact.hours.callHours}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-accent/10 shrink-0">
                    <Clock
                      className="h-4 w-4 md:h-5 md:w-5 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm md:text-md font-medium text-text-primary">
                      Store Hours
                    </p>
                    <p className="text-sm md:text-md text-text-muted whitespace-pre-line">
                      {contact.hours.storeHoursSummary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - Van Image Top + 4 Images Bottom (60%) */}
        <div className="w-full xl:flex-[0_0_60%] flex flex-col gap-4 md:gap-6 xl:h-full">
          {/* TOP - Van Image */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="h-[300px] sm:h-[350px] md:h-[400px] xl:flex-1 xl:h-auto"
          >
            <div
              ref={vanParallax.ref}
              style={vanParallax.style}
              className="relative rounded-2xl xl:rounded-3xl overflow-hidden h-full w-full"
            >
              <Image
                src={IMAGES.van}
                alt="Alliance Medical Supply Van - Professional medical equipment delivery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />

              {/* Tag overlays */}
              <div className="absolute top-6 left-6 flex flex-row gap-2 flex-wrap">
                <span className="bg-accent text-accent-foreground text-sm px-4 py-2 rounded-full font-medium shadow-lg">
                  Same Day Delivery Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* BOTTOM - Title + Four Equal Image Cards in a Row */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="flex-shrink-0"
          >
            {/* Section Title */}
            <h2 className="text-lg xl:text-xl font-semibold text-text-primary mb-3 md:mb-4">
              Popular Rentals
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {/* Image Card 1 - Wheelchairs */}
              <div ref={cardsParallax.ref} style={cardsParallax.style}>
                <Link
                  href="/products/wheelchairs"
                  className="relative rounded-xl xl:rounded-2xl overflow-hidden aspect-square bg-accent/30 group cursor-pointer block"
                  aria-label="Wheelchairs"
                >
                  <Image
                    src={IMAGES.hero1}
                    alt="Wheelchair rental"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 15vw"
                  />
                  {/* Scrim to reduce watermark visibility */}
                  <div className="absolute bottom-0 right-0 h-8 w-20 bg-gradient-to-tl from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-6 pb-2 px-2">
                    <p className="text-white text-xs font-semibold truncate">
                      Wheelchairs
                    </p>
                  </div>
                </Link>
              </div>

              {/* Image Card 2 - Mobility Scooters */}
              <div ref={cardsParallax2.ref} style={cardsParallax2.style}>
                <Link
                  href="/products/mobility-scooters"
                  className="relative rounded-xl xl:rounded-2xl overflow-hidden aspect-square group cursor-pointer block"
                  aria-label="Mobility Scooters"
                >
                  <Image
                    src={IMAGES.hero2}
                    alt="Mobility scooter rental"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 15vw"
                  />
                  <div className="absolute bottom-0 right-0 h-8 w-20 bg-gradient-to-tl from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-6 pb-2 px-2">
                    <p className="text-white text-xs font-semibold truncate">
                      Mobility Scooters
                    </p>
                  </div>
                </Link>
              </div>

              {/* Image Card 3 - Rollators */}
              <Link
                href="/products/rollators"
                className="relative rounded-xl xl:rounded-2xl overflow-hidden aspect-square bg-muted group cursor-pointer block"
                aria-label="Rollators"
              >
                <Image
                  src={IMAGES.hero3}
                  alt="Rollator rental"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 15vw"
                />
                <div className="absolute bottom-0 right-0 h-8 w-20 bg-gradient-to-tl from-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-6 pb-2 px-2">
                  <p className="text-white text-xs font-semibold truncate">
                    Rollators
                  </p>
                </div>
              </Link>

              {/* Image Card 4 - Hospital Beds */}
              <Link
                href="/products/electric-hospital-beds-and-mattresses"
                className="relative rounded-xl xl:rounded-2xl overflow-hidden aspect-square bg-accent/20 group cursor-pointer block"
                aria-label="Hospital Beds"
              >
                <Image
                  src={IMAGES.hero6}
                  alt="Hospital bed rental"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 15vw"
                />
                <div className="absolute bottom-0 right-0 h-8 w-20 bg-gradient-to-tl from-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-6 pb-2 px-2">
                  <p className="text-white text-xs font-semibold truncate">
                    Hospital Beds
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
