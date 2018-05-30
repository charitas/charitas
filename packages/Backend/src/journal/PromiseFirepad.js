global.window = {};
const Firepad = require('firepad/dist/firepad');

export default class PromiseFirepad {
  constructor(ref) {
    if (!ref) {
      throw new Error('PromiseFirepad requires a ref when instantiated');
    }
    this.ref = ref;
    this.headless = new Firepad.Headless(this.ref);
  }

  getHtml() {
    return this.getPromise('getHtml');
  }

  getId() {
    return this.ref.key;
  }

  getPromise(method) {
    return new Promise((resolve, reject) => {
      try {
        this.headless[method]((result) => {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getText() {
    return this.getPromise('getText');
  }
}
