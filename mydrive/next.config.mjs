import path from 'path';

const nextConfig = {
  // Add other configurations here if necessary
  pageExtensions: ['js', 'jsx'],
  webpack: (config, { isServer }) => {
    // Resolve src/app/pages as the pages directory
    config.resolve.alias['@pages'] = path.join(process.cwd(), 'src/app/pages');
    return config;
  },
};

export default nextConfig;
