const oauth2orize = require('oauth2orize-koa')
const createError = require('http-errors')
const {default: User} = require('../models/user')
const {default: Token} = require('../models/oauth/token')

const server = oauth2orize.createServer()

server.exchange(oauth2orize.exchange.password(async (client, username, password, scope, req) => {
  try {
    // 验证用户名密码
    let user = await User.auth(username, password)
    // 签发Token
    let token = await Token.issue(client.get('id'), user.get('id').toString())
    return [token.get('access_token'), token.get('refresh_token'), {
      expires: 7200
    }]
  } catch (e) {
    throw createError(401, e)
  }
}))

server.exchange(oauth2orize.exchange.refreshToken(async (client, refreshToken, scope) => {
  try {
    let token = await Token.where({ refresh_token: refreshToken }).fetch({ require: true })
    let newToken = await Token.issue(token.get('client_id'), token.get('user_id'))
    return [newToken.get('access_token'), newToken.get('refresh_token'), {
      expires: 7200
    }]
  } catch (e) {
    throw createError(401, e)
  }
}))

exports.default =  server
