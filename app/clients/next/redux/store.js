import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import middlewares from './middlewares'
import * as reducers from './reducers'

export function create (initialState) {
  const { devToolsExtension } = global.window || {}
  return createStore(
    combineReducers({ ...reducers }),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      devToolsExtension ? devToolsExtension() : f => f
    )
  )
}

export default function (initialState) {
  if (process.browser) {
    if (!window.store) window.store = create(initialState)
    return window.store
  } else {
    return create(initialState)
  }
}
