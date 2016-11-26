// for non-oauth-server
// issue access_token by central authorization server
// import passport from './passport/oauth2'

// for built-in oauth server & social login
// issue access_token by self
import { middlewares } from 'koapi';
import passport from './passport';

export const before = [
  middlewares.json_error(),
  passport.initialize(),
];

export const after = [];
