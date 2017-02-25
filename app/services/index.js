const service = require('../../config/service')

function services (config) {
  return Object.entries(config).reduce(function (result, [name, config]) {
    result.push(require(`./${name}`).default)
    return result
  }, [])
}

exports.default = { master: services(service.master), worker: services(service.worker) }
