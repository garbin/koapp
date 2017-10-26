import React from 'react'
import Joi from 'joi'
import { compose, graphql } from 'react-apollo'
import { mutations } from 'react-apollo-compose'
import { FormattedMessage } from 'react-intl'
import Modal, { modal } from '../../components/resource/modal'
import PermissionEditor from './permission_editor'
import { toastr } from 'react-redux-toastr'
import { RoleInfo } from '../../graphql/fragments'
import { createRole } from '../../graphql/mutations'
import gql from 'graphql-tag'

const schema = {
  name: Joi.string().required(),
  desc: Joi.string(),
  permissions: Joi.object()
}
export class CreateForm extends Modal {
  get mutation () { return this.props.mutations.createRole }
  async handleSubmit (values) {
    const { createRole, intl } = this.props
    await createRole({
      variables: {
        input: values
      }
    })
    this.handleClose()
    toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
  }
}

export default compose(
  graphql(gql`
    query Roles {
      roles: search(first: 1000, type: ROLE) {
        edges {
          node {
            ... on Role {
              ...RoleInfo
            }
          }
        }
      }
    }
    ${RoleInfo}
  `),
  mutations({ createRole }),
  modal({
    name: 'createForm',
    schema,
    props: props => ({
      title: <FormattedMessage id='role.create' />,
      fields: [
        {name: 'name', label: <FormattedMessage id='role.name' />, type: 'text'},
        {name: 'desc', label: <FormattedMessage id='role.desc' />, type: 'text'},
        (Field, Input) => (<PermissionEditor key='permission' />)
      ]
    })
  })
)(CreateForm)
// export default modal({
//   resource: 'role',
//   formTitle: ,
//   method: 'post',
//   fields: [
//     {name: 'name', label: <FormattedMessage id='role.name' />, type: 'text'},
//     {name: 'desc', label: <FormattedMessage id='role.desc' />, type: 'text'},
//     (Field, Input) => (<PermissionEditor key='permission' />)
//   ],
//   validate: schema
// })()
