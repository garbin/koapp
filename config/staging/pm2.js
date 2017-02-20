const pkg = require('../../package')

module.exports = {
  apps: [
    {
      name: `${pkg.name}_universal`,
      script: 'npm',
      args: 'start universal -- -b -- -d',
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
      script: 'npm',
      args: 'start service',
      node_args: '--harmony',
      env: {
        NODE_ENV: process.env.NODE_ENV
      }
    }
  ]
}
