const {default: servers} = require('./servers')
const {default: lint} = require('./lint')
const {default: build} = require('./build')
const {default: watch} = require('./watch')
const {default: database} = require('./database')
const {default: deploy} = require('./deploy')
const {default: example} = require('./example')
const {default: defaultCommand} = require('./default')

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
