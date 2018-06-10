# TheSourceOfTruth

## Initial requirements

##### Latest Node.js LTS

Node is required to run the build process. This repo is tested with the latest LTS release of Node, but older versions may work. You can download Node [here](https://nodejs.org/en/download/).

##### Yarn

Yarn is required to install dependencies, follow the instructions [here](https://yarnpkg.com/en/docs/install) to install. Repo is tested with Yarn 1.3.2.

##### Firebase

A Firebase project with firestore, the realtime database, Google sign, anonymous sign in, and cloud functions enabled.

## Setup

Copy the example.env file in the root of this reposity to a new file called .env. Fill out the environmental varibles defined in the .env file with your firebase project information.

Copy the example.firebaserc to .firebaserc and change the project id to match your firebase project id.
