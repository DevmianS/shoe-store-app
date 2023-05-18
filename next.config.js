/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nikearprod.vtexassets.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'shoes-shop-strapi.herokuapp.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
