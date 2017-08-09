module.exports = ({shelljs, argv, addon}) => {
  if (argv.delete) shelljs.exec(`rm -rf storage/public/default/* && echo "build: default removed"`)
  shelljs.exec(`echo "building default" && \
    webpack --progress --colors \
    --config ./app/clients/default/webpack \
    --env.client default ${addon} && \
    echo "default build completed"`)
}
