require('dotenv').config();
const functions = require('firebase-functions');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Document = require('./Document');

const schema = buildSchema(`
  type Document {
    id: ID
  }

  type Query {
    document(id: Int!): Document
  }

  type Mutation {
    document: Document
  }
`);

const rootValue = {
  document: ({ id }) => new Document({ id }),
};

const app = express();
app.use('/v1', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

const api = functions.https.onRequest(app);

module.exports = { api };
