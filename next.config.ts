import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ecommerce-pdb-images.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'authjs.dev',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1.0/:path*',
        destination: 'http://44.201.187.225:8001/api/v1.0/:path*',
      },
      {
        source: '/api/v2.0/:path*',
        destination: 'http://44.201.187.225:8001/api/v2.0/:path*',
      },
    ];
  },
};

export default nextConfig;
