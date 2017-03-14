const md5 = require('blueimp-md5')

exports.seed = async function (knex, Promise) {
  const { User, Role, OAuth } = require('../../app/models')
  let user = await User.forge().save({
    username: 'test', password: 'test', email: 'test@gmail.com'
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
