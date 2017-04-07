const oauth2orize = require('oauth2orize')
const createError = require('http-errors')
const { User, OAuth } = require('../../../models')

const server = oauth2orize.createServer()

server.exchange(oauth2orize.exchange.password(async (client, username, password, scope, req, done) => {
  try {
    // 验证用户名密码
    let user = await User.auth(username, password)
    // 签发Token
    let token = await OAuth.Token.issue(client.get('id'), user.get('id').toString())
    done(null, token.get('access_token'), token.get('refresh_token'), {
      expires: 7200
    })
  } catch (e) {
    done(createError(401, e))
  }
}))

server.exchange(oauth2orize.exchange.refreshToken(async (client, refreshToken, scope, done) => {
  try {
    let token = await OAuth.Token.where({ refresh_token: refreshToken }).fetch({ require: true })
    let newToken = await OAuth.Token.issue(token.get('client_id'), token.get('user_id'))
    done(null, newToken.get('access_token'), newToken.get('refresh_token'), {
      expires: 7200
    })
  } catch (e) {
    done(createError(401, e))
  }
}))

exports.default = server
