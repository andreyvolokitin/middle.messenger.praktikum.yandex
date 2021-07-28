/**
 * - https://github.com/samccone/bundle-buddy
 * - https://github.com/danvk/source-map-explorer
 * - https://survivejs.com/webpack/optimizing/build-analysis/
 */

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const settings = require('./settings');

const cssDist = path.normalize(settings.paths.dist.css);
const jsDist = path.normalize(settings.paths.dist.js);

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  output: {
    filename: `${jsDist}/[name].[chunkhash:8].bundle.js`,
    chunkFilename: `${jsDist}/[name].[chunkhash:8].chunk.js`,
    publicPath: '',
  },
  devtool: 'source-map',
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../static',
          globOptions: {
            ignore: ['**.html'],
          },
        },
      ],
    }),
    new WebpackManifestPlugin(),
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
    // https://github.com/webpack/webpack/issues/7300
    new RemoveEmptyScriptsPlugin({
      extensions: ['less', 'scss', 'css', 'css.js'],
    }),
    new MiniCssExtractPlugin({
      filename: `${cssDist}/[name].[contenthash:8].css`,
    }),
  ],
});
