const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = {
  nextConfig,
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
};
