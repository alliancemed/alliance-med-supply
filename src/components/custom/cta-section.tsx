'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, PhoneCall } from 'lucide-react';
import Link from 'next/link';

import { PhoneLink } from '@/components/custom/PhoneLink';
import { Button } from '@/components/ui/button';
import { contact } from '@/data/contact';
import { cn } from '@/lib/utils';

export type CtaSectionProps = {
  className?: string;
};

export const CtaSection = ({ className }: CtaSectionProps) => {
  const reduce = useReducedMotion();
  const componentName = 'CtaSection';

  return (
    <section
      id={componentName}
      data-component={componentName}
      className={cn(
        'w-full bg-gradient-to-b from-background to-muted/30',
        className
      )}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 py-16 md:px-6 md:py-20 lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-3xl border border-border bg-background p-8 shadow-sm md:p-12 lg:p-16"
        >
          <div className="flex flex-col items-center text-center">
            {/* Heading */}
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Ready to Get Started?
            </h2>

            {/* Supporting text */}
            <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
              Whether you need medical equipment delivered today or want to
              learn more about our rental options, we&apos;re here to help. Get
              in touch with our team now.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="min-w-[180px]">
                <Link
                  href="/contact-us"
                  onKeyDown={(e) => {
                    if (e.key === ' ') {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Contact Us
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="min-w-[180px]"
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
                  <PhoneCall className="mr-2 h-5 w-5" aria-hidden="true" />
                  {contact.phone.display}
                </PhoneLink>
              </Button>
            </div>

            {/* Additional info */}
            <p className="mt-6 text-sm text-slate-500 whitespace-pre-line">
              {contact.hours.callHours}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
