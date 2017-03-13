import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import Joi from 'joi'
import { validate, Input } from '../../components/form'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
         Form } from 'reactstrap'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'
import _ from 'lodash'

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

export class ModalEditor extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object
  }
  componentWillUnmount () {
    const { dispatch } = this.props
    dispatch(async.clear('user')())
  }
  close () {
    const { dispatch } = this.props
    dispatch(push(this.context.location || '/users'))
  }
  submit (values) {
    const { dispatch } = this.props
    const { username, email, password } = values
    return dispatch(async.post('user')(`/users`, {username, email, password})).then(v => {
      this.close()
      toastr.success('恭喜', '添加成功!')
    })
  }
  render () {
    const { handleSubmit } = this.props

    return (
      <Modal isOpen toggle={this.close.bind(this)}
        modalClassName='in'
        backdropClassName='in'
        backdrop>
        <Form onSubmit={handleSubmit(this.submit.bind(this))}>
          <ModalHeader>编辑</ModalHeader>
          <ModalBody>
            <Field name='username' label='用户名' component={Input} type='text' />
            <Field name='email' label='EMail' component={Input} type='text' />
            <Field name='password' label='密码' component={Input} type='password' />
            <Field name='password_confirm' label='密码确认' component={Input} type='password' />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit'>添加</Button>
            &nbsp;&nbsp;
            <Button onClick={this.close.bind(this)}>关闭</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
export default connect(state => ({
  initialValues: _.get(state.async, 'user.response')
}))(
  reduxForm({form: 'user', validate: validate(schema)})(withRouter(ModalEditor))
)
