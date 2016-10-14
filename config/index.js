module.exports = Object.assign({}, require('./default'), require('./' + process.env.NODE_ENV));
