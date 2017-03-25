const path = require('path')
const nodemailer = require('nodemailer')
const config = require('../config')
let mailer

exports.storage = relative => path.resolve(`${__dirname}/../../storage${relative}`)
exports.addonArgs = function () {
  let addonIndex = process.argv.findIndex(arg => arg === '--')
  return addonIndex !== -1 ? process.argv.slice(addonIndex + 1).join(' ') : ''
}
exports.mailer = function () {
  mailer = mailer || nodemailer.createTransport(config.mailer.smtp,
    config.mailer.defaults)
  return mailer
}
