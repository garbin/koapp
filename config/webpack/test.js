module.exports = function (compiler) {
  compiler.devtool = 'cheap-module-eval-source-map'

  return compiler
}
