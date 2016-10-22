let api = 'http://localhost:5002/api';

export default {
  api,
  oauth:{
    client_id: "123",
    client_secret: "123",
    url: api,
    providers:{
      github: '/auth/github',
    }
  },
}
