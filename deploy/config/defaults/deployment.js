const pkg = require('../../../package')
const path = require('path')
const cwd = path.resolve(__dirname, '../../../')

module.exports = {
  hosts: [],
  pm2: {
    /**
    * Application configuration section
    * http://pm2.keymetrics.io/docs/usage/application-declaration/
    */
    apps: [
      {
        name: `${pkg.name}`,
        script: 'app/index.js',
        args: 'app queues schedulers',
        cwd,
        env: {
          NODE_ENV: process.env.NODE_ENV
        },
        node_args: '--harmony'
      }
    ]
  }
}
