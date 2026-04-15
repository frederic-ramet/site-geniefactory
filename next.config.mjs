/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
    ],
  },
  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
