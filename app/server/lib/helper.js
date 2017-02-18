const path = require('path')
const _ = require('lodash')

exports.storage = function (relative) {
  return path.resolve(`${__dirname}/../../../storage${relative}`)
}

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
  return addonIndex ? process.argv.slice(addonIndex + 1).join(' ') : ''
}
