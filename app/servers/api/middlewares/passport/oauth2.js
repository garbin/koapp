const passport = require('koa-passport')
const request = require('axios')
const OAuth2Strategy = require('passport-oauth2')

exports.default = function (config) {
  passport.use(new OAuth2Strategy(config, accountSignin('oauth2', async ({ accessToken }) => {
    let res = await request.get(config.profileURL, {
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
}

const { accountSignin } = require('./index')
