import React from 'react'
import { compose, withProps } from 'recompose'
import Joi from 'joi'
import { set } from 'lodash'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { api } from '../../redux/actions'
import { toastr } from 'react-redux-toastr'
import { Form, Card, CardBlock, CardFooter, Row, Col } from 'reactstrap'
import { ConfirmLink } from './link'
import Input from './input'
import Button from './button'
import Checkbox from './checkbox'
import modal, { Modal } from './modal'
import Select from './select'
import ButtonDropdown from './button_dropdown'

export { Input, Button, Checkbox, modal, Select, ButtonDropdown, Modal, ConfirmLink }

export function validate (schema, options = {abortEarly: false}) {
  return values => {
    const joi = schema.isJoi ? schema : Joi.object().keys(schema).unknown()
    const result = Joi.validate(values, joi, options)
    if (result.error) {
      return result.error.details.reduce((errors, e) => {
        let { type, path, message, context } = e
        if (context) {
          switch (type) {
            case 'object.and':
              path = path === 'value' ? context.missing[0] : `${path}.${context.key}`
              set(errors, path, message)
              break
            case 'object.missing':
              for (let peer of context.peers) set(errors, path === 'value' ? peer : `${path}.${peer}`, message)
              break
            default:
              set(errors, path, message)
              break
          }
        } else {
          set(errors, path, message)
        }
        return errors
      }, {})
    }
    return {}
  }
}

export class Page extends React.Component {
  renderFields () {
    return this.props.fields.map((field, idx) => {
      const { component, ...others } = field
      return (
        <Field key={idx} component={component || Input} row {...others} />
      )
    })
  }
  renderButtons () {
    const { submitting } = this.props
    return (
      <Button type='submit' loading={submitting} color='primary'>
        <FormattedMessage id='submit' />
      </Button>
    )
  }
  handleSubmit (values) {
    // const { dispatch, intl } = this.props
    // const config = this.getConfig()
    // return dispatch(api[config.saveMethod](config.name)(config.savePath, values)).then(v => {
    //   toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
    // }).catch(e => {
    //   toastr.error(intl.formatMessage({id: 'error_title'}), e)
    // })
  }
  renderBody () {
    return (
      <Card>
        <CardBlock>{this.renderFields()}</CardBlock>
        <CardFooter>
          <Row>
            <Col sm={2} />
            <Col sm={10}>{this.renderButtons()}</Col>
          </Row>
        </CardFooter>
      </Card>
    )
  }
  renderHeadActions () { }
  render () {
    const { handleSubmit, title } = this.props
    return (
      <article className='content'>
        <div className='title-block'>
          <div className='float-sm-right'> {this.renderHeadActions()} </div>
          <h3 className='title'>{title}<span className='sparkline bar' data-type='bar' /> </h3>
        </div>
        <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          {this.renderBody()}
        </Form>
      </article>
    )
  }
}

export function page (options = {}) {
  const { props, name, schema } = options
  return compose(
    connect(state => ({result: state.result})),
    withRouter,
    injectIntl,
    withProps(props),
    reduxForm({form: name, validate: validate(schema)})
  )
}
