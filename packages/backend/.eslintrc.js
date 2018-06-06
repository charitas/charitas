module.exports = {
  extends: ['airbnb-base', 'plugin:promise/recommended'],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['**/__mocks__/*.js', '**/*.test.js'],
      env: {
        jest: true,
      }
    }
  ],
  plugins: ['promise'],
};
