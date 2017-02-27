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
        shelljs.exec(`rm -rf ./docs/public/** && apidoc --debug -i ./app -o ./docs/public -f ".*.js$" ${addonArgs()}`)
        break
      case 'schemas':
        let docsPath = `${__dirname}/../../docs`
        shelljs.exec(`rm -rf ${docsPath}/schemas`)
        const convert = require('joi-to-json-schema')
        const faker = require('json-schema-faker')
        const Joi = require('joi')
        const fs = require('fs-extra')
        const flatModels = models => {
          return Object.entries(models).reduce((result, [name, model]) => {
            if (typeof model !== 'function') {
              result = result.concat(flatModels(model))
            } else {
              result.push(model)
            }
            return result
          }, [])
        }
        const write = (name, schema) => {
          name = name.toLowerCase()
          let modelPath = `${docsPath}/schemas/${name}`
          fs.ensureDirSync(`${modelPath}`)
          console.log(`Writing ${name}`)
          fs.writeJsonSync(`${modelPath}/fields.json`, schema)
          fs.writeJsonSync(`${modelPath}/sample.json`, faker(schema))
        }
        const models = flatModels(require('../models'))
        for (let model of models) {
          write(model.name, convert(Joi.object(model.fields)))
        }
        console.log('Done!')
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
