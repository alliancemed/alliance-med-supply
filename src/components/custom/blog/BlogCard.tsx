import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/blog';
import { formatBlogDate } from '@/lib/blog';
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
        aria-label={`Read ${post.title}`}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
        <Badge className="absolute left-4 top-4 border-0 bg-white/95 px-3 py-1 text-teal-700 shadow-sm backdrop-blur">
          {post.category}
        </Badge>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-teal-600" />
            {formatBlogDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-orange-500" />
            {post.readingTime}
          </span>
        </div>

        <h2 className="mt-4 text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-teal-700">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-teal-700 transition-colors hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4"
        >
          Read the guide
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
