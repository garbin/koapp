#!/usr/bin/env node
const yargs = require('yargs')
const {default: commands} = require('./src/server/commands')

yargs.usage('$0 <cmd> [args]')

// commands
for (let command of commands) {
  yargs.command(command.command, command.describe, command.builder || {}, argv => {
    const result = command.handler(argv)
    if (result instanceof Promise) {
      result.then(r => process.exit()).catch(e => {
        // throw e
        console.error(e)
        process.exit(1)
      })
    }
  })
}

yargs.fail((msg, err, yargs) => {
  if (err) throw err
  console.error('You broke it!')
  console.error(msg)
  console.error('You should be doing', yargs.help())
  process.exit(1)
}).help().argv
// build
// watch
// test
// migrate
// command
