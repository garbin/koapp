import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import Button from './button'
import Input from './input'
import { Form, Modal as ModalBootstrap, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { validate } from './index'

export class Modal extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object
  }
  getConfig () {
    const { config } = this.props
    return {
      formTitle: 'test',
      submit: function (values) {
        console.log(values)
      },
      fields: [],
      body: e => e,
      buttons: (
        <div>
          <Button onClick={this.close.bind(this)} type='button'><FormattedMessage id='close' /></Button>
          &nbsp;&nbsp;
          <Button color='primary' type='submit'><FormattedMessage id='submit' /></Button>
        </div>
      ),
      ...config
    }
  }
  close () {
    const { dispatch } = this.props
    dispatch(this.context.location ? push(this.context.location) : goBack())
  }
  render () {
    const { handleSubmit } = this.props
    const config = this.getConfig()

    return (
      <ModalBootstrap isOpen modalClassName='in'
        backdropClassName='in'>
        <Form onSubmit={handleSubmit(config.submit.bind(this))}>
          <ModalHeader>{config.formTitle}</ModalHeader>
          <ModalBody style={{padding: '30px'}}>
            {config.body.call(this, (config.fields instanceof Function ? config.fields.call(this) : config.fields).map(field => {
              return field instanceof Function
                ? field.call(this, {Field, Input})
                : <Field key={field.name} component={Input} {...field} />
            }))}
          </ModalBody>
          <ModalFooter style={{padding: '15px 30px'}}>{config.buttons}</ModalFooter>
        </Form>
      </ModalBootstrap>
    )
  }
}

export default function modal (config, Component = Modal) {
  const mapStateToProps = config.mapStateToProps || ([state => ({
    async: state.async,
    oauth: state.oauth
  })])
  return connect(...mapStateToProps)(reduxForm({
    form: `${config.name || 'modal'}`,
    validate: validate(config.validate || {})
  })(withRouter(injectIntl(props => <Component {...props} config={config} />))))
}
