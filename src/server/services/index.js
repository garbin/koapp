const {default: queue} = require('./queue')
const {default: scheduler} = require('./scheduler')

exports.default = { master: [scheduler], worker: [queue] }
