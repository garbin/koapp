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
    config.componentWillUnmount && config.componentWillUnmount.call(this)
  }
  close () {
    const { dispatch, config } = this.props
    dispatch(push(this.context.location || `/${pluralize(config.resource)}`))
  }
  submit (values) {
    const { dispatch, config, match } = this.props
    const resourcePath = config.resourcePath || `/${pluralize(config.resource)}`
    const path = config.method === 'patch' ? `${resourcePath}/${match.params.id}` : resourcePath
    return dispatch(async[config.method](config.resource)(path, values)).then(v => {
      this.close()
      toastr.success('恭喜', '提交成功!')
    }).catch(e => {
      toastr.error(e.response.data.message)
    })
  }
  render () {
    const { handleSubmit, config } = this.props
    const body = config.body || (e => e)

    return (
      <Modal isOpen modalClassName='in'
        backdropClassName='in'>
        <Form onSubmit={handleSubmit(config.submit ? config.submit.bind(this) : this.submit.bind(this))}>
          <ModalHeader>{config.formTitle}</ModalHeader>
          <ModalBody style={{padding: '30px'}}>
            {body.call(this, config.fields.map(field => {
              return field instanceof Function ? field.call(this, {Field, Input}) : <Field key={field.name} component={Input} {...field} />
            }))}
          </ModalBody>
          <ModalFooter style={{padding: '15px 30px'}}>
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
  const mapStateToProps = config.mapStateToProps || (state => ({
    initialValues: _.get(state.async, `${config.resource}.response`)
  }))
  return connect(mapStateToProps)(
    reduxForm({form: `${config.resource}_form`, validate: validate(config.validate)})(withRouter(_ModalForm))
  )
}
