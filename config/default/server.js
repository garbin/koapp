const path = require('path')
module.exports = {
  clientUrl: 'http://localhost:5000',
  universal: {
    apps: [
      {mount: '/api', server: true},
      {mount: '/admin', client: 'admin'},
      {mount: '/', client: 'website'}
    ]
  },
  port: 5000,
  debug: true,
  cors: {
    exposeHeaders: ['Content-Range']
  },
  accesslog: { path: path.resolve('./storage/logs/access.log') },
  passport: {
    github: {
      clientID: 'f2ee0541fecc7c773d5d',
      clientSecret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
      callbackURL: 'http://localhost:5000/api/auth/github/callback',
      redirectBack: 'http://localhost:5000'
    },
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
}
