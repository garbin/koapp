module.exports = {
  universal: {
    apps: [
      {mount: '/api', server: true},
      {mount: '/admin', client: 'admin'},
      {mount: '/', client: 'website'}
    ]
  },
  port: 5000
}
