'use strict'

class LocalJsonStore {
  constructor (namespace, options = {}) {
    this.namespace = namespace
    this.className = options.className
    this.store = options.store || global.localStorage
  }

  async get (key) {
    key = key ? `${this.namespace}.${key}` : this.namespace

    let contents = this.store.getItem(key)

    try {
      contents = JSON.parse(contents)
    } catch (err) {
      return Promise.resolve(null)
    }

    return Promise.resolve()
      .then(() => {
        if (!this.className) {
          return contents // resolve with raw JSON
        }

        if (contents) {
          return this.className.from(contents || {}) // resolve with instance
        } else {
          return null
        }
      })
  }

  async save (key, value) {
    if (!value) {
      value = key
      key = this.namespace
    } else {
      key = key ? `${this.namespace}.${key}` : this.namespace
    }

    const contents = JSON.stringify(value)

    this.store.setItem(key, contents)

    return Promise.resolve(value) // async only to match get()
  }

  clear () {
    // TODO: Clear only items starting with this.namespace
    this.store.clear()
  }
}

module.exports = LocalJsonStore
