import React from 'react'
import Joi from 'joi'
import modal from '../../components/resource/modal_form'
import { actions as async } from '../../reduxers/async'

const schema = {
  name: Joi.string().required(),
  desc: Joi.string(),
  permissions: Joi.object()
}

export default modal({
  resource: 'role',
  formTitle: '编辑权限',
  method: 'patch',
  fields: [
    {name: 'name', label: '角色名称', type: 'text'},
    {name: 'desc', label: '描述', type: 'text'}
  ],
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(async.get('role')(`/roles/${match.params.id}`))
  },
  validate: schema
})
