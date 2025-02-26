/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.ftbs5-3.fna.fbcdn.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "scontent.ftbs5-2.fna.fbcdn.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "scontent.ftbs5-1.fna.fbcdn.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "fbcdn.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
