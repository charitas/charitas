const functions = require('firebase-functions');
const express = require('express');

const app = express();
app.get('*', (req, res) => {
  res.send('Hello World!');
});

const api = functions.https.onRequest(app);

module.exports = { api };
