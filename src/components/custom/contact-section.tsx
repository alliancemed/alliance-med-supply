'use client';

import { PhoneLink } from '@/components/custom/PhoneLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { contact } from '@/data/contact';
import { ArrowRight, Clock, Mail, MapPin, Phone, Star } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section
      id="contact"
      data-component="ContactSection"
      className="relative bg-gradient-to-b from-gray-50/20 via-white to-gray-50/20 py-16 md:py-24 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-r from-teal-100/20 to-cyan-100/20 blur-2xl" />
      <div className="absolute bottom-20 left-20 h-24 w-24 rounded-full bg-gradient-to-r from-orange-100/20 to-pink-100/20 blur-xl" />

      <div className="relative mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center space-y-4">
          <Badge className="bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-50 font-medium px-3 py-1">
            Get In Touch
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Contact {contact.businessNameShort}{' '}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Supply
            </span>
          </h2>
          <p className="text-base leading-relaxed text-gray-600 md:text-lg max-w-2xl mx-auto">
            Ready to rent or purchase medical equipment? We&apos;re here to help{' '}
            with expert advice and same-day delivery throughout the Bay Area.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                Reach Out Today
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {/* Phone */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all duration-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 shadow-sm">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Call Us
                    </h4>
                    <p className="text-sm font-medium text-gray-700">
                      <PhoneLink className="hover:text-teal-600 transition-colors">
                        {contact.phone.display}
                      </PhoneLink>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">
                      {contact.hours.callHours}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Visit Our Store
                    </h4>
                    <p className="text-xs text-gray-600">
                      <a
                        href={contact.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-600 transition-colors"
                      >
                        {contact.address.street}, {contact.address.suite},{' '}
                        {contact.address.city}
                      </a>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">
                      {contact.hours.storeHoursSummary}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Store Hours
                    </h4>
                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      {contact.hours.storeHoursSummary}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Email Us
                    </h4>
                    <p className="text-xs text-gray-600">
                      <a
                        href={contact.email.href}
                        className="hover:text-teal-600 transition-colors"
                      >
                        {contact.email.primary}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accreditation Card */}
            <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 shadow-sm">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {contact.accreditation} Accredited
                    </h4>
                    <p className="text-xs text-gray-600">
                      Certified for quality and safety standards
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main CTA */}
          <div className="flex items-center">
            <Card className="w-full bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <h3 className="mb-6 text-2xl font-bold text-gray-900 text-center">
                  Need Equipment Right Away?
                </h3>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg text-base font-medium py-4 h-14"
                    asChild
                  >
                    <PhoneLink>
                      <Phone className="mr-2 h-5 w-5" />
                      Call {contact.phone.display}
                    </PhoneLink>
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-3 text-gray-500 font-medium">
                        OR
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-orange-300 bg-white text-orange-700 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-400 transition-all duration-300 font-medium text-base py-4 h-14"
                  >
                    Request Equipment Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 border border-green-100">
                  <h4 className="mb-3 text-base font-semibold text-gray-900 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Same-Day Delivery Available
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Most equipment delivered and set up same day in{' '}
                    {contact.serviceAreas.primary.slice(0, -1).join(', ')}, and{' '}
                    {
                      contact.serviceAreas.primary[
                        contact.serviceAreas.primary.length - 1
                      ]
                    }
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full-width Service Areas Section */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-md">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 text-center">
                Bay Area Communities We Serve
              </h3>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-5xl mx-auto">
                {contact.serviceAreas.primary.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 inline-block">
                  <span className="font-medium">Don&apos;t see your area?</span>{' '}
                  Call us - we may still be able to help!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
