const search = require('./search')
const posts = require('./posts')

module.exports = Object.assign(
  {},
  posts,
  search
)
