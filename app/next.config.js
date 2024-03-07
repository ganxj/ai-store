
const { withContentlayer } = require("next-contentlayer");
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'supabase.com',
      },
      {
        protocol: 'https',
        hostname: 'crewai.net',
      },
      {
        protocol: 'https',
        hostname: '**.aliyuncs.com',
      },
    ],
  },
  async redirects() {
    return [
      // {
      //   permanent: false,
      //   source: '/',
      //   destination: '/partners/integrations',
      // },
      // Have integrations as the default partners page
      // {
      //   permanent: false,
      //   source: '/partners',
      //   destination: '/partners/integrations',
      // },
    ]
  },
  swcMinify: true,
}

module.exports = withContentlayer(nextConfig);
