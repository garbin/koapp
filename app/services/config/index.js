process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const defaults = {
  cluster: false,
  services: [
    {
      name: 'schedulers',
      config: {
        enabled: ['example']
      }
    },
    {
      name: 'queues',
      config: {
        enabled: ['mailer']
      }
    }
  ]
}
module.exports = Object.assign(defaults, require(`./${process.env.NODE_ENV}`))
