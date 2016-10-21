// Update with your config settings.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config');
var _ = require('lodash');

var database = {
    migrations: {
      directory: './database/migrations',
    },
    seeds:{
      directory: './database/seeds',
    },
};


module.exports = _.assign(database, config.database);
