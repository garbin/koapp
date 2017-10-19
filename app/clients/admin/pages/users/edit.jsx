import React from 'react'
import Joi from 'joi'
import { compose } from 'recompose'
import { graphql, gql } from 'react-apollo'
import { toastr } from 'react-redux-toastr'
import { mutations } from 'react-apollo-compose'
import { Field, change } from 'redux-form'
import { Button, Input } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { omit } from 'lodash'
import dropzone from '../../components/dropzone'
import { withLoading } from '../../components/utils'
import { modal } from '../../components/resource/modal'
import { result } from '../../redux/actions'
import { RoleInfo } from '../../graphql/fragments'
import { updateUser } from '../../graphql/mutations'
import { CreateForm } from './create'

const schema = {
  username: Joi.string().required(),
  avatar: Joi.string().allow(''),
  roles: Joi.array(),
  email: Joi.string().email().required()
}

export class EditForm extends CreateForm {
  get mutation () {
    return this.props.mutations.updateUser
  }
  renderBody () {
    const { initialValues = {}, result: { avatar = {} }, dispatch } = this.props
    const avatarPath = avatar.file_path || initialValues.avatar
    const Avatar = dropzone({
      keyName: 'avatar',
      onSuccess: files => {
        dispatch(result.set('avatar')(files[0].value.data))
        dispatch(change('user', 'avatar', files[0].value.data.file_path))
      },
      onError: console.error
    })(props => (
      <div className='image rounded' style={{backgroundImage: `url(${avatarPath})`}}>
        {!avatarPath && <div className='dropfilezone'>拖放头像至此</div>}
      </div>
    ))
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <Avatar multiple={false} refCallback={node => { this.dropzone = node }} />
          <Button type='button' block color='primary' size='sm' onClick={e => this.dropzone.open()}>上传</Button>
          <Field component={({input, meta, ...others}) => (<Input {...input} {...others} />)}
            style={{display: 'none'}} type='text' name='avatar' />
        </div>
        <div className='col-sm-9'>{this.renderFields()}</div>
      </div>
    )
  }
  async handleSubmit (values) {
    const { updateUser, intl, match } = this.props
    const { roles } = values
    const data = omit(values, ['id', 'roles'])
    await updateUser({
      variables: {
        input: {
          ...data,
          roles: (roles || []).map(role => role.value)
        },
        id: match.params.id
      }
    })
    this.handleClose()
    toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
  }
}

export default compose(
  graphql(gql`
    query Roles($id: ID!, $limit: Int!) {
      user: fetch(id: $id, type: USER) {
        ... on User {
          username
          email
          roles {
            ...RoleInfo
          }
          avatar
        }
      }
      roles: search(first: $limit, type: ROLE) {
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
  `, {
    options: props => ({
      variables: {
        limit: 1000,
        id: props.match.params.id
      }
    }),
    props: ({ownProps, data}) => {
      const { user: userData } = data
      let user
      if (userData) {
        let roles
        const { username, email, avatar } = userData
        if (userData.roles) {
          roles = userData.roles.map(role => ({value: role.id, label: role.name}))
        }
        user = {roles, username, email, avatar}
        user.avatar = userData.avatar || ''
      }
      return {
        data,
        initialValues: user
      }
    }
  }),
  mutations({ updateUser }),
  modal({
    name: 'updateUser',
    schema,
    props: props => {
      return {
        title: <FormattedMessage id='user.edit' />,
        fields: [
          {name: 'username', label: <FormattedMessage id='username' />, type: 'text'},
          {name: 'email', label: <FormattedMessage id='email' />, type: 'text'},
          {name: 'roles', type: 'select', label: <FormattedMessage id='user.role' />, multi: true, options: props.data.loading ? [] : props.data.roles.edges.map(edge => ({value: edge.node.id, label: edge.node.name}))}
        ]
      }
    }
  }),
  withLoading()
)(EditForm)
