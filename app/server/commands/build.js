const shelljs = require('shelljs')
const _ = require('lodash')
const fs = require('fs-extra')

exports.default = {
  command: 'build [stuff]',
  describe: 'build stuff',
  builder: {
    stuff: {
      default: 'client',
      choices: ['schemas', 'client']
    }
  },
  handler: async argv => {
    switch (argv.stuff) {
      // case 'docs':
      //   shelljs.exec(`npm start build schemas && apidoc --debug -i ./src -o ./docs -f ".*.es$ " -f ".*.js$" ${args.join(' ')}`)
      //   break
      case 'schemas':
        require('../')
        let routers = require('../routers')
        routers = routers.default.concat(routers.nested || [])
        _.forEach(routers, function (router) {
          if (_.isFunction(router.schema)) {
            console.log(router.options.name)
            let schema = router.schema()
            if (schema) {
              _.forIn(schema, function (v, method) {
                let basepath = './schemas/' + router.options.title + '/' + method + '/'
                fs.outputJsonSync(basepath + 'request.schema.json', v.schema.request)
                fs.outputJsonSync(basepath + 'response.schema.json', v.schema.response)
                fs.outputJsonSync(basepath + 'request.example.json', v.example.request)
                fs.outputJsonSync(basepath + 'response.example.json', v.example.response)
                console.log('write %s successful', router.options.title)
              })
            }
          };
        })
        console.log('done')
        break
      case 'client':
      default:
        shelljs.exec('rm -rf ./storage/public/* && webpack --progress --colors --config ./config/webpack')
    }
  }
}
