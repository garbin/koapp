exports.default = {
  command: 'server',
  describe: 'run web server',
  handler: argv => {
    const config = require('../../config/server')
    require('../server').default.listen(
      config.port,
      () => console.log(`server is running on port ${config.port}`)
    )
  }
}
