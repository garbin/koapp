const { config } = require('koapi')
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
    return `${exports.path.root()}/storage${relative}`
  }
}
exports.mailer = function () {
  mailer = mailer || nodemailer.createTransport(config.get('mailer.smtp'),
    config.get('mailer.defaults'))
  return mailer
}
