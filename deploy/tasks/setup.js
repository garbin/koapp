module.exports = {
  name: 'setup',
  local () {
    this.log('Start setup')
    this.transfer(this.exec('git ls-files'), '/tmp/files')
  },
  remote () {
    this.exec('docker run --rm -v /tmp/files:/usr/src/app node npm install')
  }
}
