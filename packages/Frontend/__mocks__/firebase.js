const firebase = jest.genMockFromModule('firebase');
const auth = {
  getRedirectResult: jest.fn(() => Promise.resolve()),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => {}),
};

class MockDocument {
  constructor(id) {
    this.id = id;
    this.data = () => this.id;
  }
}

class MockQuerySnapshot {
  constructor(ids) {
    this.docs = ids.map(id => new MockDocument(id));
  }
}

const firestore = {
  collection: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve(new MockQuerySnapshot([1, 2, 3]))),
    add: jest.fn(() => Promise.resolve(new MockDocument(1))),
  })),
};

const database = {
  ref: () => ({
    child: () => {},
    push: () => ({
      key: '',
      on: () => {},
      once: () => {},
    }),
  }),
};

firebase.auth = () => auth;
firebase.firestore = () => firestore;
firebase.database = () => database;

module.exports = firebase;
