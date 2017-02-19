process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const base = require('./default/webpack')
const clients = require('../app/clients')

module.exports = env => {
  return clients[env.client](require(`./${process.env.NODE_ENV}/webpack`)(base))
}
