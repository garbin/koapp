# Koapp
A univeral web app framework baed on Koa & React & Redux

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
# start universal server
npm start
# or
npm start universal
# start universal sever and build client
npm start universal -- -b
# start universal sever and delete public path and build client
npm start universal -- -b -- -d

# ======================
# start api server
npm start server

# ======================
# start services(eg. queue, scheduler)
npm start service

# ======================
# build client code
npm start building
```

## Development
```bash
# start universal dev server and watch file changes
npm start watching univeral

# ======================
# start api server alone with file-change watching
npm start watching server

# ======================
# start webpack-dev-server
npm start watching client

# ======================
# code linting
npm start linting
```

## Deployment
```bash
# migrate latest
npm start migrating
# migrate & seed
npm start migrating setup
# rollback database changes
npm start migrating rollback
# reset database
npm start migrating reset
```
