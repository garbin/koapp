const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
module.exports = withCss(withSass({
  distDir: '../../../storage/public',
  webpack: (config, { dev }) => {
    if (config.resolve.alias) {
      delete config.resolve.alias['react']
      delete config.resolve.alias['react-dom']
    }
    return config
  }
}))
