import React from 'react'
import Joi from 'joi'
import { toastr } from 'react-redux-toastr'
import Dropzone from 'react-dropzone'
import { change, Field } from 'redux-form'
import { Button, Input } from 'reactstrap'
import { Select } from '../../components/form'
import modal, { ModalForm } from '../../components/resource/modal_form'
import { actions as async } from '../../reduxers/async'
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
        allowOnly: '两次输入的密码不一致'
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
    super.componentWillMount()
    const { dispatch } = this.props
    dispatch(async.clear('avatar')())
  }
  handleUpload (files) {
    const { dispatch } = this.props
    const data = new FormData()
    const file = files[0]
    data.append('file', file, file.name)
    return dispatch(async.post('avatar')('/files', data, {
      headers: { 'content-type': 'multipart/form-data' }
    })).then(v => {
      dispatch(change('user_form', 'avatar', v.value.data.file_path))
    })
  }
}

export default modal({
  resource: 'user',
  formTitle: <FormattedMessage id='create' />,
  method: 'post',
  body: function (fields) {
    const { async } = this.props
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <Dropzone ref={node => { this.dropzone = node }} onDrop={this.handleUpload.bind(this)} multiple={false} style={{}}>
            {({acceptedFiles}) => {
              if (_.get(async, 'avatar.status') === 'fulfilled') {
                return <div className='image rounded' style={{backgroundImage: `url(${async.avatar.response.file_path})`}} />
              } else {
                return <div className='image rounded'><div className='dropfilezone'>拖放头像至此</div></div>
              }
            }}
          </Dropzone>
          <Button type='button' block color='primary' size='sm' onClick={e => this.dropzone.open()}>上传</Button>
          <Field component={({input, meta, ...others}) => (<Input {...input} {...others} />)}
            style={{display: 'none'}} type='text' name='avatar' />
        </div>
        <div className='col-sm-9'>{fields}</div>
      </div>
    )
  },
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
  submit (values) {
    const { dispatch, intl } = this.props
    const { roles } = values
    const data = _.omit(values, ['id', 'password_confirm', 'roles'])
    return dispatch(async.post('user')('/users', {...data, roles: roles.map(role => role.value)})).then(v => {
      this.close()
      toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
    })
  },
  validate: schema
}, CreateForm)
