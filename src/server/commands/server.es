// import server from '../'
import config from '../../../config'

export default {
  command: 'server',
  description: 'run web server',
  options: {
    '-w, --watch': 'Watch'
  },
  action: () => {
    require('../').default.listen(
      config.port,
      () => console.log(`server is running on port ${config.port}`)
    )
  }
}
