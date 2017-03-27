exports.default = {
  command: 'bullui',
  describe: 'Bull Queue Admin UI',
  builder: yargs => yargs.option('port', {
    alias: 'p',
    describe: 'Port',
    type: 'string'
  }),
  handler (argv) {
    const { config } = require('koapi')
    let ui = require('bull-ui/app')({
      redis: {
        host: config.get('redis.host'),
        port: config.get('redis.port'),
        password: config.get('redis.password')
      }
    })

    ui.listen(argv.port || config.get('bull.ui_port'), function () {
      console.log('Bull-UI started listening on port', this.address().port)
    })
  }
}
