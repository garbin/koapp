import React from 'react'
import { connect } from 'react-redux'
import Joi from 'joi'
import { toastr } from 'react-redux-toastr'
import Dropzone from 'react-dropzone'
import { change } from 'redux-form'
import { Button, Input } from 'reactstrap'
import { Field } from 'redux-form'
import modal from '../../components/resource/modal_form'
import { actions as async } from '../../reduxers/async'
import _ from 'lodash'

const schema = {
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  avatar: Joi.string(),
  password: Joi.string().min(2).required(),
  password_confirm: Joi.string().required().valid(Joi.ref('password')).options({
    language: {
      any: {
        allowOnly: '两次输入的密码不一致'
      }
    }
  })
}


export function upload (files) {
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

export default connect(state => ({async: state.async}))(modal({
  resource: 'user',
  formTitle: '添加用户',
  method: 'post',
  componentWillMount: function () {
    const { dispatch } = this.props
    dispatch(async.get('roles')('/roles'))
    // dispatch(async.clear('avatar')())
  },
  componentWillUnmount: function () {
    const { dispatch } = this.props
    dispatch(async.clear('avatar')())
  },
  body: function (fields) {
    const { async } = this.props
    console.log(async.roles)
    return (
      <div className='row'>
        <div className='col-xs-3'>
          <Dropzone ref={node => { this.dropzone = node }} onDrop={upload.bind(this)} multiple={false} style={{}}>
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
        <div className='col-xs-9'>{fields}</div>
      </div>
    )
  },
  fields: [
    {name: 'username', label: '用户名', type: 'text'},
    {name: 'email', label: 'Email', type: 'text'},
    {name: 'password', label: '密码', type: 'password'},
    {name: 'password_confirm', label: '确认密码', type: 'password'}
  ],
  submit (values) {
    const { dispatch } = this.props
    const { id, password_confirm, ...data } = values
    console.log(values, data)
    return dispatch(async.post('user')('/users', data)).then(v => {
      this.close()
      toastr.success('恭喜', '提交成功!')
    })
  },
  validate: schema
}))
