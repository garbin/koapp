module.exports = {
  services: [
    {
      name: 'schedulers',
      place: 'master',
      config: { /* enabled: ['example'] */ }
    },
    {
      name: 'queues',
      place: 'worker',
      config: {
        enabled: ['mailer']
      }
    }
  ]
}
