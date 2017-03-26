process.env.NODE_ENV = process.env.NODE_ENV || 'staging'
module.exports = Object.assign({}, require(`./${process.env.NODE_ENV}`))
