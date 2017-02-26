const config = require('../../config')

exports.default = {
  command: 'bullui',
  describe: 'Bull Queue Admin UI',
  builder: yargs => yargs.option('port', {
    alias: 'p',
    describe: 'Port',
    type: 'string'
  }),
  handler: argv => {
    let ui = require('bull-ui/app')({
      redis: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password
      }
    })

    ui.listen(argv.port || 5050, function () {
      console.log('Bull-UI started listening on port', this.address().port)
    })
  }
}
