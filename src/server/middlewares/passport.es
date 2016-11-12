import {Model} from 'koapi'
import passport from 'koa-passport'
import config from '../../../config'
import GithubStrategy from 'passport-github'
import OAuth2Strategy from 'passport-oauth2'
import {BasicStrategy} from 'passport-http'
import BearerStrategy from 'passport-http-bearer'
import ClientPasswordStrategy from 'passport-oauth2-client-password'
import Account from '../models/user_account'
import Client from '../models/oauth/client'
import User from '../models/user'
import Token from '../models/oauth/token'
import moment from 'moment'
import axios from 'axios'
import create_error from 'http-errors'

function account_signin(provider, get_profile) {
  return async (access_token, refresh_token, params, profile, done) => {
    let auth_info = {access_token, refresh_token, profile, params};
    try {
      let user = await Account.signin(provider, Object.assign({
        access_token,
        refresh_token,
      }, await get_profile({
        access_token,
        refresh_token,
        params,
        profile
      })));
      return done(null, user, auth_info);
    } catch (e) {
      return done(e, false, auth_info);
    }
  }
}


passport.use(new GithubStrategy(config.passport.github, account_signin('github', async ({profile})=>({
  account_id: profile.id,
  username: profile.username,
  email: 'garbinh@gmail.com',
  profile
}))));

passport.use(new OAuth2Strategy(config.passport.oauth2, account_signin('oauth2', async ({access_token, profile})=>({
  account_id: 1000,
  username: 'garbin1000',
  email: 'garbin100@gmail.com',
  profile
}))));

passport.use(new BasicStrategy(
  async function(username, password, done) {
    try {
      let user = await User.auth(username, password);
      done(null, user);
    } catch (e) {
      done(create_error(401, e), false);
    }
  }
));

passport.use(new ClientPasswordStrategy(
  async function(client_id, client_secret, done) {
    try {
      let client = await Client.where({id: client_id, client_secret}).fetch({require:true})
      done(null, client);
    } catch (e) {
      done(create_error(401, e), false);
    }
  }
));

passport.use(new BearerStrategy(
  async (access_token, done) => {
    try {
      // 如苦token尚未过期，则认证通过
      let token = await Token.where({access_token}).where('access_token_expires_at', '>', new Date()).fetch({withRelated:['user'], require:true});
      return done(null, token ? token.related('user') : {}, {scope: 'all', access_token});
    } catch (e) {
      return done(create_error(401, e), false);
    }
  }
));

export default passport;

export const authenticate = (name, options, callback) => {
  options = Object.assign({session:false}, options);
  return passport.authenticate(name, options, callback);
}
