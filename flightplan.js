const plan = require('flightplan')
const config = require('./deploy/config')('deployment')
const tasks = require('./deploy/tasks')
plan.target('deployment', config.hosts)

tasks(plan)
