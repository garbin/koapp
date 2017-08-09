import Router from 'next/router'
import qs from 'query-string'
import env from 'exenv'
export default store => next => action => {
  if (env.canUseDOM) {
    if (/_REJECTED$/.test(action.type)) {
      try {
        if (action.payload.response.status === 403) {
          return Router.push('/session/forbidden')
        } else if (action.payload.response.status === 401) {
          if (window.location.pathname !== '/session/signin') {
            return Router.push(`/session/signin?prev=${window.location.href}`)
          }
        } else if (action.payload.response.status === 416) {
          const {router: {location}} = store.getState()
          let query = qs.parse(location.search)
          delete query.page
          console.error('Error', action.payload.response.data.message)
          return Router.push({...location, search: qs.stringify(query)})
        } else {
          console.error('Error', action.payload.response.data.message)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
  return next(action)
}
