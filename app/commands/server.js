exports.default = {
  command: 'server',
  describe: 'run web server',
  builder: yargs => yargs.option('watch', {
    alias: 'w',
    describe: 'Watch',
    boolean: true
  }),
  handler: argv => {
    const config = require('../../config/server')
    require('../').default.listen(
      config.port,
      () => console.log(`server is running on port ${config.port}`)
    )
  }
}
