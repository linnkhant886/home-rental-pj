/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "qtabhojmjazgfvjazxbe.supabase.co",
      },
    ],
  },
};

export default nextConfig;
