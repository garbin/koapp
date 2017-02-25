module.exports = {
  master: {
    schedulers: {
      enabled: ['example']
    }
  },
  worker: {
    queues: {
      enabled: ['mailer']
    }
  }
}
