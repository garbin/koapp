const config = require('../../../../config/service')

exports.default = (config.queues || []).map(queue => require(`./${queue}`).default)
