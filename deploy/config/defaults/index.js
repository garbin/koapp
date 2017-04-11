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
