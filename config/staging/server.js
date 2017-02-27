module.exports = {
  universal: {
    apps: [
      {point: '/api', server: true},
      {point: '/admin', client: 'admin'},
      {point: '/', client: 'website'}
    ]
  },
  port: 19999
}
