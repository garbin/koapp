#!/usr/bin/env node

require('babel-polyfill');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var production = process.env.NODE_ENV == 'production';
    !production && require('babel-register');
var _       = require('lodash');
var program = require('commander');
var shelljs = require('shelljs');
console.log('Using environment: ' + process.env.NODE_ENV);


function done() {
  process.exit();
}

function error(e) {
  console.error(e);
  done();
}

program.command('server')
       .description('run server')
       .action(function (object, options) { require('./server'); });

program.command('build [object]')
       .description('Build client/server/both (default both)')
       .action(function (object, options) {
         switch (object) {
           case 'client':
             shelljs.exec('rm -rf ./static && webpack --progress --colors');
             break;
           case 'server':
             shelljs.exec('rm -rf ./build && babel --copy-files --presets es2015,stage-0,react -d build/ src/');
             break;
           default:
             shelljs.exec(`concurrently \"npm run build client\" \"npm run build server\"`);
         }
         done();
       });

program.command('test [type]')
       .description('run tests')
       .option('-e, --env [type]', 'env for tests')
       .action(function (type, options) {
         var env = options.env || 'test';
         switch (type) {
           case 'coverage':
             shelljs.exec(`export NODE_ENV=${env} && make test-cover`);
             break;
           default:
             shelljs.exec(`export NODE_ENV=${env} && make test`);
         }
         done();
       });

program.command('watch [object]')
       .description('watch mode')
       .option('-p, --port [type]', 'port for listen')
       .action(function (object, options) {
         switch (object) {
           case 'client':
             shelljs.exec(`webpack-dev-server -d --history-api-fallback --hot --inline --progress --colors --host 0.0.0.0`);
             break;
           case 'server':
             shelljs.exec(`nodemon --watch src/server.jsx -L -e js,es,jsx koapp.js -- server`);
             break;
           default:
             shelljs.exec(`concurrently \"npm run watch client\" \"npm run watch server\" \"json-server db.json --port 5002\"`);
         }
       });

if (!process.argv.slice(2).length) {
  program.outputHelp();
  done();
}

program.parse(process.argv);
