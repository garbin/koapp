exports.default = {
  command: 'example [test]',
  describe: 'Example',
  builder: yargs => yargs.option('haha', {
    alias: 'h',
    default: 'Haha'
  }),
  handler: async (argv) => {
    const { queue } = require('../services/queues/mailer')
    const { default: log } = require('koapi/lib/logger')
    const { Setting } = require('../models')
    const setting = await Setting.findById('mail.template.reset_password')
    console.log(setting.template.subject({link:'abc'}))
    console.log(setting.template.content({link:'abc'}))

    // await queue.add({
    //   to: 'garbinh@gmail.com',
    //   subject: 'test',
    //   text: 'test'
    // })
    // const { mailer } = require('../lib/helper')
    // console.log(await mailer().sendMail({
    //   from: 'support@dianpou.com',
    //   to: 'garbinh@gmail.com',
    //   subject: 'test',
    //   text: 'test'
    // }))
    // queue.add({
    //   from: 'noreply@koapp.com',
    //   to: 'garbin@dianpou.com',
    //   subject: 'test',
    //   text: 'test'
    // })
    // const log = require('winston')
    // const { Post } = require('../models')
    // let a = await Post.fetchAll()
    log.info('mail sended')
  }
}
