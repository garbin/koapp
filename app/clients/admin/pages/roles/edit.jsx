import React from 'react'
import Joi from 'joi'
import { compose, graphql, gql } from 'react-apollo'
import { mutations } from 'react-apollo-compose'
import { toastr } from 'react-redux-toastr'
import { FormattedMessage } from 'react-intl'
import { clone, omit } from 'lodash'
import { modal } from '../../components/resource/modal'
import PermissionEditor from './permission_editor'
import { CreateForm } from './create'
import { RoleInfo } from '../../graphql/fragments'
import { updateRole } from '../../graphql/mutations'

const schema = {
  name: Joi.string().required(),
  desc: Joi.string(),
  permissions: Joi.object({
    num: Joi.number(),
    features: Joi.object()
  })
}

export class EditForm extends CreateForm {
  get mutation () {
    return this.props.mutations.updateRole
  }
  async handleSubmit (values) {
    const { updateRole, intl, match } = this.props
    const data = omit(values, ['__typename'])
    await updateRole({
      variables: {
        input: data,
        id: match.params.id
      }
    })
    this.handleClose()
    toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
  }
}

export default compose(
  graphql(gql`
    query Role($id: ID!) {
      role: fetch(id: $id, type: ROLE) {
        ... on Role {
          ...RoleInfo
        }
      }
    }
    ${RoleInfo}
  `, {
    options: props => ({
      variables: { id: props.match.params.id }
    }),
    props: ({ownProps, data}) => {
      const { role } = data
      let initialValues
      if (role) {
        initialValues = clone(role)
      }
      return {
        data,
        initialValues
      }
    }
  }),
  mutations({ updateRole }),
  modal({
    name: 'updateRole',
    schema,
    props: props => {
      return {
        title: <FormattedMessage id='edit' />,
        fields: [
          {name: 'name', label: <FormattedMessage id='role.name' />, type: 'text'},
          {name: 'desc', label: <FormattedMessage id='role.desc' />, type: 'text'},
          (Field, Input) => (<PermissionEditor key='permission' />)
        ]
      }
    }
  })
)(EditForm)
