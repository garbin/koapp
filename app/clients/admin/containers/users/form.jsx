import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import Joi from 'joi'
import { validate, Input } from '../../components/form'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
         Form } from 'reactstrap'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'
import _ from 'lodash'

const schema = {
  username: Joi.string().required(),
  email: Joi.string().email().required()
}

export class ModalEditor extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object
  }
  componentWillMount () {
    const { dispatch, match } = this.props
    if (match.params.id) {
      dispatch(async.get('user')(`/users/${match.params.id}`))
    }
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
    const { dispatch, match } = this.props
    const { username, email } = values
    return dispatch(async.patch('user')(`/users/${match.params.id}`, {username, email})).then(v => {
      this.close()
      toastr.success('恭喜', '编辑成功!')
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
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit'>提交</Button>
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
