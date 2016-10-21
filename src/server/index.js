import Koapi from 'koapi';
// import logger, { winston } from 'koapi/lib/logger';
import config from '../../config';
import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import webpack_config from '../../config/webpack';
import { storage } from './lib/helper'

const compiler = webpack(webpack_config);
//
// logger.emitErrs = true;
// logger.on('error', console.error);

// console.log(storage('/logs/error.log'));
// logger.add(winston.transports.File, {
//   name: 'error',
//   json: false,
//   filename: storage('/logs/error.log'),
//   level: 'error',
// });
//
// logger.add(winston.transports.File, {
//   name: 'koapi',
//   json: false,
//   filename: storage('/logs/koapi.log'),
// });


// init knex and bookshelf
// Model.initialize(config.database);

const app = new Koapi();

app.setup(Object.assign({}, config));

export {app};
export default function (options) {
  if (options.watch) {
    app.koa.use(devMiddleware(compiler, {
      // noInfo: false,
      //
      // // display nothing to the console
      // quiet: false,
    }));
    app.koa.use(hotMiddleware(compiler, {}));
  } else {
    app.serve({ root: storage('/public') });
  }
  app.listen(config.port, e =>{
    console.log(`Server is running on port ${config.port}`)
  });
}
