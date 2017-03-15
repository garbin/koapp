import React from 'react'
import { connect } from 'react-redux'
import Joi from 'joi'
import { toastr } from 'react-redux-toastr'
import Dropzone from 'react-dropzone'
import { Field } from 'redux-form'
import { Button, Input } from 'reactstrap'
import modal from '../../components/resource/modal_form'
import { actions as async } from '../../reduxers/async'
import { upload } from './create'
import _ from 'lodash'

const schema = {
  username: Joi.string().required(),
  avatar: Joi.string(),
  email: Joi.string().email().required()
}

export default connect(state => ({user_form: state.form.user_form}))(modal({
  resource: 'user',
  formTitle: '编辑用户',
  method: 'patch',
  componentWillUnmount: function () {
    const { dispatch } = this.props
    dispatch(async.clear('avatar')())
  },
  body: function (fields) {
    const { user_form, async } = this.props
    return (
      <div className='row'>
        <div className='col-xs-3'>
          <Dropzone ref={node => { this.dropzone = node }} onDrop={upload.bind(this)} multiple={false} style={{}}>
            {({acceptedFiles}) => {
              if (_.get(async, 'avatar.status') === 'fulfilled') {
                return <div className='image rounded' style={{backgroundImage: `url(${async.avatar.response.file_path})`}} />
              } else {
                return <div className='image rounded' style={{backgroundImage: `url(${_.get(user_form, 'values.avatar')})`}} />
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
    {name: 'email', label: 'Email', type: 'text'}
  ],
  submit (values) {
    const { dispatch, match } = this.props
    const { id, ...data } = values
    return new Promise((resolve, reject) => {
      dispatch(async.patch('user')(`/users/${match.params.id}`, data)).then(v => {
        this.close()
        toastr.success('恭喜', '编辑成功!')
        return v
      }).then(resolve).catch(reject)
    })
  },
  validate: schema
}))
