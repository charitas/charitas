module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },

  setupTestFrameworkScriptFile: './config/setup.test.js',
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testPathIgnorePatterns: [
    '/node_modules',
    './config/setup.test.js',
  ],
};
