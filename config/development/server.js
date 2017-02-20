module.exports = {
  universal: {
    server: '/api',
    clients: [
      { name: 'website', mount: '/', dev_server: 'http://localhost:5001' }
    ]
  },
  port: 5000
}
