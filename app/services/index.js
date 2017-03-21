const cluster = require('throng')
const config = require('../../config/service')
const { logger } = require('koapi')

exports.start = (enabled = [], clusterMode = false) => {
  if (enabled.length === 0) {
    return logger.info('No services will be started')
  }
  const masterServices = []
  const workerServices = []
  enabled.forEach(({name, config}) => {
    const service = Object.assign(
      { master: e => e, disconnect: e => e },
      require(`./${name}`).default(config))
    masterServices.push(service.master)
    workerServices.push(service.worker)
  })
  const master = pid => masterServices.forEach(service => service(pid))
  const worker = pid => workerServices.forEach(service => service(pid))
  if (clusterMode) {
    cluster({ master, start: worker })
  } else {
    master(process.pid); worker(process.pid)
  }
}

if (require.main === module) exports.start(config.services, config.cluster)
