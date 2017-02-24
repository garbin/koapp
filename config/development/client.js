const api = 'http://localhost:5000/api'

module.exports = {
  api,
  oauth: {
    client_id: '01B98M4375SQ2TQYNMHSNTKPDK',
    client_secret: '530897d5880494a6a9ac92d1273d8ba5',
    url: api,
    providers: {
      github: '/auth/github'
    }
  }
}
