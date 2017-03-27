const { config } = require('koapi')
config.path(`${__dirname}/config`)
module.exports = config('deployment').get('pm2')
