'use client';

import { trackPhoneClick } from '@/lib/gtag';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import React from 'react';

type ContactInfoProps = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  label: string;
  value: string;
  hours?: string;
  href?: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  // Content props
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = 'Get in Touch',
  description = 'If you have any questions regarding our services or need help, please fill out the form here. We do our best to respond within 1 business day.',
  contactInfo,
  className,
  formSectionClassName,
  children,
}: ContactCardProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(
        'bg-card relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3',
        className
      )}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      data-component="ContactCard"
    >
      <div className="flex flex-col justify-between lg:col-span-2">
        <motion.div
          className="relative h-full space-y-4 px-4 py-8 md:p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {description}
          </motion.p>
          <motion.div
            className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {contactInfo?.map((info, index) => (
              <motion.div
                key={info.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : 0.7 + index * 0.1,
                }}
              >
                <ContactInfo {...info} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className={cn(
          'bg-muted/40 flex h-full w-full items-center p-5 md:col-span-1',
          formSectionClassName
        )}
        initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  hours,
  href,
  className,
}: ContactInfoProps) {
  const isExternal = href?.startsWith('http');
  const isPhone = href?.startsWith('tel:');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  const content = (
    <>
      <div className="shrink-0 bg-muted/40 rounded-lg p-3">
        <Icon aria-hidden={true} className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium text-base md:text-lg">{label}</p>
        <p className="text-muted-foreground text-sm md:text-base whitespace-pre-line">
          {value}
        </p>
        {hours && (
          <p className="text-muted-foreground text-xs md:text-sm mt-1 whitespace-pre-line">
            {hours}
          </p>
        )}
        {isExternal && <span className="sr-only">(opens in new tab)</span>}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={cn('flex items-start gap-3 py-3 cursor-pointer', className)}
        onClick={isPhone ? trackPhoneClick : undefined}
        onKeyDown={handleKeyDown}
        data-component="ContactInfo"
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={cn('flex items-start gap-3 py-3', className)}
      data-component="ContactInfo"
    >
      {content}
    </div>
  );
}
