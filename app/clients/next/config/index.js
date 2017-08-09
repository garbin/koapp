const env = process.env.NODE_ENV || 'development'
const api = 'http://localhost:8000'

const defaults = { basename: '/', api }

module.exports = Object.assign(defaults, require(`./${env}`))
