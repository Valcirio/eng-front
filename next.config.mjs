/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_ENV: process.env.NEXT_ENV,
    BACKEND_DIR: process.env.BACKEND_DIR
  }
}

export default nextConfig
