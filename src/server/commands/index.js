const {default: bullui} = require('./bullui')
const {default: service} = require('./service')
const {default: server} = require('./server')
const {default: universal} = require('./universal')
const {default: build} = require('./build')
const {default: watch} = require('./watch')
const {default: migrate} = require('./migrate')
const {default: example} = require('./example')

exports.default = [
  service,
  server,
  universal,
  bullui,
  build,
  watch,
  migrate,
  example
]
