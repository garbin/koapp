import React from 'react'
import { FormGroup,
         Label,
         Input,
         FormFeedback } from 'reactstrap'

export default class extends React.Component {
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
          <Input type='checkbox' className='checkbox' {...props} />
          <span>{label}</span>
        </Label>
      )
    } else {
      return (
        <FormGroup color={state}>
          <Label>
            <Input type='checkbox' className='checkbox' {...props} />
            <span>{label}</span>
          </Label>
          {touched && (error && <FormFeedback>{error}</FormFeedback>)}
        </FormGroup>
      )
    }
  }
}
