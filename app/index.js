#!/usr/bin/env node
const { cli, config, logger, external: { winston } } = require('koapi')
const fs = require('fs-extra')
const { path } = require('./lib/helper')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

logger.emitErrs = true
logger.on('error', console.error)

fs.ensureDirSync(path.storage('/logs'))

logger.add(
  new winston.transports.File(
    {
      name: 'koapp',
      json: false,
      filename: path.storage('/logs/koapp.log'),
      level: 'info'
    },
    config.get('logging')
  )
)

process.on('unhandledRejection', (reason, p) => {
  logger.error('unhandled rejection', reason, p)
})

cli(require('./commands'), { strict: false, default: ['app'] })
