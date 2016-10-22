// import server from '../'
import config from '../../../config'
import log from 'koapi/lib/logger'

export default {
  command: 'server',
  description: 'run web server',
  options: {
    '-w, --watch': 'Watch',
  },
  action: (options) => {
    require('../').default.listen(
      config.port,
      e => console.log(`server is running on port ${config.port}`)
    )
  }
};
