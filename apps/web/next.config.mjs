/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@ai-sentence-app/shared-types'],
}

module.exports = nextConfig