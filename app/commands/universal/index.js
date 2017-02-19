const { addonArgs } = require('../../lib/helper')
const shelljs = require('shelljs')

exports.default = {
  command: 'universal',
  describe: 'run universal server',
  builder: {
    build: {
      alias: 'b',
      boolean: true
    },
    delete: {
      alias: 'd',
      boolean: true
    }
  },
  handler: argv => {
    if (argv.build) shelljs.exec(`npm start building -- ${addonArgs()}`)
    require('./server').default()
  }
}
