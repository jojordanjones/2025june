import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
}

export default withPWA({
  ...config,
  dest: 'public',
  register: true,
  skipWaiting: true,
})
