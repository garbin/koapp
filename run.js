#!/usr/bin/env node

require('babel-polyfill')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
var production = process.env.NODE_ENV === 'production'
var _ = require('lodash')
var program = require('commander')
var shelljs = require('shelljs')

function drequire (module) {
  return require((production ? './build/' : './src/') + module)
}

!production && require('babel-register')
var commands = drequire('server/commands').default

function done () {
  process.exit()
}

function error (e) {
  console.error(e)
  done()
}

program.command('start [what]')
       .description('start server/service')
       .action(function (what) {
         switch (what) {
           case 'service':
             shelljs.exec(`npm run command service`)
             break
           case 'universal':
             shelljs.exec(`npm run command universal`)
             break
           case 'server':
           default:
             shelljs.exec(`npm run command server`)
         }
       })
program.command('watch [what]')
 .description('watch mode')
 .option('-p, --port [type]', 'port for listen')
 .action(function (what, options) {
   switch (what) {
     case 'client':
       shelljs.exec(`webpack-dev-server --config ./config/webpack -d --history-api-fallback --inline --progress --host 0.0.0.0`, {
         maxBuffer: 1024 * 1000
       })
       break
     case 'server':
       shelljs.exec(`nodemon --harmony --watch src/server -L -e js,es,jsx run.js -- server`)
       break
     case 'universal':
       shelljs.exec(`nodemon --harmony --watch src/server -L -e js,es,jsx run.js -- universal`)
       break
     case 'service':
       shelljs.exec(`nodemon --harmony --watch src/server -L -e js,es,jsx run.js -- service`)
       break
     default:
       shelljs.exec(`concurrently "npm run watch client" "npm run watch server"`)
   }
 })

program.command('build [object]')
       .description('Build code/doc (default code)')
       .action(function (object, options) {
         var args = _.slice(options.parent.args, 0, -1).join(' ')
         switch (object) {
           case 'client':
             shelljs.exec('rm -rf ./storage/public/* && webpack --progress --colors --config ./config/webpack')
             break
           case 'docs':
             shelljs.exec(`npm run build schemas && apidoc --debug -i ./src -o ./docs -f ".*.es$ " -f ".*.js$" ${args}`)
             break
           case 'schemas':
             require('./src/server')
             var routers = require('./src/server/routers')
             routers = routers.default.concat(routers.nested || [])
             var fs = require('fs-extra')
             _.forEach(routers, function (router) {
               if (_.isFunction(router.schema)) {
                 console.log(router.options.name)
                 var schema = router.schema()
                 if (schema) {
                   _.forIn(schema, function (v, method) {
                     var basepath = './schemas/' + router.options.title + '/' + method + '/'
                     fs.outputJsonSync(basepath + 'request.schema.json', v.schema.request)
                     fs.outputJsonSync(basepath + 'response.schema.json', v.schema.response)
                     fs.outputJsonSync(basepath + 'request.example.json', v.example.request)
                     fs.outputJsonSync(basepath + 'response.example.json', v.example.response)
                     console.log('write %s successful', router.options.title)
                   })
                 }
               };
             })
             break
           case 'server':
           default:
             shelljs.exec(`babel -D -d build/ src/`)
         }
         done()
       })

program.command('test [type]')
       .description('run tests')
       .option('-e, --env [type]', 'env for tests')
       .option('-c, --coverage', 'coverage')
       .action(function (type, options) {
         var args = _.slice(options.parent.args, 0, -1).join(' ')
         var env = options.env || 'test'
         var coverage = options.coverage ? 'nyc' : ''
         switch (type) {
           case 'report':
             shelljs.exec(`nyc report --reporter=lcov ${args}`)
             break
           default:
             shelljs.exec(`export NODE_ENV=${env} && knex migrate:rollback && knex migrate:latest && knex seed:run && ${coverage} jest --forceExit ${args}`)
         }
         done()
       })

program.command('migrate [action]')
       .description('db migration')
       .action(function (action, options) {
         var args = _.slice(options.parent.args, 0, -1).join(' ')
         switch (action) {
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
         done()
       })

commands.forEach(function (cmd) {
  var subcommand = program.command(cmd.command)
  if (cmd.description) subcommand.description(cmd.description)
  cmd.options && _.forIn(cmd.options, function (desc, option) {
    subcommand = subcommand.option(option, desc)
  })
  if (cmd.action) {
    subcommand.action(function () {
      var result = cmd.action.apply(cmd.action, Array.prototype.slice.call(arguments))
      if (result instanceof Promise) {
        result.then(cmd.done || function () { Promise.resolve() }).then(done).catch(error)
      }
    })
  }
})

if (!process.argv.slice(2).length) {
  program.outputHelp()
  done()
}

program.parse(process.argv)
