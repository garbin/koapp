let api = 'http://ubuntu:5000';

export default {
  api,
  auth: {
    apiUrl:api,
    signOutPath: '/oauth/token',
    tokenValidationPath: '/oauth/token',
    authProviderPaths:{
      github: '/auth/github',
      oauth2: '/auth/oauth2'
    }
  }
}
