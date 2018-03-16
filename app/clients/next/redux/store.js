import { init } from '@rematch/core'
import middlewares from './middlewares'
import * as reducers from './reducers'
import * as models from './models'

export function create (initialState) {
  return init({
    models,
    redux: {
      reducers,
      initialState,
      middlewares
    }
  })
}

export default function (initialState) {
  if (process.browser) {
    if (!window.store) window.store = create(initialState)
    return window.store
  } else {
    return create(initialState)
  }
}
