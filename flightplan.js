const { config } = require('koapi')
const plan = require('flightplan')
const hosts = config('deployment').get('hosts')
const tasks = require('./deploy/tasks')
plan.target('deployment', hosts)

tasks(plan)
