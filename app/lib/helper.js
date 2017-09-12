const { config, logger: log } = require('koapi')
const path = require('path')
const Queue = require('bull')
const nodemailer = require('nodemailer')
let mailer

module.exports = {
  addonArgs () {
    let addonIndex = process.argv.findIndex(arg => arg === '--')
    return addonIndex !== -1 ? process.argv.slice(addonIndex + 1).join(' ') : ''
  },
  path: {
    root (relative) {
      return path.resolve(__dirname, '../../', relative || '')
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
  queue ({ name, worker }) {
    const queue = new Queue(name, {redis: config.get('redis')})
    queue.on('error', log.error)
    return Object.assign({name, worker, queue})
  },
  connect (middleware, preposing = false) {
    const createReqMock = require('koa-passport/lib/framework/request').create
    const createResMock = (ctx, resolve) => {
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
        const res = createResMock(ctx, resolve)
        middleware(req, res, (e, ...args) => e ? reject(e) : resolve(...args))
      })
      preposing === false && await next()
    }
  }
}
