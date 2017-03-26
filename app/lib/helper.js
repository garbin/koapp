const path = require('path')
const nodemailer = require('nodemailer')
let mailer

exports.addonArgs = function () {
  let addonIndex = process.argv.findIndex(arg => arg === '--')
  return addonIndex !== -1 ? process.argv.slice(addonIndex + 1).join(' ') : ''
}
exports.path = {
  root () {
    return path.resolve(__dirname, '../../')
  },
  storage (relative) {
    return `${exports.path.root()}storage/${relative}`
  }
}
exports.loadConfig = (file = 'index', base = {}) => {
  return require(`${exports.path.root()}/deploy/config`)(file, base)
}
exports.mailer = function () {
  const config = exports.loadConfig()
  mailer = mailer || nodemailer.createTransport(config.mailer.smtp,
    config.mailer.defaults)
  return mailer
}
