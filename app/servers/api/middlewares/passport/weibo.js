const passport = require('koa-passport')
const WeiboStrategy = require('passport-weibo')

module.exports = function (config) {
  passport.use(new WeiboStrategy(config, accountSignin('weibo', async ({ profile }) => ({
    account_id: profile.id,
    username: profile.username,
    email: 'garbinh@gmail.com',
    avatar: profile.photos[0].value,
    profile
  }))))
}

const { accountSignin } = require('./index')
