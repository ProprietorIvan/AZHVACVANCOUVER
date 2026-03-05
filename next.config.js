/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: '.next',
  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [75, 85, 90, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/ac-repair-vancouver',
        destination: '/hvac',
        permanent: true,
      },
      {
        source: '/ac-installation-vancouver',
        destination: '/hvac',
        permanent: true,
      },
      {
        source: '/services/restoration-services',
        destination: '/hvac',
        permanent: true,
      },
      {
        source: '/furnace-installation-vancouver',
        destination: '/furnace-repair-vancouver',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
