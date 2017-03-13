import { push } from 'react-router-redux'
export default store => next => action => {
  if (/_REJECTED$/.test(action.type)) {
    if (action.payload.response.status === 403) {
      return store.dispatch(push('/unauthorizated'))
    }
  }
  return next(action)
}
