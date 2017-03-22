import React from 'react'
import Select, { Creatable } from 'react-select'
import { FormGroup, Label, FormFeedback } from 'reactstrap'

export default class extends React.Component {
  render () {
    const { input, creatable, meta: {touched, error, valid}, ...others } = this.props
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    const { label, ...props } = others
    const { name, onBlur } = input
    const handleBlur = e => onBlur(input.value)
    const Component = creatable ? Creatable : Select
    return (
      <FormGroup color={state}>
        <Label for={name}>{label}</Label>
        <Component name={name} {...input} {...props} values={props.multi ? input.value : undefined} onBlur={handleBlur} />
        {touched && (error && <FormFeedback>{error}</FormFeedback>)}
      </FormGroup>
    )
  }
}
