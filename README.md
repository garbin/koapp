# Koapp
A univeral web app framework baed on Koa & React & Redux

## Contains

- [x] [React](http://facebook.github.io/react)
- [x] [Redux](http://redux.js.org)
- [x] [react-router](https://github.com/reactjs/react-router)
- [x] [react-router-redux](https://github.com/reactjs/react-router-redux)
- [x] [redux-form](https://github.com/erikras/redux-form)
- [x] [redux-thunk](https://github.com/gaearon/redux-thunk)
- [x] [react-validation-mixin with Joi](https://github.com/jurassix/react-validation-mixin)
- [x] [fetch-plus](https://github.com/RickWong/fetch-plus)
- [x] [Webpack](https://webpack.github.io/)
- [x] [Babel](http://babeljs.io/)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
- [x] [PostCSS](https://github.com/postcss/postcss)
- [x] [Rucksack](http://simplaio.github.io/rucksack/docs)
- [x] [Koapi](https://github.com/koapi/koapi)
- [x] [Knex](http://knexjs.org/)
- [x] [Bookshelf](http://bookshelfjs.org/)
- [x] [Babel](https://babeljs.io/)
- [x] [Apidoc](http://apidocjs.com/)
- [x] [Nodemon](http://nodemon.io/)
- [x] [Istanbul](https://github.com/gotwarlost/istanbul)
- [x] [Avajs](https://ava.li)
- [x] [chaijs](http://chaijs.com)

## For deployment
### start server
```bash
npm start server
```

### start service
```bash
npm start service
```

### start universal server
```bash
npm start universal
```

## For development
### Watch file-changes and auto restart server(Dev-mode)
```bash
npm run watch server
```
### Watch file-changes and auto restart services(Dev-mode)
```bash
npm run watch service
```
### watch client
```bash
npm run watch client
```
### watch universal
```bash
npm run watch universal
```

## For build
### build server side code
```bash
npm run build
# or
npm run build server
```
### build client side code
```bash
npm run build client
```
### build docs
```bash
npm run build docs
```
### build schemas
```bash
npm run build schemas
```

## Test

```bash
# For unit testing
npm test

# For code coverage testing
npm run test -- --coverage
```

## maintenance
### database
```bash
# migrate latest
npm run migrate

# Rollback db changes
npm run migrate rollback
```

```bash
# migrate & seed
npm run migrate setup
```

```bash
# rollback & migrate & seed
npm run migrate reset
```

### server command
```bash
npm run command ${command name in server/commands}
```
