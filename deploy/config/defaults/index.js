module.exports = {
  security: { saltRounds: 10 },
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
  bull: {
    ui_port: 5050
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
      service: 'SendCloud',
      auth: {
        user: 'garbin_test_QOLzXD',
        pass: 'XYTNmwty9uWUrUOX'
      }
    },
    defaults: {
      from: 'support@dianpou.com'
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
