import defaultConfig from './default'

export default Object.assign(defaultConfig, require(`./${process.env.NODE_ENV}`).default)
