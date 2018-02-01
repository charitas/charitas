module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    "strict": 0
  },
  rules: {
    // Forbid the use of extraneous packages https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          'test.{js,jsx}', // repos with a single test file
          'test-*.{js,jsx}', // repos with multiple top-level test files
          '**/*.{test,spec}.{js,jsx}', // tests where the extension denotes that it is a test
          '**/jest.config.js', // jest config
          '**/webpack.config.js', // webpack config
          '**/webpack.config.*.js', // webpack config
          '**/karma.conf.js', // karma config
        ],
        optionalDependencies: false,
      },
    ],
  },
};
