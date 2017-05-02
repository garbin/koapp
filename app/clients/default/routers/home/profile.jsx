import React from 'react'
import modalForm, { Modal } from '../../components/form/modal'
import Joi from 'joi'
import { toastr } from 'react-redux-toastr'
import Dropzone from 'react-dropzone'
import { Field, change } from 'redux-form'
import { Button, Input } from 'reactstrap'
import { api, modal } from '../../redux/actions'
import { FormattedMessage } from 'react-intl'
import { actions as oauth2 } from 'react-redux-oauth2'
import _ from 'lodash'
const FormData = window.FormData

const schema = Joi.object().keys({
  avatar: Joi.string().allow(''),
  old_password: Joi.string().empty(''),
  password: Joi.string().min(6).empty(''),
  password_confirm: Joi.string().valid(Joi.ref('password')).options({
    language: {
      any: {
        allowOnly: 'Please check your password'
      }
    }
  })
}).unknown().and('old_password', 'password')

export class ProfileForm extends Modal {
  handleUpload (files) {
    const { dispatch } = this.props
    const data = new FormData()
    const file = files[0]
    data.append('file', file, file.name)
    return dispatch(api.post('avatar')('/files', data, {
      headers: { 'content-type': 'multipart/form-data' }
    })).then(v => {
      dispatch(change('profile', 'avatar', v.value.data.file_path))
    })
  }
  handleClose () {
    const { dispatch } = this.props
    return dispatch(modal.toggle(false))
  }
  handleSubmit (values) {
    const { intl, dispatch } = this.props
    const { avatar, password, old_password: oldPassword } = values
    let data = { avatar }
    if (password && oldPassword) {
      data = {...data, password, old_password: oldPassword}
    }
    return new Promise((resolve, reject) => {
      dispatch(api.patch('profile')(`/auth/user/profile`, data)).then(v => {
        this.handleClose()
        dispatch(oauth2.loadUser(v.value.data))
        toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
        return v
      }).then(resolve).catch(e => {
        console.log(e)
        reject(e)
      })
    })
  }
  renderBody () {
    const { api, initialValues } = this.props
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <Dropzone ref={node => { this.dropzone = node }} onDrop={this.handleUpload.bind(this)} multiple={false} style={{}}>
            {({acceptedFiles}) => {
              if (_.get(api, 'avatar.status') === 'fulfilled') {
                return <div className='image rounded' style={{backgroundImage: `url(${api.avatar.response.file_path})`}} />
              } else {
                return <div className='image rounded' style={{backgroundImage: `url(${initialValues.avatar})`}} />
              }
            }}
          </Dropzone>
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
}

export default modalForm({
  mapStateToProps: [state => {
    return {
      oauth: state.oauth,
      api: state.api,
      initialValues: state.oauth.user
    }
  }],
  name: 'profile',
  formTitle: <FormattedMessage id='user.profile' />,
  method: 'patch',
  fields: [
    {name: 'old_password', label: <FormattedMessage id='old_password' />, type: 'password'},
    {name: 'password', label: <FormattedMessage id='password' />, type: 'password'},
    {name: 'password_confirm', label: <FormattedMessage id='password_confirm' />, type: 'password'}
  ],
  validate: schema
})(ProfileForm)
