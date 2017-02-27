module.exports = {
  universal: {
    apps: [
      {point: '/api', type: 'server', name: 'server'},
      {point: '/admin', type: 'static', name: 'admin'},
      {point: '/', type: 'static', name: 'website'}
    ]
  },
  port: 19999
}
