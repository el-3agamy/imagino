import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dbzgttt8p/image/upload/**',
      },
    ],
  },
};

export default nextConfig;
