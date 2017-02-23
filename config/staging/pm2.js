const pkg = require('../../package')

module.exports = {
  apps: [
    {
      name: `${pkg.name}_universal`,
      script: 'index.js',
      args: 'universal',
      env: { NODE_ENV: process.env.NODE_ENV },
      node_args: '--harmony',
      exec_mode: 'cluster',
      instances: 'max'
    }
    // {
    //   name: `${pkg.name}_api`,
    //   script: 'npm',
    //   args: 'start server',
    //   node_args: '--harmony',
    //   env: {
    //     NODE_ENV: 'development'
    //   }
    // },
    // {
    //   name: `${pkg.name}_service`,
    //   script: 'index.js',
    //   args: 'service',
    //   node_args: '--harmony',
    //   env: {
    //     NODE_ENV: process.env.NODE_ENV
    //   }
    // }
  ]
}
