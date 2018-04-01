const knex = require('./db');

const createId = () => knex.insert({}).into('documents').returning('id');

class Documents {
  constructor({ id }) {
    if (!id) {
      this.id = createId();
    } else {
      this.id = id;
    }
  }
}

module.exports = Documents;
