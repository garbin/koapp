#!/usr/bin/env node
const koapi = require('koapi/bin/koapi')
const { logger, external: { winston } } = require('koapi')
const fs = require('fs-extra')
const { storage } = require('./lib/helper')

logger.emitErrs = true
logger.on('error', console.error)

fs.ensureDirSync(storage('/logs'))
logger.add(winston.transports.File, {
  name: 'error',
  json: false,
  filename: storage('/logs/all_error.log'),
  level: 'error'
})

process.on('unhandledRejection', (reason, p) => {
  logger.error('unhandled rejection', reason, p)
})

koapi()
