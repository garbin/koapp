process.env.NODE_ENV = process.env.NODE_ENV || 'staging'
const defaults = {
  hosts: [],
  pm2: {}
}
module.exports = Object.assign(defaults, require(`./${process.env.NODE_ENV}`))
