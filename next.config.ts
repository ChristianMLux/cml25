/** @type {import('next').NextConfig} */

const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("@next/bundle-analyzer")({ enabled: true })
    : (config: import("next").NextConfig) => config;

const nextConfig: import("next").NextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@headlessui/react",
      "i18next",
      "react-i18next",
    ],
  },
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  poweredByHeader: false,

  output: "standalone",

  async headers() {
    return [
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.usedExports = true;

      config.resolve.alias = {
        ...config.resolve.alias,
        lodash: "lodash-es",
      };

      if (config.optimization.splitChunks) {
        config.optimization.splitChunks.cacheGroups = {
          ...config.optimization.splitChunks.cacheGroups,
          framerMotion: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: "framer-motion",
            priority: 10,
            chunks: "all",
          },
          i18n: {
            test: /[\\/]node_modules[\\/](i18next|react-i18next)[\\/]/,
            name: "i18n",
            priority: 10,
            chunks: "all",
          },
        };
      }
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
