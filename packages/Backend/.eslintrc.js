module.exports = {
  extends: 'airbnb-base',
  "env": {
    "node": true,
  },
  overrides: [
    {
      files: ['**/__mocks__/*.js'],
      env: {
        jest: true,
      }
    }
  ]
};
