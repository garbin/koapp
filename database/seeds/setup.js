var moment = require('moment');
var md5 = require('blueimp-md5');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),
    knex('comments').del(),
    knex('oauth_clients').del(),
    knex('oauth_tokens').del(),
    knex('users').del(),
    knex('roles').del(),

    // Inserts seed entries
    knex('oauth_clients').insert({client_id:'123', client_secret: '123', user_id:1, redirect_uri:'http://ubuntu:5000', grant_types:'password', scope:'all'}),
    knex('oauth_tokens').insert({client_id:'123', user_id:1, access_token:'691ae08f7b038e5b09983d2435d3a878', scope:'all', access_token_expires_at:moment().add(1, 'days').toDate()}),
    knex('users').insert({username:'test', password:md5('test'), email:"test@gmail.com"}),
    knex('roles').insert({name:'admin', permissions:{all:true}}),
    knex('user2role').insert({user_id:1,role_id:1}) ,
    knex('posts').insert({title: 'Post Title', contents:'Post Contents', user_id:1}),
    knex('posts').insert({title: 'Post Title', contents:'Post Contents', user_id:1}),
    knex('comments').insert({title: 'Comment Title', contents:'Comment Contents', user_id:1, post_id:1}),
    knex('comments').insert({title: 'Comment Title', contents:'Comment Contents', user_id:1, post_id:1})
  );
};
