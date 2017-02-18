const shelljs = require('shelljs')
const cla = require('command-line-args')
const _ = require('lodash')
// const fs = require('fs-extra')

exports.default = {
  command: 'building [stuff]',
  describe: 'build stuff',
  builder: {
    stuff: {
      default: 'client',
      choices: ['client', 'schemas', 'docs']
    },
    delete: {
      alias: 'd',
      boolean: true
    }
  },
  handler: async argv => {
    if (argv.delete) shelljs.exec('rm -rf storage/public/*')
    shelljs.exec(`webpack --progress --colors --config ./config/webpack`)
    // switch (argv.stuff) {
    //   case 'docs':
    //     shelljs.exec(`npm start build schemas && apidoc --debug -i ./app/server -o ./docs -f ".*.es$ " -f ".*.js$"`)
    //     break
    //   case 'schemas':
    //     require('../')
    //     let routers = require('../routers')
    //     routers = routers.default.concat(routers.nested || [])
    //     _.forEach(routers, function (router) {
    //       if (_.isFunction(router.schema)) {
    //         console.log(router.options.name)
    //         let schema = router.schema()
    //         if (schema) {
    //           _.forIn(schema, function (v, method) {
    //             let basepath = './schemas/' + router.options.title + '/' + method + '/'
    //             fs.outputJsonSync(basepath + 'request.schema.json', v.schema.request)
    //             fs.outputJsonSync(basepath + 'response.schema.json', v.schema.response)
    //             fs.outputJsonSync(basepath + 'request.example.json', v.example.request)
    //             fs.outputJsonSync(basepath + 'response.example.json', v.example.response)
    //             console.log('write %s successful', router.options.title)
    //           })
    //         }
    //       };
    //     })
    //     console.log('done')
    //     break
    //   case 'client':
    //   default:
    // }
  }
}
