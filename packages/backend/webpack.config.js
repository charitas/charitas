const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const whitelist = [/@the-source-of-truth/];
const DEVELOPMENT = 'development';
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  // we need to use nodeExternals twice here,
  // once for Backend node_modules and again
  // for node_modules in the root directory
  externals: [
    nodeExternals({ whitelist }),
    nodeExternals({ modulesDir: '../../node_modules', whitelist }),
  ],
  mode: DEVELOPMENT,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['babel-preset-env', {
                targets: {
                  node: '6.11.5',
                },
              }],
            ],
          },
        },
        exclude: /node_modules\/(?!@the-source-of-truth)/,
      },
    ],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(DEVELOPMENT),
      'process.env.FB_DATABASE_URL': JSON.stringify(process.env.FB_DATABASE_URL),
    }),
  ],
  resolve: {
    symlinks: false,
  },
  target: 'node',
};
