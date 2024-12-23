/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mern-food-app.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};
export default nextConfig;
