/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Docker uses the standalone server. Vercel builds Next itself.
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
};
export default nextConfig;
