module.exports = ({shelljs, argv, addon}) => {
  if (argv.delete) shelljs.exec(`rm -rf storage/public/admin/* && echo "build: admin removed"`)
  shelljs.exec(`echo "building admin" && \
    webpack --progress --colors \
    --config ./app/clients/admin/webpack \
    --env.client admin ${addon} && \
    echo "default build completed"`)
}
