/** @type {import('next').NextConfig} */
const nextConfig = {
  // Commenté temporairement pour permettre les API routes
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
