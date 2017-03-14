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
    root: 'http://localhost:9000/',
    minio: {
      endPoint: 'localhost',
      port: 9000,
      secure: false,
      accessKey: 'RRQVBHQBIV2UWZDFQL3I',
      secretKey: 'uhYb/ehzXwfnBy/QxufkMud10N0CcF77VvJ8Xdex'
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
