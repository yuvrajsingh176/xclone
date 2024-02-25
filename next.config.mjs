/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "th.bing.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
// remotePatterns:[{hostname:"th.bing.com"},{hostname:"lh3.googleusercontent.com"}]
