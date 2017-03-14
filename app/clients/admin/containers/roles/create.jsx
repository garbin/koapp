import React from 'react'
import Joi from 'joi'
import modal from '../../components/resource/modal_form'

const schema = {
  name: Joi.string().required(),
  desc: Joi.string(),
  permissions: Joi.object()
}

export default modal({
  resource: 'role',
  formTitle: '添加权限',
  method: 'post',
  fields: [
    {name: 'name', label: '角色名称', type: 'text'},
    {name: 'desc', label: '描述', type: 'text'}
  ],
  validate: schema
})
