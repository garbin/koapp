import React from 'react'
import axios from 'axios'
import config from '../config'
import qs from 'query-string'
import TreeModel from 'tree-model'
import numeral from 'numeral'
import moment from 'moment'
import { Router } from '../routes'

export const user = {
  required ({ store, req, res }) {
    const { oauth } = store.getState()
    if (!oauth.user.profile) {
      if (!process.browser) {
        const signinLocaiton = `/session/signin?${qs.stringify({
          prev: `${req.origin}${req.url}`
        })}`
        res.writeHead(301, { Location: signinLocaiton })
        return res.end()
      } else {
        const signinLocation = `/session/signin?${qs.stringify({
          prev: window.location.href
        })}`
        Router.push(signinLocation)
      }
    }
  }
}
export function createClient (token = f => f) {
  const client = axios.create({ baseURL: config.api, timeout: 10000 })
  client.interceptors.request.use(config => {
    if (token()) config.headers.Authorization = `Bearer ${token()}`
    return config
  }, Promise.reject)
  return client
}
export const formatters = {
  price (price, format = '$0.00') {
    return numeral(price).format(format)
  },
  datetime (datetime, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(datetime).format(format)
  }
}

export function treeOptions (data) {
  const tree = new TreeModel()
  const [root, ...nodes] = tree.parse(data).all()
  const options = [{
    label: <span>{root.model.name}</span>,
    value: root.model.value || root.model.name
  }]
  nodes.forEach((node, index) => {
    const [, ...path] = node.getPath()
    const isLast = node.getIndex() + 1 === node.parent.children.length
    const level = path.length
    const name = node.model.name
    options.push({
      label: (
        <span>
          {Array.from(Array(level - 1).keys()).map((item, idx) => (
            <span key={idx} style={{ marginRight: `2em` }}>│</span>
          ))}
          {isLast ? '└─ ' : '├─ '}{name}
        </span>
      ),
      value: node.model.value || path.map(item => item.model.name).join(','),
      disabled: level < 3
    })
  })
  return options
}
