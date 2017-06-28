import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { withProps, compose } from 'recompose'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import { isFunction } from 'lodash'
import { injectIntl, FormattedMessage } from 'react-intl'
import Button from './button'
import Input from './input'
import { Form, Modal as ModalBootstrap, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { validate } from './index'

export class Modal extends React.Component {
  handleClose () {
    const { dispatch, result } = this.props
    dispatch(result.previous_url ? push(result.previous_url) : goBack())
  }
  renderFields () {
    const { fields } = this.props
    return fields.map(field => {
      return isFunction(field) ? field.call(this, Field, Input) : <Field key={field.name} component={Input} {...field} />
    })
  }
  renderButtons () {
    return (
      <div>
        <Button onClick={this.handleClose.bind(this)} type='button'>
          <FormattedMessage id='close' />
        </Button>
        &nbsp;&nbsp;
        <Button color='primary' type='submit'>
          <FormattedMessage id='submit' />
        </Button>
      </div>
    )
  }
  renderBody () {
    return (<div>{this.renderFields()}</div>)
  }
  handleSubmit (values) {
    console.log(values)
  }
  render () {
    const { handleSubmit, title } = this.props

    return (
      <ModalBootstrap isOpen modalClassName='in'
        backdropClassName='in'>
        <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody style={{padding: '30px'}}>
            {this.renderBody()}
          </ModalBody>
          <ModalFooter style={{padding: '15px 30px'}}>{this.renderButtons()}</ModalFooter>
        </Form>
      </ModalBootstrap>
    )
  }
}

export default function modal (options = {}) {
  const { props, name, schema } = options
  return compose(
    connect(state => ({result: state.result})),
    withRouter,
    injectIntl,
    reduxForm({form: name, validate: validate(schema)}),
    withProps(props)
  )
}
