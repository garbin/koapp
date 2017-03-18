import React from 'react'
import Joi from 'joi'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { actions as async } from '../../reduxers/async'
import { toastr } from 'react-redux-toastr'
import { FormGroup, Form } from 'reactstrap'
import Input from './input'
import Button from './button'
import Checkbox from './checkbox'
import modal from './modal'
import Select from './select'

export { Input, Button, Checkbox, modal, Select }

export function validate (schema) {
  return values => {
    const result = Joi.object(schema).validate(values)
    if (result.error) {
      return result.error.details.reduce((errors, e) => {
        _.set(errors, e.path, e.message)
        return errors
      }, {})
    }
    return {}
  }
}

export class FormPage extends React.Component {
  componentWillMount () {
    this.fetch()
  }
  fetch () {
    const { dispatch } = this.props
    const config = this.getConfig()
    return dispatch(async.get(config.name)(config.savePath))
  }
  getConfig () {
    const { config, intl } = this.props
    return {
      fields: [{name: 'test', label: 'Test'}],
      savePath: `/${config.name}`,
      saveMethod: 'patch',
      submit: function (values) {
        const { dispatch } = this.props
        const config = this.getConfig()
        return dispatch(async[config.saveMethod](config.name)(config.savePath, values)).then(v => {
          toastr.success(intl.formatMessage({id: 'success_title'}), intl.formatMessage({id: 'success_message'}))
        }).catch(e => {
          toastr.error(intl.formatMessage({id: 'error_title'}), e)
        })
      },
      ...config
    }
  }
  render () {
    const { handleSubmit, submitting } = this.props
    const config = this.getConfig()
    return (
      <article className='content'>
        <div className='title-block'>
          <h3 className='title'>{config.formTitle}<span className='sparkline bar' data-type='bar' /> </h3>
        </div>
        <Form onSubmit={handleSubmit(config.submit.bind(this))}>
          <div className='card card-block'>
            {config.fields.map((field, idx) => {
              const { component, ...others } = field
              return (
                <Field key={idx} component={component || Input} row {...others} />
              )
            })}
            <FormGroup row>
              <div className='col-sm-2' />
              <div className='col-sm-10'>
                <Button type='submit' loading={submitting} color='primary'>
                  <FormattedMessage id='submit' />
                </Button>
              </div>
            </FormGroup>
          </div>
        </Form>
      </article>
    )
  }
}

export function form (config) {
  const mapStateToProps = config.mapStateToProps || (state => ({
    async: state.async,
    oauth: state.oauth,
    initialValues: _.get(state.async, `${config.name}.response`)
  }))
  return connect(mapStateToProps)(
    reduxForm({
      form: config.name || 'default',
      validate: validate(config.validate || {})
    })(withRouter(injectIntl(props => <FormPage {...props} config={config} />)))
  )
}
