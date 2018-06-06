const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');

// this is necessary because our shared dependency is bundled with webpack
// however Google Cloud Functions will try to install everything in our
// package.json, which isn't in the npm registry, so it throws an error.
// Removing this from the package.json lets gets around the error.
delete pkg.dependencies['@the-source-of-truth/shared'];
const dist = path.resolve(__dirname, '../dist');

const writePackageJsonToDist = () => {
  fs.writeFileSync(`${dist}/package.json`, JSON.stringify(pkg, null, 2));
};

if (fs.existsSync(dist)) {
  writePackageJsonToDist();
} else {
  fs.mkdirSync(dist);
  writePackageJsonToDist();
}
