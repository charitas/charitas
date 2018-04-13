const firebase = jest.genMockFromModule('firebase');
const auth = {
  getRedirectResult: jest.fn(() => Promise.resolve()),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => {}),
};

class MockDocument {
  constructor(id) {
    this.id = id;
    this.data = id;
  }
}

const mockQuerySnapshot = [1, 2, 3].map(id => new MockDocument(id));
const firestore = {
  collection: jest.fn(() => ({
    get: jest.fn(() => Promise.resolve(mockQuerySnapshot)),
  })),
};

firebase.auth = () => auth;
firebase.firestore = () => firestore;

module.exports = firebase;
