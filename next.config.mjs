/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all HTTPS images
      },
      {
        protocol: 'http',
        hostname: '**', // allow all HTTP images (optional, not recommended for production)
      },
    ],
  },
};

export default nextConfig;

