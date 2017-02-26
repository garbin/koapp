const config = require('../../config/service')

function services (place) {
  return config.services.filter(service => service.place === place).reduce(function (result, service) {
    result.push(require(`./${service.name}`).default(service.config))
    return result
  }, [])
}

exports.default = { master: services('master'), worker: services('worker') }
