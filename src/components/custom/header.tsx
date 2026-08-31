'use client';

import { PhoneLink } from '@/components/custom/PhoneLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { contact } from '@/data/contact';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Donations', href: '/donations' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <>
      <header
        id="Header"
        data-component="Header"
        className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="px-4 md:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex cursor-pointer items-center transition-opacity"
            >
              <div className="relative h-16 w-16">
                <Image
                  src="/logo/Allience-Medical-logo-large.svg"
                  alt="Alliance Medical Supply Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                  priority
                />
              </div>
              <div className="text-center">
                <span className="block text-xl font-semibold text-foreground md:text-2xl">
                  {contact.businessNameShort}
                </span>
                <p className="text-xs text-teal-700 uppercase tracking-widest">
                  {contact.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-1 xl:flex"
              aria-label="Main navigation"
            >
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(`${item.href}/`));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`cursor-pointer rounded-md px-3 py-2.5 text-sm font-semibold transition-all 2xl:px-4 2xl:text-base ${
                      isActive
                        ? 'bg-muted text-primary'
                        : 'text-foreground hover:bg-muted hover:text-primary'
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === ' ') {
                        e.preventDefault();
                        e.currentTarget.click();
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden items-center gap-4 xl:flex">
              <div className="text-right">
                <Button
                  variant="link"
                  size="sm"
                  asChild
                  className="h-auto p-0 justify-end text-slate-600 hover:text-slate-800"
                >
                  <Link
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {contact.address.cityState}
                  </Link>
                </Button>
                <Link
                  href={contact.accreditationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${contact.accreditation} - accredited by ${contact.accreditationOrg}`}
                  className="block mt-1 text-right"
                >
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold bg-teal-100 text-teal-700 hover:bg-teal-200 cursor-pointer transition-colors"
                  >
                    {contact.accreditation}
                  </Badge>
                </Link>
              </div>
              <Button size="default" asChild>
                <PhoneLink
                  onKeyDown={(e) => {
                    if (e.key === ' ') {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  <Phone className="h-4 w-4" />
                  {contact.phone.display}
                </PhoneLink>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile navigation: full-screen overlay drawer outside the header */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-x-0 top-20 bottom-0 z-[60] bg-black/40 xl:hidden"
            aria-hidden="true"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Drawer panel */}
          <div className="fixed inset-x-0 top-20 z-[70] overflow-y-auto max-h-[calc(100vh-5rem)] border-t bg-background shadow-xl xl:hidden">
            <div className="space-y-1 py-4">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(`${item.href}/`));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`typography-body block cursor-pointer rounded-md px-4 py-2.5 font-medium transition-colors ${
                      isActive
                        ? 'bg-muted text-primary'
                        : 'text-foreground/80 hover:bg-muted hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === ' ') {
                        e.preventDefault();
                        e.currentTarget.click();
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="border-t px-4 pt-4">
                <Button size="lg" className="mb-3 w-full" asChild>
                  <PhoneLink>
                    <Phone className="h-4 w-4" />
                    Call {contact.phone.display}
                  </PhoneLink>
                </Button>
                <div className="typography-small text-center text-muted-foreground">
                  {contact.address.cityState} • {contact.accreditation}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
