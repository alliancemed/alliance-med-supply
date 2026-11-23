import { CTAButtons } from '@/components/custom/CTAButtons';
import { KeyableAnchor } from '@/components/custom/KeyableAnchor';
import { KeyableCard } from '@/components/custom/KeyableCard';
import { PhoneLink } from '@/components/custom/PhoneLink';
import { Card, CardContent } from '@/components/ui/card';
import { contact } from '@/data/contact';
import {
  Accessibility,
  Award,
  CheckCircle2,
  Clock,
  Heart,
  Home,
  MapPin,
  Phone,
  Shield,
  Star,
  Stethoscope,
  Users,
} from 'lucide-react';

export default function AboutUsPage() {
  return (
    <main
      id="AboutUsPage"
      data-component="AboutUsPage"
      className="min-h-screen bg-background"
    >
      {/* Hero Section with Stats */}
      <section className="px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              <span className="text-primary">About {contact.businessName}</span>
            </h1>
            <p className="mt-6 text-xl font-semibold text-text-secondary md:text-2xl">
              Your Trusted Partner in Medical Equipment & Healthcare Solutions
            </p>
          </div>

          {/* Key Stats/Badges */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            <div className="flex flex-col items-center rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm">
              <Award aria-hidden={true} className="h-10 w-10 text-primary" />
              <h3 className="mt-3 text-sm font-semibold text-text-primary md:text-base">
                Certified Provider
              </h3>
              <p className="mt-1 text-center text-xs text-text-muted md:text-sm">
                {contact.accreditation} & FDA-approved equipment
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm">
              <Star
                aria-hidden={true}
                className="h-10 w-10 fill-star text-star"
              />
              <h3 className="mt-3 text-sm font-semibold text-text-primary md:text-base">
                4.9/5 Rating
              </h3>
              <p className="mt-1 text-center text-xs text-text-muted md:text-sm">
                Highly rated by our customers
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm">
              <MapPin aria-hidden={true} className="h-10 w-10 text-primary" />
              <h3 className="mt-3 text-sm font-semibold text-text-primary md:text-base">
                Bay Area Coverage
              </h3>
              <p className="mt-1 text-center text-xs text-text-muted md:text-sm">
                Serving {contact.address.city} & surrounding counties
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm">
              <Clock aria-hidden={true} className="h-10 w-10 text-accent" />
              <h3 className="mt-3 text-sm font-semibold text-text-primary md:text-base">
                20+ Years Experience
              </h3>
              <p className="mt-1 text-center text-xs text-text-muted md:text-sm">
                Trusted expertise in medical equipment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-card px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Our Story
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
          </div>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-text-muted md:text-lg">
            <p>
              Alliance Medical Supply and Rental is a trusted provider of
              durable medical equipment and healthcare supplies,serving clinics,
              clinics, hospitals, and home patients throughout the communities
              communities and counties, including{' '}
              {contact.serviceAreas.primary.join(', ')}.
            </p>
            <p>
              We proudly offer an extensive selection of quality brand name home
              medical equipment and supplies. All of our products are from
              reputable, well-known manufacturers like Invacare, Medline, Mebis
              Healthcare, Duro-med Industries, FLA Orthopedics, OTC, Jobst,
              Major&apos;s Mobisist, Drive Medical, and other sought-after
              medical product brands.
            </p>
            <p>
              We look forward to working with you to fulfill all your healthcare
              needs. We value your business and strive to provide individual
              attention to our customers&apos; needs. Our relationship with you
              is important, and we are committed to earning your business
              throughout the years ahead.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {/* Mission */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <Heart aria-hidden={true} className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                  Our Mission
                </h2>
              </div>
              <p className="mt-6 text-base leading-relaxed text-text-muted">
                To make a positive difference in the lives of our communities by
                providing them with customer service that exceeds their
                expectations and products that help to improve the quality of
                their lives. We are committed to providing healthcare
                professionals and patients with the highest quality medical
                equipment and supplies to support healing, enhance mobility, and
                promote independence.
              </p>
            </div>

            {/* Vision/Goal */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Shield aria-hidden={true} className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                  Our Goal
                </h2>
              </div>
              <p className="mt-6 text-base leading-relaxed text-text-muted">
                To educate our senior communities on the proper use and safety
                of durable medical equipment and home safety. We encourage them
                to seek professional medical consultation and help find the
                right product or service to meet their needs. We strive to be
                the Bay Area&apos;s premier destination for comprehensive
                medical equipment solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section - Card Style with Colored Borders */}
      <section className="bg-card px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Our Values
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
            <p className="mx-auto mt-6 max-w-2xl text-base text-text-muted md:text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Quality Excellence - Teal */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
              <div className="flex flex-col gap-4 p-6 pl-8">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                  <Award aria-hidden={true} className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text-primary">
                    Quality Excellence
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Certified, reliable equipment from trusted manufacturers
                    meeting the highest industry standards. All products are
                    {contact.accreditation} and FDA-approved.
                  </p>
                </div>
              </div>
            </div>

            {/* Compassionate Care - Orange */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
              <div className="flex flex-col gap-4 p-6 pl-8">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                  <Heart aria-hidden={true} className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text-primary">
                    Compassionate Care
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Personalized attention guided by empathy and a genuine
                    desire to improve lives. We provide individual attention to
                    every customer&apos;s unique needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Community Partnership */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
              <div className="flex flex-col gap-4 p-6 pl-8">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                  <Users aria-hidden={true} className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text-primary">
                    Community Partnership
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Supporting Bay Area families, seniors, and healthcare
                    professionals with reliable service. Committed to earning
                    your business for years to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              What We Offer
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-base text-text-muted md:text-lg">
              Comprehensive medical equipment solutions tailored to your needs
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Mobility & Accessibility */}
            <KeyableCard
              href="/products?category=wheelchairs-and-mobility"
              className="border-border shadow-sm transition-all hover:shadow-lg"
            >
              <Card className="border-0 shadow-none h-full">
                <CardContent className="p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary">
                    <Accessibility
                      aria-hidden={true}
                      className="h-7 w-7 text-white"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-text-primary">
                    Mobility & Accessibility
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    Wheelchairs, walkers, rollators, mobility scooters, and lift
                    chairs designed to restore independence and freedom of
                    movement.
                  </p>
                </CardContent>
              </Card>
            </KeyableCard>

            {/* Card 2: Home Care & Recovery */}
            <KeyableCard
              href="/products?category=home-care"
              className="border-border shadow-sm transition-all hover:shadow-lg"
            >
              <Card className="border-0 shadow-none h-full">
                <CardContent className="p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent">
                    <Home aria-hidden={true} className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-text-primary">
                    Home Care & Recovery
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    Hospital beds, patient lifts, bedside commodes, and recovery
                    aids to support healing and comfort in the home environment.
                  </p>
                </CardContent>
              </Card>
            </KeyableCard>

            {/* Card 3: Medical Equipment Rentals */}
            <KeyableCard
              href="/products?category=rentals"
              className="border-border shadow-sm transition-all hover:shadow-lg"
            >
              <Card className="border-0 shadow-none h-full">
                <CardContent className="p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary">
                    <Stethoscope
                      aria-hidden={true}
                      className="h-7 w-7 text-white"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-text-primary">
                    Medical Equipment Rentals
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    Flexible short-term and long-term rental options for CPM
                    machines, oxygen concentrators, and other specialized
                    medical devices.
                  </p>
                </CardContent>
              </Card>
            </KeyableCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Two Column Checklist */}
      <section className="bg-card px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Why Choose Alliance Medical Supply and Rental?
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
            <p className="mx-auto mt-6 max-w-3xl text-base text-text-muted md:text-lg">
              Experience the convenience of having all your medical equipment
              needs handled by one trusted provider with proven excellence.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-6">
            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                {contact.accreditation} and FDA-approved equipment
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Same-day and next-day delivery available
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Trusted brands: Invacare, Medline, Drive Medical
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Professional equipment setup and training
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Flexible rental and purchase options available
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Serving Bay Area clinics, hospitals, and homes
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Home safety education and guidance provided
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Insurance billing assistance and support
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Equipment maintenance and repair services
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden={true}
                className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
              />
              <span className="text-base text-text-secondary">
                Individual attention to every customer&apos;s needs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Safety Notice */}
      <section className="px-4 py-12 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-border bg-muted p-6 md:p-8">
            <h3 className="text-lg font-semibold text-text-primary">
              Patient Safety & Compliance
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              To report a patient safety event or concern not resolved by our
              company, you may contact{' '}
              <KeyableAnchor
                href={contact.accreditationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
                aria-label={`${contact.accreditationOrg} website`}
              >
                {contact.accreditationOrg}
              </KeyableAnchor>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Get in Touch CTA */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-border bg-background p-8 shadow-lg md:p-12">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted md:text-lg">
              Whether you need equipment for home care, a medical facility, or
              have questions about our services, our team is here to help you
              find the right solution.
            </p>
            <CTAButtons />
            <div className="mt-8 flex flex-col items-center gap-2 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <MapPin aria-hidden={true} className="h-5 w-5 text-accent" />
                <KeyableAnchor
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  {contact.address.full}
                  <span className="sr-only">(opens in new tab)</span>
                </KeyableAnchor>
              </div>
              <div className="flex items-center gap-2">
                <Phone aria-hidden={true} className="h-5 w-5 text-primary" />
                <PhoneLink className="text-lg font-semibold text-primary transition-colors hover:text-primary/80 hover:underline">
                  {contact.phone.display}
                </PhoneLink>
              </div>
              <div className="mt-2 text-xs text-text-muted whitespace-pre-line">
                {contact.hours.storeHoursSummary}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
