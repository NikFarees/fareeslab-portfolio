/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits a minimal standalone server bundle for small Docker images / VPS deploys.
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
