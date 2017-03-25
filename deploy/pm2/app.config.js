const pkg = require('../../package')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const path = require('path')
const cwd = path.resolve(__dirname, '../../')
const defaults = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: `${pkg.name}_universal`,
      script: 'app/index.js',
      args: 'universal',
      cwd,
      env: {
        NODE_ENV: process.env.NODE_ENV
      },
      node_args: '--harmony'
    },
    // {
    //   name: `${pkg.name}_api`,
    //   script: 'npm',
    //   args: 'start server',
    //   node_args: '--harmony',
    //   env: {
    //     NODE_ENV: 'development'
    //   }
    // },
    {
      name: `${pkg.name}_service`,
      cwd,
      script: 'app/index.js',
      args: 'service',
      node_args: '--harmony',
      env: {
        NODE_ENV: process.env.NODE_ENV
      }
    }
  ]
}

module.exports = Object.assign(defaults, require(`./${process.env.NODE_ENV}`))
