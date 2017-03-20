#!/usr/bin/env node
const koapi = require('koapi/bin/koapi')
const { logger, external: { winston } } = require('koapi')
const fs = require('fs-extra')
const { storage } = require('./lib/helper')
const config = require('../config')

logger.emitErrs = true
logger.on('error', console.error)

fs.ensureDirSync(storage('/logs'))

logger.add(winston.transports.File, Object.assign({
  name: 'koapp',
  json: false,
  filename: storage('/logs/koapp.log'),
  level: 'info'
}, config.logging))

process.on('unhandledRejection', (reason, p) => {
  logger.error('unhandled rejection', reason, p)
})

koapi()
