import oauth2orize from 'oauth2orize-koa'
import Client from '../models/oauth/client'
import User from '../models/user'
import Token from '../models/oauth/token'
import create_error from 'http-errors'

const server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(async (client, username, password, scope, req) => {
  try {
    // 验证用户名密码
    let user   = await User.auth(username, password);
    // 签发Token
    let token  = await Token.issue(client.get('client_id'), user.get('id').toString());
    return [token.get('access_token'), token.get('refresh_token'), {
      expires: 7200
    }];
  } catch (e) {
    throw create_error(401, e);
  }
}));

server.exchange(oauth2orize.exchange.refreshToken(async (client, refreshToken, scope) => {
  try {
    let token = await Token.where({token:refreshToken, type:'refresh'}).fetch({require:true});
    let new_token = await Token.issue(token.get('client_id'), token.get('user_id'));
    return [new_token.get('access_token'), new_token.get('refresh_token'), {
      expires: 7200
    }];
  } catch (e) {
    throw create_error(401, e);
  }
}));

export default server;
