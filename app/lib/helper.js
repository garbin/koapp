const { config } = require('koapi')
const path = require('path')
const nodemailer = require('nodemailer')
let mailer

module.exports = {
  addonArgs () {
    let addonIndex = process.argv.findIndex(arg => arg === '--')
    return addonIndex !== -1 ? process.argv.slice(addonIndex + 1).join(' ') : ''
  },
  path: {
    root () {
      return path.resolve(__dirname, '../../')
    },
    storage (relative) {
      return `${module.exports.path.root()}/storage${relative}`
    }
  },
  mailer () {
    mailer = mailer || nodemailer.createTransport(config.get('mailer.smtp'),
    config.get('mailer.defaults'))
    return mailer
  },
  connect (middleware, preposing = false) {
    const createReqMock = require('koa-passport/lib/framework/request').create
    function dummyRes (ctx, resolve) {
      const res = ctx.res
      res.on('close', resolve)
      res.on('finish', resolve)
      let dummyRes = res.__dummyRes
      if (!dummyRes) {
        let statusCodeSetted = false
        const default404to200 = function () {
          if (!statusCodeSetted && res.statusCode === 404) {
            res.statusCode = 200
          }
        }
        dummyRes = res.__dummyRes = {
          __proto__: res,
          end () {
            default404to200()
            return res.end.apply(res, arguments)
          },
          write () {
            default404to200()
            return res.write.apply(res, arguments)
          },
          set statusCode (v) {
            statusCodeSetted = true
            res.statusCode = v
          },
          get statusCode () {
            return res.statusCode
          },
          writeHead (statusCode) {
            statusCodeSetted = true
            return res.writeHead.apply(res, arguments)
          }
        }
      }
      return dummyRes
    }
    return async (ctx, next) => {
      preposing === true && await next()
      await new Promise((resolve, reject) => {
        const req = createReqMock(ctx, 'user')
        const res = dummyRes(ctx, resolve)
        middleware(req, res, (e, ...args) => e ? reject(e) : resolve(...args))
      })
      preposing === false && await next()
    }
  }
}
