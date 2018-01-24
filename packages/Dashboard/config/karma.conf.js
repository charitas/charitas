const webpackProdConfig = require('./webpack.config.prod.js');
const webpack = require('webpack');
const path = require('path');
const puppeteer = require('puppeteer');
const devManifest = require('../dist/devDependencies.dll.manifest.json');

webpackProdConfig.plugins = [
  new webpack.DllReferencePlugin({
    context: path.resolve(__dirname),
    manifest: devManifest,
  }),
].concat(webpackProdConfig.plugins);

process.env.CHROME_BIN = puppeteer.executablePath();

const testFile = './setup.test.js';
module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    files: [
      {
        pattern: '../dist/dependencies.dll.js/',
        watched: false,
        served: true,
      },
      {
        pattern: '../dist/devDependencies.dll.js/',
        watched: false,
        served: true,
      },
      testFile,
    ],
    frameworks: ['chai', 'mocha'],
    preprocessors: {
      [testFile]: ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: '../../../coverage',
      subdir: '.',
    },
    singleRun: true,
    webpack: webpackProdConfig,
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
