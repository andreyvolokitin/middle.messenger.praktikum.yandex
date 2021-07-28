/* eslint-disable import/no-extraneous-dependencies */
const CompressionPlugin = require('compression-webpack-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  // for options see: https://github.com/webpack-contrib/compression-webpack-plugin#options
  plugins: [new CompressionPlugin()],
});
