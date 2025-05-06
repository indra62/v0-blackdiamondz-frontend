/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging.cms.black-diamondz.62dev.org",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// Add additional remote patterns based on environment variables
if (process.env.NEXT_PUBLIC_DIRECTUS_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_DIRECTUS_URL);
    // Check if the hostname is different from what we've already configured
    if (url.hostname !== "staging.cms.black-diamondz.62dev.org") {
      nextConfig.images.remotePatterns.push({
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: process.env.NEXT_DIRECTUS_PORT || "",
        pathname: "/assets/**",
      });
    }
  } catch (e) {
    console.error("Invalid NEXT_PUBLIC_DIRECTUS_URL:", e);
  }
}

module.exports = nextConfig;
