import React from 'react'
import Joi from 'joi'
import modal from '../../components/resource/modal_form'
import PermissionEditor from './permission_editor'

const schema = {
  name: Joi.string().required(),
  desc: Joi.string(),
  permissions: Joi.object()
}
// {num:5, features:['admin.users', 'admin.']}
// features: [{name:'系统管理', items:['admin.users', 'admin.roles']}]

export default modal({
  resource: 'role',
  formTitle: '添加权限',
  method: 'post',
  fields: [
    {name: 'name', label: '角色名称', type: 'text'},
    {name: 'desc', label: '描述', type: 'text'},
    (Field, Input) => (<PermissionEditor />)
  ],
  validate: schema
})
