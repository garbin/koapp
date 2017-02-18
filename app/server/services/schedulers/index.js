const config = require('../../../../config/service')

exports.default = (config.schedulers || []).map(scheduler => require(`./${scheduler}`).default)
