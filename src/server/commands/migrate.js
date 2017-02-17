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
    let args = ''
    switch (stuff) {
      case 'setup':
        shelljs.exec(`knex migrate:latest && knex seed:run ${args}`)
        break
      case 'rollback':
        shelljs.exec(`knex migrate:rollback ${args}`)
        break
      case 'reset':
        shelljs.exec(`knex migrate:rollback && knex migrate:latest && knex seed:run ${args}`)
        break
      default:
        shelljs.exec(`knex migrate:latest ${args}`)
    }
  }
}
