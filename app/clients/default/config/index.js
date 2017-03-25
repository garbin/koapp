const env = process.env.NODE_ENV || 'development'
const api = 'http://localhost:5000'

const defaults = {
  api,
  oauth: {
    client_id: '123',
    client_secret: '123',
    url: api,
    providers: {
      github: '/auth/github'
    }
  }
}

module.exports = Object.assign(defaults, require(`./${env}`))
