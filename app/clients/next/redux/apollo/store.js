import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import middlewares from '../middlewares'
import * as reducers from '../reducers'

export function create (apollo, initialState) {
  const { devToolsExtension } = global.window || {}
  return createStore(
    combineReducers({
      ...reducers,
      apollo: apollo.reducer()
    }),
    initialState,
    compose(
      applyMiddleware(apollo.middleware(), ...middlewares),
      devToolsExtension ? devToolsExtension() : f => f
    )
  )
}

export default function (apollo, initialState) {
  if (process.browser) {
    if (!window.store) window.store = create(apollo, initialState)
    return window.store
  } else {
    return create(apollo, initialState)
  }
}
