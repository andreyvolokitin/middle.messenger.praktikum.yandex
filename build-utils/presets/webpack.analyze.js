/* eslint-disable import/no-extraneous-dependencies */
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  plugins: [new WebpackBundleAnalyzer()],
});
