import db from './db';

const createId = () => db.insert({}).into('documents').returning('id');

export default class Documents {
  constructor({ id }) {
    if (!id) {
      this.id = createId();
    } else {
      this.id = id;
    }
  }
}
