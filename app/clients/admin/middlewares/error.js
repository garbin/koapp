import { push } from 'react-router-redux'
import { toastr } from 'react-redux-toastr'
import qs from 'query-string'
export default store => next => action => {
  if (/_REJECTED$/.test(action.type)) {
    if (action.payload.response.status === 403) {
      return store.dispatch(push('/unauthorizated'))
    } else if (action.payload.response.status === 416) {
      const {router: {location}} = store.getState()
      let query = qs.parse(location.search)
      delete query.page
      toastr.error(action.payload.response.data.message)
      return store.dispatch(push({...location, search: qs.stringify(query)}))
    } else {
      toastr.error(action.payload.response.data.message)
    }
  }
  return next(action)
}
