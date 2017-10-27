import cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import config from '../config'

if (!process.browser) global.fetch = fetch

export function create (token) {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    token = token || cookies.get('access_token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }
  })
  const link = createHttpLink({ uri: config.graphql, opts: { credentials: 'same-origin' } })
  return new ApolloClient({
    link: authLink.concat(link),
    ssrMode: false,
    cache: new InMemoryCache().restore(process.browser ? window.__APOLLO_STATE__ : {})
  })
}

export default function (token) {
  if (process.browser) {
    if (!window.apollo) window.apollo = create(token)
    return window.apollo
  } else {
    return create(token)
  }
}
