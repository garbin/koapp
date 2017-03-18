import React from 'react'
import Joi from 'joi'
import modal, { ModalForm } from '../../components/resource/modal_form'
import { actions as async } from '../../reduxers/async'
import PermissionEditor from './permission_editor'

export class RoleEdit extends ModalForm {
  componentWillMount () {
    super.componentWillMount()
    const { dispatch, match } = this.props
    dispatch(async.get('role')(`/roles/${match.params.id}`))
  }
}

const schema = {
  name: Joi.string().required(),
  desc: Joi.string(),
  permissions: Joi.object({
    num: Joi.number(),
    features: Joi.object()
  })
}

export default modal({
  resource: 'role',
  formTitle: '编辑权限',
  method: 'patch',
  fields: [
    {name: 'name', label: '角色名称', type: 'text'},
    {name: 'desc', label: '描述', type: 'text'},
    (Field, Input) => (<PermissionEditor key='permission' />)
  ],
  validate: schema
}, RoleEdit)
