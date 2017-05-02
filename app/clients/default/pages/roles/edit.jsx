import React from 'react'
import Joi from 'joi'
import modal, { ModalForm } from '../../components/resource/modal'
import { api } from '../../redux/actions'
import { FormattedMessage } from 'react-intl'
import PermissionEditor from './permission_editor'

export class RoleEdit extends ModalForm {
  componentWillMount () {
    super.componentWillMount()
    const { dispatch, match } = this.props
    dispatch(api.get('role')(`/roles/${match.params.id}`))
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
  formTitle: <FormattedMessage id='edit' />,
  method: 'patch',
  fields: [
    {name: 'name', label: <FormattedMessage id='role.name' />, type: 'text'},
    {name: 'desc', label: <FormattedMessage id='role.desc' />, type: 'text'},
    (Field, Input) => (<PermissionEditor key='permission' />)
  ],
  validate: schema
})(RoleEdit)
