import { Button } from '@/components/ui/button';
import { contact } from '@/data/contact';
import {
  generateBreadcrumbSchema,
  jsonLdScriptProps,
  siteConfig,
} from '@/lib/seo';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronDown,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const title = 'Donate Medical Equipment in the Bay Area';
const description =
  'Donate clean, lightly used medical equipment in San Jose and the Bay Area. Contact Alliance Medical Supply about acceptance, pickup, or drop-off.';
const pageUrl = `${siteConfig.url}/donations`;
const heroImage = `${siteConfig.url}/site-assets/donations/medical-equipment-donation-pickup.jpg`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'donate medical equipment Bay Area',
    'medical equipment donation San Jose',
    'wheelchair donation Bay Area',
    'mobility scooter donation',
    'used medical equipment pickup',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: contact.businessName,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 1024,
        alt: 'A donor and pickup professional preparing clean mobility equipment for reuse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [heroImage],
  },
};

const breadcrumbData = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Donations', url: '/donations' },
]);

const donationFaqs = [
  {
    question: 'What medical equipment can I donate?',
    answer:
      'We may be able to accept clean, gently used mobility, bathroom safety, and home-care equipment. Acceptance depends on the item, condition, completeness, storage space, and current community need. Please contact us before bringing equipment to the store.',
  },
  {
    question: 'Does donated equipment need to work?',
    answer:
      'Yes. Equipment should be clean, complete, and in good working condition, without significant rust, cracks, odors, tears, or missing safety parts. We review each item before confirming acceptance.',
  },
  {
    question: 'Can you pick up medical equipment from my home?',
    answer:
      'Free pickup may be available. A small hauling fee may apply depending on the item size, quantity, location, stairs, access, disassembly needs, and overall situation.',
  },
  {
    question: 'What should I send before scheduling a donation?',
    answer:
      'Send the equipment type, manufacturer or model when available, clear photos, your location, and any access details such as stairs or narrow hallways. This helps our team review the item and plan the safest next step.',
  },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url: pageUrl,
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: heroImage,
    width: 1536,
    height: 1024,
  },
  about: {
    '@type': 'Thing',
    name: 'Medical equipment donations',
  },
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  publisher: { '@id': `${siteConfig.url}/#organization` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: donationFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function DonationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 text-slate-900">
      <script {...jsonLdScriptProps([breadcrumbData, pageSchema, faqSchema])} />

      <section className="border-b border-teal-100 bg-teal-50/70">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 md:px-6 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
              Medical equipment donations
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Give useful equipment a second life.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-700">
              Donate clean, lightly used medical equipment to help make rentals
              more affordable for Bay Area families.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 w-full bg-teal-700 px-4 text-white hover:bg-teal-800 active:scale-[0.98]"
              >
                <a href="#donation-details">Donation details</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-12 w-full px-4 active:scale-[0.98]"
              >
                <a href={contact.phone.href}>
                  <Phone className="h-4 w-4" /> Call us
                </a>
              </Button>
            </div>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-[0_20px_60px_rgba(15,118,110,0.12)]">
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[3/2]">
              <Image
                src="/site-assets/donations/medical-equipment-donation-pickup.jpg"
                alt="A donor and pickup professional preparing clean wheelchairs, walkers, and a mobility scooter for reuse"
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
            </div>
            <figcaption className="border-t border-teal-100 bg-white px-5 py-4 text-base font-semibold leading-6 text-slate-800 sm:px-6 sm:py-5 sm:text-lg sm:leading-7">
              Useful equipment can keep helping people.
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="donation-details"
        className="bg-white px-4 py-16 md:px-6 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <HeartHandshake
              className="h-11 w-11 text-teal-700"
              aria-hidden="true"
            />
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Why donating matters
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Good equipment should not go to waste when another person can use
              it for mobility, recovery, safety, or daily independence.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              When suitable equipment can be safely prepared for reuse, it can
              help us offer more affordable rental options to people who need
              support but may not always be able to afford it.
            </p>
          </div>

          <div className="border-t border-slate-200">
            {[
              {
                icon: Recycle,
                title: 'Extend its useful life',
                body: 'Keep quality equipment in service and out of storage or the waste stream.',
              },
              {
                icon: HeartHandshake,
                title: 'Support another family',
                body: 'Help create practical, lower-cost options for people navigating care at home.',
              },
              {
                icon: Truck,
                title: 'Clear space with less stress',
                body: 'Let our team help plan removal of equipment that may be difficult to move alone.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[auto_1fr] gap-4 border-b border-slate-200 py-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 leading-7 text-slate-600">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/site-assets/donations/equipment-condition-inspection.jpg"
              alt="A medical equipment professional checking the condition and safety of a clean wheelchair"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 54vw"
            />
          </div>

          <div>
            <ShieldCheck
              className="h-11 w-11 text-teal-700"
              aria-hidden="true"
            />
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Good condition matters
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Donated equipment must be suitable for inspection, preparation,
              and safe reuse. Please contact us before scheduling pickup or
              bringing an item to the store.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                'Clean and sanitary',
                'Working as intended',
                'Complete with essential parts',
                'Free of major damage or odors',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-slate-700"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-none text-teal-700"
                    aria-hidden="true"
                  />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-sm leading-6 text-teal-950">
              Acceptance depends on equipment type, condition, completeness,
              available space, and current need. Clear photos help us review an
              item before anyone makes a trip.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Equipment we may be able to accept
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Contact us first so we can confirm whether your specific item fits
            our current donation needs.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                title: 'Wheelchairs and transport chairs',
                body: 'Manual wheelchairs, reclining wheelchairs, and lightweight transport chairs in usable condition.',
              },
              {
                title: 'Walkers and mobility aids',
                body: 'Walkers, rollators, knee walkers, and other complete mobility supports.',
              },
              {
                title: 'Powered mobility equipment',
                body: 'Mobility scooters and some power chairs with working controls, charger, and key when applicable.',
              },
              {
                title: 'Select home-care equipment',
                body: 'Hospital beds, patient lifts, lift chairs, and bathroom safety equipment may be considered after review.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-6 sm:p-7 ${
                  index === 0 || index === 3
                    ? 'border-teal-200 bg-teal-50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <CheckCircle2
                  className="h-6 w-6 text-teal-700"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Truck className="h-11 w-11 text-teal-700" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Pickup that fits the situation
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Free pickup may be available. A small hauling fee may apply based
              on size, quantity, distance, stairs, disassembly, access, and the
              overall pickup needs.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Our goal is to make removal easier, especially when bulky
              equipment needs to be cleared from a home quickly and safely.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {[
              {
                icon: Camera,
                title: 'Send item details',
                body: 'Share photos, the equipment type or model, your location, and any stairs or access concerns.',
              },
              {
                icon: ShieldCheck,
                title: 'Confirm acceptance',
                body: 'Our team reviews condition, completeness, safety, available space, and current community need.',
              },
              {
                icon: Truck,
                title: 'Plan pickup or drop-off',
                body: 'If accepted, we will explain the available timing, access plan, and whether a hauling fee applies.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`grid grid-cols-[auto_1fr] gap-4 py-5 ${
                  index < 2 ? 'border-b border-slate-200' : ''
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 leading-7 text-slate-600">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Donation questions
          </h2>
          <div className="mt-8 space-y-3">
            {donationFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold marker:content-none">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className="h-5 w-5 flex-none text-teal-700 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="donation-contact"
        className="border-t border-teal-100 bg-teal-50 px-4 py-16 md:px-6 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl border border-teal-200 bg-white p-7 shadow-sm sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tell us about your equipment
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Send photos and basic details before pickup or drop-off. We will
              let you know whether we can accept the donation and what happens
              next.
            </p>

            <div className="mt-7 grid gap-4 text-slate-700 sm:grid-cols-2">
              <a
                href={contact.phone.href}
                className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <Phone className="h-5 w-5 text-teal-700" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-slate-500">Phone</span>
                  <span className="font-bold">{contact.phone.display}</span>
                </span>
              </a>
              <a
                href={`${contact.email.href}?subject=Medical%20Equipment%20Donation`}
                className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <Mail className="h-5 w-5 text-teal-700" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-slate-500">Email</span>
                  <span className="font-bold">{contact.email.primary}</span>
                </span>
              </a>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:col-span-2"
              >
                <MapPin className="h-5 w-5 text-teal-700" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-slate-500">Location</span>
                  <span className="font-bold">{contact.address.full}</span>
                </span>
              </a>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="h-12 bg-teal-700 px-6 text-white hover:bg-teal-800 active:scale-[0.98]"
          >
            <Link href="/contact-us">
              Open contact form <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
