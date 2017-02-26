const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'build [stuff]',
  describe: 'build stuff',
  builder: {
    stuff: { default: 'clients', choices: ['clients', 'docs'] },
    delete: { alias: 'd', boolean: true }
  },
  handler: async argv => {
    switch (argv.stuff) {
      case 'docs':
        shelljs.exec(`apidoc --debug -i ./app -o ./docs/public -f ".*.js$" ${addonArgs()}`)
        break
      case 'clients':
      default:
        let stuffs = [ argv.stuff ]
        if (argv.stuff === 'clients') stuffs = Object.keys(require('../clients'))
        for (let client of stuffs) {
          if (argv.delete) shelljs.exec(`rm -rf storage/public/${client}/* && echo "build: ${client} removed"`)
          shelljs.exec(`echo "building ${client}" && webpack --progress --colors --config ./config/webpack --env.client ${client} ${addonArgs()} && echo "${client} build completed"`)
        }
    }
  }
}
