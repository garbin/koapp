module.exports = {
  universal: {
    default: {
      port: 5000,
      apps: [
        {mount: '/api', server: 'default'},
        {mount: '/', client: 'default'}
      ]
    }
  },
  services: {
    cluster: false,
    enabled: [
      {
        name: 'schedulers',
        config: {
          enabled: ['example']
        }
      },
      {
        name: 'queues',
        config: {
          enabled: ['mailer']
        }
      }
    ]
  },
  database: {
    client: 'pg',
    // debug: true,
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'koapp',
      charset: 'utf8'
    }
  }
}
