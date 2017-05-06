const servers = require('./servers')
const lint = require('./lint')
const build = require('./build')
const watch = require('./watch')
const database = require('./database')
const deploy = require('./deploy')
const example = require('./example')
const defaultCommand = require('./default')

module.exports = [
  servers,
  lint,
  build,
  watch,
  database,
  deploy,
  example,
  defaultCommand
]
