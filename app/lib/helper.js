const path = require('path')
const _ = require('lodash')
const nodemailer = require('nodemailer')
const config = require('../../config')
let mailer

exports.storage = relative => path.resolve(`${__dirname}/../../storage${relative}`)
exports.base64 = {
  decode (str) {
    return (new Buffer(str, 'base64')).toString()
  },
  encode (obj) {
    let str = _.isString(obj) ? obj : JSON.stringify(obj)
    return (new Buffer(str)).toString('base64')
  }
}
exports.addonArgs = function () {
  let addonIndex = process.argv.findIndex(arg => arg === '--')
  return addonIndex !== -1 ? process.argv.slice(addonIndex + 1).join(' ') : ''
}
exports.mailer = function () {
  mailer = mailer || nodemailer.createTransport(config.mailer.smtp,
    config.mailer.defaults)
  return mailer
}
