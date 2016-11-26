import index from './default'
import auth from './auth'
import clients from './oauth/clients'
import token from './oauth/token'
import posts from './posts'
import subdomain from './subdomain'
import cashier from './cashier'

export default [
  subdomain,
  index,
  posts,
  auth,
  token,
  clients,
  cashier
]
