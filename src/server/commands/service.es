import cluster from 'throng'
import logger, { winston } from 'koapi/lib/logger'
import { storage } from '../lib/helper'

function runService (services) {
  return function (pid) {
    services.forEach(async service => {
      try {
        service.start(pid)
        process.on('SIGTERM', service.stop.bind(service.stop, pid))
      } catch (e) {
        logger.error(e)
      }
    })
  }
}

function runCommand (services, clusterMode) {
  let master = runService(services.master)
  let worker = runService(services.worker)
  if (clusterMode) {
    logger.info('cluster enabled, workers:%s, PID:', require('os').cpus().length, process.pid)
    cluster({ master, start: worker })
  } else {
    master()
    worker()
  }
}

// see https://github.com/tj/commander.js
export default {
  command: 'service [name]',
  description: 'service',
  options: {
    '-x, --cluster': 'cluster mode'
  },
  action: (name, options, a, b, c) => {
    logger.add(winston.transports.File, {
      name: 'services_error',
      json: false,
      filename: storage('/logs/services_error.log'),
      level: 'error'
    })
    logger.add(winston.transports.File, {
      name: 'services',
      json: false,
      filename: storage('/logs/services_all.log')
    })
    let services = {}
    if (name) {
      let service = require(`../services/${name}`).default
      let start
      let stop
      start = stop = function () {}
      services = {
        master: [{ start, stop }],
        worker: [service]
      }
    } else {
      services = require('../services').default
    }
    runCommand(services, options.cluster)
  }
}
