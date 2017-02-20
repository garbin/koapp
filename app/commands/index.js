const {default: bullui} = require('./bullui')
const {default: service} = require('./service')
const {default: server} = require('./server')
const {default: universal} = require('./universal')
const {default: lint} = require('./lint')
const {default: build} = require('./build')
const {default: watch} = require('./watch')
const {default: database} = require('./database')
const {default: example} = require('./example')

module.exports = [
  service,
  server,
  universal,
  bullui,
  lint,
  build,
  watch,
  database,
  example
]
