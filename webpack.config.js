require('core-js/stable');
require('regenerator-runtime/runtime');

const path = require('path');
const { merge, mergeWithCustomize, customizeArray } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const loadPresets = require('./build-utils/loadPresets');
// eslint-disable-next-line import/no-dynamic-require, global-require
const modeConfig = (mode) => require(`./build-utils/webpack.${mode}.js`)(mode);
const settings = require('./build-utils/settings');

const entries = {
  main: './index.ts',
};

module.exports = ({ mode = 'production', presets = [] } = {}) =>
  merge(
    {
      mode,
      context: path.resolve(__dirname, settings.paths.src.base),
      entry: entries,
      output: {
        path: path.resolve(__dirname, settings.paths.dist.base),
      },
      resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          handlebars: 'handlebars/dist/handlebars.js',
        },
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /(node_modules)/,
            use: ['ts-loader', 'eslint-loader'],
          },
          {
            test: /\.(css|scss)$/,
            use: [
              {
                loader: mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: mode === 'production',
                  importLoaders: 2,
                  url: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: mode === 'production',
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    outputStyle: 'expanded',
                  },
                },
              },
            ],
          },
          // https://webpack.js.org/guides/asset-modules/
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            type: 'asset/resource',
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: '../static/index.html',
          publicPath: '/',
        }),
      ],
    },
    mergeWithCustomize({
      customizeArray: customizeArray({
        'module.rules': 'replace',
      }),
    })(modeConfig(mode), loadPresets({ mode, presets }))
  );
