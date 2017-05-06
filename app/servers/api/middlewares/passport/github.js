const passport = require('koa-passport')
const GithubStrategy = require('passport-github')

module.exports = function (config) {
  passport.use(new GithubStrategy(config, accountSignin('github', async ({ profile }) => ({
    account_id: profile.id,
    username: profile.username,
    email: 'garbinh@gmail.com',
    avatar: profile.photos[0].value,
    profile
  }))))
}

const { accountSignin } = require('./index')
