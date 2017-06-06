# Koapp
A univeral web app framework based on Koa & React & Redux & Next.js & GraphQL

## Contains

- [x] [React](http://facebook.github.io/react)
- [x] [Redux](http://redux.js.org)
- [x] [react-router](https://github.com/reactjs/react-router)
- [x] [react-router-redux](https://github.com/reactjs/react-router-redux)
- [x] [redux-form](https://github.com/erikras/redux-form)
- [x] [redux-thunk](https://github.com/gaearon/redux-thunk)
- [x] [Webpack](https://webpack.github.io/)
- [x] [Babel](http://babeljs.io/)
- [x] [Koapi](https://github.com/koapi/koapi)
- [x] [Knex](http://knexjs.org/)
- [x] [Bookshelf](http://bookshelfjs.org/)
- [x] [Babel](https://babeljs.io/)
- [x] [Apidoc](http://apidocjs.com/)
- [x] [Nodemon](http://nodemon.io/)

## Quick Start

```bash
npm start api
npm start app
npm start queues
npm start schedulers

# ===========  OR  =============
npm start api app queues schedulers

# ======================
# build client code
npm start build
```

## Development
```bash
npm start watch api
npm start watch app
npm start watch queues
npm start watch schedulers

# ==========  OR  ============
npm start watch api app queues schedulers
# ======================
# watch clients/default
npm start watch default -- -c

# ======================
# code linting
npm start lint
```

## Deployment
```bash
# migrate latest
npm start database latest
# migrate & seed
npm start database setup
# rollback database changes
npm start database rollback
# reset database
npm start database reset
# knex operate
npm start database migrate:make
```
