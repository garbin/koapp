const md5 = require('blueimp-md5')

exports.seed = async function (knex, Promise) {
  const { Client, User, Role, Token } = require('../../app/models')
  let user = await User.forge().save({
    username: 'test', password: md5('test'), email: 'test@gmail.com'
  })
  let client = await Client.forge().save({
    id: '01B98M4375SQ2TQYNMHSNTKPDK',
    client_secret: '530897d5880494a6a9ac92d1273d8ba5',
    redirect_uri: 'http://localhost:5000',
    user_id: user.get('id').toString()
  })
  await Token.issue(client.id, user.id.toString(), {
    access_token: '691ae08f7b038e5b09983d2435d3a878',
    refresh_token: '791ae08f7b038e5b09983d2435d3a878'
  })
  let role = await Role.forge().save({
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
