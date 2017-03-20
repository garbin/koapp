const { addonArgs } = require('../../lib/helper')
const shelljs = require('shelljs')
const { logger: log } = require('koapi')

exports.default = {
  command: 'universal',
  describe: 'run universal server',
  builder: {
    build: {
      alias: 'b',
      describe: 'build before start',
      boolean: true
    }
  },
  handler: argv => {
    log.info(`Using environment: ${process.env.NODE_ENV}`)
    if (argv.build) shelljs.exec(`npm start build -- ${addonArgs()}`)
    require('./server').default()
  }
}
