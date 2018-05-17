import cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import config from '../config'

if (!process.browser) global.fetch = fetch

export function create (token, initialState = {}) {
  return new ApolloClient({
    link: createHttpLink({ uri: config.graphql }),
    fetchOptions: {
      credentials: 'same-origin'
    },
    request: async operation => {
      token = token || cookies.get('access_token')
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : null
        }
      })
    },
    cache: new InMemoryCache().restore(
      process.browser ? window.__NEXT_DATA__.props.apolloState : initialState
    )
  })
}

export default function (token, initialState = {}) {
  if (process.browser) {
    if (!window.apollo) window.apollo = create(token, initialState)
    return window.apollo
  } else {
    return create(token, initialState)
  }
}
