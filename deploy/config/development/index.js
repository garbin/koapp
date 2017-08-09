const path = require('path')
module.exports = {
  servers: {
    app: {
      admin: {port: 5000},
      next: {port: 8000}
    },
    bullui: { port: 5050 },
    api: {
      port: 5000,
      clientUrl: 'http://localhost:5000',
      middlewares: {
        cors: {
          exposeHeaders: ['Content-Range']
        },
        accesslog: { path: path.resolve('./storage/logs/access.log') }
      },
      passport: {
        github: {
          clientID: 'f2ee0541fecc7c773d5d',
          clientSecret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
          callbackURL: 'http://localhost:5000/api/auth/connect/github/callback',
          redirectBack: 'http://localhost:5000'
        },
        // weibo: {
        //   clientID: '1908676044',
        //   clientSecret: 'b003b4c1feb20b5c9354ffe25d29795c',
        //   callbackURL: 'http://dev.koapp/api/auth/github/callback',
        //   redirectBack: 'http://dev.koapp'
        // },
        oauth2: {
          strategy: 'oauth2',
          profileURL: 'http://dev.open.admaster.co/user',
          authorizationURL: 'http://dev.open.admaster.co/#/auth/authorize',
          tokenURL: 'http://dev.open.admaster.co/api/oauth/access_token',
          clientID: 'f189f2f0acb906410f73',
          clientSecret: '33529fb2ca00394217494f1030d3c1f3f1aec715',
          callbackURL: 'http://192.168.205.128:5000/auth/oauth2/callback',
          redirectBack: 'http://localhost:5100'
        }
      }
    },
    queues: ['mailer'],
    schedulers: ['example']
  },
  database: {
    client: 'pg',
    debug: true,
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'koapp',
      charset: 'utf8'
    }
  }
}
