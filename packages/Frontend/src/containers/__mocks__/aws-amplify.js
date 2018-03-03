export default class Auth {
  username = 'user'

  password = 'password'

  signIn(username, password) {
    return new Promise((resolve, reject) => {
      if (username === this.username && password === this.password) {
        return resolve();
      }
      return reject();
    });
  }

  currentAuthenticatedUser() {
    return Promise.resolve({ username: this.username });
  }
}
