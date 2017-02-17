const pkg = require('../../package')

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: `${pkg.name}-universal`,
      script: 'npm',
      args: 'run watch universal',
      env: {
        NODE_ENV: 'development',
        USE_WEBPACK_DEV_SERVER: true
      },
      node_args: '--harmony',
      exec_mode: 'cluster',
      instances: -1
    },
    {
      name: `${pkg.name}-client`,
      script: 'npm',
      args: 'run watch client',
      node_args: '--harmony',
      env: {
        NODE_ENV: 'development'
      }
    }
    // For Production
    // {
    //   name: `${pkg.name}`,
    //   script: 'npm',
    //   args: 'start universal',
    //   env: {
    //     NODE_ENV: 'production'
    //   }
    // },
  ]
}
