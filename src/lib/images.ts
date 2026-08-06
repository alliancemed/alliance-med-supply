// =============================================================================
// CENTRALIZED IMAGE REGISTRY
// =============================================================================
// All image URLs are resolved through this module.
//
// - In production builds, images are served from Vercel Blob storage.
// - In local development (`npm run dev`), images are served from /public/images/.
// - To test blob images locally, use `npm run dev:blob`.

const BLOB_BASE =
  'https://hyaoe8wf3j6cjdcn.public.blob.vercel-storage.com/alliance-med';

/**
 * Whether to use Vercel Blob storage URLs for images.
 *
 * True when:
 *   1. Running a production build (NODE_ENV === 'production'), OR
 *   2. NEXT_PUBLIC_USE_BLOB_IMAGES is explicitly set to 'true'
 *      (e.g. via `npm run dev:blob`)
 */
const useBlob =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_USE_BLOB_IMAGES === 'true';

/**
 * Resolve an image path to the appropriate URL based on the environment.
 *
 * @param path - Relative image path, e.g. '/categories/rollator.png'
 * @returns    Full URL string (blob or local)
 *
 * @example
 *   img('/categories/rollator.png')
 *   // production → 'https://hyaoe8wf3j6cjdcn.../alliance-med/categories/rollator.png'
 *   // local dev  → '/images/categories/rollator.png'
 */
export function img(path: string): string {
  // Assets bundled directly in /public are already rooted at their final URL.
  // This is useful for new uploads that are not stored in Vercel Blob.
  if (path.startsWith('/site-assets/')) {
    return path;
  }

  return useBlob ? `${BLOB_BASE}${path}` : `/images${path}`;
}

// =============================================================================
// NAMED IMAGE CONSTANTS
// =============================================================================
// Use these for commonly referenced images to get autocomplete & typo safety.

export const IMAGES = {
  // SEO / Open Graph
  ogHome: img('/seo/home-ogImage.png'),

  // Branding
  van: img('/branding/van.png'),

  // Hero Section
  hero1: img('/hero-section/hero-1.jpg'),
  hero2: img('/hero-section/hero-2.png'),
  hero3: img('/hero-section/hero-3.png'),
  hero6: img('/hero-section/hero-6.jpg'),
} as const;
