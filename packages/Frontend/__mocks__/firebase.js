const firebase = jest.genMockFromModule('firebase');
const auth = {
  getRedirectResult: jest.fn(() => Promise.resolve()),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => {}),
};

class MockDocument {
  constructor() {
    this.exists = true;
  }
  data = () => {}
}

class MockDocumentReference {
  constructor(id) {
    this.id = id;
  }
  data = () => this.id;
  get = () => Promise.resolve(new MockDocument());
  onSnapshot = (callback) => { callback(new MockDocument()); }
}

class MockQuerySnapshot {
  constructor(ids) {
    this.ids = ids;
    this.docs = this.ids.map(id => new MockDocumentReference(id));
  }
}

class MockCollectionReference {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }
  get = jest.fn(() => Promise.resolve(new MockQuerySnapshot([1, 2, 3])));
  add = jest.fn(() => Promise.resolve(new MockDocumentReference(1)));
  doc = jest.fn(() => new MockDocumentReference(2));
}

class Firestore {
  constructor() {
    this.collection = collectionName => new MockCollectionReference(collectionName);
  }
}

const firestore = new Firestore();

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
