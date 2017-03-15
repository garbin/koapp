import React from 'react'
import Joi from 'joi'
import modal from '../../components/resource/modal_form'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'
import Dropzone from 'react-dropzone'

const schema = {
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
  password_confirm: Joi.string().required().valid(Joi.ref('password')).options({
    language: {
      any: {
        allowOnly: '两次输入的密码不一致'
      }
    }
  })
}

export default modal({
  resource: 'user',
  formTitle: '添加用户',
  method: 'post',
  body: fields => (
    <div className='row'>
      <div className='col-xs-3'>
        <Dropzone onDrop={console.log}>
          <div>Avatar</div>
        </Dropzone>
      </div>
      <div className='col-xs-9'>{fields}</div>
    </div>
  ),
  fields: [
    {name: 'username', label: '用户名', type: 'text'},
    {name: 'email', label: 'Email', type: 'text'},
    {name: 'password', label: '密码', type: 'password'},
    {name: 'password_confirm', label: '确认密码', type: 'password'}
  ],
  submit (values) {
    const { dispatch } = this.props
    const { username, email, password } = values
    return dispatch(async.post('user')('/users', {username, email, password})).then(v => {
      this.close()
      toastr.success('恭喜', '提交成功!')
    })
  },
  validate: schema
})
