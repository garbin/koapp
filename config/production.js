module.exports = {
  port: 5002,
  database : {
    client: 'pg',
    connection: {
      host     : 'localhost',
      user     : 'postgres',
      password : '123456',
      database : 'koapi_boilerplate',
      charset  : 'utf8'
    },
  },
};
