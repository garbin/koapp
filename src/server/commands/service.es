import cluster from 'throng'
import _ from 'lodash'
import log from 'winston'

function run_service(services) {
  return function (pid) {
    services.forEach(function (service) {
      service.start(pid);
      process.on('SIGTERM', service.stop.bind(service.stop, pid));
    });
  }
}

function run_command(services, cluster_mode) {
  var master = run_service(services.master);
  var worker = run_service(services.worker);
  if (cluster_mode) {
    log.info('cluster enabled, workers:%s, PID:', require('os').cpus().length, process.pid);
    cluster({ master, start: worker });
  } else {
    master();
    worker();
  }
}

// see https://github.com/tj/commander.js
export default {
  command: 'service [name]',
  description: 'service',
  options:{
    '-x, --cluster': 'cluster mode'
  },
  action: (name, options, a, b, c) => {
    var services = {};
    if (name) {
      var service = require('../services/' + name).default;
      var start, stop;
          start = stop = function(){};
      services = {
        master: [ {start, stop} ],
        worker: [ service ]
      };
    } else {
      services = require('../services').default;
    }
    run_command(services, options.cluster);
  }
};
