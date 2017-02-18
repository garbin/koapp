const shelljs = require('shelljs')

exports.default = {
  command: 'migrating [stuff]',
  describe: 'Migrating',
  builder: {
    stuff: {
      default: 'latest',
      choices: ['latest', 'setup', 'rollback', 'reset']
    }
  },
  handler: async argv => {
    let {stuff} = argv
    switch (stuff) {
      case 'setup':
        shelljs.exec('node --harmony `which knex` migrate:latest')
        shelljs.exec('node --harmony `which knex` seed:run')
        break
      case 'rollback':
        shelljs.exec('node --harmony `which knex` migrate:rollback')
        break
      case 'reset':
        shelljs.exec('node --harmony `which knex` migrate:rollback')
        shelljs.exec('node --harmony `which knex` migrate:latest')
        shelljs.exec('node --harmony `which knex` seed:run')
        break
      case 'latest':
      default:
        shelljs.exec('node --harmony `which knex` migrate:latest')
    }
  }
}
