#!/usr/bin/env node
const koapi = require('koapi/bin/koapi')
const { config } = require('koapi')
const { logger, external: { winston } } = require('koapi')
const fs = require('fs-extra')
const { path } = require('./lib/helper')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

logger.emitErrs = true
logger.on('error', console.error)

fs.ensureDirSync(path.storage('/logs'))

logger.add(winston.transports.File, Object.assign({
  name: 'koapp',
  json: false,
  filename: path.storage('/logs/koapp.log'),
  level: 'info'
}, config.get('logging')))

process.on('unhandledRejection', (reason, p) => {
  logger.error('unhandled rejection', reason, p)
})

koapi()
