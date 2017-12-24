const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('../package.json');

const outputPath = path.join(__dirname, '../dist');

module.exports = {
  context: process.cwd(),
  entry: {
    dependencies: Object.keys(pkg.dependencies),
    devDependencies: ['enzyme', 'enzyme-adapter-react-16', 'chai'],
  },

  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      path: path.join(outputPath, '[name].dll.manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new UglifyJsPlugin(),
  ],
};
