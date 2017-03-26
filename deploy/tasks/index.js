function task (plan, task) {
  const {name = 'default', local = i => i, remote = i => i} = require(`./${task}`)
  plan.local(name, transport => local.call(transport))
  plan.remote(name, transport => remote.call(transport))
}
module.exports = plan => {
  task(plan, 'setup')
}
