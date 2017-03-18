import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

export default class extends React.Component {
  render () {
    const {input, row, inline, meta: {touched, error, valid}, ...others} = this.props
    const state = touched ? (error ? 'danger' : valid ? 'success' : undefined) : undefined
    const {label, ...props} = others
    const { name } = input
    if (row) {
      return (
        <FormGroup color={state} row>
          <Label for={name} sm={2} className='text-xs-right form-control-label'>{label}</Label>
          <div className='col-sm-10'>
            <Input state={state} {...input} {...props} />
            {touched && (error && <FormFeedback>{error}</FormFeedback>)}
          </div>
        </FormGroup>
      )
    } else if (inline) {
      return <Input {...input} {...props} />
    } else {
      return (
        <FormGroup color={state}>
          <Label for={name}>{label}</Label>
          <Input state={state} {...input} {...props} />
          {touched && (error && <FormFeedback>{error}</FormFeedback>)}
        </FormGroup>
      )
    }
  }
}
