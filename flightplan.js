const plan = require('flightplan')
const config = require('./deploy/config')
const tasks = require('./deploy/tasks')
plan.target('deployment', config.hosts)

tasks(plan)
