import { api } from '../lib/helper'
export default {
  state: {},
  effects: {
    async get (resource, config) {
      return api.get(resource, config)
    }
  }
}
