import { https } from 'firebase-functions';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import Document from './Document';

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

const api = https.onRequest(app);

module.exports = { api };
