const fs = require('fs')
const path = require('path')
exports.seed = async function (knex, Promise) {
  const { User, OAuth, Setting } = require('../../app/models')
  await Setting.forge().save({
    id: 'general',
    name: 'General',
    desc: 'General Settings',
    settings: {}
  })
  await Setting.forge().save({
    id: 'mail.template.reset_password',
    name: 'Reset Password template',
    desc: 'Reset Password template',
    settings: {
      subject: 'reset password',
      type: 'html',
      content: fs.readFileSync(path.resolve(__dirname, './mails/reset_password.html')).toString(),
      defaults: {}
    }
  })
  let user = await User.forge().save({
    username: 'admin',
    password: 'admin',
    email: 'garbinh@gmail.com',
    avatar: 'https://avatars2.githubusercontent.com/u/63785?v=3&s=460'
  })
  let client = await OAuth.Client.forge().save({
    id: '0f434d4b-06bf-4cb2-b8f4-f20bf9349beb',
    client_secret: '530897d5880494a6a9ac92d1273d8ba5',
    redirect_uri: 'http://localhost:5000',
    user_id: user.get('id').toString()
  })
  await OAuth.Token.issue(client.id, user.id.toString(), {
    access_token: '691ae08f7b038e5b09983d2435d3a878',
    refresh_token: '791ae08f7b038e5b09983d2435d3a878'
  })
  let role = await User.Role.forge().save({
    name: 'admin',
    permissions: true
  })
  await user.roles().attach(role)
  let post1 = await user.posts().create({
    title: 'Post Title',
    contents: 'Post Contents'
  })
  await user.posts().create({
    title: 'Post Title',
    contents: 'Post Contents'
  })
  await post1.comments().create({
    title: 'Comment Title',
    contents: 'Comment Contents',
    user_id: user.get('id')
  })
  await post1.comments().create({
    title: 'Comment Title',
    contents: 'Comment Contents',
    user_id: user.get('id')
  })
}
