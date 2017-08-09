import cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import config from '../../config'

if (!process.browser) global.fetch = fetch

export function create (token) {
  const networkInterface = createNetworkInterface({
    uri: config.graphql, // Server URL (must be absolute)
    opts: { // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    }
  })
  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }
      token = token || cookies.get('access_token')
      if (token) {
        req.options.headers['authorization'] = `Bearer ${token}`
      }
      next()
    }
  }])
  return new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface
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
