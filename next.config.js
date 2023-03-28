/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    domains: ['i.pinimg.com', 'news.airbnb.com',
      'gambrick.com', 'pipcke.fr',
      'images.unsplash.com', 'i.etsystatic.com',
      'www.lesaffichistes.com', 'lafficherie.com'],
  }
}

module.exports = nextConfig;