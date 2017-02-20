const api = 'http://localhost:5000/api'

module.exports = {
  api,
  oauth: {
    client_id: '0f434d4b-06bf-4cb2-b8f4-f20bf9349beb',
    client_secret: '530897d5880494a6a9ac92d1273d8ba5',
    url: api,
    providers: {
      github: '/auth/github'
    }
  }
}
