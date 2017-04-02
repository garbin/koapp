import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import Select, { Creatable } from 'react-select'
import Toggle from 'react-toggle'
import TagsInput from 'react-tagsinput'
import classnames from 'classnames'

export default class extends React.Component {
  render () {
    const {
      input,
      wrapper,
      async,
      row,
      inline,
      meta: {touched, error, valid},
      ...others} = this.props
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    const {label, creatable, ...props} = others
    const { name } = input
    let inputColProps = {}
    let Component
    let addons = {}
    switch (others.type) {
      case 'select':
        Component = Select
        if (creatable) Component = Creatable
        if (async) Component = Select.Async
        addons = {
          onBlur: e => input.onBlur(input.value),
          values: props.multi ? input.value : undefined
        }
        break
      case 'tags':
        Component = TagsInput
        addons = { value: input.value || [] }
        break
      case 'toggle':
        const { formatValue = v => v ? 'yes' : 'no' } = others
        Component = Toggle
        inputColProps = { className: 'form-control-toggle' }
        addons = {
          value: formatValue(input.value),
          checked: input.value
        }
        break
      default:
        Component = Input
        addons = { state }
    }
    const field = wrapper
      ? wrapper(<Component {...input} {...props} {...addons} />)
      : <Component {...input} {...props} {...addons} />
    if (row) {
      return (
        <FormGroup color={state} row>
          <Label for={name} sm={2} className='text-xs-right form-control-label'>{label}</Label>
          <div {...inputColProps} className={classnames('col-sm-10', inputColProps.className)}>
            {field}
            {touched && (error && <FormFeedback>{error}</FormFeedback>)}
          </div>
        </FormGroup>
      )
    } else if (inline) {
      return field
    } else {
      return (
        <FormGroup color={state}>
          <Label for={name}>{label}</Label>
          {field}
          {touched && (error && <FormFeedback>{error}</FormFeedback>)}
        </FormGroup>
      )
    }
  }
}
