let api = 'http://ubuntu:5000';

export default {
  api,
  oauth:{
    url: api,
    providers:{
      github: '/auth/github',
    }
  },
}
