const { config } = require('koapi')
const passport = require('koa-passport')
const { BasicStrategy } = require('passport-http')
const BearerStrategy = require('passport-http-bearer')
const ClientPasswordStrategy = require('passport-oauth2-client-password')
const createError = require('http-errors')
const { OAuth, User } = require('../../../../models')

exports.accountSignin = function (provider, getProfile) {
  return async (accessToken, refreshToken, params, profile, done) => {
    let authInfo = { accessToken, refreshToken, profile, params }
    try {
      let user = await User.Account.signin(provider, Object.assign({
        access_token: accessToken,
        refresh_token: refreshToken
      }, await getProfile({
        accessToken,
        refreshToken,
        params,
        profile
      })))
      return done(null, user, authInfo)
    } catch (e) {
      return done(e, false, authInfo)
    }
  }
}

const strategies = {
  github: require('./github').default,
  weibo: require('./weibo').default,
  oauth2: require('./oauth2').default
}

Object.entries(config.get('servers.api.passport')).forEach(([provider, settings]) => {
  strategies[provider](settings)
})

passport.use(new BasicStrategy(
  async function (username, password, done) {
    try {
      let user = await User.auth(username, password)
      done(null, user)
    } catch (e) {
      done(createError(401, e), false)
    }
  }
))

passport.use(new ClientPasswordStrategy(
  async function (clientId, clientSecret, done) {
    try {
      let client = await OAuth.Client.where({ id: clientId, client_secret: clientSecret }).fetch({ require: true })
      done(null, client)
    } catch (e) {
      done(createError(401, e), false)
    }
  }
))

passport.use(new BearerStrategy(
  async (accessToken, done) => {
    try {
      // 如苦token尚未过期，则认证通过
      let token = await OAuth.Token.where({ access_token: accessToken }).where('access_token_expires_at', '>', new Date()).fetch({ withRelated: ['user'], require: true })
      return done(null, token ? token.related('user') : {}, { scope: 'all', accessToken })
    } catch (e) {
      return done(createError(401, e), false)
    }
  }
))

exports.default = passport
exports.authenticate = (name, options, callback) => {
  options = Object.assign({ session: false }, options)
  return passport.authenticate(name, options, callback)
}
