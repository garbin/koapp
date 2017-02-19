const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'building [stuff]',
  describe: 'build stuff',
  builder: {
    stuff: {
      default: 'website',
      choices: ['website']
    },
    delete: {
      alias: 'd',
      boolean: true
    }
  },
  handler: async argv => {
    if (argv.delete) shelljs.exec('rm -rf storage/public/* && echo "public deleted"')
    shelljs.exec(`webpack --progress --colors --config ./config/webpack --env.client ${argv.stuff || 'website'} ${addonArgs()}`)
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
