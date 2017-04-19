import React from 'react'
import Joi from 'joi'
import { toastr } from 'react-redux-toastr'
import { change, Field } from 'redux-form'
import { Button, Input } from 'reactstrap'
import { Select } from '../../components/form'
import dropzone from '../../components/dropzone'
import modal, { ModalForm } from '../../components/resource/modal'
import { actions as async } from '../../reduxers/async'
import { actions as common } from '../../reduxers/common'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
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
  componentWillMount () {
    super.componentWillMount()
    const { dispatch } = this.props
    dispatch(async.get('roles')('/roles'))
    // dispatch(async.clear('avatar')())
  }
  componentWillUnmount () {
    super.componentWillUnmount()
    const { dispatch } = this.props
    dispatch(async.clear('avatar')())
  }
  renderBody () {
    const { dispatch, result: { avatar = {} } } = this.props
    const Avatar = dropzone({
      keyName: 'avatar',
      onSuccess: files => {
        dispatch(common.result('avatar')(files[0].value.data))
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
    return dispatch(async.post('avatar')('/files', data, {
      headers: { 'content-type': 'multipart/form-data' }
    })).then(v => {
      dispatch(change('user', 'avatar', v.value.data.file_path))
    })
  }
  handleSubmit (values) {
    const { dispatch, intl } = this.props
    const { roles } = values
    const data = _.omit(values, ['id', 'password_confirm', 'roles'])
    return dispatch(async.post('user')('/users', {...data, roles: (roles || []).map(role => role.value)})).then(v => {
      this.handleClose()
      toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
    })
  }
}

export default modal({
  mapStateToProps: [state => ({
    async: state.async,
    result: state.result
  })],
  resource: 'user',
  formTitle: <FormattedMessage id='user.create' />,
  method: 'post',
  fields: [
    {name: 'username', label: <FormattedMessage id='username' />, type: 'text'},
    {name: 'email', label: <FormattedMessage id='email' />, type: 'text'},
    {name: 'password', label: <FormattedMessage id='password' />, type: 'password'},
    {name: 'password_confirm', label: <FormattedMessage id='password_confirm' />, type: 'password'},
    function (props) {
      const { async } = this.props
      const options = _.get(async, 'roles.response', []).map(role => ({value: role.id, label: role.name}))
      return <Field key='roles' component={Select} label={<FormattedMessage id='user.role' />} multi name='roles' options={options} />
    }
  ],
  validate: schema
})(CreateForm)
