// Update with your config settings.
const { config } = require('koapi')

const database = {
  migrations: {
    directory: './deploy/database/migrations'
  },
  seeds: {
    directory: './deploy/database/seeds'
  }
}

module.exports = Object.assign(database, config.get('database'))
