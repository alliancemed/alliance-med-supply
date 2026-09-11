import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  async redirects() {
    return [
      // =============================================
      // Old www.alliancemedsupply.com pages (Wix site)
      // =============================================

      // Core pages
      { source: '/home', destination: '/', permanent: true },
      { source: '/about', destination: '/about-us', permanent: true },
      {
        source: '/map-directions',
        destination: '/contact-us',
        permanent: true,
      },
      { source: '/gallery', destination: '/', permanent: true },
      { source: '/terms-conditions', destination: '/', permanent: true },

      // Old product/rental pages → matching new categories
      { source: '/rentals', destination: '/products', permanent: true },
      { source: '/shop', destination: '/products', permanent: true },
      {
        source: '/wheelchair-rentals',
        destination: '/products/wheelchairs',
        permanent: true,
      },
      {
        source: '/hospital-bed-rentals',
        destination: '/products/electric-hospital-beds-and-mattresses',
        permanent: true,
      },
      {
        source: '/rentals/hospital-beds',
        destination: '/products/electric-hospital-beds-and-mattresses',
        permanent: true,
      },
      {
        source: '/rollator',
        destination: '/products/rollators',
        permanent: true,
      },
      {
        source: '/walker-rentals',
        destination: '/products/rollators',
        permanent: true,
      },
      {
        source: '/power-chair',
        destination: '/products/electric-wheelchairs',
        permanent: true,
      },
      {
        source: '/scooters',
        destination: '/products/mobility-scooters',
        permanent: true,
      },
      {
        source: '/lift-chair',
        destination: '/products/lift-chair',
        permanent: true,
      },
      {
        source: '/hoyer-lift',
        destination: '/products/stand-assists-and-lifts',
        permanent: true,
      },

      // Old product pages → best matching category
      {
        source: '/low-air-loss-matress',
        destination: '/products/electric-hospital-beds-and-mattresses',
        permanent: true,
      },
      {
        source: '/alternating-pressure-pad-and-pump',
        destination: '/products/electric-hospital-beds-and-mattresses',
        permanent: true,
      },

      // Discontinued/specialty products → products page
      { source: '/laser-touch-one', destination: '/products', permanent: true },
      {
        source: '/cold-circulating-unit',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/suction-machine',
        destination: '/products',
        permanent: true,
      },

      // Old service pages → contact
      {
        source: '/home-assesment',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/parts-repair',
        destination: '/contact-us',
        permanent: true,
      },

      // Wix placeholder product pages
      {
        source: '/product-page/:slug',
        destination: '/products',
        permanent: true,
      },

      // Wix internal API routes
      { source: '/_api/:path*', destination: '/', permanent: true },

      // =============================================
      // Old store.alliancemedsupply.com (Booqable store)
      // These only work if the store subdomain is pointed
      // at this Vercel deployment.
      // =============================================
      {
        source: '/web_store/items/:id(\\d+)',
        destination: 'https://www.alliancemedsupply.com/products',
        has: [{ type: 'host', value: 'store.alliancemedsupply.com' }],
        permanent: true,
      },
      {
        source: '/web_store/about_us',
        destination: 'https://www.alliancemedsupply.com/about-us',
        has: [{ type: 'host', value: 'store.alliancemedsupply.com' }],
        permanent: true,
      },
      {
        source: '/users/sign_in',
        destination: 'https://www.alliancemedsupply.com/',
        has: [{ type: 'host', value: 'store.alliancemedsupply.com' }],
        permanent: true,
      },
      {
        source: '/:path*',
        destination: 'https://www.alliancemedsupply.com/products',
        has: [{ type: 'host', value: 'store.alliancemedsupply.com' }],
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
