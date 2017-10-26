import React from 'react'
import Joi from 'joi'
import { toastr } from 'react-redux-toastr'
import { change, Field } from 'redux-form'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { mutations } from 'react-apollo-compose'
import { FormattedMessage } from 'react-intl'
import { omit } from 'lodash'
import { Button, Input } from 'reactstrap'
import { api, result } from '../../redux/actions'
import dropzone from '../../components/dropzone'
import ModalForm, { modal } from '../../components/resource/modal'
import { RoleInfo } from '../../graphql/fragments'
import { createUser } from '../../graphql/mutations'
const FormData = window.FormData

const schema = {
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  avatar: Joi.string(),
  roles: Joi.array(),
  password: Joi.string().min(2).required(),
  password_confirm: Joi.string().required().valid(Joi.ref('password')).options({
    language: {
      any: {
        allowOnly: 'Please check your password'
      }
    }
  })
}

export class CreateForm extends ModalForm {
  get mutation () { return this.props.mutations.createUser }
  renderBody () {
    const { dispatch, result: {avatar = {}} } = this.props
    const Avatar = dropzone({
      keyName: 'avatar',
      onSuccess: files => {
        dispatch(result.set('avatar')(files[0].value.data))
        dispatch(change('user', 'avatar', files[0].value.data.file_path))
      },
      onError: console.error
    })(props => (
      <div className='image rounded' style={{backgroundImage: `url(${avatar.file_path})`}}>
        {!avatar.file_path && <div className='dropfilezone'>拖放头像至此</div>}
      </div>
    ))
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <Avatar multiple={false} refCallback={node => { this.dropzone = node }} />
          <Button type='button' block color='primary' size='sm' onClick={e => this.dropzone.open()}>
            <FormattedMessage id='upload' />
          </Button>
          <Field component={({input, meta, ...others}) => (<Input {...input} {...others} />)}
            style={{display: 'none'}} type='text' name='avatar' />
        </div>
        <div className='col-sm-9'>{this.renderFields()}</div>
      </div>
    )
  }
  handleUpload (files) {
    const { dispatch } = this.props
    const data = new FormData()
    const file = files[0]
    data.append('file', file, file.name)
    return dispatch(api.post('avatar')('/files', data, {
      headers: { 'content-type': 'multipart/form-data' }
    })).then(v => {
      dispatch(change('user', 'avatar', v.value.data.file_path))
    })
  }
  async handleSubmit (values) {
    const { createUser, intl } = this.props
    const { roles } = values
    const data = omit(values, ['id', 'password_confirm', 'roles'])
    await createUser({
      variables: {
        input: {
          ...data,
          roles: (roles || []).map(role => role.value)
        }
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
  mutations({ createUser }),
  modal({
    name: 'createForm',
    schema,
    props: props => ({
      title: <FormattedMessage id='user.create' />,
      fields: [
        {name: 'username', label: <FormattedMessage id='username' />, type: 'text'},
        {name: 'email', label: <FormattedMessage id='email' />, type: 'text'},
        {name: 'password', label: <FormattedMessage id='password' />, type: 'password'},
        {name: 'password_confirm', label: <FormattedMessage id='password_confirm' />, type: 'password'},
        {name: 'roles', type: 'select', label: <FormattedMessage id='user.role' />, multi: true, options: props.data.loading ? [] : props.data.roles.edges.map(edge => ({value: edge.node.id, label: edge.node.name}))}
      ]
    })
  })
)(CreateForm)
