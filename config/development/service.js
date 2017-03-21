module.exports = {
  cluster: true,
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
