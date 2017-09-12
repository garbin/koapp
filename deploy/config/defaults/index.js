const path = require('path')
const pkg = require('../../../package')
module.exports = {
  security: { saltRounds: 10 },
  servers: {
    app: {
      admin: {port: 5000},
      next: {port: 8000}
    },
    bull: {
      queues: ['mailer'],
      ui: { port: 5050, hostId: pkg.name }
    },
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
    schedulers: ['example']
  },
  logging: {
    // name: 'koapp',
    // json: false,
    // filename: storage('/logs/koapp.log'),
    // level: 'info'
    level: 'debug'
  },
  database: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'blog',
      charset: 'utf8'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  storage: {
    root: 'http://localhost:9000/uploads/',
    minio: {
      endPoint: 'localhost',
      port: 9000,
      secure: false,
      accessKey: 'WAWXUCAHEZYXKEZGL13J',
      secretKey: 'lH7SmVoYyAfwzSonSgykYazLXqBrIOMnrBP+AOVo'
    }
  },
  mailer: {
    smtp: {
      service: 'Sparkpost',
      auth: {
        user: 'SMTP_Injection',
        pass: '7c020fa9771311d27d4e0fcd0b8dfe8d943a2722'
      }
    },
    // smtp: {
    //   service: 'SES-US-WEST-2',
    //   auth: {
    //     user: 'AKIAJPLMO22GMJ4PVOYQ',
    //     pass: 'AhPF46OCu0LxqzUlDx0b1yTcey7ygCouo5ZOqMLbsBaq'
    //   }
    // },
    defaults: {
      from: 'support@sp.dianpou.com'
    }
  },
  redis: {
    pkg: 'ioredis',
    database: 0,
    host: 'localhost',
    port: 6379,
    password: null
  }
}
