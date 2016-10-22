import Queue from 'bull'
import config from '../../../config'
import _ from 'lodash'

export default {
  command: 'bullui',
  description: 'Bull Queue Admin UI',
  options:{
    '-p, --port [mode]': 'Port'
  },
  action: (options) => {
    let ui = require('toureiro')({
      redis: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password
      }
    });

    ui.listen(options.port || 5000, function(){
      console.log('Bull-UI started listening on port', this.address().port);
    });
  }
};
