import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { validate, Input } from '../../components/form'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
         Form } from 'reactstrap'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'
import _ from 'lodash'
import pluralize from 'pluralize'

export class ModalForm extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object
  }
  componentWillMount () {
    const { config, match, dispatch } = this.props
    config.method === 'patch' && dispatch(async.get(config.resource)(config.resourcePath || `/${pluralize(config.resource)}/${match.params.id}`))
    config.componentWillMount && config.componentWillMount.bind(this).call()
  }
  componentWillUnmount () {
    const { dispatch, config } = this.props
    dispatch(async.clear(config.resource)())
  }
  close () {
    const { dispatch, config } = this.props
    dispatch(push(this.context.location || `/${pluralize(config.resource)}`))
  }
  submit (values) {
    const { dispatch, config } = this.props
    return dispatch(async[config.method](config.resource)(config.resourcePath || `/${pluralize(config.resource)}`, values)).then(v => {
      this.close()
      toastr.success('恭喜', '提交成功!')
    })
  }
  render () {
    const { handleSubmit, config } = this.props

    return (
      <Modal isOpen toggle={this.close.bind(this)}
        modalClassName='in'
        backdropClassName='in'
        backdrop>
        <Form onSubmit={handleSubmit(config.submit ? config.submit.bind(this) : this.submit.bind(this))}>
          <ModalHeader>{config.formTitle}</ModalHeader>
          <ModalBody>
            {config.fields.map(field => {
              return field instanceof Function ? field({Field, Input}) : <Field key={field.name} component={Input} {...field} />
            })}
          </ModalBody>
          <ModalFooter>
            {config.buttons || (
              <div>
                <Button color='primary' type='submit'>提交</Button>
                &nbsp;&nbsp;
                <Button onClick={this.close.bind(this)}>关闭</Button>
              </div>
            )}
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

export default function (config) {
  const _ModalForm = props => (
    <ModalForm {...props} config={config} />
  )
  return connect(state => ({
    initialValues: _.get(state.async, `${config.resource}.response`)
  }))(
    reduxForm({form: `${config.resource}_form`, validate: validate(config.validate)})(withRouter(_ModalForm))
  )
}
