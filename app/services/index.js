const {default: queue} = require('./queues')
const {default: scheduler} = require('./schedulers')

exports.default = { master: [scheduler], worker: [queue] }
