process.env.NODE_ENV = process.env.NODE_ENV || 'development'
module.exports = (path = 'index', base = {}) => {
  const defaults = require(`./defaults/${path}`)
  const env = require(`./${process.env.NODE_ENV}/${path}`)
  return Object.assign({}, base,
    defaults instanceof Function ? defaults(base) : defaults,
    env instanceof Function ? env(base) : env
  )
}
