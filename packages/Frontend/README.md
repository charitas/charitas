# Dashboard

## Initial requirements

##### Latest Node.js LTS

Node is required to run the build process. This repo is tested with the latest LTS release of Node, but older versions may work. You can download Node [here](https://nodejs.org/en/download/).

##### Yarn

Yarn is required to install dependencies, follow the instructions [here](https://yarnpkg.com/en/docs/install) to install. Repo is tested with Yarn 1.3.2.

## Getting Started

First clone this repo:
```bash
git clone https://github.com/TheSourceOfTruth/Dashboard
```

Then install dependencies with yarn:
```bash
yarn
```

Run bootstrap to build dependency bundles with Webpack:
```bash
yarn bootstrap
```

## Developing

#### Starting

To start developing run:
```bash
yarn start
```
which will build the app with Webpack, start a webserver, and open up the app in your browser. Keep this process running in the background. Hot reloading is enabled, as long as the process is running changes should happen near instantly without a refresh and without losing application state.

#### Testing

##### Create tests

To create tests make a new file next to the file or component you want to test, named the same, but ending with test.js or test.jsx instead of just .js or .jsx. For example, if we wanted to write tests for App.jsx, we would create App.test.jsx next to it in it's directory.

##### Start tests

For development it's best to run the tests in a watch by running:
```bash
yarn test-watch
```
or alternatively, to just run the tests once:
```bash
yarn test
```

## Build for production

To build the app for production, run:
```bash
yarn build
```
which will build the app and place all transpiled files into the dist folder.

## Troubleshooting
Sometimes it may be helpful to reinstall and rebuild the dependencies, especially after pulling in new changes.

To do so, from the root of the project run:
```bash
yarn clean && rm -rf node_modules && yarn && yarn bootstrap
```
