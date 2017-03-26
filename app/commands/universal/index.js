exports.default = {
  command: 'universal [instance]',
  describe: 'run universal server',
  builder: {
    instance: { default: 'default' },
    build: {
      alias: 'b',
      describe: 'build before start',
      boolean: true
    }
  },
  handler (argv) {
    const { addonArgs } = require('../../lib/helper')
    const shelljs = require('shelljs')
    const { logger: log } = require('koapi')
    log.info(`Using environment: ${process.env.NODE_ENV}`)
    if (argv.build) shelljs.exec(`npm start build -- ${addonArgs()}`)
    require('./server').default(argv.instance)
  }
}
