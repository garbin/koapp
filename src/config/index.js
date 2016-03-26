import default_config from './default';

export default Object.assign(default_config, require('./' + process.env.NODE_ENV).default);
