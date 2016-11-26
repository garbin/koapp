const api = 'http://localhost:5000/api';

export default {
  api,
  oauth: {
    client_id: '123',
    client_secret: '123',
    url: api,
    providers: {
      github: '/auth/github',
    },
  },
};
