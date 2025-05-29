/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app']
    }
  },
  // Ensure static optimization
  output: 'standalone',
  // Optimize for Vercel
  trailingSlash: false,
  // Ensure proper builds
  swcMinify: true,
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig