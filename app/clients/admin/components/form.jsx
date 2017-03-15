import React from 'react'
import Joi from 'joi'
import _ from 'lodash'
import ReactSelect from 'react-select'
import { FormGroup,
         Label,
         Input as InputBootstrap,
         FormFeedback } from 'reactstrap'

export class Input extends React.Component {
  render () {
    const {input, meta: {touched, error, valid}, ...others} = this.props
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    const {label, ...props} = others
    const { name } = input
    return (
      <FormGroup color={state}>
        <Label for={name}>{label}</Label>
        <InputBootstrap state={state} {...input} {...props} />
        {touched && (error && <FormFeedback>{error}</FormFeedback>)}
      </FormGroup>
    )
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
        <ReactSelect name={name} {...input} {...props} onBlur={handleBlur} />
        {touched && (error && <FormFeedback>{error}</FormFeedback>)}
      </FormGroup>
    )
  }
}

export class Checkbox extends React.Component {
  render () {
    const {inline, input, meta: {touched, error, valid}, ...others} = this.props
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    const {label, ...props} = others
    if (inline) {
      return (
        <Label>
          <InputBootstrap type='checkbox' className='checkbox' checked={input.value} state={state} {...input} {...props} />
          <span>{label}</span>
        </Label>
      )
    } else {
      return (
        <FormGroup color={state}>
          <Label>
            <InputBootstrap type='checkbox' className='checkbox' checked={input.value} state={state} {...input} {...props} />
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
