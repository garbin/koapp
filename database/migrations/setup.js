exports.up = function(knex, Promise) {
  return knex.schema
             .createTable('oauth_clients', function (table) {
               table.string('client_id').primary();
               table.string('client_secret');
               table.string('redirect_uri');
               table.string('grant_types');
               table.string('scope');
               table.string('user_id');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('oauth_authorization_codes', function (table) {
               table.string('code').primary();
               table.string('client_id');
               table.string('user_id');
               table.string('redirect_uri');
               table.string('scope');
               table.timestamp('expires_at');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('oauth_tokens', function (table) {
               table.increments('id').primary();
               table.string('client_id');
               table.string('user_id');
               table.string('scope');
               table.string('access_token').unique();
               table.string('refresh_token').unique();
               table.timestamp('access_token_expires_at');
               table.timestamp('refresh_token_expires_at');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('users', function (table) {
               table.increments('id').primary();
               table.string('username').unique();
               table.string('password');
               table.string('email').unique();
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('user2role', function (table) {
               table.integer('user_id');
               table.integer('role_id');
             })
             .createTable('roles', function (table) {
               table.increments('id').primary();
               table.string('name').unique();
               table.jsonb('permissions');
             })
             .createTable('user_accounts', function (table) {
               table.increments('id').primary();
               table.integer('user_id');
               table.string('provider');
               table.string('account_id');
               table.string('access_token');
               table.string('refresh_token');
               table.jsonb('profile');
               table.timestamp('expires_at');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('posts', function(table) {
               table.increments('id').primary();
               table.string('title');
               table.text('contents');
               table.integer('user_id');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             })
             .createTable('comments', function(table) {
               table.increments('id').primary();
               table.string('title');
               table.text('contents');
               table.integer('user_id');
               table.integer('post_id');
               table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
               table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
             });
};

exports.down = function(knex, Promise) {
  return knex.schema
             .dropTable('users')
             .dropTable('roles')
             .dropTable('user2role')
             .dropTable('user_accounts')
             .dropTable('oauth_clients')
             .dropTable('oauth_authorization_codes')
             .dropTable('oauth_tokens')
             .dropTable('posts')
             .dropTable('comments');
};
