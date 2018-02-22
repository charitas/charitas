require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const template = require('html-webpack-template');

const outputPath = path.resolve(__dirname, '..', 'dist');
module.exports = {
  entry: ['react-hot-loader/patch', './src/index.jsx'],
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      inject: false,
      links: ['https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css'],
      template,
      title: 'Dashboard',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.AWS_AUTH_IDENTIYPOOLID': JSON.stringify(process.env.AWS_AUTH_IDENTIYPOOLID),
      'process.env.AWS_AUTH_REGION': JSON.stringify(process.env.AWS_AUTH_REGION),
      'process.env.AWS_AUTH_USERPOOLID': JSON.stringify(process.env.AWS_AUTH_USERPOOLID),
      'process.env.AWS_AUTH_USERPOOLWEBCLIENTID': JSON.stringify(process.env.AWS_AUTH_USERPOOLWEBCLIENTID),
    }),
  ],
  output: {
    path: outputPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
