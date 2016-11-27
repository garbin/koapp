import cluster from 'throng'
import log from 'winston'

function runService (services) {
  return function (pid) {
    services.forEach(service => {
      service.start(pid)
      process.on('SIGTERM', service.stop.bind(service.stop, pid))
    })
  }
}

function runCommand (services, clusterMode) {
  let master = runService(services.master)
  let worker = runService(services.worker)
  if (clusterMode) {
    log.info('cluster enabled, workers:%s, PID:', require('os').cpus().length, process.pid)
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
