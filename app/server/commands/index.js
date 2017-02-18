const {default: bullui} = require('./bullui')
const {default: service} = require('./service')
const {default: server} = require('./server')
const {default: universal} = require('./universal')
const {default: building} = require('./building')
const {default: watching} = require('./watching')
const {default: migrate} = require('./migrating')
const {default: example} = require('./example')

module.exports = [
  service,
  server,
  universal,
  bullui,
  building,
  watching,
  migrate,
  example
]
