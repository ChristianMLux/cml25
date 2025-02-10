import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-image-host.com',
        pathname: '/images/**',
      },
    ],
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'de',
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
