import Koapi, { Model } from 'koapi';
import logger, { winston } from 'koapi/lib/logger';
import config from '../../config';
import { storage } from './lib/helper';

logger.emitErrs = true;
logger.on('error', console.error);

// console.log(storage('/logs/error.log'));
logger.add(winston.transports.File, {
  name: 'error',
  json: false,
  filename: storage('/logs/error.log'),
  level: 'error',
});

logger.add(winston.transports.File, {
  name: 'koapi',
  json: false,
  filename: storage('/logs/koapi.log'),
});


// init knex and bookshelf
Model.initialize(config.database);

const app = new Koapi();

app.setup(Object.assign({
  middlewares: require('./middlewares'),
  routers: require('./routers').default,
  serve: { root: storage('/public') },
}, config));


export default app;
