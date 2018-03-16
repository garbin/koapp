import { api } from '../../lib/helper'
export default {
  state: {},
  effects: {
    async get (payload, rootState) {
      const response = await api.get(payload.path, payload.config)
      console.log(payload, '-----', rootState, response)
      return {}
    }
  }
}

// const { type } = action
// const reg = new RegExp(`API_(GET|LIST|CLEAR|PATCH|POST|DESTROY)_(.*?)_(PENDING|REJECTED|FULFILLED)$`)
// if (reg.test(type)) {
//   const match = type.match(reg)
//   const name = match[2].toLowerCase()
//   if (['CLEAR', 'DESTROY'].includes(match[1]) && match[3] === 'FULFILLED') {
//     let newState = { ...state }
//     delete newState[name]
//     return newState
//   } else {
//     let response = {
//       status: match[3].toLowerCase(),
//       response: action.payload && (action.payload.data || action.payload)
//     }
//     if (action.payload &&
//       action.payload.headers &&
//       action.payload.headers['content-range']) {
//       response.range = contentRange.parse(action.payload.headers['content-range'])
//     }
//     return {...state, [name]: response}
//   }
// }
// return state
