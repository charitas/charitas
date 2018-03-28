let counter = 0;

class Documents {
  constructor({ id }) {
    if (!id) {
      this.id = counter;
      counter += 1;
    } else {
      this.id = id;
    }
  }
}

module.exports = Documents;
