const passport = require('koa-passport')
const GithubStrategy = require('passport-github')
const OAuth2Strategy = require('passport-oauth2')
const { BasicStrategy } = require('passport-http')
const BearerStrategy = require('passport-http-bearer')
const ClientPasswordStrategy = require('passport-oauth2-client-password')
const createError = require('http-errors')
const config = require('../../../config/server')
const { Account, Client, User, Token } = require('../../models')
const request = require('axios')

function accountSignin (provider, getProfile) {
  return async (accessToken, refreshToken, params, profile, done) => {
    let authInfo = { accessToken, refreshToken, profile, params }
    try {
      let user = await Account.signin(provider, Object.assign({
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

passport.use(new GithubStrategy(config.passport.github, accountSignin('github', async ({ profile }) => ({
  account_id: profile.id,
  username: profile.username,
  email: 'garbinh@gmail.com',
  profile
}))))

passport.use(new OAuth2Strategy(config.passport.oauth2, accountSignin('oauth2', async ({ accessToken }) => {
  let res = await request.get(config.passport.oauth2.profileURL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return {
    account_id: res.data.uuid,
    username: res.data.username,
    email: res.data.email,
    profile: res.data
  }
})))

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
      let client = await Client.where({ id: clientId, client_secret: clientSecret }).fetch({ require: true })
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
      let token = await Token.where({ access_token: accessToken }).where('access_token_expires_at', '>', new Date()).fetch({ withRelated: ['user'], require: true })
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
