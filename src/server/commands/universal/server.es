import Koapi, { Router, Koa } from 'koapi'
import convert from 'koa-convert'
import mount from 'koa-mount'
import logger, {winston} from 'koapi/lib/logger'
import config from '../../../../config'
import historyApiFallback from 'koa-history-api-fallback'

export default function server(webpackIsomorphicTools) {
  logger.add(winston.transports.File, {
    name: 'koapp',
    json: false,
    filename: __dirname + '/../../../../storage/logs/koapp.log'
  });

  const app = new Koapi();

  // app.bodyparser();
  // app.compress();

  if (config.universal.server) {
    app.use(mount(config.universal.server, require('../../').default.koa));
  }

  if (config.universal.ssr) {
    if (process.env.NODE_ENV == 'development')webpackIsomorphicTools.refresh();
    app.use(require('../../middlewares/ssr').default(webpackIsomorphicTools));
  }

  if (process.env.NODE_ENV == 'development') {
    app.use(convert(require('koa-proxy')({
      host:'http://localhost:' + (config.dev_server_port || config.port + 1),
    })));
  } else {
    app.serve({root: __dirname + '/../../../../storage/public'});
  }


  app.use(convert(historyApiFallback()));


  const server = app.listen(
    config.port,
    e => console.log(`Server running on port ${config.port}`)
  );

  return server;
}
