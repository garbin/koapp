module.exports = {
  universal: {
    server: '/api',
    clients: [
      { name: 'admin', mount: '/admin' },
      { name: 'website', mount: '/' }
    ]
  },
  port: 5000
}
