/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      }
    ],
  }
};

export default nextConfig;
