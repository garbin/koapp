const { queue } = require('../../../services/queues/mailer')
const { Setting } = require('../../../models')

exports.default = function (id) {
  return async (ctx, next) => {
    await next()
    const setting = await Setting.findById(id)
    const mail = {
      to: ctx.state.mail.to,
      subject: setting.template.subject(ctx.state.mail.context),
      [setting.get('settings').type]: setting.template.content(ctx.state.mail.context)
    }
    await queue.add(mail)
  }
}
