import React from 'react'
import Joi from 'joi'
import _ from 'lodash'
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
              _.set(errors, path, message)
              break
            case 'object.missing':
              for (let peer of context.peers) _.set(errors, peer, message)
              break
            default:
              _.set(errors, path, message)
              break
          }
        } else {
          _.set(errors, path, message)
        }
        return errors
      }, {})
    }
    return {}
  }
}

export class Page extends React.Component {
  componentWillMount () {
    this.fetch()
  }
  fetch () {
    const { dispatch } = this.props
    const config = this.getConfig()
    return dispatch(api.get(config.name)(config.savePath))
  }
  getConfig () {
    const { config } = this.props
    return {
      fields: [{name: 'test', label: 'Test'}],
      savePath: `/${config.name}`,
      saveMethod: 'patch',
      headActions: '',
      ...config
    }
  }
  renderFields () {
    const config = this.getConfig()
    return config.fields.map((field, idx) => {
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
    const { dispatch, intl } = this.props
    const config = this.getConfig()
    return dispatch(api[config.saveMethod](config.name)(config.savePath, values)).then(v => {
      toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
    }).catch(e => {
      toastr.error(intl.formatMessage({id: 'error_title'}), e)
    })
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
  render () {
    const { handleSubmit } = this.props
    const config = this.getConfig()
    return (
      <article className='content'>
        <div className='title-block'>
          <div className='float-sm-right'> {config.headActions} </div>
          <h3 className='title'>{config.formTitle}<span className='sparkline bar' data-type='bar' /> </h3>
        </div>
        <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          {this.renderBody()}
        </Form>
      </article>
    )
  }
}

export function page (config) {
  const mapStateToProps = config.mapStateToProps || ([state => ({
    api: state.api,
    oauth: state.oauth,
    initialValues: _.get(state.api, `${config.name}.response`)
  })])
  return (Component = Page) => {
    return connect(...mapStateToProps)(
      reduxForm({
        form: `${config.name || 'page'}`,
        validate: validate(config.validate || {})
      })(withRouter(injectIntl(props => <Component {...props} config={config} />)))
    )
  }
}
