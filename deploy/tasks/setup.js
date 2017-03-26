module.exports = {
  name: 'setup',
  local () {
    this.log('Start setup')
    this.transfer(this.exec('git ls-files'), '/tmp/files')
  },
  remote () {
    this.exec('docker run --rm -w /usr/src/app -v /tmp/files:/usr/src/app node npm install')
  }
}
