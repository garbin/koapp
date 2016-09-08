#!/usr/bin/env node

require('babel-polyfill');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var production = process.env.NODE_ENV == 'production';
    !production && require('babel-register');
var _       = require('lodash');
var program = require('commander');
var shelljs = require('shelljs');

function done() {
  process.exit();
}

function error(e) {
  console.error(e);
  done();
}

program.command('server')
       .description('run server')
       .action(function (object, options) {
         var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
         var tools_config = require('./config/webpack/isomorphic-tools');
         var webpackIsomorphicTools = new WebpackIsomorphicTools(tools_config);
         var root = production ? './build' : './src'
         webpackIsomorphicTools.development(!production).server(root, function () {
           global.window = {};
           global.localStorage = {};
           global.__SERVER__ = true;
           global.__CLIENT__ = false;
           require(root + '/server').default(webpackIsomorphicTools);
         });
       });

program.command('build [object]')
       .description('Build client/server/both (default both)')
       .action(function (object, options) {
         switch (object) {
           case 'client':
             shelljs.exec('rm -rf ./static && webpack --progress --colors --config ./config/webpack');
             break;
           case 'server':
             shelljs.exec('rm -rf ./build && babel --copy-files --presets es2015,stage-0,react -d build/ src/ ');
             break;
           default:
             shelljs.exec(`concurrently \"npm run build client\" \"npm run build server\"`);
         }
         done();
       });

program.command('test [type]')
       .description('run tests')
       .option('-e, --env [type]', 'env for tests')
       .option('-c, --coverage', 'coverage')
       .action(function (type, options) {
         var args = _.slice(options.parent.args, 0, -1).join(' ');
         var env = options.env || 'test';
         var coverage = options.coverage ? 'nyc' : '';
         switch (type) {
           case 'report':
             shelljs.exec('nyc report --reporter=lcov ' + args);
             break;
           default:
             shelljs.exec(`export NODE_ENV=${env} && ${coverage} ava ${args}`);
         }
         done();
       });

program.command('watch [object]')
       .description('watch mode')
       .option('-p, --port [type]', 'port for listen')
       .action(function (object, options) {
         switch (object) {
           case 'client':
             shelljs.exec(`webpack-dev-server --config ./config/webpack -d --history-api-fallback --hot --inline --progress --colors --host 0.0.0.0`);
             break;
           case 'server':
             shelljs.exec(`nodemon -L -e js,es,jsx run.js -- server`);
             break;
           default:
             shelljs.exec(`concurrently \"npm run watch client\" \"npm run watch server\"`);
         }
       });

if (!process.argv.slice(2).length) {
  program.outputHelp();
  done();
}

program.parse(process.argv);
