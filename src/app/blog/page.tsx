import { BlogCard } from '@/components/custom/blog';
import { Button } from '@/components/ui/button';
import { contact } from '@/data/contact';
import { blogPosts, formatBlogDate } from '@/lib/blog';
import {
  generateBreadcrumbSchema,
  jsonLdScriptProps,
  siteConfig,
} from '@/lib/seo';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const title = 'Medical Equipment & Home Healthcare Blog';
const description =
  'Practical medical equipment guides, home safety tips, mobility advice, and caregiver resources from Alliance Medical Supply in San Jose, California.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'medical equipment blog',
    'home healthcare tips',
    'medical supplies guide',
    'caregiver resources',
    'wheelchair guide',
    'hospital bed rental advice',
    'Bay Area medical equipment',
  ],
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/blog`,
    siteName: contact.businessName,
    locale: siteConfig.locale,
    type: 'website',
    images: [{ url: blogPosts[0].image, alt: blogPosts[0].imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [blogPosts[0].image],
  },
};

const breadcrumbData = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
]);

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `${contact.businessName} Health & Equipment Blog`,
  description,
  url: `${siteConfig.url}/blog`,
  publisher: { '@id': `${siteConfig.url}/#organization` },
  blogPost: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.image,
    url: `${siteConfig.url}/blog/${post.slug}`,
  })),
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const latestPosts = blogPosts.filter(
    (post) => post.slug !== featuredPost.slug
  );
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <script {...jsonLdScriptProps([breadcrumbData, blogSchema])} />

      <section className="relative overflow-hidden border-b border-teal-100 bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900 text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-50 backdrop-blur">
              <Sparkles className="h-4 w-4 text-orange-300" />
              Practical guidance for everyday care
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              The Alliance{' '}
              <span className="text-teal-300">Health & Equipment</span> Blog
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              Clear, useful answers about mobility, home safety, recovery, and
              medical equipment—from your local Bay Area specialists.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <BookOpen className="h-4 w-4 text-teal-300" /> Daily guides
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <MapPin className="h-4 w-4 text-orange-300" /> Bay Area focused
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-teal-300" /> Easy to
                understand
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
              Editor&apos;s pick
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Featured guide
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-slate-600">
            Helpful information for patients, families, and caregivers—written
            to make equipment decisions feel less overwhelming.
          </p>
        </div>

        <article className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="relative min-h-72 overflow-hidden bg-slate-100 lg:min-h-[430px]"
          >
            <Image
              src={featuredPost.image}
              alt={featuredPost.imageAlt}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
          </Link>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <span className="w-fit rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
              {featuredPost.category}
            </span>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-teal-600" />
                {formatBlogDate(featuredPost.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-orange-500" />
                {featuredPost.readingTime}
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              <Link href={`/blog/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              {featuredPost.excerpt}
            </p>
            <Button asChild size="lg" className="mt-7 w-fit">
              <Link href={`/blog/${featuredPost.slug}`}>
                Read featured guide <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-5 md:px-6 lg:px-8">
          <span className="mr-2 text-sm font-bold text-slate-900">
            Explore topics
          </span>
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              Latest articles
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Build confidence, one guide at a time
            </h2>
          </div>
          <span className="hidden text-sm font-medium text-slate-500 sm:block">
            {blogPosts.length} helpful guides
          </span>
        </div>

        <div className="mt-9 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="bg-teal-700 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-100">
              Need a personal recommendation?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Talk with a local equipment specialist.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-teal-50">
              Tell us what you need, how long you need it, and where it will be
              used. We&apos;ll help you understand the available options.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg">
              <a href={contact.phone.href}>Call {contact.phone.display}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white bg-transparent text-white hover:bg-white hover:text-teal-800"
            >
              <Link href="/contact-us">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
