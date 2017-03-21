module.exports = {
  cluster: false,
  services: [
    {
      name: 'schedulers',
      config: { /* enabled: ['example'] */ }
    },
    {
      name: 'queues',
      config: {
        enabled: ['mailer']
      }
    }
  ]
}
