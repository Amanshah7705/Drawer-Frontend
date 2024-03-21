/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API: process.env.NEXT_PUBLIC_BACKEND_URL
    },
};

export default nextConfig;
