/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "192.168.10.117",
        port: "5015",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
