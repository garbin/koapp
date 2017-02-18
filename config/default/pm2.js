const pkg = require('../../package')

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: `${pkg.name}_universal`,
      script: 'npm',
      args: 'start universal -- -b -- -d',
      env: {
        NODE_ENV: 'development',
        USE_WEBPACK_DEV_SERVER: true
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
      script: 'npm',
      args: 'start service',
      node_args: '--harmony',
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
}
