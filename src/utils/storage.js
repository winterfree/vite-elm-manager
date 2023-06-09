/**
 * Storage二次封装
 * @author Richard Yan
 */

import env from './../config/env'

export default {
  setItem(key, val) {
    let storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(env.namespace, JSON.stringify(storage[key]))
  },
  getItem(key) {
    return this.getStorage()[key]
  },
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(env.namespace, JSON.stringify(storage[key]))
  },
  clearAll() {
    window.localStorage.clear()
  },
  getStorage() {
    return JSON.parse(window.localStorage.getItem(env.namespace)  || '{}')
  }
}