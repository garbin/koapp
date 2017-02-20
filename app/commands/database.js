const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'database [stuff]',
  describe: 'database operation',
  builder: {
    stuff: {
      default: 'latest',
      choices: ['latest', 'setup', 'rollback', 'reset']
    }
  },
  handler: async argv => {
    let {stuff} = argv
    let args = addonArgs()
    switch (stuff) {
      case 'setup':
        shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
        shelljs.exec('node --harmony `which knex` seed:run ' + args)
        break
      case 'rollback':
        shelljs.exec('node --harmony `which knex` migrate:rollback ' + args)
        break
      case 'reset':
        shelljs.exec('node --harmony `which knex` migrate:rollback ' + args)
        shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
        shelljs.exec('node --harmony `which knex` seed:run ' + args)
        break
      case 'latest':
        shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
        break
      default:
        shelljs.exec('node --harmony `which knex`' + ` ${argv.stuff} ${args}`)
    }
  }
}
