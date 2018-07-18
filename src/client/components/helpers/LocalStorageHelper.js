class LocalStorageHelper {
  constructor() {
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  get(key) {
    const store = window.localStorage;
    return store.getItem(key);
  }

  set(key, data) {
    const store = window.localStorage;
    store.setItem(key, data);
  }

  remove(key) {
    const store = window.localStorage;
  }
}

export default LocalStorageHelper;
