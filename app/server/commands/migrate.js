const shelljs = require('shelljs')

exports.default = {
  command: 'migrate [stuff]',
  describe: 'Example',
  builder: yargs => yargs.option('haha', {
    alias: 'h',
    default: 'Haha'
  }),
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
      default:
        shelljs.exec('node --harmony `which knex` migrate:latest')
    }
  }
}
