'use client';

import { PhoneLink } from '@/components/custom/PhoneLink';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { contact } from '@/data/contact';
import { ExternalLink, Mail, MapPin, Phone, Star } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer
      id="footer"
      data-component="Footer"
      className="bg-gray-900 text-white"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xl font-bold">{contact.businessName}</h3>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Serving Bay Area communities for over 15 years with quality
              durable medical equipment and supplies. We are a{' '}
              {contact.accreditation} accredited, committed to helping you
              maintain independence and comfort at home.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Star
                className="h-5 w-5 text-yellow-400 fill-yellow-400"
                aria-hidden="true"
              />
              <span className="font-semibold">
                {contact.accreditation} Accredited
              </span>
            </div>

            <div className="flex gap-4">
              {contact.social.google && (
                <Button
                  variant="outline"
                  className="border-2 border-teal-400 bg-transparent text-teal-400 hover:bg-teal-400 hover:text-white transition-all duration-200"
                  asChild
                >
                  <a
                    href={contact.social.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on Google (opens in new tab)"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                    View on Google
                  </a>
                </Button>
              )}
              {contact.social.yelp && (
                <Button
                  variant="outline"
                  className="border-2 border-orange-400 bg-transparent text-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-200"
                  asChild
                >
                  <a
                    href={contact.social.yelp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on Yelp (opens in new tab)"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                    View on Yelp
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-teal-400" aria-hidden="true" />
                <div>
                  <PhoneLink className="font-medium hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded">
                    {contact.phone.display}
                  </PhoneLink>
                  <p className="text-sm text-gray-400">Main Phone</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-teal-400" aria-hidden="true" />
                <div>
                  <a
                    href={contact.email.href}
                    className="font-medium hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
                  >
                    {contact.email.primary}
                  </a>
                  <p className="text-sm text-gray-400">Email</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  className="h-4 w-4 text-teal-400 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
                  >
                    <p className="font-medium">
                      {contact.address.street}, {contact.address.suite}
                    </p>
                    <p className="font-medium">
                      {contact.address.city}, {contact.address.state}{' '}
                      {contact.address.zip}
                    </p>
                  </a>
                  <p className="text-sm text-gray-400">Visit Our Store</p>
                </div>
              </div>
            </div>
          </div>

          {/* Store Hours & Services */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Store Hours</h4>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Mon - Fri:</span>
                <span className="font-medium">
                  {contact.hours.storeHours.weekdays}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Saturday:</span>
                <span className="font-medium">
                  {contact.hours.storeHours.saturday}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Sunday:</span>
                <span className="font-medium">
                  {contact.hours.storeHours.sunday}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full bg-green-400"
                  aria-hidden="true"
                />
                <span className="text-sm">Same-Day Delivery</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
                <span className="text-sm">Insurance Accepted</span>
              </div> */}
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full bg-green-400"
                  aria-hidden="true"
                />
                <span className="text-sm">Free Setup & Training</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:items-center lg:justify-between">
            <div className="text-sm text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} {contact.businessName}. All
                rights reserved.
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <a
                  href="/privacy-policy"
                  className="rounded px-1 py-1 hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  Privacy Policy
                </a>
                <span aria-hidden="true">|</span>
                <a
                  href="/terms-conditions"
                  className="rounded px-1 py-1 hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  Terms & Conditions
                </a>
                <span aria-hidden="true">|</span>
                <Link
                  href="/blog"
                  className="rounded px-1 py-1 hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  Health Blog
                </Link>
                <span aria-hidden="true">|</span>
                <Link
                  href="/donations"
                  className="rounded px-1 py-1 hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  Donations
                </Link>
                <span aria-hidden="true">|</span>
                <a
                  href="/sitemap.xml"
                  className="rounded px-1 py-1 hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  Site Map
                </a>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              <p>{contact.serviceAreas.description}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
