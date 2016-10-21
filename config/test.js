module.exports = {
  port: 0,
  debug: false,
  database : {
    client: 'pg',
    connection: {
      host     : 'localhost',
      user     : 'postgres',
      password : '123456',
      database : 'koapi_boilerplate_test',
      charset  : 'utf8'
    },
  },
  passport:{
    github: {
      clientID: 'f2ee0541fecc7c773d5d',
      clientSecret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
      callbackURL: "http://ubuntu:5000/auth/github/callback",
    },
    oauth2: {
      strategy: 'oauth2',
      profileURL: 'http://dev.open.admaster.co/user',
      authorizationURL: 'http://dev.open.admaster.co/#/auth/authorize',
      tokenURL: 'http://dev.open.admaster.co/api/oauth/access_token',
      clientID: 'f189f2f0acb906410f73',
      clientSecret: '33529fb2ca00394217494f1030d3c1f3f1aec715',
      callbackURL: "http://192.168.205.128:5000/auth/oauth2/callback",
    }
  },
};
