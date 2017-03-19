module.exports = {
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
      service: 'Zoho',
      auth: {
        user: 'support@dianpou.com',
        pass: 'd1psNblLvDeddpHb'
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
