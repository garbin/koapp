import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import Select, { Creatable } from 'react-select'
import TagsInput from 'react-tagsinput'

export default class extends React.Component {
  render () {
    const {input, row, inline, meta: {touched, error, valid}, ...others} = this.props
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    const {label, creatable, ...props} = others
    const { name } = input
    let Component
    let addons = {}
    switch (others.type) {
      case 'select':
        Component = creatable ? Creatable : Select
        addons = {
          onBlur: e => input.onBlur(input.value),
          values: props.multi ? input.value : undefined
        }
        break
      case 'tags':
        Component = TagsInput
        addons = { value: input.value || [] }
        break
      default:
        Component = Input
        addons = {}
    }
    if (row) {
      return (
        <FormGroup color={state} row>
          <Label for={name} sm={2} className='text-xs-right form-control-label'>{label}</Label>
          <div className='col-sm-10'>
            <Component state={state} {...input} {...props} {...addons} />
            {touched && (error && <FormFeedback>{error}</FormFeedback>)}
          </div>
        </FormGroup>
      )
    } else if (inline) {
      return <Component {...input} {...props} {...addons} />
    } else {
      return (
        <FormGroup color={state}>
          <Label for={name}>{label}</Label>
          <Component state={state} {...input} {...props} {...addons} />
          {touched && (error && <FormFeedback>{error}</FormFeedback>)}
        </FormGroup>
      )
    }
  }
}
