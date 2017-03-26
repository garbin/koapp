// Update with your config settings.
const config = require('./deploy/config')()

const database = {
  migrations: {
    directory: './deploy/database/migrations'
  },
  seeds: {
    directory: './deploy/database/seeds'
  }
}

module.exports = Object.assign(database, config.database)
