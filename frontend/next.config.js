/* eslint-disable @typescript-eslint/no-var-requires */

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withImages = require('next-images')

const config = {
  /**
   * Custom Webpack Config
   * https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
   */
  webpack(config, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(
         new ForkTsCheckerWebpackPlugin()
      );
    }

    return config;
  },

  env: {
    SOUNDER_API: "http://localhost:8000"
  }
};

module.exports = withImages(config)