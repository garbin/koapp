import contentRange from 'content-range'

function errorResponse (e) {
  const {status, statusText, headers, data} = e.response
  return { status, statusText, headers, data }
}

export default (state = {}, action) => {
  const { type } = action
  const reg = new RegExp(`API_(GET|LIST|CLEAR|PATCH|POST|DESTROY)_(.*?)_(PENDING|REJECTED|FULFILLED)$`)
  if (reg.test(type)) {
    const match = type.match(reg)
    const name = match[2].toLowerCase()
    if (['CLEAR', 'DESTROY'].includes(match[1]) && match[3] === 'FULFILLED') {
      let newState = { ...state }
      delete newState[name]
      return newState
    } else {
      const status = match[3].toLowerCase()
      let response = {
        status,
        response: status !== 'rejected'
          ? action.payload && (action.payload.data || action.payload)
          : errorResponse(action.payload)
      }
      if (action.payload &&
        action.payload.headers &&
        action.payload.headers['content-range']) {
        response.range = contentRange.parse(action.payload.headers['content-range'])
      }
      return {...state, [name]: response}
    }
  }
  return state
}
