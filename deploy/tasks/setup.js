module.exports = {
  name: 'setup',
  local () {
    this.log('Start setup')
    this.transfer(['./app/**/*'], '/tmp/test')
    // this.exec('npm install')
    // this.exec('npm start build')
  },
  remote (env) { }
}
