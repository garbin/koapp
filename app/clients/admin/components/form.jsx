import React from 'react'
import Joi from 'joi'
import _ from 'lodash'
import ReactSelect from 'react-select'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { actions as async } from '../reduxers/async'
import { toastr } from 'react-redux-toastr'
import { FormGroup,
         Label,
         Col,
         Form,
         Button as ButtonBootstrap,
         Input as InputBootstrap,
         FormFeedback } from 'reactstrap'

export const Button = props => {
  const { loading, loadingText, children, ...others } = props
  return (
    <ButtonBootstrap disabled={loading || false} {...others}>
      {loading ? (loadingText || 'Hold on...') : children}
    </ButtonBootstrap>
  )
}


export class Input extends React.Component {
  render () {
    const {input, row, meta: {touched, error, valid}, ...others} = this.props
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    const {label, ...props} = others
    const { name } = input
    if (row) {
      return (
        <FormGroup color={state} row>
          <Label for={name} sm={2} className='text-xs-right form-control-label'>{label}</Label>
          <div className='col-sm-10'>
            <InputBootstrap state={state} {...input} {...props} />
            {touched && (error && <FormFeedback>{error}</FormFeedback>)}
          </div>
        </FormGroup>
      )
    } else {
      return (
        <FormGroup color={state}>
          <Label for={name}>{label}</Label>
          <InputBootstrap state={state} {...input} {...props} />
          {touched && (error && <FormFeedback>{error}</FormFeedback>)}
        </FormGroup>
      )
    }
  }
}

export class Select extends React.Component {
  render () {
    const { input, meta: {touched, error, valid}, ...others } = this.props
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    const { label, ...props } = others
    const { name, onBlur } = input
    const handleBlur = e => onBlur(input.value)
    return (
      <FormGroup color={state}>
        <Label for={name}>{label}</Label>
        <ReactSelect name={name} {...input} {...props} values={props.multi ? input.value : undefined} onBlur={handleBlur} />
        {touched && (error && <FormFeedback>{error}</FormFeedback>)}
      </FormGroup>
    )
  }
}

export class Checkbox extends React.Component {
  render () {
    const { label, inline, input, meta, ...others } = this.props
    const { touched, error, valid } = meta || {}
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    let props = {}
    if (input) {
      props = { checked: input.value, state, ...input, ...others }
    } else {
      props = { ...others }
    }
    if (inline) {
      return (
        <Label>
          <InputBootstrap type='checkbox' className='checkbox' {...props} />
          <span>{label}</span>
        </Label>
      )
    } else {
      return (
        <FormGroup color={state}>
          <Label>
            <InputBootstrap type='checkbox' className='checkbox' {...props} />
            <span>{label}</span>
          </Label>
          {touched && (error && <FormFeedback>{error}</FormFeedback>)}
        </FormGroup>
      )
    }
  }
}

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

export class FormContainer extends React.Component {
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
  const _FormContainer = props => <FormContainer {...props} config={config} />
  const mapStateToProps = config.mapStateToProps || (state => ({
    async: state.async,
    oauth: state.oauth,
    initialValues: _.get(state.async, `${config.name}.response`)
  }))
  return connect(mapStateToProps)(
    reduxForm({
      form: config.name || 'default',
      validate: validate(config.validate || {})
    })(withRouter(injectIntl(_FormContainer)))
  )
}
