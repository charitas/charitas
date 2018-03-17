const firebase = jest.genMockFromModule('firebase');
const auth = {
  getRedirectResult: jest.fn(() => Promise.resolve()),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => {}),
};

firebase.auth = () => auth;

module.exports = firebase;
