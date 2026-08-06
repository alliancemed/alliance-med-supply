import { BlogCard } from '@/components/custom/blog';
import { Button } from '@/components/ui/button';
import { contact } from '@/data/contact';
import {
  blogPosts,
  formatBlogDate,
  getBlogPost,
  getRelatedPosts,
} from '@/lib/blog';
import {
  generateBreadcrumbSchema,
  jsonLdScriptProps,
  siteConfig,
} from '@/lib/seo';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return { title: 'Article Not Found' };

  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: contact.businessName }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: contact.businessName,
      locale: siteConfig.locale,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [contact.businessName],
      section: post.category,
      tags: post.keywords,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: articleUrl,
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    author: {
      '@type': 'Organization',
      name: contact.businessName,
      url: siteConfig.url,
    },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <script {...jsonLdScriptProps([breadcrumbData, articleSchema])} />

      <header className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-orange-400" />
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-md text-sm font-bold text-teal-700 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all guides
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-teal-100 px-3 py-1.5 text-sm font-bold text-teal-800">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4 text-teal-600" />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <Clock3 className="h-4 w-4 text-orange-500" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-slate-600">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">
                Alliance Editorial Team
              </p>
              <p>Medical equipment education from San Jose, California</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-slate-100 shadow-sm">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article className="min-w-0">
            <p className="text-xl leading-9 text-slate-700">
              {post.introduction}
            </p>

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 space-y-3 rounded-2xl border border-teal-100 bg-teal-50/70 p-6">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-base leading-7 text-slate-700"
                        >
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-teal-600" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {post.sources && post.sources.length > 0 && (
              <section className="mt-10 border-t border-slate-200 pt-8">
                <h2 className="text-lg font-bold text-slate-950">
                  Sources &amp; further reading
                </h2>
                <ul className="mt-3 space-y-2">
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900 hover:underline"
                      >
                        {source.label}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-12 rounded-2xl border-l-4 border-orange-500 bg-orange-50 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-700">
                The takeaway
              </p>
              <p className="mt-3 text-lg font-semibold leading-8 text-slate-900">
                {post.takeaway}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
              <strong className="text-slate-900">
                Health information notice:
              </strong>{' '}
              This article is for general educational purposes and is not a
              substitute for medical advice, diagnosis, or treatment. Follow the
              instructions of your healthcare professional and equipment
              manufacturer.
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
                <Phone className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-950">
                Need help choosing equipment?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Speak with our local team about rental, purchase, delivery, and
                setup options.
              </p>
              <Button asChild className="mt-5 w-full">
                <a href={contact.phone.href}>Call {contact.phone.display}</a>
              </Button>
              <Link
                href="/contact-us"
                className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900"
              >
                <MapPin className="h-4 w-4" /> Visit or contact us
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
            Keep learning
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Related guides
          </h2>
          <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
