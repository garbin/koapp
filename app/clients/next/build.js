module.exports = ({ shelljs, argv, addon }) => {
  if (argv.delete) { shelljs.exec(`rm -rf storage/public/store/* && echo "build: store removed"`) }
  console.log('store is building...')
  shelljs.exec('next build app/clients/next')
  console.log('store is build completed')
}
