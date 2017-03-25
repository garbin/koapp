module.exports = {
  universal: {
    port: 5000,
    apps: [
      {mount: '/api', server: 'default'},
      {mount: '/admin', client: 'default'}
      // {mount: '/', client: 'website'}
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
