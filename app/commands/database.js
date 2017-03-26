exports.default = {
  command: 'database [stuff]',
  describe: 'database operation',
  builder: {
    stuff: {
      default: 'upgrade',
      choices: ['upgrade', 'latest', 'setup', 'rollback', 'reset']
    },
    force: {
      alias: 'f',
      boolean: true
    }
  },
  async handler (argv) {
    const shelljs = require('shelljs')
    const inquirer = require('inquirer')
    const { addonArgs } = require('../lib/helper')
    async function prompt (name, message, force, options) {
      if (force) return true
      let answers = await inquirer.prompt(Object.assign({
        name,
        type: 'confirm',
        default: false,
        message
      }, options))
      if (!answers[name]) console.log(`${name} cancelled`)
      return answers[name]
    }
    let {stuff} = argv
    let args = addonArgs()
    switch (stuff) {
      case 'setup':
        shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
        shelljs.exec('node --harmony `which knex` seed:run ' + args)
        break
      case 'rollback':
        if (await prompt('rollback', 'Dangerous!!! Will rollback db changes, Are you sure?', argv.force)) {
          shelljs.exec('node --harmony `which knex` migrate:rollback ' + args)
        }
        break
      case 'reset':
        if (await prompt('reset', 'Dangerous!!! Will destroy database then rebuild it, Are you sure?', argv.force)) {
          shelljs.exec('node --harmony `which knex` migrate:rollback ' + args)
          shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
          shelljs.exec('node --harmony `which knex` seed:run ' + args)
        }
        break
      case 'upgrade':
      case 'latest':
        if (await prompt('upgrade', 'Dangerous!!! Will upgrade your database, Are you sure?', argv.force)) {
          shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
        }
        break
      default:
        shelljs.exec('node --harmony `which knex`' + ` ${argv.stuff} ${args}`)
    }
  }
}
